import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';
import CreateCategoryService from './CreateCategoryService';

interface Request {
	title: string;
	type: 'income' | 'outcome';
	value: number;
	category: string;
}

class CreateTransactionService {
	public async execute({
		title,
		type,
		value,
		category,
	}: Request): Promise<Transaction> {
		const transactionsRepository = getCustomRepository(TransactionsRepository);
		const categoryRepository = getRepository(Category);
		const createCategory = new CreateCategoryService();

		const hasTitle = await transactionsRepository.findOne({
			title,
		});

		if (hasTitle) {
			throw new AppError('This title has already saved.');
		}

		const { total } = await transactionsRepository.getBalance();

		if (type === 'outcome' && value > total) {
			throw new AppError('The value of outcome is bigger then total.');
		}

		let transactionCategory = await categoryRepository.findOne({
			where: {
				title: category,
			},
		});

		if (!transactionCategory) {
			transactionCategory = await createCategory.execute({ category });
		}

		const transaction = transactionsRepository.create({
			title,
			type,
			value,
			category: transactionCategory,
		});

		await transactionsRepository.save(transaction);

		return transaction;
	}
}

export default CreateTransactionService;

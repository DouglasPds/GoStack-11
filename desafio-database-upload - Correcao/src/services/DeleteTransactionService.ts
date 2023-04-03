import { getCustomRepository } from 'typeorm';
import { validate } from 'uuid';
import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

class DeleteTransactionService {
	public async execute(id: string): Promise<void> {
		const transactionsRepository = getCustomRepository(TransactionsRepository);

		if (!validate(id)) {
			throw new AppError('This id is not an uuid.');
		}

		const transaction = await transactionsRepository.findOne(id);

		if (!transaction) {
			throw new AppError('Transaction does not exist.');
		}

		await transactionsRepository.remove(transaction);
	}
}

export default DeleteTransactionService;

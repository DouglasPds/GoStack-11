import { getRepository } from 'typeorm';
import Category from '../models/Category';

interface Request {
	category: string;
}

class CreateCategoryService {
	public async execute({ category: title }: Request): Promise<Category> {
		const categoriesRepository = getRepository(Category);

		const category = categoriesRepository.create({ title });

		await categoriesRepository.save(category);

		return category;
	}
}

export default CreateCategoryService;

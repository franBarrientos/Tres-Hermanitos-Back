import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { Category } from "./category.entity";
import { CategoryDto } from "./category.dto";

export class CategoryService extends BaseService<Category> {
  constructor() {
    super(Category);
  }

  public async findAllCategories(
    skip: number,
    limit: number
  ): Promise<Category[]> {
    return (await this.repository).find({
      skip,
      take: limit,
    });
  }

  public async findCategoryById(id: number): Promise<Category | null> {
    return (await this.repository).findOne({
      where: { id },
    });
  }

  public async createCategory(body: CategoryDto): Promise<Category> {
    return (await this.repository).save(body);
  }

  public async deleteCategory(id: number): Promise<DeleteResult> {
    return (await this.repository).delete(id);
  }

  public async updateCategory(
    id: number,
    infoUpdate: CategoryDto
  ): Promise<UpdateResult> {
    return (await this.repository).update(id, infoUpdate);
  }
}

import { ResponseHttp } from "../config/responses.http";
import { Request, Response } from "express";
import { CategoryService } from "./category.service";

export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService = new CategoryService(),
    private readonly responseHttp: ResponseHttp = new ResponseHttp()
  ) {}

  async getAll(req: Request, res: Response) {
    try {
      const skip = req.query.skip ? Number(req.query.skip) : 0;
      const limit = req.query.limit ? Number(req.query.limit) : 20;
      const categories = await this.categoryService.findAllCategories(
        skip,
        limit
      );
      if (categories.length < 1)
        return this.responseHttp.notFound(res, "Not Found", " Not Found");
      this.responseHttp.oK(res, categories);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const category = await this.categoryService.findCategoryById(id);
      if (!category)
        return this.responseHttp.notFound(res, "Not Found", id + " Not Found");
      this.responseHttp.oK(res, category);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
  async create(req: Request, res: Response) {
    try {
      const newCategory = await this.categoryService.createCategory(req.body);
      this.responseHttp.created(res, newCategory);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const responseUpdate = await this.categoryService.updateCategory(
        id,
        req.body
      );
      if (responseUpdate.affected == 0)
        return this.responseHttp.notFound(res, "Not Found", id + " Not Found");
      this.responseHttp.oK(res, responseUpdate);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const responseDelete = await this.categoryService.deleteCategory(id);
      if (responseDelete.affected == 0)
        return this.responseHttp.notFound(res, "Not Found", id + " Not Found");
      this.responseHttp.oK(res, responseDelete);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
}

import { ResponseHttp } from "../config/responses.http";
import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { CategoryDto } from "./category.dto";

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
      let category = req.body as CategoryDto;
      if (!req.files?.img) throw new Error("no img");
      const urlImg = await this.categoryService.saveImgCloudinary(req.files.img);
      category.img = urlImg;
      const newCategory = await this.categoryService.createCategory(category);
      this.responseHttp.created(res, newCategory);
    } catch (error) {
      this.responseHttp.error(res, error, error);
    }
  }
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const category = req.body as CategoryDto;
      if (req.files?.img) {
        category.img = "...";
        const thereImg = (await this.categoryService.findCategoryById(id))?.img;
        if (thereImg) {
          const urlSplited = thereImg.split("/");
          const name = urlSplited.pop();
          const cloudinaryId = name?.split(".").shift();
          await this.categoryService.deleteImgCloudinary(cloudinaryId);
        }
        const urlImg = await this.categoryService.saveImgCloudinary(
          req.files.img
        );
        category.img = urlImg;
      }
      const responseUpdate = await this.categoryService.updateCategory(
        id,
        category
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

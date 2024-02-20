const Controller = require("../Controller");
const {CategoryModel} = require("../../models/category");
const { createCategorySchema } = require("../../validation/admin/categorySchema");
const {StatusCodes : HttpStatus} = require("http-status-codes");
const createError = require("http-errors");

class CategoryController extends Controller{
    async createCategory(req, res, next){
        try {
            await createCategorySchema.validateAsync(req.body);
            const{title, parent} = req.body;
            const category = await CategoryModel.create({title, parent});
            if(!category) throw createError.InternalServerError("Internal Server Error");

            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "Category added successfully"
                }
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    CategoryController : new CategoryController()
}
// Import necessary modules and dependencies
const Controller = require("../Controller"); // Import the base controller
const { CategoryModel } = require("../../models/category"); // Import the CategoryModel for interacting with the database
const { StatusCodes: HttpStatus } = require("http-status-codes"); // Import HTTP status codes for response handling
const createError = require("http-errors"); // Import createError for generating HTTP errors
const { createCategorySchema } = require("../../validation/admin/categorySchema"); // Import validation schema for category creation

/**
 * Controller class for handling category-related operations.
 * @extends Controller
 */
class CategoryController extends Controller {
    /**
     * Creates a new category.
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @param {NextFunction} next - Express next middleware function.
     * @returns {Response} - HTTP response with the result.
     */
    async createCategory(req, res, next) {
        try {
            // Validate request body against schema
            await createCategorySchema.validateAsync(req.body);

            // Extract title and parent from request body
            const { title, parent } = req.body;

            // Convert empty string to null for parent field
            const parentValue = parent === "" ? null : parent;

            // Create category in the database
            const category = await CategoryModel.create({ title, parent: parentValue });

            // Check if category was created successfully
            if (!category) {
                // If category creation fails, throw internal server error
                throw createError.InternalServerError("Failed to create category");
            }

            // Respond with success message
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "Category created successfully"
                }
            });
        } catch (error) {
            // Handle validation errors or internal server errors
            next(error);
        }
    }



    /**
 * Retrieves all parent categories from the database.
 * Parent categories are those with no parent specified.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - JSON response with parent categories
 */

    async getAllParents(req, res, next){
        try {
            // Finding all categories with no parent specified
            const parents = await CategoryModel.find({parent: null}, {__v: 0});
            // Returning JSON response with parent categories
            return res.status(HttpStatus.OK).json({
                data: {
                    parents
                }
            })
        } catch (error) {
            next(error);
        }
    }


    async getChildernOfParents(req, res, next){
        try {
            const parent = req.params;
            const children = await CategoryModel.find({parent}, {__v: 0, });
            return res.status(HttpStatus.OK).json({
                data: {
                    children
                }
            })
        } catch (error) {
            next(error);
        }
    }



    /**
 * Retrieves all top-level categories from the database.
 * Top-level categories are those with no parent specified.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - JSON response with top-level categories
 */
    async getAllCategories(req, res, next){
        try {
            // Retrieving all categories with no parent specified (top-level categories)
            const categories = await CategoryModel.find({parent: null});
            // Returning JSON response with top-level categories
            return res.status(HttpStatus.OK).json({
                data: {
                    categories
                }
            })
        } catch (error) {
            next(error);
        }
    }
}

// Export an instance of the CategoryController
module.exports = {
    CategoryController: new CategoryController()
};

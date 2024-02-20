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
                    statusCode: 200,
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
                    statusCode: 200,
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
                    statusCode: 200,
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
                    statusCode: 200,
                    categories
                }
            })
        } catch (error) {
            next(error);
        }
    }




    /**
 * Removes a category and its children from the database.
 * If the category does not exist, it throws a 'Not Found' error.
 * @param {Object} req - Express request object containing the category ID in params
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - JSON response indicating successful deletion
 * @throws {Error} - 'Not Found' error if the category does not exist, 'Internal Server Error' if deletion fails
 */
    async removeCategory(req, res, next){
        try {

            // Extracting category ID from request parameters
            const {id} = req.params;

            // Checking if the category exists, throws error if not found
            const category = await this.checkExistCategory(id);

            // Deleting the category and its children from the database
            const deleteResult = await CategoryModel.deleteMany({
                $or: [{_id: category._id}, {parent: category._id}]
            });

            // If no category was deleted, throw 'Internal Server Error'
            if(deleteResult.deletedCount == 0)
                throw createError.InternalServerError("Uncategorized failed");

            // Returning success message upon successful deletion
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data:{
                    message: "Deleting a category was successfully"
                }
            })
        } catch (error) {
            next(error);
        }
    }





        /**
 * Retrieves a category and its children by ID from the database using aggregation.
 * @param {Object} req - Express request object containing the category ID in params
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} - JSON response with the category and its children
 * @throws {Error} - If an error occurs during the process
 */
    async getCategoryById(req, res, next) {
        try {

          // Extracting category ID from request parameters
          const { id: _id } = req.params;


          // Performing aggregation to retrieve the category and its children
          const category = await CategoryModel.aggregate([
            {
              $match: { _id: mongoose.Types.ObjectId(_id) },
            },
            {
              $lookup: {
                from: "categories",
                localField: "_id",
                foreignField: "parent",
                as: "children",
              },
            },
            {
              $project: {
                __v: 0,
                "children.__v": 0,
                "children.parent": 0,
              },
            },
          ]);

          // Returning JSON response with the category and its children
          return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            data: {
              category,
            },
          });
        } catch (error) {
          next(error);
        }
      }




      /**
 * Retrieves all categories without populating child categories.
 * @async
 * @function getAllCategoryWithoutPopulate
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {object} The response containing retrieved categories.
 * @throws {Error} If an error occurs during the operation.
 */
      async getAllCategoryWithoutPopulate(req, res, next) {
        try {

          // Retrieve all categories without populating child categories
          const categories = await CategoryModel.aggregate([{ $match: {} }]);

          // Return the retrieved categories in the response
          return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            data: {
              categories,
            },
          });
        } catch (error) {
          next(error);
        }
      }


    /**
 * Checks if a category with the given ID exists in the database.
 * If the category does not exist, it throws a 'Not Found' error.
 * @param {string} id - The ID of the category to check for existence
 * @returns {Object} - The found category object
 * @throws {Error} - 'Not Found' error if the category does not exist
 */
    async checkExistCategory(id){

        // Find the category by its ID in the database
        const category = await CategoryModel.findById(id);
        // If the category does not exist, throw a 'Not Found' error
        if(!category) throw createError.NotFound("The category was not found");
        return category;
    }
}

// Export an instance of the CategoryController
module.exports = {
    CategoryController: new CategoryController()
};

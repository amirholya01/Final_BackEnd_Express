const { createBlogSchema } = require("../../validation/admin/blogSchema");
const Controller = require("../Controller");
const path = require("path");
const {StatusCodes : HttpStatus} = require("http-status-codes");
const { body } = require("express-validator");
const {BlogModel} = require("../../models/blog");
class BlogController extends Controller{
    async createBlog(req, res, next){
        try {
            const blogDataBody = await createBlogSchema.validateAsync(req.body);
            req.body.image = path.join(blogDataBody.fileUploadPath, blogDataBody.filename);
            body.req.image = req.body.image.replace(/\\/g, "/");
            const {tile, description, category, tags} = blogDataBody;
            const image = req.body.image;
            const auther = req.user._id;
            const blog = await BlogModel.create({title,image, description,  category, tags, auther})
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data : {
                    message : "Creating the blog was done successfully "
                }
            })
        } catch (error) {
            next(error);
        }
    }


    async getListOfBlog(req, res, next){
        try {
            return res.status(HttpStatus.OK).json({
                StatusCode: HttpStatus.OK,
                data: {
                    blogs: []
                }
            })
        } catch (error) {
            next(error);
        }
    }
}


module.exports = {
    BlogController : new BlogController()
}
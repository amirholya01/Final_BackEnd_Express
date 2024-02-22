const {BlogController} = require("../../controllers/admin/Blog.Controller");

const router = require("express").Router();

/**
 * @swagger
 *  /admin/blog:
 *      get:
 *          tags: [Blog(admin-panel)]
 *          summary: get all blogs
 *          responses: 
 *              200:
 *                  description: success - get array of blogs
 */
router.get("/", BlogController.getListOfBlog);
module.exports = {
    AdminApiBlogRouter : router
}
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


/**
 * @swagger
 *  post:
 *      tags: [Blog(admin-panel)]
 *      summary: create a new blog
 */
router.post("/create", BlogController.createBlog);
module.exports = {
    AdminApiBlogRouter : router
}
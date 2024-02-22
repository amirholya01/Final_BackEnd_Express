const {BlogController} = require("../../controllers/admin/Blog.Controller");
const { stringToArray } = require("../../middleware/stringToArray");
const { uploadFile } = require("../../util/multer");

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
 *  /admin/blog/create:
 *      post:
 *          tags: [Blog(admin-panel)]
 *          summary: create a new blog
 *          consumes:
 *              -   multipart/form-data
 *          parameters:
 *              -   in: formData
 *                  name: title
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: description
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *                  name: tags
 *                  type: string
 *              -   in: formData
 *                  name: category
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  type: file
 *                  required: true
 *          response:
 *              201:
 *                  description: success
 */
router.post("/create", uploadFile.single("image"), stringToArray("tags"), BlogController.createBlog);
module.exports = {
    AdminApiBlogRouter : router
}
const {CourseController} = require("../../controllers/admin/CourseController");
const { stringToArray } = require("../../middleware/stringToArray");
const { uploadFile } = require("../../util/multer");

const router = require("express").Router();
/**
 * @swagger
 *  /admin/course/all:
 *      get:
 *          tags: [Course(admin-panel)]
 *          summary: Get all courses - List of courses
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: text
 *                  description: search in course section with title and description
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/all",CourseController.getAllCourses);



/**
 * @swagger
 *  components:
 *      schemas:
 *          Insert-course:
 *              type: object
 *              required:
 *                  -   title
 *                  -   description
 *                  -   image
 *                  -   category
 *              properties:
 *                  title:
 *                      type: string
 *                      description: The title of course
 *                  description: 
 *                      type: string
 *                      description: The description of course
 *                  image:
 *                      type: string
 *                      format: binary
 *                  category:
 *                      type: string
 *                      description: The Id of category
 */

/**
 * @swagger
 *  /admin/course/create:
 *      post:
 *          tags: [Course(admin-panel)]
 *          summary: create a new course
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Insert-course'
 *          parameters:
 *              - in: formData
 *                name: title
 *                type: string
 *                required: true
 *                description: The title  for the course
 *              - in: formData
 *                name: description
 *                type: string
 *                required: true
 *                description: The description  for the course
 *              - in: formData
 *                name: image
 *                type: file
 *                required: true
 *                description: The image file for the coursw
 *              - in: formData
 *                name: category
 *                type: string
 *                required: true
 *                description: The category for the course
 *          responses:
 *              201:
 *                  description: success to create a new course
 */
router.post("/create", uploadFile.single("image"), stringToArray("tags"), CourseController.createCourse);

router.get("/:id", CourseController.getCourseById);
module.exports = {
    AdminApiCourseRouter : router
}
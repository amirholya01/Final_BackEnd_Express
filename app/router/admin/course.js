const {CourseController} = require("../../controllers/admin/CourseController");

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

module.exports = {
    AdminApiCourseRouter : router
}
const {CourseController} = require("../../controllers/admin/CourseController");

const router = require("express").Router();
/**
 * @swagger
 *  /admin/course/all:
 *      get:
 *          tags: [Course(admin-panel)]
 *          summary: Get all courses - List of courses
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/all",CourseController.getAllCourses);

module.exports = {
    AdminApiCourseRouter : router
}
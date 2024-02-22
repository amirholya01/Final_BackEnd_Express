const {CourseController} = require("../../controllers/admin/CourseController");

const router = require("express").Router();

router.get("/all",CourseController.getAllCourses);

module.exports = {
    AdminApiCourseRouter : router
}
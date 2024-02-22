const {CourseController} = require("../../controllers/admin/CourseController");
const { stringToArray } = require("../../middleware/stringToArray");
const { uploadFile } = require("../../util/multer");

const router = require("express").Router();

router.get("/all",CourseController.getAllCourses);


router.post("/create", uploadFile.single("image"), stringToArray("tags"), CourseController.createCourse);

router.get("/:id", CourseController.getCourseById);
module.exports = {
    AdminApiCourseRouter : router
}
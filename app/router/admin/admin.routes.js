const { AdminApiBlogRouter } = require("./blog");
const { AdminApiCourseRouter } = require("./course");

const router = require("express").Router();


router.use("/blog", AdminApiBlogRouter);

router.use("/course", AdminApiCourseRouter);
module.exports = {
    AllAdminRoutes : router
}
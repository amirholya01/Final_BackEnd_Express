const { AdminApiBlogRouter } = require("./blog");
const { AdminApiCourseRouter } = require("./course");

const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: action of admin(CRUD)
 *      -   name: Blog(admin-panel)
 *          description: All methods and routes in the blog section
 *      -   name: Course(admin-panel)
 *          description: All methos and routes in the course section
 */
router.use("/blog", AdminApiBlogRouter);

router.use("/course", AdminApiCourseRouter);
module.exports = {
    AllAdminRoutes : router
}
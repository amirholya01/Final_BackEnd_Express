const { AdminApiBlogRouter } = require("./blog");

const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: action of admin(CRUD)
 *      -   name: Blog(admin-panel)
 *          description: All methods and routes in the blog section
 */
router.use("/blog", AdminApiBlogRouter);
module.exports = {
    AllAdminRoutes : router
}
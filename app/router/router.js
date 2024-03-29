const { AllAdminRoutes } = require("./admin/admin.routes");
// const { AdminApiCategoryRouter } = require("./admin/category");
const { IndexRoutes } = require("./api");
const { UserRoutes } = require("./user/user");

const router = require("express").Router();

//router.use( "/admin", AdminApiCategoryRouter);
router.use("/admin", AllAdminRoutes);
router.use(UserRoutes);
router.use("/", IndexRoutes);



module.exports = {
    AllRoutes : router
}
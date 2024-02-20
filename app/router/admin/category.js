const {CategoryController} = require("../../controllers/admin/Category.Controller");
const router = require("express").Router();

router.post("/category/create", CategoryController.createCategory);
router.get("/category/parents", CategoryController.getAllParents);
module.exports = {
    AdminApiCategoryRouter : router
}
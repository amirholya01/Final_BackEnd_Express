const {CategoryController} = require("../../controllers/admin/Category.Controller");
const router = require("express").Router();

router.post("/category/create", CategoryController.createCategory);

module.exports = {
    AdminApiCategoryRouter : router
}
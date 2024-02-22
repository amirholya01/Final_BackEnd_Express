const {CategoryController} = require("../../controllers/admin/Category.Controller");
const router = require("express").Router();

router.post("/category/create", CategoryController.createCategory);
router.get("/category/parents", CategoryController.getAllParents);

router.get("/category/children/:parent", CategoryController.getChildernOfParents);

router.get("/category/all", CategoryController.getAllCategories);

router.delete("/category/remove/:id", CategoryController.removeCategory);

router.get("/category/list-of-all", CategoryController.getAllCategoryWithoutPopulate);

router.get("/category/:id", CategoryController.getCategoryById);

router.patch("/category/update/:id", CategoryController.editCategory);
module.exports = {
    AdminApiCategoryRouter : router
}
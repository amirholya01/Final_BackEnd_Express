const {CategoryController} = require("../../controllers/admin/Category.Controller");
const router = require("express").Router();

router.post("/category/create", CategoryController.createCategory);
router.get("/category/parents", CategoryController.getAllParents);
/**
 * @swagger
 * /admin/category/children/{parent}:
 *  get:
 *      summary: get all parents of children or categiry head
 *      parameters:
 *          - in:
 *            name: parent
 *            type: string
 *            required: true
 *            schema: 
 *              type: string
 *              description: The Id of parent category
 *      responses:
 *          200:
 *              description: success
 */
router.get("/category/children/:parent", CategoryController.getChildernOfParents);

router.get("/category/all", CategoryController.getAllCategories);

router.delete("/category/remove/:id", CategoryController.removeCategory);

router.get("/category/list-of-all", CategoryController.getAllCategoryWithoutPopulate);

router.get("/category/:id", CategoryController.getCategoryById);

module.exports = {
    AdminApiCategoryRouter : router
}
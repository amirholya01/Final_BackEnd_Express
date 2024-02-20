// const {body} = require("express-validator");
// const createError = require("http-errors");
// const {MongoIdPattern} = require("../../util/constant");

// function createCategoryValidator(){
//     return[
//         body('title').isString().withMessage("The category title must be a string")
//             .isLength({min: 3, max: 30}).withMessage("Category title should be between 3 and 30 characters")
//             .withMessage("The category title is not correct"),
        
//         body('parent').optional()
//             .isString().withMessage("The ID of the parent category must be a string")
//             .custom((value) => {
//                 if(value !== '' && !MongoIdPattern.test(value)){
//                     throw createError.BadRequest("The ID sent is not correct");
//                 }
//                 return true;
//             })
//     ];
// }




// module.exports = {
//     createCategoryValidator
// }
const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MongoIDPattern } = require("../../../utils/constans");
const createCategorySchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان دسته بندی صحیح نمیباشد")),
    parent: Joi.string().allow('').pattern(MongoIDPattern).allow("").error(createHttpError.BadRequest("شناسه ارسال شده صحیح نمیباشد"))
});


module.exports = {
    createCategorySchema
}
const Joi = require("@hapi/joi");
const createError = require("http-errors");
const {MongoIdPattern} = require("../../util/constant");

const createBlogSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createError.BadRequest("The naming of the title is not correct")),
    description: Joi.string().error(createError.BadRequest("The sending text is not correct")),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest("The sending image is not correct")),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest("Tags can not be more than 20")),
    category: Joi.string().pattern(MongoIdPattern).error(createError.BadRequest("The desired category was not found")),
    fileUploadPath: Joi.allow() 
});


module.exports = {
    createBlogSchema
}
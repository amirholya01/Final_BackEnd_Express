const Joi = require("@hapi/joi");
const createError = require("http-errors");
const {MongoIdPattern} = require("../../util/constant");

const createCourseSchema = Joi.object({
    title : Joi.string().min(2).max(30).error(createError.BadRequest("The title of course was not correct")),
    description: Joi.string().error(createError.BadRequest("Sending description was not correct")),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest("The tags can not be more than 20")),
    category: Joi.string().regex(MongoIdPattern).error(createError.BadRequest("The desired category was not found")),
    filename: Joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest("Sendig image was not correct")),
    fileUploadPath : Joi.allow()
});



module.exports = {
    createCourseSchema
}
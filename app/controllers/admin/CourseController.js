const { CourseModel } = require("../../models/course");
const { createCourseSchema } = require("../../validation/admin/courseSchema");
const Controller = require("../Controller");
const {StatusCodes : HttpStatus} = require("http-status-codes")
const path = require("path");
const createError = require("http-errors");

class CourseController extends Controller {
    async getAllCourses(req, res, next){
        try {
            const {search} = req.query;

            let courses;
            if(search) courses = await CourseModel.find({$text: {$search: search}}).sort({_id: -1});
            else courses = await CourseModel.find({}).sort({_id: -1});

            return res.status(HttpStatus.OK).json({
                StatusCode: HttpStatus.OK,
                data: {
                    courses
                }
            })
        } catch (error) {
            next(error);
        }
    }



    async createCourse(req, res, next){
        try {
            await createCourseSchema.validateAsync(req.body);
            const {fileUploadPath, filename} = req.body;
            const image = path.join(fileUploadPath, filename).replace(/\\/g, "/")
            let {title, description, tags, category} = req.body;
            //const teacher = req.user._id

            const course = await CourseModel.create({
                title,
                description,
                tags,
                category,
                image, 
               // teacher
            })
            

            if(!course?._id) throw createHttpError.InternalServerError("The course was not added")
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data : {
                    message : "The course was added successfully"
                }
            })
        } catch (error) {
            next(error);
        }
    }


    async getCourseById(req, res, next){
        try {
            const {id} = req.params;
            const course = await CourseModel.findById(id);
            if(!course) throw createError.NotFound("The course was not found")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    course
                }
        })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    CourseController : new CourseController()
}
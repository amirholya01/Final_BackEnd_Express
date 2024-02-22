const { CourseModel } = require("../../models/course");
const Controller = require("../Controller");
const {StatusCodes : HttpStatus} = require("http-status-codes")
class CourseController extends Controller {
    async getAllCourses(req, res, next){
        try {
            const courses = await CourseModel.find({}).sort({_id: -1});

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
}

module.exports = {
    CourseController : new CourseController()
}
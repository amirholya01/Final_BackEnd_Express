const Controller = require("../Controller");

class CourseController extends Controller {
    async getAllCourses(req, res, next){
        try {
            return res.json({})
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    CourseController : new CourseController()
}
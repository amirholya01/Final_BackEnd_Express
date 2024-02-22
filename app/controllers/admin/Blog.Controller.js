const Controller = require("../Controller");
const {StatusCodes : HttpStatus} = require("http-status-codes");
class BlogController extends Controller{
    async createBlog(req, res, next){
        try {
            
        } catch (error) {
            next(error);
        }
    }


    async getListOfBlog(req, res, next){
        try {
            return res.status(HttpStatus.OK).json({
                StatusCode: HttpStatus.OK,
                data: {
                    blogs: []
                }
            })
        } catch (error) {
            next(error);
        }
    }
}


module.exports = {
    BlogController : new BlogController()
}
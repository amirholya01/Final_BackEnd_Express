const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({

})

module.exports = {
    CourseModel : mongoose.model("course", CourseSchema)
}
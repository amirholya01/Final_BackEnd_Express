const mongoose = require("mongoose");


const Episode = new mongoose.Schema({
    title: {type: String, required:true},
    description: {type: String, required:true},
    time: {type: String, required:true},
    videoAddress: {type: String, required: true}
})


const Chapter = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, default: ""},
    episodes: {type: [Episode], default: []}
})

const CourseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    tags: {type: [String], default: []},
    category: {type: mongoose.Types.ObjectId, ref: "category", required: true},
    chapters: {type: [Chapter], default: []},
   // teacher: {type: mongoose.Types.ObjectId, ref: "user", required: true}
})
CourseSchema.index({
    title: "text",
    description: "text"
})

module.exports = {
    CourseModel : mongoose.model("course", CourseSchema)
}
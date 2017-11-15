var mongoose = require("mongoose");

//Create new schema
var postSchema = new mongoose.Schema({
    name: String,
    htmlContent: String,
    thumb: String,
    category: String,
    date: Date
});

//Create new collection
var Post = mongoose.model("Post", postSchema);

module.exports = Post;
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var Post = require("./public/models/post");


mongoose.connect("mongodb://localhost/atravelershigh");



app.use(express.static("public"));

app.get('/api/recent', function(req, res) {
    var num = req.params.id;
   Post.find({}, function (err, foundBlog){
        if (err) {
          console.log(err);
        } 
        else {
           res.json(foundBlog);
        }
   });
    
});

app.get('/api/:id', function(req, res) {
    var num = req.params.id;
   Post.find({_id: num}, function (err, foundBlog){
        if (err) {
          console.log(err);
        } 
        else {
           res.json(foundBlog);
        }
   });
    
});

app.get('*', function(req, res) {
        res.sendFile('/public/index.html');
});

app.listen(3000, "127.0.0.1", function() {
	console.log("Server starting...");
    console.log("Server started!");
});
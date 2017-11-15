var express = require("express");
var app = express();
var mongoose = require("mongoose");
var Post = require("./models/post");


mongoose.connect("mongodb://localhost/atravelershigh");
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

app.get('/api/all-posts/recent', function(req, res) {
    Post.find({}).sort({'date': -1}).limit(10).exec(function(err, posts) {
        if (err) {
          console.log(err);
        }
        else {
           res.json(posts);
        }
    });
});

app.get('/api/all-posts/:id', function(req, res) {
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

app.get('/', function(req, res){
  Post.find({}).sort({'date': -1}).limit(4).exec(function(err, foundFeaturedBlogs) {
    if (err) {
      console.log(err);
    }
    else {
      res.render('./main/index', {featuredBlogs: foundFeaturedBlogs});
    }
  });
});

app.get('/travel', function(req, res){
  Post.find({category: 'Travel'}).sort({'date': -1}).limit(6).exec(function(err, foundTravelPosts){
    if (err) {
      console.log(err);
      res.redirect('/');
    }
    else {
      res.render('./travel/index', {travelPosts: foundTravelPosts});
    }
  });
});

app.get('/travel/:id', function(req, res) {
  Post.findById({_id: req.params.id}, function(err, foundTravelPost){
    if (err) {
      console.log(err);
      res.redirect('/');
    }
    else {
      res.render('./travel/show', {travelPost: foundTravelPost});
    }
  });
});

app.listen(3000, function() {
	console.log("Server starting...");
    console.log("Server started!");
});

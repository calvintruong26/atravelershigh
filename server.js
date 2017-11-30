var express = require("express");
var app = express();
var mongoose = require("mongoose");
var Post = require("./models/post");
var seedDB = require("./seed");
var config = require("./config");


mongoose.connect("mongodb://localhost/atravelershigh");
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

// Get info on most recent posts
app.get('/api/posts/recent', function(req, res) {
    Post.find({}).sort({'date': -1}).limit(config.RECENT_POSTS_SIZE).exec(function(err, posts) {
        if (err) {
          console.log(err);
        }
        else {
           res.json(posts);
        }
    });
});

// Get info on specific post
app.get('/api/posts/:id', function(req, res) {
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

// INDEX
app.get('/', function(req, res){
  // Fetch two most recent posts for featured section
  Post.find({}).sort({'date': -1}).limit(config.FEAT_POSTS_SIZE).exec(function(err, foundFeaturedBlogs) {
    if (err) {
      console.log(err);
      res.redirect('/');
    }
    else {
      res.render('./main/index', {featuredBlogs: foundFeaturedBlogs});
    }
  });
});

// TRAVEL
app.get('/travel', function(req, res){
  // Get page query
  var page = req.query.page || 1;
  if (page < 1 || isNaN(page)) {
    console.log("Page " + page + " doesn't exist...");
    return res.render("./main/404")
  }
  else {
    // Retrieve page results
    page = parseInt(page);
    Post.find({category: 'Travel'})
        .sort({'date': -1})
        .exec(function(err, foundTravelPosts){
      if (err) {
        console.log(err);
        res.redirect('/');
      }
      else {
        var numResults = foundTravelPosts.length;
        var firstResult = (page - 1) * config.BLOG_INDEX_SIZE;
        foundTravelPosts = foundTravelPosts.slice(firstResult, firstResult + config.BLOG_INDEX_SIZE);

        if (numResults > 0 && foundTravelPosts.length < 1) {
          console.log("Page " + page + " doesn't exist...");
          return res.render("./main/404");
        }
        else {
            res.render('./travel/index',
            {
              travelPosts: foundTravelPosts,
              page: page,
              numResults: numResults,
              PAGE_SIZE: config.BLOG_INDEX_SIZE
            });
        }
      }
    });
  }
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

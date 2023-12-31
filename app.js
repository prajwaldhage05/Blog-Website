const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// Initial Mongoose Code Start
mongoose.connect("mongodb://localhost:27017/BlogDB");

const postSchema = new mongoose.Schema({
  postTitle: {
    type:String,
    required:[1,"Title Required"]
  },
  postContent:{
    type:String,
    required:[1,"Content Required"]
  }
});

const Post = mongoose.model("Post",postSchema);
// Initial Mongoose code ends

// GET HOME PAGE
app.get("/",function(req,res){
  Post.find({},function(err,posts)//displaying posted content to homepage from Database
{
  if(!err)// if not error, display on home
  {
    res.render("home",{home_starting_content:homeStartingContent,posted:posts});
    // console.log(posts);
  }
  else
  {
    console.log(err);
  }
});
});

// GET ABOUT PAGE
app.get("/about",function(req,res){
  res.render("about",{about_us:aboutContent});
});

// GET CONTACT PAGE
app.get("/contact",function(req,res){
  res.render("contact",{contact_us:contactContent});
});
// GET COMPOSE PAGE
app.get("/compose",function(req,res){
  res.render("compose");
});

// GET POSTS PAGE
// app.get("/posts",function(req,res){
//   res.render("")
// });

// POST COMPOSE PAGE
app.post("/compose",function(req,res){
  const insertingPost = new Post({
    postTitle: req.body.post_title,
    postContent: req.body.post_content
  });
  insertingPost.save(function(err)
{
  if(!err)
  {
      res.redirect("/");
  }
  else
  {
    console.log(err);
  }
});
});

// ROUTING PARAMETER
app.get("/posts/:post",function(req,res){
  var linkPost = req.params.post;
  Post.findOne({_id:linkPost},function(err,post)
{
  if(!err)
  {
    res.render("post",{post_title:post.postTitle,post_content:post.postContent});
    res.redirect("/post");
  }
  else{
    console.log(err);
  }
});
});








app.listen(3000, function() {
  console.log("Server started on port 3000");
});

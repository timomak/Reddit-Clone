// Required initializers
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
<<<<<<< HEAD
//var Post = require('./models/post');
var exphbs = require('express-handlebars');
// require('./controllers/posts.js')(app);
=======
require('./controllers/posts.js')(app);
>>>>>>> parent of 92b6d3b... Error undefined in terminal

// Set up
mongoose.Promise = global.Promise;
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
mongoose.connect('mongodb://localhost:27017/reddit-clone', { useMongoClient: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, () => console.log('It Loads on port 3000!'))
app.use(bodyParser.urlencoded({ extended: true }));

<<<<<<< HEAD
const Post = mongoose.model('Post', {
  title: String
});
=======

var Post = require('./models/post');

module.exports = (app) => {

  // CREATE
  app.post('/posts', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    var post = new Post(req.body);
>>>>>>> parent of 92b6d3b... Error undefined in terminal

// let posts = [
//   { title: "Great Review" },
//   { title: "Next Review" }
// ]

// INDEX
app.get('/', (req, res) => {
  Post.find().then((posts) => {
    res.render('post-index', { posts: posts});
  }).catch((err) => {
    console.log(err);
  })
})

<<<<<<< HEAD
// NEW
=======
app.get('/', (req, res) => {
  res.render('home', {});
})

app.post('/posts', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

>>>>>>> parent of 92b6d3b... Error undefined in terminal
app.get('/posts/new', (req, res) => {
  res.render('posts-new', {});
})

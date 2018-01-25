// Required initializers
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var Post = require('./models/post');
var exphbs = require('express-handlebars');
// require('./controllers/posts.js')(app);

// Set up
mongoose.Promise = global.Promise;
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
mongoose.connect('mongodb://localhost:27017/reddit-clone', { useMongoClient: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, () => console.log('It Loads on port 3000!'))
app.use(bodyParser.urlencoded({ extended: true }));

const Post = mongoose.model('Post', {
  title: String
});

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

// NEW
app.get('/posts/new', (req, res) => {
  res.render('posts-new', {});
})

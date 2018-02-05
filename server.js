// Required initializers
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
var express = require('express');
var app = express();
app.use(cookieParser());
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

// POST
require('./controllers/posts.js')(app);
var Post = require('./models/post');
// COMMENT
require('./controllers/comments-controller.js')(app);
var Comment = require('./models/comment');
// // USER
require('./controllers/auth.js')(app);
var User = require('./models/user');

// SECURITY
require('dotenv').config();
// Set up
mongoose.Promise = global.Promise;
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
mongoose.connect('mongodb://localhost:27017/reddit-clone', { useMongoClient: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'))
mongoose.set('debug', true)
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, () => console.log('It Loads on port 3000!'))
app.use(bodyParser.urlencoded({ extended: true }));

Post.find({}).then((posts) => {
  res.render('posts-index.handlebars', { posts })
}).catch((err) => {
  console.log(err.message);
})

app.post('/posts', (req, res) => {
  Post.create(req.body).then((post) => {
    console.log(post);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})
// INDEX
app.get('/', (req, res) => {
  Post.find().then((posts) => {
  res.render('post-index', { posts: posts});
   console.log(req.cookies);
}).catch((err) => {
  console.log(err);
})
})

// SUBREDDIT
app.get('/n/:subreddit', function(req, res) {
  Post.find({ subreddit: req.params.subreddit }).then((posts) => {
    res.render('post-subreddit.handlebars', { posts })
  }).catch((err) => {
    console.log(err)
  })
});

app.get('/posts/new', (req, res) => {
  res.render('posts-new', {});
})
app.get('/posts/:id', function (req, res) {
  // LOOK UP THE POST
  Post.findById(req.params.id).populate('comments').then((post) => {
    res.render('post-show.handlebars', { post})
  }).catch((err) => {
    console.log(err.message)
  })
})
// CREATE Comment
app.post('/posts/:postId/comments', function (req, res) {
  // INSTANTIATE INSTANCE OF MODEL
  const comment = new Comment(req.body)
  // SAVE INSTANCE OF Comment MODEL TO DB
  comment.save().then((comment) => {
    return Post.findById(req.params.postId)
  }).then((post) => {
    post.comments.unshift(comment)
    return post.save()
  }).then((post) => {
    res.redirect(`/`)
  }).catch((err) => {
    console.log(err)
  })
})
// SIGN UP POST
app.post('/sign-up', (req, res) => {
  // Create User and JWT
  const user = new User(req.body);

  user.save().then((user) => {
        var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
    return res.status(400).send({ err: err });
  });
});

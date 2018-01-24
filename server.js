const express = require('express')
const app = express()
var bodyParser = require('body-parser');
require('./controllers/posts.js')(app);

app.use(bodyParser.urlencoded({ extended: true }));


var Post = require('./models/post');

module.exports = (app) => {

  // CREATE
  app.post('/posts', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    var post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      // REDIRECT TO THE ROOT
      return res.redirect('/');
    })
  });

};

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

app.get('/posts/new', (req, res) => {
  res.render('posts-new', {});
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

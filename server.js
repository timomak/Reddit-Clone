const express = require('express')
const app = express()
var bodyParser = require('body-parser');
require('./controllers/posts.js')(app);
var Post = require('./models/post');


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('home', {});
})
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

app.get('/posts/new', (req, res) => {
  res.render('post-new', {});
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

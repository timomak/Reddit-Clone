const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.render('home', {});
})
app.listen(3000, () => console.log('Example app listening on port 3000!'))

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

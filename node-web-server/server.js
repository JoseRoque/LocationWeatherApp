const express = require('express');
const hbs = require('hbs');

var app = express();
app.set('view engine', 'hbs'); // view is default directory, express uses for templates
app.use(express.static(__dirname + '/public')); // apply middleware
// serving up directory, 3 above lines and 1 listen line is all we need

// register routehandler
// request: headers, body info, mehtod made w request to path
// response: up to us, http status codes, customized data, etc.
app.get('/', (req, res) => {
  //res.send('<h1>Hello Express</h1>'); // allows us to respond to request
  // res.send({
  //   name: 'Andrew',
  //   likes: [
  //     'Biking',
  //     'Food'
  //   ]
  // }); // data type is application/json tells browser whether android, iOS, or browser
  res.render('home.hbs', {
    pageTitle: 'Home page',
    currentYear: new Date().getFullYear(),
    welcome: 'Welcome to my website'
  });

});

app.get('/about', (req, res) => {
  // res.send('About page');
  // 2nd arg values we want to pass to page
  res.render('about.hbs', {
    pageTitle: 'About page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
}); // bind to a port

// templates: inject values into page to feed, render html in dynamic way to inject
// data, allow for resuse markup for things like headers and footers
// handlebars.js view engine for express
//

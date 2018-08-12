const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('getUpperCase', (text) => {
    return text.toUpperCase();
});

app.use( (req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to open file server.log');
        }
    });
    next();
});

// app.use( (req, res, next) => {
//     res.render('maintenance.hbs');
// });

hbs.registerPartials(__dirname + '/views/partials');
/* --- this is root page "server.js" --- */
app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        message : 'Welcome to home page'
    });
});

/* --- This is about page --- */
app.get('/about', (request, response) => {
    response.render('about.hbs',{
        pageTitle : 'About Us'
    });
});

/* --- This is about_us Page --- */
app.get('/author', ( req, res ) => {
    res.send({
        name: 'Rahul Raj',
        hobbies: ['Chess', 'Coding', 'Singing']
    });
});

app.listen( (3000), ()=> {
    console.log('Server is Running on port 3000');
});
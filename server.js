const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('vire engine','hbs');
module.exports.app = app;
hbs.registerHelper('getCurrentYear',() => new Date().getFullYear());
hbs.registerHelper('toUpperCase',(text) => text.toUpperCase());

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.path}`
    fs.appendFile('server.log',log + '\n');
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));
app.get('/',(req,res) => {
    res.status(404).send({
        error : 'Page not found',
        Name : 'Should to wait'
    });
    // res.render('home.hbs',{
    //     pageTitle : 'Home Page'
    // });
});

app.get('/about',(req,res) => {
    res.render('help.hbs',{
        pageTitle : 'Help Page'
});
});

app.get('/bad',(req,res) => {
    res.send({
        'status':'404',
        'message': 'Page not found'
    });
});
app.listen(3000,() => console.log('Sever Started..!'));

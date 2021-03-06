var http = require ('http');       // For serving a basic web page.
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var article = require('./models/articles');
var _ = require('underscore');

var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/HelloMongoose';


mongoose.connect(uristring);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection.error:'));

db.once('open', function callback () {
    console.log('connected to mongodb');
});

// The http server will listen to an appropriate port, or default to
// port 5000.

var routes = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.engine('html', require('hogan-express'));
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

setInterval(function(){
    console.log("Interval reached");
    console.log("update");
    article.find({},function(err,articles){
        _.each(articles,function(updateArticle){
            var time = new Date().getTime() -  updateArticle.postDate.getTime();
            var updatedScore = (updateArticle.votes-1)/(time+1);
            updateArticle.score = updatedScore;
            updateArticle.save(function(err){
                console.log("scores updated")
            });
        });
    });
}, 3600000);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
module.exports = app;

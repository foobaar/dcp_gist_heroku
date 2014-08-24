var http = require ('http');       // For serving a basic web page.
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var monk = require('monk');

var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/HelloMongoose';

//ugly hack
//require node modules (see package.json)
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

//connect away
MongoClient.connect(uristring, function(err, db) {
  if (err) throw err;
  console.log("Connected to Database");

  //create collection
  db.createCollection("usercollection", function(err, collection){
     if (err) throw err;

      console.log("Created usercollection");
      console.log(collection);
  });
});
//end of fucking ugly hack



// The http server will listen to an appropriate port, or default to
// port 5000.
var db = monk(uristring); 
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


// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
module.exports = app;
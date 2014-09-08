var express = require('express');
var article = require('../models/articles');
var path = require('path');
var router = express.Router();
var mongoose = require('mongoose');

/*GET articles. */
router.get('/articles', function(req, res){
	article.find({}, function(err, articles){
		if(req.get('Content-Type')==='application/json'){
    		res.setHeader('Content-Type', 'application/json');
    	    res.json(docs);
		}
	    res.render('index',{array: articles});
   });
});

/*POST Articles*/
router.post('/articles', function(req, res){
	res.setHeader('Content-Type', 'application/json');
    var path = req.body.path;
    article.findOne({path: req.body.path}, function(err, articleFound){
        if(err)
            console.log("error");
        else 
            article.findOneAndUpdate({path: req.body.path},  {$inc: {votes: 1}}, function(err){
                if(err) {
                     		res.json("error while posting vote");
                     	}
                else {
                		res.json("vote successful");
                }   
            });

        if(articleFound) {
            res.json("article already exists");
        }     
        else {
                var currentTime = new Date();
                var newArticle = new article({name: req.body.name, 
                                              path: req.body.path, 
                                              votes: 0, type: "article", 
                                              postDate: currentTime,
                                              score:1});
                newArticle.save(function(err){
                if(err)
                    res.json("error while posting article");
                else
                    res.json();
                });
        }
    });

});

/*POST Vote for Article*/
router.post('/vote', function(req,res){
	res.setHeader('Content-Type', 'application/json');
    article.findOneAndUpdate({path: req.body.path},  {$inc: {votes: 1}}, function(err){
        if(err)
            res.json("error while posting vote");
        else    
            res.json("vote successful");
    });
});

/* GET Default mapping*/
router.get('/', function(req, res) {
  res.send('alive');
});

var cleanUrl = function(url) {
	/*this regular expression removes protocols(eg. https) from urls*/
		return url.replace(/.*?:\/\//g, "");
}
/*number of votes**/
module.exports = router;
var express = require('express');
var article = require('../models/articles');
var path = require('path');
var router = express.Router();
var mongoose = require('mongoose');

/*GET articles. */
router.get('/articles', function(req, res){
	article.find({},  null, {sort:{score:-1}}, function(err, articles){
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
    var path = req.body.gist.path;
    article.findOne({path: req.body.gist.path}, function(err, articleFound){
        if(err)
            console.log("error");
        else 
            article.findOneAndUpdate({path: req.body.gist.path},  {$inc: {votes: 1}}, function(err){
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
                var newArticle = new article({name: req.body.gist.name, 
                                              path: req.body.gist.path, 
                                              votes: 1, type: "article", 
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
    var voteCount = 1;
    if(req.body.gist.unvote==='true'){
        voteCount = -1
    }
    article.findOneAndUpdate({path: req.body.gist.path},  {$inc: {votes: voteCount}}, function(err){
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
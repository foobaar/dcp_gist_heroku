var express = require('express');
var router = express.Router();

/*GET links from mongo*/
router.get('/articles', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');

    collection.find({type:"link"},{sort:[["score","desc"]]},function(e,docs){
	res.setHeader('Content-Type', 'application/json');
    res.json(docs);
    });
});


/*POST links to mongo */
router.post('/articles',function(req,res){

	var db = req.db;
	var url = cleanUrl(req.body.gist.path);
	var title = req.body.gist.name;
	var content = req.body.gist.content
	var currentTime = new Date();
	var collection = db.get('usercollection');

	res.setHeader('Content-Type', 'application/json');
    		
	collection.insert({
		"url" : url,
		"title": title,
		"votes": 0,
		"date": currentTime,
		"score":1.0,
		"type":"link"
	},function(err,doc){
		if(err){
			res.send("Post Failed");
		}
		else{
			res.json();
		}
	});

});


/*POST increment vote count */
router.post('/vote',function(req,res){
	var db = req.db;
	var votedUrl = req.body.url;
	var currentTime = new Date();

	res.setHeader('Content-Type', 'application/json');
	//find

	var collection = db.get('usercollection');
	var doc = collection.find({"url": votedUrl});
	console.log(doc[0]);
	var newScore = calculateScore(doc.score, 1)

	collection.update({
	 	"url": votedUrl 
	 			},
	   {
      	$inc: {votes: 1 },
      	$set: {score: newScore}
   		},
  	   { upsert: true }
  	   ,function(err,doc){
		if(err){
			res.send("Post Failed");
		}
		else{
			res.json();
		}
	});

});




/* GET Default mapping*/
router.get('/', function(req, res) {
  res.send('alive');
});


/*Add links for articles from newsDB*/
router.get('/newarticle', function(req, res) {
    res.render('newarticle', { title: 'Add New Article' });
});

 var calculateScore = function(votes,score){
       return score+votes;
}

var cleanUrl = function(url) {
	/*this regular expression removes protocols(eg. https) from urls*/
		return url.replace(/.*?:\/\//g, "");
}
/*number of votes**/
module.exports = router;
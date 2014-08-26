/*
run as a seperate node process. 
This is run hourly to update the scores of each article
Should this be run hourly?
*/
var mongo = require('mongodb');

var minutes = 1, the_interval = minutes * 60 * 1000;
setInterval(function() {
 //    var db = monk('localhost:27017/nodetest1');
 //    var collection = db.get('usercollection');
 //    collection.find({type:"link"},{sort:[["score","desc"]]},function(e,docs){
	// console.log(docs);
    });
  console.log("Completed Updating mongo with new scores");
}, the_interval);



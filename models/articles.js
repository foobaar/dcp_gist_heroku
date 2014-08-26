var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 var articleSchema = mongoose.Schema({ name: String,
    path: String,
  	type: String,
  	votes: Number,
  	postDate: Date,
  	dateInMilliseconds: Number}); 


var article = mongoose.model('HelloMongoose', articleSchema);

module.exports = article;
var upVote = function(path){
    $.ajax({
  type: 'POST',
  url: 'http://mighty-woodland-8571.herokuapp.com/vote',
  data: {"gist":{"path": path}},
  dataType: 'json',
  success: function(data){
    var voteSpanId = path+"-vote";
    var voteCountSpan = document.getElementById(voteSpanId);
    var vote = voteCountSpan.innerHTML;
    vote++;
    voteCountSpan.innerHTML = vote;
  },
  error: function(xhr, type){
    alert('Oops! We couldn\'t register your vote');
  }
});
};

var addUrlToCache = function(url,name){
  var savedLinks = localStorage["savedLinks"];
  if (typeof savedLinks != 'undefined'){
    savedLinks = JSON.parse(savedLinks);
    savedLinks.push(url);
  }
  else {
    savedLinks = [url];
  }
  localStorage["savedLinks"] = JSON.stringify(savedLinks);
  var link  = document.getElementById(name);
  link.style.color = 'purple';
};

var checkSavedLinks = function() {
  var artilceTable = document.getElementsByTagName("table")[0];
  var artilces = artilceTable.getElementsByTagName("td");
  _.each(artilces,function(article){
     var url = article.children[0].getAttribute("href");
     var name = article.children[0].getAttribute("id");
     if(url!=null) 
     {
         var savedLinks = localStorage["savedLinks"];
          if (typeof savedLinks != 'undefined'){
        savedLinks = JSON.parse(savedLinks);
        if(savedLinks.length > 0){
          var saved = _.find(savedLinks, function(path){
            return path == url;
          });
          if (saved) {
            var link = document.getElementById(name);
            link.style.color = 'purple';
          }
        }
      }
     }
  });
};
 function upVote(path){
    $.ajax({
  type: 'POST',
  url: 'http://mighty-woodland-8571.herokuapp.com/vote',
  data: { "path": gist.path},
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
    }

function addUrlToCache(url){
  if(!url){
    $.jStorage.set(url, "visited");
}
}
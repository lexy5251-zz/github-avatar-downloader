var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options =  {
  url: "https://api.github.com/repos/" +
  repoOwner + "/" +
  repoName + "/contributors",
  headers: {
      'User-Agent': 'request',
      'Authorization': 'secrets.js'
    }
  }

  request(options, function(err, res, body) {
    if (options.repoOwner === undefined|| options.repoName === undefined){
      console.log("some thing wrong!");
    }
    var result = JSON.parse(body);
    for (var i = 0; i < result.length; i++) {
     var filePath = 'image/image'+i+'.jpg';
     var url = result[i].avatar_url;
     console.log('Downloaded image from ' + url);
     cb(url, filePath);
    }
  });
}

function downloadImageByURL(url, filePath) {
   var fs = require('fs');
  request.get(url)
         .on('error', function(err){
          throw err;
         })
         .on('response', function(response){

         })

         .pipe(fs.createWriteStream(filePath));

}


getRepoContributors(process.argv[2], process.argv[3], downloadImageByURL);


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
    // the callback function is so hard to understand
    cb(err, body);
    var arr = JSON.parse(body);

    for (var i = 0; i < arr.length; i++) {
      console.log(arr[i].avatar_url);
    }
  });

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
 // console.log("Result:", result);
});

var DEVELOPMENT_URL = "http://localhost:3000"
var PRODUCTION_URL = "http://timecapsule.io"

var LIVE_URL = DEVELOPMENT_URL;

// GLOBAL
var diffbotToken = "c71959b7b4f679b683a289a4d7dfa0bd";

var tt;

 //Extned Date to add days
Date.prototype.addDays = function(days){
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}   

function postArticle(time, url, callback) {

	chrome.cookies.get({ url: LIVE_URL, name: 'login' },
  	function (cookie) {
  	  if (cookie) {
  	    var auth_token = cookie.value;

  	    auth_url = LIVE_URL + '/getuser/' + auth_token;

  	    $.post(auth_url, function(data) {
  	    	var user_id = data.user_id; 

			    var dat = new Date();
			    var send_at_time = dat.addDays(time);


			    var diffbotUrl = "https://www.diffbot.com/api/article?token=" + diffbotToken + "&url=" + url + "&summary=true";

			    $.get(diffbotUrl, function(data) {
				    var summary = data.summary;
				    var title = data.title;

            tt = auth_token;

	 			    var article_url = LIVE_URL + '/users/' + user_id + '/articles?auth_token=' + auth_token;

            // var article_url = LIVE_URL + '/users/' + user_id + '/articles'

            var views = chrome.extension.getViews({ type: "popup" });


	 			    $.post(article_url, {article: {url: url, send_at: send_at_time, summary: summary, title: title}  })

            .done(function(data) { 
              object = data;

              if (object.status == "created") {
                if (0 < views.length) {
                callback(true);
                }else {}
              }else{
                if (0 < views.length) {
                callback(false);
                }else {}
              }

            })
            .fail(function() { 
              if (0 < views.length) {
                callback(false);
              }else{}
            });
			    });
  	    });
  	  }
  	 else {
  	  
  	 }
	});
}

//mixpanel dependencies
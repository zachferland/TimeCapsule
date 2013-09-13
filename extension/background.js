var DEVELOPMENT_URL = "http://localhost:3000"
var PRODUCTION_URL = "http://timecapsule.io"

var LIVE_URL = DEVELOPMENT_URL;

var auth_token;
var url;
var time;

//Add days to current time
Date.prototype.addDays = function(days){
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}   

function postArticle(send_time, article_url, callback) {
  url = article_url;
  time = send_time;

	chrome.cookies.get({ url: LIVE_URL, name: 'login' },
  	function (cookie) {
  	  if (cookie) {
  	    auth_token = cookie.value;
        getUser(callback);
  	  }
	});
}

function getUser(callback) {
  auth_url = LIVE_URL + '/getuser/' + auth_token;
  $.post(auth_url, function(data) {
      var user_id = data.user_id; 
      trackUser(user_id);
      saveArticle(user_id, callback);
  });
}

function getSendTime(time) {
  var dat = new Date();
  return dat.addDays(time);
}

function trackUser(user_id) {
  mixpanel.identify(user_id);
  mixpanel.track('Send Article', {"Send Time": time});
  mixpanel.people.set({
    "Last Use": new Date()       
  });
}

function saveArticle(user_id, callback) {
  var send_at_time = getSendTime(time);
  var article_url = LIVE_URL + '/users/' + user_id + '/articles?auth_token=' + auth_token;
  var views = chrome.extension.getViews({ type: "popup" });
  $.post(article_url, {article: {url: url, send_at: send_at_time, summary: "", title: ""}  })
  .done(function(data) { 
    object = data;
    if (object.status == "created") {
      if (0 < views.length) { callback(true); }
    }else{
      if (0 < views.length) {callback(false);}
    }
  })
  .fail(function() { 
    if (0 < views.length) { callback(false); }
  });
}



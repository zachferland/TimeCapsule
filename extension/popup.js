var DEVELOPMENT_URL = "http://localhost:3000"
var PRODUCTION_URL = "http://timecapsule.io"

var LIVE_URL = DEVELOPMENT_URL;

var url = {
  get: function() {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
     url = tabs[0].url;
   });
  }
};

var articleSaved = {

  huh: function(success) {
    if (success) {
      articleSaved.success(); 
    }else{
      articleSaved.fail();     
    }
  },

  success: function() {
    $(".loading").slideUp('slow');
    setTimeout(function(){$(".saved").slideDown('slow');},500);
    setTimeout(function(){window.close();},2100);
  },

  fail: function() {
    $(".loading").slideUp('slow');
    setTimeout(function(){$(".error").slideDown('slow');},500);
    time.listener();
  }
};

var time = {
	listener: function() {
		$(".time-val").one('click', function() { 
      var timevalue = parseInt($(this).data("value")); 
      bgPage = chrome.extension.getBackgroundPage();
      bgPage.postArticle(timevalue, url, articleSaved.huh);
      $(".error").hide();
      $(".loading").slideDown('slow');
		});
	}
};

document.addEventListener('DOMContentLoaded', function () {
	url.get();
  chrome.cookies.get({ url: LIVE_URL , name: 'login' },
    function (cookie) {
      if (cookie) {
        $("#app").show();
		    time.listener();
      } else {
        $("#login").show();
       $(".twitter-button").click(function() { 
          chrome.tabs.create({url: LIVE_URL + '/users/auth/twitter'});
        });
      }
  });
});



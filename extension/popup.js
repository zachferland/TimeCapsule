var DEVELOPMENT_URL = "http://localhost:3000"
var PRODUCTION_URL = "http://timecapsule.io"

var LIVE_URL = PRODUCTION_URL;

 // start Mixpanel 
(function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src='https://cdn.mxpnl.com/libs/mixpanel-2.2.min.js';f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f);b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==
typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");for(g=0;g<i.length;g++)f(c,i[g]);
b._i.push([a,e,d])};b.__SV=1.2}})(document,window.mixpanel||[]);
mixpanel.init("e36c53c122ec4bfa928d3501360c5f9a");
 // end Mixpanel

var url = {
  get: function() {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
     url = tabs[0].url;
     var div = document.getElementById('url');
	   div.innerHTML = url;
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

      mixpanel.track('Send Article', {"Send Time": timevalue});
      mixpanel.people.set({
        "Last Use": new Date()       
      });

		});
	}
};

document.addEventListener('DOMContentLoaded', function () {   //wait to popup dom is loaded
  //get url
	url.get();
  //is the user logged in huh
  chrome.cookies.get({ url: LIVE_URL , name: 'login' },
    function (cookie) {
      if (cookie) {
        $("#app").show();
        var auth_token = cookie.value;
        auth_url = LIVE_URL + '/getuser/' + auth_token;
        $.post(auth_url, function(data) {
          var user_id = data.user_id;
          mixpanel.identify(user_id);
          mixpanel.track('Open Extension');
        });
		    time.listener();
      } else {
        //user NOT logged in  
        $("#login").show();
        mixpanel.track('Open Extension');
       $(".twitter-button").click(function() { 
          chrome.tabs.create({url: LIVE_URL + '/users/auth/twitter'});
        });
      }
  });
});



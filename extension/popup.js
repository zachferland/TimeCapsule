 // start Mixpanel 
(function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src='https://cdn.mxpnl.com/libs/mixpanel-2.2.min.js';f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f);b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==
typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");for(g=0;g<i.length;g++)f(c,i[g]);
b._i.push([a,e,d])};b.__SV=1.2}})(document,window.mixpanel||[]);
mixpanel.init("e36c53c122ec4bfa928d3501360c5f9a");
 // end Mixpanel


// GLOBAL
var diffbotToken = "c71959b7b4f679b683a289a4d7dfa0bd";

//Extned Date to add days
Date.prototype.addDays = function(days){
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}


var url = {

  get: function() {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
     url = tabs[0].url;
     var div = document.getElementById('url');
	 div.innerHTML = url;
   });
  }

};


var time = {

	listener: function() {
    //allows only one click, if rails i have to add it again
		$(".time-val").one('click', function() { 
      $(".error").hide();

      // Show saving.... update
      // $(".progress").animate({height: "100px"}, 500);
      $(".loading").slideDown('slow');

			var timevalue = parseInt($(this).data("value")); 

      mixpanel.track('Send Article', {"Send Time": timevalue});

      mixpanel.people.set({
        "Last Use": new Date()       
      });

      console.log(timevalue);


			chrome.cookies.get({ url: 'http://localhost:3000/', name: 'login' },
  				function (cookie) {
  				  if (cookie) {
  				    var auth_token = cookie.value;

  				    auth_url = 'http://localhost:3000/getuser/' + auth_token;

  				    $.post(auth_url, function(data) {
  				    	var user_id = data.user_id;
  				    	  

						var dat = new Date();
						var send_at_time = dat.addDays(timevalue);
			
						var diffbotUrl = "http://www.diffbot.com/api/article?token=" + diffbotToken + "&url=" + url + "&summary=true";
			
						$.get(diffbotUrl, function(data) {
							var summary = data.summary;
							var title = data.title;
							var div = document.getElementById('url');
	 						div.innerHTML = title;
			
	 						var article_url = 'http://localhost:3000/users/' + user_id + '/articles?auth_token=' + auth_token;
			
	 						$.post(article_url, {article: {url: url, send_at: send_at_time, summary: summary, title: title}  })
              .done(function() { 
                $(".loading").slideUp('slow');
                setTimeout(function(){$(".saved").slideDown('slow');},500);
                setTimeout(function(){window.close();},2100);
              
              })
              .fail(function() { 
                $(".loading").slideUp('slow');
                setTimeout(function(){$(".error").slideDown('slow');},500);
                time.listener();
               });
	
						});

  				    });
				
  				  }
  				  else {
  				    console.log('Can\'t get cookie! Check the name!');
  				  }
			});


		});
	}
};



document.addEventListener('DOMContentLoaded', function () {   //wait to popup dom is loaded
	url.get();

  //is the user logged in huh
  chrome.cookies.get({ url: 'http://localhost:3000/', name: 'login' },
    function (cookie) {
      if (cookie) {
        //user logged in
        console.log('You are logged in');

        $("#app").show();

        var auth_token = cookie.value;

        auth_url = 'http://localhost:3000/getuser/' + auth_token;

        $.post(auth_url, function(data) {
          var user_id = data.user_id;
          mixpanel.identify(user_id);
          mixpanel.track('Open Extension');
        });
		
		    time.listener();

      } else {
        //user NOT logged in    
        console.log('You are not logged in');

        $("#login").show();

        mixpanel.track('Open Extension');

        //user NOT logged in   
       $(".twitter-button").click(function() { 

          chrome.tabs.create({url: "http://localhost:3000/users/auth/twitter"});

        });
       
      }
  });

});



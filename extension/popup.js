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
		$(".time-val").click(function() { 
      // Show saving.... update
      // $(".progress").animate({height: "100px"}, 500);
      $(".loading").slideDown('slow');

			var timevalue = parseInt($(this).data("value")); 

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
                setTimeout(function(){window.close();},1900);
              
              })
              .fail(function() { alert("error"); });
			
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
		
		time.listener();

      } else {
        //user NOT logged in    
        console.log('You are not logged in');
        var div = document.getElementById('url');
        div.innerHTML = "You are not logged in";
       
      }
  });

});



// GLOBAL
var diffbotToken = "c71959b7b4f679b683a289a4d7dfa0bd";

//Extned Date to add days
Date.prototype.addDays = function(days){
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}


chrome.cookies.get({ url: 'http://localhost:3000/', name: 'login' },
  function (cookie) {
    if (cookie) {
      console.log(cookie.value);
      auth_url = 'http://localhost:3000/getuser/' + cookie.value;
      $.post(auth_url, function(data) {
      	console.log(data);
      	var user_id = data.user_id;
      	console.log(user_id);
      });

    }
    else {
      console.log('Can\'t get cookie! Check the name!');
    }
});


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
		$(".time-button").click(function() { 
			var timevalue = parseInt($(this).val());   

			var dat = new Date();
			var send_at_time = dat.addDays(timevalue);

			var diffbotUrl = "http://www.diffbot.com/api/article?token=" + diffbotToken + "&url=" + url + "&summary=true";

			$.get(diffbotUrl, function(data) {
				var summary = data.summary;
				var title = data.title;
				var div = document.getElementById('url');
	 			div.innerHTML = title;

	 			var userid = 1;

	 			var article_url = 'http://localhost:3000/users/' + userid + '/articles?auth_token=' + auth_token;

	 			$.post(article_url, {article: {url: url, send_at: send_at_time, summary: summary, title: title}  });

			});

		});
	}
};



document.addEventListener('DOMContentLoaded', function () {
	url.get();
	time.listener();
});



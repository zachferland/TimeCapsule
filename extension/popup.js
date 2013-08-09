// GLOBAL
var diffbotToken = "c71959b7b4f679b683a289a4d7dfa0bd";


Date.prototype.addDays = function(days){
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

// Some actual code

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

	 			$.post('http://localhost:3000/articles', {article: {url: url, send_at: send_at_time, summary: summary, title: title}  });

			});

		});
	}
};



document.addEventListener('DOMContentLoaded', function () {
	url.get();
	time.listener();
});



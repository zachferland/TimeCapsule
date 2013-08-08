
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

			$.post('http://localhost:3000/articles', {article: {url: url, send_at: send_at_time}  });
		});
	}
};



document.addEventListener('DOMContentLoaded', function () {
	url.get();
	time.listener();
});



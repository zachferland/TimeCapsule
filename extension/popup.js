


// Some actual code

var url = {

  get: function() {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
     url.post(tabs[0].url);
   });
  },

  post: function(url) {
  	$.post('http://localhost:3000/articles', {article: {url: url}});
  }

};


var time = {

	listener: function() {
		$(".time-button").click(function() { 
			var timevalue = $(this).val();   
			var div = document.getElementById('content-url');
			div.innerHTML = timevalue; 
		});
	}
};


document.addEventListener('DOMContentLoaded', function () {
	url.get();
	time.listener();
});



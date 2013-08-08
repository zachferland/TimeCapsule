
// document.addEventListener('DOMContentLoaded', function () {
//   chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
//     var url = tabs[0].url;
//     var div = document.getElementById('content-url');
//     div.innerHTML = url;
//   });
// });



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


document.addEventListener('DOMContentLoaded', function () {
	url.get();
});


// $(document).ready(function() {
//    $(".time-button").click(function() {    
// 		//var valueofbutton = $(this).val();    
// 		var div = document.getElementById('content-url');
//         div.innerHTML = "hello";
// 	});
// });



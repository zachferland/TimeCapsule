function postArticle(e,t,n){url=t;time=e;chrome.cookies.get({url:LIVE_URL,name:"login"},function(e){if(e){auth_token=e.value;getUser(n)}})}function getUser(e){auth_url=LIVE_URL+"/getuser/"+auth_token;$.post(auth_url,function(t){var n=t.user_id;trackUser(n);saveArticle(n,e)})}function getSendTime(e){var t=new Date;return t.addDays(e)}function trackUser(e){mixpanel.identify(e);mixpanel.track("Send Article",{"Send Time":time});mixpanel.people.set({"Last Use":new Date})}function saveArticle(e,t){var n=getSendTime(time);var r=LIVE_URL+"/users/"+e+"/articles?auth_token="+auth_token;var i=chrome.extension.getViews({type:"popup"});$.post(r,{article:{url:url,send_at:n,summary:"",title:""}}).done(function(e){object=e;if(object.status=="created"){if(0<i.length){t(true)}}else{if(0<i.length){t(false)}}}).fail(function(){if(0<i.length){t(false)}})}var LIVE_URL="http://timecapsule.io";var auth_token;var url;var time;Date.prototype.addDays=function(e){var t=new Date(this.valueOf());t.setDate(t.getDate()+e);return t}
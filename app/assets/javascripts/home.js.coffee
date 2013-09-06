# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
 # You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/


$(".learn-more").click (event) ->
  event.preventDefault()
  mixpanel.track('Click Learn More Button ')
  alert("hello")
  n = $(document).height()
  $("html, body").animate
    scrollTop: "100px"
  , "50"


$(document).ready ->

  $(".learn-more").click (event) ->
    event.preventDefault()
    mixpanel.track('Click Learn More Button')
    n = $(document).height()
    $("html, body").animate
      scrollTop: 600
    , "50"





  console.log('hello');
  $(".extension-icon").click ->
    $(".extension").slideDown "slow"

  $(".time-val").click ->
    $(".loading").slideDown('slow').delay(1100).slideUp('slow').delay 400000, ->

      setTimeout(
        $(".saved").slideDown('slow'); 
      , 5000);


  $(".article-1").click ->
    $(".extension").slideUp '300'

    $(".screen").css "overflow-y", "hidden"

    $(".time").delay(1000).show(1000)

    setTimeout (-> 
      $(".time-box").html("1 month later")
      setTimeout (-> 
        $(".time-box").html("2 months later")
        setTimeout (-> 
          $(".time-box").html("3 months later")
          setTimeout (-> 
            $(".inbox").show 'slow' 
            $(".url-box").html "http://yourinbox.com"
            $(".tab-box .text").html "Inbox - 1 New Message"
            $(".tab-box .icon").html "<img src='assets/mail-icon.png' height='23' width='23' />"
          ), 1600
        ), 800
      ), 800
    ), 1600

    



  $(".the-email").click ->
    $(".email").show 'slow'
    $(".url-box").html  "http://yourinbox.com?email=HkdhjgHCMWIM81La19LJjs"
    $(".tab-box .text").html "Inbox - TimeCapsule.io"


  $(".read-more").click ->
    $(".final").show 'slow'
    $(".url-box").html  "http://somearticle.com"
    $(".tab-box .text").html "Blog - Such a Rush?"
    $(".tab-box .icon").html "<img src='assets/pen-icon.png' height='23' width='23' />"


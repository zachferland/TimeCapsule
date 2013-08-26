# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
 # You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/



$(document).ready ->
  $(".extension-icon").click ->
    $(".extension").slideDown "slow"

  $(".time-val").click ->
    $(".loading").slideDown('slow').delay(1100).slideUp('slow').delay 400000, ->

      $(".saved").slideDown('slow').delay 700, ->

        $(".extension").slideUp '200', ->

          $(".screen").css "overflow-y", "hidden"
          $(".url-box").html  ""

          $(".time").show(1000).delay 3000, ->

            $(".time-box").html("hello").delay 1500, ->

              $(".time-box").html("2 months later").delay 2000, ->
  
                $(".time-box").html("3 months later").delay 1500, ->
  
                  $(".inbox").show 'slow'
                  $(".url-box").html  "http://yourinbox.com"


  $(".the-email").click ->
    $(".email").show 'slow'
    $(".url-box").html  "http://yourinbox.com?email=HkdhjgHCMWIM81La19LJjs"


  $(".read-more").click ->
    $(".final").show 'slow'
    $(".url-box").html  "http://somearticle.com"


# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
 # You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/



$(document).ready ->
  console.log('hello');
  $(".extension-icon").click ->
    $(".extension").slideDown "slow"

  $(".time-val").click ->
    $(".loading").slideDown('slow').delay(1100).slideUp('slow').delay 400000, ->

      setTimeout(
        $(".saved").slideDown('slow'); 

      # $(".saved").slideDown('slow').delay 700, ->

        # setTimeout( 
        #   $(".extension").slideUp '200'

        #   $(".screen").css "overflow-y", "hidden"
        #   $(".url-box").html  ""

        #   setTimeout( 
        #     $(".time").show(1000)
        #     # $(".time").show(1000).delay 3000, ->

        #     setTimeout(  
        #       $(".time-box").html("hello")

        #       setTimeout(  
        #         $(".time-box").html("2 months later")

        #         setTimeout(  
        #           $(".time-box").html("3 months later")

        #           $(".inbox").show 'slow'
        #           $(".url-box").html  "http://yourinbox.com"

        #         , 5000);
        #       , 5000);
        #     , 5000);
        #   , 5000);
        # , 5000);
      , 5000);


  $(".article-1").click ->
    $(".extension").slideUp '300'

    $(".screen").css "overflow-y", "hidden"
    $(".url-box").html("")

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
          ), 1600
        ), 800
      ), 800
    ), 1600

    



  $(".the-email").click ->
    $(".email").show 'slow'
    $(".url-box").html  "http://yourinbox.com?email=HkdhjgHCMWIM81La19LJjs"


  $(".read-more").click ->
    $(".final").show 'slow'
    $(".url-box").html  "http://somearticle.com"


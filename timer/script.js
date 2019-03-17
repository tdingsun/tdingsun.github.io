var w;
var h;
var count = 0;
var hue = 0;
var imgcount = 0;


$(document).ready(function(event){
  if(navigator.onLine){
    $("#container").html("You are connected");
  } else {
    $("#container").html("Welcome to the world of disconnection");

  }
});

$(window).scroll(function(event){

});



$(window).resize(function(){
  w = $(window).width();
  h = $(window).height();
});
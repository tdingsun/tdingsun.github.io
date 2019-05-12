var width;
var height;


var svgArray = [];
var currIndex = 0;




$(document).ready(function(event){

  loadAllSVGs(); //load all SVGs
  $("#picture").append(svgArray[currIndex]); //start with the first one

  //event listener for scroll: have to do it this way because of chrome
  window.addEventListener("wheel", randomize, {passive: false});

  $("#picture").click(function(){ //a click will randomize it as well
    nextSVG();
  });
});

$(window).resize(function(){
  resize();
});

function nextSVG(){
  if(currIndex == svgArray.length - 1){
    currIndex = 0;
  } else {
    currIndex++;
  }
  $("#picture").empty();
  $("#picture").append(svgArray[currIndex]);
}

function randomize(){
  var randIndex = Math.floor(Math.random() * svgArray.length);
  currIndex = randIndex;
  $("#picture").empty();
  $("#picture").append(svgArray[randIndex]);
  console.log("rando");
}

function loadAllSVGs() {
  for(let i = 2; i < 76; i++){
    jQuery.get("images/" + i + ".svg", function(data){
      var $svg = jQuery(data).find('svg');
      $svg.attr("preserveAspectRatio", "none");
      $svg.find("line").each(function(){
        $(this).attr("preserveAspectRatio", "none");
      });
      $svg.find("rect").each(function(){
        $(this).attr("preserveAspectRatio", "none");
      });
      $svg.find("path").each(function(){
        $(this).attr("preserveAspectRatio", "none");
      });
      svgArray.push($svg);
      console.log("loaded");

    });
  }
}

function resize(){
  width = $(window).width();
  height = $(window).height();
}


var width;
var height;
const numImages = 163;


var svgArray = [];




$(document).ready(function(event){

  loadSVGs();


  jQuery.get("images/2.svg", function(data){
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
    $("#picture").append($svg);
  });

  // $(window).scroll(function(){
  //   console.log("scroll");
  //   randomize();
  // });

  window.addEventListener("wheel", randomize, {passive: false});



  $("#picture").click(function(){
    randomize();
  });

  document.onscroll  = randomize;
});


$(window).resize(function(){
  resize();
  randomize();
});

function randomize(){
  var randIndex = Math.floor(Math.random() * svgArray.length);
  $("#picture").empty();
  $("#picture").append(svgArray[randIndex]);
  console.log("rando");
}

function loadSVGs() {
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

function shuffle(array){
  for(let i = 0; i < array.length; i++){
    var randIndex = Math.floor(Math.random()*array.length);
    var tmp = array[i];
    array[i] = array[randIndex];
    array[randIndex] = tmp;
  }
  return array;
}


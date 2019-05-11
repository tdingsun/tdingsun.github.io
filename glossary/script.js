var width;
var height;
var divWidth;
const numImages = 163;


var svgArray = [];

const margin = 20;


var synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
var notes = Tone.Frequency("G2").harmonize([0, 4, 7, 12, 16, 19, 24, 28, 31, 36, 40]);
var randNote;

StartAudioContext(Tone.context, 'div').then(function(){
  //started
  console.log("clicked");
});

//have to click to start audio context
$(document).click(function(){
  Tone.start();
  console.log("clicked");
});

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

  $(document).scroll(function(){
    console.log("scroll");
    var randIndex = Math.floor(Math.random() * svgArray.length);
    $("#picture").empty();
    $("#picture").append(svgArray[randIndex]);
  });
});






$(window).resize(function(){
  resize();
});

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

    });
  }
}

function resize(){
  width = $(window).width();
  height = $(window).height();
  divWidth = width/3 - margin;
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


var width;
var height;

var s;
var m;
var h;
var ms;

var numSeconds;

var hue = 0;
var str = "RED CARMINE CRIMSON CORAL BLUSH ORANGE APRICOT AMBER PEACH OCHER SAND BEIGE LEMON GERANIUM SPRING GRASS VIRIDIAN ROSEMARY FOREST OLIVE CERULEAN INDIGO VIOLET LILAC MAUVE PERIWINKLE LAVENDER PLUM SLATE GLASS COMMON MORAL MORTAL STONY STARRY CONSTANT VENGEFUL ROLLING SMOOTH ROCKY FUZZY FURRY CLEAN RICH TIGHT SPINY SHINY LUMPY LOVELY FIZZY RUNNY FUNNY FAST CANDID SHARP FORTUNE SORROW COIL MASON FIRE FREEZE ZEPHYR CONIFER MORTICIAN CORE FORK MISTAKE RAGE FEVER FERVOR CANDOR CANTILEVER HEAVEN HEATHEN ANTHEM CRAYON PASTURE DODGER CUNNING FLAKE SHATTER FLEE FLEX CARVE LIQUID FOLLOWS CORRAL STATION LOVER CONCH DIRT STEEL CLANG VIOLA CLARITY MARSH CLUE SWAMP BREEZE TOME RUNE FUME MOON MAGIC BOOK FUEL FUSE SPARK DOG SHADOW FACADE FLAT HONEY CURRY RICE PINE CYPRESS MUSK OCEAN SPICY SOUR VETIVER WOODSY MILDEW ACRID LOAM PEPPER JUNIPER EARTH TOBACCO YUZU CITRUS MOSS FRANKINCENSE VANILLA  BERRY THYME SPRUCE  SAGE RAIN PETRICHOR TEA HYACINTH  CAMPHOR CHICORY";
var words_arr = str.split(" ");

StartAudioContext(Tone.context, 'html').then(function(){
  //started
  console.log("startaudiocontext");
});

//have to click to start audio context
$(document).click(function(){
  //Tone.start();
  console.log("clicked");
});

var synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
var notes = Tone.Frequency("G2").harmonize([1, 3, 6, 8, 10, 
                                            3, 6, 8, 10, 13, 
                                            6, 8, 10, 13, 15, 
                                            8, 10, 13, 15, 18,
                                            10, 13, 15, 18, 20,
                                            13, 15, 18, 20, 22,
                                            15, 18, 20, 22, 25,
                                            18, 20, 22, 25, 27,
                                            20, 22, 25, 27, 30,
                                            22, 25, 27, 30, 32,
                                            25, 27, 30, 32, 34,
                                            27, 30, 32, 34, 37]);
var noteIndex = 0;


$(document).ready(function(event){
  width = $(window).width();
  height = $(window).height();




  for(var i = 0; i < 5; i++){ //number of columns
      var div = $('<div />').addClass("container")
      $("body").append(div);
  }

  for(var i = 0; i < 6; i++){
    var timerdiv = $('<div />').addClass("timer");
    timerdiv.css("left", i*width/5);
    timerdiv.css("top", height/2 - 10);
    if(i == 0){
      timerdiv.css("text-align", "left");

    } else if(i == 5){
      timerdiv.css("text-align", "right");
      timerdiv.css("left", i*width/5 - 40);
    } else {
      timerdiv.css("text-align", "center");
      timerdiv.css("left", i*width/5 - 20);
    }
    $("body").append(timerdiv);
  }

  numSeconds = 0;


  // if(navigator.onLine){
  //   $(".container").html("You are connected");
  // } else {
  //   $(".container").html("Welcome to the world of disconnection");
  // }

  timer();
  changeText(s, ms);

});

$(window).scroll(function(event){
  changeText(s, ms);
  synth.triggerAttackRelease(notes[noteIndex], "8n");
      noteIndex++;
      if(noteIndex >= notes.length){
        noteIndex = 0;
      }
});



$(window).resize(function(){
  width = $(window).width();
  height = $(window).height();
  $(".timer").each(function(i){
      if(i == 0){
        $(this).css("left", i*width/5);
      } else if(i == 5){
        $(this).css("left", i*width/5 - 40);
      } else {
        $(this).css("left", i*width/5 - 20);
      }
  })
});

function timer() {
  synth.triggerAttackRelease(notes[noteIndex], "2n");
      noteIndex++;
      if(noteIndex >= notes.length){
        noteIndex = 0;
      }
  var today = new Date();
  h = today.getHours();
  m = today.getMinutes();
  s = today.getSeconds();
  ms = today.getMilliseconds();
  changeColor(m, s, ms);
  changeText(s, ms);
  setTimer();
  var t = setTimeout(timer, 1000);
}

function changeColor(m, s, ms){
  var hue = 6*m + 0.1*s;
  $("body").css("color", "hsl(" + hue + ", 100%, 50%)");
}

function changeText(s, ms){
  var n = s + 1;
  var fsize = height/(n);

  $(".container").css("font-size", fsize);
  $(".container").empty();
  for(var i = 0; i < n; i++){
      var index = Math.floor(Math.random() * words_arr.length);
     $(".container").append(words_arr[index] + "<br>");
  }

}

function setTimer(){
  $(".timer").text(numSeconds);
  numSeconds += 1;

}
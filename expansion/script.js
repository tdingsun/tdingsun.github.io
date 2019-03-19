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


$(document).ready(function(event){
  width = $(window).width();
  height = $(window).height();

  for(var i = 0; i < 5; i++){ //number of columns
      var div = $('<div />').addClass("container");
      div.css("z-index", 5-i);
      var index = Math.floor(Math.random() * words_arr.length);

      div.text(words_arr[index].toLowerCase());
      $("body").append(div);
  }

  // if(navigator.onLine){
  //   $(".container").html("You are connected");
  // } else {
  //   $(".container").html("Welcome to the world of disconnection");
  // }

  timer();

  $(".container").click(function(e){
    var curr = e.target;
    var curr_w = parseInt($(curr).css("width"));
    console.log(curr_w);
    var curr_l = parseInt($(curr).css("left"));
    var div = $('<div />').addClass("child container");
    var index = Math.floor(Math.random() * words_arr.length);

    div.text(words_arr[index].toLowerCase());
    div.css("left", (curr_l + 5)/2);
    $(curr).append(div);
  });
});

$(window).scroll(function(event){
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
  var today = new Date();
  h = today.getHours();
  m = today.getMinutes();
  s = today.getSeconds();
  ms = today.getMilliseconds();
  var size = $(".container").size();
  var randIndex = Math.floor(Math.random() * size);
  $(".container").eq(randIndex).trigger("click");
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
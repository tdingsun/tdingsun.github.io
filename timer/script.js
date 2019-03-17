var width;
var height;

var s;
var m;
var h;
var ms;

var hue = 0;
var str = "RED CARMINE CRIMSON CORAL BLUSH ORANGE APRICOT AMBER PEACH OCHER SAND BEIGE LEMON GERANIUM SPRING GRASS VIRIDIAN ROSEMARY FOREST OLIVE CERULEAN INDIGO VIOLET LILAC MAUVE PERIWINKLE LAVENDER PLUM SLATE GLASS COMMON MORAL MORTAL STONY STARRY CONSTANT VENGEFUL ROLLING SMOOTH ROCKY FUZZY FURRY CLEAN RICH TIGHT SPINY SHINY LUMPY LOVELY FIZZY RUNNY FUNNY FAST CANDID SHARP FORTUNE SORROW COIL MASON FIRE FREEZE ZEPHYR CONIFER MORTICIAN CORE FORK MISTAKE RAGE FEVER FERVOR CANDOR CANTILEVER HEAVEN HEATHEN ANTHEM CRAYON PASTURE DODGER CUNNING FLAKE SHATTER FLEE FLEX CARVE LIQUID FOLLOWS CORRAL STATION LOVER CONCH DIRT STEEL CLANG VIOLA CLARITY MARSH CLUE SWAMP BREEZE TOME RUNE FUME MOON MAGIC BOOK FUEL FUSE SPARK DOG SHADOW FACADE FLAT HONEY CURRY RICE PINE CYPRESS MUSK OCEAN SPICY SOUR VETIVER WOODSY MILDEW ACRID LOAM PEPPER JUNIPER EARTH TOBACCO YUZU CITRUS MOSS FRANKINCENSE VANILLA  BERRY THYME SPRUCE  SAGE RAIN PETRICHOR TEA HYACINTH  CAMPHOR";
var words_arr = str.split(" ");


$(document).ready(function(event){
  width = $(window).width();
  height = $(window).height();

  if(navigator.onLine){
    $("#container").html("You are connected");
  } else {
    $("#container").html("Welcome to the world of disconnection");

  }

  timer();
});

$(window).scroll(function(event){
  changeText(s, ms);
});



$(window).resize(function(){
  width = $(window).width();
  height = $(window).height();
});

function timer() {
  var today = new Date();
  h = today.getHours();
  m = today.getMinutes();
  s = today.getSeconds();
  ms = today.getMilliseconds();
  changeColor(s, ms);
  //changeText(s, ms);
  var t = setTimeout(timer, 100);
}

function changeColor(s, ms){
  var hue = 6*s + 0.006*ms;
  $("body").css("color", "hsl(" + hue + ", 100%, 50%)");
}

function changeText(s, ms){
  var n = s;
  var fsize = height/(n);
  console.log(height);
  $("#container").css("font-size", fsize);
  $("#container").empty();
  for(var i = 0; i < n; i++){
      var index = Math.floor(Math.random() * words_arr.length);
     $("#container").append(words_arr[index] + "<br>");
  }

}
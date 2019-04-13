var width = $(window).width();
var height = $(window).height();
var divWidth;
const margin = 20;
var fontsize = parseInt($("body").css("font-size"));

var str = "RED CARMINE CRIMSON CORAL BLUSH ORANGE APRICOT AMBER PEACH OCHER SAND BEIGE LEMON GERANIUM SPRING GRASS VIRIDIAN ROSEMARY FOREST OLIVE CERULEAN INDIGO VIOLET LILAC MAUVE PERIWINKLE LAVENDER PLUM SLATE GLASS COMMON MORAL MORTAL STONY STARRY CONSTANT VENGEFUL ROLLING SMOOTH ROCKY FUZZY FURRY CLEAN RICH TIGHT SPINY SHINY LUMPY LOVELY FIZZY RUNNY FUNNY FAST CANDID SHARP FORTUNE SORROW COIL MASON FIRE FREEZE ZEPHYR CONIFER MORTICIAN CORE FORK MISTAKE RAGE FEVER FERVOR CANDOR CANTILEVER HEAVEN HEATHEN ANTHEM CRAYON PASTURE DODGER CUNNING FLAKE SHATTER FLEE FLEX CARVE LIQUID FOLLOWS CORRAL STATION LOVER CONCH DIRT STEEL CLANG VIOLA CLARITY MARSH CLUE SWAMP BREEZE TOME RUNE FUME MOON MAGIC BOOK FUEL FUSE SPARK DOG SHADOW FACADE FLAT HONEY CURRY RICE PINE CYPRESS MUSK OCEAN SPICY SOUR VETIVER WOODSY MILDEW ACRID LOAM PEPPER JUNIPER EARTH TOBACCO YUZU CITRUS MOSS FRANKINCENSE VANILLA  BERRY THYME SPRUCE  SAGE RAIN PETRICHOR TEA HYACINTH  CAMPHOR CHICORY";
var words_arr = str.split(" ");
var word_index = 0;
var position_index = 0;
var word_queue = [];

var resizeSwitch = true;

var synth = new Tone.PolySynth(4, Tone.Synth).toMaster();
var notes = Tone.Frequency("G2").harmonize([0, 2, 5, 7, 9, 12, 14, 17, 19, 21, 24, 26, 29, 31, 33]);

StartAudioContext(Tone.context, 'div').then(function(){
  //started
  console.log("clicked");

});

//have to click to start audio context
$('div').click(function(){
  //Tone.start();
  console.log("clicked");
});

$(document).ready(function(event){
  // if ("geolocation" in navigator) {
  // /* geolocation is available */
  // console.log("geolocation available");
  // var geo_options = {
  //   enableHightAccuracy: true,
  //   maximumAge : 30000,
  //   timeout : 27000
  // };
  // var watchID = navigator.geolocation.watchPosition(function(position) {
  //   console.log(position.coords.latitude);
  //   console.log(position.coords.longitude);
  // }, error, geo_options);
  // } else {
  // /* geolocation IS NOT available */
  // console.log("geolocation NOT available");
  // }
  
  setupDivs();

  $(".panel").click(function(e){
    var currDiv = e.target;
    if(e.target !== this){
      return;
    }
    var index = $(".panel").index(currDiv);
    rotate(currDiv, index);
  });




  setInterval(rotateRandom, 1000);

});

$(window).resize(function(){
  clearTimeout(window.resizeFinished);
  window.resizeFinished = setTimeout(function(){
      resizeSwitch = !resizeSwitch;
  }, 250);
  resize();
});


function rotate(currDiv, index){
    synth.triggerAttackRelease(notes[index], "8n");

    var x = Math.random();
    var y = Math.random();
    var z = Math.random();
    var a = "180deg";
    $(currDiv).css({
      transform: "rotate3d(" + x + ", " + y + ", " + z + ", " + a + ")"
    });
    $(currDiv).children().text(words_arr[word_index]);
    word_index++;
    if(word_index >= words_arr.length){
      word_index = 0;
    }
}

function rotateRandom(){
  var randIndex = Math.floor(Math.random() * 15);
  var currDiv = $("#container").children().eq(randIndex);

  rotate(currDiv, randIndex);
}

function setupDivs(){
  width = $(window).width();
  height = $(window).height();

  for(let i = 0; i < 5; i++){
    for(let j = 0; j < 3; j++){
      var newDiv = $('<div />').addClass("panel");
      newDiv.css({
        width: width/5,
        height: height/3,
        left: i * (width/5),
        top: j * (height/3)
      });
      var innerDiv = $('<div />').addClass("innertext");
      innerDiv.css({
        width: "100%",
        height: fontsize,
        left: 0,
        top: height/6 - (fontsize/2)
      });

      innerDiv.text("hello");
      newDiv.append(innerDiv);
      $("#container").append(newDiv);
    }
  }
}

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}

function timer(prevIndex) {
  var randNote = Math.floor(Math.random() * notes.length);
  synth.triggerAttackRelease(notes[randNote], "1n");
  // if("vibrate" in navigator){
  //     navigator.vibrate(200);
  //     //navigator.vibrate(0);
  //     $("div").css("background-color", "red");

  // }

  //
  var change = Math.floor(Math.random() * 2);
  if(change > 0){
    position_index++;
    if(position_index >= 13){
      position_index = 0;
    }
  }
  //get rid of words in front of queue
  if(word_queue.length > 15){
    $("#container").children().eq(word_queue.shift()).text("");
  }
//display next word
 $("#container").children().eq(position_index).text(words_arr[word_index]);

 word_queue.push(position_index);
 word_index++;
 //recurse
 var randTime = Math.floor(Math.random() * 4) * 250 + 250;
  if(word_index == 122){
    randTime = 3000;
 }

 if(word_index == 123){
    $("div").css("background-color", "OrangeRed");
    $("div").css("color", "white");
    randTime = 1000; //force to linger of first word of second section
 }
 if(word_index < words_arr.length){
    var t = setTimeout(timer, randTime, position_index);
 }
}


function resize(){
  width = $(window).width();
  height = $(window).height();
  divWidth = width/5;
  divHeight = height/3;
  fontsize = width/40;
  $("body").css("font-size", fontsize);
  if(resizeSwitch){
    for(let i = 0; i < 15; i++){
      var currDiv = $("#container").children().eq(i);
      currDiv.css({
        width: divWidth,
        height: divHeight,
        left: divWidth * Math.floor(i / 3),
        top: divHeight * Math.floor(i % 3)
      });
      currDiv.children().css({
        top: height/6 - (fontsize/2)
      });
    }
  } else {
    for(let i = 0; i < 15; i++){
      var currDiv = $("#container").children().eq(i);
      currDiv.css({
        width: divWidth,
        height: divHeight,
        left: divWidth * Math.floor(i % 5),
        top: divHeight * Math.floor(i / 5)
      });
      currDiv.children().css({
        top: height/6 - (fontsize/2)
      });
    }
  }

}
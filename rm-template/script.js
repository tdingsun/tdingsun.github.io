var width, height;
var title = "TITLE";
var author = "AUTHOR"
var speed = 250;

var currRotateV = 0;
var currRotateH = 0;
var tv, th;

var volume = new Tone.Volume(-12);
var synth = new Tone.PolySynth(7, Tone.Synth).chain(volume, Tone.Master);
var notes = Tone.Frequency("C3").harmonize([0, 4, 7, 12, 16, 19, 24, 28, 31, 36]);

//have to click to start audio context
StartAudioContext(Tone.context, window);

$(document).ready(function(event){
  getMute();
  setDimensions();
  displayTitle(title, author);
  startClockRotation();
  $('#start').on('click', function(event){
    init();
  });
});

function init() {
  $('#start').hide();
  $("#title").addClass("title-small");
  setTimeout(() => {
    var randNote = Math.floor(Math.random() * notes.length);
    synth.triggerAttackRelease(notes[randNote], "8n");
  }, 500);
}

// Common
function displayTitle(title, author){
  $("#title").html(title + "<br>by " + author);
}

function startClockRotation() {
  tv = setInterval(rotateVertical, 1000);
  th = setInterval(rotateHorizontal, 2000);
}

function setDimensions() {
  width = $(window).innerWidth();
  height = $(window).innerHeight();
}

function getMute() {
  Tone.Master.mute = localStorage.getItem('mute') == 'true' ? true : false;
  let text = Tone.Master.mute ? "SOUND ON" : "MUTE";
  $("#mute-btn").text(text);
}

function rotateVertical() {
  currRotateV += 15;
  $("#vertical").css({"transform": `rotate(${currRotateV}deg)`})
}

function rotateHorizontal() {
  currRotateH += 7.5;
  $("#horizontal").css({"transform": `rotate(${currRotateH}deg)`})
}

$("#mute-btn").click(function(){
  Tone.Master.mute = !Tone.Master.mute;
  localStorage.setItem('mute', Tone.Master.mute);
  $(this).text(Tone.Master.mute ? "SOUND ON" : "MUTE");
});

$("#clockContainer").mouseenter(function(){
  clearInterval(tv);
  clearInterval(th);
  tv = setInterval(rotateVertical, 30);
  th = setInterval(rotateHorizontal, 30);
  $("#nav").addClass("showNav");
  $("#clockContainer").children().addClass("navClock");
});

$("#clockContainer").mouseleave(function(){
  clearInterval(tv);
  clearInterval(th);
  tv = setInterval(rotateVertical, 1000);
  th = setInterval(rotateHorizontal, 1000);
});

$("#nav").mouseleave(function(){
  $("#nav").removeClass("showNav");
  $("#clockContainer").children().removeClass("navClock");
});

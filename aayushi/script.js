var width;
var height;
var title = "Dream Dress";
var author = "Aayushi Khowala"
var speed = 250;

var paragraphs = [
  "Dream dress that I wish I had bought, that looked particularly awful when I tried it on:",
  "Before I wore it, when I saw it hanging, I thought – no.",
  "It was –––",
  "Green like a 40:60 mix of mustard yellow and sap green, knitted all the way down, body hugging, body defining even. All parts elongated – sleeves long enough to go below my wrists; neckline ending closely above my first stomach-roll crease; waist belt across my belly button; almost, but not quite, dragging against the floor. Heavy, weighted, you could tell it was well made. I’d wear it to wear only in my bedroom, even to sleep."
];

var p_split = [];

paragraphs.forEach(function(p, index){
  p_split.push(p.split(" "));
});

var tv;
var th;

var wordID = 0;

var volume = new Tone.Volume(-6);
var synth = new Tone.PolySynth(7, Tone.Synth).chain(volume, Tone.Master);
var notes = Tone.Frequency("C3").harmonize([0, 4, 7, 12, 16, 19, 24, 28, 31, 36]);

//have to click to start audio context
StartAudioContext(Tone.context, window);


$(document).ready(function(event){
  Tone.Master.mute = localStorage.getItem('mute') == 'true' ? true : false;
  let text = Tone.Master.mute ? "SOUND ON" : "MUTE";
  $("#mute-btn").text(text);

  width = $(window).innerWidth();
  height = $(window).innerHeight();
  displayTitle(title, author);
  setTimeout(startText1, 1500, 0);
  tv = setInterval(rotateVertical, 1000);
  th = setInterval(rotateHorizontal, 2000);
});

function startText1(gridid){
  var randNote = Math.floor(Math.random() * notes.length);
	synth.triggerAttackRelease(notes[randNote], "1n");
  $(`#grid-${gridid}`).append(`<div class='word'>${p_split[gridid][wordID]}</div>`)
  wordID++;
  if(wordID < p_split[gridid].length){
    setTimeout(startText1, speed, gridid);
  } else {
      wordID = 0;
     setTimeout(startText1, 1500, gridid + 1);
  }
}

// Common

function displayTitle(title, author){
  $("#title").html(title + "<br>by " + author);
}

var currRotateV = 0;
var currRotateH = 0;

function rotateVertical() {
  currRotateV += 15;
  $("#vertical").css({
      "transform": `rotate(${currRotateV}deg)`
  })
}

function rotateHorizontal() {
  currRotateH += 7.5;
  $("#horizontal").css({
      "transform": `rotate(${currRotateH}deg)`
  })
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

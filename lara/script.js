var width;
var height;
var title = "TITLE";
var author = "AUTHOR"
var speed = 150;

var text = "5.11.20 // home rain 9.00 alarm Listening to my liked songs in the background. Coffee machine, taktak, door opening, Workout music, Turn on the lights, turn off the lights, door closing, Louder workout music- louder- louder- louder- -faster - faster- construction ------- craw call construction - drill sound :-)))(((-: ～～～～～still listening to my liked songs in the background～～～～～ sound of my necklaces vacuum cleanerrrrrrr ddddddrrrriiiiilllllllllllll sounddddddddddd DRILLLLLL SOUND D R I L LLLLLLLL and construction… ***** russian music ***** 13.30 alarm friends- laptop fan ambulance LAPTOP FAAAAAA AAAAAA AAAA NNNNNNNNNNNNNN. 6.11.20 // home 8.20 alarm ----- Erik Satie piano oo o ooooooo upstairs neighbor stomping 7.11.20// home 9.00 alarm breakfast sound People chatting People chatting driiillll people chatting chatting people chatting //// windows closing //// curtain closing /// driiilll taktaktaktaktaktak ---- people screaming ---- laughing ----- horoscopes--- ～～～～～ body language ～～～～～ 9.11.20 // home 8.20 alarm sound of children, going to school :-/ **** Coffee machine--- construction construction …...drilllllllll….. washing machine -beeeeep beeeep-** 10.11.20 // home from my bed”””” ticking clock sound coming from the hall -.-.-. -.-.-. -.-.-. 9.00 alarm siren 11.11.20 // home Wild imagination could never touch us 12.11.20 // home Drrrriiillllllllll”””””” “””””””” “ “ “ “ “””” “” “ “ “ “ Clock ticking plane passing by--- Drilll --- 20.1.21 Small things are making you happy,,, Like what? Sipping a good coffee, a sunny day and music";
var textArray = text.split(' ');
var blocks = [];
var total_blocks;

var tv;
var th;

var volume = new Tone.Volume(-12);
var synth = new Tone.PolySynth(7, Tone.Synth).chain(volume, Tone.Master);
synth.set({
  oscillator: {
  type: "sawtooth12"
  }
});
var notes = Tone.Frequency("D2").harmonize([0, 2, 5, 7, 9, 12]);

var gridsize = (Math.floor(Math.random() * 10) * 2) + 9;
var unit = 100 / gridsize;


//have to click to start audio context
StartAudioContext(Tone.context, window);

$(document).ready(function(event){
  //mute
  Tone.Master.mute = localStorage.getItem('mute') == 'true' ? true : false;
  let text = Tone.Master.mute ? "SOUND ON" : "MUTE";
  $("#mute-btn").text(text);

  width = $(window).innerWidth();
  height = $(window).innerHeight();
  
  displayTitle(title, author);
  tv = setInterval(rotateVertical, 1000);
  th = setInterval(rotateHorizontal, 2000);
  
  $('#start').on('click', function(event){
    $('#start').hide();
    $("#title").addClass("title-small");
    setTimeout(() => {
      init();
    }, 500);
  });
});

$(document).on('click', '.hasWord', function(e){
  let id = parseInt(e.target.id);
  if($(e.target).hasClass('disabled')){
    blocks.push(id);
    $(e.target).removeClass('disabled');
    if(blocks.length == 1){
      showWord(0);
    }
  }
  else {
    $(e.target).addClass('disabled');
    if(blocks.indexOf(id) != -1){
      blocks.splice(blocks.indexOf(id), 1);
      console.log(blocks);
    }
  }



});

function init() {
  makeBlocks();
  var randNote = Math.floor(Math.random() * notes.length);
  synth.triggerAttackRelease(notes[randNote], "8n");
  showWord(0);
}

function disableAll() {
  for(let id of blocks){
    $(`#${id}`).addClass('disabled');
  }
  blocks = [];
}
 
function showWord(i) {
  var randNote = Math.floor(Math.random() * notes.length);
  synth.triggerAttackRelease(notes[randNote], "8n");
  let randBlockIndex = Math.floor(Math.random() * blocks.length);
  $(`#${blocks[randBlockIndex]}`).text(textArray[i]);
  $(`#${blocks[randBlockIndex]}`).addClass('hasWord')
  if(i == textArray.length){
    i = 0;
  }
  speed = map_range(blocks.length, 0, total_blocks, 500, 100);
  console.log(speed);
  if(blocks.length > 0){
    setTimeout(showWord, speed, i+1);
  }
}

// Common
function displayTitle(title, author){
  $("#title").html(title + "<br>by " + author);
  setTimeout(() => {
    $("#title").addClass("title-small");
  }, 1500);
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


//block stuff
class Block {
  constructor(x, y, w, h, orientation) {
    this.x = x * unit;
    this.y = y * unit;
    this.w = w * unit;
    this.h = h * unit;
    this.orientation = orientation;
    this.div = $("<div></div>").addClass("block");
    if(!(w == 1 && h == 1)){
      this.div.attr("id", blocks.length);
      blocks.push(blocks.length);
    }

    if(this.orientation == 'v'){
      this.div.addClass('vertical');
      this.div.css({
        top: `${this.y}vh`,
        left: `calc(${this.x}vw + 0.5 * (${this.w}vw - ${this.w}vh))`,
        width: `${this.w}vh`,
        height: `${this.h}vh`,
      });
    } else {
      this.div.addClass('horizontal');
      this.div.css({
        top: `${this.y}vh`,
        left: `calc(${this.x}vw - 0.5 * (${this.h}vw - ${this.h}vh))`,
        width: `calc(${this.w}vw + (${this.h}vw - ${this.h}vh))`,
        height: `${this.h}vh`,
      });
      if(this.x == 0){
        this.div.css("left", 0);
        this.div.css("width", `calc(${this.w}vw + 0.5 * (${this.h}vw - ${this.h}vh))`)
      }
      if(x == gridsize - 1 || x == gridsize - 3 ){
        this.div.css("width", `calc(${this.w}vw + 0.5 * (${this.h}vw - ${this.h}vh))`)
      }
    }

    $('#container').append(this.div);

  }
}


function makeBlocks(){
  //make vertical blocks
  for(var x = 1; x < gridsize; x += 2 ){
    let y = ((x - 1) / 2 % 2 == 0) ? 2 : 4;
    let h = ((x - 1) / 2 % 2 == 0) ? 1 : 3;
    block(x, 0, 1, h, 'v');
    for(y; y < gridsize; y += 4){
      h = 3;
      if(y == gridsize - 1){
        h = 1;
      }
      block(x, y, 1, h, 'v');
    }
  }
  //make horizontal blocks
  for(var y = 1; y < gridsize; y += 2){
    let x = ((y - 1) / 2 % 2 == 0) ? 4 : 2;
    let w = ((y - 1) / 2 % 2 == 0) ? 3 : 1;
    block(0, y, w, 1, 'h');
    for(x; x < gridsize; x += 4){
      w = 3;
      if(x == gridsize - 1){
        w = 1;
      }
      block(x, y, w, 1, 'h');
    }
  }
  total_blocks = blocks.length;

}

function block(x, y, w, h, o) {
  let b = new Block(x, y, w, h, o);
}

function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
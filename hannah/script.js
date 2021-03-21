var width;
var height;
var title = "the distance between anything at all and the center";
var author = "Hannah McCain"
var speed = 500;
var fontSize = 100;
var text = "a a pinecone *hit my back a *pinecone hit my back a pinecone hit *my back an ant and the sun on my ankle hair curling across my cheek and the nape of my neck braided sound of birdsong and distant traffic two planes tracing powdery lines overhead the way the light settles softly on the grass. what distances / what closenesses to be a consciousness in and of a body to be smelling dry summer grasses to have the sun on my very own shoulders. a pinecone fell from the red pine and hit the curve of my spine."

var textArray = text.split(" ");
var currWord;
var tv;
var th;

var volume = new Tone.Volume(-12);
var synth = new Tone.PolySynth(9, Tone.Synth).chain(volume, Tone.Master);
var notes = Tone.Frequency("G2").harmonize([0, 2, 4, 5, 7, 12, 14, 16, 17, 19, 24]);
notes = notes.slice(0).concat(notes.reverse());
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
      let numSteps = textArray.length;
      for(let i = 1; i < numSteps; i++){
        setTimeout(step, speed* i, i);
      }
    }, 500);

  });


});

var gridSize = 49;

var model = new Array(gridSize).fill(null).map(()=>new Array(gridSize).fill(null));
var queue = [];

class Block {
  constructor(xCoord, yCoord, wordIndex){
    this.div = $("<div></div>").addClass("block");
    let word = textArray[wordIndex];
    if(word[0] == '*'){
      word = word.substring(1);
      this.div.css("font-style", "italic");
      this.div.css("font-family", "serif");
    }
    this.div.text(word);
    this.div.css("left", xCoord*2 + "vw");
    this.div.css("top", yCoord*2 + "vh");
    if(Math.random() > 0.5){
      this.div.css("animation", `shake 0.15s linear 0s infinite`)
    } else {
      this.div.css("animation", `shake-reverse 0.15s linear 0s infinite`)
    }
    this.x = xCoord;
    this.y = yCoord;
    model[xCoord][yCoord] = this;
    $('#container').append(this.div);
    queue.push(this);
  };
}

var oXp = 25;
var oYp = 25;

function init() {
  tripleNote(0);
  new Block(oXp, oYp, 0);
}
function step(stepIndex) {
  tripleNote(stepIndex);


  $("#container").children().css("animation", `none`)

  let length = queue.length;
  if(length == 0){
    new Block(oXp, oYp, stepIndex);
    new Block(oXp, oYp + 1, stepIndex);
    new Block(oXp, oYp + 1, stepIndex);
    new Block(oXp + 1, oYp, stepIndex);
    new Block(oXp - 1, oYp, stepIndex);
  }
  for(let i = 0; i < length; i++){
    let block = queue.shift();
    
    let x = block.x;
    let y = block.y;

    setTimeout(function(){
      $(block.div).remove();
      model[x][y] = null;
    }, speed* Math.random() * 25 + 500);
    neighbors = getEmptyNeighbors(x, y);
    c = neighbors.length;
    if(c == 8){
      addCross(x, y, stepIndex);
    } else if(c == 5){
      if(hasTopLeft(x, y) && hasTop(x, y) && hasTopRight(x, y)){
        addBottom(x, y, stepIndex);
      }
      else if(hasTopLeft(x, y) && hasLeft(x, y) && hasBottomLeft(x, y)){
        addRight(x, y, stepIndex);
      }
      else if(hasTopRight(x, y) && hasRight(x, y) && hasBottomRight(x, y)){
        addLeft(x, y, stepIndex);
      }
      else if(hasBottomLeft(x, y) && hasBottom(x, y) && hasBottomRight(x, y)){
        addTop(x, y, stepIndex);
      }
    } else if(c == 7){
      if(hasTopLeft(x, y)){
        let r = Math.random();
        if(r > 0.5){
          addBottomRight(x, y, stepIndex);
        } else if(r > 0.75) {
          addTopRight(x, y, stepIndex);
          addBottomLeft(x, y, stepIndex);
          addBottomRight(x, y, stepIndex);
        } else {
          addBottom(x, y, stepIndex);
          addRight(x, y, stepIndex);
        }
      }
      if(hasTopRight(x, y)){
        let r = Math.random();
        if(Math.random() > 0.5){
          addBottomLeft(x, y, stepIndex);
        } else if(r > 0.75) {
          addTopRight(x, y, stepIndex);
          addTopLeft(x, y, stepIndex);
          addBottomRight(x, y, stepIndex);
        } else {
          addBottom(x, y, stepIndex);
          addLeft(x, y, stepIndex);
        }
      }
      if(hasBottomLeft(x, y)){
        let r = Math.random();
        if(r > 0.5){
          addTopRight(x, y, stepIndex);
        } else if(r > 0.75) {
          addTopLeft(x, y, stepIndex);
          addBottomLeft(x, y, stepIndex);
          addBottomRight(x, y, stepIndex);
        } else {
          addTop(x, y, stepIndex);
          addRight(x, y, stepIndex);
        }
      }
      if(hasBottomRight(x, y)){
        let r = Math.random();
        if(r > 0.5){
          addTopLeft(x, y, stepIndex);
        } else if (r > 0.75) {
          addTopRight(x, y, stepIndex);
          addBottomLeft(x, y, stepIndex);
          addBottomRight(x, y, stepIndex);
        } else {
          addTop(x, y, stepIndex);
          addLeft(x, y, stepIndex);
        }
      }
      if(hasBottom(x, y)){
        if(Math.random() > 0.5){
          addTop(x, y, stepIndex);
          addRight(x, y, stepIndex);
          addLeft(x, y, stepIndex);
        } else {
          let r = Math.random();
          if(r > 0.33){
            addTop(x, y, stepIndex);
          } else if(r > 0.66){
            addTopRight(x, y, stepIndex);
          } else {
            addTopLeft(x, y, stepIndex);
          }
        }
      }
      if(hasTop(x, y)){
        if(Math.random() > 0.5){
          addBottom(x, y, stepIndex);
          addRight(x, y, stepIndex);
          addLeft(x, y, stepIndex);
        } else {
          let r = Math.random();
          if(r > 0.33){
            addBottom(x, y, stepIndex);
          } else if(r > 0.66){
            addBottomRight(x, y, stepIndex);
          } else {
            addBottomLeft(x, y, stepIndex);
          }
        }

      }
      if(hasRight(x, y)){
        if(Math.random() > 0.5){
          addLeft(x, y, stepIndex);
          addBottom(x, y, stepIndex);
          addTop(x, y, stepIndex);
        } else {
          let r = Math.random();
          if(r > 0.33){
            addLeft(x, y, stepIndex);
          } else if(r > 0.66){
            addTopLeft(x, y, stepIndex);
          } else {
            addBottomLeft(x, y, stepIndex);
          }
        }
      }
      if(hasLeft(x, y)){
        if(Math.random() > 0.5){
          addRight(x, y, stepIndex);
          addBottom(x, y, stepIndex);
          addTop(x, y, stepIndex);
        } else {
          let r = Math.random();
          if(r > 0.33){
            addRight(x, y, stepIndex);
          } else if(r > 0.66){
            addTopRight(x, y, stepIndex);
          } else {
            addBottomRight(x, y, stepIndex);
          }
        }
      }
    }    
  }
}



function getEmptyNeighbors(x, y){
  let n = [];
  let emptyNs = [];

  if(x > 0 && y > 0){ n.push(model[x-1][y-1]); }
  if(x > 0 && y < (gridSize - 1)){ n.push(model[x-1][y+1]); }
  if(x < (gridSize - 1) && y > 0){ n.push(model[x+1][y-1]); }
  if(x < (gridSize - 1) && y < (gridSize - 1)){ n.push(model[x+1][y+1]); }
  if(x > 0){ n.push(model[x-1][y]); }
  if(x < (gridSize - 1)){ n.push(model[x+1][y]); }
  if(y > 0){ n.push(model[x][y-1]); }
  if(y < (gridSize - 1)){ n.push(model[x][y+1]); }

  for(let block of n){
    if(block == null){ emptyNs.push(block); }
  }
  return emptyNs;
}

//has blocks helper functions
function hasTopLeft(x, y){ return model[x-1][y-1] != null; }
function hasTop(x, y){ return model[x][y-1] != null; }
function hasTopRight(x, y){ return model[x+1][y-1] != null; }
function hasLeft(x, y){ return model[x-1][y] != null; }
function hasRight(x, y){ return model[x+1][y] != null; }
function hasBottomLeft(x, y){ return model[x-1][y+1] != null; }
function hasBottom(x, y){ return model[x][y+1] != null; }
function hasBottomRight(x, y){ return model[x+1][y+1] != null; }

//add blocks helper functions
function addTopLeft(x, y, i){ new Block(x-1, y-1, i); }
function addTop(x, y, i){ new Block(x, y-1, i); }
function addTopRight(x, y, i){ new Block(x+1, y-1, i); }
function addLeft(x, y, i){ new Block(x-1, y, i); }
function addRight(x, y, i){ new Block(x+1, y, i); }
function addBottomLeft(x, y, i){ new Block(x-1, y+1, i); }
function addBottom(x, y, i){ new Block(x, y+1, i); }
function addBottomRight(x, y, i){ new Block(x+1, y+1, i); }
function addCross(x, y, stepIndex){
  addRight(x, y, stepIndex);
  addLeft(x, y, stepIndex);
  addTop(x, y, stepIndex);
  addBottom(x, y, stepIndex);
}

function tripleNote(i){
  var randNote = Math.floor(Math.random() * notes.length);
  synth.triggerAttackRelease(notes[i % notes.length], "2n");
  setTimeout(function(){
    synth.triggerAttackRelease(notes[i % notes.length], "2n");
  }, speed/3);
  setTimeout(function(){
    synth.triggerAttackRelease(notes[randNote], "2n");
  }, 2*speed/3);
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

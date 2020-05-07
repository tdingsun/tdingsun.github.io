var title = "SPIRAL";
var author = "Libby Marrs"

var width;
var height;
var wordsPerCycle = 3;
var angle = 2*Math.PI / wordsPerCycle;
var rGrowth = 30;
var cycleIndex = 0;
var t;
var speed = 300;
var str = "A spiral begins at a point in space and winds away from its center in a circular fashion. A spiral begins at a point in space, from which it winds or curves around or towards a center point in a circular fashion. In most cases, it retains a parallel distance from itself, never touching. A spiral is a form which is best understood as a singular line in space, whose notable characteristic is that it winds or curves around or towards a center point. When found in nature, the origin and end points of the spiral can be located, if even at a microscopic level, which is why it is useful to think of it as a linear form with a beginning and end. However, the structure of the form separate from the physical world can be understood as an infinite fractal. According to the Fiboncacci sequence, a spiral represents exponential, recursive growth which can extend into eternity. This inherent stability is possibly the reason that so many forms we can locate in biology use the spiral as a structural element. A perfect dance, around and around we go. We radiate from a center point together, strong. In this form, we can find stability in an end and a beginning which lends itself to us whenever we need, but what is more beautiful is that if we don’t have use for endings or beginnings, we can spiral on forever and ever. What a gift it is to have access to a structure lively as a spiral,  livelier than the greatest dance between two best friends, eternally pure and eternally yours. A perfect dance embodied in form, a gift for you, whether you seek to spin so fast that you are teleported to the origin of the fractal, or wish to see the very end of the Earth. This form extends to infinity and beyond, one never must fear crashing or falling when carried around and around, and may choose whichever plane, whichever dimension to tour along the way. If one seeks perfection in nature, they are most likely to find it in the geometry of the spiral.";
var words_arr = str.split(" ");
var word_index = 0;

var tv;
var th;

var synth = new Tone.PolySynth(4, Tone.Synth).toMaster();
var notes = Tone.Frequency("G3").harmonize([0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24, 26, 28, 29, 31, 33, 35, 36]);

StartAudioContext(Tone.context, window);

$(document).ready(function(event){
  width = $(window).innerWidth();
  height = $(window).innerHeight();
  displayTitle(title, author);
  tv = setInterval(rotateVertical, 1000);
  th = setInterval(rotateHorizontal, 2000);
  setTimeout(function(){
    timer();
    $("#title").css({
      "color": "khaki"
    });
    $("#vertical").css({
      "background-color": "khaki"
    });
    $("#horizontal").css({
      "background-color": "khaki"
    });
  }, 1000);
});

function displayTitle(title, author){
  $("#title").html(title + "<br>by " + author);
}

var r = 20;
var theta = 0;

function timer() {
  var randNote = word_index % notes.length;
  synth.triggerAttackRelease(notes[randNote], "1n");

  let word = words_arr[word_index];
  let x = 2*r * Math.cos(theta);
  let y = r * Math.sin(theta);

  let newDiv = $("<div class='word'></div");
  newDiv.css({
    top: y + 1500,
    left: x + 2500,
  });
  newDiv.text(word);
  $("#container").append(newDiv);

  word_index++;
  cycleIndex++
  theta += angle;

  if (cycleIndex % wordsPerCycle == 0){
    r += rGrowth;
    wordsPerCycle += 1;
    cycleIndex = 0;
    angle = 2*Math.PI / wordsPerCycle + 0.005;
  }
  if(word_index >= words_arr.length){
    clearTimeout(t);
  }

  newDiv.get(0).scrollIntoView({behavior: "smooth", block: "center", inline: "center"});

  var syllables = RiTa.getSyllables(word);
	var syllables_arr = syllables.split("/");
  var time = syllables_arr.length * speed;

  if (word.charAt(word.length - 1) == '.'){
      time += speed;
  }
  if(word_index == 1){
    time = 2000;
  }

  if(word_index < words_arr.length){
    setTimeout(timer, time);
  }
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

$("#clockContainer").mouseenter(function(){
  clearInterval(tv);
  clearInterval(th);
  tv = setInterval(rotateVertical, 30);
  th = setInterval(rotateHorizontal, 30);
});

$("#clockContainer").mouseleave(function(){
  clearInterval(tv);
  clearInterval(th);
  tv = setInterval(rotateVertical, 1000);
  th = setInterval(rotateHorizontal, 1000);
});

$("#mute-btn").click(function(){
  Tone.Master.mute = !Tone.Master.mute;
  $(this).text($(this).text() == 'MUTE' ? 'SOUND ON' : 'MUTE');
});
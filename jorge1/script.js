var title = "The Meaning Maker";
var author = "Jorge Palacios"

var width;
var height;
var textdivsize = 100;
var halfsize = textdivsize/2;
var cycleLen = 100;
var t;
var speed = 200;
var str = "All their life, they wanted to become a meaning-maker. A being at the forefront of making any meaning there is to be made. Meanings made so that non-meaning-makers may be entertained by meaning-maker made meanings. Or meanings made to inspire other beings to make meaning of their own. Perhaps to enlighten those undecided in the life meaning which they must make. * The meaning-maker had never considered anything less, for their meaning in life was to be a meaning-maker. To go from people to place to institution to natural habitat, making meaning out of beings with meanings of their own, however to never disingenuously make up meanings that are made from what the meaning-maker perceived their meaning to mean, it would be inauthentic to their original meaning. The meaning-maker scoffed at non-meaning makers’ inept self-awareness to withhold their own life meaning from the meanings which they made. * But the meaning-maker never thought about falling in love. Especially not with a non-meaning-maker. The meaning-maker knew others had meanings of their own, but never considered any life meaning where they meant anything other than the meaning that they had made for themselves as a meaning-maker. And thus the meaning-maker must decide on whether they would rather * live a life as a meaning maker with the meanings they’ve made on their own * or, though not originally what the meaning-maker had meant to mean, live a life with a non-meaning-maker that is meaningful to them, together co-authoring a meaning made from equal parts meaning-maker meanings and non-meaning-maker meanings.";
var words_arr = str.split(" ");
var word_index = 0;

var hist = [];
var histLimit = 20;

var volume = new Tone.Volume(-12);
var synth = new Tone.PolySynth(4, Tone.Synth).chain(volume, Tone.Master);
var notes = Tone.Frequency("F3").harmonize([0, 2, 4, 5, 7, 9, 11, 12]);

var tv;
var th;

StartAudioContext(Tone.context, window);
$(window).click(function(){
  Tone.context.resume();
});

$(document).ready(function(event){
  Tone.Master.mute = localStorage.getItem('mute') == 'true' ? true : false;
  let text = Tone.Master.mute ? "SOUND ON" : "MUTE";
  $("#mute-btn").text(text);

  width = parseInt($(window).innerWidth());
  height = parseInt($(window).innerHeight());
  displayTitle(title, author);
  tv = setInterval(rotateVertical, 500);
  th = setInterval(rotateHorizontal, 1000);
  setTimeout(function(){
    timer();
  }, 1000);
});

function displayTitle(title, author){
  $("#title").html(title + "<br>by " + author);
}

var theta = 3*Math.PI/2;
var angle = - 2*Math.PI / 20;

function timer() {
  // sound
  var randNote = Math.floor(Math.random() * notes.length);
  synth.triggerAttackRelease(notes[randNote], "1n");

  // position
  let word = words_arr[word_index];
  var x;
  var y;
  const x_unit = (width - textdivsize) / 20;
  const y_unit = (height - textdivsize) / 20;
  let i = word_index % cycleLen;

  if(i < 20){
    x = x_unit * i;
    y = y_unit * i;
  } else if (i < 40){
    x = x_unit * (20 - (i % 20));
    y = y_unit * (i % 20);
  } else if (i < 60){
    const r = (height/2) - halfsize;
    x = (width/2 - halfsize) + r * Math.cos(theta);
    y = (height/2 - halfsize) + r * Math.sin(theta);
    theta += angle;
  } else if (i < 70){
    x = x_unit * (10 - (i % 10));
    y = y_unit * (i % 10);
  } else if (i < 80){
    x = x_unit * (i % 10);
    y = y_unit * (i % 10) + (height/2 - halfsize);
  } else if (i < 90){
    x = x_unit * (i % 10) + (width/2 - halfsize);
    y = y_unit * (10 - (i % 10)) + (height/2 - halfsize);
  } else if (i < 100){
    x = x_unit * (10 - (i % 10)) + (width/2 - halfsize);
    y = y_unit * (10 - (i % 10));
  }

  // make div
  let newDiv = $("<div class='word'></div");
  newDiv.css({
    top: y,
    left: x
  });

  newDiv.text(word);
  hist.push(newDiv);
  $("#container").append(newDiv);

  //remove old
  var rand = Math.random();
  if( (rand < 0.5 && hist.length > 5) || (hist.length > histLimit) ){
    let oldDiv = hist.shift();
    oldDiv.remove();
    if (oldDiv.text() == '*'){
      $("#txt").append('<br></br>');
    } else {
      $("#txt").append(oldDiv.text() + " ");
    }
  }

  // increment counter
  word_index++;

  // timing calc
  var syllables = RiTa.getSyllables(word);
	var syllables_arr = syllables.split("/");
  var time = syllables_arr.length * speed;

  if (word.charAt(word.length - 1) == '.'){
      time += (speed * 2);
  }

  if(word == "*"){
    $("body").toggleClass("colormode2");
    $("#mute-btn").toggleClass("mute-alt");
  }

  // continue/end condition
  if(word_index < words_arr.length){
    t = setTimeout(timer, time);
  } else {
    t = setTimeout(clearLeftovers, speed);
  }
}

function clearLeftovers(){
  let oldDiv = hist.shift();
  $("#txt").append(oldDiv.text() + " ");
  if(hist.length > 0){
    t = setTimeout(clearLeftovers, speed);
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

$("#mute-btn").click(function(){
  Tone.Master.mute = !Tone.Master.mute;
  localStorage.setItem('mute', Tone.Master.mute);
  $(this).text(Tone.Master.mute ? "SOUND ON" : "MUTE");
});


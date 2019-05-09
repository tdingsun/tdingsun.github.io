var width;
var height;
var divWidth;
const numImages = 163;
//randomize order
var imgIndices = [];
for(let i = 1; i <= numImages; i++){
  imgIndices.push(i);
}

imgIndices = shuffle(imgIndices);
console.log(imgIndices);





const margin = 20;
const fontsize = parseInt($("body").css("font-size"));
var regex = /([,."“()]+)/;

var str = "I used to have this habit of taping small images to the walls of my bedroom.\\ photos,\\ postcards,\\ and drawings from here and there.\\ A couple of weeks ago,\\ I was staring at the constellation of images on my walls,\\ somewhat listlessly,\\ when I suddenly got so tired of them.\\ Suddenly every image seemed utterly replaceable with any other image.\\ Entirely uninteresting,\\ it seemed like any source of uniqueness or value merely came from an arbitrary reordering of ink on paper.\\ Or, in the case of the images you are looking at right now,\\ and arbitrary permutation of pixel values on a screen.\\The image is a lifeless being.\\ I asked myself:\\ As a graphic designer,\\ I've developed a visual literacy through exposure to as many different visual styles as possible.\\That's basically all I have been doing for these past four years.\\ But at the end of all that,\\do I have any real attachment to any piece of graphic work?\\ Have I ever?\\If not,\\then what even is the point of claiming to be an image-maker?\\ Let's be honest with ourselves,\\Doesn't every poster essentially look the same?\\Doesn't every typeface look the same?\\Isn't every are.na channel basically filled with the same images?\\Bare walls and the blank sheets of paper seem to offer so much more prospect and possibility,\\ and any commitment to a particular decision seemed so arbitrary and limiting.\\ I never want to see the same image twice ever again.\\This is, of course,\\ the most tongue-in-cheek of statements,\\ but there is still some truth to the sentiment.";
var sentences = str.split("\\");

var synth = new Tone.PolySynth(4, Tone.Synth).toMaster();
var notes = Tone.Frequency("G2").harmonize([0, 4, 7, 12, 16, 19, 24, 28, 31, 36, 40]);
var randNote;
StartAudioContext(Tone.context, 'div').then(function(){
  //started
  console.log("clicked");

});

//have to click to start audio context
$(document).click(function(){
  Tone.start();
  console.log("clicked");
});

$(document).ready(function(event){
  // if(navigator.onLine){
  //   $(".container").html("You are connected");
  // } else {
  //   $(".container").html("Welcome to the world of disconnection");
  // }

  // $('<img src="' + path + '">').load(function(){
  //   $("#picture").append($(this));
  // })
  setTimeout(loadImage, 1000, 0);
  setTimeout(loadText, 1000, 0);

});

function loadText(index){
  randNote = Math.floor(Math.random()*notes.length);
  synth.triggerAttackRelease(notes[randNote], "1n");
  $("#subtitle").text(sentences[index]);
  var time = sentences[index].length * 50;
  if(time < 1000){
    time = 1000;
  }
  if(index < sentences.length){
    setTimeout(loadText, time, index + 1);
  }

}

function loadImage(index){
  var path = "images/" + imgIndices[index] + ".jpg";
  console.log(index);
  $('<img/>').attr('src', path).load(function(){
    randNote = Math.floor(Math.random()*notes.length);
    synth.triggerAttackRelease(notes[randNote], "1n");
    $(this).remove();
    $('#picture').css({
      "background-image": 'url("' + path + '")'
     });
    if(index < numImages - 1){
      setTimeout(loadImage, 50, index + 1);
     }
  });
  

}


$(window).resize(function(){
  resize();
});

function timer(){

}

function resize(){
  width = $(window).width();
  height = $(window).height();
  divWidth = width/3 - margin;
}

function shuffle(array){
  for(let i = 0; i < array.length; i++){
    var randIndex = Math.floor(Math.random()*array.length);
    var tmp = array[i];
    array[i] = array[randIndex];
    array[randIndex] = tmp;
  }
  return array;

}


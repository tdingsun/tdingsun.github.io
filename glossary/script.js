var width;
var height;
var divWidth;
const numImages = 163;


var intervalID;

const margin = 20;
const fontsize = parseInt($("body").css("font-size"));
var regex = /([,."“()]+)/;

var str = "I used to have this habit of taping small images to the walls of my bedroom.\\ photos,\\ postcards,\\ and drawings from here and there.\\ A couple of weeks ago,\\I was staring at the constellation of images on my walls,\\ somewhat listlessly,\\ when I suddenly got so tired of them.\\ Suddenly every image seemed utterly replaceable with any other image.\\Entirely uninteresting,\\ it seemed like any source of uniqueness or value merely came from an arbitrary reordering of ink on paper.\\ Or, in the case of the images you are looking at right now,\\ an arbitrary permutation of pixel values on a screen.\\The image is a lifeless being.\\I asked myself:\\ As a graphic designer,\\I've developed a visual literacy\\through exposure to as many different visual styles as possible.\\That's basically all I have been doing for these past four years.\\ But at the end of all that,\\do I have any real attachment to any piece of graphic work?\\ Have I ever?\\If not,\\then what even is the point of claiming to be an image-maker?\\ Let's be honest with ourselves,\\Doesn't every poster essentially look the same?\\Doesn't every typeface look the same?\\Isn't every are.na channel basically filled with the same images?\\Bare walls and the blank sheets of paper\\seem to offer so much more prospect and possibility,\\ and any commitment to a particular decision seemed so arbitrary and limiting.\\ I never want to see the same image twice ever again.\\This is, of course,\\ the most tongue-in-cheek of statements,\\ but there is still some truth to that sentiment.";
var sentences = str.split("\\");

var synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
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
  //intervalID = setTimeout(loadImage, 2000, 0);
  //setTimeout(loadText, 2000, 0);
  //setTimeout(changeTitle, 10000);

 //$("#spread").attr("src", "images/Untitled-3-02.svg");
  jQuery.get("images/Untitled-3-02.svg", function(data){
    var $svg = jQuery(data).find('svg');
    $svg.atrr("preserveAspectRatio", "none");
    $("#picture").append($svg);
  });
});

function changeTitle(){
  var spanIndex = Math.floor(Math.random() * $("span").length);
  var text = $("span").eq(spanIndex).text();
  var newText = changeString(text);
  $("span").eq(spanIndex).text(newText);
  setTimeout(changeTitle, 1000);
}

function loadText(index){
  randNote = Math.floor(Math.random()*notes.length);
  synth.triggerAttackRelease(notes[randNote], "1n");
  $("#subtitle").text(sentences[index]);
  var time = sentences[index].length * 50;
  if(time < 1000){
    time = 1000;
  }
  if(index < sentences.length - 1){
    setTimeout(loadText, time, index + 1);
  } else {
    $("#ltitle").remove();
    $("#rtitle").remove();
    $("#ctitle").html(" ");
    setTimeout(function(){
      clearTimeout(intervalID);

      setTimeout(function(){
        synth.triggerAttackRelease("G4", "1n");
        $("#picture").remove();
        // $("#ctitle").html("Bring your Laptop<br><br>1:40PM<br>Room 704<br><br>Tiger Dingsun<br>Advised by<br>Anastasiia Raina<br><br>I Never Want to See the Same Image Twice!");
      }, 1000);
    }, 5000);
  }

}

function loadImage(index){
  var path = "images/" + imgIndices[index] + ".jpg";
  $('<img/>').attr('src', path).load(function(){
    randNote = Math.floor(Math.random()*notes.length);
    synth.triggerAttackRelease(notes[randNote], "2m");
    $(this).remove();
    $('#picture').css({
      "background-image": 'url("' + path + '")'
     });
    if(index < numImages - 1){
      intervalID = setTimeout(loadImage, 500, index + 1);
     } else {
      intervalID = setTimeout(loadImage, 500, 0);
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


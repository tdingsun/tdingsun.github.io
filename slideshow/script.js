var width;
var height;
var divWidth;
const margin = 20;
const fontsize = parseInt($("body").css("font-size"));

var str = "Homage to dictee // Peal, that word peal. A bell, the clearest tone, a blue so light it is almost transparent, but also thunder and laughter. Peal, I read on the last page of a book, peal, I try to imitate. A plastic cross and through that, a silhouette of bird black and soaring. Before that, chain link hole tree thickening through. Deeper as I crane my neck, lighter towards the horizon flocks bell peal, a full ringing, perfect oscillation, a child’s arms outstretched, raise me towards the sky, towards the sky the skies up there carry me forward falling asleep slowly rolling on your back. Self-admonishment paints you well, Through self-denial only enlightenment. Come. Come here, please. Turn back and so will I. Will this to propel me forward. Will this to be enough, the question remains. You, like a brother, reciprocation with something you are more likely like familial love, something like the word I can replace it with when it occurs to me. Starts to subside only partially through jealousy and love. The pangs of thinking around you start as soon as we part ways for the day. Quiet tongue held scratching heavily pen on paper. Object objective to love lover loving in a loving way. /// A loving way, loving lover love to object.  Paper, pen, heavy scratching held quiet tongue. The day, we part ways, soon around you to start thinking the pains. Of love and something else, starting to subside only partially when it occurs. Desire replaced with something like familial love, likely something you reciprocate, brother. You, a brother, remains the question. Enough to propel me forward, I will so and to turn back. Please, come here. Come here, please. Enlightenment only through self-denial Painting you well with self-admonishment. Back rolling slowly asleep, falling, lift me up the skies the sky lift me up towards the sky, outstretched like a child’s arms, perfections and a full ringing, peals the bell flocks horizon towards light, crane my neck and I see deeper blue. Through thickening trees hole link chain fence, before that soaring and black bird shadow and through that, a cross and me looking out. Try to imitate a bell, peals, the last page of a book, peal, of laughter and of thunder. A blue so light, almost transparent, the clearest tone, a bell peals, peal, that word, beautiful that word peal. ";
var words_arr = str.split(" ");
var word_index = 0;
var position_index = 0;
var word_queue = [];

var synth = new Tone.PolySynth(4, Tone.Synth).toMaster();
var notes = Tone.Frequency("G2").harmonize([0, 4, 7, 12, 16, 19, 24, 28, 31, 36, 40]);

StartAudioContext(Tone.context, 'div').then(function(){
  //started
  console.log("clicked");

});

//have to click to start audio context
$('div').click(function(){
  Tone.start();
  console.log("clicked");
});

$(document).ready(function(event){
  // if(navigator.onLine){
  //   $(".container").html("You are connected");
  // } else {
  //   $(".container").html("Welcome to the world of disconnection");
  // }
  var folder = "images/";

  $.ajax({
      url : folder,
      success: function (data) {
          $(data).find("a").attr("href", function (i, val) {
              if( val.match(/\.(jpe?g|png|gif)$/) ) { 
                  $("body").append( "<img src='"+ folder + val +"'>" );
              } 
          });
      }
  });

});

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
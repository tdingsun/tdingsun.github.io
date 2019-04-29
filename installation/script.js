var width = $(window).width();
var height = $(window).height();
var divWidth;
const fontsize = $("body").css("font-size");

$.getJSON('http://tdingsun.github.io/installation/text.json', function(data){
  console.log("hello");
  console.log(data);
});

var str = ".....It Feels Like Floating. A dull ache — laughter. Miraculous night, silent night, holy night, holy trinity, as I look up into the star-filled sky, forgive me for I have lied. Lied in order to get what I want. Made concessions but not amends. Making split-second decisions and pretending that that was the plan all along. Wanting to seem independent but all actions rely on someone else’s movements. Words coded in such a way so as to reflect well on the speaker. Words that make you seem smart. Imagine a grotto. Something revealed at low tides when the water rushes back to the sea. Standing in three inches of ice cold water. Drips on your shoulder. A casual sign. A cinematic moment. A thin membrane. In front of you is the craggy opening, revealing the midnight ocean gleaming under the light of the full moon. The stars are in perfect alignment with each other. Gleaming. Foam and detritus wrap around your ankles. Seaweed creeps up your calves. Dragonflies buzz, graze past your ear. A myriad of sighs from last year. Hushed tones. The particular articulations of a French pop star singing in English. Hidden energy. Tidal water, cesspool. Crumbling limestone. If you licked, it would taste salty. Residual particles. Encrusted. Growths. The true cesspool of hum. A take — sea caves, twinkling but slow. Localized arrhythmia. Constellations … something special about the beach. Grain after grain after grain. A beaded necklace. Moments strung together. Pale yellow. Cornflower blue. Peach. Lavender. Beige. Orange. Indigo. Forest green. Red. Amber. Cerulean. Eucalyptus. Cedarwood. Lichen. Algae. Something to be said about the way it feels — not real — when drifting (in and out, like tides) like in and out of a fever dream. It must feel like how it feels to stop playing a video game. Suddenly everything is rendered inconsequential. Not relevant anymore. But time remains so terrifying to me. The thought one day my bones will be exposed to bare dirt. My skin should sag and reach the ground. There is no longer a desire to say anything novel. There is only the desire to reiterate old cliches, to dwell in tropes, to relish in trite sentiments. There is nothing to say because nothing ever happens. I vow to abhor world-building in favor of complete self-annihilation. I will always be unresolved, and the feeling of not being will always be—";
var words_arr = str.split(" ");
var word_index = 0;
var face_index = 0;
var char_offset = 0;
var curr_offset = 0;

var timer_queue = [];
var numDivs = 30;

var synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
var notes = Tone.Frequency("C4").harmonize([0, 2, 5, 7, 9, 12]);

StartAudioContext(Tone.context, 'div').then(function(){
  //started
  console.log("clicked");

});

//have to click to start audio context
$('div').click(function(){
  //Tone.start();
  console.log("clicked");
});

// $('#cube').click(function(){
//   console.log("hi");
//   $("#cube").css({
//     animation: "none"
//   })
//   $('.cube-face').css({
//     color: "red",
//     transform: "none",
//     width: 400,
//     height: 80,
//     position: "relative",
//     padding: 0
//   });

//   $("#container").css({
//     top: 0
//   })
// });

$(document).ready(function(event){
  resize();
  for(var i = 0; i < 7; i++){
    setInterval(cubeText, 1000 + i, i);
  }
  for(var i = 0; i < 4; i++){
    setInterval(peripheryText, 150, i);
  }

  $(".cube-face").click(function(event){
    var x = event.pageX;
    var y = event.pageY;
    $("#cube").css('transform', "translateZ(-350px) rotateX(" + event.pageY + "deg) rotateY(" + event.pageX + "deg)");
  })

});

$(window).resize(function(){
  resize();
});

function cubeText(index){
  synth.triggerAttackRelease(notes[face_index], "8n");
  $(".cube-face").eq(index).text(words_arr[word_index]);
    word_index++;
    if(word_index >= words_arr.length){
      word_index = 0;
    }
    if(face_index >= 6){
      face_index = 0;
    } else {
      face_index++;
    }
}

function peripheryText(index){
  var wLength = Math.floor(width/10.3);
  var shortWLength = Math.floor(height/10.3);
  
  if(index == 0){
      curr_offset = char_offset;
      $(".periphery").eq(index).children().text(str.slice(curr_offset, curr_offset + wLength));
      curr_offset += wLength;
  } else if(index == 1){
      $(".periphery").eq(index).children().text(str.slice(curr_offset, curr_offset + shortWLength));
      curr_offset += shortWLength;

  } else if(index == 2){
      $(".periphery").eq(index).children().text(str.slice(curr_offset, curr_offset + wLength));
      curr_offset += wLength;

  } else if(index == 3){
      $(".periphery").eq(index).children().text(str.slice(curr_offset, curr_offset + shortWLength));
      curr_offset += shortWLength;

  }
  if(index == 3){
    char_offset += 1;
  }
}



function resize(){
  width = $(window).width();
  height = $(window).height();
  var cube_size = 700;
  var p_height = 40;
  var p_padding = 10;
  $("#container").css({
    height: cube_size,
    width: cube_size,
    left: (width - cube_size)/2,
    top: (height - cube_size)/2
  });

  $(".cube-face").css({
    width: cube_size,
    height: cube_size
  });

  $("#periphery-top").css({
    width: width - (p_height + 2*p_padding - 0.25),
    height: p_height,
    top: p_padding,
    left: p_padding + 0.5
  });

  $("#periphery-bottom").css({
    width: width - (p_height + 2*p_padding),
    height: p_height,
    top: height-(p_height + p_padding),
    left: p_height + p_padding - 0.5,
    "transform-origin": "center center",
    transform: "rotate(180deg)"
  });

  $("#periphery-right").css({
    width: height - (p_height + 2*p_padding),
    height: p_height,
    top: 0,
    left: width- (p_height + p_padding),
    "transform-origin": "left bottom",
    transform: "rotate(90deg) translateX(-" + (p_height - p_padding) + "px)"
  });

  $("#periphery-left").css({
    width: height - (p_height + 2*p_padding - 1),
    height: p_height,
    top: height/2 - (2 * p_padding),
    left: 2*p_height - height/2,
    "transform-origin": "center bottom",
    transform: "rotate(-90deg)"
  });
}
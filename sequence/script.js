var width;
var height;
var str = "Always so depressing in the cramped isolation of a 6 hour flight, the recycled air pushes you further and further within yourself. Being ten thousand feet in the air, you see your entire life stretching out in all directions, and your tired and frazzled brain can only pass the time by taking stock of everything you’ve ever done, everything you’ve ever thought, everyone you’ve ever met. You tell yourself that it’s a depression that you crave, this vast and lonesome introspection. You tell yourself that it’s useful to take inventory: who do you love, who do you want to spend time with, what’s stopping you... Maybe this line of thought is helpful, maybe it’s not. There’s no way to tell right now. Figure-A pretends to take a nap in the other room, hoping figure-B will take notice of A’s absence. Instead, as A lies in bed alone, A hears B talking to figure C, and laughing, outside the room. Eventually the voices quiet and A suspects that B and C have left together. Nothing is left but disappointment. Figure-A has decided not to feel this way anymore, and not to play games. But A still truly wishes that B would value A more. A knows that B loves A, but A wishes it was a more active love. A wants to talk to B like, all the time. A is willing to do anything for B, and wishes that B was willing to do the same. A is trying to show love in a healthier way. A has reconciled with the foreclosure of any romantic relationship, and only wants the closeness of something resembling brotherhood. Above all, A refuses to do things that makes A feel pathetic. A feels like this is working. A realizes that being best friends with B feels so good. A is optimistic that this is enough. A literally refuses to feel bad anymore. A knew that B also watched Juno on the plane. This is the type of bond that A wants, even craves, and luckily has. A rereads the notes A wrote before, even just a couple of days ago. Always there is a level of remove. A hated the idea of seeing his entire life stretched out in front of them. A hates making mistakes. A loves emptiness and feels a deep affiliation with the void. A does not think this is incompatible with the pursuit of a fulfilling life. A realizes that some people may not understand this. A thinks B is so cute! A thinks that everything B does is so cute, that every part of B’s body, and mannerisms, are so cute. A feels like A will always love B. B makes A feel loved. All A wants to do is make B feel loved. A feels like B is like a brother to A. A is trying to cement this framework of familial love. B is like the cutest puppy, and at the same time a brother, and at the same time the cutest cat. Where you go, I follow";
var words_arr = str.split(" ");
var word_index = 0;
var position_index = 0;
var word_queue = [];

var synth = new Tone.PolySynth(4, Tone.Synth).toMaster();
var notes = Tone.Frequency("C3").harmonize([0, 4, 7, 12]);

$(document).ready(function(event){

  resize();
  // if(navigator.onLine){
  //   $(".container").html("You are connected");
  // } else {
  //   $(".container").html("Welcome to the world of disconnection");
  // }
  timer();

});

$(window).resize(function(){
  width = $(window).width();
  height = $(window).height();
  resize();
});

function timer(prevIndex) {
  var randNote = Math.floor(Math.random() * notes.length);
  synth.triggerAttackRelease(notes[randNote], "1n");

  window.navigator.vibrate(200);
  var randIndex = Math.floor(Math.random() * 13);
  if(randIndex > 7){
    position_index++;
    if(position_index >= 13){
      position_index = 0;
    }
  }
  if(word_queue.length > 10){
    $("#container").children().eq(word_queue.shift()).text("");
  }
  //$("#container").children().eq(prevIndex).text("");

  //var randWord = Math.floor(Math.random() * words_arr.length);

 $("#container").children().eq(position_index).text(words_arr[word_index]);
 word_queue.push(position_index);
 word_index++;
 if(word_index < words_arr.length){
    var t = setTimeout(timer, 500, position_index);
 }
}


function resize(){
  width = $(window).width();
  height = $(window).height();
  var fontsize = parseInt($("body").css("font-size"));
  var margin = 20;
  var divWidth = width/3 - margin;

  $("#a").css({
    left: margin,
    top:  margin,
    width: divWidth,
    height: fontsize
  });

  $("#b").css({
    left: width/2 - divWidth/2,
    top:  margin,
    width: divWidth,
    height: fontsize
  });

  $("#c").css({
    right: margin,
    top:  margin,
    width: divWidth,
    height: fontsize
  });

  $("#d").css({
    left: width/3 - divWidth/2,
    top:  (height - fontsize)*0.25 + margin*0.5,
    width: divWidth,
    height: fontsize
  });

  $("#e").css({
    right: width/3 - divWidth/2,
    top:  (height - fontsize)*0.25 + margin*0.5,
    width: divWidth,
    height: fontsize
  });

  $("#f").css({
    left: margin,
    top:  height/2 - fontsize/2,
    width: divWidth,
    height: fontsize
  });

  $("#g").css({
    left: width/2 - divWidth/2,
    top:  height/2 - fontsize/2,
    width: divWidth,
    height: fontsize
  });

  $("#h").css({
    right: margin,
    top:  height/2 - fontsize/2,
    width: divWidth,
    height: fontsize
  });

  $("#i").css({
    left: width/3 - divWidth/2,
    top:  (height - fontsize)*0.75 - margin*0.5,
    width: divWidth,
    height: fontsize
  });

  $("#j").css({
    right: width/3 - divWidth/2,
    top:  (height - fontsize)*0.75 - margin*0.5,
    width: divWidth,
    height: fontsize
  });

  $("#k").css({
    left: 20,
    top:  height - (fontsize + margin),
    width: divWidth,
    height: fontsize
  });

  $("#l").css({
    left: width/2 - divWidth/2,
    top:  height - (fontsize + margin),
    width: divWidth,
    height: fontsize
  });

  $("#m").css({
    right: margin,
    top:  height - (fontsize + margin),
    width: divWidth,
    height: fontsize
  });
}
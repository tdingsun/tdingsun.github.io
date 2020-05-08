var width;
var height;
var title = "Excerpts from No Man's Land";
var author = "Ali Dipp"
var speed = 200;

var paragraphs = [
  "It’s been since December since we’ve convened. I would hope it isn’t our last. You’re probably somewhere on the east side of town. The buildings are so large over there; it feels more like Texas. We do both live in Texas. Almost like different states. It very well could be an inscrutable distance. Right now, I can’t bother to drive the eleven miles. The distance between has a way of stretching over all passes. Passed us, too far it all lays.",
  "Regardless of where we are now, I recall our conversation at the funeral last year. Even with the few phrases, the words dealt due cost. Sentiments mark a price. The present steals meaning, and one only knows word’s worth in hindsight. To recompensate, understanding takes time.",
  "In the distance of roughly eleven miles, the words stretch beyond light.",
  "To love language is to wage treason every day. War for water. In this anarchy, only syllables survive from few words. Within history’s watershed, wrought words break under the force of a watershed. Here at the precipice, a river’s waves waiver. What resembles currents if not the oscillation, a conversation between words and their fraught histories? I won’t ever assume this pacifies, nor am I inclined to passivity. As movement transpires, one cannot dispute the give and take. Even in this effort to receive, growing pains sever.",
  "Our border parses sides across a water’s channel. It wasn’t until the Chamizal Convention of 1963, when a watershed broke, fracturing embankment. Formerly, the border used to move and flood as a dance between sided currents. My grandfather crossed that shifting river. Now, it settles. A mile east from our house, I’m looking right now at the freight trains heave parallel to the wall during this morning hour.",
  "I’ve always grieved definitions. Mirroring my thoughts around Texas, I hate to love and love to hate these frames. I lament the confines while celebrating change. Those same detested constricts compel this change. While words define themselves in meaning, the profound potential resides outside of definitions. It is outside of definitions where justice rests beyond meaning.",
  "Outlanders’ manifest in different ways—from cowboys, border dwellers, artists, heretics, and sinners. All of who probably also know they are odd. The differences miss the crux. There is still something we share. I justify wrongness, as any artist does.  And in doing so, perhaps we all tow our respected lines.",
  "Out of fairness, my affection originated from stealing. For many years, I took his language. Robbing long enough, stealing grew into a language divorced from its source. For five years, his language felt familiar. A language removed from its origin in order to find its own. ‘Familiar’ isn’t a feeling, it is, after all, only an adjective. I was young enough and inclined to the greenest belief that yes, familiarity could be felt and even exchanged. I plunder out of thrift. Thrift never felt like theft. Pillaging words to claimed fondness. The fiction took form as to what I considered infallibly true.",
  "The penny lights surge atop the morning jaundice. A minute ago, prior to the dawn in Mexico, the copper lights inflected differently. In the sun’s arrival, the smattered lights impinge gas holes through the flat valley. Light pierces through all land, regardless of range. They continue the never-ending sky below the earth. From lightest to a conditional orange similar to the sky, this transition comes to rise. I once committed words to illuminate a spectrum. Now I don’t need to explain such a pedantic phenomenon. I don’t have enough days to capture the sky’s change in words.",
  "Can’t send desert sun, because, as an image, it passes past reach. A mirage of its own kind. Hopefully, we all share some form of warmth out and away from wherever ‘here’ lays/lies. Warmth at least is capable of being felt."
];

var p_split = [];

paragraphs.forEach(function(p, index){
  p_split.push(p.split(" "));
});

var tv;
var th;

var syl_i;

wordID = 0;

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

  var word = p_split[gridid][wordID];
  var wordDiv = $(`<div class='word word-${gridid}'>${word}</div>`);
  $("#container").append(wordDiv);

  wordDiv.css({
    "padding-left": randNote*(100/(notes.length + 2)) + "vw",
    "color": gridid % 2 == 0 ? "thistle" : "darkgoldenrod",
    "background-color": gridid % 2 == 0 ? "darkgoldenrod" : "thistle",
  });

  var syllables = RiTa.getSyllables(word);
	var syllables_arr = syllables.split("/");
  var time = syllables_arr.length * speed;
  // syl_i = setInterval(beat, speed, randNote);
  wordID++;
  if(wordID < p_split[gridid].length){
    setTimeout(startText1, time, gridid);
  } else {
      wordID = 0;
     setTimeout(startText1, 1500, gridid + 1);
  }
  $("#container").get(0).scrollIntoView({behavior: "smooth", block: "end", inline: "center"});

}

// function beat(note){
//   synth.triggerAttackRelease(notes[note], "4n");
// }

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
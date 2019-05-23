var width;
var height;

var s;
var m;
var h;
var ms;

var numSeconds;

var hue = 0;
var str = "Arcanist  Archer Assassin Astrologian Bard Beastmaster Berserker Bishop Black-Mage Cannoneer Chemist Conjurer Dancer Dark Knight Defender Devout Dragoon  Evoker Exorcist Fencer Fighter Gambler Geomancer Guardian Gunner Hawkeye Illusionist Kaiser Knight Merchant Monk Necromancer Ninja Oracle Paladin Performer Pirate Ranger Red-Mage Runeseeker Sage Salve-maker Samurai Scholar Seer Sniper Soldier Spiritmaster Summoner Swordmaster Templar Thief Time-Mage Viking  Warrior  White-Mage Wizard Yokai";
var words_arr = str.split(" ");

StartAudioContext(Tone.context, 'html').then(function(){
  //started
  console.log("startaudiocontext");
});

//have to click to start audio context
$(document).click(function(){
  //Tone.start();
  console.log("clicked");
});

var synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
var notes = Tone.Frequency("G2").harmonize([1, 3, 6, 8, 10, 
                                            3, 6, 8, 10, 13, 
                                            6, 8, 10, 13, 15, 
                                            8, 10, 13, 15, 18,
                                            10, 13, 15, 18, 20,
                                            13, 15, 18, 20, 22,
                                            15, 18, 20, 22, 25,
                                            18, 20, 22, 25, 27,
                                            20, 22, 25, 27, 30,
                                            22, 25, 27, 30, 32,
                                            25, 27, 30, 32, 34,
                                            27, 30, 32, 34, 37]);
var noteIndex = 0;


$(document).ready(function(event){
  width = $(window).width();
  height = $(window).height();




  for(var i = 0; i < 5; i++){ //number of columns
      var div = $('<div />').addClass("container")
      $("body").append(div);
  }

  for(var i = 0; i < 6; i++){
    var timerdiv = $('<div />').addClass("timer");
    timerdiv.css("left", i*width/5);
    timerdiv.css("top", height/2 - 10);
    if(i == 0){
      timerdiv.css("text-align", "left");

    } else if(i == 5){
      timerdiv.css("text-align", "right");
      timerdiv.css("left", i*width/5 - 40);
    } else {
      timerdiv.css("text-align", "center");
      timerdiv.css("left", i*width/5 - 20);
    }
    $("body").append(timerdiv);
  }

  numSeconds = 0;


  window.addEventListener("wheel", scrolling, {passive: false});


  timer();
  changeText(s, ms);

});

$(window).scroll(function(event){
  scrolling();
});



$(window).resize(function(){
  width = $(window).width();
  height = $(window).height();
  $(".timer").each(function(i){
      if(i == 0){
        $(this).css("left", i*width/5);
      } else if(i == 5){
        $(this).css("left", i*width/5 - 40);
      } else {
        $(this).css("left", i*width/5 - 20);
      }
  })
});

function scrolling() {
    changeText(s, ms);
  synth.triggerAttackRelease(notes[noteIndex], "8n");
      noteIndex++;
      if(noteIndex >= notes.length){
        noteIndex = 0;
      }
}

function timer() {
  synth.triggerAttackRelease(notes[noteIndex], "2n");
      noteIndex++;
      if(noteIndex >= notes.length){
        noteIndex = 0;
      }
  var today = new Date();
  h = today.getHours();
  m = today.getMinutes();
  s = today.getSeconds();
  ms = today.getMilliseconds();
  changeColor(m, s, ms);
  changeText(s, ms);
  setTimer();
  var t = setTimeout(timer, 1000);
}

function changeColor(m, s, ms){
  var hue = 6*m + 0.1*s;
  $("body").css("color", "hsl(" + hue + ", 100%, 50%)");
}

function changeText(s, ms){
  var n = s + 1;
  var fsize = height/(n);

  $(".container").css("font-size", fsize);
  $(".container").empty();
  for(var i = 0; i < n; i++){
      var index = Math.floor(Math.random() * words_arr.length);
     $(".container").append(words_arr[index] + "<br>");
  }

}

function setTimer(){
  $(".timer").text(numSeconds);
  numSeconds += 1;

}
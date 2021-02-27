var width;
var height;
var title = "I Never Believe it <br> Until it Happens Again";
var author = "Tiger Dingsun";
var text = "1. I never believe it until it happens again. 2. Acts of god manifest themselves as strikes from a hammer onto a chisel strategically jammed in a crack. But I am on the other side of the stone and I have no idea where these cracks may appear. One function of modernity is the lessening of probability for Grace and Reversals of Fortunes. Bad luck becomes more of a constant. Baselines shift gradually but steadily. Resistance requires diligence in exercising your own agency. You are a being in this world. But affecting it is not an easy task. Godspeed. 3. In those moments when you are alone. The light is exact in its placement A spear of infinite length / And flowers opening slowly And that sound That they make As the water level lowers And its like In those moments when you are alone When I am alone When I am alone When I feel particularly Like I want to atone Daylight flowers on the table yellow patterns on the wall Glasses glinting on the table Plastic shadows on the wall When that low hum Thats constantly Buzzing in your ear Suddenly stops And the silence Floods inward Coming from all sides And flowers Growing slowly And that sound That it makes As the dimness of the bright winter day sweeps across the room And god is like What you would call In those moments When I am alone When I am alone When I feel particularly like I want to atone Something thats has caused everything to happen In this exact way You don’t know what its called But I feel as though One day I may return. 4. If you feel its right Then tell me when the blade is necessary Gripped me through the light Fortune always favors the scary Spiritual error Didn’t you say you never wanted to be the bearer Of bad news Even though you’ve felt this way For way too long. 5. You usually play the fool. But today you sit with me on a bench outside of school right before the denouement. The rain had just cleared up. You see with clear eyes. The ground is wet like the tears that glisten in your eyes as you give a wan smile and reflect on your own losses. The things you’ve held back until now, you finally choose to reveal to impart your wisdom and clarity. You look up, opening your eyes and your face is so beautiful in the sunlight suddenly streaming down on us. I finally know what I must do. I never believe it until it happens again. But it always. happens. again.";
var words = text.split(' ');
var speed = 100;

var tv;
var th;

var volume = new Tone.Volume(-12);
var synth = new Tone.PolySynth(7, Tone.Synth).chain(volume, Tone.Master);
var notes = Tone.Frequency("F3").harmonize([0, 2, 4]);

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
    $("#title").addClass("title-small");

    setTimeout(() => {
      displayWord(0);
      $('#start').hide();
    }, 500);

  });


});


function displayWord(i){
  var randNote = Math.floor(Math.random() * notes.length);
  synth.triggerAttackRelease(notes[randNote], "2n");

  let word = words[i];

  if(word == "1.") {
    notes = Tone.Frequency("F3").harmonize([0, 2]);
    $('#container').css("background-color", "black");
    setColor("slategrey");
  }

  if(word == "2.") {
    notes = Tone.Frequency("F3").harmonize([0, 2, 4]);
    $('#container').css("background-color", "darkslategrey");
    setColor("tan");
  }

  if(word == "3.") {
    notes = Tone.Frequency("F3").harmonize([0, 2, 4, 7]);
    $('#container').css("background-color", "darkkhaki");
    setColor('orangered');

  }

  if(word == "4.") {
    notes = Tone.Frequency("F3").harmonize([0, 2, 4, 7, 11]);
    $('#container').css("background-color", "tan");
    setColor('seashell');

  }

  if(word == "5.") {
    notes = Tone.Frequency("F3").harmonize([0, 2, 4, 7, 12]);
    $('#container').css("background-color", "seashell");
    setColor('darkkhaki');

  }

  $('#bigword').text(word);
  addSmallWord(word);
  if(i < words.length - 1);
  var syllables = RiTa.getSyllables(word);
  var syllables_arr = syllables.split("/");
  let syllables_str = '';
  for(let syl of syllables_arr){
    syllables_str += `[${syl}] `
  }  
  $('#syllables').text(syllables_str);
  var time = syllables_arr.length * speed;
  if( word.charAt(word.length - 1) == '.' || word.charAt(word.length - 1) == '?'){
    time = 1000;
  }
  if(i < words.length - 1){
    setTimeout(displayWord, time, i+1);
  }

}

function setColor(color){
  $('#container').css("color", color);
  $('#title').css("color", color);
  $('#bigwordframe').css("color", color);
  $('#mute-btn').css("color", color);
  $('#horizontal').css("background-color", color);
  $('#vertical').css("background-color", color);

}

function addSmallWord(word){
  let div = $('<div class="word"></div>');
  div.text(word);
  div.css('top', Math.random() * -300);
  div.css('animation-delay', `${Math.random()}s`);
  $('#container').append(div);

  if(Math.random() < 0.3){
    let div = $('<div class="spacer"></div>');
    $('#container').append(div);
  }

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

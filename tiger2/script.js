var width;
var height;
var title = "dream song";
var author = "Tiger Dingsun";
var text = "oh you said, you said, you said i wouldn’t need you for a while and its true I didn’t need you for the longest time but i need you now i wanna feel you in a different way like stroking your cheek after you shave Or lying when I already ate So I could spend more time with you Even when there’s nothing to do dreams operate in symbolic space so logic doesn’t feel the same And people sharing the same face like seeing you and wondering If I was you and you were me Would life feel like an RPG Be with me Stay with me Oh baby please I wanna see You in A different Light Like the dust in the air during golden hour What it feels like holding power Wilting like supermarket flowers Floating by with friends online Wanting more but feeling fine And there’s something that I wanna say dreams exist in symbolic space so logic doesn’t have to be the same And we can be in the same place And I can finally touch your face Superposition’s fucking great They’ll legislate a way to be Lonely in society oh you said you said you said i wouldn’t need you for a while and its true I didn’t need you for the longest time but i need you now oh you said you said you said i wouldn’t need you for a while and its true I didn’t need you for the longest time but i need you now";
var words = text.split(' ');
var speed = 250;

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
    time = 1500;
  }
  if(i < words.length - 1){
    setTimeout(displayWord, time, i+1);
  }

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

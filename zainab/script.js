var width;
var height;
var title = "Affirmations for My Existence";
var author = "Zainab Aliyu"
var speed = 350;

var sequences = ["i am the manifestation","i am the dream", "i am my mothers dream","i am my mothers nation","i am of this nation","i am the dream for this nation","i am the manifestation of my mothers dream for this nation"];

var tv;
var th;

var volume = new Tone.Volume(-12);
var synth = new Tone.PolySynth(7, Tone.Synth).chain(volume, Tone.Master);

var notes = Tone.Frequency("B3").harmonize([0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24]);

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

  $('.word-container').mouseenter(function(event){
    $(this).css('background-color', 'green');
  });

  $('.word-container').mouseleave(function(event){
    if($(this).css('background-color') != "rgb(47, 79, 79)"){
      $(this).css('background-color', 'transparent');
    }
  });


  $('.word-container').click(function(event){
    let noteID = parseInt(this.id);
    console.log(noteID);
    synth.triggerAttackRelease(notes[noteID], "4n");
  
    if($(this).css('background-color') != "rgb(47, 79, 79)"){
      $(this).css('background-color', 'rgb(47, 79, 79)');
    } else {
      $(this).css('background-color', 'transparent');
    }
  });

  for(let i = 0; i < 7; i++){
    $(`#pane-${i}`).click(function(event){
      playSequence(i);
    });
  }

});

function playSequence(i){
  $('.word-container').css("background-color", "transparent");
  let seq = sequences[i].split(" ");
  setTimeout(displayWord, speed, seq, 0, i);
}

function displayWord(seq, i, paneidx){
  let word = seq[i];

  let noteID = $(`#${word}`).parent()[0].id;
  console.log(noteID);
  synth.triggerAttackRelease(notes[noteID], "4n");

  $(`#${word}`).parent().css("background-color", "darkslategrey");
  $(`#pane-${paneidx} .pane-inner`).text(word);
  if(i < seq.length - 1){
    setTimeout(displayWord, speed, seq, i+1, paneidx);
  }
}


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

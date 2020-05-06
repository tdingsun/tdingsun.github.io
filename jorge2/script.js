var width;
var height;
var title = "Glossary of Feelings~~~";
var author = "Jorge Palacios"

var feelings = ["The comfort and love you feel when you look at someone you’re in love with in the eyes.", 

"The feeling of a reverie from watching too many 7 second videos.", 

"The feeling of being absolutely lost in the dark.", 

"The feeling of being in bed for as long as you want.", 

"The feeling of being overcome with the visual sensation of witnessing the ocean.", 

"The feeling of being so close to someone that you’re in love with and being in their embrace.",

"The feeling of being taken in by joy with others in a moment where you withhold any judgment and have fun.",

"The feeling of comfort from being next to an animal and listening to their breath.",

"The feeling of a crush deep in your heart that squeezes when you see them.",

"The feeling of disappointing someone you love.",

"The feeling of disappointment in oneself and wanting to not exist for the time being.",

"The feeling of disappointment when you have no motivation to get out of bed.",

"The feeling of empathizing with someone’s pain and wondering how unfair the world is.",

"The feeling of empathizing with a being who is not an animal and realizing that they feel too.",

"The feeling of fear as you hallucinate half awake in the middle of the night.",

"The feeling of gratitude.",

"The feeling of having slept for long enough but you don’t want to face being conscious so you go back to sleep only to wake up in a daze.",

"The feeling of love and care you have for a guardian figure.",

"The feeling of love for a family member who is older than you.",

"The feeling of love for a family member who is your age or younger.",

"The feeling of momentary acceptance once you realize your body is falling or a limb is displaced.",

"The feeling of pity and guilt you have for someone you love who you realize has no hope.",

"The feeling of pleasure that  you get from a self-generated idea you had never encountered before.",

"The feeling of reliving something so nostalgic that you feel like you’re home.",

"The feeling of resentment towards someone who mistreated you as a child.",

"The feeling of self pity.",

"The feeling of stillness when you finally have nothing to do.",

"The feeling of undeniable nausea.",

"The feeling of wetness in your mouth as you see a food so delicious that it just makes your brain feel like it has already made it to your taste buds.",

"The feeling of wrapping your mind around a logical concept for the first time.",

"The feeling when you throw up and you realize that you’re living inside a body.",

"The manic feeling of having not slept in a day and a half.",

"The moment when being with a friend in awkward silence is no longer awkward.",

"The urgent fear and adrenaline when you run for your life.",

"The visceral fear that wedges a hole in your stomach as you contemplate the fact that one day you will cease to exist.",

"The warm feeling of unexpectedly thinking of your partner in the middle of the day.",

"When you feel proud for a loved one.",

"When you feel proud of yourself for a monumental task.",

"When you feel proud of yourself for a small task.",

"When you have just finished a task and you’re in a daze of sleeplessness and exhaustion but relieved that it’s complete."].reverse();

var pDivs = [];

var word_index = 0;
var volume = new Tone.Volume(-6);
var synth = new Tone.PolySynth(4, Tone.Synth).chain(volume, Tone.Master);
var notes = Tone.Frequency("E1").harmonize([0, 4, 7, 11, 14, 17, 21]);

var tv;
var th;

$(document).ready(function(event){
  width = $(window).innerWidth();
  height = $(window).innerHeight();
  displayTitle(title, author);
  setTimeout(setupText, 1500);
  tv = setInterval(rotateVertical, 1000);
  th = setInterval(rotateHorizontal, 2000);

  $('.row').on("scroll", ".paragraph", function(event){
    console.log("hi");
    var randNote = Math.floor(Math.random() * notes.length);
    synth.triggerAttackRelease(notes[randNote], "16n");
  });
  
});

$("#title").click(function(){
  console.log("hi");
  $(".feeling").removeClass("activated").css({
    top: 'calc(50vh - 100px)',
    left: 'calc(50vw - 100px)',
  });
});

$("#mute-btn").click(function(){
  Tone.Master.mute = !Tone.Master.mute;
  $(this).text($(this).text() == 'MUTE' ? 'SOUND ON' : 'MUTE');
});


$("#container").on("mouseenter", ".feeling", function(event){
  $(this).addClass("activated");
  $(".feeling").draggable({
    snap: true,
    containment: '#container',
    stack: ".feeling",
    drag: function(event, ui){
  
      var randNote = Math.floor(Math.random() * notes.length);
      synth.triggerAttackRelease(notes[randNote], "16n");
    }
  });
});


function displayTitle(title, author){
  $("#title").html(title + "<br>by " + author);
}

function setupText(){
  feelings.forEach(function(p, index){
    let newDiv = $(`<div class="feeling"></div>`);
    newDiv.text(p);
    $("#container").append(newDiv);
  });

  $("#title").css({
    "font-size": "3rem"
  });
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

$("#clockContainer").mouseenter(function(){
  clearInterval(tv);
  clearInterval(th);
  tv = setInterval(rotateVertical, 30);
  th = setInterval(rotateHorizontal, 30);
});

$("#clockContainer").mouseleave(function(){
  clearInterval(tv);
  clearInterval(th);
  tv = setInterval(rotateVertical, 1000);
  th = setInterval(rotateHorizontal, 1000);
});
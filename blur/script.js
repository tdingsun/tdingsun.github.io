var w;
var h;
var count = 0;
var hue = 0;
var imgcount = 0;

var str = "* The “I” that I encounter when I am alone. I walk alone down the hill, snow everywhere, blinding. I close my eyes. I feel weighted, like stones in my pocket, I almost stop and never continue walking again. I experience totalizing inertia. The “I” that is the desire-ing subject that I sometimes feel as if I am merely observing. The “I” that is full of desire. Desire for something that can never come to me. Desire pulls me forward. Identity is not about what I am, it’s about what I want. What I don’t want. The “I” that approximates most closely the benchmark of authenticity. The “I” that I claim to be the real “I”.";
var sentences = str.split(".");
console.log(sentences);

var lastScrollTop = 0;
var blur = 0;
var blur_r = 0;
var reverse = false;


var synth = new Tone.PolySynth(8, Tone.Synth).toMaster();
var notes = Tone.Frequency("C1").harmonize([0, 3, 7, 11, 13]);
var noise = new Tone.Noise("brown").start();
var autoFilter = new Tone.AutoFilter({
  "frequency" : "4m",
  "depth": 0.1,
  "min" : 800,
  "max" : 5000
}).connect(Tone.Master);

//connect the noise
noise.connect(autoFilter);
//start the autofilter LFO
autoFilter.start()

StartAudioContext(Tone.context, 'div');
//have to click to start audio context
$('div').click(function(){
  Tone.start();
});

$(document).ready(function(event){
  for(let sentence of sentences){
      var span;
      if(reverse){
        span = $('<span />').addClass("blurry-r").html(sentence);
        reverse = false;
      } else {
        span = $('<span />').addClass("blurry").html(sentence);
        reverse = true;
      }
      $("#container").append(span);
  }
});

$(window).scroll(function(event){
  var st = $(this).scrollTop();
    $(".blurry").css("text-shadow", "0 0 " + blur + "px rgba(0, 100, 100, 1)");
    $(".blurry-r").css("text-shadow", "0 0 " + blur_r + "px rgba(0, 100, 100, 1)");
  console.log(st);
  if (st > lastScrollTop){
    synth.triggerAttackRelease("G2", "2n");
    //scrolled down
    if(blur < 100){
      blur += 2;
    }
    if(blur_r > 0){
      blur_r -= 2;
    }

  } else {
    synth.triggerAttackRelease("C3", "2n");
    //scrolled up
    if(blur_r < 100){
      blur_r += 2;
    }
    if(blur > 0){
      blur -= 2;
    }
  }
  lastScrollTop = st;

  // if($(window).scrollTop() + $(window).height() >= $(document).height() + 20){
  //   $(window).scrollTop(0);
  // } else if($(window).scrollTop() <= 20){
  //   $(window).scrollTop($(document).height());
  // }


});



$(window).resize(function(){
  w = $(window).width();
  h = $(window).height();
});
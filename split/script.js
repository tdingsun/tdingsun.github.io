var width = $(window).width();
var height = $(window).height();
var divWidth;
const margin = 20;
var fontsize = parseInt($("body").css("font-size"));

var str = "I'm afraid of Americans.* (The country with a manifold ugliness)";
var words_arr = str.split(" ");
var word_index = 0;
var position_index = 0;
var word_queue = [];

var resizeSwitch = true;
var currInterval = 500;
var numDivs = 1;
var divisor = 2;
var intervalDelta = 0.95;
var synth = new Tone.PolySynth(8, Tone.Synth).toMaster();
var notes = Tone.Frequency("G2").harmonize([0, 2, 5, 7, 9, 12, 14, 17, 19, 21, 24, 26, 29, 31, 33]);

StartAudioContext(Tone.context, 'div').then(function(){
  //started
  console.log("clicked");

});

//have to click to start audio context
$('div').click(function(){
  //Tone.start();
  console.log("clicked");
});

$(document).ready(function(event){
  //setupDivs();

  // $(".panel").click(function(){
  //   var index = $(".panel").index(this);
  //   rotate(this, index);
  // });
  var newDiv = $('<div />').addClass("innertext");
  newDiv.text(str);
  $("#container").append(newDiv);

  var divHeight = parseInt(newDiv.css("height"));
  console.log(divHeight);

  newDiv.css({
        width: "100%",
        left: 0,
        top: height/2 - (divHeight/2)
  });

  setTimeout(split, interval());


});

$(window).resize(function(){
  clearTimeout(window.resizeFinished);
  window.resizeFinished = setTimeout(function(){
      resizeSwitch = !resizeSwitch;
      console.log("resize finished")
  }, 250);
  resize();
});

function interval(){
  if(currInterval <= 10){
    intervalDelta = 1.05;
  }
  if(currInterval >= 500){
    intervalDelta = 0.95;
  }
  console.log(currInterval * intervalDelta);

  return currInterval *= intervalDelta;
}

function split(){
  $("#container").empty();
  numDivs *= divisor;
  for(var i = 0; i < numDivs; i++){
    var newDiv = $('<div />').addClass("innertext");
    newDiv.text(str.slice( i*(str.length/numDivs) , (i+1)*(str.length/numDivs) ) );
    $("#container").append(newDiv);

    var divHeight = parseInt(newDiv.css("height"));
    var top = (height/(numDivs+1))*(i+1) - (divHeight);
    if(top < 0){
      top = 0;
    } else if (top >= (height - divHeight)){
      top = height - divHeight;
    }
    newDiv.css({
      width: width/numDivs - 2,
      left: 0,
      top: top
    });
  }
  if(numDivs >= str.length || numDivs >= width/4){
    divisor = 0.5;
  }
  if(numDivs <= 1){
    divisor = 2;
  }

  setTimeout(split, interval());

}

function resize(){
  width = $(window).width();
  height = $(window).height();
}
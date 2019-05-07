var width = $(window).width();
var height = $(window).height();
var str = "Driving back from that pond in Arcadia: Do you feel like there’s something missing in your life? It definitely feels that way, but right next to that feeling sits another, clearer realization that there might actually be nothing missing from my life, that this first feeling is just a feeling. Maybe both can exist at the same time. What more do you want? I guess the things I want are the things that I perceive others have and I don’t have. But I constantly have to remind myself that there’s no such thing as (or at least shouldn’t be) a model for what a life should have, which means that technically there should be no way for something to be missing from my life. What do you have? I have my friends, my family, my body, an education, the ability to pay my rent, a place to sleep, a 13-inch MacBook Pro... What don’t you have? A 15-inch MacBook Pro [laughs]. Should I call my mom now, or talk to her when I go home? It seems like you want to call your mom now. The way the highway stretches out in front of us makes it seem like we are going somewhere, but we’re really just driving home. I hate the idea of living my life modeled after some hetero-romantic paradigm found in the TV shows I’ve watched, and I hate the idea of living my life as modelled after the likes of cis-white-gay-men like Dan Savage and how dare he be the first person in my life to tell me that it gets better. What does he know and why can’t there be someone, anyone else The landscape was all shrubs and sky. We miss our exit and take the next one. The only way I am able to distract myself from one problem is by focusing on another.";
var sentence_array = RiTa.splitSentences(str);

var intervalID;
var zeroIntervalID;

var synth = new Tone.PolySynth(6, Tone.Synth).toMaster();

var num_divs = sentence_array.length;
var div_width = 0.4*width/Math.sqrt(num_divs);
var div_height = div_width;
var div_arr = [];

StartAudioContext(Tone.context, 'div').then(function(){
  //started
  console.log("clicked");

});

//have to click to start audio context
$(document).click(function(){
  //Tone.start();
  console.log("clicked");
});

$(document).ready(function() {
  resize();
  setupDivs();

  $(".hidden").hover(function(){
    if($("#timer").text() != "0"){
      synth.triggerAttackRelease("G2", "8n");
      intervalID = setInterval(timer, 500);
    } else {
      synth.triggerAttackRelease("D3", "8n");
      clearInterval(zeroIntervalID);
    }
  }, function(){
    clearInterval(intervalID);
    zeroIntervalID = setTimeout(function(){
        $("#timer").text("3");
      }, 350);
  });

});

$(window).resize(function(){
  resize();
});

function timer(){
  var currText = parseInt($("#timer").text());
  if(currText > 0){
    if(currText == 1){
      synth.triggerAttackRelease("D3", "8n");
    } else {
      synth.triggerAttackRelease("G2", "8n");
    }
    $("#timer").text(currText - 1);
  }
}

function setupDivs(){
  for(var i = 0; i < num_divs; i++){
    var margin_percent_w = div_width/width;
    var margin_percent_h= div_height/height;
    var randLeft = Math.random() * 100 * (1-margin_percent_w);
    var randTop = Math.random() * 100 * (1-margin_percent_h);
    var new_div = $("<div>");
    new_div.addClass("hidden");
    new_div.css({
      left: randLeft + "%",
      top: randTop + "%",
      width: div_width,
      height: div_height
    });
    //check collision
    var attempts = 0;
    while(checkCollision(new_div)){
      randLeft = Math.random() * 100 * (1-margin_percent_w);
      randTop = Math.random() * 100 * (1-margin_percent_h);
      new_div.css({
        left: randLeft + "%",
        top: randTop + "%",
      });
      attempts++;
      if(attempts > 20){
        break;
      }
    }
    div_arr.push(new_div);
  }

  div_arr.sort(compareDivs);

  for(var i = 0; i < num_divs; i++){
    div_arr[i].attr("title", sentence_array[i]);
    $("#container").append(div_arr[i]);
  }

}

function checkCollision(div){
  if(div_arr.length == 0){ return false; }

  var left = parseFloat(div.css("left")) * width * 0.01;
  var right = left + div_width;
  var top = parseFloat(div.css("top")) * height * 0.01;
  var bottom = top + div_height;

  for(var i = 0; i < div_arr.length; i++){

    var comp_left = parseFloat(div_arr[i].css("left")) * width * 0.01;
    var comp_right = comp_left + div_width;
    var comp_top = parseFloat(div_arr[i].css("top")) * height * 0.01;
    var comp_bottom = comp_top + div_height;

    if(left > comp_right){ continue; }
    if(right < comp_left){ continue; }
    if(bottom < comp_top){ continue; }
    if(top > comp_bottom){ continue; }

    return true;
  }
  return false;
}

function compareDivs(a, b){
  if(width > height){ return(parseInt(a.css("left")) - parseInt(b.css("left")));
  } else { return(parseInt(a.css("top")) - parseInt(b.css("top")));}
}

function resize(){
  width = $(window).width();
  height = $(window).height();
  div_width = 0.4*width/Math.sqrt(num_divs);
  div_height= div_width;


  $("#timer").css({
    width: width,
    top: (height - parseInt($("#timer").css("height")))*0.5
  });

  $(".hidden").css({
    width: div_width,
    height: div_height
  })
}
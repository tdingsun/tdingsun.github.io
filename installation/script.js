var width = $(window).width();
var height = $(window).height();
const fontsize = $("body").css("font-size");

var obj;
var peripheryStr;
var cube_size = 700;

$.getJSON('http://tdingsun.github.io/installation/text.json', function(data){
  obj = data;
  peripheryStr = obj.periphery[0];
});

var char_offset = 0;
var curr_offset = 0;

var synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
var notes = Tone.Frequency("C4").harmonize([0, 2, 5, 7, 9, 12]);

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

  resize();
  for(var i = 0; i < 7; i++){
    setTimeout(cubeText, 150 + i*50, i);
  }
  for(var i = 0; i < 4; i++){
    setInterval(peripheryText, 150, i);
  }

  $(".cube-face").click(function(event){
    var x = event.pageX;
    var y = event.pageY;
    $("#cube").css('transform', "translateZ(-350px) rotateX(" + event.pageY + "deg) rotateY(" + event.pageX + "deg)");
  })

});

$(window).resize(function(){
  resize();
});

function cubeText(index){
  synth.triggerAttackRelease(notes[index], "8n");


  if(index == 0){ //center
    var randIndex = Math.floor(Math.random() * obj.center.length);
    $(".cube-face").eq(index).children().text(obj.center[randIndex]);
  } else if(index == 1){ //above
    var randIndex = Math.floor(Math.random() * obj.above.length);
    $(".cube-face").eq(index).children().text(obj.above[randIndex]);
  } else if(index == 2){ //below
    var randIndex = Math.floor(Math.random() * obj.below.length);
    $(".cube-face").eq(index).children().text(obj.below[randIndex]);
  } else if(index == 3){ //south
    var randIndex = Math.floor(Math.random() * obj.south.length);
    $(".cube-face").eq(index).children().text(obj.south[randIndex]);
    
  } else if(index == 4){ //north
    var randIndex = Math.floor(Math.random() * obj.north.length);
    $(".cube-face").eq(index).children().text(obj.north[randIndex]);
    
  } else if(index == 5){ //west
    var randIndex = Math.floor(Math.random() * obj.west.length);
    $(".cube-face").eq(index).children().text(obj.west[randIndex]);
    
  } else if(index == 6){ //east
    var randIndex = Math.floor(Math.random() * obj.east.length);
    $(".cube-face").eq(index).children().text(obj.east[randIndex]);
  }
  if(parseInt($(".cube-face").eq(index).children().css("height")) >= cube_size){
    $(".cube-face").eq(index).css({
      "font-size": 20
    });
  } else {
    $(".cube-face").eq(index).css({
      "font-size": 30
    });
  }
  $(".cube-face").eq(index).css({
    "padding-top": cube_size/2 - parseInt($(".cube-face").eq(index).children().css("height"))/2
  });

  setTimeout(cubeText, 5000 + index*50, index);

}

function peripheryText(index){

  var wLength = Math.floor(width/10.3);
  var shortWLength = Math.floor(height/10.3);
  
  if(index == 0){
      curr_offset = char_offset;
      $(".periphery").eq(index).children().text(peripheryStr.slice(curr_offset, curr_offset + wLength));
      curr_offset += wLength;
  } else if(index == 1){
      $(".periphery").eq(index).children().text(peripheryStr.slice(curr_offset, curr_offset + shortWLength));
      curr_offset += shortWLength;

  } else if(index == 2){
      $(".periphery").eq(index).children().text(peripheryStr.slice(curr_offset, curr_offset + wLength));
      curr_offset += wLength;

  } else if(index == 3){
      $(".periphery").eq(index).children().text(peripheryStr.slice(curr_offset, curr_offset + shortWLength));
      curr_offset += shortWLength;

  }
  if(index == 3){
    char_offset += 1;
  }

  if(char_offset >= peripheryStr.length){
    char_offset = 1;
  }
}



function resize(){
  width = $(window).width();
  height = $(window).height();
  var p_height = 40;
  var p_padding = 10;
  $("#container").css({
    height: cube_size,
    width: cube_size,
    left: (width - cube_size)/2,
    top: (height - cube_size)/2
  });

  $(".cube-face").css({
    width: cube_size,
    height: cube_size
  });

  $("#periphery-top").css({
    width: width - (p_height + 2*p_padding - 0.25),
    height: p_height,
    top: p_padding,
    left: p_padding + 0.5
  });

  $("#periphery-bottom").css({
    width: width - (p_height + 2*p_padding),
    height: p_height,
    top: height-(p_height + p_padding),
    left: p_height + p_padding - 0.5,
    "transform-origin": "center center",
    transform: "rotate(180deg)"
  });

  $("#periphery-right").css({
    width: height - (p_height + 2*p_padding),
    height: p_height,
    top: 0,
    left: width- (p_height + p_padding),
    "transform-origin": "left bottom",
    transform: "rotate(90deg) translateX(-" + (p_height - p_padding) + "px)"
  });

  $("#periphery-left").css({
    width: height - (p_height + 2*p_padding - 1),
    height: p_height,
    top: height/2 - (2 * p_padding),
    left: 2*p_height - height/2,
    "transform-origin": "center bottom",
    transform: "rotate(-90deg)"
  });
}
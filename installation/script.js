var width = $(window).width();
var height = $(window).height();
var cube_size = 700;

var obj;
var peripheryStr;
var t1;
var t2;

$.getJSON('http://tdingsun.github.io/installation/text.json', function(data){
  obj = data;
  peripheryStr = obj.periphery[0];
});

var char_offset = 0;
var curr_offset = 0;

var synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
var notes = Tone.Frequency("G3").harmonize([0, 3, 5, 7, 9, 12, 17]);

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
    setTimeout(cubeText, 2000 + i*50, i, false);
  }
  $(".cube-face").click(function(event){
    var index = $(".cube-face").index(this);
    console.log(index);
    cubeText(index, true);
  });

  for(var i = 0; i < 4; i++){
    setTimeout(peripheryText, 2000, i);
  }

  $("#handle").draggable({
    start: function(event, ui){
      $("body").css('background-color', "white");

      clearTimeout(t1);
      clearTimeout(t2);
      $("#cube").css({
        "animation-name": "none",
        transition: "0.25s"
      });
    },

    drag: function(event, ui){
      ui.position.left = Math.min(width - 30, Math.max(10, ui.position.left));
      ui.position.top = Math.min(height - 30, Math.max(10, ui.position.top));
      var x = 360 - (ui.position.left / width * 360);
      var y = 360 - (ui.position.top / height * 360);
      $("#cube").css('transform', "translateZ(-350px) rotateX(" + y + "deg) rotateY(" + x + "deg)");
    },

    stop: function(event, ui){
      $("#cube").css("transition", "5s");
      $("body").css('background-color', "yellow");

      t1 = setTimeout(function(){
        $("#cube").css("transform", "translateZ(-350px) rotateX(0deg) rotateY(0deg)");
      }, 5000);
      t2 = setTimeout(function(){
          $("#cube").css("animation-name", "rotation");
      }, 10000);
    }
  });
});

$(window).resize(function(){
  resize();
});

function cubeText(index, clicked){
  $(".cube-face").eq(index).children().css({
      color: "black"
    });
  $(".cube-face").eq(index).css({
    "border-color": "black"
  })
  if(index == 0){
    $("#alienation").css({
        "background-color": "transparent",
        color: "black",
        "border-color": "black"
    });
    $("#desire").css({
          "background-color": "transparent",
          color: "black",
          "border-color": "black"
    });
    $("#loss").css({
          "background-color": "transparent",
          color: "black",
          "border-color": "black"
    });
  }
  
  synth.triggerAttackRelease(notes[index], "8n");

  var selectedObj;
  if(Math.random() < 0.8){ //rate of normal texts
    $("body").css("color", "black");
    if(index == 0){ //center
      selectedObj = obj.center;
    } else if(index == 1){ //above
      selectedObj = obj.above;
    } else if(index == 2){ //below
      selectedObj = obj.below;
    } else if(index == 3){ //south
      selectedObj = obj.south;
    } else if(index == 4){ //north
      selectedObj = obj.north;
    } else if(index == 5){ //west
      selectedObj = obj.west;
    } else if(index == 6){ //east
      selectedObj = obj.east;
    }
  } else { //low chance of loss, desire, alienation texts
    
    var rand = Math.random();
    if(rand <= 0.33){ //loss
      selectedObj = obj.loss;
      $("#loss").css({
        "background-color": "red",
        color: "yellow",
        "border-color": "yellow"
      });
      $(".cube-face").eq(index).children().css({
        color: "red"
      });
      $(".cube-face").eq(index).css({
        "border-color": "red"

      });

    } else if(rand <= 0.66){ //desire
      selectedObj = obj.desire;
      $("#desire").css({
        "background-color": "green",
        color: "yellow",
        "border-color": "yellow"
      });
      $(".cube-face").eq(index).children().css({
        color: "green"
      });
      $(".cube-face").eq(index).css({
        "border-color": "green",
      });

    } else { //alienation
      selectedObj = obj.alienation;
      $("#alienation").css({
        "background-color": "blue",
        color: "yellow",
        "border-color": "yellow"
      });
      $(".cube-face").eq(index).children().css({
        color: "blue"
      });
      $(".cube-face").eq(index).css({
        "border-color": "blue"
      });
    }
  }

  var selectedText = selectedObj[Math.floor(Math.random()*selectedObj.length)];
  $(".cube-face").eq(index).children().text(selectedText);

  //font size change if too much text
  if(parseInt($(".cube-face").eq(index).children().css("height")) >= cube_size){
    $(".cube-face").eq(index).css({
      "font-size": 20
    });
  } else {
    $(".cube-face").eq(index).css({
      "font-size": 30
    });
  }

  //center text vertically
  $(".cube-face").eq(index).css({
    "padding-top": cube_size/2 - parseInt($(".cube-face").eq(index).children().css("height"))/2
  });

  if(!clicked){
    setTimeout(cubeText, 6000 + index*50, index);
  }
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

  setTimeout(peripheryText, 150, index);
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
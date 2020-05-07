var width = $(window).width(); //window width
var height = $(window).height(); //window height
var myCanvas = document.getElementById('world'); //everything is in a canvas
const blockMargin = 12;
$("#world").css("width", width);
$("#world").css("height", height);

var fallingSpeed = 800;

var bodies_list = []; //initiallize array of bodies(rendered rectangles)

//matter.js initialization stuff
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Events = Matter.Events;

var engine = Engine.create();


var render = Render.create({
  canvas: myCanvas,
  engine: engine,
  options: {
    background: 'transparent',
    width: width,
    height: height,
    wireframes: false
  }
});

addStaticBlocks();

var runner = Runner.create();
Runner.run(runner, engine);

// add mouse control
var mouseConstraint = MouseConstraint.create(engine, {
  element: myCanvas,
  constraint: {
      stiffness: 1,
      render: {
          visible: true
      }
  }
});

World.add(engine.world, mouseConstraint);

animate();




// run the renderer, commented out because I don't actually have to display the blocks, I'm just getting their positions to place divs (so i can display text in the divs)
// Render.run(render);



var title = "Portraits and Repetition";
var author = "Wen Zhuang"
var speed = 250;

var poems = [
  "Adrian is my friend, who wears nude, but not the nude of the skin, more so the nude of what is protected by skin, flesh, in other words he is my friend, who is not of the skin, but of the flesh. Adrian is my friend, who you saw naked, but not the naked of the skin, even more naked than what is protected with skin, flesh, in other words, he is my friend, who is not of the skin, but of the meat. Adrian is a friend of mine, whom I have seen naked, but not naked from the skin, but skin naked rather than flesh, in other words, he is my friend, not from the skin, from the flesh. Adrian is a friend of mine, whom I’ve seen naked but not naked from skin, but skin, naked, not flesh, in other words, he is my friend, not from leather, from flesh. Adrian is a friend of mine, whom I’ve seen naked, but not naked by skin, but skin, naked, not flesh, in other words, he’s my friend, not skin, by flesh. Adrian is my friend, and I saw him naked, but not naked, but bare skin, not meat. In other words, it is my friend, not bare skin. Adrian is my friend, and I saw him naked, but not naked but bare skin, not meat. In other words, this is my friend, not bare skin.",

  "Theia, she is a girl who is mild in manner but she is not squat in stature, actually she is not squat but can be mild in stature but never dull in manner. Theia, she is a girl with a gentle style but not crouching. In fact, she does not crouch, but she is a gentle body but never boring. Tia, she is a gentle but not a crouching girl. She doesn’t actually duck, but she’s a gentle body, but never boring. Tia, but must be lifted up? The girl does not exist. Actually duck is not only good, but a gentle body, but never boring. But should she be raised? The girl does not exist. In fact, the duck is not only good, but also gentle, but not boring. But did it grow up? The girl does not exist. Of course, the duck was not only good, but also sweet and pierced. But has it grown? This girl does not exist.",

  "Laura had a heart that was hard to grasp, she had a wandering ear, and knew to make conversation only when enough was overhead, for that Laura was an observer, but some felt she was an eavesdropper. Laura has a hard time understanding the heart, her ears are wandering and she knows Laura is an observer, so she can only speak when there is enough congestion. But Laura is an observer, but some people think she’s a spy. Laura's heart is unbelievable, her ears are off, and she knows she can only talk when she has enough expenses, because Laura is an observer, but some think she listening. Hate knows that you can talk when your heart hurts and your ears hurt. Hate is expensive for a party, but some people think they should listen. Hate knows that you can talk about hurting your heart and hurting your ears. Hate is an expensive party, but some think it should be heard. You can talk about hitting your heart and hitting your ear. Hatred is an expensive party but some people think it should be heard.",

  "Roland is my neighbor and I watch him five days out of the seven, especially when he begins to dance, around the fourth hour of the afternoon, where he will begin to dance, but always with his left foot first. Roland is my neighbor and I watch him for 7 and 5 days. Always dance with his left foot, especially when he starts dancing at 4pm. Roland is my roommate and I have been supervising for 7 or 5 days. Always dancing with her left foot, especially when she starts dancing at 4pm. Roland has the expressions you need every day, my family life, my left foot dance. Especially when I started dancing when I was 16 years old.",

  "The red dress I had wished would be in my closet was not there upon my return to my house, and I loved it still, but I will forget about it soon. When I got back to the house, there was no red dress in my wardrobe, I loved it anyway, but I will soon forget it. When I got home, she wasn’t wearing shorts in my closet. I loved it, but I forgot for a moment. When you got home, my shorts are not in my cupboard. The Lord loved for a few minutes, however, he forgot. When I got home, I had no pool in my boxes. The Lord saw him a few times and forgot. The red dress I wanted to have in the bathroom never came home, I still love it, but I will never forget it.",

  "My string of grapes tasted sour, so I asked my mother if her string of grapes tasted funny, to which she said absolutely not, if her string of grapes tasted funny she would not have washed the entire box of grapes, but I wondered still if I should tell her about my sour string of grapes. I tasted the grapes myself, so my mom asked the woman, and if her olives were laughing, she wasn't the box. He told me to tell him about myself. I also tried grapes, so my mother asked the woman, and her childhood laughter was not a box. He asked me to tell his story. I also tried grapes, so my mother asked this woman if her baby smile wasn’t in the box. He wants to tell you my story. I also tried my face, so my mother wondered if this girl had a baby smile in the box. He wants to tell you my story. I tried it on my face so my mother asked if the girl smiled a baby on her breast. They want to tell you my story. I looked into my mother's eyes and asked if the girl was laughing. I want to tell my story.",

  "My roommate recently bought a scratchy carpet that he did not end up keeping, so he brought it up the stairs and asked me if I’d maybe want it, to which I said I actually had been looking for a carpet and I don’t lie down on it, or touch it much, so it would not bother me if I had it and it were scratchy, except he would need to pick a corner to unroll the rug, so he went to that corner but he fell asleep there instead. My roommate bought a thick carpet that he could no longer handle, and he took me up the stairs and asked if I could, which I said I was really looking for a carpet and couldn't find or touch as much, it wouldn't bother me. I got it and opened it, except he had to take a corner to open the gun, so he went to that corner and slept there. My neighbor bought me a thick carpet that I could no longer carry and took me upstairs and asked if I could find a sofa and I could not find it or touch it, it did not affect me. I took it and opened it, except that he needed an angle to open the gun so he could go to that angle and lie down there. Forgive me, my neighbor bought me a rug that was too thick for me. But not me. I took a gun, which must have been wide, and opened his lips, and the corner with which it could be repeated. Sorry, a neighbor bought me a thicker rug. But I didn't. She pulls out a revolver, it has to be wide, she opens her lips and makes an angle that he can repeat. Unfortunately, one of my neighbors bought a big table for me. However, this is not true. He draws the web. You need to form a wide, open mouth and repeatable corners. So maybe I won't return here after I select this, then select, then click for it. This is the web."
];

var poems_split = [];
var curr_index = [];

var blocktimeout; 

var tv;
var th;

var curr_x = 0;
var curr_y = 0;

//have to click to start audio context
StartAudioContext(Tone.context, window);

var volume = new Tone.Volume(-6);
var synth = new Tone.PolySynth(7, Tone.Synth).chain(volume, Tone.Master);
var notes = Tone.Frequency("C3").harmonize([0, 4, 7, 12, 16, 19, 24]);

//main animation loop refreshes frame, 60fps

function animate() {
  for(var i = 0; i < bodies_list.length; i++){
    let ri = $(".box").size() - i - 1;
    var x = bodies_list[i].position.x;
    var y = bodies_list[i].position.y;
    const {min, max} = bodies_list[i].bounds;
    var w = parseInt($(".box").eq(ri).css("width"));
    var h = parseInt($(".box").eq(ri).css("height"));
    var angle = bodies_list[i].angle;
    $(".box").eq(ri).css("position", "absolute");
    $(".box").eq(ri).css("left", x - w/2 - blockMargin);
    $(".box").eq(ri).css("top", y - h/2);
    $(".box").eq(ri).css("transform", "rotate(" + angle + "rad)");
  }

  window.requestAnimationFrame(animate); 
};

$(document).ready(function(event){
  poems.forEach(function(poem, index){
    poems_split.push(poem.split(". "));
  });
  width = $(window).innerWidth();
  height = $(window).innerHeight();
  displayTitle(title, author);
  setTimeout(setupText, 1500);
  tv = setInterval(rotateVertical, 1000);
  th = setInterval(rotateHorizontal, 2000);
});

function clearCanvas(){
  fallingSpeed = 1000;
  $("#container").empty();
  bodies_list.forEach(function(body, index){
    Matter.Composite.remove(engine.world, body);
  });
  bodies_list = [];
  clearTimeout(blocktimeout);
}

function addSpans(){
  let sentence = poems_split[curr_y][curr_x];

  if(curr_x < poems_split[curr_y].length - 1){
    sentence += ".";
  }
  words = sentence.split(" ");
  words.forEach(function(word, index){
    var newSpan = $(`<span class='box'>${word}</span>`);
    $("#container").append(newSpan);
  }); 
}

function addBlock(i){
  let ri = $(".box").size() - i - 1;
  var spanLeft = parseInt($(".box").eq(ri).offset().left);
  var spanTop = parseInt($(".box").eq(ri).offset().top);
  var spanW = parseInt($(".box").eq(ri).css("width"));
  var spanH = parseInt($(".box").eq(ri).css("height"));

  var body = Bodies.rectangle(spanLeft + spanW/2, spanTop + spanH/2, spanW, spanH, {
    restitution: 0.9,
    torque: 0.5,
    sleepThreshold: 30 
  });
  bodies_list.push(body);
  World.add(engine.world, [body]);
  if(i <= $(".box").size() - 2){
    if(fallingSpeed > 15){
      fallingSpeed *= 0.9;
    }
    blocktimeout = setTimeout(addBlock, fallingSpeed, i + 1);
  }
}


$("#title").click(function(event){
  // $(".box").removeClass("on");
  // $(".box").removeClass("off");
  // timeouts.forEach(function(t, index){
  //   clearTimeout(t);
  // });
});

$(".box").click(function(event){
  let id = $(this).attr('id')[2] - 1;

  if($(this).hasClass("on")){
    clearTimeout(timeouts[id]);
    $(this).addClass("off");
    $(this).removeClass("on");
  } else {
    cycle(id, poems_split[id].length);
    $(this).removeClass("off");
    $(this).addClass("on");
  }
});

function displayTitle(title, author){
  $("#title").html(title + "<br>by " + author);
  setTimeout(() => {
    $("#title").css({
      "font-size": "2rem"
    });

  }, 1500);
}

function setupText(){
  clearCanvas();
  addSpans();
  blocktimeout = setTimeout(addBlock, 3000, 0);
  setArrows();
}

function setArrows(){
  if(curr_y > 0){
    $("#up-arrow").show();
  } else {
    $("#up-arrow").hide();
  }

  if(curr_x > 0){
    $("#left-arrow").show();
  } else {
    $("#left-arrow").hide();
  }

  if(curr_x < (poems_split[curr_y].length - 1)){
    $("#right-arrow").show();
  } else {
    $("#right-arrow").hide();
  }

  if(curr_y < (poems_split.length - 1)){
    $("#down-arrow").show();
  } else {
    $("#down-arrow").hide();
  }
}

$("#left-arrow").click(lUpdate);

$("#right-arrow").click(rUpdate);

$("#down-arrow").click(dUpdate);

$("#up-arrow").click(uUpdate);

$(document).keydown(function(e) {
  let key = e.keyCode;
  switch(key) {
    case 37: //left
      lUpdate();
      break;
    case 38: //up
      uUpdate();
      break;
    case 39: //right
      rUpdate();
      break;
    case 40: //down
      dUpdate();
      break;
  }
});

function lUpdate(){
  curr_x = curr_x <= 0 ? 0 : curr_x-1;
  setupText();
}

function rUpdate(){
  curr_x = curr_x >= (poems_split[curr_y].length - 1) ? curr_x : curr_x+1;
  console.log(curr_x);
  setupText();
}

function uUpdate(){
  curr_y = curr_y <= 0 ? 0 : curr_y-1;
  curr_x = curr_x >= (poems_split[curr_y].length - 1) ? (poems_split[curr_y].length - 1) : curr_x;
  setupText();
}

function dUpdate(){
  curr_y = curr_y >= (poems_split.length - 1) ? curr_y : curr_y+1;
  curr_x = curr_x >= (poems_split[curr_y].length - 1) ? (poems_split[curr_y].length - 1) : curr_x;
  setupText();
}





// Common

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
  $(this).text($(this).text() == 'MUTE' ? 'SOUND ON' : 'MUTE');
});

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


//defines and adds the walls
function addStaticBlocks(){
  //x, y, width, height
  var ground = Bodies.rectangle(width/2, height - 30, width, 60, { isStatic: true});
  var leftWall = Bodies.rectangle(0, height, 40, height*2, { isStatic: true });
  var rightWall = Bodies.rectangle(width, height, 40, height*2, { isStatic: true });
  var ceiling = Bodies.rectangle(width/2, -100, width, 200, {isStatic: true});
  // var diagonalWall_1 = Bodies.rectangle(500, 500, 500, 20, {
  //   isStatic: true,
  //   angle: 0.5
  // });
  // var diagonalWall_2 = Bodies.rectangle(500, 500, 500, 20, {
  //   isStatic: true,
  //   angle: 2.5
  // });

  // add all of the bodies to the world
  World.add(engine.world, [ground, leftWall, rightWall, ceiling]);
}
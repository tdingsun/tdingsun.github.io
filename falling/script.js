const refreshRate = 1000/60; //frame rate
const divTop = 20; //y value of where i'm dropping the blocks from
var toggle = true;
var toggleG = true;

var width = $(window).width(); //window width
var height = $(window).height(); //window height
var myCanvas = document.getElementById('world'); //everything is in a canvas
$("#world").css("width", width);
$("#world").css("height", height);
//text
const str = "I love when people twist the harmonic context and warp it and switch gears. I thought it was so beautiful and so creative. It's like ambient music because I can just be in it. Sometimes you catch what the original composition is, but it's always vague enough that you can be in it without following a structure or melody.";
const words_arr = str.split(" "); //split text into array
var wordIndex = 0; //initiallize index of words_arr
var bodies_list = []; //initiallize array of bodies(rendered rectangles)

//matter.js initialization stuff
var Engine = Matter.Engine,
    Render = Matter.Render,
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

// run the engine
Engine.run(engine);

// run the renderer, commented out because I don't actually have to display the blocks, I'm just getting their positions to place divs (so i can display text in the divs)
//Render.run(render);

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

addBlock(); //embedded in this is a recursive setTimeOut so it adds a block every second until there are no more new words in the word array

//on click, change word of clicked block to random word within the word array
$(window).click(function(){
  if(mouseConstraint.body != null){
    Events.on(mouseConstraint, "mousedown", function(){
      if(mouseConstraint.body != null){
        var body = mouseConstraint.body;
        var id = parseInt(body.label);
        var curr = $(".box").eq(id);
        var prevW = parseInt($(curr).css("width"));
        var randIndex = Math.floor(Math.random() * words_arr.length);
        $(curr).text(words_arr[randIndex]);
        var newW = parseInt($(curr).css("width"));
        var index = $(".box").index(curr);
        var angle = body.angle;
        Body.setAngle(body, 0);
        Body.scale(body, newW/prevW, 1);
        Body.setAngle(body, angle);        
      }    
    });
  }
});

//main animation loop refreshes frame, 60fps
window.setInterval(() => {
  for(var i = 0; i < bodies_list.length; i++){
      var x = bodies_list[i].position.x;
      var y = bodies_list[i].position.y;
      const {min, max} = bodies_list[i].bounds;
      var w = parseInt($(".box").eq(i).css("width"));
      var h = parseInt($(".box").eq(i).css("height"));
      var angle = bodies_list[i].angle;

      $(".box").eq(i).css("left", x - w/2);
      $(".box").eq(i).css("top", y - h/2);
      $(".box").eq(i).css("transform", "rotate(" + angle + "rad)");
  }
}, refreshRate);

$(window).resize(function(){
  width = $(window).width();
  height = $(window).height();
});

$("#toggleGravity").click(function(e){
  if(toggleG){
    engine.world.gravity.y = 0;
    toggleG = false;
    $(e.target).css("background-color", "green");
  } else {
    engine.world.gravity.y = 1;
    toggleG = true;
    $(e.target).css("background-color", "white");

  }
});

$("#toggleStyle").click(function(e){
  for(var i = 0; i < bodies_list.length; i++){
        var body = bodies_list[i];
        var id = parseInt(body.label);
        var curr = $(".box").eq(id);
        var prevW = parseInt($(curr).css("width"));
        var prevH = parseInt($(curr).css("height"));
          if(toggle){
            $(".box").eq(i).css({
              border: "none",
              padding: "0px"
            });
          } else {
            $(".box").eq(i).css({
              border: "1px solid green",
              padding: "20px"
            });
          }
        var newW = parseInt($(curr).css("width"));
        var newH = parseInt($(curr).css("height"));
        var index = $(".box").index(curr);
        var angle = body.angle;
        Body.setAngle(body, 0);
        Body.scale(body, newW/prevW, newH/prevH);
        Body.setAngle(body, angle);   
  }
  if(toggle){
    toggle = false;
    $(e.target).css("background-color", "green");

  } else {
    toggle = true;
    $(e.target).css("background-color", "white");

  }
});

function addBlock(){
  var randWidth = Math.floor(Math.random() * 300) + (width/2 - 150);
  var divLeft = randWidth;

  var div = $("<div />").addClass("box");
    div.css({
    left: divLeft,
    top: divTop
  });
  $("body").append(div);
  var index = $(".box").index(div);
  div.text(words_arr[wordIndex]);
  wordIndex++;

  if(toggle){
    div.css({
      border: "1px solid green",
      padding: "20px"
    });
  } else {
    div.css({
      border: "none",
      padding: "0px"
    });
  }
  var divWidth = parseInt(div.css("width"));
  var divHeight = parseInt(div.css("height"));
  //x, y, width, height
  var body = Bodies.rectangle(divLeft, divTop, divWidth, divHeight, {
    restitution: 0.8,
    render: {
      //fillStyle: "transparent"
    },
    label: $(".box").index(div)
  }); 
  bodies_list.push(body);
  World.add(engine.world, [body]);

  if(bodies_list.length < words_arr.length){
      var t = setTimeout(addBlock, 1000);
  }
}

//defines and adds the walls
function addStaticBlocks(){
  //x, y, width, height
  var ground = Bodies.rectangle(width/2, height + 30, width, 60, { isStatic: true });
  var leftWall = Bodies.rectangle(-10, height, 20, height*2, { isStatic: true });
  var rightWall = Bodies.rectangle(width + 10, height, 20, height*2, { isStatic: true });
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


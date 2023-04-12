let words = [
    ['WARM', 'RAIN'],
    ['JOCK', 'SIMULACRA'],
    ['SACRED', 'CONTAGION'],
    ['DEAD', 'CHEMISTRY'],
    ['AIRY', 'DISK'],
    ['EXTINCTION', 'CROSS'],
    ['CLOUD', 'IRIDESCENCE'],
    ['SHADOW', 'BLISTER'],
    ['PERFECT', 'MIRROR'],
    ['CRYSTAL', 'HABIT'],
    ['RADAR', 'ANGELS'],
    ['ANGELIC', 'LAYER'],
    ['LAVA', 'BALLOON'],
]
let letters = words[0];

let wordsIndex = 1;
setInterval(() => {
    letters = words[wordsIndex];
    wordsIndex++;
    if(wordsIndex >= words.length) {
        wordsIndex = 0;
    }
}, 1000)
const scale = 1000;
const spacing = 50;
const barrier = 5000;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
class Charge {
    x = 0;
    y = 0;
    q;
    q_delta = 10
    body;

    constructor(init_q, body) {
        this.q = init_q * scale
        this.body = body
    }
    step() {
        this.x = this.body.position.x
        this.y = this.body.position.y
        this.q += this.q_delta
        if(this.q > 5000 || this.q < -5000) {
            this.q_delta *= -1
        } 
    }
}


Matter.use('matter-attractors', 'matter-wrap')
// module aliases
var Engine = Matter.Engine,
    Events = Matter.Events,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;


// create an engine
var engine = Engine.create(),
    world = engine.world;

engine.timing.timeScale = 0.25
// create a renderer
var render = Render.create({
    engine: engine,
    canvas: document.getElementById("matterCanvas"),
    options: {
        background: 'transparent',
        height: windowHeight,
        width: windowWidth,
        wireframes: false
    }
});

// run the renderer
// Render.run(render);

// create runner
var runner = Runner.create();
// run the engine
Runner.run(runner, engine);

engine.gravity.scale = 0;

var wall_n = Bodies.rectangle(windowWidth / 2, -50, windowWidth, 100, {
    isStatic: true
})
var wall_s = Bodies.rectangle(windowWidth / 2, windowHeight + 50, windowWidth, 100, {
    isStatic: true
})
var wall_e = Bodies.rectangle(-50, windowHeight / 2, 100, windowHeight, {
    isStatic: true
})
var wall_w = Bodies.rectangle(windowWidth + 50, windowHeight/2, 100, windowHeight, {
    isStatic: true
})
World.add(world, [wall_n, wall_s, wall_e, wall_w]);



var radius = 10;
var density = 100;

var bodyA = Bodies.circle(
    windowWidth / 2,  100, radius,
      {
        density: density,
        frictionAir: 0,
        friction: 0,
        restitution: 1,
        
        plugin: {
            attractors: [
                MatterAttractors.Attractors.gravity
            ],
            // wrap: {
            //     min: {x: 0, y: 0},
            //     max: {x: windowWidth, y: windowHeight}
            // }
        }
      }
);

var bodyB = Bodies.circle(
    200, windowHeight - 200, radius,
      {
        density: density,
        frictionAir: 0,
        restitution: 1,
        plugin: {
            attractors: [
                MatterAttractors.Attractors.gravity
            ],
            // wrap: {
            //     min: {x: 0, y: 0},
            //     max: {x: windowWidth, y: windowHeight}
            // }
        }
      }
);

var bodyC = Bodies.circle(
    windowWidth - 200, windowHeight - 200, radius, {
        density: density,
        frictionAir: 0,
        restitution: 1,
        plugin: {
            attractors: [
                MatterAttractors.Attractors.gravity
            ],
            //  wrap: {
            //     min: {x: 0, y: 0},
            //     max: {x: windowWidth, y: windowHeight}
            // }
        }
    }
);



Body.setVelocity(bodyA, {x: 0, y: 10})
Body.setVelocity(bodyB, {x: 10, y: -10})
Body.setVelocity(bodyC, {x: -10, y: -10})

World.add(world, [bodyA, bodyB, bodyC])


// var mouse = Mouse.create(render.canvas)

// Events.on(engine, 'afterUpdate', function() {
//     if( !mouse.position.x) {
//         return;
//     }
//     Body.translate(bodyC, {
//         x: (mouse.position.x - bodyC.position.x) * 0.25,
//         y: (mouse.position.y - bodyC.position.y) * 0.25
//     })
// })



// let charge_1 = new Charge(0, bodyC);
let charge_2 = new Charge(-5, bodyA);
let charge_3 = new Charge(5, bodyB);
let charge_4 = new Charge(0, bodyC)

let charges = [charge_2, charge_3, charge_4]

var c = document.getElementById("fieldCanvas");
var ctx = c.getContext("2d");
c.width = windowWidth
c.height = windowHeight

ctx.font = "15px sans-serif";
ctx.textAlign = 'center';

window.requestAnimationFrame(step)

function step() {
    for(let charge of charges) {
        charge.step()
    }
    draw()
    window.requestAnimationFrame(step)
}

function draw() {
    clearCanvas()
    for(let i = 100; i < (c.width - 100); i+=spacing) {
        for (let j = 100; j < (c.height - 100); j+=spacing) {
            let vector = getFieldVector(i, j)
         
            let magnitude = Math.floor(Math.sqrt((vector.x * vector.x) + (vector.y * vector.y)))
            let fontSize = map_range(magnitude, 0, 60, 12, 24);
            let color = map_range(magnitude, 0, 50, 0, 255);
            ctx.fillStyle = `rgb(${255-color}, ${100}, ${color})`;
            ctx.font = `${fontSize}px sans-serif`;
            ctx.save();
            ctx.translate(i + vector.x, j + vector.y);
            let angle = Math.atan2(vector.y, vector.x);
            ctx.rotate(angle);
            ctx.fillText(letters[magnitude % 2], 0, fontSize/2.25)
            ctx.restore();

            // ctx.beginPath();
            // ctx.moveTo(i, j);
            // ctx.lineTo(i + vector.x, j + vector.y)
            // ctx.stroke();

        }
    }

    // ctx.font = '10px sans-serif';
    // ctx.fillStyle = "#FF0000";

    // ctx.fillText('JOCK', bodyA.position.x, bodyA.position.y)
    // ctx.fillText('SIMULACRA', bodyB.position.x, bodyB.position.y)

}

function clearCanvas() {
    ctx.clearRect(0, 0, c.width, c.height)
}
function getFieldVector(x, y){
    let vector = {x: 0, y: 0}
        for(let charge of charges){
            let delta_x = charge.x - x
            let delta_y = charge.y - y
            let delta_x_2 = Math.pow(delta_x, 2)
            let delta_y_2 = Math.pow(delta_y, 2)
            let distance_squared = delta_x_2 + delta_y_2
            if(distance_squared > barrier){
                let m = (charge.q / distance_squared)
                vector.x += delta_x * m
                vector.y += delta_y * m
            }
        }
    return vector
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  }
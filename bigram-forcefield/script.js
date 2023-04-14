//consts
const abs = Math.abs, min = Math.min, max = Math.max, floor = Math.floor, random = Math.random, PI = Math.PI, PI2 = PI / 2;
const color = 'black';
const border = 150;
const scale = 1000;
const spacing = 45; //has to be odd
const barrier = 5000;
const q_limit_top = 60000;
const q_limit_bottom = -1 * q_limit_top;
let q_delta = 100
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const fieldCanvas = document.getElementById("fieldCanvas");
const ctx = fieldCanvas.getContext("2d", { alpha: false });
fieldCanvas.width = windowWidth
fieldCanvas.height = windowHeight
ctx.font = "12px sans-serif";
ctx.fillStyle = color;
ctx.strokeStyle = color;

class Charge {
    x = 0;
    y = 0;
    q;
    body;

    constructor(init_q, body) {
        this.q = init_q * scale
        this.body = body
    }
    step() {
        this.x = this.body.position.x
        this.y = this.body.position.y
        this.q += q_delta
        if (this.q > q_limit_top || this.q < q_limit_bottom) {
            q_delta *= -1
        }
    }
}

//set up word list
const words = shuffle([
    ['JOCK', 'SIMULACRA'],
    ['SACRED', 'CONTAGION'],
    ['WARM', 'RAIN'],
    ['DEAD', 'CHEMISTRY'],
    ['AIRY', 'DISK'],
    ['EXTINCTION', 'CROSS'],
    ['CLOUD', 'IRIDESCENCE'],
    ['SHADOW', 'BLISTER'],
    ['PERFECT', 'MIRROR'],
    ['PERFECT', 'WATER'],
    ['CRYSTAL', 'HABIT'],
    ['RADAR', 'ANGELS'],
    ['ANGELIC', 'LAYER'],
    ['LAVA', 'BALLOON'],
    ['HAPPY', 'PATH'],
    ['PIXEL', 'BRUSH'],
    ['UNEXPECTED', 'OFFER'],
    ['NEW', 'TOUCH'],
    ['HARD', 'CARRY'],
    ['SWORD', 'OPTION'],
    ['CALLUS', 'TISSUE'],
    ['FUTURE', 'STATE'],
    ['BOUNCE', 'MESSAGE'],
    ['SPIRITUAL', 'ERROR'],
    ['SILENT', 'ERROR'],
    ['ENTROPY', 'HARVEST'],
    ['MIRROR', 'HOURS'],
    ['FLOATING', 'NUMBERS'],
    ['DAYLIGHT', 'FLOWERS'],
    ['AIRPLANE', 'POEM'],
    ['ACCEPTABLE', 'STAIN'],
    ['TINNITUS', 'SPEEDRUN'],
    ['FORM', 'CONSTANT'],
    ['DEER', 'STONE'],
    ['SEASHELL', 'SURFACE'],
    ['WILD', 'KNOT'],
    ['PLASTIC', 'MYTHOLOGIES'],
    ['PLASTIC', 'SHADOWS'],
    ['YELLOW', 'PATTERNS'],
    ['CATEGORY', 'THEORY'],
    ['LEGENDARY', 'SOFTWARE'],
    ['SOCIAL', 'LUBRICANT'],
    ['PERVASIVE', 'GAME'],
    ['LEGEND', 'TRIPPING'],
    ['WEATHER', 'LORE'],
    ['CAT', 'GAP'],
    ['SUMMERTIME', 'RENDER'],
    ['STRANGE', 'LOOP'],
    ['JUST-NOTICEABLE', 'DIFFERENCE'],
    ['HEAVY', 'WATER'],
    ['DEMON', 'ORE'],
    ['NEUTRON', 'POISON'],
    ['BREAD', 'FRUIT'],
    ['DIVE', 'MASTER'],
    ['GUT-BRAIN', 'AXIS'],
    ['CITRUS', 'TAXONOMY'],
    ['GRAFT', 'CHIMAERA'],
    ['SHARP', 'WAVES'],
    ['PROTOPLAST', 'RELIGION'],
    ['RANDOMNESS', 'HISTORY'],
    ['DIAMOND', 'DUST'],
    ['ICE', 'THREE'],
    ['PREHISTORIC', 'MUSIC'],
    ['SIDE', 'SADDLE'],
    ['SPITEFUL', 'SERVITUDE'],
    ['POUNDING', 'BEAT'],
    ['MAGIC', 'EYE'],
    ['GIRLCRUSH', 'ENDGAME'],
    ['EARTH\'S', 'SHADOW'],
    ['CANONIZED', 'ETERNITY'],
    ['BINARY', 'FIELD'],
    ['GRASSY', 'KNOLL'],
    ['PALM', 'HEART'],
    ['CLOUD', 'STRATA'],
    ['PETROLEUM', 'SHELL'],
    ['GRASS', 'STAIN'],
    ['POLLEN', 'PLATEAU'],
    ['MUCUS', 'REDUX'],
    ['SPINE', 'GUTTER'],
    ['REALITY', 'TUNNEL'],
    ['FUZZY', 'LOGIC'],
    ['SPLASH', 'IMAGE'],
    ['SUICIDAL', 'MISCREANT'],
    ['WALKING', 'HOME'],
    ['SPRING', 'METAL'],
    ['DUMMY', 'SYSTEM'],
    ['UNFAMILIAR', 'CEILING'],
    ['POWDER', 'DIFFRACTION'],
    ['BORING', 'PETRICHOR'],
    ['MOUSE', 'MOMENTS'],
    ['TREE', 'DIAGRAM'],
    ['WET', 'WOOD'],
    ['RADIAL', 'LABRYINTH'],
    ['NORMALIZE', 'CONTEXT'],
    ['SNAKE', 'TRAVERSAL'],
    ['CRATERED', 'MIND'],
    ['FORTUNATE', 'REVERSAL'],
    ['LIFE', 'SIMULATOR'],
    ['CONJUGATE', 'ME'],
    ['STOLEN', 'AETHER'],
    ['PURE', 'TONE'],
    ['EVERY', 'SUNSET'],
    ['FALSE', 'FLAG'],
    ['SALVE', 'MAKER'],
    ['RUNE', 'SEEKER'],
    ['FLAT', 'EMBLEMS'],
    ['UNINCORPORATED', 'TERRITORY'],
    ['ALLEGORICAL', 'FUNCTION'],
    ['FINAL', 'GIRL'],
    ['INTRUSION', 'FANTASY'],
    ['BUTCHERED', 'NAMES'],
    ['OCCASIONAL', 'LIGHT'],
    ['HIT', 'BLISS'],
    ['ON', 'GOD'],
    ['FREE', 'RADICAL'],
    ['BEGIN', 'TRANSFERENCE'],
    ['ZEROTH', 'HORIZON'],
    ['STATE', 'TRICKS'],
    ['BEDROOM', 'COMMUNITY'],
    ['POP', 'TWO'],
    ['ANTI', 'FRAGILE'],
])

//objects
const display = document.getElementById("display");
const list = document.getElementById("list");

//setup words
let first_word;
let second_word;
display.innerHTML = words[0][0] + '<br>' + words[0][1]
list.innerHTML += '<div>' + words[0][0] + ' ' + words[0][1] + '</div>';
let wordsIndex = 0;
const wordTiming = 100;

//matterjs stuff
Matter.use('matter-attractors')
// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    World = Matter.World,
    Bodies = Matter.Bodies

// create an engine
var engine = Engine.create(),
    world = engine.world;
engine.timing.timeScale = 0.25
engine.gravity.scale = 0;

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
Render.run(render);

// create runner
var runner = Runner.create();
// run the engine
Runner.run(runner, engine);

const radius = windowWidth * 0.01;
const density = 100;

let charges = [];

//setup 
setupWalls();
setupSpheres();

//main
switchWords();
window.requestAnimationFrame(step)

function switchWords() {
    let word1_before;
    let word2_before;
    if (wordsIndex === 0) {
        word1_before = words[words.length - 1][0];
        word2_before = words[words.length - 1][1];
    } else {
        word1_before = words[wordsIndex - 1][0]
        word2_before = words[wordsIndex - 1][1]
    }
    let word1_after = words[wordsIndex][0]
    let word2_after = words[wordsIndex][1]
    let maxWordlength = max(word1_before.length, word1_after.length, word2_before.length, word2_after.length);

    setTimeout(switchLetter, wordTiming, 0)

    function switchLetter(idx) {
        let result_1 = word1_after.substring(0, idx) + word1_before.substring(idx, word1_before.length);
        let result_2 = word2_after.substring(0, idx) + word2_before.substring(idx, word2_before.length);
        display.innerHTML = result_1 + '<br>' + result_2
        if (idx <= maxWordlength - 1) {
            setTimeout(switchLetter, wordTiming, idx + 1)
        } else {
            list.innerHTML += '<div>' + words[wordsIndex][0] + ' ' + words[wordsIndex][1] + '</div>';
            setTimeout(() => {
                wordsIndex++;
                if (wordsIndex >= words.length) {
                    wordsIndex = 0;
                    list.innerHTML = '';
                }
                switchWords();
            }, 1000);
        }
    }
}

function step() {
    for (let charge of charges) {
        charge.step()
    }
    draw()
    window.requestAnimationFrame(step)
}

let limit_x = fieldCanvas.width - border;
let limit_y = fieldCanvas.height - border;
let inverse_spacing = 1/spacing;
function draw() {
    clearCanvas()
   

    ctx.beginPath();
    for (let i = border; i < limit_x; i += spacing) {
        for (let j = border; j < limit_y; j += spacing) {
            let vector = getFieldVector(i, j);
            let parity = ((i + j)) & 1;
            let magnitude_squared = (vector.x * vector.x) + (vector.y * vector.y);
            let angle = fastAtan2(vector.y, vector.x);
            let newPoint_x = i + vector.x
            let newPoint_y = j + vector.y
            ctx.save();
            ctx.translate(newPoint_x, newPoint_y);
            ctx.rotate(angle);
            if (magnitude_squared < 100) { //word
                ctx.fillText(words[wordsIndex][parity], -5, 5)
                ctx.restore();
            } else {
                    ctx.moveTo(-4, -4);
                    ctx.lineTo(-4, 4);
                if (magnitude_squared < 10000) { // line and plus
                    ctx.restore();
                    ctx.moveTo(i, j);
                    ctx.lineTo(newPoint_x, newPoint_y)
                } else { // plus only
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-8, 0);
                    ctx.restore();
                }
            }
        }

    }

    ctx.stroke();

}

function getFieldVector(x, y) {
    let vector = { x: 0, y: 0 }
    for (let charge of charges) {
        let delta_x = charge.x - x
        let delta_y = charge.y - y
        let distance_squared = delta_x * delta_x + delta_y * delta_y
        if (distance_squared > barrier) {
            let m = (charge.q / distance_squared)
            vector.x += delta_x * m
            vector.y += delta_y * m
        }
    }
    return vector
}

function setupSpheres() {
    //spheres
    charges = [
        new Charge(0, makeBody(windowWidth * 0.5, 200, 0, -10)),
        new Charge(5, makeBody(200, windowHeight - 200, 10, -10)),
        new Charge(-5, makeBody(windowWidth - 200, windowHeight - 200, -10, -10))
    ]
}

function makeBody(x, y, x_speed, y_speed) {
    let body = Bodies.circle(
        x, y, radius, {
        density: density,
        frictionAir: 0,
        restitution: 1,
        render: {
            fillStyle: color,
        },
        plugin: {
            attractors: [
                MatterAttractors.Attractors.gravity
            ]
        }
    }
    );
    Body.setVelocity(body, { x: x_speed, y: y_speed })
    World.add(world, body);
    return body
}

function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, windowWidth, windowHeight);
    ctx.fillStyle = 'black';

}

function setupWalls() {
    //walls
    var wall_n = Bodies.rectangle(windowWidth * 0.5, -50, windowWidth, 100, {
        isStatic: true,
    })
    var wall_s = Bodies.rectangle(windowWidth * 0.5, windowHeight + 50, windowWidth, 100, {
        isStatic: true,
    })
    var wall_e = Bodies.rectangle(-50, windowHeight * 0.5, 100, windowHeight, {
        isStatic: true,
    })
    var wall_w = Bodies.rectangle(windowWidth + 50, windowHeight * 0.5, 100, windowHeight, {
        isStatic: true,
    })
    World.add(world, [wall_n, wall_s, wall_e, wall_w]);
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = floor(random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


var fastAtan2 = (y, x) => {
     let ax = abs(x);
     let ay = abs(y);
     let a = min(ax, ay) / max(ax,ay);
     let s = a * a;
     let r = ((-0.0464964749 * s + 0.15931422) * s - 0.327622764) * s * a + a;
     if (ay > ax) r = PI2 - r;
     if (x < 0) r = PI - r;
     if (y < 0) r = -r;
     return r;
}; 
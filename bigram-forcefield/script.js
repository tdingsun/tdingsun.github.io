//consts
const abs = Math.abs, min = Math.min, max = Math.max, floor = Math.floor, random = Math.random, PI = Math.PI, PI2 = PI / 2;
const ww = window.innerWidth;
const wh = window.innerHeight;

const color = 'darkslategray';
const border = 200;
var spacing = 49; //has to be odd
if(ww < 800) {
    var spacing = 29;
}
const barrier = 5000;
const q_ceiling = 30000;
const q_floor = -1 * q_ceiling;
var charges = [];
const radius = ww * 0.01;
const density = 100;

const limit_x = ww - border;
const limit_y = wh - border;
const limit = min(limit_x, limit_y);
const x_start = (ww - limit)*0.5;
const x_end = ww - x_start;
const y_start = (wh - limit)*0.5;
const y_end = wh - y_start;

const fieldCanvas = document.getElementById("fieldCanvas");
const ctx = fieldCanvas.getContext("2d");
fieldCanvas.width = ww
fieldCanvas.height = wh
ctx.font = "12px sans-serif";
ctx.fillStyle = color;
ctx.strokeStyle = color;
ctx.lineWidth = 1;

var q_delta = 50
class Charge {
    q;
    body;
    constructor(init_q, body) {
        this.q = init_q
        this.body = body
    }
    step() {
        this.q += q_delta
        if (this.q > q_ceiling || this.q < q_floor) {
            q_delta *= -1
        }
    }
}

//set up word list
var words = shuffle([
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
    ['CORN', 'FED'],
    ['BINKY', 'BONG'],
    ['KICK', 'ROCKS'],
    ['PLANETARY', 'ACCRETION'],
    ['IRON', 'CATASTROPE'],
    ['DIMENSION', 'STONE'],
    ['ABILITY', 'CAPSULE'],
    ['CLEAR', 'AMULET'],
    ['CLAW', 'FOSSIL'],
    ['ACCIDENTAL', 'TAXON'],
    ['SOIL', 'CRUSTS'],
    ['PIONEER', 'SPECIES'],
    ['MOSS', 'BIOREACTOR'],
    ['POWDERED', 'SUNSHINE'],
    ['SUNSHINE', 'LICHEN'],
    ['MOLECULAR', 'FARMING'],
    ['BARE', 'CLAY'],
    ['ECHO', 'GRASS'],
    ['PHOENIX', 'DOWN'],
    ['DEVELOPMENT', 'HELL'],
    ['NINE', 'LONGINGS']
])

//html objects
const display = document.getElementById("display");
const list = document.getElementById("list");
const left_circle = document.getElementById("left-circle");
const right_circle = document.getElementById("right-circle");

//setup words
display.innerHTML = words[0][0] + '<br>' + words[0][1]
var wordsIndex = 0;
const letterTiming = 100;

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
engine.timing.timeScale = 0.1;
engine.gravity.scale = 0;

// create a renderer
var render = Render.create({
    engine: engine,
    canvas: document.getElementById("matterCanvas"),
    options: {
        background: 'transparent',
        height: limit,
        width: limit,
        wireframes: false
    }
});

// run the renderer
Render.run(render);
// create runner
var runner = Runner.create();
// run the engine
Runner.run(runner, engine);

//on resize
window.onresize = function () { location.reload(); }

////////////////////////////

//setup
setupWalls();
setupCharges();

//main
window.requestAnimationFrame(step)

////////////////////////////

//helper functions
var word1_before, word2_before;
var word1_after, word2_after;
var maxWordLength;
var letterLimit;
var switchLetterInterval;
var letterIndex = 0;
const wordLimit = words.length - 1;
function switchWords() {
    if (wordsIndex >= wordLimit) {
        words = shuffle(words);
        wordsIndex = 0;
    } else {
        wordsIndex++;
    }
    if (wordsIndex === 0) {
        list.innerHTML = '';
        word1_before = words[words.length - 1][0];
        word2_before = words[words.length - 1][1];
    } else {
        word1_before = words[wordsIndex - 1][0];
        word2_before = words[wordsIndex - 1][1];
    }
    word1_after = words[wordsIndex][0];
    word2_after = words[wordsIndex][1];
    maxWordLength = max(word1_before.length, word1_after.length, word2_before.length, word2_after.length);
    letterLimit = maxWordLength;

    switchLetters(0);
}

function switchLetters(idx) {
    display.innerHTML = 
        word1_after.slice(0, idx) 
        + word1_before.slice(idx) 
        + '<br>'
        + word2_after.slice(0, idx) 
        + word2_before.slice(idx)
    letterIndex++;
    if (idx <= letterLimit) {
        setTimeout(switchLetters, letterTiming, idx + 1)
    } else {
        list.innerHTML += '<div>' + words[wordsIndex][0] + ' ' + words[wordsIndex][1] + '</div>';
        left_circle.innerHTML = words[wordsIndex][0];
        right_circle.innerHTML = words[wordsIndex][1];
        if(wordsIndex % 2 === 0){
            left_circle.classList.toggle('alt')
        }
        right_circle.classList.toggle('alt')
    }
}

var charge;
var last = 0;
function step(now) {
    if(!last || now - last >= 8000) {
        last = now;
        switchWords();
    }
    for (charge of charges) {
        charge.step();
    }
    draw();
    window.requestAnimationFrame(step)
}


var i = border, j = border, vector, parity, magnitude_2, angle, new_x, new_y
var x_point_limit = ww - 20;
var y_point_limit = wh - 20;
function draw() {
    clearCanvas()
    ctx.beginPath();
    for (j = y_end; j >= y_start; j -= spacing) {
        for (i = x_end; i >= x_start; i -= spacing) {
            vector = getFieldVector(i, j);
            parity = (i + j) & 1;
            magnitude_2 = (vector.x * vector.x) + (vector.y * vector.y);
            angle = fastAtan2(vector.y, vector.x);
            new_x = min(max(20, i + vector.x), x_point_limit);
            new_y = min(max(20, j + vector.y), y_point_limit);
            ctx.save();
            ctx.translate(new_x, new_y);
            ctx.rotate(angle);
            if (magnitude_2 < 500) { //word
                ctx.fillText(words[wordsIndex][parity], -5, 5);
                ctx.restore();
            } else if (magnitude_2 < 1000) {
                ctx.fillText(wordsIndex.toString(), -5, 5);
                ctx.restore();
            } else {
                ctx.moveTo(-4, -4);
                ctx.lineTo(-4, 4);
                if (magnitude_2 < 20000) { // line and plus
                    ctx.restore();
                    ctx.moveTo(i, j);
                    ctx.lineTo(new_x, new_y)
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

var vector_acc, dx, dy, distance_2, m;
const x_offset = (ww - limit)*0.5;
const y_offset = (wh - limit)*0.5;
function getFieldVector(x, y) {
    vector_acc = { x: 0, y: 0 }
    for (let charge of charges) {
        dx = charge.body.position.x + x_offset - x
        dy = charge.body.position.y + y_offset - y
        distance_2 = dx * dx + dy * dy
        m = (charge.q / distance_2)
        vector_acc.x += dx * m
        vector_acc.y += dy * m
    }
    return vector_acc
}

function setupCharges() {
    charges = [
        new Charge(0, makeBody(0, limit*0.5, 0, -10)),
        new Charge(10000, makeBody(limit, limit*0.5, 10, -10)),
        new Charge(-10000, makeBody(limit*0.5, 0, -10, -10))
    ]
}

var body;
function makeBody(x, y, x_speed, y_speed) {
    body = Bodies.circle(
        x, y, radius, {
            density: density,
            velocity: { x: x_speed, y: y_speed },
            frictionAir: 0,
            restitution: 1,
            render: { fillStyle: color },
            plugin: { attractors: [ MatterAttractors.Attractors.gravity ] }
        }
    );
    World.add(world, body);
    return body
}

function clearCanvas() {
    ctx.clearRect(0, 0, ww, wh);
}

function setupWalls() {
    World.add(world, [
        Bodies.rectangle(ww * 0.5, -50, ww, 100, {
            isStatic: true,
            render: {
                visible: false
            }
        }),
        Bodies.rectangle(ww * 0.5, wh - border + 50, ww, 100, {
            isStatic: true,
            render: {
                visible: false
            }
        }),
        Bodies.rectangle(limit + 50, wh * 0.5, 100, wh, {
            isStatic: true,
            render: {
                visible: false
            }
        }),
        Bodies.rectangle(-50, wh * 0.5, 100, wh, {
            isStatic: true,
            render: {
                visible: false
            }
        })
    ])
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = floor(random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

var ax, ay, a, s, r;
function fastAtan2(y, x) {
    ax = abs(x);
    ay = abs(y);
    a = min(ax, ay) / max(ax, ay);
    s = a * a;
    r = ((-0.0464964749 * s + 0.15931422) * s - 0.327622764) * s * a + a;
    if (ay > ax) r = PI2 - r;
    if (x < 0) r = PI - r;
    if (y < 0) r = -r;
    return r;
}; 
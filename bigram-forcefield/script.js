//consts
const abs = Math.abs, min = Math.min, max = Math.max, floor = Math.floor, random = Math.random, PI = Math.PI, PI2 = PI / 2;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const color = 'dodgerblue';
const border = 100;
const spacing = 49; //has to be odd
const barrier = 5000;
const q_limit_top = 60000;
const q_limit_bottom = -1 * q_limit_top;
var charges = [];
const radius = windowWidth * 0.01;
const density = 100;

const fieldCanvas = document.getElementById("fieldCanvas");
const ctx = fieldCanvas.getContext("2d");
fieldCanvas.width = windowWidth
fieldCanvas.height = windowHeight
ctx.font = "12px sans-serif";
ctx.fillStyle = color;
ctx.strokeStyle = color;

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
    ['CORN', 'FED'],
    ['BINKY', 'BONG'],
    ['KICK', 'ROCKS'],
])

//html objects
const display = document.getElementById("display");
const list = document.getElementById("list");

//setup words
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

//on resize
window.onresize = function () { location.reload(); }

////////////////////////////

//setup
setupWalls();
setupCharges();

//main
switchWords();
window.requestAnimationFrame(step)

////////////////////////////

//helper functions
var word1_before, word2_before;
var word1_after, word2_after;
var maxWordLength;
var limit;
var result_1;
var result_2;
function switchWords() {
    if (wordsIndex === 0) {
        word1_before = words[words.length - 1][0];
        word2_before = words[words.length - 1][1];
    } else {
        word1_before = words[wordsIndex - 1][0];
        word2_before = words[wordsIndex - 1][1];
    }
    word1_after = words[wordsIndex][0];
    word2_after = words[wordsIndex][1];
    maxWordLength = max(word1_before.length, word1_after.length, word2_before.length, word2_after.length);
    limit = maxWordLength - 1;
    setTimeout(switchLetters, wordTiming, 0)
}

function switchLetters(idx) {
    result_1 = word1_after.substring(0, idx) + word1_before.substring(idx, word1_before.length);
    result_2 = word2_after.substring(0, idx) + word2_before.substring(idx, word2_before.length);
    display.innerHTML = result_1 + '<br>' + result_2
    if (idx <= limit) { //switching letters
        setTimeout(switchLetters, wordTiming, idx + 1)
    } else { //end condition
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

var charge;
function step() {
    for (charge of charges) {
        charge.step()
    }
    draw()
    window.requestAnimationFrame(step)
}

const limit_x = fieldCanvas.width - border;
const limit_y = fieldCanvas.height - border;
var i, j, vector, parity, magnitude_2, angle, new_x, new_y
function draw() {
    clearCanvas()
    ctx.beginPath();
    for (i = border; i < limit_x; i += spacing) {
        for (j = border; j < limit_y; j += spacing) {
            vector = getFieldVector(i, j);
            parity = (i + j) & 1;
            magnitude_2 = (vector.x * vector.x) + (vector.y * vector.y);
            angle = fastAtan2(vector.y, vector.x);
            new_x = i + vector.x;
            new_y = j + vector.y;
            ctx.save();
            ctx.translate(new_x, new_y);
            ctx.rotate(angle);
            if (magnitude_2 < 100) { //word
                ctx.fillText(words[wordsIndex][parity], -5, 5);
                ctx.restore();
            } else {
                ctx.moveTo(-4, -4);
                ctx.lineTo(-4, 4);
                if (magnitude_2 < 10000) { // line and plus
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

var vector_acc, dx, dy, distance_2, m
function getFieldVector(x, y) {
    vector_acc = { x: 0, y: 0 }
    for (let charge of charges) {
        dx = charge.body.position.x - x
        dy = charge.body.position.y - y
        distance_2 = dx * dx + dy * dy
        m = (charge.q / distance_2)
        vector_acc.x += dx * m
        vector_acc.y += dy * m
    }
    return vector_acc
}

function setupCharges() {
    charges = [
        new Charge(0, makeBody(windowWidth * 0.5, 200, 0, -10)),
        new Charge(3000, makeBody(200, windowHeight - 200, 10, -10)),
        new Charge(-3000, makeBody(windowWidth - 200, windowHeight - 200, -10, -10))
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
    ctx.clearRect(0, 0, windowWidth, windowHeight);
}

function setupWalls() {
    World.add(world, [
        Bodies.rectangle(windowWidth * 0.5, -50, windowWidth, 100, {
            isStatic: true,
        }),
        Bodies.rectangle(windowWidth * 0.5, windowHeight + 50, windowWidth, 100, {
            isStatic: true,
        }),
        Bodies.rectangle(-50, windowHeight * 0.5, 100, windowHeight, {
            isStatic: true,
        }),
        Bodies.rectangle(windowWidth + 50, windowHeight * 0.5, 100, windowHeight, {
            isStatic: true,
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
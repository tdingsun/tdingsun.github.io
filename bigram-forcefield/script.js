//consts
const abs = Math.abs, min = Math.min, max = Math.max, floor = Math.floor, random = Math.random, PI = Math.PI, PI2 = PI / 2;
const ww = window.innerWidth;
const wh = window.innerHeight;

const color = 'darkslategray';
var border = 200;
var spacing = 49; //has to be odd
if (ww < 800) {
    spacing = 29;
    border = 50;
}
const q_ceiling = 50000;
const q_floor = -1 * q_ceiling;
var q_delta = 50
const radius = ww * 0.01;
const density = 100;
const canvasSize = min(ww - border, wh - border);
const canvas_x_start = (ww - canvasSize) * 0.5;
const canvas_x_end = ww - canvas_x_start;
const canvas_y_start = (wh - canvasSize) * 0.5;
const canvas_y_end = wh - canvas_y_start;

const fieldCanvas = document.getElementById("fieldCanvas");
const ctx = fieldCanvas.getContext("2d");
fieldCanvas.width = ww
fieldCanvas.height = wh
ctx.font = "12px sans-serif";
ctx.fillStyle = color;
ctx.strokeStyle = color;
ctx.lineWidth = 1;

var charges = [];
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
    ['RANDOMNESS', 'STUDIES'],
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
    ['NINE', 'LONGINGS'],
    ['BIGRAM', 'FORCEFIELD'],
    ['VISCOUS', 'FLOWSTONES'],
    ['CAVE', 'PEARL'],
    ['KARST', 'FOREST'],
    ['NATURAL', 'PIT'],
    ['TWIN', 'TRACK'],
    ['KNIGHT\'S', 'TOUR'],
    ['PEBBLE', 'MOTION'],
    ['BOOTSTRAP', 'PERCOLATION'],
    ['BRAVELY', 'DEFAULT'],
    ['STRONGLY', 'CHORDAL'],
    ['TRIVIALLY', 'PERFECT'],
    ['ROOK\'S', 'GRAPH'],
    ['SEMANTIC', 'NET'],
    ['ENDING', 'FAIRY'],
    ['GOD', 'SPEED'],
    ['ENDING', 'FAIRY'],
    ['VOLCANIC', 'ARC'],
    ['CONTINENTAL', 'CRUST'],
    ['HYDROUS', 'CURTAIN'],
    ['RIFT', 'ZONE'],
    ['PARASITIC', 'CONE'],
    ['MAGMATIC', 'LULL'],
    ['FISHERIES', 'ACOUSTICS'],
    ['ECHO', 'INTEGRATION'],
    ['DEEP', 'SCATTERING'],
    ['ARRAY', 'CURSE'],
    ['SEAGRASS', 'MEADOWS'],
    ['SULFER', 'CYCLE'],
    ['PYROCLASTIC', 'SHIELD'],
    ['VOLCANO', 'NUMBER'],
    ['EARTH', 'TIMELINE'],
    ['EARTH', 'ANGELS'],
    ['SERPENTINE', 'MINERALS'],
    ['PROSPEROUS', 'WEAPONS'],
    ['DIEGETIC', 'SWITCH'],
    ['CONTINUITY', 'DRIFT'],
    ['WISH', 'FULFILLMENT'],
    ['REVERSE', 'REBIRTH'],
    ['TRAVERSE', 'CITY'],
    ['ANIMAL', 'TALE'],
    ['BEAST', 'EPIC'],
    ['SELF-FULFILLING', 'PROPHECY'],
    ['REGENERATIVE', 'CIRCUITS'],
    ['THERMAL', 'RUNAWAY'],
    ['CASCADING', 'FAILURE'],
    ['VARIABLE', 'STAR'],
    ['ANTI', 'PATTERNS'],
    ['OAK', 'SCREEN'],
    ['TATTOO', 'KISS'],
    ['HARMONY', 'HALL'],
    ['INTERNET', 'SPLINTER'],
    ['AVAILABILITY', 'CASCADE'],
    ['OPINION', 'CORRIDOR'],
    ['SNEAKER', 'NET'],
    ['EMOTIONAL', 'CONTAGION'],
    ['CONCEPT', 'CREEP'],
    ['MINCED', 'OATH'],
    ['WOODEN', 'LANGUAGE'],
    ['TERMINISTIC', 'SCREEN'],
    ['WEASEL', 'WORD'],
    ['TERROR', 'MANAGEMENT'],
    ['EVOLUTIONARY', 'BACKDROP'],
    ['ANXIETY', 'BUFFER'],
    ['MORTALITY', 'SALIENCE'],
    ['REPLICATION', 'FAILURE'],
    ['TERMITE', 'SHIELD'],
    ['MONUMENT', 'VALLEY'],
    ['WILD', 'TYPE'],
    ['FOUR', 'CORNERS'],
    ['TACIT', 'KNOWLEDGE'],
    ['CONSOLE', 'WAR'],
    ['CREEPING', 'NORMALITY'],
    ['LANDSCAPE', 'AMNESIA'],
    ['SPONTANEOUS', 'ORDER'],
    ['ALGAE', 'BLOOM'],
    ['BACTERIAL', 'GLIDING'],
    ['NOCLIP', 'MODE'],
    ['BATTLE', 'PASS'],
    ['BULLET', 'HELL'],
    ['COMPULSION', 'LOOP'],
    ['DOOM', 'CLONE'],
    ['DUNGEON', 'CRAWL'],
    ['BOSS', 'FIGHT'],
    ['RHYTHM', 'HEAVEN'],
    ['SAVE', 'POINT'],
    ['SEQUENCE', 'BREAKING'],
    ['SECRET', 'HEART'],
    ['WALKING', 'SIMULATOR'],
    ['CANDLE', 'COVE'],
    ['COW', 'TIPPING'],
    ['BAD-LUCK', 'SPOT'],
    ['MYSTERY', 'RANCH'],
    ['STRAWBERRY', 'SWITCHBLADE'],
    ['DUSTY', 'ROAMERS'],
    ['SHATTERED', 'JAW'],
    ['FURROWED', 'BROW'],
    ['SEPIA-TONED', 'NIGHTMARE'],
    ['INSTINCTUAL', 'PERFECTIONS'],
    ['HARMONIC', 'STIMULI'],
    ['SELFISH', 'CORE'],
    ['DIVINE', 'BINARIES'],
    ['STONE', 'SKIPPING'],
    ['FOX', 'BOUNDING'],
    ['DRYING', 'EYES'],
    ['DEARLY', 'DEPARTED'],
    ['SCATTERED', 'CONFIGURATIONS'],
    ['SOUL', 'SEEKER'],
    ['OCEAN', 'GRIME'],
    ['SUNSOAKED', 'IMAGES'],
    ['QUIET', 'MUSIC'],
    ['LIMP', 'WRIST'],
    ['DIVINE', 'IGNORANCE'],
    ['STRATEGIC', 'JAMMING'],
    ['RUTHLESS', 'INNOCENT'],
    ['HAPPY', 'SKIN'],
    ['GENTLE', 'RESENTMENT'],
    ['CHILLING', 'RELATIVITY'],
    ['RANDOM', 'TETHERS'],
    ['FAVORITE', 'ZOMBIE'],
    ['CLUMSY', 'GRAMMAR'],
    ['AIRY', 'WISDOM'],
    ['LENS', 'FLARE'],
    ['HAPPY', 'SONGS'],
    ['CAUTIOUS', 'INTERREGNUM'],
    ['BLANK', 'OFFSPRING'],
    ['SIMPLE', 'REQUEST'],
    ['WOOD', 'PIGEON'],
    ['ANTIQUE', 'WHITE'],
    ['CORNFLOWER', 'BLUE'],
    ['DARK', 'KHAKI'],
    ['FOREST', 'GREEN'],
    ['THISTLE', 'DOWN'],
    ['HERALDIC', 'ORDINARY'],
    ['AEOLIAN', 'PROCESS'],
    ['FUGITIVE', 'DUST'],
    ['HYPER', 'ARID'],
    ['HYPER', 'BALLAD'],
    ['ZODIACAL', 'LIGHT'],
    ['FALSE', 'DAWN'],
    ['FIFTH', 'GIANT'],
    ['WATER', 'SKY'],
    ['BEAM', 'SPLITTER'],
    ['MEDICAL', 'GEOLOGY'],
    ['DEAR', 'NAVIGATOR'],
    ['LITURGICAL', 'YEAR'],
    ['HOLY', 'GROUND'],
    ['ORDINARY', 'TIME'],
    ['REFLECT', 'RAID'],
    ['LITTLE', 'HOURS'],
    ['LEVEL', 'SET'],
    ['RUST', 'LANGUAGE'],
    ['UNDERWATER', 'LEVEL']
])

//html objects
const display = document.getElementById("display");
const list = document.getElementById("list");
const left_square = document.getElementById("left-square");
const right_square = document.getElementById("right-square");
const title_screen = document.getElementById("title");
//setup words
display.innerHTML = words[0][0] + '<br>' + words[0][1]
var wordIndex = 0;

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
        height: canvasSize,
        width: canvasSize,
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
// window.onresize = function () { location.reload(); }

//tonejs
const pingPong = new Tone.PingPongDelay("4n", 0.2);
const limiter = new Tone.Limiter(-12);
const filter = new Tone.Filter(600, "bandpass");
const volume = new Tone.Volume(-12);

const reverb = new Tone.Reverb(1);
const lfo = new Tone.LFO("2m", 200, 400);
lfo.connect(filter.frequency);
lfo.start();

var synth = new Tone.PolySynth(Tone.Synth).chain(pingPong, limiter, reverb, filter, volume, Tone.Destination);
synth.set({
    oscillator: {
        type: "sine6"
    }
});
var bassSynth = new Tone.PolySynth(Tone.Synth).chain(limiter, filter, volume, Tone.Destination);
bassSynth.set({
    oscillator: {
        type: "sine12",

    }
});

var notes = Tone.Frequency("G2").harmonize(
    [
        0, 2, 4, 7, 9,
        0, 2, 4, 7, 9,
        12, 14, 16, 19, 21,
        12, 14, 16, 19, 21,
        24, 26, 28, 31, 33,
        36, 38, 40, 43, 45,
        48
    ]);

var bassNotes = Tone.Frequency("G1").harmonize(
    [
        0, 2, 4, 5, 7, 9, 11,
        12, 14, 16, 19, 21, 24
    ]);

var noteIdx = 0;
var bassIdx = 0;

StartAudioContext(Tone.context, 'document.body').then(function () {
    console.log("audocontextfromdocumentbody");
});

//MAIN //////////////////////////

title_screen.addEventListener('click', () => {
    Tone.start();
    title_screen.parentNode.remove();
    setupWalls();
    setupCharges();
    setInterval(() => {
        synth.triggerAttackRelease(bassNotes[randNote % bassNotes.length], "16n");
    }, 500);
    setTimeout(() => {
        wordsActive = false
    }, 2000);
    window.requestAnimationFrame(step)
})

//helper functions//////////////////////////

var prev_w1, prev_w2, curr_w1, curr_w2;
var maxWordLength;
var wordsActive = true;
function switchWords() {
    wordsActive = true;
    if (wordIndex >= words.length - 1) {
        shuffle(words);
        wordIndex = 0;
        list.innerHTML = '';
        prev_w1 = words[words.length - 1][0];
        prev_w2 = words[words.length - 1][1];
    } else {
        wordIndex++;
        prev_w1 = words[wordIndex - 1][0];
        prev_w2 = words[wordIndex - 1][1];
    }
    curr_w1 = words[wordIndex][0];
    curr_w2 = words[wordIndex][1];
    maxWordLength = max(prev_w1.length, curr_w1.length, prev_w2.length, curr_w2.length);
    left_square.innerHTML = curr_w1;
    right_square.innerHTML = curr_w2;
    switchLetters(0);
}
var randNote = 0;
function switchLetters(idx) {
    //blinking squares
    left_square.classList.toggle('alt')
    right_square.classList.toggle('alt')
    //sound
    randNote = floor(random() * notes.length);
    synth.triggerAttackRelease(notes[randNote], "4n");
    bassSynth.triggerAttackRelease(bassNotes[bassIdx], "16n");
    //display changing word
    display.innerHTML = curr_w1.slice(0, idx) + prev_w1.slice(idx) + '<br>' + curr_w2.slice(0, idx) + prev_w2.slice(idx);
    if (idx <= maxWordLength) { //continue condition
        setTimeout(switchLetters, randNote % 2 === 0 ? 250 : 375, idx + 1)
    } else { // end condition
        setTimeout(() => { wordsActive = false; }, 2000); //2 second pause
        bassIdx = randNote % bassNotes.length;
        //add to list
        list.innerHTML += '<div>' + words[wordIndex][0] + ' ' + words[wordIndex][1] + '</div>';
    }
}

function step() {
    if (!wordsActive) { switchWords() }
    for (let charge of charges) { charge.step() }
    draw();
    window.requestAnimationFrame(step)
}

var i, j, vector, parity, magnitude_2, angle, new_x, new_y
const x_point_limit = ww - 20;
const y_point_limit = wh - 20;
function draw() {
    clearCanvas();
    ctx.beginPath();
    for (j = canvas_y_end; j >= canvas_y_start; j -= spacing) {
        for (i = canvas_x_end; i >= canvas_x_start; i -= spacing) {
            vector = getFieldVector(i, j);
            parity = (i + j) & 1;
            magnitude_2 = (vector.x * vector.x) + (vector.y * vector.y);
            angle = fastAtan2(vector.y, vector.x);
            new_x = min(max(20, i + vector.x), x_point_limit);
            new_y = min(max(20, j + vector.y), y_point_limit);
            ctx.save();
            ctx.translate(new_x, new_y);
            ctx.rotate(angle);
            if (magnitude_2 < 1000) { drawWord() }
            else if (magnitude_2 < 10000) { drawLine() }
            else if (magnitude_2 < 40000) { drawCross() }
            else if (magnitude_2 < 50000) { drawNumber() }
            else if (magnitude_2 < 60000) { drawWord() }
            else { drawCross() }
        }
    }
    ctx.stroke();

    function drawWord() {
        ctx.fillText(words[wordIndex][parity], -5, 5);
        ctx.restore();
    }
    function drawLine() {
        ctx.moveTo(-4, -4);
        ctx.lineTo(-4, 4);
        ctx.restore();
        ctx.moveTo(i, j);
        ctx.lineTo(new_x, new_y)
    }
    function drawCross() {
        ctx.moveTo(-4, -4);
        ctx.lineTo(-4, 4);
        ctx.moveTo(0, 0);
        ctx.lineTo(-8, 0);
        ctx.restore();
    }
    function drawNumber() {
        ctx.fillText(wordIndex.toString(), -5, 5);
        ctx.restore();
    }
}

var vector_acc, dx, dy, m;
function getFieldVector(x, y) {
    vector_acc = { x: 0, y: 0 }
    for (let charge of charges) {
        dx = charge.body.position.x + canvas_x_start - x
        dy = charge.body.position.y + canvas_y_start - y
        m = charge.q / (dx * dx + dy * dy)
        vector_acc.x += dx * m
        vector_acc.y += dy * m
    }
    return vector_acc
}

function setupCharges() {
    charges = [
        new Charge(0, makeBody(0, canvasSize * 0.5, 0, -10)),
        new Charge(-10000, makeBody(canvasSize, canvasSize * 0.5, 10, -10)),
        new Charge(10000, makeBody(canvasSize * 0.5, 0, -10, -10))
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
        plugin: { attractors: [MatterAttractors.Attractors.gravity] }
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
        makeWall(ww * 0.5, -50, ww, 100),
        makeWall(ww * 0.5, canvasSize + 50, ww, 100),
        makeWall(canvasSize + 50, wh * 0.5, 100, wh),
        makeWall(-50, wh * 0.5, 100, wh)
    ])
}

function makeWall(x, y, w, h) {
    return Bodies.rectangle(x, y, w, h, {
        isStatic: true,
        render: {
            visible: false
        }
    })
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
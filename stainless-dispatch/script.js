let blockSize = 20;
let borderSize = 100;
let windowWidth = $(window).innerWidth();
let windowHeight = $(window).innerHeight();
let rowSize = Math.ceil(windowWidth / blockSize);
let colSize = Math.ceil(windowHeight / blockSize);

let lensWidthInBlocks = Math.floor(parseInt(document.getElementById("lens").offsetWidth) / blockSize);
let lensHeightInBlocks = Math.floor(parseInt(document.getElementById("lens").offsetHeight) / blockSize);

let populationTimeout;
let populationSpeed = 10;

let dragInterval;
let moveInterval;

noise.seed(Math.random());

const backgroundText = "stillness∙&∙flow∙&∙money∙&∙debt∙&∙islands∙&∙continents∙&∙figure∙&∙ground∙&∙wave∙&∙particle∙&∙loss∙&∙gain∙&∙interpolation∙&∙extrapolation∙&∙synthesis∙&∙fragmenting∙&∙clustering∙&∙infinity∙&∙singularity∙&∙branch∙&∙root∙&∙question∙&∙answer∙&∙inside∙&∙outside∙&∙silver∙&∙gold∙&∙space∙&∙time∙&∙life∙&∙death∙&∙day∙&∙night∙&∙need∙&∙want∙&∙map∙&∙territory∙&∙wander∙&∙wonder∙&∙node∙&∙edge∙&∙sowing∙&∙reaping∙&∙growth∙&∙rot∙&∙wake∙&∙dream∙&∙reality∙&∙illusion∙&∙conscious∙&∙unconscious∙&∙nature∙&∙culture∙&∙binary∙&∙field∙&∙loop∙&∙knot∙&∙volcano∙&∙glacier∙&∙grassy∙&∙knoll∙&∙tears∙&∙sweat∙&∙language∙&∙aesthetics∙&∙aether∙&∙earth∙&∙mender∙&∙trekker∙&∙browser∙&∙innocence∙&∙guilt∙&∙dexter∙&∙sinister∙&∙immanence∙&∙transcendence∙&∙biome∙&∙strata∙&∙cloud∙&∙wave∙&∙plastic∙&∙petroleum∙&∙shell∙&∙pebble∙&∙grass∙&∙stain∙&∙numbers∙&∙letters∙&∙palm∙&∙heart∙&∙daylight∙&∙flowers∙&∙everything∙changes∙&∙everything∙stays∙the∙same∙"

const backgroundTextArray = backgroundText.split(" ");

const NText = "Stillness Flow Money Debt Islands Continents Figure Ground Wave Particle Loss Gain Interpolation Extrapolation Synthesis Fragmenting Clustering Infinity Singularity Branch Root Question Answer Inside Outside Silver Gold Space Time Life Death Day Night Need Want Map Territory Wander Wonder Node Edge Sowing Reaping Growth Rot Wake Dream Reality Illusion Conscious Unconscious Nature Culture Binary Field Loop Knot Volcano Glacier Grassy Knoll Tears Sweat Language Aesthetics Aether Earth Mender Trekker Browser Innocence Guilt Dexter Sinister Immanence Transcendence Biome Bloom Strata Cloud Wave Plastic Petroleum Shell Pebble Grass Stain Numbers Letters Palm Heart Daylight Flowers Bounce Message Silent Error";
const NTextArray = shuffle(NText.split(" "));
let NTextIndex = 0;

const WText = "Stillness Flow Money Debt Islands Continents Figure Ground Wave Particle Loss Gain Interpolation Extrapolation Synthesis Fragmenting Clustering Infinity Singularity Branch Root Question Answer Inside Outside Silver Gold Space Time Life Death Day Night Need Want Map Territory Wander Wonder Node Edge Sowing Reaping Growth Rot Wake Dream Reality Illusion Conscious Unconscious Nature Culture Binary Field Loop Knot Volcano Glacier Grassy Knoll Tears Sweat Language Aesthetics Aether Earth Mender Trekker Browser Innocence Guilt Dexter Sinister Immanence Transcendence Biome Bloom Strata Cloud Wave Plastic Petroleum Shell Pebble Grass Stain Numbers Letters Palm Heart Daylight Flowers Bounce Message Silent Error";
const WTextArray = shuffle(NText.split(" "));
let WTextIndex = 0;

const EText = "Stillness Flow Money Debt Islands Continents Figure Ground Wave Particle Loss Gain Interpolation Extrapolation Synthesis Fragmenting Clustering Infinity Singularity Branch Root Question Answer Inside Outside Silver Gold Space Time Life Death Day Night Need Want Map Territory Wander Wonder Node Edge Sowing Reaping Growth Rot Wake Dream Reality Illusion Conscious Unconscious Nature Culture Binary Field Loop Knot Volcano Glacier Grassy Knoll Tears Sweat Language Aesthetics Aether Earth Mender Trekker Browser Innocence Guilt Dexter Sinister Immanence Transcendence Biome Bloom Strata Cloud Wave Plastic Petroleum Shell Pebble Grass Stain Numbers Letters Palm Heart Daylight Flowers Bounce Message Silent Error";
const ETextArray = shuffle(NText.split(" "));
let ETextIndex = 0;

const SText = "Stillness Flow Money Debt Islands Continents Figure Ground Wave Particle Loss Gain Interpolation Extrapolation Synthesis Fragmenting Clustering Infinity Singularity Branch Root Question Answer Inside Outside Silver Gold Space Time Life Death Day Night Need Want Map Territory Wander Wonder Node Edge Sowing Reaping Growth Rot Wake Dream Reality Illusion Conscious Unconscious Nature Culture Binary Field Loop Knot Volcano Glacier Grassy Knoll Tears Sweat Language Aesthetics Aether Earth Mender Trekker Browser Innocence Guilt Dexter Sinister Immanence Transcendence Biome Bloom Strata Cloud Wave Plastic Petroleum Shell Pebble Grass Stain Numbers Letters Palm Heart Daylight Flowers Bounce Message Silent Error";
const STextArray = shuffle(NText.split(" "));

const trekkerText = "wandering through forests and woods and deserts and fields and plains and mountains and valleys and tundras and taigas and picking up rocks and stones and crystals and ores and geodes and fossils and sticks and bugs and leaves and mushrooms and moss and peat and loam and clay and shells and wading through rivers and lakes and brooks and ponds and oceans and brooks and creeks and everything changes and everything stays the same and"
const trekkerTextArray = trekkerText.split(" ");

const browserText = "wondering about categories and theories and boundaries and dialectics and inputs and outputs and trawling through wikis and lists and indices and documents and records and archives and libraries and shelves and books and pages and paragraphs and sentences and words and traversing down networks and rabbit holes and nodes and graphs and charts and maps and everything changes and everything stays the same and"
const browserTextArray = browserText.split(" ");

let STextIndex = 0;

let currCellIndex = 0;

let maxFontSize = 72;
let minFontSize = 20;

//objects
const NWCell = document.getElementById('NWCell');
const NCell = document.getElementById('NCell');
const NECell = document.getElementById('NECell');
const WCell = document.getElementById('WCell');
const ECell = document.getElementById('ECell');
const SWCell = document.getElementById('SWCell');
const SCell = document.getElementById('SCell');
const SECell = document.getElementById('SECell');
const cells = [NWCell, NCell, NECell, WCell, ECell, SWCell, SCell, SECell];
const lens = document.getElementById('lens');
const lensWidth = lens.offsetWidth + 'px';
const lensHeight = lens.offsetHeight + 'px';

const trekkerTextBox = document.getElementById('trekkertextbox');
const browserTextBox = document.getElementById('browsertextbox');

$(window).blur(function () {
    stopSimulatedDrag();
});

window.onresize = function () { location.reload(); }

$(document).ready(() => {
    makeGrid();
    setCellDimensions();
    dragElement(lens);
    startSimulatedDrag();
    cycleThroughTrekkerBrowserTexts();
})

let trekkerTextIdx = 0;
let browserTextIdx = 0;

function cycleThroughTrekkerBrowserTexts() {
    setInterval(() => {
        trekkerTextBox.innerHTML = trekkerTextArray[trekkerTextIdx];
        trekkerTextIdx = trekkerTextIdx >= (trekkerTextArray.length - 1) ? 0 : trekkerTextIdx + 1
        browserTextBox.innerHTML = browserTextArray[browserTextIdx];
        browserTextIdx = browserTextIdx >= (browserTextArray.length - 1) ? 0 : browserTextIdx + 1
    }, 500)
}

function startSimulatedDrag() {
    let maxWidth = windowWidth - (lens.offsetWidth + borderSize)
    let maxHeight = windowHeight - (lens.offsetHeight + borderSize)
    let minWidth = borderSize;
    let minHeight = borderSize;
    dragInterval = setInterval(() => {
        let randomX = Math.max(Math.random() * maxWidth, minWidth)
        let randomY = Math.max(Math.random() * maxHeight, minHeight)
        simulateDrag(lens, randomX, randomY);
    }, 3000)
}

function stopSimulatedDrag() {
    clearInterval(dragInterval);
    clearInterval(moveInterval);
}

$('#SECell').hover((e) => {
    e.target.innerHTML = "About the Typefaces"
}, (e) => {
    e.target.innerHTML = "Stainless<br>&<br>Dispatch"
})

let cellToggle = true;
$('#NWCell').click((e) => {
    for (let cell of cells) {
        cell.style.transition = '0.1s';
    }
    if (cellToggle) {
        stopSimulatedDrag();
        const smallFontSize = '16px';
        for (let cell of cells) {
            cell.className = 'smallCell'
            cell.style.width = '100px';
            cell.style.height = '100px';
            cell.style.fontSize = smallFontSize;
        }
    } else {
        startSimulatedDrag();
        setCellDimensions()
        for (let cell of cells) {
            cell.className = 'cell'

            cell.style.fontSize = '20px';
        }
    }
    cellToggle = !cellToggle
})

function setCellDimensions() {
    let bottomHeight = windowHeight - (lens.offsetTop + lens.offsetHeight);
    let eastWidth = windowWidth - (lens.offsetLeft + lens.offsetWidth);

    NWCell.style.top = '0px';
    NWCell.style.left = '0px';
    NWCell.style.width = lens.offsetLeft + 'px';
    NWCell.style.height = lens.offsetTop + 'px';

    NCell.style.top = '0px';
    NCell.style.left = lens.offsetLeft + 'px';
    NCell.style.width = lensWidth;
    NCell.style.height = lens.offsetTop + 'px';
    NCell.style.fontSize = Math.max(Math.min(maxFontSize, lens.offsetTop / 6), minFontSize) + 'px';

    NECell.style.top = '0px';
    NECell.style.right = '0px';
    NECell.style.width = eastWidth + 'px';
    NECell.style.height = lens.offsetTop + 'px';

    WCell.style.top = lens.offsetTop + 'px';
    WCell.style.left = '0px';
    WCell.style.width = lens.offsetLeft + 'px';
    WCell.style.height = lensHeight;
    WCell.style.fontSize = Math.max(Math.min(maxFontSize, lens.offsetLeft / 6), minFontSize) + 'px';

    ECell.style.top = lens.offsetTop + 'px';
    ECell.style.right = '0px';
    ECell.style.width = eastWidth + 'px';
    ECell.style.height = lensHeight;
    ECell.style.fontSize = Math.max(Math.min(maxFontSize, eastWidth / 6), minFontSize) + 'px';
    // el.style["font-variation-settings"] = `'wght' ${wght} , 'wdth' ${wdth}, 'ital' ${ital}, 'xhgt' ${xhgt}`;

    SWCell.style.bottom = '0px';
    SWCell.style.left = '0px';
    SWCell.style.width = lens.offsetLeft + 'px';
    SWCell.style.height = bottomHeight + 'px';

    SCell.style.bottom = '0px';
    SCell.style.left = lens.offsetLeft + 'px';
    SCell.style.width = lensWidth;
    SCell.style.height = bottomHeight + 'px';
    SCell.style.fontSize = Math.max(Math.min(maxFontSize, bottomHeight / 6), minFontSize) + 'px';

    SECell.style.bottom = '0px';
    SECell.style.right = '0px';
    SECell.style.width = eastWidth + 'px';
    SECell.style.height = bottomHeight + 'px';
}

function makeGrid() {
    let gridContainer = document.getElementById("grid-container");

    for (let i = 0; i < colSize; i++) {
        for (let j = 0; j < rowSize; j++) {
            let block = document.createElement("div");
            block.className = "block";
            block.id = (i * rowSize) + j;
            block.style.top = (blockSize * i) + 'px';
            block.style.left = (blockSize * j) + 'px';
            block.style.width = blockSize + 'px';
            block.style.height = blockSize + 'px';
            // block.innerHTML = "";
            gridContainer.appendChild(block);
        }
    }
}

function scale(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        clearTimeout(populationTimeout);

        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        stopSimulatedDrag();

        for (let cell of cells) {
            cell.style.transition = 'none';
        }
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        if ((elmnt.offsetTop - pos2) > borderSize && (elmnt.offsetTop - pos2 + lens.offsetHeight) < (windowHeight - borderSize)) {
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        }
        if ((elmnt.offsetLeft - pos1) > borderSize && (elmnt.offsetLeft - pos1 + lens.offsetWidth) < (windowWidth - borderSize)) {
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
        setCellDimensions();
        setCellText();

    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        let overlappingBlocks = getOverlappingBlocks(elmnt.style.top, elmnt.style.left);
        slowlyPopulateBlocks(overlappingBlocks);
        startSimulatedDrag();
    }
}

function simulateDrag(elmnt, randomX, randomY) {
    for (let cell of cells) {
        cell.style.transition = 'none';
    }
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0

    var deltaX = randomX - parseInt(elmnt.offsetLeft)
    var deltaY = randomY - parseInt(elmnt.offsetTop)

    var numFrames = 60;
    var deltaXperFrame = deltaX / numFrames;
    var deltaYperFrame = deltaY / numFrames;

    let Xacc = 0;
    let Yacc = 0;
    let frame = 0;
    moveInterval = setInterval(() => {
        setCellText();

        pos1 = pos3 - Xacc,
            pos2 = pos4 - Yacc,
            pos3 = Xacc,
            pos4 = Yacc

        if ((elmnt.offsetTop - pos2) > borderSize && (elmnt.offsetTop - pos2 + lens.offsetHeight) < (windowHeight - borderSize)) {
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        }
        if ((elmnt.offsetLeft - pos1) > borderSize && (elmnt.offsetLeft - pos1 + lens.offsetWidth) < (windowWidth - borderSize)) {
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        setCellDimensions();
        Xacc = deltaX * easeInOutQuad(frame / numFrames);
        Yacc = deltaY * easeOutCubic(frame / numFrames);
        frame++

        if (Math.abs(Xacc) >= Math.abs(deltaX)) {
            clearInterval(moveInterval)
            let overlappingBlocks = getOverlappingBlocks(elmnt.style.top, elmnt.style.left);
            slowlyPopulateBlocks(overlappingBlocks);
        }
    }, 33)
}

function slowlyPopulateBlocks(overlappingBlocks) {
    overlappingBlocks = shuffle(overlappingBlocks);
    populateBlockLoop(overlappingBlocks, 0);
}

function populateBlockLoop(blocksArray, id) {
    setText(blocksArray[id]);
    if (id < blocksArray.length - 1) {
        populationTimeout = setTimeout(populateBlockLoop, populationSpeed, blocksArray, id + 1);
    }
}

function setCellText() {
    switch (currCellIndex) {
        case 0:
            NCell.innerHTML = NTextArray[NTextIndex++];
            if (NTextIndex === NTextArray.length) {
                NTextIndex = 0;
            }
            currCellIndex++;
            break;
        case 1:
            WCell.innerHTML = WTextArray[WTextIndex++];
            if (WTextIndex === WTextArray.length) {
                WTextIndex = 0;
            }
            currCellIndex++;
            break;
        case 2:
            ECell.innerHTML = ETextArray[ETextIndex++];
            if (ETextIndex === ETextArray.length) {
                ETextIndex = 0;
            }
            currCellIndex++;
            break;
        case 3:
            SCell.innerHTML = STextArray[STextIndex++];
            if (STextIndex === STextArray.length) {
                STextIndex = 0;
            }
            currCellIndex = 0;
            break;

        default:
            break;
    }
}

function setText(id) {
    let el = document.getElementById(id);
    let i = id % rowSize;
    let j = Math.floor(id / colSize);
    let val = (noise.simplex2(i / 32, j / 32) + (noise.simplex2(i / 4, j / 4) / 2) + (noise.simplex2(i / 2, j / 2) / 2));
    let wght = scale(val, -1, 1, 100, 1000);
    let wdth = scale(val, -1, 1, 50, 200);
    // let ital = scale(val, -1, 1, 0, 1);
    let ital = 0;
    let xhgt = scale(val, -1, 1, 0, 100);

    el.innerHTML = Math.random() > 0.1 ? backgroundText[id % backgroundText.length] : "";

    el.style["font-variation-settings"] = `'wght' ${wght} , 'wdth' ${wdth}, 'ital' ${ital}, 'xhgt' ${xhgt}`;
    let colorVar = scale(val, -1.25, 1.25, 0, 150);
    el.style.color = `rgb(${colorVar * 0.8}, ${colorVar * 1.2 + 60}, 255)`
    el.style.backgroundColor = 'transparent'
    if (val > 0) { //land colors
        el.style["font-variation-settings"] = `'wght' ${wght} , 'wdth' ${wdth}, 'ital' ${ital}, 'xhgt' ${xhgt}`;
        el.style.color = `rgb(${colorVar * 1.2}, ${colorVar + 50}, 50)`
        el.innerHTML = el.innerHTML.toUpperCase();
    }
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
function getRandomCharacter() {
    return characters[Math.floor(Math.random() * characters.length)];
}

function shuffle(arr) {
    let currentIndex = arr.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]
    }
    return arr;
}

function getOverlappingBlocks(lensTop, lensLeft) {
    lensTop = parseInt(lensTop);
    lensLeft = parseInt(lensLeft);
    let lensTopInBlocks = Math.ceil(lensTop / blockSize)
    let lensLeftInBlocks = Math.ceil(lensLeft / blockSize)
    let OverlappingBlockIds = [];
    for (let i = lensTopInBlocks; i < lensTopInBlocks + lensHeightInBlocks - 1; i++) {
        for (let j = lensLeftInBlocks; j < lensLeftInBlocks + lensWidthInBlocks - 1; j++) {
            OverlappingBlockIds.push((i * rowSize) + j);
        }
    }
    return OverlappingBlockIds
}

function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function easeInOutElastic(x) {
    const c5 = (2 * Math.PI) / 4.5;

    return x === 0
        ? 0
        : x === 1
            ? 1
            : x < 0.5
                ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
                : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
}

function easeInOutCirc(x) {
    return x < 0.5
        ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
        : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
}

function easeInCubic(x) {
    return x * x * x;
}

function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
}

function easeInOutQuad(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }
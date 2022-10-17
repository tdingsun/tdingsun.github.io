
let blockSize = 16;
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
let dragTime = 30; //in frames at 30 fps, e.g 60 = 2 seconds

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

const trekkerText = "&ZeroWidthSpace; &ZeroWidthSpace; wandering through forests and woods and deserts and fields and plains and mountains and valleys and tundras and taigas and picking up rocks and stones and crystals and ores and geodes and fossils and sticks and bugs and leaves and mushrooms and moss and peat and loam and clay and shells and wading through rivers and lakes and brooks and ponds and oceans and brooks and creeks and everything changes and everything stays the same and &ZeroWidthSpace;"
const trekkerTextArray = trekkerText.split(" ");

const browserText = "&ZeroWidthSpace; &ZeroWidthSpace; wondering about categories and theories and boundaries and dialectics and inputs and outputs and trawling through wikis and lists and indices and documents and records and archives and libraries and shelves and books and pages and paragraphs and sentences and words and traversing down networks and rabbit holes and nodes and graphs and charts and maps and everything changes and everything stays the same and &ZeroWidthSpace;"
const browserTextArray = browserText.split(" ");

let STextIndex = 0;

let currCellIndex = 0;

let maxFontSize = 60;
let minFontSize = 24;
let smallFontSize = 16;

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
const aboutHeader = document.getElementById('aboutheader');
const about = document.getElementById('about');

StartAudioContext(Tone.context, 'div').then(function(){
    //started
    console.log("clicked");
  
  });
  

const player = new Tone.Player("draft.mp3").toDestination();
// play as soon as the buffer is loaded
player.volume.value = -24;
player.autostart = true;

const hitPlayer = new Tone.Player('hit.m4a').toDestination();
hitPlayer.volume.value = -24;
hitPlayer.autostart = false;

$(window).blur(function () {
    stopSimulatedDrag();
    player.stop();
    hitPlayer.stop();
}); 

$(window).focus(function () {
    player.start();
})

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
        trekkerTextBox.innerHTML = "∙ " + trekkerTextArray[trekkerTextIdx] + " " + trekkerTextArray[trekkerTextIdx + 1] + " " + trekkerTextArray[trekkerTextIdx + 2] + " ∙";
        trekkerTextIdx = trekkerTextIdx >= (trekkerTextArray.length - 3) ? 0 : trekkerTextIdx + 1
        browserTextBox.innerHTML = "∙ " + browserTextArray[browserTextIdx] + " " + browserTextArray[browserTextIdx + 1] + " " + browserTextArray[browserTextIdx + 2] + " ∙";
        browserTextIdx = browserTextIdx >= (browserTextArray.length - 3) ? 0 : browserTextIdx + 1
    }, 500)
}

function startSimulatedDrag() {
    clearInterval(dragInterval);
    clearInterval(moveInterval);
    dragInterval = setInterval(() => {simulateRandomDragOnce()}, 3000);
}

function stopSimulatedDrag() {
    clearInterval(dragInterval);
    clearInterval(moveInterval);
    clearTimeout(populationTimeout);
}

function simulateRandomDragOnce(){
    let maxWidth = windowWidth - (lens.offsetWidth + borderSize)
    let maxHeight = windowHeight - (lens.offsetHeight + borderSize)
    let minWidth = borderSize;
    let minHeight = borderSize;
    let randomX = Math.max(Math.random() * maxWidth, minWidth)
    let randomY = Math.max(Math.random() * maxHeight, minHeight)
    simulateDrag(lens, randomX, randomY, dragTime);
}

let cellToggle = true;

NWCell.onclick = (e) => {
    for (let cell of cells) {
        cell.style.transition = '0.1s';
    }
    if (cellToggle) {
        stopSimulatedDrag();
        hideAbout();
        smallCells();
    } else {
        hideAbout();
        bigCells();
        startSimulatedDrag();
        simulateRandomDragOnce();
    }

}

function smallCells () {
    for (let cell of cells) {
        cell.className = 'smallCell'
        cell.style.width = '100px';
        cell.style.height = '100px';
        cell.style.fontSize = smallFontSize + 'px';
        cell.style["font-variation-settings"] = `'wght' ${400} , 'wdth' ${100}`;
    }
    if (parseInt(SCell.style.left) < 250){
        SCell.style.left = '250px';
    }
    if (parseInt(ECell.style.top) < 100){
        ECell.style.top = '100px';
    }
    cellToggle = false;
}

function bigCells() {
    for (let cell of cells) {
        cell.className = 'cell'
    }
    setCellDimensions()
    cellToggle = true;
}



let aboutToggle = false;
SECell.onclick = (e) => {
    stopSimulatedDrag();
    if (aboutToggle) {
        hideAbout();
        bigCells();
        startSimulatedDrag();
        simulateRandomDragOnce();

    } else {
        if(cellToggle) { //big cell
            if(Math.abs(lens.offsetTop - 100) < 50 && Math.abs(lens.offsetLeft - 100) < 50) {
                showAbout();            
            } else {
                simulateDrag(lens, 100, 100, 15);
                setTimeout(() => {
                    showAbout();
                }, 500)
            }
        } else { //small cell
            showAbout();
        }
        
    }
}

function hideAbout() {
    about.style.display = 'none';
    aboutHeader.classList.remove('header');
    aboutHeader.innerHTML = "Stainless<br>&<br>Dispatch";
    SECell.style.justifyContent = 'center'
    aboutToggle = false;
}

function showAbout() {
    stopSimulatedDrag();
    SECell.style.justifyContent = 'space-between'
    aboutHeader.classList.add('header');
    aboutToggle = true;


    if(!cellToggle) { //small cell
        SECell.style.width = (windowWidth - 350) + 'px' 
        SECell.style.height = (windowHeight - 200) + 'px' 
        SCell.style.left = '250px';
        ECell.style.top = '100px';
    }
    about.style.display = 'flex';
    aboutHeader.innerHTML = "About the Typefaces";
    for (let cell of cells) {
        cell.style.fontSize = smallFontSize + 'px';
    }
}

function setCellDimensions() {
    let bottomHeight = windowHeight - (lens.offsetTop + lens.offsetHeight);
    let eastWidth = windowWidth - (lens.offsetLeft + lens.offsetWidth);

    let TypeWeight = scale(lens.offsetTop, 100, windowHeight - (lens.offsetHeight + 100), 100, 1000)

    NWCell.style.top = '0px';
    NWCell.style.left = '0px';
    NWCell.style.width = lens.offsetLeft + 'px';
    NWCell.style.height = lens.offsetTop + 'px';

    NCell.style.top = '0px';
    NCell.style.left = lens.offsetLeft + 'px';
    NCell.style.width = lensWidth;
    NCell.style.height = lens.offsetTop + 'px';
    NCell.style.fontSize = Math.max(Math.min(maxFontSize, lens.offsetTop / 6), minFontSize) + 'px';
    let NorthTypeWidth = scale(lens.offsetTop, 100, windowHeight - (lens.offsetHeight + 100), 200, 50)
    NCell.style["font-variation-settings"] = `'wght' ${TypeWeight} , 'wdth' ${NorthTypeWidth}`;

    NECell.style.top = '0px';
    NECell.style.right = '0px';
    NECell.style.width = eastWidth + 'px';
    NECell.style.height = lens.offsetTop + 'px';

    WCell.style.top = lens.offsetTop + 'px';
    WCell.style.left = '0px';
    WCell.style.width = lens.offsetLeft + 'px';
    WCell.style.height = lensHeight;
    WCell.style.fontSize = Math.max(Math.min(maxFontSize, lens.offsetLeft / 6), minFontSize) + 'px';
    let westTypeWidth = scale(lens.offsetLeft, 100, windowWidth - (lens.offsetWidth + 100), 50, 200)
    WCell.style["font-variation-settings"] = `'wght' ${TypeWeight} , 'wdth' ${westTypeWidth}`;

    ECell.style.top = lens.offsetTop + 'px';
    ECell.style.right = '0px';
    ECell.style.width = eastWidth + 'px';
    ECell.style.height = lensHeight;
    ECell.style.fontSize = Math.max(Math.min(maxFontSize, eastWidth / 6), 20) + 'px';
    let eastTypeWidth = scale(eastWidth, 100, windowWidth - (lens.offsetWidth + 100), 50, 200)
    ECell.style["font-variation-settings"] = `'wght' ${TypeWeight} , 'wdth' ${eastTypeWidth}`;

    SWCell.style.bottom = '0px';
    SWCell.style.left = '0px';
    SWCell.style.width = lens.offsetLeft + 'px';
    SWCell.style.height = bottomHeight + 'px';

    SCell.style.bottom = '0px';
    SCell.style.left = lens.offsetLeft + 'px';
    SCell.style.width = lensWidth;
    SCell.style.height = bottomHeight + 'px';
    SCell.style.fontSize = Math.max(Math.min(maxFontSize, bottomHeight / 6), minFontSize) + 'px';
    let SouthTypeWidth = scale(bottomHeight, 100, windowHeight - (lens.offsetHeight + 100), 200, 50)
    SCell.style["font-variation-settings"] = `'wght' ${TypeWeight} , 'wdth' ${SouthTypeWidth}`;

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
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        stopSimulatedDrag();
        hideAbout();
        bigCells();
        clearTimeout(populationTimeout);
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

function simulateDrag(elmnt, randomX, randomY, numFrames) {
    hitPlayer.start();

    for (let cell of cells) {
        cell.style.transition = 'none';
    }
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0

    var deltaX = randomX - parseInt(elmnt.offsetLeft)
    var deltaY = randomY - parseInt(elmnt.offsetTop)

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

        if (frame >= numFrames) {
            clearInterval(moveInterval)
            let overlappingBlocks = getOverlappingBlocks(elmnt.style.top, elmnt.style.left);
            slowlyPopulateBlocks(overlappingBlocks);
            frame = 0;
        }
    }, 33)
}

function slowlyPopulateBlocks(overlappingBlocks) {
    overlappingBlocks = shuffle(overlappingBlocks);
    populateBlockLoop(overlappingBlocks, 0);
}

function populateBlockLoop(blocksArray, id) {
    setText(blocksArray[id]);
    // hitPlayer.start();
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
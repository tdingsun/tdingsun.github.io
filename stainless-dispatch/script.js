let borderSize = 100;
let blockSize = 16;
if(window.innerWidth > 1200){
    blockSize = 20;
} 
let rowSize = Math.ceil(window.innerWidth / blockSize);
let colSize = Math.ceil(window.innerHeight / blockSize);

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

const NWText = "Stillness Flow Money Debt Islands Continents Figure Ground Wave Particle Loss Gain Interpolation Extrapolation Synthesis Fragmenting Clustering Infinity Singularity Branch Root Question Answer Inside Outside Silver Gold Space Time Life Death Day Night Need Want Map Territory Wander Wonder Node Edge Sowing Reaping Growth Rot Wake Dream Reality Illusion Conscious Unconscious Nature Culture Binary Field Loop Knot Volcano Glacier Grassy Knoll Tears Sweat Language Aesthetics Aether Earth Mender Trekker Browser Innocence Guilt Dexter Sinister Immanence Transcendence Biome Bloom Strata Cloud Wave Plastic Petroleum Shell Pebble Grass Stain Numbers Letters Palm Heart Daylight Flowers Bounce Message Silent Error";
const NWTextArray = shuffle(NWText.split(" "));
let NWTextIndex = 0;

const NEText = "Stillness Flow Money Debt Islands Continents Figure Ground Wave Particle Loss Gain Interpolation Extrapolation Synthesis Fragmenting Clustering Infinity Singularity Branch Root Question Answer Inside Outside Silver Gold Space Time Life Death Day Night Need Want Map Territory Wander Wonder Node Edge Sowing Reaping Growth Rot Wake Dream Reality Illusion Conscious Unconscious Nature Culture Binary Field Loop Knot Volcano Glacier Grassy Knoll Tears Sweat Language Aesthetics Aether Earth Mender Trekker Browser Innocence Guilt Dexter Sinister Immanence Transcendence Biome Bloom Strata Cloud Wave Plastic Petroleum Shell Pebble Grass Stain Numbers Letters Palm Heart Daylight Flowers Bounce Message Silent Error";
const NETextArray = shuffle(NEText.split(" "));
let NETextIndex = 0;

const SEText = "Stillness Flow Money Debt Islands Continents Figure Ground Wave Particle Loss Gain Interpolation Extrapolation Synthesis Fragmenting Clustering Infinity Singularity Branch Root Question Answer Inside Outside Silver Gold Space Time Life Death Day Night Need Want Map Territory Wander Wonder Node Edge Sowing Reaping Growth Rot Wake Dream Reality Illusion Conscious Unconscious Nature Culture Binary Field Loop Knot Volcano Glacier Grassy Knoll Tears Sweat Language Aesthetics Aether Earth Mender Trekker Browser Innocence Guilt Dexter Sinister Immanence Transcendence Biome Bloom Strata Cloud Wave Plastic Petroleum Shell Pebble Grass Stain Numbers Letters Palm Heart Daylight Flowers Bounce Message Silent Error";
const SETextArray = shuffle(SEText.split(" "));
let SETextIndex = 0;

const SWText = "Stillness Flow Money Debt Islands Continents Figure Ground Wave Particle Loss Gain Interpolation Extrapolation Synthesis Fragmenting Clustering Infinity Singularity Branch Root Question Answer Inside Outside Silver Gold Space Time Life Death Day Night Need Want Map Territory Wander Wonder Node Edge Sowing Reaping Growth Rot Wake Dream Reality Illusion Conscious Unconscious Nature Culture Binary Field Loop Knot Volcano Glacier Grassy Knoll Tears Sweat Language Aesthetics Aether Earth Mender Trekker Browser Innocence Guilt Dexter Sinister Immanence Transcendence Biome Bloom Strata Cloud Wave Plastic Petroleum Shell Pebble Grass Stain Numbers Letters Palm Heart Daylight Flowers Bounce Message Silent Error";
const SWTextArray = shuffle(SWText.split(" "));
let SWTextIndex = 0;

const trekkerText = "wandering through forests and woods and deserts and fields and plains and mountains and valleys and tundras and taigas and picking up rocks and stones and crystals and ores and geodes and fossils and sticks and bugs and leaves and mushrooms and moss and peat and loam and clay and shells and wading through rivers and lakes and brooks and ponds and oceans and brooks and creeks and everything changes and everything stays the same and"
const trekkerTextArray = trekkerText.split(" ");

const browserText = "wondering about categories and theories and boundaries and dialectics and inputs and outputs and trawling through wikis and lists and indices and documents and records and archives and libraries and shelves and books and pages and paragraphs and sentences and words and traversing down networks and rabbit holes and nodes and graphs and charts and maps and everything changes and everything stays the same and"
const browserTextArray = browserText.split(" ");

let modeTextArray = browserTextArray;
let modeTextInterval;

let currCellIndex = 0;


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

const modeHeader = document.getElementById('mode-header');
const modeBody = document.getElementById('mode-body');

const blinkers = document.getElementById('blinkers');

const eCellLeftCover = document.getElementById('left-cover');
const eCellRightCover = document.getElementById('right-cover');
const eCellTopCover = document.getElementById('e-cell-dingbat-top');
const eCellBottomCover = document.getElementById('e-cell-dingbat-bottom');
const topLeftCorner = document.getElementById('curved-corner-topleft');
const topRightCorner = document.getElementById('curved-corner-topright');
const bottomLeftCorner = document.getElementById('curved-corner-bottomleft');
const bottomRightCorner = document.getElementById('curved-corner-bottomright');

let eCellParts = [eCellLeftCover, eCellRightCover, eCellTopCover, eCellBottomCover];
let eCellCorners = [topLeftCorner, topRightCorner,bottomLeftCorner, bottomRightCorner ]
const aboutHeader = document.getElementById('about-header');
const aboutBody = document.getElementById('about-body');
const aboutContainer = document.getElementById('about-container');
const aboutCover = document.getElementById('about-cover');

//dimensions calculations

let minWidth = 100;
let maxWidth = window.innerWidth - (lens.offsetWidth + 100);
let minHeight = 100;
let maxHeight =  window.innerHeight - (lens.offsetHeight + 100);

let maxFontSizeMax = maxWidth / 7;
let maxFontSize = Math.min(80, maxFontSizeMax);

console.log(maxFontSizeMax);
let minFontSize = 18;
let minFontSizeMax = 32;
let smallFontSize = 16;


StartAudioContext(Tone.context, 'div').then(function(){
    //started  
  });

const player = new Tone.Player("draft.mp3").toDestination();

  
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
    for (let cell of cells) {
        cell.classList.add('trekker-cell');
        cell.classList.remove('browser-cell');
    }
})

let modeTextIdx = 0;
function cycleThroughModeText() {
    clearInterval(modeTextInterval);
    modeTextInterval = setInterval(() => {
        modeBody.innerHTML = modeTextArray[modeTextIdx] + " " + modeTextArray[modeTextIdx + 1] + " " + modeTextArray[modeTextIdx + 2];
        modeTextIdx = modeTextIdx >= (modeTextArray.length - 3) ? 0 : modeTextIdx + 1
        setCoverWidth();
    }, 500)
}

function setCoverWidth() {
    let coverWidth = Math.max((ECell.offsetWidth - modeBody.offsetWidth - 40) / 2, 0);
    eCellLeftCover.style.width = coverWidth + 'px';
    eCellRightCover.style.width = coverWidth + 'px';

    topLeftCorner.style.top = (eCellTopCover.offsetHeight - 0.5) + 'px';
    topRightCorner.style.top = (eCellTopCover.offsetHeight - 0.5) + 'px';
    bottomLeftCorner.style.top = (ECell.offsetHeight - eCellBottomCover.offsetHeight - 19.5) + 'px';
    bottomRightCorner.style.top = (ECell.offsetHeight - eCellBottomCover.offsetHeight - 19.5) + 'px';
}

function startSimulatedDrag() {
    clearInterval(dragInterval);
    clearInterval(moveInterval);
    dragInterval = setInterval(() => { simulateRandomDragOnce() }, 3000);
}

function stopSimulatedDrag() {
    clearInterval(dragInterval);
    clearInterval(moveInterval);
    clearTimeout(populationTimeout);
}

function simulateRandomDragOnce() {
    let maxWidth = window.innerWidth - (lens.offsetWidth + borderSize)
    let maxHeight = window.innerHeight - (lens.offsetHeight + borderSize)
    let minWidth = borderSize;
    let minHeight = borderSize;
    let randomX = Math.max(Math.random() * maxWidth, minWidth)
    let randomY = Math.max(Math.random() * maxHeight, minHeight)
    simulateDrag(lens, randomX, randomY, dragTime);
}

let modeToggle = false;
WCell.onclick = (e) => {

    blinkers.style.visibility = 'hidden';
    blinkers.style.animation = 'none';
    bigCells();
    cycleThroughModeText();


    if (modeToggle) { //TREKKER MODE
        modeHeader.innerHTML = "Trekker"
        for (let cell of cells) {
            cell.classList.add('trekker-cell');
            cell.classList.remove('browser-cell');
            cell.style.fontFamily = 'Stainless';
        }
        if (cellToggle) {
            ECell.style.backgroundColor = 'grey';
        }
        for (let part of eCellParts) {
            part.classList.add('trekker-part');
            part.classList.remove('browser-part');
        }
        for (let corner of eCellCorners) {
            corner.classList.add('trekker-corner');
            corner.classList.remove('browser-corner');
        }
        modeBody.classList.add('trekker-mode-body');
        modeBody.classList.remove('browser-mode-body');

        modeTextArray = trekkerTextArray
        stopSimulatedDrag();
        dragElement(lens);
        lens.classList.add('grabbable');
    } else { //BROWSER MODE
        modeHeader.innerHTML = "Browser"
        for (let cell of cells) {
            cell.classList.add('browser-cell');
            cell.classList.remove('trekker-cell');
            cell.style.fontFamily = 'Dispatch';
        }
        if (cellToggle) {
            ECell.style.backgroundColor = 'darkkhaki';
        }
        for (let part of eCellParts) {
            part.classList.add('browser-part');
            part.classList.remove('trekker-part');
        }
        for (let corner of eCellCorners) {
            corner.classList.add('browser-corner');
            corner.classList.remove('trekker-corner');
        }
        modeBody.classList.add('browser-mode-body');
        modeBody.classList.remove('trekker-mode-body');
        modeTextArray = browserTextArray
        startSimulatedDrag();
        simulateRandomDragOnce();
        clearDragElement(lens);
        lens.classList.remove('grabbable');
    }
    modeToggle = !modeToggle;
}


let cellToggle = true;

NCell.onclick = (e) => {
    for (let cell of cells) {
        cell.style.transition = '0.1s';
    }
    hideAbout();

    if (cellToggle) {
        stopSimulatedDrag();
        clearInterval(modeTextInterval);
        if(modeToggle){
            ECell.style.backgroundColor = 'darkkhaki';
        } else {
            ECell.style.backgroundColor = 'grey';
        }

        smallCells();
    } else {
        bigCells();
        setCoverWidth();
        cycleThroughModeText();
        setTimeout(() => {
            if(modeToggle){
                startSimulatedDrag();
                simulateRandomDragOnce();
                ECell.style.backgroundColor = 'transparent';
            }
        }, 500)
    }

}

function smallCells() {
    for (let cell of cells) {
        cell.classList.add('small-cell')
        cell.style.width = "100px"
        cell.style.height = "100px"
        cell.style.fontSize = smallFontSize + 'px';
        cell.style["font-variation-settings"] = `'wght' ${400} , 'wdth' ${100}`;
    }
    if (parseInt(SCell.style.left) < 250) {
        SCell.style.left = '250px';
    }
    if (parseInt(ECell.style.top) < 100) {
        ECell.style.top = '100px';
    }
    cellToggle = false;
}

function bigCells() {

    for (let cell of cells) {
        cell.classList.remove('small-cell');
    }
    setCellDimensions();

    setTimeout(() => {
        setCoverWidth();
        ECell.style.backgroundColor = 'transparent';
    }, 100);
    cellToggle = true;
}

let aboutToggle = false;
SCell.onclick = (e) => {
    stopSimulatedDrag();
    if (aboutToggle) {
        if (cellToggle) { // big cell
            hideAbout();
            if(modeToggle){
                startSimulatedDrag();
                simulateRandomDragOnce();
            }
        } else { //small cell
            SCell.style.height = '100px'
            SCell.style.width = '100px'
            hideAbout();
        }
        
    } else {
        if (cellToggle) { //big cell
            if (Math.abs(lens.offsetTop - 100) < 50) {
                showAbout();
            } else {
                simulateDrag(lens, lens.offsetLeft, 100, 15);
                setTimeout(() => {
                    showAbout();
                }, 500)
            }
        } else { //small cell
            SCell.style.height = window.innerHeight - (100 + lens.offsetHeight) + 'px'
            SCell.style.width = lens.offsetWidth + 'px'
            showAbout();
        }
    }
}

function hideAbout() {
    aboutCover.style.display = 'flex';
    aboutContainer.style.display = 'none';
    aboutToggle = false;
}

function showAbout() {
    stopSimulatedDrag();
    aboutCover.style.display = 'none';
    aboutContainer.style.display = 'flex';
    aboutToggle = true;
}

function setCellDimensions() {
    let bottomHeight = window.innerHeight - (lens.offsetTop + lens.offsetHeight);
    let eastWidth = window.innerWidth - (lens.offsetLeft + lens.offsetWidth);
    let typeWeight = scale(lens.offsetTop, minHeight, maxHeight, 1000, 100);
    let actualMinFontSize = scale(typeWeight, 100, 1000, minFontSizeMax, minFontSize);

    let NMaxFontSize = scale(lens.offsetTop, minHeight, maxHeight, maxFontSize, maxFontSizeMax);
    let SMaxFontSize = scale(bottomHeight, minHeight, maxHeight, maxFontSize, maxFontSizeMax);

    //NW CELL
    NWCell.style.top = '0px';
    NWCell.style.left = '0px';
    NWCell.style.width = lens.offsetLeft + 'px';
    NWCell.style.height = lens.offsetTop + 'px';

    NWCell.style.fontSize = scale(lens.offsetLeft, minWidth, maxWidth, actualMinFontSize, NMaxFontSize) + 'px';
    let NWCellWordLength = NWCell.innerHTML.length;
    let NWTypeWidth = scale(lens.offsetLeft, minWidth, maxWidth, 50, 200);
    NWTypeWidth = NWTypeWidth - (NWCellWordLength * 10);
    NWCell.style["font-variation-settings"] = `'wght' ${typeWeight} , 'wdth' ${NWTypeWidth}`;

    //N CELL
    NCell.style.top = '0px';
    NCell.style.left = lens.offsetLeft + 'px';
    NCell.style.width = lensWidth;
    NCell.style.height = lens.offsetTop + 'px';

    //NE CELL
    NECell.style.top = '0px';
    NECell.style.right = '0px';
    NECell.style.width = eastWidth + 'px';
    NECell.style.height = lens.offsetTop + 'px';

    NECell.style.fontSize = scale(eastWidth, minWidth, maxWidth, actualMinFontSize, NMaxFontSize) + 'px';
    let NECellWordLength = NECell.innerHTML.length;
    let NETypeWidth = scale(eastWidth, minWidth, maxWidth, 50, 200);
    NETypeWidth = NETypeWidth - (NECellWordLength * 10);
    NECell.style["font-variation-settings"] = `'wght' ${typeWeight} , 'wdth' ${NETypeWidth}`;

    //W CELL
    WCell.style.top = lens.offsetTop + 'px';
    WCell.style.left = '0px';
    WCell.style.width = lens.offsetLeft + 'px';
    WCell.style.height = lensHeight;

    //E CELL
    ECell.style.top = lens.offsetTop + 'px';
    ECell.style.right = '0px';
    ECell.style.width = eastWidth + 'px';
    ECell.style.height = lensHeight;

    //SW CELL
    SWCell.style.bottom = '0px';
    SWCell.style.left = '0px';
    SWCell.style.width = lens.offsetLeft + 'px';
    SWCell.style.height = bottomHeight + 'px';

    SWCell.style.fontSize = scale(lens.offsetLeft, minWidth, maxWidth, actualMinFontSize, SMaxFontSize) + 'px';
    let SWCellWordLength = SWCell.innerHTML.length;
    let SWTypeWidth = scale(lens.offsetLeft, minWidth, maxWidth, 50, 200);
    SWTypeWidth = SWTypeWidth - (SWCellWordLength * 10);
    SWCell.style["font-variation-settings"] = `'wght' ${typeWeight} , 'wdth' ${SWTypeWidth}`;

    //S CELL
    SCell.style.bottom = '0px';
    SCell.style.left = lens.offsetLeft + 'px';
    SCell.style.width = lensWidth;
    SCell.style.height = bottomHeight + 'px';

    //SE CELL
    SECell.style.bottom = '0px';
    SECell.style.right = '0px';
    SECell.style.width = eastWidth + 'px';
    SECell.style.height = bottomHeight + 'px';

    SECell.style.fontSize = scale(eastWidth, minWidth, maxWidth,  actualMinFontSize, SMaxFontSize) + 'px';
    let SECellWordLength = SECell.innerHTML.length;
    let SETypeWidth = scale(eastWidth, minWidth, maxWidth, 50, 200);
    SETypeWidth = SETypeWidth - (SECellWordLength * 10);
    SECell.style["font-variation-settings"] = `'wght' ${typeWeight} , 'wdth' ${SETypeWidth}`;

    setCoverWidth();
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


        cycleThroughModeText();


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
        eCellLeftCover.style.transition = 'none';
        eCellRightCover.style.transition = 'none';
        blinkers.style.visibility = 'hidden';
        blinkers.style.animation = 'none';

    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        if ((elmnt.offsetTop - pos2) > borderSize && (elmnt.offsetTop - pos2 + lens.offsetHeight) < (window.innerHeight - borderSize)) {
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        }
        if ((elmnt.offsetLeft - pos1) > borderSize && (elmnt.offsetLeft - pos1 + lens.offsetWidth) < (window.innerWidth - borderSize)) {
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
        setCellText();
        setCellDimensions();
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        let overlappingBlocks = getOverlappingBlocks(elmnt.style.top, elmnt.style.left);
        slowlyPopulateBlocks(overlappingBlocks);
        eCellLeftCover.style.transition = 'width 0.1s';
        eCellRightCover.style.transition = 'width 0.1s';
    }
}

function clearDragElement(elmnt) {
    elmnt.onmousedown = null;
    document.onmouseup = null;
    document.onmousemove = null;
}

function simulateDrag(elmnt, Xpos, Ypos, numFrames) {
    hitPlayer.start();

    for (let cell of cells) {
        cell.style.transition = 'none';
    }

    clearInterval(modeTextInterval);

    eCellLeftCover.style.transition = 'none';
    eCellRightCover.style.transition = 'none';
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0

    var deltaX = Xpos - parseInt(elmnt.offsetLeft)
    var deltaY = Ypos - parseInt(elmnt.offsetTop)

    let Xacc = 0;
    let Yacc = 0;
    let frame = 0;
    moveInterval = setInterval(() => {
        setCellText();

        pos1 = pos3 - Xacc
        pos2 = pos4 - Yacc
        pos3 = Xacc
        pos4 = Yacc

        if ((elmnt.offsetTop - pos2) > borderSize && (elmnt.offsetTop - pos2 + lens.offsetHeight) < (window.innerHeight - borderSize)) {
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        }
        if ((elmnt.offsetLeft - pos1) > borderSize && (elmnt.offsetLeft - pos1 + lens.offsetWidth) < (window.innerWidth - borderSize)) {
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
            eCellLeftCover.style.transition = 'width 0.1s';
            eCellRightCover.style.transition = 'width 0.1s';
            cycleThroughModeText();
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
            NWCell.innerHTML = NWTextArray[NWTextIndex++];
            if (NWTextIndex === NWTextArray.length) {
                NWTextIndex = 0;
            }
            currCellIndex++;
            break;
        case 1:
            NECell.innerHTML = NETextArray[NETextIndex++];
            if (NETextIndex === NETextArray.length) {
                NETextIndex = 0;
            }
            currCellIndex++;
            break;
        case 2:
            SECell.innerHTML = SETextArray[SETextIndex++];
            if (SETextIndex === SETextArray.length) {
                SETextIndex = 0;
            }
            currCellIndex++;
            break;
        case 3:
            SWCell.innerHTML = SWTextArray[SWTextIndex++];
            if (SWTextIndex === SWTextArray.length) {
                SWTextIndex = 0;
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
        el.style.fontFamily = 'DispatchMonoBold';

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
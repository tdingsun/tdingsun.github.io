//objects
const gridContainer = document.getElementById("grid-container");
const lens = document.getElementById('lens');
const blinkers = document.getElementById('blinkers');

const NWCell = document.getElementById('NWCell'), 
    NCell = document.getElementById('NCell'), 
    NECell = document.getElementById('NECell'), 
    WCell = document.getElementById('WCell'),
    ECell = document.getElementById('ECell'),
    SWCell = document.getElementById('SWCell'),
    SCell = document.getElementById('SCell'),
    SECell = document.getElementById('SECell');
const cells = [NWCell, NCell, NECell, WCell, ECell, SWCell, SCell, SECell];
const cornerCells = [NWCell, NECell, SWCell, SECell];
const modeHeader = document.getElementById('mode-header'),
    modeBody = document.getElementById('mode-body'),
    smallModeHeader = document.getElementById('WCell-small-header');

const eCellLeftCover = document.getElementById('left-cover'),
    eCellRightCover = document.getElementById('right-cover'),
    eCellTopCover = document.getElementById('e-cell-dingbat-top'),
    eCellBottomCover = document.getElementById('e-cell-dingbat-bottom'),
    topLeftCorner = document.getElementById('curved-corner-topleft'),
    topRightCorner = document.getElementById('curved-corner-topright'),
    bottomLeftCorner = document.getElementById('curved-corner-bottomleft'),
    bottomRightCorner = document.getElementById('curved-corner-bottomright');
const eCellParts = [eCellLeftCover, eCellRightCover, eCellTopCover, eCellBottomCover];
const eCellCorners = [topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner];

const aboutContainer = document.getElementById('about-container');
const aboutCover = document.getElementById('about-cover');

const NCellSmallCover = document.getElementById('NCell-small');
const SCellSmallCover = document.getElementById('SCell-small');
const ECellSmallCover = document.getElementById('ECell-small');
const WCellSmallCover = document.getElementById('WCell-small');
const smallCellCovers = [NCellSmallCover, SCellSmallCover, ECellSmallCover, WCellSmallCover]

const stainlessTitle = document.getElementById('stainless-title');
const dispatchTitle = document.getElementById('dispatch-title');

//grid parameter setup
const borderSize = 100;
let blockSize = window.innerWidth > 1200 ? 20 : 16;

const rowSize = Math.ceil(window.innerWidth / blockSize);
const colSize = Math.ceil(window.innerHeight / blockSize);
const lensWidthInBlocks = Math.floor(parseInt(document.getElementById("lens").offsetWidth) / blockSize);
const lensHeightInBlocks = Math.floor(parseInt(document.getElementById("lens").offsetHeight) / blockSize);

const minTypeWeight = 100, 
    maxTypeWeight = 1000,
    minTypeWidth = 50,
    maxTypeWidth = 200;

// timeouts and intervals
let populationTimeout;
const populationSpeed = 20;
let dragInterval;
const dragTime = 24; //in frames at 24 fps, e.g 48 = 2 seconds
const dragIntervalTime = 3000; //each simulated drag takes 3 seconds
let moveInterval;

//dimensions calculations
const minWidth = borderSize,
    maxWidth = window.innerWidth - (lens.offsetWidth + borderSize),
    minHeight = borderSize,
    maxHeight = window.innerHeight - (lens.offsetHeight + borderSize);

const maxFontSizeMax = maxWidth / 7, 
    maxFontSize = Math.min(80, maxFontSizeMax),
    minFontSize = 18,
    minFontSizeMax = 32;

//texts
const backgroundText = "stillness∙&∙flow∙&∙money∙&∙debt∙&∙islands∙&∙continents∙&∙figure∙&∙ground∙&∙wave∙&∙particle∙&∙loss∙&∙gain∙&∙interpolation∙&∙extrapolation∙&∙synthesis∙&∙fragmenting∙&∙clustering∙&∙infinity∙&∙singularity∙&∙branch∙&∙root∙&∙question∙&∙answer∙&∙inside∙&∙outside∙&∙silver∙&∙gold∙&∙space∙&∙time∙&∙life∙&∙death∙&∙day∙&∙night∙&∙need∙&∙want∙&∙map∙&∙territory∙&∙wander∙&∙wonder∙&∙node∙&∙edge∙&∙sowing∙&∙reaping∙&∙growth∙&∙rot∙&∙wake∙&∙dream∙&∙reality∙&∙illusion∙&∙conscious∙&∙unconscious∙&∙nature∙&∙culture∙&∙binary∙&∙field∙&∙loop∙&∙knot∙&∙volcano∙&∙glacier∙&∙grassy∙&∙knoll∙&∙tears∙&∙sweat∙&∙language∙&∙aesthetics∙&∙aether∙&∙earth∙&∙mender∙&∙trekker∙&∙browser∙&∙innocence∙&∙guilt∙&∙dexter∙&∙sinister∙&∙immanence∙&∙transcendence∙&∙biome∙&∙strata∙&∙cloud∙&∙wave∙&∙plastic∙&∙petroleum∙&∙shell∙&∙pebble∙&∙grass∙&∙stain∙&∙numbers∙&∙letters∙&∙palm∙&∙heart∙&∙daylight∙&∙flowers∙&∙spectra∙&∙specimen∙&∙stereotype∙&∙archetype∙&∙heuristic∙&∙dogma∙&∙continuous∙&∙discrete∙&∙angel∙&∙layer∙&∙slient∙&∙error∙&∙perfect∙&∙mirror∙&∙reality∙&∙tunnel∙&∙gravity∙&∙cryptid∙&∙prose∙&∙poetry∙&∙memory∙&∙paralysis∙&∙everything∙changes∙&∙everything∙stays∙the∙same∙"
const backgroundTextArray = backgroundText.split(" ");

const trekkerWords = "Stillness Flow Islands Continents Branch Root Day Night Map Territory Wander Wonder Sowing Reaping Growth Rot Nature Culture Binary Field Volcano Glacier Grassy Knoll Tears Sweat Aether Earth Biome Bloom Strata Cloud Wave Plastic Petroleum Shell Pebble Grass Stain Palm Heart Daylight Flowers Callus Tissue Pollen Plateau Sand Stone Algae Clay Ceramic Lava Magma Collagen Lithograph Etch Pillow Pumice Raft Froth Crystal Ripple Shale Tectonic Pond Mucus Redux Magnetic Metallurgy Halcyon Log Mist Bone Rainwater Cypress Tobacco Moss Dew Salve Lichen Sediment Sentiment Caldera Lake Geosmin Geode Thermal Gravity Cryptid Zygote Ozone Igneous Dune Quartz Flint Gneiss Gravel Protolith Mineral Floe Crust Basin Oxide Artifact Petrol Basalt Reservoir Mercury Sulphur Carbon Marine Granite Critter Heliotrope Titanium Boulder Anchor Approach Gear Crux Flash Swamp Smear Zipper Shelter Ridge Ravine Canyon Trail"
let trekkerWordArray = shuffle(trekkerWords.split(" "));
let trekkerWordIndex = 0;

const browserWords = "Figure Ground Money Debt Wave Particle Loss Gain Interpolation Extrapolation Synthesis Analysis Fragmenting Clustering Infinity Singularity Question Answer Inside Outside Silver Gold Space Time Life Death Need Want Node Edge Wake Dream Reality Illusion Conscious Unconscious Loop Knot Language Aesthetics Mender Innocence Guilt Dexter Sinister Immanence Transcendence Numbers Letters Bounce Message Silent Error Angel Layer Radar Shrine Residue Ratio Flat Bumpy Pixel Brush Future State Stimuli Luck Perfect Mirror Dust Page Plastic Mythology Dead Chemistry Taxonomy Category Theory Light Leak Powder Diffraction Clear Eyes Ephemera Panacea Mote Vinegar Log Capacity Container Sermon Stack Mildew Geology Geography Geometry Geomancy Oracle Taxonomy Tautology Equinox Solstice Continuous Discrete Prose Legend Spine Gutter Software Fuzzy Logic Zoology Botany Geophagy Terrestrial Chemistry Physics Axiom Episteme Hypothesis Cryptic Esoteric Physic Technic Spirit Digital Dogma Circuit Locomotion Semantics Pragmatics Grammar Syntax Signal Mimesis Somatic Neurology Reality Tunnel Paradigm Framework Sensorium Repository Archive Memory Mnemonic Field Paralysis Heuristic Dogma Narrative Schema Continuum Concept Function Stereotype Archetype Cognition Script Sublime Prime Duet Melody Archaeology Genesis Bacteria Material Spectra Specimen Rune"
let browserWordArray = shuffle(browserWords.split(" "));
let browserWordIndex = 0;

const trekkerText = "wandering through forests and woods and deserts and fields and plains and mountains and valleys and tundras and taigas and picking up rocks and stones and crystals and ores and geodes and fossils and sticks and bugs and leaves and mushrooms and moss and peat and loam and clay and shells and wading through rivers and lakes and brooks and ponds and oceans and brooks and creeks and everything changes and everything stays the same and"
const trekkerTextArray = trekkerText.split(" ");

const browserText = "wondering about categories and theories and boundaries and dialectics and inputs and outputs and trawling through wikis and lists and indices and documents and records and archives and libraries and shelves and books and pages and paragraphs and sentences and words and traversing down networks and rabbit holes and nodes and graphs and charts and maps and everything changes and everything stays the same and"
const browserTextArray = browserText.split(" ");

let modeTextArray = trekkerTextArray;
let modeTextInterval;

//noise function
noise.seed(Math.random());

//audio
StartAudioContext(Tone.context, 'div').then(function () {
});

const player = new Tone.Player("draft.mp3").toDestination();
player.volume.value = -24;
player.autostart = true;

const hitPlayer = new Tone.Player('hit.m4a').toDestination();
hitPlayer.volume.value = -24;
hitPlayer.autostart = false;

//toggles 
let modeToggle = false;
let cellToggle = true;
let aboutToggle = false;

//on blur and focus
window.onblur = function () {
    stopSimulatedDrag();
    player.stop();
    hitPlayer.stop();
}

window.onfocus = function () {
    player.start();
    if (modeToggle && cellToggle) {
        startSimulatedDrag();
    }
}

//on resize
window.onresize = function () { location.reload(); }

//on document ready
makeGrid();
setCellDimensions();
dragElement(lens);
for (let cell of cells) {
    cell.classList.add('trekker-cell');
    cell.classList.remove('browser-cell');
}

//mode toggling
WCell.onclick = (e) => {
    removeBlinkers();
    bigCells();
    cycleThroughModeText();
    hideAbout();

    if (modeToggle) { //TREKKER MODE
        modeHeader.innerHTML = "{&nbsp;Trekker Mode&nbsp;}";
        smallModeHeader.innerHTML = "Trekker";
        document.body.style.fontFamily = 'Stainless';
        modeTextArray = trekkerTextArray
        stainlessTitle.classList.add("selected-title");
        dispatchTitle.classList.remove("selected-title");
        for (let cell of cells) {
            cell.classList.add('trekker-cell');
            cell.classList.remove('browser-cell');
        }
        for (let cover of smallCellCovers) {
            cover.style.backgroundColor = 'slategrey'
        }
        if (cellToggle) {
            ECell.style.backgroundColor = 'slategrey';
            
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

        stopSimulatedDrag();
        dragElement(lens);
        lens.classList.add('grabbable');
    } else { //BROWSER MODE
        modeHeader.innerHTML = "{&nbsp;Browser Mode&nbsp;}"
        smallModeHeader.innerHTML = "Browser";
        dispatchTitle.classList.add("selected-title");
        stainlessTitle.classList.remove("selected-title");
        modeTextArray = browserTextArray;
        document.body.style.fontFamily = 'Dispatch';
        for (let cell of cells) {
            cell.classList.add('browser-cell');
            cell.classList.remove('trekker-cell');
        }
        for (let cover of smallCellCovers) {
            cover.style.backgroundColor = 'grey'
        }
        if (cellToggle) {
            ECell.style.backgroundColor = 'grey';
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
        startSimulatedDrag();
        clearDragElement(lens);
        lens.classList.remove('grabbable');
    }
    modeToggle = !modeToggle;
}

//big cell / small cell toggling
NCell.onclick = (e) => {
    for (let cell of cells) {
        cell.style.transition = '0.1s';
    }
    hideAbout();

    if (cellToggle) {
        stopSimulatedDrag();
        clearInterval(modeTextInterval);
        ECell.style.backgroundColor = modeToggle ? 'grey' : 'slategrey';
        smallCells();
    } else {
        bigCells();
        setCoverWidth();
        cycleThroughModeText();
        setTimeout(() => {
            if (modeToggle) {
                startSimulatedDrag();
                ECell.style.backgroundColor = 'transparent';
            }
        }, 500)
    }
}

//about section toggling
SCell.onclick = (e) => {
    stopSimulatedDrag();
    if (aboutToggle) { //hide about
        if (cellToggle) { // big cell
            hideAbout();
            if (modeToggle) {
                startSimulatedDrag();
            }
        } else { //small cell
            SCell.classList.remove('about-expanded');
            hideAbout();
        }

    } else { //show about
        if (cellToggle) { //big cell
            if (Math.abs(lens.offsetTop - borderSize) < 50) {
                showAbout();
            } else {
                simulateDrag(lens, lens.offsetLeft, borderSize, 10);
                setTimeout(() => {
                    showAbout();
                }, 500)
            }
        } else { //small cell
            SCell.classList.add('about-expanded');
            showAbout();
        }
    }
}

function smallCells() {
    for (let cell of cells) {
        cell.classList.add('small-cell');
    }
    for (let cover of smallCellCovers) {
        cover.style.visibility = 'visible';
    }
    cellToggle = false;
}

function bigCells() {
    for (let cell of cells) {
        cell.classList.remove('small-cell');
    }
    for (let cover of smallCellCovers) {
        cover.style.visibility = 'hidden';
    }
    setCellDimensions();
    setTimeout(() => {
        setCoverWidth();
        ECell.style.backgroundColor = 'transparent';
    }, 100);
    cellToggle = true;
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

//E cell stuff
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
    let coverWidth = Math.max((ECell.offsetWidth - modeBody.offsetWidth - 40) / 2, 0) + 'px';
    let bottomCornerTop = (ECell.offsetHeight - eCellBottomCover.offsetHeight - 19.5) + 'px';
    let topCornerTop = (eCellTopCover.offsetHeight - 0.5) + 'px';
    eCellLeftCover.style.width = coverWidth;
    eCellRightCover.style.width = coverWidth;
    topLeftCorner.style.top = topCornerTop;
    topRightCorner.style.top = topCornerTop;
    bottomLeftCorner.style.top = bottomCornerTop;
    bottomRightCorner.style.top = bottomCornerTop;
}

//auto drag
function startSimulatedDrag() {
    hideAbout();
    stopSimulatedDrag()
    simulateRandomDragOnce()
    dragInterval = setInterval(simulateRandomDragOnce, dragIntervalTime);
}

function stopSimulatedDrag() {
    clearInterval(dragInterval);
    clearInterval(moveInterval);
    clearTimeout(populationTimeout);
}

function simulateRandomDragOnce() {
    let randomX = scale(Math.random(), 0, 1, minWidth, maxWidth);
    randomX = Math.ceil(Math.round(randomX)/blockSize) * blockSize - (blockSize/2);

    let randomY = scale(Math.random(), 0, 1, minHeight, maxHeight);
    randomY = Math.ceil(Math.round(randomY)/blockSize) * blockSize - (blockSize/2);
    simulateDrag(lens, randomX, randomY, dragTime);
}

//manual drag
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

        removeBlinkers();
        stopSimulatedDrag();
        hideAbout();
        bigCells();
        cycleThroughModeText();

        clearTimeout(populationTimeout);
        for (let cell of cells) {
            cell.style.transition = 'none';
        }
        eCellLeftCover.style.transition = 'none';
        eCellRightCover.style.transition = 'none';
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
        let overlappingBlocks = getOverlappingBlocks(elmnt.offsetTop, elmnt.offsetLeft);
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
    clearInterval(modeTextInterval);

    hitPlayer.start();

    eCellLeftCover.style.transition = 'none';
    eCellRightCover.style.transition = 'none';
    for (let cell of cells) {
        cell.style.transition = 'none';
    }

    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0, Xacc = 0, Yacc = 0, frame = 0;
    var deltaX = Xpos - parseInt(elmnt.offsetLeft);
    var deltaY = Ypos - parseInt(elmnt.offsetTop);
    moveInterval = setInterval(() => {

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

        setCellText();
        setCellDimensions();

        Xacc = deltaX * easeInOutQuad(frame / numFrames);
        Yacc = deltaY * easeOutCubic(frame / numFrames);
        frame++

        if (frame >= numFrames) {
            clearInterval(moveInterval)
            slowlyPopulateBlocks(getOverlappingBlocks(elmnt.offsetTop, elmnt.offsetLeft));
            eCellLeftCover.style.transition = 'width 0.1s';
            eCellRightCover.style.transition = 'width 0.1s';
            cycleThroughModeText();
        }
    }, 42)
}

function slowlyPopulateBlocks(overlappingBlocks) {
    overlappingBlocks = shuffle(overlappingBlocks);
    populateBlockLoop(overlappingBlocks, 0);
}

function populateBlockLoop(blocksArray, id) {
    setGridText(blocksArray[id]);
    if (id < blocksArray.length - 1) {
        populationTimeout = setTimeout(populateBlockLoop, populationSpeed, blocksArray, id + 1);
    }
}

//text setters
let currCellIndex = 0;
function setCellText() {
    let currCell = cornerCells[currCellIndex];
    currCell.innerHTML = modeToggle ? browserWordArray[browserWordIndex++] : trekkerWordArray[trekkerWordIndex++];
    currCellIndex = currCellIndex === 3 ? 0 : currCellIndex + 1
    if (trekkerWordIndex === trekkerWordArray.length) {
        trekkerWordIndex = 0;
        trekkerWordArray = shuffle(trekkerWordArray)
    }
    if (browserWordIndex === browserWordArray.length) {
        browserWordIndex = 0;
        browserWordArray = shuffle(browserWordArray)
    }
}

function setGridText(id) {
    let block = document.getElementById(id);
    let i = id % rowSize;
    let j = Math.floor(id / colSize);
    let val = combinedSimplex(i, j);
    let wght = scale(val, -1, 1, minTypeWeight, maxTypeWeight);
    let wdth = scale(val, -1, 1, minTypeWidth, maxTypeWidth);

    block.innerHTML = Math.random() > 0.1 ? backgroundText[id % backgroundText.length] : "";

    let colorVar = scale(val, -1.25, 1.25, 0, 150);
    if (val > 0) { //land colors
        block.style["font-variation-settings"] = `'wght' ${wght} , 'wdth' ${wdth}`;
        block.style.color = `rgb(${colorVar * 1.2}, ${colorVar + 50}, 50)`
        block.innerHTML = block.innerHTML.toUpperCase();
    } else { // ocean colors
        block.style["font-variation-settings"] = `'wght' ${wght} , 'wdth' ${wdth}`;
        block.style.color = `rgb(${colorVar * 0.8}, ${colorVar * 1.2 + 60}, 255)`
    }
}

//helper functions
function setCellDimensions() {
    let bottomHeight = window.innerHeight - (lens.offsetTop + lens.offsetHeight);
    let eastWidth = window.innerWidth - (lens.offsetLeft + lens.offsetWidth);
    let typeWeight = scale(lens.offsetTop, minHeight, maxHeight, maxTypeWeight, minTypeWeight);
    let actualMinFontSize = scale(typeWeight, minTypeWeight, maxTypeWeight, minFontSizeMax, minFontSize);
    let NMaxFontSize = scale(lens.offsetTop, minHeight, maxHeight, maxFontSize, maxFontSizeMax);
    let SMaxFontSize = scale(bottomHeight, minHeight, maxHeight, maxFontSize, maxFontSizeMax);
    let WTypeWidth = scale(lens.offsetLeft, minWidth, maxWidth, minTypeWidth, maxTypeWidth);
    let ETypeWidth = scale(eastWidth, minWidth, maxWidth, minTypeWidth, maxTypeWidth);

    //NW CELL
    NWCell.style.width = lens.offsetLeft + 'px';
    NWCell.style.height = lens.offsetTop + 'px';
    NWCell.style.fontSize = scale(lens.offsetLeft, minWidth, maxWidth, actualMinFontSize, NMaxFontSize) + 'px';
    let NWTypeWidth = WTypeWidth - (NWCell.innerHTML.length * 10);
    console.log(WTypeWidth);
    console.log(NWTypeWidth);
    NWCell.style["font-variation-settings"] = `'wght' ${typeWeight} , 'wdth' ${NWTypeWidth}`;

    //N CELL
    NCell.style.left = lens.offsetLeft + 'px';
    NCell.style.height = lens.offsetTop + 'px';

    //NE CELL
    NECell.style.width = eastWidth + 'px';
    NECell.style.height = lens.offsetTop + 'px';
    NECell.style.fontSize = scale(eastWidth, minWidth, maxWidth, actualMinFontSize, NMaxFontSize) + 'px';
    let NETypeWidth = ETypeWidth - (NECell.innerHTML.length * 10);
    NECell.style["font-variation-settings"] = `'wght' ${typeWeight} , 'wdth' ${NETypeWidth}`;

    //W CELL
    WCell.style.top = lens.offsetTop + 'px';
    WCell.style.width = lens.offsetLeft + 'px';

    //E CELL
    ECell.style.top = lens.offsetTop + 'px';
    ECell.style.width = eastWidth + 'px';

    //SW CELL
    SWCell.style.width = lens.offsetLeft + 'px';
    SWCell.style.height = bottomHeight + 'px';
    SWCell.style.fontSize = scale(lens.offsetLeft, minWidth, maxWidth, actualMinFontSize, SMaxFontSize) + 'px';
    let SWTypeWidth = WTypeWidth - (SWCell.innerHTML.length * 10);
    SWCell.style["font-variation-settings"] = `'wght' ${typeWeight} , 'wdth' ${SWTypeWidth}`;

    //S CELL
    SCell.style.left = lens.offsetLeft + 'px';
    SCell.style.height = bottomHeight + 'px';

    //SE CELL
    SECell.style.width = eastWidth + 'px';
    SECell.style.height = bottomHeight + 'px';
    SECell.style.fontSize = scale(eastWidth, minWidth, maxWidth, actualMinFontSize, SMaxFontSize) + 'px';
    let SETypeWidth = ETypeWidth - (SECell.innerHTML.length * 10);
    SECell.style["font-variation-settings"] = `'wght' ${typeWeight} , 'wdth' ${SETypeWidth}`;

    setCoverWidth();
}


function makeGrid() {
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

function combinedSimplex(i, j) {
    return (noise.simplex2(i / 32, j / 32) + (noise.simplex2(i / 4, j / 4) / 2) + (noise.simplex2(i / 2, j / 2) / 2));
}

function getOverlappingBlocks(lensTop, lensLeft) {
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

function removeBlinkers() {
    blinkers.style.visibility = 'hidden';
    blinkers.style.animation = 'none';
}

function scale(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
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

function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
}

function easeInOutQuad(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}
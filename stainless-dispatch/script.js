let blockSize = 20;
let windowWidth = $(window).innerWidth();
let windowHeight = $(window).innerHeight();
let rowSize = Math.ceil(windowWidth / blockSize);
let colSize = Math.ceil(windowHeight / blockSize);

let lensWidthInBlocks = Math.floor(parseInt(document.getElementById("lens").offsetWidth) / blockSize);
let lensHeightInBlocks = Math.floor(parseInt(document.getElementById("lens").offsetHeight) / blockSize);

let populationTimeout;
let populationSpeed = 1;
noise.seed(Math.random());

// const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const characters = "EARTHearth"

const NText = "Jock Simulacra Waistband Mannequin Pixel Brush Pounding Beat Unexpected Offer New Touch Hard Carry Spiteful Servitude Sword Option Side Saddle Magic Eye Callus Tissue Boundless Optimism Future State Girl Crush Endgame Earths Shadow Determined Shape Bounce Message Silent Error";
const NTextArray = shuffle(NText.split(" "));
let NTextIndex = 0;

const WText = "Jock Simulacra Waistband Mannequin Pixel Brush Pounding Beat Unexpected Offer New Touch Hard Carry Spiteful Servitude Sword Option Side Saddle Magic Eye Callus Tissue Boundless Optimism Future State Girl Crush Endgame Earths Shadow Determined Shape Bounce Message Silent Error";
const WTextArray = shuffle(NText.split(" "));
let WTextIndex = 0;

const EText = "Jock Simulacra Waistband Mannequin Pixel Brush Pounding Beat Unexpected Offer New Touch Hard Carry Spiteful Servitude Sword Option Side Saddle Magic Eye Callus Tissue Boundless Optimism Future State Girl Crush Endgame Earths Shadow Determined Shape Bounce Message Silent Error";
const ETextArray = shuffle(NText.split(" "));
let ETextIndex = 0;

const SText = "Jock Simulacra Waistband Mannequin Pixel Brush Pounding Beat Unexpected Offer New Touch Hard Carry Spiteful Servitude Sword Option Side Saddle Magic Eye Callus Tissue Boundless Optimism Future State Girl Crush Endgame Earths Shadow Determined Shape Bounce Message Silent Error";
const STextArray = shuffle(NText.split(" "));
let STextIndex = 0;

let currCellIndex = 0;

let maxFontSize = 50;
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

$(document).ready(() => {
    makeGrid();
    setCellDimensions();
    dragElement(lens);
})

$('#SECell').hover((e) => {
    console.log('over');
    e.target.innerHTML = "About the Typefaces"
}, (e) => {
    console.log('out');
    e.target.innerHTML = "Stainless / Dispatch"

})

let cellToggle = true;
$('#NWCell').click((e) => {
    if(cellToggle) {
        const smallFontSize = '16px';
        for(let cell of cells){
            cell.className = 'smallCell'
            cell.style.width = '100px';
            cell.style.height = '100px';
            cell.style.fontSize = smallFontSize;
        }
        // NWCell.style.width = "50px"
        // NWCell.style.height = "50px"
        // NWCell.className = "smallCell"
        // NWCell.style.fontSize = smallFontSize
        // NWCell.className = "smallCell"

        // NCell.style.width = "50px"
        // NCell.style.height = "50px"
        // NCell.style.fontSize = smallFontSize
        // NCell.className = "smallCell"


        // NECell.style.width = "50px"
        // NECell.style.height = "50px"
        // NECell.style.fontSize = smallFontSize

        // WCell.style.width = "50px"
        // WCell.style.height = "50px"
        // WCell.style.fontSize = smallFontSize

        // ECell.style.width = "50px"
        // ECell.style.height = "50px"
        // ECell.style.fontSize = smallFontSize

        // SWCell.style.width = "50px"
        // SWCell.style.height = "50px"
        // SWCell.style.fontSize = smallFontSize

        // SCell.style.width = "50px"
        // SCell.style.height = "50px"
        // SCell.style.fontSize = smallFontSize

        // SECell.style.width = "50px"
        // SECell.style.height = "50px"
        // SECell.style.fontSize = smallFontSize

    } else {

        setCellDimensions()
        for(let cell of cells){
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

        for(let cell of cells){
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

        if((elmnt.offsetTop - pos2) > 40 && (elmnt.offsetTop - pos2 + lens.offsetHeight) < (windowHeight - 40)) {
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        }
        if((elmnt.offsetLeft - pos1) > 40 && (elmnt.offsetLeft - pos1 + lens.offsetWidth) < (windowWidth - 40)) {
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
        setCellDimensions();

    }

    function closeDragElement() {
        for(let cell of cells){
            cell.style.transition = '0.1s';
        }
        document.onmouseup = null;
        document.onmousemove = null;
        let overlappingBlocks = getOverlappingBlocks(elmnt.style.top, elmnt.style.left);
        slowlyPopulateBlocks(overlappingBlocks);
        
    }
}

function slowlyPopulateBlocks(overlappingBlocks) {
    overlappingBlocks = shuffle(overlappingBlocks);
    populateBlockLoop(overlappingBlocks, 0);
}

function populateBlockLoop(blocksArray, id) {
    setText(blocksArray[id]);
    setCellText();
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
    if (el === null) {
        console.log(id);
    }
    let i = id % rowSize;
    let j = Math.floor(id / colSize);
    let val = noise.simplex2(i / 10, j / 10);
    let wght = scale(val, -1, 1, 100, 1000);
    let wdth = scale(val, -1, 1, 50, 200);
    // let ital = scale(val, -1, 1, 0, 1);
    let ital = 0;
    let xhgt = scale(val, -1, 1, 0, 100);


    el.style["font-variation-settings"] = `'wght' ${wght} , 'wdth' ${wdth}, 'ital' ${ital}, 'xhgt' ${xhgt}`;
    let colorVar = scale(val, -1, 1, 0, 150);
    el.style.color = `rgb(${colorVar * 0.8}, ${colorVar * 1.2 + 60}, 255)`
    el.style.backgroundColor = 'transparent'
    if (val > 0) { //land colors
        el.style.color = `rgb(${colorVar * 1.2}, ${colorVar + 50}, 50)`
        // el.style.backgroundColor = 'cornsilk'
    }
    el.innerHTML = getRandomCharacter();
}

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
    for (let i = lensTopInBlocks; i < lensTopInBlocks + lensHeightInBlocks; i++) {
        for (let j = lensLeftInBlocks; j < lensLeftInBlocks + lensWidthInBlocks; j++) {
            OverlappingBlockIds.push((i * rowSize) + j);
        }
    }
    return OverlappingBlockIds
}


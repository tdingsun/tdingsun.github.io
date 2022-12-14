//objects
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
const modeHeader = document.getElementById('mode-header'),
    modeBody = document.getElementById('mode-body')

const eCellLeftCover = document.getElementById('left-cover'),
    eCellRightCover = document.getElementById('right-cover'),
    eCellTopCover = document.getElementById('e-cell-dingbat-top'),
    eCellBottomCover = document.getElementById('e-cell-dingbat-bottom'),
    topLeftCorner = document.getElementById('curved-corner-topleft'),
    topRightCorner = document.getElementById('curved-corner-topright'),
    bottomLeftCorner = document.getElementById('curved-corner-bottomleft'),
    bottomRightCorner = document.getElementById('curved-corner-bottomright');
const eCovers = [eCellBottomCover, eCellLeftCover, eCellRightCover, eCellTopCover];
const eCorners = [topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner];
const aboutContainer = document.getElementById('about-container');
const aboutCover = document.getElementById('about-cover');

//texts
const trekkerWords = "Aether Algae Anchor Approach Artifact Ashes Basalt Basin Binary Biome Blaze Bloom Bone Boulder Branch Caldera Callus Campfire Canyon Carbon Ceramic Clay Cloud Collagen Continents Critter Crust Crux Cryptid Crystal Culture Cypress Day Daylight Dew Dune Earth Eon Epoch Etch Field Fire Flash Flint Floe Flow Flowers Fossil Froth Gear Geode Geosmin Glacier Gneiss Granite Grass Grassy Gravel Gravity Growth Halcyon Heart Heliotrope Holocene Igneous Islands Kindling Knoll Lake Lava Lichen Lithograph Log Magma Magnetic Map Marine Mercury Metallurgy Mineral Mist Moss Mucus Nature Night Oxide Ozone Palm Pebble Petrification Petrol Petroleum Pillow Plastic Plateau Pollen Pond Protolith Pseudomorph Pumice Quartz Raft Rainwater Range Ravine Reaping Redux Reservoir Ridge Ripple Root Rot Salve Sand Sediment Sentiment Shale Shell Shelter Smear Smoke Sound Sowing Spiral Stain Stillness Stone Strata Sulphur Swamp Sweat Tears Tectonic Territory Thermal Tissue Titanium Tobacco Trace Trail Trilobite Undercling Volcano Wander Wave Wild Wildfire Wonder Zipper Zygote"
let trekkerWordArray = trekkerWords.split(" ");
let trekkerWordIndex = 0;

const browserWords = "Aesthetics Analysis Angel Answer Archaeology Archetype Archive Axiom Bacteria Botany Bounce Brush Bumpy Capacity Category Chemistry Chemistry Circuit Clear Clustering Cognition Concept Conscious Container Continuous Continuum Cryptic Dead Death Debt Dexter Diffraction Digital Discrete Dogma Dogma Dream Duet Dust Edge Ephemera Episteme Equinox Error Esoteric Extrapolation Eyes Field Figure Flat Fragmenting Framework Function Future Fuzzy Gain Genesis Geography Geology Geomancy Geometry Geophagy Gold Grammar Ground Guilt Gutter Heuristic Hypothesis Illusion Immanence Infinity Innocence Inside Interpolation Inventory Knot Language Layer Leak Legend Letters Life Light Locomotion Log Logic Loop Loss Luck Material Melody Memory Mender Message Mildew Mimesis Mirror Mnemonic Money Mote Mythology Narrative Need Neurology Node Numbers Oracle Outside Page Panacea Paradigm Paralysis Particle Perfect Physic Physics Pixel Plastic Powder Pragmatics Prime Prose Question Radar Radio Ratio Reality Reality Report Repository Residue Rune Schema Script Semantics Sensorium Sermon Shrine Signal Silent Silver Singularity Sinister Software Solstice Somatic Space Specimen Spectra Spine Spirit Stack State Stereotype Stimuli Sublime Syntax Synthesis Tautology Taxonomy Taxonomy Technic Terrestrial Theory Time Transcendence Tunnel Unconscious Vinegar Wake Want Wave Zoology"
let browserWordArray = browserWords.split(" ");
let browserWordIndex = 0;

const trekkerText = "the fire lookout, taking measurements with tools and devices of stainless steel, sends out dispatches by phone or radio. To wander is to wonder. Wandering through forests and woods and deserts and fields and plains and mountains and valleys and tundras and taigas and picking up rocks and stones and crystals and ores and geodes and fossils and sticks and bugs and leaves and mushrooms and moss and peat and loam and clay and shells and wading through rivers and lakes and brooks and ponds and oceans and brooks and creeks and knowledge that subdivides like the branches of a tree- differentiation, categorization, and minutia, the fire lookout making those little observations and everything changes and everything stays the same and"
const trekkerTextArray = trekkerText.split(" ");

const browserText = "the fire lookout, taking measurements with tools and devices of stainless steel, sends out dispatches by phone or radio. To wander is to wonder. Wondering about categories and theories and boundaries and dialectics and inputs and outputs and discreteness and continuity and calculus and geometry and trawling through wikis and lists and indices and documents and records and archives and libraries and shelves and books and pages and paragraphs and sentences and words and letters and traversing through dense networks and rabbit holes and nodes and graphs and charts and maps and diagrams and knowledge that traces things to their roots— synthesis, transcendence, and wholeness, the fire lookout making those grand theories and everything changes and everything stays the same and"
const browserTextArray = browserText.split(" ");

let wordIndex = 0;

//toggles 
let modeToggle = false;

//on resize
window.onresize = function () { location.reload(); }

//on document ready
blinkers.remove();
aboutCover.remove();
aboutContainer.style.display = 'flex';
lens.innerHTML = "Best viewed on desktop"
lens.style.display = 'flex';
lens.style.justifyContent = 'center';
lens.style.alignItems = 'center';
lens.style.textAlign = 'center';
lens.style.fontSize = '42px';
lens.style.padding = '10px';
lens.style.lineHeight = '1';
lens.style["font-variation-settings"] = `'wght' 1000, 'wdth' 75`;
modeHeader.style.width = '200%';
modeHeader.style.paddingBottom = '7px';
modeHeader.style.transform = 'rotate(90deg)';

if(Math.random() > 0.5) {
    stainlessStyling();
} else {
    dispatchStyling();
    modeToggle = !modeToggle;
}

setCellDimensions();


let NCellText = document.createElement("div");
let NCellSecondaryText = document.createElement("div");
NCell.style.flexDirection = 'column';
setTimeout(() => {
    NCell.innerHTML = '';
    NCell.append(NCellText)
    NCell.append(NCellSecondaryText)
}, 1000)
setInterval(setTextCycle, 1000);
setInterval(setSecondaryTextCycle, 250);

//mode toggling
WCell.onclick = (e) => {
    if (modeToggle) { //TREKKER MODE
        stainlessStyling();
    } else { //BROWSER MODE
        dispatchStyling();
    }
    modeToggle = !modeToggle;
}

function stainlessStyling() {
    console.log('stainlessStyling');
    modeHeader.innerHTML = "Stainless&nbsp;2";
    document.body.style.fontFamily = 'Stainless';
    for (let cell of cells) {
        cell.classList.add('trekker-cell');
        cell.classList.remove('browser-cell');
    }
    for (let cover of eCovers) {
        cover.classList.add('trekker-part');
        cover.classList.remove('browser-part');
    }
    for (let corner of eCorners) {
        corner.classList.add('trekker-corner')
        corner.classList.remove('browser-corner');
    }
    WCell.style.background = 'linear-gradient(cornflowerblue -150%, slategrey 50%, gainsboro 300%)';
    lens.style.color = 'slategrey';
}

function dispatchStyling() {
    console.log('dispatchStyling');
    modeHeader.innerHTML = "Dispatch&nbsp;2"
    document.body.style.fontFamily = 'Dispatch';
    for (let cell of cells) {
        cell.classList.add('browser-cell');
        cell.classList.remove('trekker-cell');
    }
    for (let cover of eCovers) {
        cover.classList.add('browser-part');
        cover.classList.remove('trekker-part');
    }
    for (let corner of eCorners) {
        corner.classList.add('browser-corner')
        corner.classList.remove('trekker-corner');
    }
    WCell.style.background = 'linear-gradient(gainsboro -150%, grey 50%, yellowgreen 350%)';
    lens.style.color = 'grey';
}

//text setters
function setTextCycle() {
    let word = modeToggle ? browserTextArray[wordIndex++] : trekkerTextArray[wordIndex++];
    NCellText.innerHTML = word;
    typeWeight = scale(word.length, 0, 10, 1000, 100);
    typeWidth = scale(word.length, 0, 10, 200, 50);
    NCellText.style.fontSize = '42px';
    NCellText.style["font-variation-settings"] = `'wght' 1000, 'wdth' ${typeWidth}`;    
    if (wordIndex === trekkerTextArray.length) {
        wordIndex = 0;
    }
}

function setSecondaryTextCycle() {
    let word = modeToggle ? browserWordArray[browserWordIndex++] : trekkerWordArray[trekkerWordIndex++]
    NCellSecondaryText.innerHTML = word;
    if(browserWordIndex === browserWordArray.length) {
        browserWordIndex = 0;
    }
    if(trekkerWordIndex === trekkerWordArray.length) {
        trekkerWordIndex = 0;
    }
}

//helper functions
function setCellDimensions() {
    lens.style.top = '100px'
    let bottomHeight = window.innerHeight - (lens.offsetTop + lens.offsetHeight);
    let eastWidth = window.innerWidth - (lens.offsetLeft + lens.offsetWidth);
    //NW CELL
    NWCell.style.width = lens.offsetLeft + 'px';
    NWCell.style.height = lens.offsetTop + 'px';
    //N CELL
    NCell.style.left = lens.offsetLeft + 'px';
    NCell.style.height = lens.offsetTop + 'px';
    //NE CELL
    NECell.style.width = eastWidth + 'px';
    NECell.style.height = lens.offsetTop + 'px';
    //W CELL
    WCell.style.top = lens.offsetTop + 'px';
    WCell.style.width = lens.offsetLeft + 'px';
    //E CELL
    ECell.style.top = lens.offsetTop + 'px';
    ECell.style.width = eastWidth + 'px';
    //SW CELL
    SWCell.style.width = lens.offsetLeft + 'px';
    SWCell.style.height = bottomHeight + 'px';
     //S CELL
    SCell.style.left = lens.offsetLeft + 'px';
    SCell.style.height = bottomHeight + 'px';
    //SE CELL
    SECell.style.width = eastWidth + 'px';
    SECell.style.height = bottomHeight + 'px';
    setCoverWidth();
}

function setCoverWidth() {
    let coverWidth = Math.max((ECell.offsetWidth - modeBody.offsetWidth - 50) / 2, 0) + 'px';
    let bottomCornerTop = (ECell.offsetHeight - eCellBottomCover.offsetHeight - 25) + 'px';
    let topCornerTop = eCellTopCover.offsetHeight + 'px';
    eCellLeftCover.style.width = coverWidth;
    eCellRightCover.style.width = coverWidth;
    topLeftCorner.style.top = topCornerTop;
    topRightCorner.style.top = topCornerTop;
    bottomLeftCorner.style.top = bottomCornerTop;
    bottomRightCorner.style.top = bottomCornerTop;
}

function scale(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
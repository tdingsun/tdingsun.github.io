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

//dimensions calculations
const minWidth = borderSize,
    maxWidth = window.innerWidth - (lens.offsetWidth + borderSize),
    minHeight = borderSize,
    maxHeight = window.innerHeight - (lens.offsetHeight + borderSize);

const maxFontSizeMax = maxWidth / 5.5,
    maxFontSize = Math.min(80, maxFontSizeMax),
    minFontSize = 18,
    minFontSizeMax = 32;

//texts
const backgroundText = "knowledge∙comes∙in∙two∙parts:∙the∙grand∙theories∙and∙the∙little∙observations.∙There∙is∙the∙knowledge∙that∙subdivides∙like∙the∙branches∙of∙a∙tree∙—differentiation,∙categorization,∙and∙minutia,∙and∙then∙there∙is∙the∙knowledge∙that∙traces∙things∙to∙their∙roots∙—∙synthesis,∙transcendence,∙and∙wholeness.∙The∙nature-culture∙spectrum.∙cognition∙and∙the∙sensorium.∙Seeing,∙hearing,∙smelling,∙tasting,∙touching.∙Measurement∙and∙quantification.∙Analysis∙and∙pattern-recognition.∙The∙fire∙lookout,∙taking∙measurements∙with∙tools∙and∙devices∙of∙stainless∙steel,∙sends∙out∙dispatches∙by∙phone∙or∙radio.∙To∙wander∙is∙to∙wonder.∙stillness∙∙flow∙∙money∙∙debt∙∙islands∙∙continents∙∙figure∙∙ground∙∙wave∙∙particle∙∙loss∙∙gain∙∙interpolation∙∙extrapolation∙∙synthesis∙∙fragmenting∙∙clustering∙∙infinity∙∙singularity∙∙branch∙∙root∙∙question∙∙answer∙∙inside∙∙outside∙∙silver∙∙gold∙∙space∙∙time∙∙life∙∙death∙∙day∙∙night∙∙need∙∙want∙∙map∙∙territory∙∙wander∙∙wonder∙∙node∙∙edge∙∙sowing∙∙reaping∙∙growth∙∙rot∙∙wake∙∙dream∙∙reality∙∙illusion∙∙conscious∙∙unconscious∙∙nature∙∙culture∙∙binary∙∙field∙∙loop∙∙knot∙∙volcano∙∙glacier∙∙grassy∙∙knoll∙∙tears∙∙sweat∙∙language∙∙aesthetics∙∙aether∙∙earth∙∙mender∙∙trekker∙∙browser∙∙innocence∙∙guilt∙∙dexter∙∙sinister∙∙immanence∙∙transcendence∙∙biome∙∙strata∙∙cloud∙∙wave∙∙plastic∙∙petroleum∙∙shell∙∙pebble∙∙grass∙∙stain∙∙numbers∙∙letters∙∙palm∙∙heart∙∙daylight∙∙flowers∙∙spectra∙∙specimen∙∙stereotype∙∙archetype∙∙heuristic∙∙dogma∙∙continuous∙∙discrete∙∙angel∙∙layer∙∙slient∙∙error∙∙perfect∙∙mirror∙∙reality∙∙tunnel∙∙gravity∙∙cryptid∙∙prose∙∙poetry∙∙memory∙∙paralysis∙∙everything∙changes∙∙everything∙stays∙the∙same∙"

const backgroundTextArray = backgroundText.split(" ");

const trekkerWords = "Aether Algae Anchor Approach Artifact Ashes Basalt Basin Binary Biome Blaze Bloom Bone Boulder Branch Caldera Callus Campfire Canyon Carbon Ceramic Clay Cloud Collagen Continents Critter Crust Crux Cryptid Crystal Culture Cypress Day Daylight Dew Dune Earth Eon Epoch Etch Field Fire Flash Flint Floe Flow Flowers Fossil Froth Gear Geode Geosmin Glacier Gneiss Granite Grass Grassy Gravel Gravity Growth Halcyon Heart Heliotrope Holocene Igneous Islands Kindling Knoll Lake Lava Lichen Lithograph Log Magma Magnetic Map Marine Mercury Metallurgy Mineral Mist Moss Mucus Nature Night Oxide Ozone Palm Pebble Petrification Petrol Petroleum Pillow Plastic Plateau Pollen Pond Protolith Pseudomorph Pumice Quartz Raft Rainwater Range Ravine Reaping Redux Reservoir Ridge Ripple Root Rot Salve Sand Sediment Sentiment Shale Shell Shelter Smear Smoke Sound Sowing Spiral Stain Stillness Stone Strata Sulphur Swamp Sweat Tears Tectonic Territory Thermal Tissue Titanium Tobacco Trace Trail Trilobite Undercling Volcano Wander Wave Wild Wildfire Wonder Zipper Zygote"
let trekkerWordArray = trekkerWords.split(" ");
let trekkerWordIndex = 0;

const browserWords = "Aesthetics Analysis Angel Answer Archaeology Archetype Archive Axiom Bacteria Botany Bounce Brush Bumpy Capacity Category Chemistry Chemistry Circuit Clear Clustering Cognition Concept Conscious Container Continuous Continuum Cryptic Dead Death Debt Dexter Diffraction Digital Discrete Dogma Dogma Dream Duet Dust Edge Ephemera Episteme Equinox Error Esoteric Extrapolation Eyes Field Figure Flat Fragmenting Framework Function Future Fuzzy Gain Genesis Geography Geology Geomancy Geometry Geophagy Gold Grammar Ground Guilt Gutter Heuristic Hypothesis Illusion Immanence Infinity Innocence Inside Interpolation Inventory Knot Language Layer Leak Legend Letters Life Light Locomotion Log Logic Loop Loss Luck Material Melody Memory Mender Message Mildew Mimesis Mirror Mnemonic Money Mote Mythology Narrative Need Neurology Node Numbers Oracle Outside Page Panacea Paradigm Paralysis Particle Perfect Physic Physics Pixel Plastic Powder Pragmatics Prime Prose Question Radar Radio Ratio Reality Reality Report Repository Residue Rune Schema Script Semantics Sensorium Sermon Shrine Signal Silent Silver Singularity Sinister Software Solstice Somatic Space Specimen Spectra Spine Spirit Stack State Stereotype Stimuli Sublime Syntax Synthesis Tautology Taxonomy Taxonomy Technic Terrestrial Theory Time Transcendence Tunnel Unconscious Vinegar Wake Want Wave Zoology"
let browserWordArray = browserWords.split(" ");
let browserWordIndex = 0;

const trekkerText = "the fire lookout, taking measurements with tools and devices of stainless steel, sends out dispatches by phone or radio. To wander is to wonder. Wandering through forests and woods and deserts and fields and plains and mountains and valleys and tundras and taigas and picking up rocks and stones and crystals and ores and geodes and fossils and sticks and bugs and leaves and mushrooms and moss and peat and loam and clay and shells and wading through rivers and lakes and brooks and ponds and oceans and brooks and creeks and knowledge that subdivides like the branches of a tree- differentiation, categorization, and minutia, the fire lookout making those little observations and everything changes and everything stays the same and"
const trekkerTextArray = trekkerText.split(" ");
console.log(trekkerTextArray.length);
const browserText = "the fire lookout, taking measurements with tools and devices of stainless steel, sends out dispatches by phone or radio. To wander is to wonder. Wondering about categories and theories and boundaries and dialectics and inputs and outputs and discreteness and continuity and calculus and geometry and trawling through wikis and lists and indices and documents and records and archives and libraries and shelves and books and pages and paragraphs and sentences and words and letters and traversing through dense networks and rabbit holes and nodes and graphs and charts and maps and diagrams and knowledge that traces things to their roots— synthesis, transcendence, and wholeness, the fire lookout making those grand theories and everything changes and everything stays the same and"
const browserTextArray = browserText.split(" ");
console.log(browserTextArray.length);

let wordIndex = 0;

//toggles 
let modeToggle = false;
let cellToggle = true;
let aboutToggle = false;

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
lens.style.color = 'slategrey';
lens.style.textAlign = 'center';
lens.style.fontSize = '42px';
lens.style.padding = '10px';
lens.style.lineHeight = '1';
lens.style["font-variation-settings"] = `'wght' 1000, 'wdth' 75`;
modeHeader.style.width = '200%';
modeHeader.style.paddingBottom = '7px';
modeHeader.style.transform = 'rotate(90deg)'
WCell.style.background = 'linear-gradient(cornflowerblue -80%, slategrey 50%, yellowgreen 180%';

if(Math.random() > 0.5) {
    modeHeader.innerHTML = 'Stainless 2';
    document.body.style.fontFamily = 'Stainless';
} else {
    modeHeader.innerHTML = "Dispatch 2"
    document.body.style.fontFamily = 'Dispatch';
    modeToggle = !modeToggle;
}

setCellDimensions();
for (let cell of cells) {
    cell.classList.add('trekker-cell');
    cell.classList.remove('browser-cell');
}

setInterval(setCellText, 500);

//mode toggling
WCell.onclick = (e) => {
    if (modeToggle) { //TREKKER MODE
        modeHeader.innerHTML = "Stainless 2";
        document.body.style.fontFamily = 'Stainless';
    } else { //BROWSER MODE
        modeHeader.innerHTML = "Dispatch 2"
        document.body.style.fontFamily = 'Dispatch';
    }
    modeToggle = !modeToggle;
}

//text setters
function setCellText() {
    let word = modeToggle ? browserTextArray[wordIndex++] : trekkerTextArray[wordIndex++];
    NCell.innerHTML = word;
    typeWeight = scale(word.length, 0, 10, 1000, 100);
    typeWidth = scale(word.length, 0, 10, 200, 50);
    NCell.style.fontSize = '50px';
    NCell.style["font-variation-settings"] = `'wght' 1000, 'wdth' ${typeWidth}`;    
    if (wordIndex === trekkerTextArray.length) {
        wordIndex = 0;
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
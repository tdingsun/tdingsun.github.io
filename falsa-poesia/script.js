const NUM_POEMS = 179;
let poems = [];
let poemIndex = 0;
let wordIndex = 0;
let speedBase = 150;
let lightness = 90;

$(document).ready(start());

//setup
async function start() {
    poems = await getPoems();
    shuffle(poems);
    split(poems);
    main();
}

//main function
function main() {
    let currPoem = poems[poemIndex].text;
    let currPoemId = poems[poemIndex].id;
    let currWord = currPoem[wordIndex];
    let delay = getDelay(currWord);
    //display poem ID
    if(wordIndex === 0){
        $('#index').text(currPoemId);
        clearContainer();
        setBackgroundColor();
    }
    if(wordIndex === currPoem.length - 1){
        delay = 1000;
    }
    //display word
    displayWord(currWord);
    updateIndices(currPoem.length, poems.length);
    setTimeout(main, delay);
}

function setBackgroundColor() {
    $('#page').css('background', `linear-gradient(pink, hsl(350, 75%, ${lightness}%))`);
    if(lightness <= 40){
        lightness = 90;
    } else {
        lightness-=2
    }
}

function displayWord(word) {
    // let newDiv = $('<div></div>').text(word);
    // $('#container').append(newDiv);
    // var d = $('#container');
    // d.scrollTop(d.prop("scrollHeight"));

    //just displaying the word
    $('#container').text(word);
}

async function getPoems() {
    let poems_unsplit = [];
    for(i = 1; i <= NUM_POEMS; i++){
        await fetch(`poems/${i}.txt`)
            .then(res => {
                if(res.ok){
                    return res.text();
                }
            }).then(text => {
                if(text){
                    poems_unsplit.push({id: i, text: text});
                }
            })
    }
    return poems_unsplit;
}




//logic for progressing through poem/resetting
function updateIndices(numWords, numPoems) {
    if(wordIndex === numWords - 1){
        wordIndex = 0;
        if(poemIndex === numPoems - 1) {
            poemIndex = 0;
        } else {
            poemIndex++;
        }
    } else {
        wordIndex++;
    }
}

function clearContainer() {
    $('#container').empty();
}

function getDelay(word) {
    let numSyllables = RiTa.syllables(word).split('/').length;
    return Math.max(speedBase, numSyllables * speedBase);
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }


function split(array) {
    array.forEach(el => {
        el.text = el.text.split(/\s/)
    });
    return array;
}
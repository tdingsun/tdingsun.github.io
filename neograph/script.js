const rnn = ml5.charRNN('models/data', modelLoaded);
const n = 26;
var runningInference = false;
var temperature = 0.85;
const numRows = 5;
const numCols = 5;
const fontsize = 20;
const linePadding = 70;
const linePaddingOrtho = 40;
const lineWidth = "2px";
const lineWidthOrtho = "2px";

var title = "Neograph";
var author = "Tiger Dingsun"

var volume = new Tone.Volume(-12);
var synth = new Tone.PolySynth(4, Tone.Synth).chain(volume, Tone.Master);
var notes = Tone.Frequency("G3").harmonize([0, 4, 7, 12]);

StartAudioContext(Tone.context, window);

var tv;
var th;
$(document).ready(function(){
    Tone.Master.mute = localStorage.getItem('mute') == 'true' ? true : false;
    let text = Tone.Master.mute ? "SOUND ON" : "MUTE";
    $("#mute-btn").text(text);

    displayTitle(title, author);
    tv = setInterval(rotateVertical, 1000);
    th = setInterval(rotateHorizontal, 2000);
});

function modelLoaded() {
    console.log('Model Loaded!');
    setupGrid();
}

function displayTitle(title, author){
    $("#title").html(title + "<br>by " + author);
}

$("#container").on('click', '.worda', function() {
    makeNewWord(this);
});

function makeNewWord(el) {
    if(!runningInference){
        runningInference = true;
        rnn.generate({length: 33, temperature: temperature}, (err, results) => {
            var res = results.sample.split(" ");
            $(el).text(res[1]);
            makeLines(el);
            runningInference = false;
            var randNote = parseInt(Math.random() * notes.length);
            synth.triggerAttackRelease(notes[randNote], "4n");
        });   
    }
}

function makeLines(el) {
    var id = parseInt($(el).attr('id'));
    var n = calculateNeighbors(id);
    var pos1 = $(el).offset();

    var r = [];
    for(let i = 0; i < 8; i++){
        r.push(Math.random() > 0.5);
    }

    if(n.N != null && r[0]){
        let neighbor = $(`#${n.N}`);
        neighbor.children('.line').remove();
        let pos2 = neighbor.offset();
        let h = Math.abs(pos1.top - pos2.top) - neighbor.height() - linePaddingOrtho;

        let line = $("<div class='line'></div>");
        line.css({
            width: lineWidthOrtho,
            height: `${h}px`, 
            top: `${pos2.top + neighbor.height() + linePaddingOrtho/2}px`,
            left: `${pos2.left + neighbor.width()/2}px`
        })
        $(el).append(line);
    }
    if(n.S != null  && r[1]){
        let neighbor = $(`#${n.S}`);
        neighbor.children('.line').remove();

        let pos2 = neighbor.offset();
        let h = Math.abs(pos1.top - pos2.top) - $(el).height() - linePaddingOrtho;
        let line = $("<div class='line'></div>");

        line.css({
            width: lineWidthOrtho,
            height: `${h}px`, 
            top: `${pos1.top + $(el).height() + linePaddingOrtho/2}px`,
            left: `${pos1.left + $(el).width()/2}px`
        })
        $(el).append(line);

    }
    if(n.E != null  && r[2]){
        let neighbor = $(`#${n.E}`);
        neighbor.children('.line').remove();

        let pos2 = neighbor.offset();
        let w = Math.abs(pos1.left - pos2.left) - $(el).width() - linePaddingOrtho;
        let line = $("<div class='line'></div>");

        line.css({
            width: `${w}px`,
            height: lineWidthOrtho, 
            top: `${pos1.top + $(el).height()/2}px`,
            left: `${pos1.left + $(el).width() + linePaddingOrtho/2}px`
        })
        $(el).append(line);

    }
    if(n.W != null  && r[3]){
        let neighbor = $(`#${n.W}`);
        neighbor.children('.line').remove();

        let pos2 = neighbor.offset();
        let w = Math.abs(pos1.left - pos2.left) - neighbor.width() - linePaddingOrtho;
        let line = $("<div class='line'></div>");

        line.css({
            width: `${w}px`,
            height: lineWidthOrtho, 
            top: `${pos1.top + $(el).height()/2}px`,
            left: `${pos2.left + neighbor.width() + linePaddingOrtho/2}px`
        })

        $(el).append(line);


    }
    if(n.NE != null  && r[4]){
        let neighbor = $(`#${n.NE}`);
        neighbor.children('.line').remove();

        let pos2 = neighbor.offset();
 
        let w = calcDistance(pos1, pos2) - linePadding;
        let line = $("<div class='line'></div>");
        
        let x = Math.abs(pos1.left - pos2.left);
        let y = Math.abs(pos1.top - pos2.top) - 20;
        let angle = Math.atan(y/x) * 180/Math.PI;

        line.css({
            width: `${w}px`,
            height: lineWidth, 
            top: `${(pos1.top + pos2.top)/2 + $(el).height()/2}px`,
            left: `${(pos1.left + pos2.left)/2 + $(el).width()/2 - w/2}px`,
            transform: `rotate(${-angle}deg)`
        })

        $(el).append(line);
    }
    if(n.SE != null  && r[5]){
        let neighbor = $(`#${n.SE}`);
        neighbor.children('.line').remove();

        let pos2 = neighbor.offset();
 
        let w = calcDistance(pos1, pos2) - linePadding;
        let line = $("<div class='line'></div>");

        let x = Math.abs(pos1.left - pos2.left);
        let y = Math.abs(pos1.top - pos2.top) - 20;
        let angle = Math.atan(y/x) * 180/Math.PI;

        line.css({
            width: `${w}px`,
            height: lineWidth, 
            top: `${(pos1.top + pos2.top)/2 + $(el).height()/2}px`,
            left: `${(pos1.left + pos2.left)/2 + $(el).width()/2 - w/2}px`,
            transform: `rotate(${angle}deg)`
        })

        $(el).append(line);

    }
    if(n.SW != null  && r[6]){
        let neighbor = $(`#${n.SW}`);
        neighbor.children('.line').remove();

        let pos2 = neighbor.offset();
 
        let w = calcDistance(pos1, pos2) - linePadding;
        let line = $("<div class='line'></div>");

        let x = Math.abs(pos1.left - pos2.left);
        let y = Math.abs(pos1.top - pos2.top) - 20;
        let angle = Math.atan(y/x) * 180/Math.PI;

        line.css({
            width: `${w}px`,
            height: lineWidth, 
            top: `${(pos1.top + pos2.top)/2 + $(el).height()/2}px`,
            left: `${(pos1.left + pos2.left)/2 + $(el).width()/2 - w/2}px`,
            transform: `rotate(${-angle}deg)`
        })

        $(el).append(line);


    }
    if(n.NW != null  && r[7]){
        let neighbor = $(`#${n.NW}`);
        neighbor.children('.line').remove();

        let pos2 = neighbor.offset();
 
        let w = calcDistance(pos1, pos2) - linePadding;
        let line = $("<div class='line'></div>");

        let x = Math.abs(pos1.left - pos2.left);
        let y = Math.abs(pos1.top - pos2.top) - 20;
        let angle = Math.atan(y/x) * 180/Math.PI;

        line.css({
            width: `${w}px`,
            height: lineWidth, 
            top: `${(pos1.top + pos2.top)/2 + $(el).height()/2}px`,
            left: `${(pos1.left + pos2.left)/2 + $(el).width()/2 - w/2}px`,
            transform: `rotate(${angle}deg)`
        })

        $(el).append(line);


    }
}

function calcDistance(pos1, pos2){
    let x = Math.abs(pos1.left - pos2.left);
    let y = Math.abs(pos1.top - pos2.top);
    let w = Math.sqrt(x*x + y*y)
    return w
}

function calculateNeighbors(id) {

    var col = id % numCols;
    var row =  (id - col) / numCols;
    var neighbors = {};
    if(col != 0){
        neighbors.W = ((col - 1) + (row * numCols)); //W
    }
    if(col != numCols - 1){
        neighbors.E = ((col + 1) + (row * numCols)); //E
    }
    if(row != 0){
        neighbors.N = (col + ((row - 1) * numCols)); //N
        if(col != numCols - 1){
            neighbors.NE = ((col + 1) + ((row - 1) * numCols)); //NE
        }
        if(col != 0){
            neighbors.NW = ((col - 1) + ((row - 1) * numCols)); //NW
        }
    }
    if(row != numRows - 1){
        neighbors.S = (col + ((row + 1) * numCols)); //S
        if(col != numCols - 1){
            neighbors.SE = ((col + 1) + ((row + 1) * numCols)); //SE
        }
        if(col != 0){
            neighbors.SW = ((col - 1) + ((row + 1) * numCols)); //SW
        }
    }

    return neighbors
}

function setupGrid() {
    runningInference = true;
    rnn.generate({seed: " ", length: 375, temperature: temperature}, (err, results) => {
        var res = results.sample.split(" ");
        $("#container").empty();
        for(let i = 0; i < Math.min(res.length - 1, numRows * numCols); i++){
            $("#container").append(`<div class='word'><a id=${i} class='worda'>${res[i+1]}</a></div>`);
        }
        runningInference = false;
        $("#title").addClass("title-small");
    });
}

$("#clockContainer").mouseenter(function(){
    clearInterval(tv);
    clearInterval(th);
    tv = setInterval(rotateVertical, 30);
    th = setInterval(rotateHorizontal, 30);
  });
  
$("#clockContainer").mouseleave(function(){
    clearInterval(tv);
    clearInterval(th);
    tv = setInterval(rotateVertical, 1000);
    th = setInterval(rotateHorizontal, 1000);
  });

var currRotateV = 0;
var currRotateH = 0;

function rotateVertical() {
  currRotateV += 15;
  $("#vertical").css({
      "transform": `rotate(${currRotateV}deg)`
  })
}

function rotateHorizontal() {
  currRotateH += 7.5;
  $("#horizontal").css({
      "transform": `rotate(${currRotateH}deg)`
  })
}

$("#mute-btn").click(function(){
    Tone.Master.mute = !Tone.Master.mute;
    localStorage.setItem('mute', Tone.Master.mute);
    $(this).text(Tone.Master.mute ? "SOUND ON" : "MUTE");
  });
  
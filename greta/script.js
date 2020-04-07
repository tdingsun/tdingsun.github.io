var title = "Various";
var author = "Greta Sk"

var padding = 100;
var i = 0;
var speed = 350;

var currRotateV = 0;
var currRotateH = 0;

var synth = new Tone.PolySynth(5, Tone.Synth).toMaster();
var notes = Tone.Frequency("A3").harmonize([0, 2, 5, 7, 9, 12]);

StartAudioContext(Tone.context, 'div');
//have to click to start audio context
$(document).click(function(){
	console.log("clicked");
	Tone.start();
});


$("document").ready(function(){
    displayTitle(title, author);
    setTimeout(distplayFirst, 2500);
    setInterval(rotateVertical, speed);
    setInterval(rotateHorizontal, speed*2);
})

function displayTitle(title, author){
    $("#center").html(title + "<br> BY <br>" + author);
    var randNote = Math.floor(Math.random() * notes.length);

    synth.triggerAttackRelease(notes[randNote], "1n");
}


function displayFirst(){
    $.ajax({
        url: ""
    })
}


function textCycle(){
    var randNote = Math.floor(Math.random() * notes.length);
    synth.triggerAttackRelease(notes[randNote], "1n");

    var word = txt_array[i];
    updateField(word);
    var metrics = getTextWidth(word, "180px arial");
    var scaleXFactor = (window.innerWidth - padding) / metrics.width;
    var scaleYFactor = (window.innerHeight - padding) / 
        (metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent);
    $("#center").text(word);
    $("#center").css({
        "transform": `scale(${scaleXFactor}, ${scaleYFactor})`
    })
    var syllables = RiTa.getSyllables(word);
	var syllables_arr = syllables.split("/");
    var time = syllables_arr.length * speed;
    i++;

    if (word.charAt(word.length - 1) == '.'){
        time += speed;
    }
    if(i < txt_array.length){
        setTimeout(textCycle, time);
    }

}

function updateField(word){
    var curr = $("#field").text();
    $("#field").text(curr + " " + word);
}


function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics;
}

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
var title = "Ballast";
var author = "Tiger Dingsun"

var colors = ["red", "forestgreen", "orange", "magenta", "cornflowerblue", "darkgoldenrod", "teal", "purple", "blue"];
var color_index = 0;

var offset_dict = {}

var lh = 1;
var lh_unit = 1;

var padding = 100;
var i = 0;
var speed = 500;

var currRotateV = 0;
var currRotateH = 0;

var synth = new Tone.PolySynth(5, Tone.Synth).toMaster();
var notes = Tone.Frequency("A3").harmonize([0, 2, 5, 7, 9, 12]);
var noteIndex = 0;

let md = window.markdownit({html: true});

$("document").ready(function(){
    displayTitle(title, author);
    setTimeout(displayText, 1000);
    setInterval(rotateVertical, 1000);
    setInterval(rotateHorizontal, 2000);
});

function displayTitle(title, author){
    $("#title").html(title + "<br>by<br>" + author);
}

function displayText(){
    $("#title").removeClass("centered").addClass("runner");

    for(var i = 1; i <= 17; i++){
        getMD(i);
    }
}

function getMD(i){
    $.ajax({
        url: `md/${i}.md`,
        datatype: "html",
        success: function(markdown){
            let html = md.render(markdown);
            $(`#page${i}`).html(html);
        }
    });
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
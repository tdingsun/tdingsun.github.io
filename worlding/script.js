var title = "<span id='maintitle'>HYBRID WORLDING:</span><br><i>What Can Graphic Design Learn from Poetics and World-building?</i>";
var author = "<a class='author' href='tiger.exposed'>Tiger Dingsun</a>"

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

var width;
var height;

$("document").ready(function(){
    width = $(window).width();
    height = $(window).height();
    displayText();
});

$("#handle").draggable({
    grid: [50, 50],
    axis: "x",
    containment: "#container",
    zIndex: 100,
    drag: function(event, ui){
        ui.position.left = Math.min(Math.max( 50, ui.position.left ), width - 100);
        let x = ui.position.left + 12.5;

        $("#left").css("width", x);
    }
});

function displayText(){
    $("#title").html(title + "<br>by " + author);

    $.ajax({
        url: `md/essay.md`,
        datatype: "html",
        success: function(markdown){
            let html = md.render(markdown);
            $(`#right`).html(html);
        }
    });
    $.ajax({
        url: `md/exercises.md`,
        datatype: "html",
        success: function(markdown){
            let html = md.render(markdown);
            $(`#left`).append(html);
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
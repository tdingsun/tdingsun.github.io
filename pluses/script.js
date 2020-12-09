var pluses = [];
var synth;
var notes;

var rotateAllSpeed = 666;
var rotateSpeed = 500;
var modeChangeSpeed = 60000;
var fixedAngle = 90;
var rotateAllNote = 0;

var randRotate = false;
var backgroundColor = 'cornsilk';
var color = 'cornflowerblue';

var noteBases = ["G2", "B2", "C3", "E3", "F3"];
var noteBase = 0;
$(document).ready(function() {
    var width = $(".container").width();
    var height = $(".container").height();
    console.log(width);
    console.log(height);
    var size = width/10;
    if(size > height/6){
        size = height/6;
        $(".container").css('width', size*10);
    }

    $(window).one('click', function(){
        Tone.context.resume();
        for(var i = 0; i < 60; i++){
            // makeFlower(size, i);
            makePlus(size, i);
        }

        setClock();
        setInterval(setClock, 1000);

        switchMode();
        setInterval(switchMode, modeChangeSpeed);

        setInterval(rotateAll, rotateAllSpeed);

        $('.plus').on('mouseenter', function(e) {
            e.stopPropagation();
            rotate(e.currentTarget, 6);
        });
    
    });
    
    var volume = new Tone.Volume(-12);
    synth = new Tone.PolySynth(7, Tone.Synth).chain(volume, Tone.Master);
    notes = Tone.Frequency(noteBases[noteBase]).harmonize([0, 4, 5, 7, 9, 11, 
                                            12, 16, 17, 19, 21, 23, 
                                            24, 28, 29, 31, 33, 35,
                                            36]);


})

var mode = 0;
function switchMode() {
    switchKey();

    if(mode == 0){ //cross
        $('.vbar').css('background-color', color);
        $('.hbar').css('background-color', color);
        fixedAngle = 90;

        mode++;

        
    } else if(mode == 1) { //hbar only
        $('.hbar').css('background-color', color);
        $('.vbar').css('background-color', backgroundColor);
        $('.hbar').css('z-index', -1);
        $('.vbar').css('z-index', 2);
        fixedAngle = 180;

        mode++;
    } else if(mode == 2) { //vbar only
        $('.hbar').css('background-color', backgroundColor);
        $('.vbar').css('background-color', color);
        $('.hbar').css('z-index', 2);
        $('.vbar').css('z-index', -1);
        fixedAngle = 180;

        mode++;

    } else if(mode == 3) { //bars flip 90
        $('.hbar').css('background-color', color);
        $('.vbar').css('background-color', backgroundColor);
        $('.hbar').css('z-index', -1);
        $('.vbar').css('z-index', 2);
        fixedAngle = 90;
        mode = 0;
    }
}

function switchKey() {
    noteBase++;

    if(noteBase >= noteBases.length){
        noteBase = 0;
    }
    notes = Tone.Frequency(noteBases[noteBase]).harmonize([0, 4, 5, 7, 11, 
        12, 16, 17, 19, 23, 
        24, 28, 29, 31, 35,
        36]);
}

function setClock() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    $('.clock').text(h + ":" + m + ":" + s);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

function rotate(object, i){
    synth.triggerAttackRelease(notes[i % notes.length], "4n");

    let rand = Math.random() * 180 + 15;

    if($(object).hasClass('rotated')){
        $(object).removeClass('rotated');
        if(randRotate){
            $(object).css('transform', `rotate(-${rand}deg)`);
        } else {
            $(object).css('transform', `rotate(0deg)`);
        }



    } else {
        $(object).addClass('rotated');
        if(randRotate){
            $(object).css('transform', `rotate(${rand}deg)`);
        } else {
            $(object).css('transform', `rotate(${fixedAngle}deg)`);
        }
    }

    $(object).find(".petal").toggleClass("flowerColor2");
    $(object).find(".center").toggleClass("centerColor2");
}

var currM = 1;
function rotateAll(){
    randRotate = false;

    for(i = 0; i < pluses.length; i++){
        if((i + 1) % currM == 0){
            rotate(pluses[i], rotateAllNote);

        }
    }
    if(currM >= 15){
        currM = 0;
    }
    currM++;
    randRotate = true;
    rotateAllNote++;
    if(rotateAllNote > 8){
        rotateAllNote = 0;
    }

}

function makePlus(size, index) {
    var plus = $("<div></div>").addClass("plus").appendTo($('.container'));
    plus.css({
        'height': size,
        'width': size
    })
    var vBar = $("<div></div>").addClass("vbar");
    var hBar = $("<div></div>").addClass("hbar");
    plus.append(vBar);
    plus.append(hBar);

    pluses.push(plus);
    setInterval(rotate, (index + 1) * rotateSpeed, plus, index);
}
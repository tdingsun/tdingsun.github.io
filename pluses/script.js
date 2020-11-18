var pluses = [];
var synth;
var notes;

var rotateAllSpeed = 666;
var rotateSpeed = 500;
var colorSpeed = 20000;
var fixedAngle = 180;
var rotateAllNote = 0;
var randRotate = true;
var cross = true;
$(document).ready(function() {

    $("<div></div>").addClass('container').appendTo($('body'));
    $("<div></div>").addClass('clock').appendTo($('body')).text("click to begin");
    var width = $(".container").width();
    var size = width/10;



    $(window).one('click', function(){
        Tone.context.resume();
        for(var i = 0; i < 60; i++){
            makePlus(size, i);
        }
        setClock();
        setInterval(setClock, 1000);
        setInterval(switchColor, colorSpeed);
        setInterval(rotateAll, rotateAllSpeed);


        $('.plus').on('mouseenter', function(e) {
            e.stopPropagation();
            rotate(e.currentTarget, 0);
        });
    
    });
    
    var volume = new Tone.Volume(-12);
    synth = new Tone.PolySynth(12, Tone.Synth).chain(volume, Tone.Master);
    notes = Tone.Frequency("C3").harmonize([0, 4, 5, 7, 9, 11, 
                                            12, 16, 17, 19, 21, 23, 
                                            24, 28, 29, 31, 33, 35,
                                            36]);


})

function switchColor() {
    if(cross){
        $('.hbar').css('background-color', 'cornsilk');
        $('.hbar').css('z-index', 2);
        $('.vbar').css('z-index', -1);
        cross = false;
        vbar = true;
        
    } else if(vbar) {
        $('.hbar').css('background-color', 'cornflowerblue');
        $('.vbar').css('background-color', 'cornsilk');
        $('.hbar').css('z-index', -1);
        $('.vbar').css('z-index', 2);
        vbar = false;
        cross = false;
    } else {
        $('.vbar').css('background-color', 'cornflowerblue');
        $('.hbar').css('background-color', 'cornflowerblue');

        vbar = true;
        cross = true;
    }
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
    // let rand = Math.floor(Math.random() * 10 + 1);
    setInterval(rotate, (index + 1) * rotateSpeed, plus, index);
    // setInterval(rotate, rand * 1000, vBar);
    // setInterval(rotate, rand * 1000, hBar);

}


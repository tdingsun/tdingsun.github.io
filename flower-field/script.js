var flowers = [];
var synth;
var notes;

var rotateAllSpeed = 666;
var rotateSpeed = 500;
var fixedAngle = 360;
var rotateAllNote = 0;

var randRotate = false;

var colors = ["gold", "yellowgreen", "tomato", "salmon", "plum", "palevioletred", "orchid", "orangered", "orange", "mediumorchid", "lightcoral", "goldenrod", "cornflowerblue", "coral", "thistle", "darkkhaki", "darkcyan", "pink", "dodgerblue", "deepskyblue"]
// var colors = ["snow", "ghostwhite", "whitesmoke", "seashell", "beige", "oldlace", "floralwhite", "ivory", "linen"];
var noteBases = ["G2", "B2", "C3", "E3", "F3"];
var noteBase = 0;
$(document).ready(function() {
    var width = $(".container").width();
    var height = $(".container").height();

    var size = width/10;
    if(size > height/6){
        size = height/6;
        $(".container").css('width', size*10);
    }

    $(window).one('click', function(){
        Tone.context.resume();
        for(var i = 0; i < 60; i++){
            makeFlower(size, i);
        }

        setClock();
        setInterval(setClock, 1000);

        setInterval(rotateAll, rotateAllSpeed);

        $('.flower').on('mouseenter', function(e) {
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
    // $(object).find(".smile").toggleClass("hidden");
    $(object).find(".center").children().toggleClass("hidden");

}

var currM = 1;
function rotateAll(){
    randRotate = false;

    for(i = 0; i < flowers.length; i++){
        if((i + 1) % currM == 0){
            rotate(flowers[i], rotateAllNote);

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

function makeFlower(size, index) {
    var flower = $("<div></div>").addClass("flower").appendTo($('.container'));
    // var factor = (Math.random()*0.75) + 0.375;
    // size = factor * size;
    flower.css({
        'height': size,
        'width': size,
    });
    var color = colors[Math.floor(Math.random() * colors.length)];
    var numPetals = Math.floor(Math.random()*5) + 5;
    for(let i = 0; i < numPetals; i++){
        let petalcontainer = $("<div></div>").addClass("petalcontainer");
        petalcontainer.css({
            'height': size,
            'width': size,
            'border-color': color
        });
        let petal = $("<div></div>").addClass("petal");
        petal.css({
            'height': size/2,
            'width': size/numPetals*1.75,
            'border-radius': size,
            'left': `calc(50% - ${size/numPetals*0.875}px)`,
            'background-color': color
        })
        petalcontainer.css('transform', `rotate(${i*360/numPetals}deg)`);
        petalcontainer.append(petal);
        flower.append(petalcontainer);
    }
    var center = $("<div></div>").addClass("center").css('border-color', color);
    addSmile(center, color);
    center.css({
        'width': size/3.5,
        'height': size/3.5,
        'border-radius': size,
        'left': `calc(50% - ${size/7}px)`,
        'top': `calc(50% - ${size/7}px)`
    })
    flower.append(center);
    flowers.push(flower);

    setInterval(rotate, (index + 1) * rotateSpeed, flower, index);
}

function addSmile(center, color){
    $("<div></div>").addClass("lefteye").appendTo($(center)).css('background-color', color);
    $("<div></div>").addClass("righteye").appendTo($(center)).css('background-color', color);
    $("<div></div>").addClass("smile").appendTo($(center)).css('border-color', color);

}


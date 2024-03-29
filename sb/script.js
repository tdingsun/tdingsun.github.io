var title = "Wet Dreams";
var author = "S.B."

var txt = "When I had my first wet dream. At the age of 20. I was able to swallow him whole – without pinching my insides. I felt uncomfortable but I knew it was good for me. I fantasize about straight guys hardcore, its stupid but helps me reclaim a tiny bit of the power that patriarchy takes away from me. I’m not going to apologize for that, ever. I get the chance to strip them of their subjecthood, treat them like objects of my fantasy. In this minute circumstance I am able to control what traumatizes me. That creamy sweet feeling escaping me. The smoothness of my thoughts taking a very direct physical form – kinda ontological. a pulsating release, delicate attachments releasing – an awkward first auto-orgasm."

var txt_array = txt.split(" ");

var padding = 100;
var i = 0;
var speed = 350;

var currRotateV = 0;
var currRotateH = 0;

var tv;
var th;

var volume = new Tone.Volume(-8);
var synth = new Tone.PolySynth(5, Tone.Synth);
synth.chain(volume, Tone.Master);
var notes = Tone.Frequency("A3").harmonize([0, 2, 5, 7, 9, 12]);

StartAudioContext(Tone.context, window);
$(window).click(function(){
    Tone.context.resume();
});

$("document").ready(function(){
    Tone.Master.mute = localStorage.getItem('mute') == 'true' ? true : false;
    let text = Tone.Master.mute ? "SOUND ON" : "MUTE";
    $("#mute-btn").text(text);

    displayTitle(title, author);
    setTimeout(textCycle, 2500);
    tv = setInterval(rotateVertical, speed);
    th = setInterval(rotateHorizontal, speed*2);
});
  
function displayTitle(title, author){
    $("#title").html(title + "<br> by " + author);
    setTimeout(() => {
        $("#title").hide();
    }, 2500);
}

function textCycle(){
    var randNote = Math.floor(Math.random() * notes.length);
    synth.triggerAttackRelease(notes[randNote], "1n");

    var word = txt_array[i];
    updateField(word);
    var metrics = getTextWidth(word, "180px arial");
    var scaleXFactor = (window.innerWidth - padding) / metrics.width;
    var scaleYFactor = (window.innerHeight - padding) / (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent);
    if(metrics.actualBoundingBoxAscent == null){
        scaleYFactor = (window.innerHeight - padding) / 180;
    }
    $("#center").text(word);
    var scales = [scaleXFactor, scaleYFactor]
    $("#center").transition({scale: scales}, 300);
    // $("#center").css({
    //     "-webkit-transform": `scale(${scaleXFactor}, ${scaleYFactor})`,
    //     "-moz-transform": `scale(${scaleXFactor}, ${scaleYFactor})`,
    //     "-o-transform": `scale(${scaleXFactor}, ${scaleYFactor})`,
    //     "transform": `scale(${scaleXFactor}, ${scaleYFactor})`,
    // });
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

$("#clockContainer").mouseenter(function(){
    clearInterval(tv);
    clearInterval(th);
    tv = setInterval(rotateVertical, 30);
    th = setInterval(rotateHorizontal, 30);
    $("#nav").addClass("showNav");
    $("#clockContainer").children().addClass("navClock");
  });
  
  $("#clockContainer").mouseleave(function(){
    clearInterval(tv);
    clearInterval(th);
    tv = setInterval(rotateVertical, 1000);
    th = setInterval(rotateHorizontal, 1000);
  });
  
  $("#nav").mouseleave(function(){
    $("#nav").removeClass("showNav");
    $("#clockContainer").children().removeClass("navClock");
  });

$("#mute-btn").click(function(){
    Tone.Master.mute = !Tone.Master.mute;
    localStorage.setItem('mute', Tone.Master.mute);
    $(this).text(Tone.Master.mute ? "SOUND ON" : "MUTE");
  });
var title = "Ballast";
var author = "Tiger Dingsun"



StartAudioContext(Tone.context, window);

var synth = new Tone.PolySynth(5, Tone.Synth).toMaster();
var notes = Tone.Frequency("A3").harmonize([0, 2, 5, 7, 9, 12]);
var noteIndex = 0;

let md = window.markdownit({html: true});

var width;
var height;

var tv;
var th;

$("document").ready(function(){
    Tone.Master.mute = localStorage.getItem('mute') == 'true' ? true : false;
    let text = Tone.Master.mute ? "SOUND ON" : "MUTE";
    $("#mute-btn").text(text);

    width = $(window).width();
    height = $(window).height();
    displayTitle(title, author);
    setTimeout(displayText, 1500);
    tv = setInterval(rotateVertical, 1000);
    th = setInterval(rotateHorizontal, 2000);
});

$(".page").click(function(e){
    var randNote = Math.floor(Math.random() * notes.length);
    synth.triggerAttackRelease(notes[randNote], "8n");

    $(this).siblings().removeClass("expanded");
    $(this).siblings().children().not("h1").hide();

    $(this).toggleClass("expanded");
    if($(this).hasClass("expanded")){
        $(this).closest(".col").css({
            'flex-grow': 2
        });
        $(this).children().show();
        $(this).siblings().css({
            'z-index': 0
        })
        $(this).css({
            'z-index': 100
        })
    } else {
        $(this).closest(".col").css({
            'flex-grow': 1
        });
        $(this).children().hide();
        $(this).children('h1').show();
    }
});


function displayTitle(title, author){
    $("#title").html(title + "<br>by<br>" + author);
    $("#container").css({
        top: '50vh',
        height: '50vh'
    })
}

function displayText(){
    $("#container").css({
        top: 0,
        height: '100vh'
    })

    for(var i = 17; i >= 1; i--){
        getMD(i);
    }
}

function getMD(i){
    $.ajax({
        url: `md/${i}.md`,
        datatype: "html",
        success: function(markdown){
            let page = $(`#page${i}`)
            let html = md.render(markdown);
            page.html(html);
            page.children().hide();
            page.children('h1').show();
        }
    });
}

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
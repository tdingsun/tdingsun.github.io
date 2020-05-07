var w = $(window).width();
var h = $(window).height();
var linkBody = "https://tdingsun.github.io/";
var links = {
  "anonymous": {
    "number": "01",
    "name": "Untitled",
    "author": "Anonymous",
    "mobile": false
  },
  "anonymous2": {
    "number": "02",
    "name": "Itchy, Fluffy, and Incomplete Things",
    "author": "Anonymous",
    "mobile": false
  },
  "eliza": {
    "number": "03",
    "name": "Third Form: A First Month on Testosterone",
    "author": "Eliza Chen",
    "mobile": true
  },
  "greta": {
    "number": "04",
    "name": "10 Poems",
    "author": "Greta Sk",
    "mobile": true
  },
  "jorge1": {
    "number": "05",
    "name": "The Meaning Maker",
    "author": "Jorge Palacios",
    "mobile": true
  },
  "jorge2": {
    "number": "06",
    "name": "Glossary of Feelings~~~",
    "author": "Jorge Palacios",
    "mobile": false
  },
  "justine": {
    "number": "07",
    "name": "7 Poems",
    "author": "Justine Nguyễn-Nguyễn",
    "mobile": true
  },
  "libby": {
    "number": "08",
    "name": "SPIRAL",
    "author": "Libby Marrs",
    "mobile": true
  },
  "liby1": {
    "number": "09",
    "name": "Pissed Pants Academy",
    "author": "Liby Hays",
    "mobile": true
  },
  "liby2": {
    "number": "10",
    "name": "Can't Run Trip Over Your Fucking Swag",
    "author": "Liby Hays",
    "mobile": false
  },
  "theia": {
    "number": "11",
    "name": "#hot sports girl",
    "author": "Théïa Flynn",
    "mobile": true
  },
  "tiger": {
    "number": "12",
    "name": "Ballast",
    "author": "Tiger Dingsun",
    "mobile": true
  }, 
  "neograph": {
    "number": "13",
    "name": "Neograph",
    "author": "Tiger Dingsun",
    "mobile": true
  }, 
  "ali": {
    "number": "14",
    "name": "Excerpts from No Man's Land",
    "author": "Ali Dipp",
    "mobile": true
  }, 
  "aayushi": {
    "number": "15",
    "name": "Dream Dress",
    "author": "Aayushi Khowala",
    "mobile": false
  }, 
}

var volume = new Tone.Volume(-6);
var synth = new Tone.PolySynth(7, Tone.Synth).chain(volume, Tone.Master);
var notes = Tone.Frequency("C3").harmonize([0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24, 26, 28, 31, 33, 36]);

StartAudioContext(Tone.context, window);


var tv;
var th;

$(document).ready(function(event){
  makeLinks();
  tv = setInterval(rotateVertical, 1000);
  th = setInterval(rotateHorizontal, 1200);
});

$(window).resize(function(){
  w = $(window).width();
  h = $(window).height();
});

$("#container").on("mouseenter", ".line", function(){
  let i = $(this).index() - 3;
  console.log(i);
  synth.triggerAttackRelease(notes[i], "8n");
});

$("#clockContainer").click(function(){
  $("#about").toggleClass('about-alt');
  $("#th").toggleClass('th-alt');
  $("#linklist").toggleClass('linklist-alt');
  $(".line").toggleClass('line-alt');
  $(".number").toggleClass('number-alt');
  $(".title").toggleClass('title-alt');
  $(".by").toggleClass('by-alt');
  $(".author").toggleClass('author-alt');
  $(".mobile").toggleClass('mobile-alt');
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

function makeLinks() {

  for (var [key, value] of Object.entries(links)) {
    let title = value.name;
    let author = value.author;
    let number = value.number;
    let mobile = value.mobile ? "Yes" : "No";

    let newline = $(`<a class='line' href='${linkBody + key}' target='_self'></a>`);
    newline.append($(`<span class="number">RM–${number}</span>`));
    newline.append($(`<span class="title"><a ">${title}</a></span>`));
    newline.append($(`<span class="by">by</span>`));
    newline.append($(`<span class="author">${author}</span>`));
    newline.append($(`<span class="mobile">${mobile}</span>`));

    $("#container").append(newline);
  }
  
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
  $(this).text($(this).text() == 'MUTE' ? 'SOUND ON' : 'MUTE');
});
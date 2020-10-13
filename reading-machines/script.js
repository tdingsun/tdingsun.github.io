

var w = $(window).width();
var h = $(window).height();
var linkBody = "https://tdingsun.github.io/";
var links = {
  "emma": {
    "number": "17",
    "name": "GUSHGUSHGUSH",
    "author": "Emma Kemp",
    "bio": "is a writer, artist and educator based in LA. <a href='http://emmakemp.com'>Website</a>",
    "mobile": false
  }, 
  "wen": {
    "number": "16",
    "name": "Portraits and Repetition",
    "author": "Wen Zhuang",
    "mobile": true
  }, 
  "aayushi": {
    "number": "15",
    "name": "Dream Dress",
    "author": "Aayushi Khowala",
    "mobile": false
  }, 
  "ali": {
    "number": "14",
    "name": "Excerpts from No Man's Land",
    "author": "Ali Dipp",
    "mobile": true
  }, 
  "neograph": {
    "number": "13",
    "name": "Neograph",
    "author": "Tiger Dingsun",
    "bio": "is my second language. <a href='https://tiger.exposed/'>Website</a>",
    "mobile": true
  }, 
  "danning": {
    "number": "12",
    "name": "Itchy, Fluffy, and Incomplete Things",
    "author": "Danning Niu",
    "bio": "is working towards a sound and compassionate grasp of our concrete realities. <a href='https://danningniu.com/'>Website</a>",
    "mobile": false
  },
  "jorge2": {
    "number": "11",
    "name": "Glossary of Feelings~~~",
    "author": "Jorge Palacios",
    "mobile": false
  },
  "justine": {
    "number": "10",
    "name": "7 Poems",
    "author": "Justine Nguyễn-Nguyễn",
    "bio": "<a href='https://www.jn-n.com/'>Website</a>",
    "mobile": true
  },

  "liby2": {
    "number": "09",
    "name": "Can't Run Trip Over Your Fucking Swag",
    "author": "Liby Hays",
    "bio": "is a writer and streetwear designer from Montclair, NJ. Her first graphic novel, <i>Geniacs!</i> should be out sometime in 2020. <a href='http://libyhays.net/'>Website</a>",
    "mobile": false
  },
  "greta": {
    "number": "08",
    "name": "10 Poems",
    "author": "Greta Huang Skagerlind",
    "bio": "is a designer and writer. <a href='http://gskagerlind.com/'>Website</a>",
    "mobile": true
  },
  "liby1": {
    "number": "07",
    "name": "Pissed Pants Academy",
    "author": "Liby Hays",
    "bio": "is a writer and streetwear designer from Montclair, NJ. Her first graphic novel, <i>Geniacs!</i> should be out sometime in 2020. <a href='http://libyhays.net/'>Website</a>",
    "mobile": true
  },
  "jorge1": {
    "number": "06",
    "name": "The Meaning Maker",
    "author": "Jorge Palacios",
    "mobile": true
  },


  "theia": {
    "number": "05",
    "name": "#hot sports girl",
    "author": "Théïa Flynn",
    "mobile": true
  },
  "libby": {
    "number": "04",
    "name": "SPIRAL",
    "author": "Libby Marrs",
    "mobile": true
  },
  "tiger": {
    "number": "03",
    "name": "Ballast",
    "author": "Tiger Dingsun",
    "bio": "is my second language. <a href='https://tiger.exposed/'>Website</a>",
    "mobile": true
  }, 
  "eliza": {
    "number": "02",
    "name": "Third Form: One Month on Testosterone",
    "author": "Eliza Chen",
    "mobile": true
  },
  "sb": {
    "number": "01",
    "name": "Wet Dreams",
    "author": "S.B.",
    "mobile": true
  }
}

var volume;
var synth;
var notes;




var tv;
var th;

$(document).ready(function(event){
  makeLinks();
  tv = setInterval(rotateVertical, 1000);
  th = setInterval(rotateHorizontal, 1200);

  Tone.Master.mute = localStorage.getItem('mute') == 'true' ? true : false;
  let text = Tone.Master.mute ? "SOUND ON" : "MUTE";
  $("#mute-btn").text(text);

  if ( window.location !== window.parent.location ) {	
    $("#mute-btn").hide();
    $("#clockContainer").hide();
    $("#more-info").hide();
    $(".bio").hide();
    Tone.Master.mute = true;
    // The page is in an iframe	
  } else {
  
    // StartAudioContext(Tone.context, window);  
    $(window).click(function(){
      Tone.context.resume();
    });
  
    volume = new Tone.Volume(-12);
    synth = new Tone.PolySynth(7, Tone.Synth).chain(volume, Tone.Master);
    notes = Tone.Frequency("G2").harmonize([0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24, 26, 28, 31, 33, 36, 38]);
  
  }


});

$(window).resize(function(){
  w = $(window).width();
  h = $(window).height();
});

$("#container").on("mouseenter", ".line", function(){
  let i = $(this).index() - 2;
  console.log(i);
  synth.triggerAttackRelease(notes[i], "8n");
});

$("#clockContainer").click(function(){
  $(".about").toggleClass('about-alt');
  $("#th").toggleClass('th-alt');
  $("#linklist").toggleClass('linklist-alt');
  $(".line").toggleClass('line-alt');
  $(".number").toggleClass('number-alt');
  $(".title").toggleClass('title-alt');
  $(".by").toggleClass('by-alt');
  $(".author").toggleClass('author-alt');
  $(".mobile").toggleClass('mobile-alt');
  $(".bio").toggleClass('bio-alt');
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

$("#container").on('mouseenter', '.author', function(){
  if ( window.location == window.parent.location ) {	
    $(".bio").removeClass("bio-show");
    $(this).find(".bio").addClass("bio-show");
  }

});

$("#container").on('mouseleave', '.line', function(){
  $(".bio").removeClass("bio-show");
});

function makeLinks() {

  for (var [key, value] of Object.entries(links)) {
    let title = value.name;
    let author = value.author;
    let number = value.number;
    let bio = value.bio;
    let mobile = value.mobile ? "Yes" : "No";

    let newline = $(`<a class='line' href='${linkBody + key}' target='_top'></a>`);
    newline.append($(`<span class="number">RM–${number}</span>`));
    newline.append($(`<span class="title"><a ">${title}</a></span>`));
    newline.append($(`<span class="by">by</span>`));
    let authorSpan = $(`<span class="author">${author}</span>`);
    if(bio){
      let bioDiv = $(`<div class="bio">${bio}</div>`);
      authorSpan.append(bioDiv);

    }
    newline.append(authorSpan);
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
  localStorage.setItem('mute', Tone.Master.mute);
  $(this).text(Tone.Master.mute ? "SOUND ON" : "MUTE");
});
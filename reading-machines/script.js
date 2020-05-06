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
    "mobile": false
  },
  "greta": {
    "number": "04",
    "name": "10 Poems",
    "author": "Greta Sk"
  },
  "jorge1": {
    "number": "05",
    "name": "The Meaning Maker",
    "author": "Jorge Palacios"
  },
  "jorge2": {
    "number": "06",
    "name": "Glossary of Feelings~~~",
    "author": "Jorge Palacios"
  },
  "justine": {
    "number": "07",
    "name": "7 Poems",
    "author": "Justine Nguyễn-Nguyễn"
  },
  "libby": {
    "number": "08",
    "name": "SPIRAL",
    "author": "Libby Marrs"
  },
  "liby1": {
    "number": "09",
    "name": "Pissed Pants Academy",
    "author": "Liby Hays"
  },
  "liby2": {
    "number": "10",
    "name": "Can't Run Trip Over Your Fucking Swag",
    "author": "Liby Hays"
  },
  "theia": {
    "number": "11",
    "name": "#hot sports girl",
    "author": "Théïa Flynn"
  },
  "tiger": {
    "number": "12",
    "name": "Ballast",
    "author": "Tiger Dingsun"
  },


  
}
$(document).ready(function(event){
  makeLinks();
  setInterval(rotateVertical, 1000);
  setInterval(rotateHorizontal, 2000);
});

$(window).resize(function(){
  w = $(window).width();
  h = $(window).height();
});

function makeLinks() {

  for (var [key, value] of Object.entries(links)) {
    let title = value.name;
    let author = value.author;
    let number = value.number;
    let mobile = value.mobile ? "Yes" : "No";

    let newline = $(`<a class='line' href='${linkBody + key}'></a>`);
    newline.append($(`<span class="number">RM–${number}</span>`));
    newline.append($(`<span class="title"><a ">${title}</a></span>`));
    newline.append($(`<span class="by">by</span>`));
    newline.append($(`<span class="author">${author}</span>`));
    newline.append($(`<span class="mobile">${mobile}</span>`));

    $("#linkList").append(newline);
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
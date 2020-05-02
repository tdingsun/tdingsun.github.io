var w = $(window).width();
var h = $(window).height();
var linkBody = "https://tdingsun.github.io/";
var links = {
  "anonymous": {
    "name": "Untitled",
    "author": "Anonymous"
  },
  "anonymous2": {
    "name": "Itchy, Fulffy, and Incomplete Things",
    "author": "Anonymous"
  },
  "eliza": {
    "name": "Third Form: A First Month on Testosterone",
    "author": "Eliza Chen"
  },
  "eliza": {
    "name": "Third Form: A First Month on Testosterone",
    "author": "Eliza Chen"
  },
  "greta": {
    "name": "10 Poems",
    "author": "Greta Sk"
  },
  "jorge1": {
    "name": "The Meaning Maker",
    "author": "Jorge Palacios"
  },
  "jorge2": {
    "name": "Glossary of Feelings~~~",
    "author": "Jorge Palacios"
  },
  "justine": {
    "name": "7 Poems",
    "author": "Justine Nguyễn-Nguyễn"
  },
  "libby": {
    "name": "SPIRAL",
    "author": "Libby Marrs"
  },
  "liby1": {
    "name": "Pissed Pants Academy",
    "author": "Liby Hays"
  },
  "liby2": {
    "name": "Can't Run Trip Over Your Fucking Swag",
    "author": "Liby Hays"
  },
  "theia": {
    "name": "#hot sports girl",
    "author": "Théïa Flynn"
  },


  
}
$(document).ready(function(event){
  makeLinks();
});

$(window).resize(function(){
  w = $(window).width();
  h = $(window).height();
});

function makeLinks() {
  for (var [key, value] of Object.entries(links)) {
    let newA = $("<a></a>");
    let title = value.name;
    let author = value.author;
    newA.attr("href", linkBody + key);
    newA.text(title + " by " + author);
    $("#container").append(newA);
  }
  
}
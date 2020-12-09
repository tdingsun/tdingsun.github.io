var title = "TITLE";
var author = "Paul Bouigue"
var speed = 250;

var texts = ["au bout des deux piscines, il y a toujours, au centre de la largeur des deux bassins, un escabeau sur lequel est posté quelqu’un qui ressemble à un maître nageur dans un short rouge, qui tient d’une main une canne claire au bout de laquelle pend un grand cercle de bois peint en blanc. Ce qui fait voir que c’est du bois, c’est la tranche beige d’environ 3 centimètres qui n’est pas peinte. Sur ce grand cercle de bois épais, il y a des traits noirs à chaque heure, une grande et une petite aiguille de peinte. Si je m’approche, c’est une horloge, le dos est peint en jaune, si elle tournoie sur le fil, c’est le soleil.",
"le plafond du grand bâtiment années 60 de la piscine est assez haut pour être voûté, le moindre bruit d’eau et de cris résonne jusqu’aux cabines; dans les bassins, ce qui donne la sensation d’un miroir, c’est le plafond bleu comme celui d’une église que l’on viendrait de repeindre : orné de dorures d’anges, d’étoiles et de fleurs le long de la structure gothique en briquette rouge; parfois il goûte à cause de l’humidité et de la condensation, on dirait qu’il se décolle, ce qui est amusant pour une piscine.",
"dans le bassin principal, lorsque je nage, je vois au fond une grande mosaïque de couleur terre rouge (le même rouge que le ventre des linottes) dont chacun des carrés qui la constitue est cerné de blanc. Lorsque je passe au-dessus et que j’ouvre les yeux, je vois les carrés serpenter, comme ~ si ~ uniquement ~ la ~ ligne ~ horizontale ~ qui ~ les ~ encadre ~ était ~ de ~ travers, ~ complètement ~ de ~ traviole ~ même à onduler à cause d’un phénomène entre le soleil, l’air et l’eau. Puis lorsque je sors de l’eau et que je regarde la mosaïque debout sur le rebord de la piscine, elle fuit vers l’horizon, les carrés sont encore ondulés mais cette fois ils ne bougent pas.",
"il y a quatre mètres de cabine à rayure jaunes de chaque côté de l’allée principale, comme à la plage; huit salles avec deux sèche-cheveux au bout; le sol carrelé grisâtre est en pente vers un trou au centre de la pièce — pour que l’eau continue de s’écouler de mon maillot que je presse —, presque trop pentu, de telle manière qu’il faut être sur la pointe des pieds pour se sentir parallèle à la terre. Mais lorsque l’on est sur la pointe des pieds dans une cabine, la tête dépasse à coup sur."
];
var wDivs = [];

var tv;
var th;

///TONE.JS STUFF
var volume = new Tone.Volume(-12);
var synth = new Tone.PolySynth(5, Tone.Synth).chain(volume, Tone.Master);
synth.set({
  oscillator: {
  type: "sine"
  },
  envelope: {
    attack: '0.05'
  }
});
var notes = [];
notes.push(Tone.Frequency("G2").harmonize([4, 5, 7, 11, 12, 16, 19, 24, 28, 31, 36]));
notes.push(Tone.Frequency("F2").harmonize([4, 5, 7, 11, 12, 16, 19, 24, 28, 31, 36]));
notes.push(Tone.Frequency("D2").harmonize([4, 5, 7, 11, 12, 16, 19, 24, 28, 31, 36]));
notes.push(Tone.Frequency("C2").harmonize([4, 5, 7, 11, 12, 16, 19, 24, 28, 31, 36]));

//have to click to start audio context
StartAudioContext(Tone.context, window);

//MAIN FUNCTION
$(document).ready(function(event){
  //mute setting retrieval
  Tone.Master.mute = localStorage.getItem('mute') == 'true' ? true : false;
  let text = Tone.Master.mute ? "SOUND ON" : "MUTE";
  $("#mute-btn").text(text);

  displayTitle(title, author);

  tv = setInterval(rotateVertical, 1000);
  th = setInterval(rotateHorizontal, 2000);

  $(window).click(function () {
    Tone.context.resume();
  })

  makeGrid(10, 20);
});

function makeGrid(x, y) {
  let w = 100/x;
  let h = 100/y

  for(let i = 0; i < y-1; i++){
    let row = $('<div></div>').addClass('row');
    let rowlength = (i % 2 == 0) ? x-1 : x;
    for(let j = 0; j < rowlength; j++){
      let box = $('<div></div>').addClass('grid-box');
      box.css({
        "width": `calc(${w}vw - 3px)`,
        "height": `${h}vh`,
      });
      row.append(box);
    }
    $('#background').append(row);

  }
}

function initText(p){
  wDivs = [];
  let paragraph = $("<div></div>").addClass('paragraph');
  $('#container').append(paragraph);
  if(p < texts.length){
    let words = texts[p].split(" ");
    for(let i = 0; i < words.length; i++){
      let wDiv = $("<div></div>").addClass('word').addClass(`word-${p}`);
      let word = words[i];
      wDiv.text(word);
      paragraph.append(wDiv);
      wDivs.push(wDiv);
    }
    setTimeout(startAnimation, 1000, 0, p); 
  }
}

function startAnimation(i, p) {
  let div = wDivs[i];

  if(i > 0){
    wDivs[i-1].removeClass('last');
  }
  div.addClass('last');
  
  if(Math.random() < 0.5){
    div.css({
      "animation": `wave 20s ease-in-out infinite`
    });
  } else {
    div.css({
      "animation": `wave-2 20s ease-in-out infinite`
    });
  }

  let randNote = Math.floor(Math.random() * notes[p].length);
  synth.triggerAttackRelease(notes[p][randNote], "1n");


  if(i < wDivs.length - 1){
    let nextWord = wDivs[i+1].text();
  
    var syllables = RiTa.getSyllables(nextWord);
    var syllables_arr = syllables.split("/");
    var time = syllables_arr.length * speed;

    setTimeout(startAnimation, time, i+1, p);
  } else {
    setTimeout(function(){
      $('.word').removeClass('last');
    }, 1000);
    setTimeout(initText, speed, p+1);
  }
}

// Common
function displayTitle(title, author){
  $("#title").html(title + "<br>by " + author);
  setTimeout(() => {
    $("#title").addClass("title-small");
    initText(0);
  }, 1500);
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

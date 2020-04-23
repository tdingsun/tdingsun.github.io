function transformScroll(event) {
  if (!event.deltaY) {
    return;
  }
  event.preventDefault();
  event.currentTarget.scrollLeft += event.deltaY;
}

var element = document.getElementById("container")
element.addEventListener("wheel", transformScroll);


var width;
var height;
var title = "Third Form:<br>A First Month on Testosterone";
var author = "Eliza Chen"
var speed = 750;
var hist = [];
var limit = 12;
var offset = (limit) / 2 - 1;

var str = "Up until the moment * the needle entered my body * and I pushed down the syringe plunger, * I didn’t think it would happen. * I honestly thought * I could go through * the entire process: * make an appointment, * show up, * answer every question, * nod * and * nod  *and * yes, * and even at the * final moment, * I didn’t think, * somehow, * that they’d let me have * the T. * But I am here, * post, * and for the first time * there is in my body * some Gender Liquid. * Steroid oil * with mallets * or triggers * that impact cells, * membranes, * and other * constitutive objects * until they change * in their behaviors. * I expect my surface * will swell * or compress * until I look, * blessedly, * different. * Different how? * Different from now * in a critical, * meaningful way. * The change * has no shape * I can anticipate * or describe. * How do you know * what you’ll look like * when you grow up? * It’s only * when you look back * (photograph) * that you can tell * who you’ll become. * When I look * at pictures * of my old, tiny self * (fine-haired * childhood me) * I cannot * trace the arc * which cast me * into my present form. * I can’t tell * how the course might look * if it were aimed * at a different target. * Four weeks pass * and what do they contain?  * Oil, stenches, heat. * My face * is tacky with shine. * I’ve started * smelling strange. * It’s myself, * so I can’t escape, * but it’s bizarre * to be out-wafting * a combination of * sour candy, * wet dog, * and damp hand. * I’m always wearing * one layer too many, * even when I’m shirtless in bed. * Maybe it should be legal * for women * or people with feminizing hormones * to be on some version  * of speed, * because the T * gives me more energy * than I’ve possibly ever had. * One month in * and all I have * are rigs * for my impatience. * I am filled with a * jaw-snapping, * tooth-clacking, * drool-roping * impatience * for any given thing. * Nothing is enough. * Everything is too much. * My voice, * it’s just on the edge, * I hope, * of changing. * I have newly discovered * that I might prefer to be a man. * The directness of this * had never occurred to me. * My therapist asks: * when did you * get the sense * that to be a trans man * would mean * to have * a limited life? * The TERFs, * I whisper. * Other men, * I whisper. * I am so afraid of * everything, * a fear that rankles * my masculine pride. * I — I — I ... I ... I I * I am * (trapped?) * inside a * (box?) * where I am * (rotting?) * because I have * (locked?)  * myself in * (???) * ... * I am filled * with a * rabid eagerness * for change, * but they’re * curds of thoughts, * pre-product granules: * formless, * rustling, embarrassed, * confused. * I have never * embarked on * any task * whose outcome * is more unknown. * I am desperate * and, * characteristically, * whatever cure there is * cannot be hurried along. * ... * ... * ... * ... * ";
var words_arr = str.split("*");
var word_index = 0;


var synth = new Tone.PolySynth(4, Tone.Synth).toMaster();
var notes = Tone.Frequency("F2").harmonize([0, 4, 7, 11, 14, 17, 21, 24, 28, 31, 35, 36]);

StartAudioContext(Tone.context, 'div').then(function(){
  //started
  console.log("clicked");

});


$(document).ready(function(event){
  width = $(window).innerWidth();
  height = $(window).innerHeight();
  displayTitle(title, author);
  setTimeout(function(){
    $("#title").css({
      color: "thistle"
    });
  }, 2000);
  setInterval(rotateVertical, 1000);
  setInterval(rotateHorizontal, 2000);
  setTimeout(timer, 2000);
});





function displayTitle(title, author){
  $("#title").html(title + "<br>by " + author);
}



function timer() {
  var randNote = word_index % notes.length;
  synth.triggerAttackRelease(notes[randNote], "1n");

  let word = words_arr[word_index];
  let newDiv = $("<div class='text'></div");
  newDiv.text(word);
  hist.push(newDiv);
  $("#container").append(newDiv);

  if (hist.length >= limit){
    hist.shift();
  }

  hist.forEach(function(element, index){
    let size = 170 - 30*(Math.abs(index - offset));
    element.css({
      "font-size": `${size}px`
    });
  });

  word_index++;

  newDiv.get(0).scrollIntoView({behavior: "smooth", block: "center", inline: "center"});

  if(word_index < words_arr.length){
    setTimeout(timer, speed);
  } else {
    setTimeout(ending, 1000);
  }
}

function ending(){
  $("#title").css({
    color: "khaki"
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
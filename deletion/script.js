var width = $(window).width();
var height = $(window).height();
var divWidth;
const fontsize = $("body").css("font-size");

var text_array = RiTa.splitSentences("It Feels Like Floating. A dull ache — laughter. Miraculous night, silent night, holy night, holy trinity, as I look up into the star-filled sky, forgive me for I have lied. Lied in order to get what I want. Made concessions but not amends. Making split-second decisions and pretending that that was the plan all along. Wanting to seem independent but all actions rely on someone else’s movements. Words coded in such a way so as to reflect well on the speaker. Words that make you seem smart. Imagine a grotto. Something revealed at low tides when the water rushes back to the sea. Standing in three inches of ice cold water. Drips on your shoulder. A casual sign. A cinematic moment. A thin membrane. In front of you is the craggy opening, revealing the midnight ocean gleaming under the light of the full moon. The stars are in perfect alignment with each other. Gleaming. Foam and detritus wrap around your ankles. Seaweed creeps up your calves. Dragonflies buzz, graze past your ear. A myriad of sighs from last year. Hushed tones. The particular articulations of a French pop star singing in English. Hidden energy. Tidal water, cesspool. Crumbling limestone. If you licked, it would taste salty. Residual particles. Encrusted. Growths. The true cesspool of hum. A take — sea caves, twinkling but slow. Localized arrhythmia. Constellations … something special about the beach. Grain after grain after grain. A beaded necklace. Moments strung together. Pale yellow. Cornflower blue. Peach. Lavender. Beige. Orange. Indigo. Forest green. Red. Amber. Cerulean. Eucalyptus. Cedarwood. Lichen. Algae. Something to be said about the way it feels — not real — when drifting (in and out, like tides) like in and out of a fever dream. It must feel like how it feels to stop playing a video game. Suddenly everything is rendered inconsequential. Not relevant anymore. But time remains so terrifying to me. The thought one day my bones will be exposed to bare dirt. My skin should sag and reach the ground.There is no longer a desire to say anything novel. There is only the desire to reiterate old cliches, to dwell in tropes, to relish in trite sentiments. There is nothing to say because nothing ever happens. I vow to abhor world-building in favor of complete self-annihilation. I will always be unresolved, and the feeling of not being will always be—");


var timer_queue = [];
var numDivs = text_array.length;

var synth = new Tone.PolySynth(8, Tone.Synth).toMaster();
var notes = Tone.Frequency("G1").harmonize([0, 2, 5, 7, 9, 12]);

StartAudioContext(Tone.context, 'div').then(function(){
  //started
  console.log("clicked");

});

//have to click to start audio context
$('div').click(function(){
  //Tone.start();
  console.log("clicked");
});

$(document).ready(function(event){
  setupDivs();

  $(".block").click(function(){
  	$(this).remove();
  })

  for(let i = 0; i < timer_queue.length; i+=4){
  	var randTime = Math.floor(Math.random() * 5000) + 500;
  	setInterval(timer, randTime, i);
  }
});

function setupDivs(){
  width = $(window).width();
  height = $(window).height();


  for(let i = 0; i < numDivs; i++){
  	var randW = Math.floor(Math.random() * width * 0.33) + 100;
 	  var randH = Math.floor(Math.random() * height * 0.33) + 100;
    var newDiv = $('<div />').addClass("block");
    var text = text_array[i];
    newDiv.text(text);
      $("#container").append(newDiv);
      newDiv.css({
        width: randW,
        padding: "30px",
        "padding-bottom": "30px"
        // height: randH + "vh"
      });

      var innerTimer_1 = $("<div />").addClass("innertimer");
      innerTimer_1.css({
      	position: "absolute",
      	top: "5px",
      	left: "5px",
      	"text-align": "left",
      });
      innerTimer_1.text("10");

      var innerTimer_2 = $("<div />").addClass("innertimer");
      innerTimer_2.css({
      	position: "absolute",
      	top: "5px",
      	right: "5px",
      	"text-align": "right",
      });
      innerTimer_2.text("10");

      var innerTimer_3 = $("<div />").addClass("innertimer");
      innerTimer_3.css({
      	position: "absolute",
      	bottom: "5px",
      	left: "5px",
      	"text-align": "left",
      });
      innerTimer_3.text("10");

      var innerTimer_4 = $("<div />").addClass("innertimer");
      innerTimer_4.css({
      	position: "absolute",
      	bottom: "5px",
      	right: "5px",
      	"text-align": "right",
      });
      innerTimer_4.text("10");



      newDiv.append(innerTimer_1);
      newDiv.append(innerTimer_2);
      newDiv.append(innerTimer_3);
      newDiv.append(innerTimer_4);


      timer_queue.push(innerTimer_1);
      timer_queue.push(innerTimer_2);
      timer_queue.push(innerTimer_3);
      timer_queue.push(innerTimer_4);

  }
}

function timer(index) {


  var text = parseInt(timer_queue[index].text());
  for(var i = 0; i < 4; i++){
  	  timer_queue[index + i].text(text - 1);
  }
  if(text == 1){

  	setTimeout(function(){
  		var randNote = Math.floor(Math.random() * notes.length);
  		synth.triggerAttackRelease(notes[randNote], "8n");
  		timer_queue[index].parent().remove();
  	}, 450);
  }
}


function resize(){
  width = $(window).width();
  height = $(window).height();
}
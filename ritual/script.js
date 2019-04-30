var width;
var height;
var numRows = 5;
var fontsize = parseInt($("body").css("font-size"));
var str = "Light as a feather Stiff as a board";
var words_arr = str.split(" ");

var leftSideIndex = 0;
var rightSideIndex = 1;
var centerIndex = 0;
var demonArray = ["Amon", "Abaddon", "Abezethibou", "Abraxas", "Abyzou", "Adrammelech", "Aeshma", "Agaliarept", "Agares", "Agiel", "Angra Mainyu", "Aim", "Alastor", "Amaymon", "Andromalius", "Anti", "Antichrist", "Anzu", "Apophis", "Armaros", "Archon", "Arunasura", "Asag", "Asakku", "Asb'el", "Asmodeus", "Astaroth", "Asura", "Azazel", "Baal", "Bakasura", "Baku", "Banshee", "Baphomet", "Barbatos", "Beelzebub", "Behemoth", "Belial", "Beleth", "Belphegor", "Berith", "Bifrons", "Botis", "Buer", "Caim", "Charun", "Chemosh", "Cimejes", "Corson", "Dagon", "Dantalion", "Danjal", "Decarabia", "Demiurge", "Demogorgon", "Devil", "Eblis", "Eligos", "Eisheth", "Erlik", "Focalor", "Foras", "Forneus", "Furfur", "Gaap", "Gaki", "Gamigin", "Ghoul", "Gorgon", "Gremory", "Grigori", "Gualichu", "Haagenti", "Hades", "Halphas", "Haures", "Ifrit", "Incubus", "Ipos", "Jinn", "Jikininki", "Leviathan", "Lilith", "Lucifer", "Malphas", "Mammon", "Mara", "Maricha", "Mephistopheles", "Merihem", "Naamah", "Oni", "Orcus", "Oriax", "Orobas", "Paimon", "Pazuzu", "Pelesit", "Pithius", "Puloman", "Rahab", "Raum", "Ryuk", "Samael", "Satan", "Set", "Seir", "Shaitan", "Silver", "Stolas", "Succubus", "Shinigami", "Vassago", "Wendigo", "Ziminiar"];
var poemArray = ["Listen to the sound of the ocean", "Draw lines in the sand", "Glisten in the round of the forbidden", "Thaw rinds in the band", "Frission in the bide of the hidden", "Raw hides marked with fans", "Incision in the side of the hand", "Fawn dies harkens red clan", "Derision in the eyes of each man", "Dawn climbs darkens weak minds"];

var ms = 0;

var word_index = 0;
var row_index = 0;
var wordSpeed = 1000;

var beat_intervalID;
var timer_intervalID;
var setTimer_intervalID;
var setSides_intervalID;
var setCenter_intervalID;

var synth = new Tone.PolySynth(8, Tone.Synth).toMaster();
var notes = Tone.Frequency("C1").harmonize([0, 3, 7, 11, 13]);
var noise = new Tone.Noise("brown").start();
var autoFilter = new Tone.AutoFilter({
	"frequency" : "4m",
	"depth": 0.2,
	"min" : 200,
	"max" : 800
}).connect(Tone.Master);

//connect the noise
noise.connect(autoFilter);
//start the autofilter LFO
autoFilter.start()

StartAudioContext(Tone.context, 'div');
//have to click to start audio context
$('div').click(function(){
	Tone.start();
});



$(document).ready(function(event){
  setupDivs();
  resize();

  setTimer_intervalID = setInterval(setTimer, 50);
  setInterval(raiseTone, 3000);
  setTimeout(beat, wordSpeed);
  setTimeout(timer, 1000);
  setTimeout(function(){
  	setSides_intervalID = setInterval(setSides, 250);
  	setCenter_intervalID = setInterval(setCenter, 2000);
  }, 1000);


  $("#black_pane").css({
  	opacity: 0,
  });

  $("#center").draggable({
  });

});

$(window).resize(function(){
	resize();
});

function setupDivs(){
	for(var i = 0; i < numRows; i++){
		var newDiv = $("<div>");
		newDiv.addClass("line");
		$("#center").append(newDiv);
	}
}

function timer() {
	resize();
	//play  notes
	var randNote = Math.floor(Math.random() * notes.length);
	synth.triggerAttackRelease(notes[randNote], "1n");
	
 	//display next word
 	$(".line").eq(row_index).text(words_arr[word_index]);

 	 //increase font size and change font
	fontsize += 0.5;
	$("body").css("font-size", fontsize);
	var randFont = Math.random();
	if(randFont >= 0.5){
		$(".line").eq(row_index).css({"font-family": "cursive"});
	} else {
		$(".line").eq(row_index).css({"font-family": "sans-serif"});
	}

 	//increase row_index
 	row_index++;
 	if(row_index >= numRows){
 		row_index = 0;
 	}

	//increase word index
	word_index++;
	if(word_index >= words_arr.length){
		word_index = 0;
	}

	timer_intervalID = setTimeout(timer, wordSpeed);
}

function jumpScare(){
	var newDiv = $("<div>");
	newDiv.addClass("jump");
	newDiv.text("JUMP");
	newDiv.css({
		position: "fixed",
		width: width,
		height: height,
		background: "red",
		color: "black",
		top: 0,
		left: 0,
		"font-size": width/3.25,
	});
	$("body").append(newDiv);
	noise.start();
	synth.triggerAttackRelease("A4", "1n");

	setInterval(function(){
		$(".jump").remove();
		noise.stop();
	}, 250);
	setTimeout(function(){
		clearInterval(setTimer_intervalID);
  		clearInterval(beat_intervalID);
		clearInterval(timer_intervalID);
		clearInterval(setCenter_intervalID);
		clearInterval(setSides_intervalID);
		noise.stop();
		Tone.stop();
		$("#center").remove();
	}, 3000);

}


function beat(){
	synth.triggerAttackRelease("G2", "8n");
	if(wordSpeed >= 15 && wordSpeed != 0){
		wordSpeed *= 0.99;
	} else {
		setTimeout(function(){
			jumpScare();
		}, 3000);
	}
	beat_intervalID = setTimeout(beat, wordSpeed);
}

function raiseTone(){
	console.log("hi");
	for(var i = 0; i < notes.length; i++){
		notes[i] = notes[i].transpose(1);
	}
}


function resize(){
	width = $(window).width();
	height = $(window).height();
	var divWidth = parseInt($("#center").width());
	var divHeight = parseInt($("#center").height());
	$("body").css("font-size", fontsize);

	$("#center").css({
		left: (width-divWidth)*0.5,
		top: (height-divHeight)*0.5
	}); 
}

function setTimer(){
  $("#timer").text(ms);
  ms += 1;
  if(ms == 2001){
  	synth.triggerAttackRelease("A4", "1m");
  	$("#center").remove();
  	clearInterval(setTimer_intervalID);
  	clearInterval(beat_intervalID);
	clearInterval(timer_intervalID);
	clearInterval(setCenter_intervalID);
	clearInterval(setSides_intervalID);
	noise.stop();
	Tone.stop();

  }
}

function setSides(){
	synth.triggerAttackRelease("E3", "4n");
	$("#leftText").text(demonArray[leftSideIndex]);
	$("#rightText").text(demonArray[rightSideIndex]);
	leftSideIndex+=2;
	rightSideIndex+=2;
	if(leftSideIndex >= demonArray.length){
		leftSideIndex = 0;
	}
	if(rightSideIndex >= demonArray.length){
		rightSideIndex = 1;
	}
}

function setCenter(){
	synth.triggerAttackRelease("A4", "3n");

	$("#centerText").text(poemArray[centerIndex]);
	centerIndex++;
	if(centerIndex == poemArray.length){
		centerIndex = 0;
	}
}
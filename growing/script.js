class SObject {
	constructor(div, xdir, ydir) {
		this.div = div;
		this.xdir = xdir;
		this.ydir = ydir;
	}

	move() {
		var left = parseFloat(this.div.css("left"));
		var top = parseFloat(this.div.css("top"));
		var divheight = parseFloat(this.div.css("height"));
		var divwidth = parseFloat(this.div.css("width"));

		if(left <= margin || left >= (width - (margin + divwidth))){
			this.xdir *= -1;
			if(left <= margin){
				left = margin + 1;
				console.log("hi");
			}
			if(left >= (width - (margin + divwidth))){
				left = (width - (margin + divwidth + 1));
				console.log("yo");

			}
		}

		if(top <= margin || top >= (height - (margin + divheight))){
			if(top <= margin){
				top = margin + 1;
			}
			if(top >= (height - (margin + divheight))){
				top = (height - (margin + divheight + 1));
			}
			this.ydir *= -1;
		}

		this.div.css({
			left: left + this.xdir,
			top: top + this.ydir
		});
	}
}

var width;
var height;
var divWidth;
const margin = 20;
var fontsize = parseInt($("body").css("font-size"));
var str = "Edited Airplane Poem: Always so depressing in the cramped isolation of a 6 hour flight, the recycled air pushes you further and further within yourself. Being ten thousand feet in the air, you see your entire life stretching out in all directions, and your tired and frazzled brain can only pass the time by taking stock of everything you’ve ever done, everything you’ve ever thought, everyone you’ve ever met. You tell yourself that it’s a depression that you crave, this vast and lonesome introspection. You tell yourself that it’s useful to take inventory: who do you love, who do you want to spend time with, what’s stopping you... Maybe this line of thought is helpful, maybe it’s not. There’s no way to tell right now. Leave the room. Figure A goes to the other room to pretend to take a nap. Figure A feels disappointed always. There is nothing left but disappointment. As A lies in bed alone, A hears Figure B talking to Figure C, talking and laughing, outside the room. Eventually the voices quiet and A suspects that B and C have left. Figure A has decided not to feel this way anymore. Above all, A refuses to do things that makes A feel pathetic. A thinks B is so cute! A thinks that everything B does is so cute, that every part of B’s body, and mannerisms, are so cute. A feels like A will always love B. B is like the cutest puppy, and at the same time a brother, and at the same time the cutest cat. A feels like this is working. A is optimistic that this is enough. A rereads the notes A had started writing since about a year ago, up until yesterday. Always there is a level of remove. A hated the idea of seeing A’s entire life stretched out in front of them. A hates making mistakes. A loves emptiness and feels a deep affiliation with the void. A does not think this is incompatible with the pursuit of a fulfilling life. A realizes that some people may not understand this. A methodically rips each page of notes into smaller and smaller bits, and throws them all away.";
var words_arr = str.split(" ");
var word_index = 0;
var position_index = 0;
var syllable_count = 1;
const speed = 1;
const wordSpeed = 250;
var s_objects = [];
setupSObjects();

var synth = new Tone.PolySynth(5, Tone.Synth).toMaster();
var notes = Tone.Frequency("C3").harmonize([0, 4, 7, 12]);

StartAudioContext(Tone.context, 'div');

//have to click to start audio context
$('div').click(function(){
	Tone.start();
});

$(document).ready(function(event){
  resize();
  setInterval(syllableCount, wordSpeed/5);
  setInterval(beat, wordSpeed);
  setTimeout(timer, 1000);

});

$(window).resize(function(){
	resize();
});

function timer(prevIndex) {
	syllable_count = 0;
	//play music notes
	var randNote = Math.floor(Math.random() * notes.length);
	synth.triggerAttackRelease(notes[randNote], "1n");

 	//display next word
 	$("#center").text(words_arr[word_index]);
  	word_index++;

 	//number of syllables determines timeout time
	var syllables = RiTa.getSyllables(words_arr[word_index - 1]);
	var syllables_arr = syllables.split("/");
	var time = syllables_arr.length * wordSpeed;

	if(word_index <= 3){
		time = 1000;
	 } else if(word_index == 4){
	 	time = 500;
	 }

	if(word_index == 125){
	 	$("body").css("background-color", "CornflowerBlue");
	 	$("body").css("color", "white");
	 	notes = Tone.Frequency("C4").harmonize([0, 4, 7, 12]);
	    time = 1000; //force to linger of first word of second section
	}

	fontsize += 0.5;
	$("body").css("font-size", fontsize);

	$("#center").css({
		left: 0,
		top:  height/2 - fontsize/2,
		height: fontsize
	}); 

	if(word_index < words_arr.length){
		var t = setTimeout(timer, time, 0);
	}
}

function syllableCount(){
	$(".index").text(Math.floor(syllable_count/5) + 1);
	syllable_count += 1;
	for(let i = 0; i < 4; i++){
		s_objects[i].move();
	}
}

function beat(){
	synth.triggerAttackRelease("G2", "8n");
}

function resize(){
	width = $(window).width();
	height = $(window).height();
	divWidth = width/3 - margin;
	$("body").css("font-size", fontsize);

	$("#center").css({
		left: 0,
		top:  height/2 - fontsize/2,
		height: fontsize
	}); 

	$("#index-1").css({
		top: height - (fontsize + margin)
	});

	$("#index-2").css({
		top: margin
	});

	$("#index-3").css({
		top: margin
	});

	$("#index-4").css({
		top: height - (fontsize + margin)
	});
}

function setupSObjects(){
	var s_object_1 = new SObject($("#index-1"), speed + 0.33, -speed - 0.66);
	var s_object_2 = new SObject($("#index-2"), speed - 0.33, -speed + 0.66);
	var s_object_3 = new SObject($("#index-3"), speed + 0.66, -speed - 0.33);
	var s_object_4 = new SObject($("#index-4"), speed - 0.66, -speed + 0.33);
	s_objects = [s_object_1, s_object_2, s_object_3, s_object_4];
}
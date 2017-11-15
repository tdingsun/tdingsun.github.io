var nouns = ["people", "rain", "a drizzle", "a hurricane"];

function setup() {
	createCanvas(windowWidth, windowHeight);
}


function draw() {
	background(255,255,255);

	//every 1.5 seconds
	if(frameCount % 90 == 0){

		var rand = int(random(4));

		//the first two nouns are plural nouns
		if(rand < 2){
			nouns[rand] = RiTa.randomWord("nns");

		} else if(rand >= 2){ //the second two nouns are singluar nouns
			var newNoun = RiTa.randomWord("nn");
			//test if noun should start with 'a' or 'an'
			if(newNoun.startsWith("a") || newNoun.startsWith("e") || newNoun.startsWith("i") || newNoun.startsWith("o") || newNoun.startsWith("u")){
				nouns[rand] = "an " + newNoun;
			} else {
				nouns[rand] = "a " + newNOun;
			}
		}

	}
	//set each noun as the newly generated noun
	document.getElementById("one").innerHTML = nouns[0];
	document.getElementById("two").innerHTML = nouns[1];
	document.getElementById("three").innerHTML = nouns[2];
	document.getElementById("four").innerHTML = nouns[3];

	//if one of the four nouns are clicked, reset them.
	document.getElementById("one").onmousedown = function() {
		nouns[0] = "people"
	};

	document.getElementById("two").onmousedown = function() {
		nouns[1] = "rain"
	};

	document.getElementById("three").onmousedown = function() {
		nouns[2] = "a drizzle"
	};
	document.getElementById("four").onmousedown = function() {
		nouns[3] = "a hurricane"
	};

}





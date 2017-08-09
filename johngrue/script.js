//var wordArray = [];
var nouns = ["people", "rain", "a drizzle", "a hurricane"];
// var leading = 55;
// var leftMargin = 100;
// var topMargin = 100;

function setup() {
	createCanvas(windowWidth, windowHeight);
	//wordArray = RiTa.alliterations("cat", 10);
}

function draw() {
	background(255,255,255);
	//textSize(50);
	//textAlign(CENTER);
	// for(var i = 0; i < 10; i++){

	// 	text(wordArray[i], leftMargin, topMargin+leading*i);
	// }

	if(frameCount % 90 == 0){
		// var newArray = RiTa.alliterations("cat", 1);
		// wordArray[int(random(10))] = newArray[0];


		var rand = int(random(4));

		if(rand < 2){
			nouns[rand] = RiTa.randomWord("nns");

		} else if(rand == 2){
			var newThree = RiTa.randomWord("nn");
			if(newThree.startsWith("a") || newThree.startsWith("e") || newThree.startsWith("i") || newThree.startsWith("o") || newThree.startsWith("u")){
				nouns[2] = "an " + newThree;
			} else {
				nouns[2] = "a " + newThree;
			}
		} else if(rand == 3){
			var newFour = RiTa.randomWord("nn");
			if(newFour.startsWith("a") || newFour.startsWith("e") || newFour.startsWith("i") || newFour.startsWith("o") || newFour.startsWith("u")){
				nouns[3] = "an " + newFour;
			} else {
				nouns[3] = "a " + newFour;
			}
		}

	}

	// if (windowWidth > 550){
	// 	text("If " + nouns[0] + " were " + nouns[1] + ",\nI was " + nouns[2] + " and she was " + nouns[3] + ".", windowWidth/2, windowHeight/2 - 100);
	// 	text("- John Green", 3*windowWidth/4, windowHeight/2 + 100);
	// } else {
	// 	textSize(30);
	// 	textAlign(LEFT);
	// 	text("If " + nouns[0] + "\nwere " + nouns[1] + ",\nI was " + nouns[2] + "\nand she was\n" + nouns[3] + ".", windowWidth/6, windowHeight/2 - 100);
	// 	text("- John Green", windowWidth/3, 3*windowHeight/4);
	// }

	document.getElementById("one").innerHTML = nouns[0];
	document.getElementById("two").innerHTML = nouns[1];
	document.getElementById("three").innerHTML = nouns[2];
	document.getElementById("four").innerHTML = nouns[3];

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





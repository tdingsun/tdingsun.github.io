var wordArray = [];
var nouns = ["people", "rain", "a drizzle", "a hurricane"];
var nounOne = "people";
var nounTwo = "rain";
var nounThree = "a drizzle";
var nounFour = "a hurricane";
var leading = 55;
var leftMargin = 100;
var topMargin = 100;

function setup() {
	createCanvas(windowWidth, windowHeight);
	wordArray = RiTa.alliterations("cat", 10);
	print("works");
	print(wordArray);
}

function draw() {
	background(255,255,255);
	textSize(50);
	textAlign(CENTER);
	// for(var i = 0; i < 10; i++){

	// 	text(wordArray[i], leftMargin, topMargin+leading*i);
	// }

	if(frameCount % 60 == 0){
		// var newArray = RiTa.alliterations("cat", 1);
		// wordArray[int(random(10))] = newArray[0];


		var rand = int(random(4));

		if(rand < 2){
			nouns[int(random(2))] = RiTa.randomWord("nns");

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

	text("If " + nouns[0] + " were " + nouns[1] + ",\nI was " + nouns[2] + " and she was " + nouns[3] + ".", windowWidth/2, windowHeight/2 - 100);
	text("- John Green", windowWidth/2 + 300, windowHeight/2 + 100);
}



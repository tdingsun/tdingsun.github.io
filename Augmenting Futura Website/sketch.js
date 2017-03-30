var textArray = ["QUEER— FUTURA", "FEMME— FUTURA", "TRANS— FUTURA", "AFRO— FUTURA", "LATINX— FUTURA", "INDIGENOUS— FUTURA", "ASIA— FUTURA", "WHOSE UTOPIA?", "WHOSE FUTURE?", "WHOSE FUTURA?"];
var randArray = [];
var randOrientation = [1,2,3,4];
var startAmount = 1;
var speed = 2;
var amount = startAmount;
var step = 1;
var count = 0;
var limit = 100;

function setup() {
	for (var i = 0; i <= (startAmount - 1); i++) {
		append(randArray, random(windowHeight));
		append(randArray, random(windowWidth));
		append(randArray, random(-speed, speed));
		append(randArray, random(-speed, speed));
		append(randArray, random(randOrientation));
	}

	createCanvas(windowWidth,windowHeight);
}

function draw() {
	background(247,148,30);

	//draw half of the elbows behind text
	for(var i = 0; i <= (randArray.length/2 - (randArray.length/2 % 5)); i += 5){
		elbow(randArray[i], randArray[i+1], randArray[i+4]);
	}

	//text
	textSize(20);
	noStroke();
	fill(0);
	text("AUGMENTING FUTURA:\nRECLAIMING FUTURITY \nTHROUGH \nTYPOGRAPHIC \nINTERVENTION", 100, windowHeight - 210);
	fill(255);
	text("DISCUSSION + \nTYPOGRAPHY \nWORKSHOP", 380, windowHeight - 210);
	text("JANUARY 24, 2018 \n6:00 PM – 8:00 PM \nFREE AND OPEN \nTO THE PUBLIC", 560, windowHeight - 210);
	text("PROVIDENCE \nPUBLIC LIBRARY \n150 EMPIRE STREET", 790, windowHeight - 210);		
	t(100,100, count);

	//draw other half of the elbows in front of text
	for(var i = (randArray.length/2 - (randArray.length/2 % 5)); i <= (randArray.length - 1); i += 5){
		elbow(randArray[i], randArray[i+1], randArray[i+4]);
	}

	//adds more elbows every second unless there are more elbows than the limit
	if(frameCount % 60 == 0){
		if(amount < limit){
			for(var i = 0; i <= (randArray.length - 1); i += 5){
				randArray[i] = random(windowWidth);
				randArray[i+1] = random(windowHeight);
			}
			addElbow(step);
		}
		count++;

	//in the meantime, make the elbows move in a random direction at a random speed
	} else {
		for(var i = 0; i <= (randArray.length - 1); i += 5){
			randArray[i] = randArray[i] + randArray[i+2];
			randArray[i+1] = randArray[i+1] + randArray[i+3];
		}
	}

	//reset counter
	if(count == textArray.length){
		count = 0;
	}
}

//make an elbow
function elbow(x,y, o) {
	noFill();
	stroke(255);
	strokeCap(SQUARE);
	strokeWeight(25);
	if(o == 1){
		arc(x,y,100,100, 0, HALF_PI);
	} else if (o == 2){
		arc(x,y,100,100, HALF_PI, PI);
	} else if (o == 3){
		arc(x,y,100,100, PI, HALF_PI + PI);
	} else {
		arc(x,y,100,100, HALF_PI + PI, TWO_PI);
	}
}

//cycle through main text
function t(x,y,i) {
	fill(0);
	noStroke();
	if(windowWidth/9 > 100){
		textSize(windowWidth/9);	
	} else{
		textSize(100);
	}
	textFont('FuturaStd-BoldOblique');
	text(textArray[i], x, y, 500, 500);
	textSize(25);
}

//helper method to add elbow
function addElbow(x){
	for(i = 0; i < x; i++){
		append(randArray, random(windowHeight));
		append(randArray, random(windowWidth));
		append(randArray, random(-speed, speed));
		append(randArray, random(-speed, speed));
		append(randArray, random(randOrientation));
	}
	amount += x;
}

//resizing window resizes canvas
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
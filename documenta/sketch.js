var xArray = [880, 919, 958, 998, 1037, 1077, 1116, 1156, 1195, 1233, 
				1249, 1231, 1223, 1191, 1152, 1112, 1073, 1034, 994, 955, 
				930, 915, 904, 894, 883, 867, 

				903, 938, 976, 1015, 
				1055, 1094, 1132, 1167, 1199, 1225, 1247, 1263, 1273, 1280, 
				1281, 1279, 1271, 1257, 1239, 1215, 1188, 1156, 1121, 1084, 
				1045, 1005, 967, 929, 895, 864, 837, 814, 795, 779, 
				808, 833, 862, 895, 932, 970, 991, 1049, 1087, 1121, 
				1148, 1167, 1179, 1185, 1187, 1183, 1174, 1159, 1135, 1104, 
				1068, 1030, 990, 952, 926, 886, 882, 847, 815, 818, 
				824, 831, 837, 843, 849, 855, 861, 867, 874];
var yArray = [100, 100, 100, 100, 100, 100, 100, 100, 99, 89, 
				85, 152, 200, 200, 200, 200, 200, 200, 200, 200, 
				200, 251, 289, 327, 365, 423, 

				400, 380, 365, 360, 
				359, 363, 373, 389, 411, 440, 473, 506, 542, 564, 
				599, 648, 698, 736, 773, 808, 835, 857, 874, 885, 
				891, 895, 890, 880, 860, 832, 808, 775, 740, 700, 
				685, 717, 748, 764, 785, 794, 798, 793, 783, 760, 
				735, 701, 670, 640, 600, 540, 505, 470, 445, 420, 
				405, 397, 399, 410, 423, 460, 465, 520, 520, 510, 
				489, 450, 411, 372, 333, 294, 255, 216, 177, 139];
var a = [ [365, 219], [395, 201], [425, 184], [455, 166], [485, 149],
			[516, 132], [546, 114], [576, 97], [586, 90], [586, 151], 
			[586, 185], [586, 220], [586, 225], [586, 290],[586, 325], 
			[586, 360], [586, 395], [586, 430], [586, 465], [586, 499],
			[586, 534], [586, 569], [586, 604], [586, 639], [586, 674],
			[586, 709], [586, 744], [586, 779], [586, 800], [614, 827],
			[642, 854], [677, 854], [709, 854], [709, 886], [667, 886],
			[632, 886], [598, 886], [563, 886], [528, 886], [493, 886],
			[458, 886], [423, 886], [388, 886], [362, 886], [362, 854],
			[406, 854], [442, 852], [465, 826], [483, 798], [483, 763],
			[483, 728], [483, 693], [483, 658], [483, 624], [483, 589],
			[483, 554], [483, 519], [483, 484], [483, 449], [483, 414],
			[483, 379], [483, 345], [483, 310], [483, 275], [483, 240],
			[483, 205], [459, 208], [427, 223], [396, 238], [365, 253]];

var speed = 1;
var canvas;
function setup() {

	canvas = createCanvas(1800,1800);
	canvas.class("canvas");
	canvas.position(800,150);
	fill(255, 0, 0);
	noStroke();
	

	noLoop();
}

function draw() {
	background('rgba(255, 255, 255, 0.05)');
	scale(0.9);
	translate(200, 500);
	for(let i = 0; i < xArray.length; i++){
		xArray[i] += random(-speed, speed);
		yArray[i] += random(-speed, speed);
		
	}
	for(let i = 0; i < a.length; i++){
		a[i][0] += random(-speed, speed);
		a[i][1] += random(-speed, speed);
	}

	beginShape();
	for(i = 0; i < xArray.length; i++){
		vertex(xArray[i], yArray[i]);
	}
	endShape();

	beginShape();
	for(let i = 0; i < a.length; i++){
		vertex(a[i][0], a[i][1]);
	}
	endShape();

}

function mousePressed() {
	loop();
	
}

function mouseReleased() {
	if(speed < 10){
		speed = speed + 0.5;
	}
	noLoop();
}


// //resizing window resizes canvas
// function windowResized() {
// 	resizeCanvas(windowWidth, windowHeight);
// }
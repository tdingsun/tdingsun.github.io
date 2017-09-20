var circleArray = [4];
var starArray = [4];
var crossArray = [4];



function setup() {
	for(i = 1; i<=4; i++){
	circleArray[i-1] = document.getElementById("circle-" + i);
	starArray[i-1] = document.getElementById("star-" + i);
	crossArray[i-1] = document.getElementById("cross-" + i);
	let e = circleArray[i-1];
	let f = starArray[i-1];
	let g = crossArray[i-1];
	e.onclick = function() {toggle(e)};
	f.onclick = function() {toggle(f)};
	g.onclick = function() {toggle(g)};
}
}

function reset(){
	location.reload();
}

function titleMarquee() {
	var titleText = document.title;
	titleText = titleText.substring(1, titleText.length) + titleText.substring(0, 1);
	document.title = titleText;
	setTimeout("titleMarquee()", 100);
}



function toggle(e){
	if (e.id == "circle-1"){
		e = document.getElementById("star-1");
	} else if (e.id == "star-1"){
		e = document.getElementById("circle-1");
	}

	if (e.id == "circle-2"){
		e = document.getElementById("star-2");
	} else if (e.id == "star-2"){
		e = document.getElementById("circle-2");
	}

	if (e.id == "circle-3"){
		e = document.getElementById("star-3");
	} else if (e.id == "star-3"){
		e = document.getElementById("circle-3");
	}

	if (e.id == "circle-4"){
		e = document.getElementById("star-4");
	} else if (e.id == "star-4"){
		e = document.getElementById("circle-4");
	}


	if (e.id == "circle-1" || e.id == "star-3"){
		if (e.style.borderColor == "red transparent transparent red"){
			e.style.borderColor = "rgb(221, 221, 221) transparent transparent rgb(221, 221, 221)";
			e.style.opacity = 0.3;
		} else {
			e.style.borderColor = "red transparent transparent red";
			e.style.opacity = 1;
			console.log(e.style.borderColor);
		}
	} else if (e.id == "circle-2" || e.id == "star-4"){
		if (e.style.borderColor == "red red transparent transparent"){
			e.style.borderColor = "rgb(221, 221, 221) rgb(221, 221, 221) transparent transparent";
			e.style.opacity = 0.3;
		} else {
			e.style.borderColor = "red red transparent transparent";
			e.style.opacity = 1;
		}
	} else if (e.id == "circle-3" || e.id == "star-1"){
		if (e.style.borderColor == "transparent red red transparent"){
			e.style.borderColor = "transparent rgb(221, 221, 221) rgb(221, 221, 221) transparent";
			e.style.opacity = 0.3;
		} else {
			e.style.borderColor = "transparent red red transparent";
			e.style.opacity = 1;
		}
	} else if (e.id == "circle-4" || e.id == "star-2"){
		if (e.style.borderColor == "transparent transparent red red"){
			e.style.borderColor = "transparent transparent rgb(221, 221, 221) rgb(221, 221, 221)";
			e.style.opacity = 0.3;
		} else {
			e.style.borderColor = "transparent transparent red red";
			e.style.opacity = 1;
		}
	}

	if (e.id == "cross-1" || e.id == "cross-2" || e.id == "cross-3" || e.id == "cross-4"){
		if (e.style.backgroundColor == "red"){
			e.style.backgroundColor = "rgb(221, 221, 221)";
			e.style.opacity = 0.3;
		} else {
			e.style.backgroundColor = "red";
			e.style.opacity = 1;
		}
	}
	console.log(e);

	
}
const params = new URLSearchParams(location.search);
const term = params.get('term')
const keys = Object.keys(results)
const appendTime = 30000;
let resultTimeout;

function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

let requestArr = []

if (term in results) {
	requestArr = shuffle(results[term])
}
else {
	//merge and shuffle arrays
	requestArr = shuffle([].concat.apply([], Object.values(results)));
}

let reqNum = 0

function addObscurer(x, y, timeDifference) {
	//create a random div and place on page
	if (timeDifference > 2000) timeDifference = 2000;

	const size = 70 + timeDifference/15;
	const elID = Date.now().toString(36) + Math.random().toString(36).substring(2);
	const el = $('<div/>', {
		id: elID,
		"class": 'obscurer',
	})
	.css({
		position: 'fixed',
		top: y - size/2,
		left: x - size/2,
		width: size + 'px',
		height: size + 'px',
	})
	.html(function () {
		setTimeout(function () {
			$("#" + elID).delay(5000).fadeOut(10000)
		}, 8000);
	})
	$('body').append(el)
}

function waitForMs(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

	function replaceAllSpecialChars(textValue, charSeparator) {
	let arrayReturnValues = textValue.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, "")
		.replace('\\', '\\\\')
		.match(/[a-z 0-9]/g);

	if(arrayReturnValues === null)
		return '';

	return arrayReturnValues.join('')
		.replace(/[ ]+/g, ' ').trim()
		.replace(/[ ]/g, charSeparator);
}

async function printText() {
	let i=0;
	const text = requestArr[reqNum]["Descripción de la solicitud"]
	let words = text.split(" ");

	keys.forEach(key => {
		words = words.map(word => 
			replaceAllSpecialChars(word, ' ').toUpperCase().replace(/s$/, '')
			=== replaceAllSpecialChars(key, ' ').toUpperCase().replace(/s$/, '')
			? `<a href='?term =${key}'>${word}</a>` : word)
	})

	const delay = 130
	while(i < words.length) {
		await waitForMs(delay);
		if (i%100 === 0 && i !== 0) {
			addObscurer(Math.random()*($(window).width()-100) + 50, 
				Math.random()*($(window).height()-100) + 50,
				100 + Math.random()*900)
		}
		$('#page').append(words[i]+ ' ');
		$(document).scrollTop($("#page").height())
		i++
	}
}


function appendText() {
	clearTimeout(resultTimeout)
	$(document).unbind()
	setNonTextListeners();
	printText().then( () => {
		reqNum = (reqNum + 1)%(requestArr.length)
	}).then( () => {
		setListeners();
		resultTimeout = setTimeout(function () {
			appendText();
		}, appendTime )
	}).catch(error => {
		console.log(error)
		reqNum = (reqNum + 1)%(requestArr.length)
		appendText()
	});
}

function setNonTextListeners () {
	$(document).on('touchstart mousedown', function(event) {
		mouseDownTime = new Date().getTime();
		let timeDifference = 50 + Math.random()*2000
		const x = event.pageX
		const y = event.pageY - $(document).scrollTop()
		addObscurer(x, y, timeDifference)
	}).on('touchend mouseup', function(event){
		mouseUpTime = new Date().getTime();
	});
}

function setListeners() {
	let mouseDownTime, mouseUpTime = 0
	$(document).on('touchstart mousedown', function(event) {
		clearTimeout(resultTimeout);
		let timeDifference = 50 + Math.random()*2000
		mouseDownTime = new Date().getTime();
		addObscurer(event.pageX, event.pageY - $(document).scrollTop(), timeDifference)
		appendText();
	}).on('touchend mouseup', function(event){
		mouseUpTime = new Date().getTime();
	});
}

$.fn.extend({
	disableSelection: function() {
		this.each(function() {
			this.onselectstart = function() {
				return false;
			};
			this.unselectable = "on";
			$(this).css('-moz-user-select', 'none');
			$(this).css('-webkit-user-select', 'none');
		});
		return this;
	}
});


$(document).ready(function() {
	$('.notSelectable').disableSelection();
	$('body').disableSelection();
	setListeners();
	appendText();
})
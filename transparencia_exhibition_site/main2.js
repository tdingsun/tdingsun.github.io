const keys = Object.keys(results);
const appendSpeed = 30000;
const wordSpeed = 100;
let pages = {};
let notes = ['C3', 'D3', 'E3', 'F3', 'G3', 'C4'];

function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
let membrane = new Tone.MembraneSynth().toDestination();
let synth = new Tone.PolySynth(Tone.MonoSynth).toDestination();
$(document).ready(() => {
	setClickHandlers();

});

function setClickHandlers() {
	$('#startScreen').on('click', () => {
		Tone.start();
		$('#startScreen').remove();
		$('body').append($('<div id="container"></div>'));
		let randomKey = keys[Math.floor(Math.random() * keys.length)];
		makePage(randomKey);
	})
	$(document).on('click', '.key', (e) => {
		synth.triggerAttackRelease('C4', "32n");
		e.stopPropagation();
		let newTerm = (e.target.id);
		makePage(newTerm);
		$('#container').scrollLeft($('#container').prop('scrollWidth'));

	});
	$(document).on('click', '.closeButton', (e) => {
		if($('#container').children().length > 1){
			let pageId = (e.target.id);
			let pageObject = pages[pageId];
			clearTimeout(pageObject.appendTimeout);
			$(`#page${pageId}`).remove();
		}
	});
	$(document).on('click', '.body', (e) => {
		let pageId = (e.target.id);
		let pageObject = pages[pageId];
		if(!pageObject.currentlyPrinting){
			clearTimeout(pageObject.appendTimeout);
			pageObject.printAllText();
		}
	});
}

function getResults(term = undefined) {
	if (term && term in results && results[term].length > 0) {
		return shuffle(results[term]);
	}
	else {
		//merge and shuffle arrays
		return(shuffle([].concat.apply([], Object.values(results))));
	}
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


function makePage(key) {
	let id = Object.keys(pages).length;
	let pageObject = new Page(key, id);
	pages[id] = pageObject;
	pageObject.printAllText();
}

class Page {
	constructor(term, id) {
		this.note = notes[id % notes.length];
		console.log(this.note);
		this.currentlyPrinting = false;
		this.resultsIndex = 0;
		this.results = getResults(term);
		this.term = term;
		this.div = $(`<div id="page${id}" class="page"></div>`);
		
		let header = $('<div class="header"></div>');
		header.append($(`<span>${term}</span>`));
		header.append($(`<div class="closeButton" id="${id}">X</div>`));
		this.body = $(`<div class="body" id="${id}"></div>`);

		this.div.append(header);
		this.div.append(this.body);
		$('#container').append(this.div);
	}

	async printAllText() {
		await this.printText();
		this.loop();
	}

	loop() {
		this.appendTimeout = setTimeout(async () => {
			await this.printText();
			this.loop();
		}, appendSpeed)
	}

	async printText() {
		try {
			//sound and color
			synth.triggerAttackRelease(this.note, "32n");
			if(this.div.hasClass('secondaryColor')){
				this.div.removeClass('secondaryColor');
			} else {
				this.div.addClass('secondaryColor');
			}

			this.currentlyPrinting = true;
			const text = this.results[this.resultsIndex]["Descripción de la solicitud"];
			let words = text.split(" ");
			keys.forEach(key => {
				words = words.map(word => 
					replaceAllSpecialChars(word, ' ').toUpperCase().replace(/s$/, '')
					=== replaceAllSpecialChars(key, ' ').toUpperCase().replace(/s$/, '')
					? `<span class='key' id='${key}'>${word}</a>` : word)
			});
			for(let [idx, word] of words.entries()){
				await waitForMs(wordSpeed);
				if(idx % 10 == 0) {
					synth.triggerAttackRelease('G2', "32n");

				}

				this.body.append(word + ' ');
				this.body.scrollTop(this.body.prop('scrollHeight'))
			};
			this.body.append('<hr>');
			this.resultsIndex = (this.resultsIndex + 1)%(this.results.length);
			this.currentlyPrinting = false;			
		} catch {
			this.currentlyPrinting = false;
			this.resultsIndex = (this.resultsIndex + 1)%(this.results.length);
		}
	}
}

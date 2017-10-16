var data;
var c_array = [];
var prevElement;
var lyrics;

function preload() {
	data = loadStrings('about_pages.txt', setup);

}

function setup() {
	lyrics = data.join(" ");
	let p = document.createElement("p");
	for(var i = 4; i >= 2; i--){
		let rm = new RiMarkov(i);
		rm.loadText(lyrics);
		let sentences = rm.generateSentences(2);

		
		for (var j = 0; j < sentences.length; j++){
			p.innerHTML += sentences[j];
			p.innerHTML += " ";
		}

		document.getElementById("container").appendChild(p);

	}
		// let rm_2 = new RiMarkov(2);
		// let rm_3 = new RiMarkov(3);
		// let rm_4 = new RiMarkov(4);
		// let rm_5 = new RiMarkov(5);
		// let rm_6 = new RiMarkov(6);

		// lyrics = data.join(" ");
		// rm_2.loadText(lyrics);
		// rm_3.loadText(lyrics);
		// rm_4.loadText(lyrics);
		// rm_5.loadText(lyrics);
		// rm_6.loadText(lyrics);


		// let sentences_2 = rm_2.generateSentences(10);
		// let sentences_3 = rm_3.generateSentences(10);
		// let sentences_4 = rm_4.generateSentences(10);
		// let sentences_5 = rm_5.generateSentences(10);
		// let sentences_6 = rm_6.generateSentences(10);

		// let p_2 = document.createElement("p");
		// let p_3 = document.createElement("p");
		// let p_4 = document.createElement("p");
		// let p_5 = document.createElement("p");
		// let p_6 = document.createElement("p");

		// for (var i = 0; i < sentences_6.length; i++){
		// 	p_6.innerHTML += sentences_6[i];
		// 	p_6.innerHTML += " ";
		// }
		// for (var i = 0; i < sentences_5.length; i++){
		// 	p_5.innerHTML += sentences_5[i];
		// 	p_5.innerHTML += " ";
		// }
		// for (var i = 0; i < sentences_4.length; i++){
		// 	p_4.innerHTML += sentences_4[i];
		// 	p_4.innerHTML += " ";
		// }
		// for (var i = 0; i < sentences_3.length; i++){
		// 	p_3.innerHTML += sentences_3[i];
		// 	p_3.innerHTML += " ";
		// }
		// for (var i = 0; i < sentences_2.length; i++){
		// 	p_2.innerHTML += sentences_2[i];
		// 	p_2.innerHTML += " ";
		// }

		// document.getElementById("container").appendChild(p_6);
		// document.getElementById("container").appendChild(p_5);
		// document.getElementById("container").appendChild(p_4);
		// document.getElementById("container").appendChild(p_3);
		// document.getElementById("container").appendChild(p_2);
}




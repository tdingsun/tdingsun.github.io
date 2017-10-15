var data;
var c_array = [];
var prevElement;
var lyrics;

function preload() {
	data = loadStrings('about_pages.txt', setup);

}

function setup() {

		let rm_2 = new RiMarkov(2);
		let rm_3 = new RiMarkov(3);
		let rm_4 = new RiMarkov(4);
		let rm_5 = new RiMarkov(5);
		let rm_6 = new RiMarkov(6);

		lyrics = data.join(" ");
		rm_2.loadText(lyrics);
		rm_3.loadText(lyrics);
		rm_4.loadText(lyrics);
		rm_5.loadText(lyrics);
		rm_6.loadText(lyrics);


		let sentences_2 = rm_2.generateSentences(10);
		let sentences_3 = rm_3.generateSentences(10);
		let sentences_4 = rm_4.generateSentences(10);
		let sentences_5 = rm_5.generateSentences(10);
		let sentences_6 = rm_6.generateSentences(10);

		for (var i = 0; i < sentences_6.length; i++){
			println(sentences_6[i]);
		}
		for (var i = 0; i < sentences_5.length; i++){
			println(sentences_5[i]);
		}
		for (var i = 0; i < sentences_4.length; i++){
			println(sentences_4[i]);
		}
		for (var i = 0; i < sentences_3.length; i++){
			println(sentences_3[i]);
		}
		for (var i = 0; i < sentences_2.length; i++){
			println(sentences_2[i]);
		}
		// //make every word into its own <p> with an id.
		// for(let i = 0; i < c_array.length; i++){
		// 	var p = document.createElement("p");
		// 	p.id = "entry-" + i;

		// 	//when you click the word, it shows the word in context
		// 	p.onclick = function() {kwic(i)};

		// 	//p.innerHTML += (c_array[i][0] + " : " + c_array[i][1]);
		// 	p.innerHTML += (c_array[i][0]);
		// 	document.getElementById("container").appendChild(p);
		// }

}

//your basic insertion_sort algorithm
//o(n squared)
function insertion_sort(array){
	let n = array.length;
	let temp;

	for (let i = 1; i <= n-1; i++){
		for(let j = i; j >= 1; j--){
			if (array[j][1] > array[j-1][1]){
				temp = array[j];
				array[j] = array[j-1];
				array[j-1] = temp;
			} else {
				break;
			}
		}
	}
}

//o(n squared)
function selection_sort(a){
	let n = a.length;
	let temp;
	let max;
	let max_index;
	for (let i = 0; i <= n-2; i++){
		//find max
		max = a[i][1];
		max_index = i;
		for (let j = i; j <= n-1; j++){
			if (a[j][1] > max){
				max = a[j][1];
				max_index = j;
			}
		}
		//swap
		temp = a[max_index];
		a[max_index] = a[i];
		a[i] = temp;
	}
}

function kwic(index){

	//when you click on a word, it turns red, and then the word you previously clicked returns to grey
	var element = document.getElementById("entry-" + index);
	
	$('html, body').animate({
    scrollTop: $(element).offset().top - 150
	}, 1000);

	element.style.color = "#083";
	if (prevElement != null && prevElement != element){
		prevElement.style.color = "#555";
	}
	prevElement = element;

	let args = {
		wordCount: 5,
		ignoreCase: true,
		ignorePunctuation: true
	}

	let word = c_array[index][0]

	var kw = RiTa.kwic(lyrics, word, args);
	var kw_frame = document.getElementById("kwic-container");
	var kw_frame_position = (element.getBoundingClientRect().top + window.pageYOffset);
	kw_frame.style.margin = kw_frame_position + 'px 0 0 0';

	kw_frame.innerHTML = ''; //resets the text every time a word is clicked

	for (let i = 0; i < kw.length; i++){ //for every string in the kwic
		var parts = kw[i].toLowerCase().split(word); //splits the string based the word

		kw_frame.innerHTML += "... "; //start every line with "..."

		for (let j = 0; j < parts.length; j++){ //for every part of the string that we split before
			
			if (j == (parts.length - 1)){ //end the line with ... and a line break
				kw_frame.innerHTML += parts[j] + " ... <br>";
			} else { // put all the parts in the innerHTML with the word (in red) between the parts.
				kw_frame.innerHTML += parts[j] + "<span style='color: #083; border: 1px solid #083; padding: 0 5px 0 5px; margin: 5px  0 5px 0;'>" + word + "</span>";
			}
		}
	}
	
}




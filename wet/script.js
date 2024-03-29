var data;
var c_array = [];
var prevElement;
var lyrics;

function preload() {
	//loads the data before loading the page
	data = loadStrings('lyrics.txt', setup);

}

function setup() {

		let args = {
			ignoreCase: true,
			ignoreStopWords: true,
			ignorePunctuation: true
		}

		//create a concordance
		lyrics = data.join(" ");
		let c = RiTa.concordance(lyrics, args);

		//have to convert c (which is a map) into an array, so that we can sort it.
		for (let word in c){

			let count = c[word];
			if(word != ""){
				c_array.push([word, count]);
			}

		}
		


		//sorts the list of words in the concordance by its frequency
		//insertion_sort(c_array); 
		selection_sort(c_array);

		//make every word into its own <p> with an id.
		for(let i = 0; i < c_array.length; i++){
			var p = document.createElement("p");
			p.id = "entry-" + i;

			//when you click the word, it shows the word in context
			p.onclick = function() {kwic(i)};

			//add every item to the HTML doc
			p.innerHTML += (c_array[i][0] + " : " + c_array[i][1]);
			document.getElementById("container").appendChild(p);
		}

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

//your basic selection_sort algorithm
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


//creates the key word in context panel
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




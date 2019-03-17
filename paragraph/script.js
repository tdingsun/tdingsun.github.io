var str = "I have a secret to tell you. Desire hurts. Today I realized, for the hundredth time, that immediately after we part ways for the day, I already want to return to you. This always comes as a shock. The lost lorn loved ones shudder. Im not sure how to continue on except for the monotone fact that day after day passes by with little effort exerted by me to change anything about my life. There are certain things that I could do, but truly the trope of words being caught at throat becomes physical reality. It makes me want to cry sometimes. A simple fact I tend to dance around. It feels like there is no one to tell, nothing to do except write a letter addressed to either no one or you in a somewhat naive attempt to exorcise these feelings out of my body. Above all, I am embarrassed. So, so embarrassed about my love for you. I can't even say it except at an oblique angle. You have a secret to tell me. Desire hurts. Today, you realized, for the one hundredth time, immediately after we part ways, that you already want to return to me. This always comes as a surprise. The feelings of loss shudder. You're not really sure how to continue, but despite you're indecision, day after day passes by while nothing ever changes. Because nothing ever happens. There are certain things that you could do, but truly the trope of words being caught at through becomes physical reality. It makes you want to cry sometimes. A simple fact you dance around. It feels like there is nothing to tell, but in fact, the small feeling that gnaws at the center of your ribcage from the inside out needs to be acknowledged. Above all, you are embarrassed. So, so embarrassed about your love for me. You can't even say it. You love me. You are a secret to tell myself.";
 
var str_array = str.split(" ");
var o = 0;
var len = 20;
$(document).ready(function () {
  //initial display
  disp(str_array.slice(0, 20));
  //on click
  $(".text").on('click', 'span', function() {
    var word = $(this).text();
    a = word.split(/[,."“?()]+/g);
    console.log(a);
    if(a[0] == ""){
      word = a[1];
    } else {
      word = a[0];
    }
    console.log(word);

    var indices = [];
    // var idx = str_array.indexOf(word);
    // while (idx != -1){
    // 	indices.push(idx);
    // 	idx = str_array.indexOf(element, idx + 1);
    // }
    for(let i = 0; i < str_array.length; i++){
    	var query_a = str_array[i].split(/[,."“?()]+/g);
    	var query_word = "";
    	if(query_a[0] == ""){
     		query_word = query_a[1];
    	} else {
      		query_word = query_a[0];
    	}
    	if(word == query_word){
    		indices.push(i);
    	}
    }

    if(indices.length > 0){
    	$(".text").empty();
    	var randIndex = indices[Math.floor(Math.random() * indices.length)];
    	if(randIndex + 20 > str_array.length){
    		disp(str_array.slice(randIndex));
    	} else {
    		disp(str_array.slice(randIndex, randIndex + 20));
    	}
    }


    if(word != null){
      $("body").css("background-color", "rgba(0,0,0," + o + ")");
      o += 0.01;
      if(o >= 1){
        o = 0;
      }
    }
  });
});




function disp(a){
  for(let i = 0; i < a.length; i++){
    a[i] = "<span class='word'>" + a[i] + "</span>";
    $(".text").append(a[i] + " ");
  }
}

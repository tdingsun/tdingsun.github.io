var width = $(window).width();
var height = $(window).height();
var str = "";

$(document).ready(function() {
  resize();
  $("#container").click();
  $(document).keypress(function(event){
    var code = event.which;
    if(code == 32){
      event.preventDefault();
    }
    if(code == 8){
      str = str.substring(0, str.length - 1);
      $("#container").html(str + "<span>_</span>");
    } else {
      var c = String.fromCharCode(event.which);
      str += c;
      $("#container").html(str + "<span>_</span>");
    }
  });

  setTimeout(mutate, 5000);

  $("#button").click(function(event){
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val($("#container").text()).select();
      document.execCommand("copy");
      $temp.remove();
      $("#button").text("Copied to Clipboard");
      setTimeout(function(){
        $("#button").text("CLICK TO COPY TO CLIPBOARD");
      }, 3000);
  });
});

$(window).resize(function(){
  resize();
});




function resize(){
  width = $(window).width();
  height = $(window).height();
  var centered_left = width/2 - 276.5;
  $("#container").css({
    left: centered_left
  });
  $("#button").css({
    left: centered_left
  });
  $("#history").css({
    left: centered_left
  })
}


function mutate(){
  $("#history").prepend(str + '<br>');

  var lastCharIsSpace = false;
  if(str[str.length - 1] == " "){
    lastCharIsSpace = true;
  }
 var words = RiTa.tokenize(str);
 var rand = Math.floor(Math.random()*words.length);
 var randWord = words[rand];
 var tag = RiTa.getPosTags(randWord);
 var new_word;
 if(RiTa.similarBySound(randWord).length > 0){
  var similarWords = RiTa.similarBySound(randWord);
  new_word = similarWords[Math.floor(Math.random()*similarWords.length)];
 } else {
  new_word = RiTa.randomWord(tag[0]);
 }
 words[rand] = new_word;
 str = RiTa.untokenize(words);
 if(lastCharIsSpace){
  str += " ";
 }
 $("#container").html(str + "<span>_</span>");

 var interval = 5000/words.length;

 setTimeout(mutate, interval);
}


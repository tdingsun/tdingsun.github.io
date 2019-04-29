var width = $(window).width();
var height = $(window).height();
var str = "";

var synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
var notes = Tone.Frequency("G3").harmonize([0, 2, 4, 5, 7, 9, 11, 12]);
var noteIndex = 0;

StartAudioContext(Tone.context, 'div').then(function(){
  //started
  console.log("clicked");

});

//have to click to start audio context
$('div').click(function(){
  //Tone.start();
  console.log("clicked");
});

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
  synth.triggerAttackRelease(notes[noteIndex], "8n");
  noteIndex++;
  if(noteIndex >= notes.length){
    noteIndex = 0;
  }

  $("#history").prepend(str + '<br>');
  console.log($('#history').text().length);
  if($('#history').text().length > 20000){
    $('#history').text($('#history').text().substring(0, 10000));
  }

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


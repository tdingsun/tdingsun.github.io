var regex = /[\\]/;
var str = "I am interested in writing within structures. \\My core belief is that the anonymous, mostly hidden structure of the internet does not deny the possibility of poetry. \\I imagine words springing up from technical jargon like moss in the cracks of pavement. \\There is the possibility of subjectivity even in the most banal of metadata. \\There is poetry in the most rote listing of things. \\I remember reading a short text by Allison Parrish on a website/literary project called Web Safe 2k16 (http://websafe2k16.com). \\In this text, Parrish describes how she recieved a manual for the Tandy TRS-80 computer when she was five.\\ One one page, this manual listed the nine colors that the computer could produce. \\Parrish writes, \\ “The Color Computer can produce 9 colors, the book reads, then recites them like a poem.” \\0 Black \\1 Green \\2 Yellow \\3 Blue \\4 Red \\5 Buff \\6 Cyan \\7 Magenta \\8 Orange \\When I read this, \\I was really excited because I instantly understood her poetic reading of this banal list. \\This impulse felt extremely familiar to me. \\For example, in many JRPGs, there exists a ‘job system’ that functions as a way to imbue your character with different stats, attributes, and weapons. \\I had always thought that this list of jobs was extremely poetic. \\The list includes words like—"
var text_array = str.split(regex);
// var text_array = RiTa.splitSentences("I am interested in writing within structures. My core belief is that the anonymous, mostly hidden structure of the internet does not deny the possibility of poetry. I imagine words springing up from technical jargon like moss in the cracks of pavement. There is the possibility of subjectivity even in the most banal of metadata. There is poetry in the most rote listing of things. I remember reading a short text by Allison Parrish on a website/literary project called Web Safe 2k16 (http://websafe2k16.com). In this text, Parrish describes how she recieved a manual for the Tandy TRS-80 computer when she was five. One one page, this manual listed the nine colors that the computer could produce. Parrish writes, The Color Computer can produce 9 colors, the book reads, then recites them like a poem. 0 Black 1 Green 2 Yellow 3 Blue 4 Red 5 Buff 6 Cyan 7 Magenta 8 Orange. When I read this, I was really excited because I instantly understood her poetic reading of this banal list. This impulse felt extremely familiar to me. For example, in many JRPGs, there exists a ‘job system’ that functions as a way to imbue your character with different stats, attributes, and weapons. I had always thought that this list of jobs was extremely poetic. The list includes words like");

var n = text_array.length;

StartAudioContext(Tone.context, 'div').then(function(){
  //started
  console.log("clicked");
});

//have to click to start audio context
$(document).click(function(){
  Tone.start();
  console.log("clicked");
});

var synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
var notes = Tone.Frequency("G2").harmonize([1, 3, 6, 8, 10, 
                                            3, 6, 8, 10, 13]);

var intervalID;


var offset_x = 50;
var x_dir = 1;
var offset_y = 50;
$(document).ready(function() {
  setupDivs();


  $(".card").draggable({
    stack: "div",
    grid: [50, 50],
    start: function(){
      var ref = this;
      intervalID = setInterval(function(){
        new_string = changeString($(ref).text());
        $(ref).text(new_string);
       }, (Math.floor(Math.random()*5000 + 5000)));
    }
  });

  $(".card").click(function(){
    $(this).css('z-index', 2);
    $(this).siblings('div').css('z-index', 1);
  });

  $(".card").hover(function(){
    var top = parseInt($(this).css("top"));
    $(this).css('top', top - 5);
  }, function(){
    var top = parseInt($(this).css("top"));
    $(this).css('top', top + 5);
  });

});


$(window).resize(function(){
  resize();
});

function setupDivs(){
  for(var i = 0; i < n; i++){
    var new_div = $("<div>");
    new_div.addClass("card");
    new_div.text(text_array[i]);
    $("#container").append(new_div);
  }
  resize();
}

function resize(){
    offset_x = 50;
    x_dir = 1;
    offset_y = 50;
    $(".card").each(function(index){
      $(this).css({
        left: offset_x,
        top: offset_y,
      });
      if(offset_x > $(window).width() - (150+$(this).width())){
        x_dir = -1;
      } else if(offset_x <= 50){
        x_dir = 1;
      }
      offset_x += 50*x_dir;
      offset_y += 50;
    });
}


function changeString(string){
  var randIndex = Math.floor(Math.random() * notes.length);
  synth.triggerAttackRelease(notes[randIndex], "8n");


  var words = RiTa.tokenize(string);
  var rand = Math.floor(Math.random()*words.length);
  var tag = RiTa.getPosTags(words[rand]);
  var new_word = RiTa.randomWord(tag[0]);
  words[rand] = new_word;
  return RiTa.untokenize(words);
}

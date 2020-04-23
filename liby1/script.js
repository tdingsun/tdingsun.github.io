var width;
var height;
var title = "Pissed Pants<br>Academy";
var author = "Liby Hays"
var speed = 1000;

var paragraphs = ["It was the day I met Paula Abdul on an airplane, and she was very beautiful, very glamorous, and she was sitting next to me in the airplane seat.",
"“Are you a water scientist or something?” She asked because I was holding a bottle of water.",
"She was working on a screenplay on a computer nicknamed “the Box.” The screenplay was about a group of friends who were the little blobs at the end of plucked hairs, who attended an elite private school and dealt with problems like parents’ divorce. What united all of the blobs was their interest in fashion.  The working title of the script was “Pissed Pants Academy,” but it was being rebranded as “The Bratz Movie” to tie it in with a line of dolls popular with young girls. Paula was writer, choreographer, and head couturier. Due to the demands of the project, she hadn’t slept in three weeks or longer. Her finger traced idly round the napkin ring where fibers had been impregnated with wet.",
"The project she described as her “creative component.”",
"I had to ask, had to say it, but I’d have knelt if I could. I’d have knelt on a bed of dry leaves trembling, if I could have.",
"I asked if she was boozing. I asked if she was trashed. I asked if she was sauced up. I asked if she’d had a few too many, if she was under the influence, if she was sloshed, if she was buzzed, if she was knackered, if she was hammered, blitzed, soused, far gone.",
"I was fiendish, goading, but once I started I couldn’t be stopped.",
"Then Paula turned to me, with eyes like dry ore.",
"“And now...” she intoned,",
"“And now we must draw the conclusion, the dark germ that all conclusivities draw from and preclude, brazen chapping-hand that wags and wanes with the splendid rot of oaks...”",
"“And how, I, Paula, middle name Me—lone puff adrift in paradise—can recall, and think back to those selfsame days, On that plane, on that day of days,",
"A story in which there were a number of interested parties, involved parties, mutually involved and implicated with one another, but there was also, on the other hand, a dark fact they knew and shared amongst themselves, a dark fact tearing them apart and severing their privileged bonds, and the dark fact was this: inequities…”",
"“And how a dark prince, wan prince, was introduced to the story, who intervenes in this dark and wormbitten fact  For the sole purpose of negotiating an arrangement, and deed, favorable to all constituents.”",
"“And how, I—lone puff adrift in paradise—and Paula, dim taskmaster, palsied bureaucrat, rank with spleen, Grew to understand one another, in that brief span,",
"And how Paula, bold and crinkly, wan and pale, Proceeded to lay it all out, and put it all in, and give it all up, and bring it back out",
"how",
"she how threw it all down, and gave it all up, and threw it all in, and wrought it all out and spat it back up and brought it arrrooound towwwwwn,", 
"and recouped, recompense, Abdul, dogpound pound-it,",
"On that plane, on that day of days.”",
"On her breath, a desirous patchouli,",
"The Lady Abdul."];
var word_index = 0;

var volume = new Tone.Volume(-24);
var synth = new Tone.PolySynth(4, Tone.Synth).chain(volume, Tone.Master);
var notes = Tone.Frequency("G4").harmonize([0, 4, 7, 11, 14, 17, 21, 24, 28, 31, 28, 24, 21, 17, 14, 11, 7, 4]);

StartAudioContext(Tone.context, 'div').then(function(){
  //started
  console.log("clicked");

});



$(document).ready(function(event){
  width = $(window).innerWidth();
  height = $(window).innerHeight();
  displayTitle(title, author);
  setTimeout(setupText, 1500);

  setInterval(rotateVertical, 1000);
  setInterval(rotateHorizontal, 2000);
  requestAnimationFrame(timer);

  $("#text-container").on("mouseenter", ".deactivated", function(){
    let left = $(this).offset().left;
    let top = $(this).offset().top;
    
    left = left + (Math.random() * 10) - 5;
    top = top + (Math.random() * 10) - 5;
    $(this).offset({top: top, left: left});
    var randNote = word_index % notes.length;
    synth.triggerAttackRelease(notes[randNote], "4n");
    $(this).addClass("activated");
    $(this).removeClass("deactivated");
    word_index++;
  });
});

$("#title").click(function(){
  $(".activated").each(function() {
    $(this).addClass("deactivated");
    $(this).removeClass("activated");
  });
});

$("#container").on('click', '.activated', function(){
  console.log("clicked");
  $(this).addClass("deactivated");
  $(this).removeClass("activated");
});


function displayTitle(title, author){
  $("#title").html(title + "<br>by " + author);
}

function setupText(){
  paragraphs.forEach(function(p, index){
    let newP = $("<p></p>");
    words = p.split(" ");
    words.forEach(function(word, index) {
      let newSpan = $("<span class='deactivated'></span>");
      newSpan.text(word);
      newP.append(newSpan);
    });
    $("#text-container").append($("<hr>"));

    $("#text-container").append(newP);
    $("#text-container").append($("<hr>"));


  });
  $("#title").css({
    "font-size": "3rem"
  });
}

function timer() {
  $(".activated").each(function() {  
    $(this).offset({top: ($(this).offset().top + (Math.random() * 5 - 2.5)), left: ($(this).offset().left + (Math.random() * 5 - 2.5))});
  });

  requestAnimationFrame(timer);

}

var currRotateV = 0;
var currRotateH = 0;

function rotateVertical() {
  currRotateV += 15;
  $("#vertical").css({
      "transform": `rotate(${currRotateV}deg)`
  })
}

function rotateHorizontal() {
  currRotateH += 7.5;
  $("#horizontal").css({
      "transform": `rotate(${currRotateH}deg)`
  })
}

$("#mute-btn").click(function(){
  Tone.Master.mute = !Tone.Master.mute;
  $(this).text($(this).text() == 'MUTE' ? 'SOUND ON' : 'MUTE');
});
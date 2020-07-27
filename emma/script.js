var width;
var height;
var title = "GUSHGUSHGUSH";
var author = "Emma Kemp"
var speed = 250;
var curr_subdivide = 0;
var curr_subdivide_max = 1;
var curr_brick_subdivide = 0;
var curr_brick_subdivide_max = 1;
var brick_speed = 1000;
var tv;
var th;

var chunks = [
  "I went home after a week of absence and found my cup on the table, still. </br> “It’s moldy,” I mentioned to D. </br> “It’s your cup,” D said, exiting the room.",
  "B did not invite me to the party. Or wherever he is. </br> [Update: with C.]",
  "On the radio the journalist started to cry. </br> I told B about this. “You can ruin any nice moment,” he said. </br> Licorice sky. Learn to dress with intent.",
  "I heard the president was tearing up letters. I heard his staff piece them back together with tape. </br></br> Then there was the time I got drunk and fucked A on the fire escape of a Brooklyn apartment. His hair, I remember; hot trash. </br> He looked like Jesus or like four horses running.",
  "Yesterday was walking uphill. </br> B said, “Can I ask you a question?” </br> I said no it was the music and a lot did happen but it’s not what you think. </br></br> I did not say yes there was the night at the top of the Ludlow or the night on the Malibu bluffs or the night with the pool of black vomit. </br></br> I definitely did not let on that I died a bit the last time. </br></br> Nor did I say “aloneness” “goofy” “sappy” “soppy” “tragic” “creepy” “baby”.",
  "THC, PCP, CBD.",
  "B said his grandmother would take a photo but make sure to exclude my shoes from the frame. </br> (B implies my shoes are always dirty)</br> B said his grandmother doesn't like to share food or stack plates. </br> B didn’t say this but I thought it I thought “B” is for “bourgeoise-e-e.”</br> Then B said the wine was “joy de vivre.”</br> “A tes souhaits,”  he says when I sneeze.",
  "B said come meet the landlord then he looked me up and down.",
  "Remember the large Black Widow above the door. </br> (Today her babies broke out of the egg sac. Foucault said you must break in before you break out but what I want to know is which direction means more?)",
  "C said B likes you but you shouldn't pursue it because he would drive you c-r-a-a-z-y. </br> C is all drama at the edges of things.</br> B likes to pretend otherwise, you know how that goes.",
  "This is what happens when you apply the logic of a homophone to communication at large.",
  "Eating dinner with B: “Sometimes I feel like you hate me,” I said. </br> “This tofu is interesting,” he said. “I’m not sure that it goes with the meal.”",
  "Earlier, on a walk with B, he pulled up the Wikipedia page for ‘empathy’.",
  "Now here is the house, at long last. </br></br> The house is made of windows and chimneys. The house faces out to a hillside. The hillside is where people peg up their tents. In the afternoon it’s all rock hitting metal, the clang of a church bell. </br></br> From inside the house people are trying to survey the land “yonder”. </br></br> From the outside it’s a bit like a tank of piranhas. It’s a buffet in there!",
  "At the parade B brushed chalk dust from C’s thigh. </br> At the parade B tried to show off his tomahawk. </br> At the parade the punch went from cloudy to clear in a minute. ",
  "Now the sound of tires screeching.",
  "At the house we tried to cook pizza. </br> At the house we ate In N Out instead. </br> At the house we watched bits of Thai movies.",
  "Now the sound of dogs wailing.",
  "All the films are tortured babies. </br> B sees the cliché but finds the grid reassuring. </br> E wants to stomp on the chess board.",
  "Now sirens. </br></br> Someone threw a turnip through the window. </br> Someone’s wig landed in the center-median like roadkill. </br></br> A flashing sign: Tommy’s Hamburgers. </br> A flashing sign: Sundance Plaza.",
  "The house is a fortress. </br> The house is a prison. </br> The house is a castle. </br> The house is a sea-shell. </br></br> The house is filled with poltergeists, with jack-o-lanterns of emotionally unstable women. </br> Or Shelley Duval in sheer negligée.",
  "Joke. </br> Joke. </br> E keeps doing it wrong. </br> E is opaque. </br> E is quote “a fillet of fish flopping around on the floor.”",
  "THAT SMELL (1985) </br> SO CLOSE (1985) </br> A LOT OF THINGS HAVE CHANGED (1985) </br> I GOTTA FIND THIS PLACE (1985) </br> SO SO MANY TIMES (1985) </br> WHEN THE WORLD TURNED UPSIDE DOWN (1984)",
  "Now the house is empty.",
  "B left today and it’s 91 degrees on the inside. </br> B left the house dressed in white shirt, black pants. </br> B left the house by way of the Bougainvillea, a bright spot like a hole in a photo on fire. </br> “Come back,” I said. </br> “It’s too late,” he said. “The moment has passed.” </br></br> B walks ahead.",
  "The baking tray in the oven, encrusted with cheese. “I’ll handle that later,” he said. </br> Of course he never did. ",
  "The black widow dead on the doormat today. </br> The bird dead on the studio floor. </br> The ding in the back of the white Ford Ranger. </br></br> A reflexive shrug of the shoulders, a possible twitch.",
  "A house is a fortress. Outside is wildness. Outside is fanged. Inside is claws. </br> Tongues and claws. No touching, though. </br> Distance. </br></br> “Distance,” he said. “It’s a good name?” </br> “Parking,” he said. “Do you think there’s a lot?” </br></br> Eggs, no? </br> Eggs, he thinks he will. </br> Egg raw. “Where did you purchase the eggs?” He would be happy perhaps if I made chickens appear.",
  "Do you want to hear a funny story? A romantic evening. A big bad bitch. </br> The cigarette though, that’s the butt of the joke. </br></br> House Specials: Chicken Tender plate. </br> Or Bolognaise. </br> Marinara. Farfalle. Carbonara. Primavera. </br> Your mind, a mile a minute. </br> Bits. </br> Bob’s. </br> Milk beneath black light: gush, gush, gush. </br> Tunneling backwards; falling backwards like a cushion from a couch. </br></br> The picture window. The 24mm lens. The 28mm lens. The 35mm lens. </br> Kodak Portra. Fuji Provia. Ektar 100. </br></br> Palmist. Tarot. a $20.00 something. </br> Vegan cheese like glue. </br> Now I’m canceling the Korean BBQ. </br> “Say your friend is suicidal. You have to figure out where she’s calling from.” </br></br> Where is she calling from?", 
  "Now the house is empty. </br> Now the school is empty. </br> Now the fridge is empty. </br> Now the conversation is lacking enamel.", 
  "Between the first person and the third is you. </br> *eye roll* </br> *drum-roll, please*",
  "Photographing a house does not give the same effect as filming it.",
  "“The New CoDependency” is a title running sideways on a spine on the shelf.",
  "Today an email from A: “Attached is the thesis. And here is what I promised about what reminded me of you in Bion. Well it’s a little complex, clearer after you read the essay, but what reminded me of you is perhaps obvious…your attraction to… [alphanumerics]. And I mean that genuinely. It’s Laplanche—and I only did a cursory reading of this—who suggests that… having her nipple in the mouths, and so on…” </br></br> Go on. </br></br> (Short shorts: keep your eyes off my knees. Can I store my acid in the classroom fridge?) </br></br> Tomorrow a third-party email: “Hello. I’m very sorry to get in touch with you, I am A’s partner. I checked his email last night and I saw that he had deleted all the emails and moved them to a folder that also contained an email to you. The one with his thesis attached. I get the impression that.…”",
  "in </br> now on </br> between </br> now </br> I like to look at fruit close up. </br> I like a word that changes meaning on the way. </br> I like a crime scene best before the vase topples down on her head."




]

var chunkIdx = 0;

var volume = new Tone.Volume(-12);
var synth = new Tone.PolySynth(7, Tone.Synth).chain(volume, Tone.Master);
var notes = Tone.Frequency("G4").harmonize([7, 5, 3, 2, 0, -1, -3, -5, -7, -9, -10, 12, 10, 8, 7, 5, 3, 2, 0, -2, -4, -5, 15, 14, 12, 10, 8, 7, 5, 3, 2, 0, -2, 19, 17, 15, 14, 12, 11, 9, 7, 5, 3, 2]);
var noteIdx = 0;

//have to click to start audio context
StartAudioContext(Tone.context, window);

$(document).ready(function(event){
  //mute
  Tone.Master.mute = localStorage.getItem('mute') == 'true' ? true : false;
  let text = Tone.Master.mute ? "SOUND ON" : "MUTE";
  $("#mute-btn").text(text);

  width = $(window).innerWidth();
  height = $(window).innerHeight();

  displayTitle(title, author);
  tv = setInterval(rotateVertical, 1000);
  th = setInterval(rotateHorizontal, 2000);
});

function displayText(i){
  let p = $("<div></div>");
  p.append(chunks[i]);
  // let tab = Math.random() * 80 + 10;
  // p.css("margin-left", tab + "%");
  p.css("width", 100/curr_subdivide_max + "%");
  curr_subdivide++;
  if (curr_subdivide >= curr_subdivide_max){
      curr_subdivide_max++;
      if (curr_subdivide_max > 4){
        curr_subdivide_max = 1;
      }
    curr_subdivide = 0;
  }
  p.addClass("chunk");
  $("#container").append(p);
  p.get(0).scrollIntoView({behavior: "smooth", block: "start"});


}

$(document).on("click", ".chunk", function(e){
  synth.triggerAttackRelease(notes[noteIdx % notes.length], "2n");
  noteIdx++;
  chunkIdx++;
    $(e.target).removeClass("chunk");
  if (chunkIdx < chunks.length){

    displayText(chunkIdx);
  }

});

function brickBuilding(){
  let p = $("<div></div>");
  p.css("width", 100/curr_brick_subdivide_max + "%");
  curr_brick_subdivide++;
  if (curr_brick_subdivide >= curr_brick_subdivide_max){
    curr_brick_subdivide_max++;
    curr_brick_subdivide = 0;
  }
  p.addClass("brick");
  $("#container").append(p);
}

// Common
function displayTitle(title, author){
  $("#title").html(title + "<br>by " + author);
  setTimeout(() => {
    $("#title").addClass("title-small");
    displayText(chunkIdx);
    setInterval(brickBuilding, brick_speed);
  }, 1500);
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
  localStorage.setItem('mute', Tone.Master.mute);
  $(this).text(Tone.Master.mute ? "SOUND ON" : "MUTE");
});

$("#clockContainer").mouseenter(function(){
  clearInterval(tv);
  clearInterval(th);
  tv = setInterval(rotateVertical, 30);
  th = setInterval(rotateHorizontal, 30);
  $("#nav").addClass("showNav");
  $("#clockContainer").children().addClass("navClock");
});

$("#clockContainer").mouseleave(function(){
  clearInterval(tv);
  clearInterval(th);
  tv = setInterval(rotateVertical, 1000);
  th = setInterval(rotateHorizontal, 1000);
});

$("#nav").mouseleave(function(){
  $("#nav").removeClass("showNav");
  $("#clockContainer").children().removeClass("navClock");
});

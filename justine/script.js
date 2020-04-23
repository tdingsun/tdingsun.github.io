var width;
var height;
var title = "7 Poems";
var author = "Justine Nguyễn-Nguyễn"
var speed = 250;

var poems = [
  "we approach the cotton anniversary of the day I ponder accidence. * * * * * * * * * * a jeep, I think * * * * * * * * * * ",

  "GOYA gives me the greenlight, nods go go go * the rumbling halves * I am obedient, satisfied. * ticket-taker’s eyes shrink for * a * shockblue * second * they * don’t * make * my * walls sticky like the skins do, like the 4-digit fruits do, too * * * * * * * * * * ",

  "what she remembers about her childhood is its smallness, the sandbags stacked around it * how five don’t fit on the back of a moped, skinny as they are * * * * * and for him? a chauffeur, a room in a yard too heavy with fruit * built for nights that hiss * but he stops sleepwalking when boys who cry wolf! begin to sound like lullaby * * * * * until night spits rocket s * s * s * s * s * s sssings into the house next door and the mornings become mornings after * * * * * * * * * * ",

  "in a civil war “_____” who could tell what side you were on by looking? * * * * * * * * * * face sees face * * * * * face stops face * * * * * face asks face for face * * * * * face takes face from face * * * * * face tells face * to cut his hair * * * * * * * * * * he grew it long * * * * * his uniform consisted of a white shirt, navy trousers. by the eleventh or twelfth grade, he had shed the navy trousers for bell-bottom jeans * * * * * (which were permissible under the dress code, he protested, by virtue of being blue, and pants) * * * * * * * * * * ",

  "iii. ♞’s tour * * * * * don’t you think inheritance might move in Ls? * * * * * * * * * * * * * * * (as in Left-handed) * * * * * (as in Love for ebay) * * * * * (as in * * * * * * * * * * * * * * * ii. Loneliness  * * * * * on thanksgiving, * * * * * * * * * * ",

  "you focus on arranging almonds into the gingham * * * * * red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red white red while dad’s little brother soapboxes at the mouth about the moon and sandy hook and your big sister defends journalism * * * * * as if tears won’t fall wherever almonds fall * * * * * * * * * * and unc-Ls could un-fall * * down the youtubehole * * in a house dehiscent with their favorite flowers(i) * * the only witnesses, mouths agape * * * * * ) * * * * * * * * * * i. orchidaceae origin story: an obituary * * * * * a bee, * a stingless bee, * * * * * was found trapped * in miocene amber * * * * * * * * * * ",

  "grandma and I ren dez vous when our mothertongues fumble * * * * * she forms a question * the girl, what is her name * the way she pleads for cake, silk knot chin already cradling a dust of crumbs * * * * * what is her name * ask milkdropped eyes, white dwarves with distant deaths untraveled * and girl’s mouth, * grave, fills like nosebleed held too tight, but here * * * * * here, and here, every girl is also daughter * so I swallow— grandgirl learns to be a good stranger * * * * * to be a good stranger ~normally ~two ~kisses ~is ~sufficient to be a good stranger ~don’t ~linger ~too ~long, ~or to be a good stranger ~learn ~to ~greet/to ~say ~goodbye * * * * * ~you ~will ~either ~barely ~touch ~cheeks ~or ~even ~not ~quite ~touch ~at ~all * * * * * * * * * * "
];

var poems_split = [];
var timeouts = [null, null, null, null, null, null, null];
var curr_index = [];

//have to click to start audio context
StartAudioContext(Tone.context, window);

poems.forEach(function(poem, index){
  poems_split.push(poem.split(" "));
});

var volume = new Tone.Volume(-6);
var synth = new Tone.PolySynth(7, Tone.Synth).chain(volume, Tone.Master);
var notes = Tone.Frequency("C3").harmonize([0, 4, 7, 12, 16, 19, 24]);

$(document).ready(function(event){
  width = $(window).innerWidth();
  height = $(window).innerHeight();
  displayTitle(title, author);
  setTimeout(setupText, 1500);
  setInterval(rotateVertical, 1000);
  setInterval(rotateHorizontal, 2000);
});

$("#title").click(function(event){
  $(".box").removeClass("on");
  $(".box").removeClass("off");
  timeouts.forEach(function(t, index){
    clearTimeout(t);
  });
});

$(".box").click(function(event){
  let id = $(this).attr('id')[2] - 1;

  if($(this).hasClass("on")){
    clearTimeout(timeouts[id]);
    $(this).addClass("off");
    $(this).removeClass("on");
  } else {
    cycle(id, poems_split[id].length);
    $(this).removeClass("off");
    $(this).addClass("on");
  }
});


function displayTitle(title, author){
  $("#title").html(title + "<br>by " + author);
}

function setupText(){

  poems_split.forEach(function(poem, index){
    let max = poem.length;
    curr_index[index] = 0;
  });

  $("#container").show();

  $("#title").css({
    "font-size": "2rem"
  });

}

function cycle(i, max){
  if(curr_index[i] % max == 0){
    curr_index[i] = 0;
  }

  let word = poems_split[i][curr_index[i]];

  if(word == "*"){
    $(`#box${i + 1}`).html("“&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;”");
  } else{

    synth.triggerAttackRelease(notes[i], "1n");

    if(word[0] == "~"){
      word = word.substring(1);
      $(`#box${i + 1}`).html($(`<i>${word}</i>`));
    } else {
      $(`#box${i + 1}`).text(word);
    }
  } 
  curr_index[i]++;

  var syllables = RiTa.getSyllables(word);
	var syllables_arr = syllables.split("/");
  var time = syllables_arr.length * speed;

  timeouts[i] = setTimeout(cycle, time, i, max);
}

// Common

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
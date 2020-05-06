var width;
var height;
var title = "Itchy, Fluffy, and Incomplete Things";
var author = "Anonymous"

var paragraphs = ["有人将夜色切了一个完美的洞，露出它乳白的布满细密纹路的皮肤深处，久久凝望着的我，忘记了像往常一样，用什么把这缺了的填上，在膨胀的无言中，乳白色的凝视回望着我，有人将我切了一个完美的洞", "4 am. I’m keeping my paper lamp on later than I should be. Pursuing an unusual trajectory of time, of wakeness, I synced my body clock to something unfamiliar and nostalgic. Tip-toeing, dancing along the line of creepiness, I began to think of your lamp. I imagined it be a cool fluorescent one, just like the full moon tonight. And an hour ago you would’ve put it to sleep. I wish you would’ve put me to sleep too.", "你走后的一段时间里，夏夜依旧还不彻底，那日清澈的空气时而微恙起来。我走在路上，觉得身边路过的一切都可成为我秘密地献给你的礼物。我说自己贪心不足，美丽的月亮和美丽的花都想要，但那时我或许真的想说的是，美丽的月亮和美丽的花我都想要，但现在让我把它们都献给你吧。我站在白色山茶花丛前，看着手指间的香烟慢慢将自己吞噬，残忍却温柔。我拿起用手机拍一张照，犹豫再三是不是该发上网，最后作罢。但那张照片我还是似乎小心地存了下来，可能是对我自己酝酿着的渴望的警告，如同此刻我正提防着脑中隐隐的冲动，要去用这香烟去碰那白色花瓣。注定烫出个洞。", "私の庭に一羽のうさぎは角が生えてきた。追い詰められ、追いつめたらますますその輪郭が鮮明に見えた。ままらなぬこの世に愛だけはそのまま。"];

var pDivs = [];

var word_index = 0;
var volume = new Tone.Volume(-6);
var synth = new Tone.PolySynth(4, Tone.Synth).chain(volume, Tone.Master);
var notes = Tone.Frequency("E1").harmonize([0, 4, 7, 11, 14, 17, 21]);

var tv;
var th;

$(document).ready(function(event){
  width = $(window).innerWidth();
  height = $(window).innerHeight();
  displayTitle(title, author);
  setTimeout(setupText, 1500);
  tv = setInterval(rotateVertical, 1000);
  th = setInterval(rotateHorizontal, 2000);

  $('.row').on("scroll", ".paragraph", function(event){
    console.log("hi");
    var randNote = Math.floor(Math.random() * notes.length);
    synth.triggerAttackRelease(notes[randNote], "16n");
  });
  
});

$("#mute-btn").click(function(){
  Tone.Master.mute = !Tone.Master.mute;
  $(this).text($(this).text() == 'MUTE' ? 'SOUND ON' : 'MUTE');
});


$("#handle").draggable({
  drag: function(event, ui){
    ui.position.left = Math.min(Math.max( 50, ui.position.left ), width - 100);
    ui.position.top = Math.min(Math.max( 50, ui.position.top ), height - 100);

    let x = ui.position.left + 25;
    let y = ui.position.top + 25;  
    $("#row1").children().first().css("width", x);
    $("#row2").children().first().css("width", x);
    $("#row1").css("height", y);

    var randNote = Math.floor(Math.random() * notes.length);
    synth.triggerAttackRelease(notes[randNote], "16n");
  }
});



function displayTitle(title, author){
  $("#title").html(title + "<br>by " + author);
}

function setupText(){
  paragraphs.forEach(function(p, index){
    let newDiv = $(`<div class="paragraph"></div>`);
    newDiv.text(p);
    if(index < 2){
      $("#row1").append(newDiv);
    } else {
      $("#row2").append(newDiv);
    }
  });

  $("#title").css({
    "font-size": "3rem"
  });
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

$("#clockContainer").mouseenter(function(){
  clearInterval(tv);
  clearInterval(th);
  tv = setInterval(rotateVertical, 30);
  th = setInterval(rotateHorizontal, 30);
});

$("#clockContainer").mouseleave(function(){
  clearInterval(tv);
  clearInterval(th);
  tv = setInterval(rotateVertical, 1000);
  th = setInterval(rotateHorizontal, 1000);
});
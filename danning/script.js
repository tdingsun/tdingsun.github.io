var width;
var height;
var title = "Untitled";
var author = "Danning Niu"
var speed = 1000;

var paragraphs = ["有人将夜色切了一个完美的洞, 露出它乳白的布满细密纹路的皮肤深处, 久久凝望着的我, 忘记了像往常一样, 用什么把这缺了的填上, 在膨胀的无言中, 乳白色的凝视回望着我, 有人将我切了一个完美的洞", "4 am. I’m keeping my paper lamp on later than I should be. Pursuing an unusual trajectory of time, of wakeness, I synced my body clock to something unfamiliar and nostalgic. Tip-toeing, dancing along the line of creepiness, I began to think of your lamp. I imagined it be a cool fluorescent one, just like the full moon tonight. And an hour ago you would’ve put it to sleep. I wish you would’ve put me to sleep too.", "你走后的一段时间里，夏夜依旧还不彻底，那日清澈的空气时而微恙起来。我走在路上，觉得身边路过的一切都可成为我秘密地献给你的礼物。我说自己贪心不足，美丽的月亮和美丽的花都想要，但那时我或许真的想说的是，美丽的月亮和美丽的花我都想要，但现在让我把它们都献给你吧。我站在白色山茶花丛前，看着手指间的香烟慢慢将自己吞噬，残忍却温柔。我拿起用手机拍一张照，犹豫再三是不是该发上网，最后作罢。但那张照片我还是似乎小心地存了下来，可能是对我自己酝酿着的渴望的警告，如同此刻我正提防着脑中隐隐的冲动，要去用这香烟去碰那白色花瓣。注定烫出个洞。", "私の庭に一羽のうさぎは角が生えてきた。追い詰められ、追いつめたらますますその輪郭が鮮明に見えた。ままらなぬこの世に愛だけはそのまま。"];

var pDivs = [];

var word_index = 0;
var synth = new Tone.PolySynth(4, Tone.Synth).toMaster();
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
  // requestAnimationFrame(timer);


});

var lastScrollTop = 0;
var blur = 0;
var blur_r = 0;
var reverse = false;
var zoom = 100;

$(window).click(function(event){
  event.preventDefault();
  pDivs.forEach(function(obj, index){
    let div = obj[0];
    let zVal = obj[1];
    div.css("transform", "translateZ(" + (zVal - zoom) + "px)");
  });
  zoom += 100;
});


function displayTitle(title, author){
  $("#title").html(title + "<br>by " + author);
}

function setupText(){
  paragraphs.forEach(function(p, index){
    let newP = $("<p></p>");
    let newDiv = $(`<div class="paragraph"></div>`);
    newP.text(p);
    newDiv.append(newP);
    pDivs.push([newDiv, index * 1000]);
    $("#container").append(newDiv);
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
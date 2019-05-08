var regex = /[.;:]/;
var text_array = RiTa.splitSentences("I am interested in writing within structures. My core belief is that the anonymous, mostly hidden structures of the internet does not deny the possibility of poetry. I imagine words springing up from technical jargon like moss in the cracks of pavement. There is the possibility of subjectivity even in the most banal of metadata. Hopefully. There is poetry in the listing of things. There is also poetry in the un-catalog-able-ness of things. The embrace of structure and the refusal of structure can cohabitate multipliciously. After the structuralism of modernity and the deconstruction / post-structuralist impulses of post-modernity, I think that what emerges is a type of pragmatism about the material reality of structure. There are certain structures like race and class and capitalism and the internet, etc. etc. that most likely are not going away anytime soon. I think that what emerges as being most important is a reckoning of the daily mundanity (and the mundanity of violence) of living within these structures existing at the same time, in the same place as a constant pushing against these structures. Contradictions no longer need to be resolved. This mirrors my interest in structure, lists, taxonomies, pantheons, etc. as ways to generate graphic content. It also recalls the adage of learning the grid and then learning how to break it.");

var div_array = [];
var n = text_array.length;
for (let i = 0; i < n; i++){
  div_array = div_array.concat(document.createElement('div'));
}


var offset_x = 50;
var x_dir = 1;
var offset_y = 50;
$(document).ready(function() {
  for(let d of div_array){
    $(d).css("left", offset_x);
    $(d).css("top", offset_y);
    $(d).css("position", "absolute");
    $("body").append(d);
    if(offset_x >= $(window).width() - (100+$(d).width())){
      x_dir = -1;
    } else if(offset_x <= 50){
      x_dir = 1;
    }
    offset_x += 50*x_dir;
    offset_y += 50;
  }

  for(let i = 0; i < div_array.length; i++){
    $(div_array[i]).text(text_array[i]);
  }

  $("div").draggable({
    stack: "div",
    grid: [50, 50],
    // start: function(event, ui){
		// 	$(this).css("transition", "0s");
		// },
		// stop: function(event, ui){
		// 	$(this).css("transition", "0.25s");
		// }
  });

  $("div").click(function(){
    $(this).css('z-index', 2);
    $(this).siblings('div').css('z-index', 1);


  });

  var intervalID;
  $("div").hover(function(){
    var old_top = parseInt($(this).css('top'), 10);
    // var old_left = parseInt($(this).css('left'), 10);
    $(this).css('top', old_top-(Math.floor(Math.random()*10)+5));
    // $(this).css('left', old_left+Math.floor(Math.random()*2)-1);

    var ref = this;
    intervalID = setInterval(function(){
      new_string = changeString($(ref).text());
      $(ref).text(new_string);
    }, (Math.floor(Math.random()*5000 + 5000)));

  }, function(){
    var old_top = parseInt($(this).css('top'), 10);
    // var old_left = parseInt($(this).css('left'), 10);
    $(this).css('top', old_top+(Math.floor(Math.random()*10)+5));
    // $(this).css('left', old_left-Math.floor(Math.random()*2)-1);
    // clearInterval(intervalID);
  });


  $(window).on('resize', function(){
    offset_x = 50;
    x_dir = 1;
    offset_y = 50;
    console.log("resize");
    for(let d of div_array){
      $(d).css("left", offset_x);
      $(d).css("top", offset_y);
      if(offset_x > $(window).width() - (150+$(d).width())){
        x_dir = -1;
      } else if(offset_x <= 50){
        x_dir = 1;
      }
      offset_x += 50*x_dir;
      offset_y += 50;
    }
  });

});



function changeString(string){
  var words = RiTa.tokenize(string);
  var rand = Math.floor(Math.random()*words.length);
  var tag = RiTa.getPosTags(words[rand]);
  var new_word = RiTa.randomWord(tag[0]);
  // console.log(new_word);
  words[rand] = new_word;
  return RiTa.untokenize(words);
}

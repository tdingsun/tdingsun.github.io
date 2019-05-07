var w;
var h;
var count = 0;
var hue = 0;
var imgcount = 0;

var str = "American Drift: There is no one around for miles and miles. There are blue mountains in the distance, slightly occluded by build up of thick air via distance, not to mention the heat that shimmers and light. Not to mention the glistens sweet on brow and eyelash, further blueing everything you see. It is bright. You are following train tracks. You don’t remember when or where or why you started walking. You just are.  The tracks extends from the east towards the west. They stretch out towards the horizon in both directions. But then, gradually, (the hero the antihero the villain the dancer the priest the wanderer the poet the judge) A cloud of dust and steam in the distance. A low rumble. A train whistle. Your sun-beaten cheeks reveal nothing to me. And then there is the idea of the frontier as a place outside of the conniving confines of society. A place for escape. But what do you know about freedom? You, who dreams of freedom, knows not what it means to be confined. One thousand hands. Cold. Core absences in the sky. Thats what you see outside your window as you attempt to light a match. After fumbling for a few seconds, you get it, and light the stovetop. The click click and smell of gas coats your senses. The familiar experience of the confluent phenomena becomes another bead on the string. Fingers crumbling dry biscuit. You glance at the sky again, and for a second you swear that the mountain range in the distance did not use to be there. Antihero Glance Glaze Gleam Glisten Glide Glow Glory Graze Grime Gristle Growl Grin Groan ordinary social relations are non-existent. cunning and irony (the tricks, deceits, unexpected actions and sarcasm of the hero) and pathos (terror and brutality against the defenseless and against the hero after his double play has been revealed) (a sparse composition of pure white clouds and the brightest blue you’ve ever seen.) Footage of lasso tricks. Low saturation. Slowed down until the individual frames are made legible, then interpolated so as to recount smoothness again. Turns the lasso into a slow meander molasses of rope, a steady / unsteady circle obliquely and tastefully angled from the camera lens. Cut. Left. Cut. Right. Arm motions in wide strokes, air rendered into thick watery gel. Glowing, floating, pink quartz castle easy-eases up and down. Purple spires and teal moat. Fresnel reflection / refraction, semi-realistic water physics simulation. Specular highlights. A recuperation of obsolete rendering techniques. The river water recedes yearly tension. Grey and white checkerboard marks transparency, marks absence, placeholder for context. Assets, and asset management. Leaking / leeching data away. Relentless copying. Antichrist — see, antithesis. Antihero— Furrow— Brow— Sweat— Jaw— Harmonica, Washboard, Banjo, Jug Individualism we all so value, at its highest market value at moments when landscape looks like wasteland, the earth is cracked and dried, the plants shriveled, no longer green but desiccated olive drab. Curled over itself, the only thing that could be said to be thriving or at least surviving are those dusty prickly pears, and those equally dusty roamers, wayward-ers, nomads, wanderers, Green —  the apocalypse may be about the figure of the antichrist arriving, but afterwards, what is left? When true moral virtue is replaced by the antihero arriving, all rough and tumble and scuffed and rugged, a perpetual furrow in the brow, beads of sweat lingering precariously at the edge of chiseled jaws. Shattered jaws. Rigid jaws. Apocalypse — The apocalypse of 1492, after all is said and (not done yet), and the dust is (not quite settled), the historical shift in cultural consciousness from commemoration to condemnation, what’s left is the brute forced, hacked, jammed, promise made fulfilled of promised, empty land. Always empty, so empty, except for a few dead pixels that refuse to go away, the residual data persisting, against all odds and all logics evading deletion. The sandy dunes of promise and hope. Figure — figure and background, cherished subjectivity. What’s mine is yours. The desire to be the one who has it all. The birthright of those who survey the land and see jewels hidden in between the ferns, under logs, under loam, covered in moss, covered in lichen, teeming with maggots and ants, pulsating in wild circular patterns. Together they pulsate, the wetware wood seems to pulsate too. Imagining that the hidden roots underground grow and twist and tangle together into one giant network, cybernetics seems so salivation-inducing. But there are hidden costs. Name them.";
var words = str.split(" ");

StartAudioContext(Tone.context, 'div').then(function(){
  //started
  console.log("clicked");

});

//have to click to start audio context
$(document).click(function(){
  //Tone.start();
  console.log("clicked");
});

var synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
var notes = Tone.Frequency("G2").harmonize([1, 3, 6, 8, 10, 
                                            3, 6, 8, 10, 13, 
                                            6, 8, 10, 13, 15, 
                                            8, 10, 13, 15, 18,
                                            10, 13, 15, 18, 20, 22]);
var noteIndex = 0;


$(document).ready(function(){
  let isTextNode = (_, el) => el.nodeType === Node.TEXT_NODE;

  w = $(window).width();
  h = $(window).height();
  var div = $("<div>");
  div.css({
    height: '100vh',
    width: '100vw',
  });

  div.css("font-size", w/4);



  div.addClass("leaf");
  $("body").append(div);
  div.append(words[count]);
  count++;

  //recursion
  $("div").on("click", function(event){
      synth.triggerAttackRelease(notes[noteIndex], "8n");
      noteIndex++;
      if(noteIndex >= notes.length){
        noteIndex = 0;
      }


      var text = $(event.target).contents().filter(isTextNode);
      $(event.target).contents().filter(isTextNode).remove();


      var bgrimg = null;
      if($(event.target).css("background-image") == "none"){
                //var currcolor = $(event.target).css("color");

      var div = $("<div>");
      var div_2 = $("<div>");
      var parentw = parseInt($(event.target).css("width"), 10);
      var parenth = parseInt($(event.target).css("height"), 10);

      div.append(text);
      if(bgrimg != null){
        div.css("background-image", bgrimg);
      }
      //div.css("color", currcolor);
      //div.css("border-color", "hsl(" + hue + ", 75%, 50%)");


      var rand = Math.random();
      if(rand > 0.1){
        div_2.append(words[count]);
        count++;
      } else {
        //div_2.append('<img src="images/bluesky.png"/>');
        if(imgcount % 3 == 0){
          div_2.css("background-image", "url(images/bluesky3.png)");
          imgcount++;
        } else if (imgcount % 3 == 1) {
          div_2.css("background-image", "url(images/bluesky2.png)");
          imgcount++;

        } else {
          div_2.css("background-image", "url(images/bluesky.png)");
          imgcount++;

        }

      }
      //div_2.css("color", "hsl(" + hue + ", 75%, 50%)");
      //div_2.css("border-color", "hsl(" + hue + ", 75%, 50%)");
      //hue++;



      if(parentw > parenth){
        div.css({
          height: '100%',
          width: '50%'
        });
        div_2.css({
          height: '100%',
          width: '50%'
        });

      } else {
        div.css({
          height: '50%',
          width: '100%'
        });
        div_2.css({
          height: '50%',
          width: '100%'
        });
      }

      div.css("font-size", parenth/4);
      div_2.css("font-size", parenth/4);


      div.addClass("leaf");
      div_2.addClass("leaf");

      $(event.target).append(div);
      $(event.target).append(div_2);
      $(event.target).removeClass("leaf");
      $(event.target).addClass("branch");
      event.stopPropagation();
    }



});


});




$(window).resize(function(){
  w = $(window).width();
  h = $(window).height();
});
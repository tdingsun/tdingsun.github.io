var w;
var h;
var count = 0;
var hue = 0;
var imgcount = 0;

var str = "There is no one around for miles and miles. There are blue mountains in the distance, slightly occluded by build up of thick air via distance, not to mention the heat that shimmers and light. Not to mention the glisten of sweet on brow and eyelash, further blueing everything you see. It is bright. You are following train tracks. You don’t remember when or where or why you started walking. You just are. Blueing: verb. To make blue. anyways. The tracks extends from the east towards the west. They stretch out towards the horizon in both directions. But then, gradually, The hero the antihero the villain the savages — brutal, wild, inhuman, fundamentally othered. the ghost town the guns the horses the saddle the waterskins the cured meats the Oregon trail A cloud of dust and steam in the distance. A low rumble. A train whistle. Do we trust the cowboy’s vigilantism? The obvious answer is no. The sun-beaten cheeks reveal nothing to me. And then there is the idea of the frontier as a place outside of the conniving confines of society. A place for escape.  But what do you know about freedom? You are he who knows not what it means not to be free. One thousand hands. A snake slithers up to you and offers you a piece. Cold. Core absences in the sky. Thats what you look at outside your window as you attempt to light a match for the gas range. After fumbling for a few seconds, you get it, and light the stovetop. The click click and smell of gas coat your senses. The familiar experience of the confluent phenomena become another bead on the string. Fingers crumbling dry biscuit. You glance at the sky again, and for a second you swear that the mountain range in the distance looks low-poly. Glance Glaze Gleam Glisten Glide Glow Glory Graze Grime Gristle Growl Grin Groan. You heat up a can of refried beans. A completely unrelatable experience. A thin wisp of steam cascades upwards. You— ordinary social relations are non-existent. cunning and irony (the tricks, deceits, unexpected actions and sarcasm of the hero) and pathos (terror and brutality against defenseless people and against the hero after his double play has been revealed) American drift. Not Clint Eastwood but the image of Clint Eastwood in the mind of someone who has never seen a movie with Clint Eastwood. Get me out of here. Contrary to popular belief, I don’t actually identify with Chinese families that have been in the U.S for generations. The prospect of gold. Prospector. Wealth tied to land. Another foreign grouping the already bizarre and open landscape of the west. Love me a pair of blue jeans. There’s something beautiful about a lack on infrastructure. Theres something to be said about a spars composition of pure white clouds and the brightest blue you’ve ever seen. ";
var words = str.split(" ");

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
// function transformScroll(event) {
//     if (!event.deltaY) {
//       return;
//     }
//     console.log("scrolling");
//     event.currentTarget.scrollLeft += event.deltaY;
//     event.preventDefault();
//   }
  
//   var element = document.scrollingElement || document.documentElement;
//   element.addEventListener('wheel', transformScroll);

// var colors = ["#fcf", "#fcc", "#fc9", "#fc6", "#fc3", "#fc0"];
// var cc = 0
var l = 0;
var new_l = 0;

$(document).ready(function(){
    $(window).keydown(function(event){
        event.preventDefault();
        var currPos = $(window).scrollLeft()
        remainder = Math.floor(currPos) % Math.floor(window.innerWidth);
        if(event.key === "ArrowLeft"){
            // $("body").css("background-color", colors[cc]);
            // cc = (cc - 1) % colors.length
            if (remainder <= 1){
                $(window).scrollLeft((currPos - remainder) - window.innerWidth);
            } else {
                $(window).scrollLeft(currPos - remainder);
            }
        }
        if(event.key === "ArrowRight"){
            // $("body").css("background-color", colors[cc]);
            // cc = (cc + 1) % colors.length
            $(window).scrollLeft((currPos - remainder) + window.innerWidth);
        }
    })

    locations = [];
    num_chapters = 4;
    for(let i = 1; i<=num_chapters; i++){
        var location = $(`#h${i}`).offset();
        locations.push(location.left);
        
    }

    $(window).scroll(function(){
        for(let i = num_chapters; i > 0; i--){
            console.log("hi");
            if (locations[i-1] <= $(window).scrollLeft()){
                new_l = i;
                break;
            }
        }
        console.log(l)
        console.log(new_l)
        if(l != new_l){
            l = new_l
            $(".navitem").css({
                'background-color': "pink",
                'color': "blue"           
            });
            $(`#nav${l}`).css({
                'background-color': "blue",
                'color': "pink"    
            });
        }
    });
});
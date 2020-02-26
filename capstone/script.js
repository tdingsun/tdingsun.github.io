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
});
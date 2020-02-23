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

$(document).ready(function(){
    $(window).keydown(function(event){
        event.preventDefault();

        var currPos = $(window).scrollLeft()
        remainder = Math.floor(currPos) % Math.floor(window.innerWidth);
        if(event.key === "ArrowLeft"){
            if (remainder <= 1){
                $(window).scrollLeft((currPos - remainder) - window.innerWidth);
            } else {
                $(window).scrollLeft(currPos - remainder);
            }
        }
        if(event.key === "ArrowRight"){
            $(window).scrollLeft((currPos - remainder) + window.innerWidth);
        }
    })
});
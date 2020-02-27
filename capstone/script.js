
// var colors = ["#fcf", "#fcc", "#fc9", "#fc6", "#fc3", "#fc0"];
var l = 0;
var new_l = 0;

$(document).ready(function(){
    $(window).keydown(function(event){
        event.preventDefault();
        var currPos = $(window).scrollLeft();
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

    locations = [];
    num_chapters = 4;
    for(let i = 1; i<=num_chapters; i++){
        var location = $(`#h${i}`).offset();
        locations.push(location.left);
        
    }

    $(window).scroll(function(){
        for(let i = num_chapters; i > 0; i--){
            if (locations[i-1] <= $(window).scrollLeft()){
                new_l = i;
                break;
            }
        }

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

    $('.navitem').click(function(e){
        e.stopPropagation();
        $(".navitem").css({
            'background-color': "pink",
            'color': "blue"           
        });
        $(this).css({
            'background-color': "blue",
            'color': "pink"    
        });
    });
});
var title = "<span id='maintitle'>HYBRID WORLDING:</span><br><i>What Can Graphic Design Learn from Poetics and World-building?</i>";
var author = "<a class='author' href='tiger.exposed'>Tiger Dingsun</a>"

let md = window.markdownit({html: true});

var width;

$("document").ready(function(){
    width = $(window).width();
    displayText();
});

$("#handle").draggable({
    grid: [50, 50],
    axis: "x",
    containment: "#container",
    zIndex: 100,
    drag: function(event, ui){
        ui.position.left = Math.min(Math.max( 50, ui.position.left ), width - 100);
        let x = ui.position.left + 12.5;

        $("#left").css("width", x);
    }
});

function displayText(){
    $("#title").html(title + "<br>by " + author);

    $.ajax({
        url: `md/essay.md`,
        datatype: "html",
        success: function(markdown){
            let html = md.render(markdown);
            $(`#right`).html(html);
        }
    });
    $.ajax({
        url: `md/exercises.md`,
        datatype: "html",
        success: function(markdown){
            let html = md.render(markdown);
            $(`#left`).append(html);
        }
    });
}
var title = "10 Poems";
var author = "Greta Sk"

var colors = ["red", "forestgreen", "orange", "magenta", "cornflowerblue", "darkgoldenrod", "teal", "purple", "yellowgreen"];
var color_index = 0;

var offset_dict = {}

var lh = 1;
var lh_unit = 1;

var padding = 100;
var i = 0;
var speed = 350;

var currRotateV = 0;
var currRotateH = 0;

var synth = new Tone.PolySynth(5, Tone.Synth).toMaster();
var notes = Tone.Frequency("A3").harmonize([0, 2, 5, 7, 9, 12]);

StartAudioContext(Tone.context, 'div');
//have to click to start audio context
$(document).click(function(){
	console.log("clicked");
	Tone.start();
});

let md = window.markdownit({html: true});

$("document").ready(function(){
    displayTitle(title, author);
    setTimeout(displayFirst, 1000);
    setInterval(rotateVertical, speed);
    setInterval(rotateHorizontal, speed*2);
});

$("#title").click(function(){
    displayFirst()
    $("#body").css({
        "line-height": "1.5em",
        "margin-top": "5px"
    });
    lh = 1;
    lh_unit = 1;
    offset_dict = {};

});

$("#container").on("click", ".link", function(e){
    var el = $(this);
    var level = el.parents().length
    if (offset_dict[level] == null){
        offset_dict[level] = 1
    }
    console.log(level);
    console.log(offset_dict[level]);
    var link = this.getAttribute("data-link");
    $.ajax({
        url: link,
        datatype: "html",
        success: function(markdown){
            let html = md.render(markdown);

            let div = $("<div class='poem'></div>");

            div.css({
                "color": colors[color_index % colors.length],
                "padding-top": offset_dict[level] + "em",
                "z-index": 0,
            });
            color_index++;
            offset_dict[level] += lh_unit;
            lh += lh_unit;

            div.html(html);
            el.after(div);

            $("#body").css({
                "line-height": lh + "em",
            });
            $("p").css({
                "margin-bottom": lh + "em" 
            })
            $("h3").css({
                "margin-bottom": lh + "em" 
            })

            setTimeout(cloneLinks(div), 500);


            el.get(0).scrollIntoView({behavior: "smooth", block: "start"});
            el.css({
                color: "white",
                "background-color": "black",
                padding: "3px"
            });
            el.removeClass("link");
        }
    });
});

function cloneLinks(div){
    var newlinks = div.find(".link");
    console.log(newlinks)
    newlinks.each(function(index, element){
        console.log(element);
        let offset = $(element).offset();
        let left = offset.left;
        let top = offset.top;
        console.log(left);
        console.log(top);
        let clone = $(element).clone();
        let divwrapper = $("<div></div>");

        $(divwrapper).css({
            position: "absolute",
            top: top,
            left: left,
            "z-index": 1,
            "padding": "2px",
        });
        divwrapper.append(clone);
        $("#body").append(divwrapper);
    });
}

function displayTitle(title, author){
    $("#title").html(title + "<br>by<br>" + author);
}


function displayFirst(){
    $.ajax({
        url: "chasing.md",
        datatype: "html",
        success: function(markdown){
            let html = md.render(markdown);
            $("#title").removeClass("centered").addClass("runner");
            $("#body").html(html);
            $("h3").css({
                "line-height": 0
            });
        }
    });
}

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
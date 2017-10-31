$(document).ready(function(){
var rand;
$("img").each(function(index, element){
	rand = Math.random() + 0.5;
	$(element).css("animation-duration", rand + "s");
})
$("body").mouseup( function() {
	var mytext = selectHTML();
	//$('span').css("font-style", "italic");
	
})

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
        }, 1000);
    });


})




function selectHTML() {
	  try {
        if (window.ActiveXObject) {
            var c = document.selection.createRange();
            return c.htmlText;
        }
    
        var nNd = document.createElement("span");
        var w = getSelection().getRangeAt(0);
        w.surroundContents(nNd);
        return nNd.innerHTML;
    } catch (e) {
        if (window.ActiveXObject) {
            return document.selection.createRange();
        } else {
            return getSelection();
        }
    }
}
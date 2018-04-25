

$(document).ready(function() {

	var l = 2000 - (($(window).width() - 1000)/2);
	var t = 1050;
	console.log(l);
	console.log(t);
	window.scroll(l,t);


	$(".draggable").draggable({
		stack: ".draggable",
		cursor: "grabbing",
		start: function(event, ui){
			$(this).css("transition", "0s");
			$(this).blur();
		},
		stop: function(event, ui){
			$(this).css("transition", "0s");
			$(this).blur();
		}

	});


	$(".draggable").mousedown(function(event){
	 	$(this).css("transition", "0.5s");

	 });
});

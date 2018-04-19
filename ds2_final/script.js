$(document).ready(function() {
	$(".draggable").draggable({
		stack: ".draggable",
		cursor: "grabbing",
		grid: [50,50],
		start: function(event, ui){
			$(this).css("transition", "0s");
			// $(this).css("position", "relative");
			$(this).blur();
		},
		stop: function(event, ui){
			$(this).css("transition", "0s");
			// $(this).css("position", "relative");

			$(this).blur();
		}

	});


	$(".draggable").mousedown(function(event){
	 	$(this).css("transition", "0.5s");

	 });
});

$(document).ready(function(){
	$("#about").hide();
	$("#about-button").click(function() {
		$("#about").slideToggle();

		if ( $("#about-button").text() == "[ABOUT]" ){
			// $("#about-button").text("[HIDE]");
			// $("#about-button").css("top", "42px");
			// $("#about-button").css("right", "40px");
			// $("#about-button").css("font-size", "1em");
		} else {
			$("#about-button").css("font-family", "sans-serif");
			$("#about-button").css("color", "#F05324");
			$("#about-button").text("[?]");
			$("#about-button").css("top", "30px");
			$("#about-button").css("right", "20px");
			$("#about-button").css("font-size", "1.4em");
		}
	});
});
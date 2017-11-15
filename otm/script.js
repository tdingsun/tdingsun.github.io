$(document).ready(function(){

	//hide about page and episode container initially
	$("#about").hide();
	$(".episode-container").hide();

	//add padding to the top of the episode continer equal to the height of the nav bar
	var nav_height = $('.nav').outerHeight();
	$(".container").css("padding-top", nav_height + 20);
	
	//moving the position and width of the section description div to be more responsive
	if ($(window).width() < 1166){
		$(".section-des").css("width", "calc(40% - 220px)");
		$(".section-des").css("left", "calc(60% + 40px)");

	} else {
		var des_w = $(window).width() - 1020;
		$(".section-des").css("width", des_w);
		$(".section-des").css("left", "820px");
	}

	//on window resizing, update the width and position of the section description div
	$(window).resize(function(){
		var nav_height = $('.nav').outerHeight();
		$(".container").css("padding-top", nav_height + 20);

		if ($(window).width() < 1166){
			$(".section-des").css("width", "calc(40% - 220px)");
			$(".section-des").css("left", "calc(60% + 40px)");

		} else {
			var des_w = $(window).width() - 1020;
			$(".section-des").css("width", des_w);
			$(".section-des").css("left", "820px");
		}
	});

	//toggling the visibility and appearance of the about container div on hover and on click
	$("#about-container").hover(function() {
		$("#hr-about").toggleClass('hr-long');
	});
	$("#about-container").click(function() {
		$("#about").slideToggle();
	});

	$(".button").hover(function() {
		$(".button hr").toggleClass('hr-white');
		$(".button hr").toggleClass('hr-long');
	});

	//toggling the visibility and appearance of the 'listen' button
	$(".episode-button").hover(function() {
		var hr = jQuery(this).find(".hr-long");
		$(hr).toggleClass("hr-white");
	});

	$(".episode").click(function() {
		var ec = jQuery(this).find(".episode-container");
		var eb = jQuery(this).find(".episode-button");
		
		//open or close current module
		var st = $("body").scrollTop();
		$(ec).slideToggle(250);

		$(eb).toggleClass("episode-button-open");
	});


	//Hide Header on on scroll down
	var didScroll;
	var lastScrollTop = 0;
	var delta = 50;
	var navbarHeight = $('.nav').outerHeight();

	$(window).scroll(function(event){
	    didScroll = true;
	});

	setInterval(function() {
	    if (didScroll) {
	        hasScrolled();
	        didScroll = false;
	    }
	}, 250);

	function hasScrolled() {
	    var st = $(this).scrollTop();
	    
	    // Make sure they scroll more than delta
	    if(Math.abs(lastScrollTop - st) <= delta)
	        return;
	    
	    // If they scrolled down and are past the navbar, add class .nav-up.
	    // This is necessary so you never see what is "behind" the navbar.
	    if (st > lastScrollTop && st > navbarHeight){
	        // Scroll Down
	        $('.nav').removeClass('nav-down').addClass('nav-up');
	    } else {
	        // Scroll Up
	        if(st + $(window).height() < $(document).height()) {
	            $('.nav').removeClass('nav-up').addClass('nav-down');
	        }
	    }
	    
	    lastScrollTop = st;
	}


	//animating scrolling to an anchored section on the page
	$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    	}, 1000);
	});

});


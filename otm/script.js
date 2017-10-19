var w;
$(document).ready(function(){
	$("#about").hide();
	$(".episode-container").hide();

	//checkSize();
	var nav_height = $('.nav').outerHeight();
	$(".episode-page").css("margin-top", nav_height + 40);

	$(window).resize(function(){
		//checkSize();
		var nav_height = $('.nav').outerHeight();
		$(".episode-page").css("margin-top", nav_height + 40);

	});

	//about toggle
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

	//episode toggle -- gotta change from slidetoggle
	//to toggleclass
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

		
		// var sibs = $(this).siblings(".episode");
		// var other_ec = jQuery(sibs).find(".episode-container");
		// $(other_ec).slideUp();
		$(eb).toggleClass("episode-button-open");
	});


	//Hide Header on on scroll down
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
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




	$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    	}, 1000);
	});

});

// function checkSize(){
// 	if (window.matchMedia('(max-width: 786px)').matches) {
// 		var nav_height = $('.nav').outerHeight();
// 		$(".episode-page").css("margin-top", nav_height + 40);
// 	} else {
// 		$(".episode-page").css("margin-top", "20px");
// 	}
// }


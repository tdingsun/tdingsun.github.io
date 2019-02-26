$(window).scroll(function () {
	var viewTop = $(window).scrollTop();
	var viewBottom = viewTop + $(window).height();
	$("img").each(function( index ) {
		var imgTop = $(this).offset().top; //element top
		var imgBottom = imgTop + $(this).outerHeight();

		if ((imgBottom > (viewTop - 500) ) && (imgTop < (viewBottom + 500))) {
			$(this).removeClass('no_animation').addClass('animated');
		} else {
			$(this).addClass('no_animation').removeClass('animated');
		}
	});	
});
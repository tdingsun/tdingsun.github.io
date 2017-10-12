$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});

$(document).ready(function(){

	setTimeout(function(){
		$('#logo').css('animation-duration', '0s');
		$('#logo').css('animation-duration', '3s');
	}, 2000);

});
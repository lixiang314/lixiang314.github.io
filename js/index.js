
$(document).ready(function(){

	$('.section').mouseover(function(){
		$(this).find('.demo-info').show();
	});

	$('.section').mouseout(function(){
		$(this).find('.demo-info').hide();
	});

});
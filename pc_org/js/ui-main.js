$(function(){

	//main slider
	var mainSwiper = new Swiper('.main-slider', {
		slidesPerView: 1,
		loop: true,
		speed: 400,
		effect: 'fade',
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable : true,
		},
		allowTouchMove : false,
		disableOnInteraction: true,
	});


	//favorite slider
	var mainSwiper = new Swiper('.favorite-slider', {
		slidesPerView: 1,
		loop: true,
		speed: 400,
		autoplay: {
			delay: 3500,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable : true,
		},
		disableOnInteraction: true,
	});

	//main search
	$(".main-search-condition .bt-condtion").on("click", function(){
		var targetSltr = $(this).data("selector");

		$(".search-condition-selector").addClass("view");
		$(".search-condition-selector .selector-type").removeClass("active");
		$("#" + targetSltr).addClass("active");
	});
	
})

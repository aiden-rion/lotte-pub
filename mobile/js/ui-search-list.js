$(function(){
	// 230727 검색결과없음 :: 이미지 랜덤출력 선언
	randomImg('#randomImg-01');		// 판매중차량


	//검색조건 : 주행거리
	$(".item-distance .bt-func").on("click", function(){
		if($(this).is(".bt-select-direct")){//직접선택
			$(".item-distance .range").hide();
			$(".item-distance .direct").show();
		}
		if($(this).is(".bt-select-range")){//구간선택
			$(".item-distance .direct").hide();
			$(".item-distance .range").show();
		}
	});
	$("#dstcSlider").slider({
		range: true,
		min: 0,
		max: 100000,
		step:1000,
		values: [0, 80000],
		slide: function(event, ui) {
			$("#dstcSliderVal").val(ui.values[0] + "km" + " ~ " + ui.values[1] + "km");
		}
	});
	$("#dstcSliderVal").val($("#dstcSlider").slider("values", 0) + "km" + " ~ " + +$("#dstcSlider").slider("values", 1) + "km");

	//검색조건 : 가격
	$(".item-price .bt-func").on("click", function(){
		if($(this).is(".bt-select-direct")){//직접선택
			$(".item-price .range").hide();
			$(".item-price .direct").show();
		}
		if($(this).is(".bt-select-range")){//구간선택
			$(".item-price .direct").hide();
			$(".item-price .range").show();
		}
	})
	$("#priceSlider").slider({
		range: true,
		min: 0,
		max: 10000,
		step: 1000,
		values: [0, 10000],
		slide: function(event, ui) {
			$("#prcSliderVal").val(ui.values[0] + "만원" + " ~ " + ui.values[1] + "만원");
		}
	});
	//$("#prcSliderVal").val($("#priceSlider").slider("values", 0) + "만원" + " ~ " + +$("#priceSlider").slider("values", 1) + "만원");

	// 썸네일 슬라이더
	let thumbSwiper = new Swiper('.car-thumb-slider', {
		direction: 'horizontal',
		slidesPerView: 1,
		grabCursor: true,
		spaceBetween: 0,
		speed: 300,  // 230720 수정
		pagination: {
			el: '.swiper-pagination',
			// dynamicBullets: true,
			type: 'fraction'

		},
	});

})

// 230727 검색결과없음 :: 이미지 랜덤출력 js (참고요청)
function randomImg (target) {
	const images = [
		"search-fail-img-01.png",
		"search-fail-img-02.png",
		"search-fail-img-03.png",
		"search-fail-img-04.png",
		"search-fail-img-05.png"
	];
	let randomSrc = images[Math.floor(Math.random() * images.length)];
	document.querySelector(target).src = `./images/elements/${randomSrc}`;
}
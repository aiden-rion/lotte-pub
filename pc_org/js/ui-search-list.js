$(function(){

	if($(".search-list-container").length){
		jQuery(window).on({
			scroll: function() {
				filterFixed();
			}
		}).trigger("scroll")
	}

	function filterFixed() {
		// var headerHg = jQuery(".layout--header-1").outerHeight() || 0,
		// 	bannerHg = jQuery(".full-banner-area").outerHeight() || 0,
		// 	containerHg = jQuery(".ctn-search-list").outerHeight(),
		// 	windowHg = jQuery(window).outerHeight(),
		var footerTop = jQuery(".layout--footer").offset().top - 1000,
			topHg = jQuery(".ctn-search-list").offset().top + 20;	// ### 230726 숫자(padding)값 수정

		if($(window).scrollTop() <= topHg) {
			$(".search-condition").css("top", "initial");
			$(".search-condition").css("bottom", "initial");
			$(".search-condition").removeClass("fixed");
		} else if($(window).scrollTop() <= footerTop) {
			$(".search-condition").css("top", 0);
			$(".search-condition").css("bottom", 0);
			$(".search-condition").addClass("fixed")
		} else {
			$(".search-condition").css("top", "initial");
			$(".search-condition").css("bottom", 0);
			$(".search-condition").removeClass("fixed");
		}
	}
	// ### 230810 참고 :: 스크롤시 기본정보 고정영역 (hg추가에 따른 계산식 변경)
	if($(".car-main-info").length) {
		var a = jQuery(".car-main-info").height()
			, hg = jQuery(".car-main-info").outerHeight()
			, c = jQuery(".car-main-info").offset().top + hg;
		$(window).on({
			scroll: function() {
				jQuery(window).scrollTop() >= c ? (jQuery(".section-right, .car-main-info").addClass("fixed"),
					jQuery(".section-right").css("paddingTop", a)) : (jQuery(".section-right, .car-main-info").removeClass("fixed"),
					jQuery(".section-right").css("paddingTop", ""))
			}
		})
	}

	//detail open
	$(".link-detail-view").on("click", function(){
		$(".search-detail-wrapper").addClass("detail--visible");
		$("body").addClass("search-detail-visible");
	})

	//detail close
	$(".bt-close-detail-view, .search-detail-mask").on("click", function(){
		$(".search-detail-wrapper").removeClass("detail--visible");
		$("body").removeClass("search-detail-visible");
	})

	//custom scroll
	$(".custom-scroller").mCustomScrollbar({
		axis : "y",
		scrollButtons: {
			enable: false
		},
		advanced:{
		autoScrollOnFocus: false,
		updateOnContentResize: true
		},
		//scrollInertia: 0,
		//scrollbarPosition: "outside"
	});

	//custom scroll detail
	$(".custom-scroller-detail").mCustomScrollbar({
		axis : "y",
		scrollButtons: {
			enable: false
		},
		advanced:{
			autoScrollOnFocus: false,
			updateOnContentResize: true
		},
		scrollbarPosition: "outside",
		// 230330 추가 (scrollInertia, mouseWheel, callbacks)
		scrollInertia: 180,
		mouseWheel:{ scrollAmount: 200 },
		callbacks:{
			onScrollStart:function() {
				$(".scroll-arrow-area").addClass("hidden");
			}
		}
	})


	//검색조건 : 제조사 - 모델 - 세무모델 선택 flow 보여주기 위한 스크립트 입니다. 실제 개발시 삭제/변경 무관.
	$(".mnfc .bt-item").on("click", function(){//제조사
		var prt = $(this).parents(".condition-item");
		prt.find(".selected-option").append("<button type='button' class='bt-selected-item mnfc'>" + $(this).data("mnfc") + "</button>");
		prt.find(".select-type-button.mnfc").hide();
		prt.find(".select-type-button.model").show();
	})
	$(".model .bt-item").on("click", function(){//모델
		var prt = $(this).parents(".condition-item");
		prt.find(".selected-option").append("<button type='button' class='bt-selected-item model'>" + $(this).data("model") + "</button>");
		prt.find(".select-type-button.model").hide();
		prt.find(".select-type-button.dmodel").show();
	})
	$(".dmodel .bt-item").on("click", function(){//세부모델
		var prt = $(this).parents(".condition-item");
		prt.find(".selected-option").append("<button type='button' class='bt-selected-item dmodel'>" + $(this).data("dmodel") + "</button>");
		prt.find(".select-type-button.dmodel").hide();
		prt.find(".select-type-button.grade").show();
	})
	$(".grade .bt-item").on("click", function(){//세부모델
		var prt = $(this).parents(".condition-item");
		prt.find(".selected-option").append("<button type='button' class='bt-selected-item grade'>" + $(this).data("grade") + "</button>");
		prt.find(".select-type-button.grade").hide();
	})
	$(document).on('click', '.item-model .bt-selected-item', function(){
		var $this = $(this);
		var prt = $this.parents(".condition-item");

		$this.remove();
		prt.find(".select-type-button").hide();
		
		if($this.is(".mnfc")){
			prt.find(".bt-selected-item.model, .bt-selected-item.dmodel").remove();
			prt.find(".select-type-button.mnfc").show();
		}
		if($this.is(".model")){
			prt.find(".bt-selected-item.dmodel").remove();
			prt.find(".select-type-button.model").show();
		}
		if($this.is(".dmodel")){
			prt.find(".bt-selected-item.grade").remove();
			prt.find(".select-type-button.dmodel").show();
		}
		if($this.is(".grade")){
			prt.find(".select-type-button.grade").show();
		}
	})

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

	//키워드검색
	$(".item-keyword #schKwd").on("keyup", function(){
		var kwdValue = $(this).val();
		if(kwdValue != ""){
			$(".item-keyword .sch-result").addClass("open");
		}else{
			$(".item-keyword .sch-result").removeClass("open");
		}
	})
	$(document).click(function(e){ 
		var $tg = $(".sch-result");
		if($tg.has(e.target).length === 0 && $tg.hasClass("open")){
			$(".sch-result").removeClass("open");
			$(".item-keyword #schKwd").val("");
		}
	});

	//최근검색
	$(".bt-search-history").on("click", function(){
		$(".search-history").toggleClass("open");
	})
	$(".search-history .kwd li a").on("click", function(){
		$(".search-history").removeClass("open");
	})

})

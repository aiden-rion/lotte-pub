var $sideMenu, lastScroll;

//document ready
$(document).ready(function(){
	uiInit();
});
//uiInit
function uiInit(){

	lastScroll = 0;
	
	ui.common();
	pageTopFn();

	$sideMenu = $("#sideMenu");
	$filterMenu = $("#filterPopup");		// 230524 추가

	if($(".bot-fixed").length){
		botFixedBtn();
	}

	if($(".bottom-quick-nav").length){
		botQuickNav();
	}

	$(window).on({
		scroll : function(){
			pageTopFn();
			scrollFixedFn();		// 230523 추가

			//  230904 추가
			if($(".layout--wrap.landing.optional").length){
				landingPageScrollEv();	
			}
		}
	})

}


var ui = {
		
	common : function(){
		var t = this;
		
		t.categoryUnit();
		t.sideMenuToggle();
		// t.filterToggle();		// 230524 추가
		t.layerToggleFn();
		t.gnbActive();
	},

	categoryUnit : function(){
		if($(".layout--container").length){
			var cls = $(".layout--container").attr("class").split(' ')[1];
			
			if(cls != undefined) {
				$("body").addClass("body-" + cls);
			}

			switch(cls){
				//index
				case 'ctn-index':
					
					break;
				
				//search list
				case 'ctn-search-list':

					searchListUI();

					break;
				
				//etc
				case 'ctn-etc':

					default:
			}
		}
	},

	gnbActive : function(){
		$(".gnb .bt-flip").on("click", function(){
			var depth1 = $(this).parents(".depth1");

			depth1.toggleClass("active");
		})
	},

	sideMenuToggle : function(){

		$(".bt-sidemenu, .sdwBg").click(function(){
			if($sideMenu.hasClass("open")){
				$sideMenu.removeClass("open");
				$("body").removeClass("menuActive");
				$(".sdwBg").remove();
			}else{
				$sideMenu.addClass("open");
				$("body").addClass("menuActive");
				$(".layout--header").append("<div class='sdwBg'></div>")
			}
		})
		
		$(document).on("click", ".sdwBg", function(){
			$sideMenu.removeClass("open");
			$("body").removeClass("menuActive");
			$(".sdwBg").remove();
		})

	},


	// 230524 필터 toggle 이벤트 추가
	filterToggle : function(){
		$(".bt-list-filter, .sdwBg").click(function(e){
			e.preventDefault();
			e.stopPropagation();
			
			if($filterMenu.hasClass("open")){
				$filterMenu.removeClass("open");
				$("body").removeClass("filterActive");
				$(".sdwBg").remove();
			}else{
				$filterMenu.addClass("open");
				$("body").addClass("filterActive");
				$(".list-element").append("<div class='sdwBg'></div>")
			}
		})
		
		$(document).on("click", ".sdwBg", function(){
			$filterMenu.removeClass("open");
			$("body").removeClass("filterActive");
			$(".sdwBg").remove();
		})
	},
	
	
	modalPopOpen : function(modalID){
		var $target = $(modalID);
			$target.css({
				display:"block"
			})

		$("body").addClass("modalOpen");
	},

	modalPopClose : function(modalID){
		var $target = $(modalID);
		$target .css("display","none");

		$("body").removeClass("modalOpen");
	},

	clsToggleFn : function(target, cls){
		$(target).toggleClass(cls);
	},

	// 230412 툴팁 닫기 수정 (배경클릭시 툴팁 닫기) 
	// layerToggleFn : function(){
	// 	$(".common-layer-bt").on("click", function(){
	// 		var current = $(".common-layer-group.view");

	// 		$(this).parents(".common-layer-group").addClass("view");
	// 		current.removeClass("view");
	// 	})
	// },

	layerToggleFn : function(){
		$(".common-layer-bt").on("click", function(){
			var current = $(".common-layer-group.view");

			$(this).parents(".common-layer-group").addClass("view");
			current.removeClass("view");
		})
		$(document).click(function(e){ 
			var $tg = $(".common-layer-group");

			if($tg.has(e.target).length === 0 && $tg.hasClass("view")){
				$(".common-layer-group").removeClass("view");
			}
		});
	},
	
	pageScrTop : function(){
		$(".floating-page-top button").on('click', function(){
			var sctPos = $(".layout--wrap").offset().top;
			$('html,body').stop().animate({'scrollTop':sctPos+'px'},500);
		});
	},

}

//page top button
var pageTopFn = function(){
	if($(".floating-page-top button").length){
		var st = $(this).scrollTop(),
			$pageTop = $(".floating-page-top button");
	
		if (st >= 60){
			$pageTop.addClass("active");
		}
		else if(st === lastScroll){
			$pageTop.removeClass("active");
		}
	}
}


// 230523 mainpage fixed filter button
let lastY = $(window).scrollTop();

var scrollFixedFn = function(){
	const $filterTab = $(".list-search");
	const $header = $(".layout--header.main");

	let currY = $(this).scrollTop();
	const tabPos = 250;
	
	// 필터탭 scrollTop 기준
	if(currY <= tabPos) {   // up

		$filterTab.removeClass("active");
		$header.addClass("relative");
		$header.removeClass("fixed");
		$filterTab.removeClass("secondary")

	} else {		 		// down

		$filterTab.addClass("active");
		// (currY > lastY) ? $header.addClass("relative") : ((currY === lastY) ? 'none' : 'up');
		(currY > lastY) ? $header.addClass("relative") :$header.removeClass("relative");

		if(currY < lastY) {    // up
			$header.removeClass("relative");
			$header.addClass("fixed");
			$filterTab.addClass("secondary")
		} else {               // down
			$header.addClass("relative");
			$header.removeClass("fixed");
			$filterTab.removeClass("secondary")
		}

	}

	lastY = currY;
}

//searchListUI
function searchListUI(){

	//검색조건 : 항목 토글
	$(document).on('click', '.condition-item[data-fold="foldable"] .bt-flip', function(){
		$(this).parents(".condition-item[data-fold='foldable']").toggleClass("unfold");
	});

	//검색조건 : 버튼타입 클릭 시 클래스 부여
	$(".condition-item .bt-item").on("click", function(){
		$(this).toggleClass("selected");
	});

}


//fixed button check
function botFixedBtn(){
	var btH = $(".bot-fixed").height();
	$("body").css("paddingBottom", btH);
}

//fixed bottom quick nav check
function botQuickNav(){
	var btH = $(".bottom-quick-nav").height();
	$(".layout--wrap").css("paddingBottom", btH);
}


//  230904 추가
// 인수옵션형 안내페이지 스크롤 이벤트
let landingPageScrollEv = function(){
	var pos = $(window).scrollTop();
	let ratio = $( window ).width() * 0.9;
	let area01pos = $(".layout--wrap.landing.optional .layout--container .area.area01").offset().top - ratio;
	let area02pos = $(".layout--wrap.landing.optional .layout--container .area.area02").offset().top - ratio;
	let area03pos = $(".layout--wrap.landing.optional .layout--container .area.area03").offset().top - ratio;

	if (pos < area01pos && pos >= 0) {  				  	 // ***** main
		$(".layout--wrap.landing.optional .layout--container .area.area01 .lotte-wrap .car").removeClass("on");			// 01 OFF
		$(".layout--wrap.landing.optional .layout--container .area.area02 .blank-wrap .blank").removeClass("on");		// 02 OFF
		$(".layout--wrap.landing.optional .layout--container .area.main .car-wrap .icon").addClass("on");				// main ON
	} else if (pos < area02pos && pos >= area01pos) { 	 	 // ***** 01. 중고차 장기렌터카
		$(".layout--wrap.landing.optional .layout--container .area.area01 .lotte-wrap .car").addClass("on");			// 01 ON
	} else if (pos < area03pos && pos >= area02pos)  { 	 	 // ***** 02. 이런 분들께 추천드려요!
		$(".layout--wrap.landing.optional .layout--container .area.main .car-wrap .icon").removeClass("on");			// main OFF
		$(".layout--wrap.landing.optional .layout--container .area.area01 .lotte-wrap .car").removeClass("on");			// 01 OFF
		
		// 02 ON
		if($(".layout--wrap.landing.optional .layout--container .area.area02 .blank-wrap .blank01").hasClass('on') === false) {
			$(".layout--wrap.landing.optional .layout--container .area.area02 .blank-wrap .blank01").addClass("on");
			setTimeout(() => { $(".layout--wrap.landing.optional .layout--container .area.area02 .blank-wrap .blank02").addClass("on"); }, 300);
			setTimeout(() => { $(".layout--wrap.landing.optional .layout--container .area.area02 .blank-wrap .blank03").addClass("on"); }, 600);
			setTimeout(() => { $(".layout--wrap.landing.optional .layout--container .area.area02 .blank-wrap .blank04").addClass("on"); }, 900);
		}
	}  else {
		$(".layout--wrap.landing.optional .layout--container .area.main .car-wrap .icon").removeClass("on");			// main OFF
		$(".layout--wrap.landing.optional .layout--container .area.area01 .lotte-wrap .car").removeClass("on");			// 01 OFF
	}
}
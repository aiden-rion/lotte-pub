

$(document).ready(function() {

	

    //비쥬얼 상단
    $('.vsLeft a').on('mouseover',function(){  
        $('.vsRight').removeClass('active');
        $('.vsLeft').addClass('active');  
    });
    $('.vsRight a').on('mouseover',function(){
        $('.vsLeft').removeClass('active');
        $('.vsRight').addClass('active');
    });

    //비쥬얼 검색 
    $('.btnSrhSelect').on('click',function(){    
        $(this).toggleClass('active');
        $('.selectSrh').toggleClass('active');
    });
    $('.btnSrhOpen').on('click',function(){    
        $('.srhBx').hide();
        $('.srhWrap').fadeIn();
    });
    $('.btnSrhClose').on('click',function(){    
        $('.srhBx').show();
        $('.srhWrap').fadeOut();
    });


    // 검색 셀렉트 dim
    $('.selectSrh li a').on('click',function(){  
        var srhSelectTxt = $(this).text();
        $('.btnSrhSelect').text(srhSelectTxt);
        $('.btnSrhSelect,.selectSrh').removeClass('active');
    });
    $('.srhTxtList li a').on('click',function(){  
        var mainSrhTxt = $(this).text();
        $('.mainSrhTxt').attr('value',mainSrhTxt);
        $('.srhTxtList').hide();
    });

    // 카운터 
    const $counters = $(".countNum");
        
    const exposurePercentage = 100; // ex) 스크롤 했을 때 $counters 컨텐츠가 화면에 100% 노출되면 숫자가 올라갑니다.
    const duration = 1000; // ex) 1000 = 1초
    
    const addCommas = true; // ex) true = 1,000 / false = 1000
    
    function updateCounter($el, start, end) {
        let startTime;
        function animateCounter(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / duration;
            const current = Math.round(start + progress * (end - start));
            const formattedNumber = addCommas ? current.toLocaleString() : current;
            $el.text(formattedNumber);
            
            if (progress < 1) {
                requestAnimationFrame(animateCounter);
            } else {
                $el.text(addCommas ? end.toLocaleString() : end);
            }
        }
        requestAnimationFrame(animateCounter);
    }

    
    // 카운터 스크롤 이벤트
    $(window).on('scroll', function() {
        $counters.each(function() {
            const $el = $(this);
            if (!$el.data('scrolled')) {
                const rect = $el[0].getBoundingClientRect();
                const winHeight = window.innerHeight;
                const contentHeight = rect.bottom - rect.top;
                
                if (rect.top <= winHeight - (contentHeight * exposurePercentage / 100) && rect.bottom >= (contentHeight * exposurePercentage / 100)) {
                    const start = parseInt($el.data("start"));
                    const end = parseInt($el.data("end"));
                    updateCounter($el, start, end);
                    $el.data('scrolled', true);
                }
            }
        });
    }).scroll();


    // 구매하고 싶어요 & 렌트하고 싶어요 
    $('.brandList button').on('click',function(){     
        var brandText = $(this).text();
        $('.brandTxt .txt').text(brandText);                       
        $('.brandTxt').attr('disabled', false);                      
        $('.brandList button').removeClass('active');
        $('.brandListBx').hide();
        $('.typeListWrap').show();            
        $(this).addClass('active');		
    }); 
    $('.typeList button').on('click',function(){        
        var typeText = $(this).text();
        $('.typeTxt .txt').text(typeText);    
        $('.typeTxt').attr('disabled', false);                    
        $('.typeList button').removeClass('active'); 
        $('.detailListWrap').show();
        $('.typeListWrap').hide();              
        $(this).addClass('active');					
    });      
    $('.detailList button').on('click',function(){    
        var detailText = $(this).text();
        $('.detailTxt .txt').text(detailText);  
        $('.detailTxt').attr('disabled', false);                         
        $('.detailList button').removeClass('active');             
        $(this).addClass('active');
    });      

    // 브랜드 카종류 스와이프
    var cateSwiper1 = new Swiper(".typeListBx", {
        slidesPerView: 10,
        slidesPerGroup: 3,
        centeredSlides: false,
        speed : 1500,
        //slidesPerGroupSkip: 1,			
        grabCursor: true,		
        observer: true,
        observeParents: true,	
        initialslide: 1,		
        scrollbar: {
        el: ".swiper-scrollbar",
        },
        navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        },

    });
     // 브랜드 카종류 등급 스와이프
    var cateSwiper2 = new Swiper(".detailListBx", {
        slidesPerView: 10,
        slidesPerGroup: 3,
        centeredSlides: false,
        initialslide: 1,
        speed : 1500,
        grabCursor: true,		
        observer: true,
        observeParents: true,			
        scrollbar: {
        el: ".swiper-scrollbar",
        },
        navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        },
    
    });

    //구매&렌트 Tab
    $('.titTab button').on('click',function(){                            
        $('.titTab button').removeClass('active'); 
        $('.cateTab button').attr('disabled', true); 
        $('.brandTxt .txt,.typeTxt .txt,.detailTxt .txt').text('');              
        $('.brandList button,.typeList button,.detailList button').removeClass('active');
        $('.typeListWrap,.detailListWrap').hide();  
        $('.brandListBx').show();				
        $(this).addClass('active');	
    });    

    //배너 스와이프
    $('.carBanList').slick({
        slidesToShow: 1,
        slidesToScroll: 1,	
        centerMode: true,
        //centerPadding: '130px',
        dots: true,
        arrows: true,
        swipe: false,
        infinite: true,
        autoplay: true,  	
        variableWidth: true,
        focusOnSelect: true,
        // useTransform:false,		
    });

});
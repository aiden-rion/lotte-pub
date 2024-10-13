var sideMn;

//document ready
$(document).ready(function(){
    uiInit();
});
//uiInit
function uiInit(){
    ui.common();
    customScrollCommon();
    headerMenuActive();

    sideMn = $("#sideMenu");
    if(sideMn.length){
        sideMenuScroll();
    }
    // 스크롤 헤더
    ui.scrollHeader();

    // 추가
    ui.datePicker();
    // ui.accodian();
    ui.tab();
    ui.accordionTxt();
    ui.checkAccordion();
    ui.btnOnOff();
    ui.selectHolder();
    ui.ratingStar();
    ui.userSelect();
    //ui.imgUpload();

}

$(document).on('click','.familySiteBtn',function(){
    if($(this).parent().hasClass('active')){
        $('.familySite').removeClass('active');
    }else{
        $(this).parent().addClass('active');
    }
})

$(document).on('click','.familySiteBtn',function(){
    if($(this).parent().hasClass('active')){
        $('.familySite').removeClass('active');
    }else{
        $(this).parent().addClass('active');
    }
})


function userSelect(){
    const selectedOptionText = $(this).find('option:selected').text();
    const optionTextLength = selectedOptionText.length;
    const optionTextWidth = optionTextLength * 2 + 'ch';
    $('#name').css('width', optionTextWidth);
}



var ui = {

    // imgUpload : function (){
    //     $('input').change(function() {
    //         var labelId = $(this).attr('id');
    //         var label = $('label[for="' + labelId + '"]');
    //         var file = this.files[0];
    //
    //         if (file) {
    //             var reader = new FileReader();
    //
    //             reader.onload = function () {
    //                 label.css({
    //                     'background-image': 'url(' + reader.result + ')',
    //                     'background-repeat': 'no-repeat',
    //                     'background-position': 'center',
    //                     'background-size': 'contain',
    //                     'object-fit': 'contain'
    //                 });
    //             };
    //
    //             reader.readAsDataURL(file);
    //         } else {
    //             label.css('background-image', '');
    //         }
    //     });
    // },

    userSelect : function () {

        $('#name').on('change', function() {
            const selectedOptionText = $(this).find('option:selected').text();
            const optionTextLength = selectedOptionText.length;
            const optionTextWidth = optionTextLength * 2 + 'ch';
            $(this).css('width', optionTextWidth);
        });
    },

    mainCard : function () {
        const $card = $('.hot-search-slider .swiper-slide');
        const lastCard = $(".hot-search-slider .swiper-wrapper .swiper-slide").length - 1;

        $('.hot-search-slider .next').click(function () {
            const prependList = function () {
                if ($('.hot-search-slider .swiper-slide').hasClass('activeNow')) {
                    var $slicedCard = $('.hot-search-slider .swiper-slide').slice(lastCard).removeClass('transformThis activeNow');
                    $('.hot-search-slider ul').prepend($slicedCard);
                }
            }
            $('.hot-search-slider li').last().removeClass('transformPrev').addClass('transformThis').prev().addClass('activeNow');
            setTimeout(function () {
                prependList();
            }, 150);
        });

        $('.hot-search-slider .prev').click(function () {
            const appendToList = function () {
                if ($('.hot-search-slider .swiper-slide').hasClass('activeNow')) {
                    var $slicedCard = $('.hot-search-slider .swiper-slide').slice(0, 1).addClass('transformPrev');
                    $('.hot-search-slider .swiper-wrapper').append($slicedCard);
                }
            }

            $('.hot-search-slider li').removeClass('transformPrev').last().addClass('activeNow').prevAll().removeClass('activeNow');
            setTimeout(function () {
                appendToList();
            }, 150);

        })


    },


    tab : function (){
        $(".tab button").click(function (){
            const tabGroup = $(this).closest(".tab-wrap");
            const tabIndex = $(this).index();

            tabGroup.find(".tab button").removeClass("on");
            tabGroup.find(".tab-content").removeClass("on");

            $(this).addClass("on");
            tabGroup.find(".tab-content").eq(tabIndex).addClass("on");
        });
    },

    checkAccordion : function(){
        $('.btn-show').click(function() {
            const wrap = $(this).closest('.agree-accordion-wrap');
            const agreeContent = wrap.find('.agree-content');

            $('.agree-accordion-wrap').not(wrap).find('.agree-content').slideUp('');

            agreeContent.slideToggle();
        });
    },

    // accodian : function() {
    //     const $dt = $(".accodianSlide").find(".accoianTitle").find("dt");
    //     const $dd = $(".accodianSlide").find(".accoianContents");
    //     const $active = "active";
    //
    //     $dt.each(function (idx) {
    //         $(this).click(function () {
    //             const $li = $(this).closest("li");
    //
    //             if ($li.hasClass("active") === false) {
    //                 $li.addClass($active).siblings().removeClass($active);
    //                 const $index = $li.index();
    //                 $dd.eq($index).addClass($active).siblings().removeClass($active);
    //             }
    //         });
    //     });
    // },

    selectHolder: function(){
        $('#hasHolder').on('change', function() {
            if ($(this).find('option:selected').is(':disabled')) {
                $(this).addClass('disabled');
            } else {
                $(this).removeClass('disabled');
            }
        });

        // 페이지 로드 시 초기 설정
        if ($('#hasHolder option:selected').is(':disabled')) {
            $('#hasHolder').addClass('disabled');
        }
    },

    accordionTxt : function() {
        $('.accordion-header').click(function() {
            $(this).addClass('active')
            $(this).next('.accordion-content').addClass("active");
        });

        $('.close-button').click(function() {
            $(this).closest('.accordion-content').removeClass("active");
            $('.accordion-header').removeClass('active')
        });
    },

    btnOnOff : function() {
        // checkbox일때
        $('#checkOnOff').click(function() {
            var button = $('#toggleButton');

            if ($(this).is(':checked')) {
                button.removeClass('off').addClass('on');
            } else {
                button.removeClass('on').addClass('off');
            }
        });

        // radio일때
        $('input[type="radio"]').click(function() {
            if ($('#onOff').is(':checked')) {
                $('#toggleButton').removeClass('off').addClass('on');
            } else {
                $('#toggleButton').removeClass('on').addClass('off');
            }
        });
    },

    ratingStar : function() {
        $('#ratingStar > .star').click(function() {
            $(this).parent().children('span').removeClass('full');
            $(this).addClass('full').prevAll('span').addClass('full');
        })
    },

    datePicker : function(){
        var dateFormat = "yymmdd",
            datepicker = $( ".datePickerBasic").datepicker({
                showOn: "button",
                buttonImage: "./pc/images/rent_new/icon/icon_calendar.svg",
                numberOfMonths: 1,
                dateFormat: "yymmdd",
                dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
                dayNames: [ "(일요일)", "(월요일)", "(화요일)", "(수요일)", "(목요일)", "(금요일)", "(토요일)" ],
                monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                monthNamesShort: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                changeMonth: true,
                changeYear: true,
                showOtherMonths: true,
                selectOtherMonths: true
            })
        $(".hasDatepicker:disabled").siblings(".ui-datepicker-trigger").prop("disabled", true);
    },

    scrollHeader : function (){
        const header = $(".layout--header-new");

        $(window).scroll(function (){
            if ($(this).scrollTop() > 0 ) {
                header.addClass('scroll');
            }else {
                header.removeClass('scroll');
            }
        })
    },

    common : function(){
        var t = this;

        t.categoryUnit();
        t.layerToggleFn();
    },

    categoryUnit : function(){
        if($(".layout--container").length){
            var cls = $(".layout--container").attr("class").split(' ')[1];
            $("body").addClass("body-" + cls);

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
function headerMenuActive(){
    var urlPathName = window.location.pathname;
    var url = urlPathName;

    $("nav > ul > li.depth1 > a").each(function(){
        $(this).removeClass('active');
        if ( $(this).attr("href") == url ){
            $(this).addClass("active");
        }
    });

}

function customScrollCommon(){
    if($(".custom-scroller-common").length){

        //custom scroll
        $(".custom-scroller-common").mCustomScrollbar({
            axis : "y",
            scrollButtons: {
                enable: false
            },
            advanced:{
                autoScrollOnFocus: false,
                updateOnContentResize: true
            },
            scrollInertia: 0,
            //scrollbarPosition: "outside"
        });

    }

}

//Side menu scroll
function sideMenuScroll(){
    $(window).on({
        load : function(){
            var winW = $(window).width();

            if(winW <= 1440){
                sideMn.addClass("flip");
            }else{
                sideMn.removeClass("flip");
            }
        },
        scroll : function(){
            var itemT = sideMn.outerHeight() + 200;
            var limitTop = $(".footer-content").offset().top;

            if (window.pageYOffset > (limitTop - itemT)) {
                sideMn.removeClass("sticky");
            }else{
                sideMn.addClass("sticky");
            }
        },
        resize : function(){
            var winW = $(window).width();

            if(winW <= 1440){
                if(!sideMn.is(".flip")){
                    sideMn.addClass("flip");
                }
            }

        }
    }).trigger('scroll');


    $("#sideHandle").on("click", function(){
        $(sideMn).toggleClass("flip");
    })

}

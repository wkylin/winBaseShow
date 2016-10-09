$(document).ready(function () {
    //nav ux-tabs-item
    $(".ux-tabs-item")
        .on('mouseover', function () {
            var $that = $(this);
            $that.addClass('ux-tabs-active');
        }).on('mouseout', function () {
        var $that = $(this);
        $that.removeClass('ux-tabs-active');
    }).on('click', function () {
        var $that = $(this);
        var index = $that.index();
        var $tabBoxItem = $(".ux-tabs-box-item");
        $that.siblings().removeClass('ux-tabs-current');
        $that.addClass('ux-tabs-current');

        $tabBoxItem.removeClass('ux-tabs-box-current');
        $tabBoxItem.eq(index).addClass('ux-tabs-box-current');
    });

    //ux-link
    $(".ux-link").on('mouseover', function () {
        var $that = $(this);
        $that.addClass('ux-link-active');
    }).on('mouseout', function () {
        var $that = $(this);
        $that.removeClass('ux-link-active');
    });

    //search box
    $(".ux-search-button").on('mouseover', function () {
        $(this).parent(".ux-search-box").addClass("ux-search-active");
    }).on('mouseout', function () {
        $(this).parent(".ux-search-box").removeClass("ux-search-active");
    });

    //区域筛选
    $(window).click(function () {
        $(".ux-district-options").removeClass('ux-show').addClass('ux-hide');
    });
    $(".ux-district-select").on("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        var str = '';
        var $selectSpan = $(".ux-district-select").find("span");
        var $districtOptions = $(".ux-district-options");
        if (!$districtOptions.is(':visible')) {
            $districtOptions.addClass('ux-show');
        } else {
            $districtOptions.removeClass('ux-show');
        }
        var $disOptionsLeft = $districtOptions.offset().left;
        //省份点击
        var $provinceItem = $(".ux-province-item");
        $provinceItem.on("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            str = '';
            var $that = $(this);
            var $thatLeft = $that.offset().left;
            $that.siblings().removeClass("ux-province-active");
            $that.addClass("ux-province-active");

            //设置city的偏移量
            var $cityList = $that.find(".ux-city-list");
            var $allCityList = $(".ux-city-list");
            $cityList.css({'left': $disOptionsLeft - $thatLeft});
            $allCityList.find(".ux-city-item").removeClass('ux-city-active');
            str = $that.find('.ux-province-text').text();
            var temp = str;
            var tempCity='';
            //城市点击
            var $cityItem = $cityList.find('.ux-city-item');
            $cityItem.on("click", function (event) {
                event.preventDefault();
                event.stopPropagation();
                var $that = $(this);
                var $thatLeft = $that.offset().left;
                if ($that.hasClass('ux-city-active')) {
                    return false;
                } else {
                    $that.siblings().removeClass("ux-city-active");
                    $that.addClass("ux-city-active");
                    
                    var $countyList = $that.find(".ux-county-list");
                    var $allCountyList = $(".ux-county-list");
                    $countyList.css({'left': $disOptionsLeft - $thatLeft});
                    $allCountyList.find(".ux-county-item").removeClass('ux-county-active');

                    str = temp;
                    str += ' ' + $that.find('.ux-city-text').text();

                    tempCity=str;
                    
                    //$selectSpan.text(str);
                }

                var $countyItem = $cityList.find('.ux-county-item');
                $countyItem.on("click", function (event) {

                    event.preventDefault();
                    event.stopPropagation();
                    var $that = $(this);
                    if ($that.hasClass('ux-county-active')) {
                        return false;
                    } else {
                        $that.siblings().removeClass("ux-county-active");
                        $that.addClass("ux-county-active");

                        str = tempCity;
                        str += ' ' + $that.text();
                        $selectSpan.text(str);
                        console.log(str);
                    }
                    //隐藏省市选择区域
                    $districtOptions.removeClass('ux-show').addClass('ux-hide');
                }).on('mouseover',function(){
                    event.preventDefault();
                    event.stopPropagation();
                    $(this).addClass('ux-county-hover');
                }).on('mouseout',function(){
                    event.preventDefault();
                    event.stopPropagation();
                    $(this).removeClass('ux-county-hover');
                });
             
            }).on('mouseover',function(event){
                event.preventDefault();
                event.stopPropagation();
                $(this).addClass('ux-city-hover');
            }).on('mouseout',function(event){
                event.preventDefault();
                event.stopPropagation();
                $(this).removeClass('ux-city-hover');
            });
        }).on('mouseover', function (event) {
            event.preventDefault();
            event.stopPropagation();
            $(this).addClass("ux-province-hover");
        }).on('mouseout', function (event) {
            event.preventDefault();
            event.stopPropagation();
            $(this).removeClass("ux-province-hover");
        });
    });

    //偶数列右浮动
    $(".ux-result-item:odd").addClass("ux-odd-item");

    // ux-nav-list
    var $navList = $('.ux-nav-list');
    var $sideBar = $('.ux-sidebar');
    $navList.find('li').on('click', function () {
        var $that = $(this);
        var index = $that.index();
        var $textList = $('.ux-text-list');
        var $textItem = $textList.find('.ux-text-list-item');
        $that.siblings().removeClass('active');
        $that.addClass('active');
        $textItem.find('.ux-title').removeClass('active');
        $textItem.eq(index).find('.ux-title').addClass('active');
    });
    var offsetTop = $('.ux-tabs-box').offset().top;
    $(window).on('scroll', function () {
        var scrollTop = $(this).scrollTop();
        if (scrollTop > offsetTop) {
            $sideBar.css({'position': 'fixed'});
        } else {
            $sideBar.css({'position': 'absolute'});
        }
    });


    //表单 我要参赛
    $('.ux-link,.ux-button-center,.ux-sidebar-button').on('click', function () {
        $('.modal').css({'display': 'block'});
    });
    $('.close,.ux-button').on('click', function () {
        $('.modal').css({'display': 'none'});
        $('.ux-form')[0].reset();
    });

    $('.ux-form-link').on('click', function () {
        
        var $that = $(this);
        var count = 59;
        var timer = null;
        var reg = /^(1[3-9][0-9])\d{8}$/;
        var $fixInput = $('.ux-fix-input');
        var text = $fixInput.val();
        if (reg.test(text)) {
            $fixInput.parents('.ux-form-group').removeClass('ux-error-group');
            $('.ux-error').addClass('ux-hide').find('.ux-error-text').text('');
            timer = setInterval(countDown, 1000);
            $that.attr("disabled", true).addClass('disabled');
            $that.text(60 + " S");
        } else {
            $fixInput.parents('.ux-form-group').addClass('ux-error-group');
            $('.ux-error').removeClass('ux-hide').find('.ux-error-text').text('请输入正确的手机号');
        }

       //倒计时
        function countDown() {
            $that.text(count + " S");
            if (count == 0) {
                $that.text("获取验证码").removeAttr("disabled").removeClass('disabled');
                clearInterval(timer);
            }
            count--;
        }
    });

    //是否持placeholder
    isPlaceHolder();
});

function isPlaceHolder() {
    //判断浏览器是否支持placeholder属性
    var supportPlaceholder = 'placeholder' in document.createElement('input'),
        placeholder = function (input) {
            var text = input.attr('placeholder'),
                defaultValue = input.defaultValue;
            if (!defaultValue) {
                input.val(text).addClass("placeholder");
            }
            input.focus(function () {
                if (input.val() == text) {
                    $(this).val("");
                }
            });
            input.blur(function () {
                if (input.val() == "") {
                    $(this).val(text).addClass("placeholder");
                }
            });
            //输入的字符不为灰色
            input.keydown(function () {
                $(this).removeClass("placeholder");
            });
        };
    //当浏览器不支持placeholder属性时，调用placeholder函数
    if (!supportPlaceholder) {
        $('input').each(function () {
            var text = $(this).attr("placeholder");
            if ($(this).attr("type") == "text") {
                placeholder($(this));
            }
        });
    }
}

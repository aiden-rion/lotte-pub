/*!
 * Nayuda JavaScript Library v0.0.2
 * http://www.nayuda.com/
 *
 * Copyright 2020 Nayuda Coporation and other contributors
 * Date: Mon Apr 30 2019 09:37:17 GMT+0900 (Asia/Seoul Time)
 */

(function(window, undefined){
    var
        document = window.document,
        location = window.location,
        navigator = window.navigator,
        entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        },
        _super = window.nayuda,
        nayuda = function(){
            return new nayuda.init();
        };

    function _json(token, url, data, type, datatype, cache, async, onSuccess, onError, outObj){
        jQuery.support.cors = true;
        jQuery.ajax({
            crossDomain: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': (nayuda.empty(token) ? "" : token),
                'X-CSRF-TOKEN': jQuery('#_csrf').prop('content')
            },
            xhrFields: { withCredentials: false },
            type: type,
            url: url,
            dataType: datatype,
            cache: cache,
            async: async,
            data: data,
            success: function(json) {
                if(onSuccess != null && onSuccess != "undefined"){
                    if(json && typeof json === "string"){
                        onSuccess(JSON.parse(json), outObj);
                    }else{
                        onSuccess(json, outObj);
                    }
                }
            },
            error: function(xmlHttpRequest, textStatus, errorThrown){
                nayuda.hideLoading();
                if(xmlHttpRequest.status == 401){
                    nayuda.alert("로그인이 필요한 서비스 입니다.", function(){
                        //location.href = "/auth/login?afterUrl=" + location.href;
                    });
                }else if(xmlHttpRequest.status == 403){
                    console.log("만료된 페이지입니다.403 오류 _json");
/*
                    nayuda.alert("만료된 페이지입니다.", function(){
                        if(nayuda.isMobileApp()){
                            location.reload();
                        }
                    });
*/

                }else if(xmlHttpRequest.status == 400){
                    nayuda.alert(xmlHttpRequest.responseJSON.response);

                }else if(onError != null && onError != "undefined"){
                    if(xmlHttpRequest.responseJSON){
                        onError(xmlHttpRequest.responseJSON, outObj);
                    }else if(xmlHttpRequest.response){
                        onError(JSON.parse(xmlHttpRequest.response, outObj));
                    }
                }
            }
        });
    }

    function _fileJson(url, data, type, datatype, cache, async, onSuccess, onError, outObj){
        jQuery.support.cors = true;
        jQuery.ajax({
            crossDomain: true,
            beforeSend: function (x) {
                if (x && x.overrideMimeType) {
                    x.overrideMimeType("multipart/form-data");
                }
            },
            processData: false,
            contentType: false,
            timeout: 600000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': jQuery('#_csrf').prop('content')
            },
            xhrFields: { withCredentials: false },
            type: type,
            url: url,
            //dataType: datatype,
            cache: cache,
            async: async,
            data: data,
            success: function(json) {
                if(onSuccess != null && onSuccess != "undefined"){
                    if(json && typeof json === "string"){
                        onSuccess(JSON.parse(json), outObj);
                    }else{
                        onSuccess(json, outObj);
                    }
                }
            }.bind(this),
            error: function(xmlHttpRequest, textStatus, errorThrown){
                nayuda.hideLoading();
                if(xmlHttpRequest.status == 401){
                    nayuda.alert("로그인이 필요한 서비스 입니다.", function(){
                        location.href = "/auth/login?afterUrl=" + location.href;
                    });
                }else if(xmlHttpRequest.status == 403){
                    console.log("만료된 페이지입니다.403 오류 _json");
/*
                    nayuda.alert("만료된 페이지입니다.", function(){
                        if(nayuda.isMobileApp()){
                            location.reload();
                        }
                    });
*/
                }else if(xmlHttpRequest.status == 400){
                    nayuda.alert(xmlHttpRequest.responseJSON.response);

                }else if(onError != null && onError != "undefined"){
                    if(xmlHttpRequest.responseJSON){
                        onError(xmlHttpRequest.responseJSON, outObj);
                    }else if(xmlHttpRequest.response){
                        onError(JSON.parse(xmlHttpRequest.response, outObj));
                    }
                }
                return;
            }.bind(this)
        });
    }

    function _downloadFile(token, url, data, type, onSuccess, onError, outObj){
        jQuery.support.cors = true;
        jQuery.ajax({
            crossDomain: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': token
            },
            xhrFields: {
                withCredentials: false,
                responseType: 'blob',
            },
            type: type,
            url: url,
            cache: false,
            async: true,
            data: data,
            success: function(data) {
                if(onSuccess){onSuccess(data, outObj)}
            }.bind(this),
            error: function(xmlHttpRequest, textStatus, errorThrown){
                if(xmlHttpRequest.status == 401){
                    nayuda.alert("로그인이 필요한 서비스 입니다.", function(){
                        location.href = "/auth/login?afterUrl=" + location.href;
                    });
                }else if(xmlHttpRequest.status == 403){
                    console.log("만료된 페이지입니다.403 오류 _json");
/*
                    nayuda.alert("만료된 페이지입니다.", function(){
                        if(nayuda.isMobileApp()){ location.reload() }
                    });
*/

                }else if(xmlHttpRequest.status == 400){
                    nayuda.alert(xmlHttpRequest.responseJSON.response);
                }else if(onError != null && onError != "undefined"){
                    if(xmlHttpRequest.responseJSON){
                        onError(xmlHttpRequest.responseJSON, outObj);
                    }else if(xmlHttpRequest.response){
                        onError(JSON.parse(xmlHttpRequest.response, outObj));
                    }
                }
                return;
            }.bind(this)
        });
    }

    function _authSign(token, url, data, type, onSuccess, onError, outObj){
        //jQuery.support.cors = true;
        jQuery.ajax({
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            xhrFields: {
                withCredentials: true,
                responseType: 'json',
            },
            type: type,
            url: url,
            cache: false,
            async: true,
            data: data,
            success: function(data) {
                if(onSuccess){onSuccess(data, outObj)}
            }.bind(this),
            error: function(xmlHttpRequest, textStatus, errorThrown){
                if(xmlHttpRequest.status == 401){
                    nayuda.alert("로그인이 필요한 서비스 입니다.", function(){
                        location.href = "/auth/login?afterUrl=" + location.href;
                    });
                }else if(xmlHttpRequest.status == 403){
                    console.log("만료된 페이지입니다.403 오류 _json");
/*
                    nayuda.alert("만료된 페이지입니다.", function(){
                        if(nayuda.isMobileApp()){ location.reload() }
                    });
*/

                }else if(xmlHttpRequest.status == 400){
                    nayuda.alert(xmlHttpRequest.responseJSON.response);

                }else if(onError != null && onError != "undefined"){
                    if(xmlHttpRequest.responseJSON){
                        onError(xmlHttpRequest.responseJSON, outObj);
                    }else if(xmlHttpRequest.response){
                        onError(JSON.parse(xmlHttpRequest.response, outObj));
                    }
                }
                return;
            }.bind(this)
        });
    }

    // public
    var nayuda = nayuda.prototype = {
        hybridAppBridgeName: "LotteAutoMarketHybridApp",
        dataTableObj: {},
    	init : function(){
            return this;
        },
        authSignApi: function(token, url, data, type, onSuccess, outObj){
            _authSign(token, url, data, type, "JSON", false, true, onSuccess, null, outObj);
        },
        authJson: function(token, url, data, type, onSuccess, outObj){
            _json(token, url, data, type, "JSON", false, true, onSuccess, null, outObj);
        },
        json: function(url, data, type, onSuccess, outObj){
            _json("", url, data, type, "JSON", false, true, onSuccess, null, outObj);
        },
        jsonAjax: function(token, url, data, type, onSuccess, onError, outObj){
            _json(token, url, data, type, "JSON", false, true, onSuccess, onError, outObj);
        },
        syncAjax: function(token, url, data, type, onSuccess, onError, outObj){
            _json(token, url, data, type, "JSON", false, false, onSuccess, onError, outObj);
        },
        syncAuthJson: function(token, url, data, type, onSuccess, outObj){
            _json(token, url, data, type, "JSON", false, false, onSuccess, null, outObj);
        },
        fileJson: function(url, data, type, onSuccess, outObj){
            _fileJson(url, data, type, "JSON", false, true, onSuccess, null, outObj);
        },
        fileJsonAjax: function(url, data, type, onSuccess, onError, outObj){
            _fileJson(url, data, type, "JSON", false, true, onSuccess, onError, outObj);
        },
        fileSyncJsonAjax: function(url, data, type, onSuccess, onError, outObj){
            _fileJson(url, data, type, "JSON", false, false, onSuccess, onError, outObj);
        },
        downloadFileAjax: function(token, url, data, type, onSuccess, onError, outObj){
            _downloadFile(token, url, data, type, onSuccess, onError, outObj);
        },
        ajax: function(params){
            jQuery.support.cors = true;
          	return jQuery.ajax(params);
        },
        truncate: function(str, n, useWordBoundary) {
            var singular, tooLong = str.length > n;
            useWordBoundary = useWordBoundary || true;

            // Edge case where someone enters a ridiculously long string.
            str = tooLong ? str.substr(0, n-1) : str;

            singular = (str.search(/\s/) === -1) ? true : false;
            if(!singular) {
              str = useWordBoundary && tooLong ? str.substr(0, str.lastIndexOf(' ')) : str;
            }

            return  tooLong ? str + '...' : str;
        },
        decodeHTMLEntities: function(text){
            var entities = [
                ['apos', '\''],
                ['amp', '&'],
                ['lt', '<'],
                ['gt', '>']
            ];

            for (var i = 0, max = entities.length; i < max; ++i)
                text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);

            return text;
        },
        openPopup: function(url, name, width, height){
		        var newwindow = window.open(url,name,'height=' + width + ',width=' + height + ',resizable=no,scrollbar=no,toolbar=no');
		        if(newwindow == null){
		            return false;
		        }
          	if (window.focus) {newwindow.focus()}
          	return false;
        },
        setCookie: function(name, value, expiredays){
            if(expiredays == null || expiredays == "" || typeof expiredays == "undefined"){
                expiredays = 1;
            }

            var today = new Date();
            today.setDate( today.getDate() + parseInt(expiredays) );
            document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + ";";
            //document.cookie = name + "=" + escape( value ) + "; path=/; HttpOnly; expires=" + today.toGMTString() + ";";
        },
        setCookie2: function(name, value, expiredays){ // decodeURIComponent 디코더 적용
            if(expiredays == null || expiredays == "" || typeof expiredays == "undefined"){
                expiredays = 1;
            }

            var today = new Date();
            today.setDate( today.getDate() + parseInt(expiredays) );
            document.cookie = name + "=" + decodeURIComponent(value) + "; path=/; expires=" + today.toGMTString() + ";";
            //document.cookie = name + "=" + escape( value ) + "; path=/; HttpOnly; expires=" + today.toGMTString() + ";";
        },
        getCookie: function(cname){
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
            }
            return "";
        },
        stripslashes: function(str) {
            str = str.replace(/\\'/g, '\'');
            str = str.replace(/\\"/g, '"');
            str = str.replace(/\\0/g, '\0');
            str = str.replace(/\\\\/g, '\\');
            return str;
        },
        getStartPage: function(page, count){
        	return Math.floor((page - 1) / count) * count + 1;
        },
        getEndPage: function(startPage, count){
        	return startPage + count - 1;
        },
        getNextPage: function(endPage, totalPage){
        	return (endPage + 1) >= totalPage ? totalPage : endPage + 1;
        },
        getPrevPage: function(count, page, startPage){
        	return count >= page ? 1 : startPage - 1;
        },
        getTotalPage: function(total, count){
        	return (total % count) > 0 ? Math.floor(total / count + 1) : (Math.floor(total / count) != 0 ? Math.floor(total / count) : 1);
        },

        initSelectOptions: function(target, title){
            jQuery(target).text('');
            jQuery(target).append('<option value="">' + title + '</option>');
        },

        appendOptions: function(data, target, value, isValueEqualName){
            jQuery.each(data, function(i, obj){
                jQuery(target).append(new Option(obj.name, (isValueEqualName ? obj.name : obj.id), false, (obj.id == value)));
            });
        },

        appendOptionsForCategory: function(data, target, value){
            if(typeof data !== "object"){
                return;    
            }

            jQuery.each(data, function(i, obj){
                var selected = "";

                if(value){
                    if(obj.id == value){
                        selected = "selected='selected'";
                        jQuery('#' + target).val(obj.name);
                    }
                }

                jQuery('#' + target + "_id").append('<option value="' + obj.id + '" ' + selected + '>' + obj.name + '</option>');
            });

            jQuery('#' + target + "_id").select2();
        },

        pageLoadingFrame: function(action){
            var pl_frame = jQuery("<div></div>").addClass("page-loading-frame");

            pl_frame.addClass("v2");

            var loader = new Array();
            loader = '<div class="page-loading-loader"><div class="dot1"></div><div class="dot2"></div></div>';

            if(action == "show" || !action){
                jQuery("body").append(pl_frame.html(loader));
            }

            if(action == "hide"){
                if(jQuery(".page-loading-frame").length > 0){
                    jQuery(".page-loading-frame").addClass("removed");

                    setTimeout(function(){
                        jQuery(".page-loading-frame").remove();
                    },800);
                }

            }
        },
        startTimer: function(duration, display) {
            var start = Date.now(),
                diff,
                minutes,
                seconds;
            if(duration > 0){
                function timer() {
                    // get the number of seconds that have elapsed since
                    // startTimer() was called
                    diff = duration - (((Date.now() - start) / 1000) | 0);

                    // does the same job as parseInt truncates the float
                    hours = (diff / 3600) | 0;
                    minutes = (diff / 60) - (hours * 60) | 0;
                    seconds = (diff % 60) | 0;

                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    seconds = seconds < 10 ? "0" + seconds : seconds;

                    //display.textContent = hours + "시 " + minutes + "분 " + seconds + "초";
                    timeText = "";
                    if(hours > 0){
                        timeText += hours + "시간 ";
                    }
                    timeText += minutes + "분 " + seconds + "초";

                    jQuery(display).text("(" + timeText + ")");

                    if (diff <= 0) {
                        // add one second so that the count down starts at the full duration
                        // example 05:00 not 04:59
                        start = Date.now() + 1000;
                    }
                }
                // we don't want to wait a full second before the timer starts
                timer();
                setInterval(timer, 1000);
            }
        },
        getNowDate: function() {
            var toDay = new Date();
            var year = toDay.getFullYear();
            var month = toDay.getMonth()+1;
            var day = toDay.getDate();
            var hh = toDay.getHours();
            var mm = toDay.getMinutes();
            var ss = toDay.getSeconds();
            return year+"년 "+month+"월 "+day+"일 "+ hh+"시"+ mm+"분"+ ss+"초";
        },
        numberFormat: function(val, defaultValue){
            if(val === 0) return "0";

            if(!val) return defaultValue ? defaultValue : "";

            if(this==0) return 0;

            var reg = /(^[+-]?\d+)(\d{3})/;
            var n = (val + '');

            while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');

            return n;
        },
        autoHyphen : function(target) {
            target.value = target.value
                .replace(/[^0-9]/g, '')
                .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
        },
        // 숫자를  나눈다
        numDivide: function(numVal, divisor){
            if(nayuda.isValidDigit(numVal) && nayuda.isValidDigit(divisor) ){
                if(numVal > 0 && divisor > 0){
                    return Math.trunc(numVal/divisor);
                }
            }
            return numVal;
        },
        // 문자를 숫자로 정리한다.
        delComma: function (numstr) {
            numstr = String(numstr);
            //if (numstr == '') return '0';
            if (numstr == '-') return '0';
            else if (numstr == '0-') return '-0';
            numstr = numstr.replace(/[^\d\.-]/g,'');
            numstr = String(numstr.match(/^-?\d*\.?\d*/));
            numstr = numstr.replace(/^(-?)(\d*)(.*)/,
                function(str,p1,p2,p3) {
                    p2 = (p2>0) ? String(p2.match(/[1-9]\d*$/)) : '0';
                    //    p2 = (p2>0) ? String(parseInt(p2,10)) : '0';
                    return p1 + p2 + p3;
                }
            );
            return numstr;
        },

        setComma: function(numstr) {
            if(!numstr) return "";
            
            numstr = String(numstr);
            var re0 = /^(-?\d+)(\d{3})($|\..*$)/;
            if (re0.test(numstr))
                return numstr.replace(re0,
                    function(str,p1,p2,p3) {
                        return nayuda.setComma(p1) + ',' + p2 + p3;
                    }
                );
            else
                return numstr ? numstr : "";
        },

        // 자동 콤마 처리
        // 허용하는 숫자만 받는다. 1~0, [,], [.], enter
        autoComma: function (event, obj) {
            var v = nayuda.delComma(obj.value);
            //if(v == "0") v = "";
            if(v == "") {
                obj.value = "";
            }else{
                obj.value = nayuda.setComma(v);
            }
        },

        popupOpen: function(popUrl, width, height){
        	var popOption = "width=" + width + ", height=" + height + ", resizable=no, scrollbars=yes, status=no;";
            return window.open(popUrl,"",popOption);
        },

        getYoutubeThumbnail : function(videoId, quality){
            if (videoId){
                if (!quality){ quality = "0" }

                return "http://img.youtube.com/vi/" + videoId + "/" + quality + ".jpg";

            }else{
                return null; // default img
            }
        },

        getYoutubeId: function(url){
            var regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
            var arr = url.match(regex);
            if (arr && arr.length > 1){ 
                return arr[1];
            }else{
                return null;
            }
        },

        isValidBirth: function(yymmdd){
            return new moment(yymmdd, "YYMMDD").isValid();
        },

        isValidDigit: function(text){
            var regExp = /^\d+$/;
            return regExp.test(text);
        },

        isValidEmail: function(text){
            var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
            return regExp.test(text);
        },

        isValidPassword: function(text, noAlert){
            var pw = text;
            var num = pw.search(/[0-9]/g);
            var eng = pw.search(/[a-z]/ig);
            var spe = pw.search(/[`~!@@#$%^&*|\\\'\";:\/?]/gi);


            if(pw.length < 8 || pw.length > 20){
                if(!noAlert){
                    nayuda.showNotification("[알림]", "비밀번호는 8자리 ~ 20자리 이내로 입력해주세요.", "danger");
                }
                return false;
            }
            if(pw.search(/\s/) != -1){
                if(!noAlert){
                    nayuda.showNotification("[알림]", "비밀번호는 공백없이 입력해주세요..", "danger");
                }
                return false;
            }
            if( (num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0) ){
                if(!noAlert){
                    nayuda.showNotification("[알림]", "비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 혼합하여 입력해주세요.", "danger");
                }
                return false;
            }

            return true;
        },
        lpad: function (n, width, letter) {
            n = n + '';
            if(!letter){
                letter = '0';
            }
            
            return n.length >= width ? n : new Array(width - n.length + 1).join(letter) + n;
        },

        nl2br: function(str, is_xhtml){
            if(!str) return '';
            var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
            return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
        },

        initEditor: function(target, height){
            CKEDITOR.config.height = height;
            CKEDITOR.config.width = 'auto';
            CKEDITOR.config.toolbarCanCollapse = true;
            CKEDITOR.config.font_names = '맑은 고딕/Malgun Gothic;굴림/Gulim;돋움/Dotum;바탕/Batang;궁서/Gungsuh;' + CKEDITOR.config.font_names;
            CKEDITOR.config.enterMode = CKEDITOR.ENTER_BR;
            CKEDITOR.config.shiftEnterMode = CKEDITOR.ENTER_P;
            CKEDITOR.config.filebrowserUploadUrl = '/editor/upload?type=image';
            CKEDITOR.config.removePlugins = 'easyimage, cloudservices';
            CKEDITOR.config.disableAutoInline = true;
            CKEDITOR.config.toolbarStartupExpanded = false;

            CKEDITOR.replace( target );
            /*
            .on('change', function() {
                console.log(this.getData());
            });
             */
        },

        updateEditor: function(){
            for(var instanceName in CKEDITOR.instances){
                CKEDITOR.instances[instanceName].updateElement();
            }
        },
        autoHypenPhone: function(str){
            str = str.replace(/[^0-9]/g, '');
            var tmp = '';
            if( str.length < 4){
                return str;

            }else if(str.length < 7){
                tmp += str.substr(0, 3);
                tmp += '-';
                tmp += str.substr(3);
                return tmp;

            }else if(str.length < 10){
                tmp += str.substr(0, 2);
                tmp += '-';
                tmp += str.substr(2, 3);
                tmp += '-';
                tmp += str.substr(5);
                return tmp;

            }else if(str.length < 11){
                tmp += str.substr(0, 3);
                tmp += '-';
                tmp += str.substr(3, 3);
                tmp += '-';
                tmp += str.substr(6);
                return tmp;

            }else if(str.length < 12){
                tmp += str.substr(0, 3);
                tmp += '-';
                tmp += str.substr(3, 4);
                tmp += '-';
                tmp += str.substr(7);
                return tmp;

            }else if(str.length < 13){
                tmp += str.substr(0, 4);
                tmp += '-';
                tmp += str.substr(4, 4);
                tmp += '-';
                tmp += str.substr(8);
                return tmp;

            }else{
                tmp += str.substr(0, 3);
                tmp += '-';
                tmp += str.substr(3, 4);
                tmp += '-';
                tmp += str.substr(7);
                return tmp;
            }

            return str;
        },

        isAndroid: function(){
            if(window[nayuda.hybridAppBridgeName]){
                return true;
            }
            return false;
        },

        isIOS: function(){
            if(window.webkit && window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers[nayuda.hybridAppBridgeName]){
                return true;
            }

            return false;
        },

        isMobileApp: function(){
            if(this.isAndroid()){
                return true;
            }else if(this.isIOS()){
                return true;
            }

            return false;
        },

        isMSIE: function(){
            return /MSIE/.test(navigator.userAgent);
        },

        openPopupForMobile: function(code, v1, v2, v3, v4, v5){
            if(!code) return;
            if(!v1) v1 = "";
            if(!v2) v2 = "";
            if(!v3) v3 = "";
            if(!v4) v4 = "";
            if(!v5) v5 = "";
    
            if(this.isMobileApp()){
                location.href = "subpopup:" + code + "###" + v1 + "###" + v2 + "###" + v3 + "###" + v4 + "###" + v5;
            }
        },

        openMobilePopup: function(url, target, isExternal){
            if(nayuda.isMobileApp() && isExternal){
                nayuda.appGoBrowserLink(url);
            }else{
                // ios safari window.open issue 수정
                setTimeout(function(){
                    location.href = url;
                }, 500);
            }
            return false;
        },

        closeMobilePopup: function(url, isAllClose){
            if(nayuda.isMobileApp() && isAllClose){
                nayuda.appExitAllActivity(url ? url : "");
            }else{
                // ios safari window.close issue 수정
                setTimeout(function(){
                    history.back();
                }, 500);
            }
        },

        getQueryParam: function(param){
            var found = "";
            window.location.search.substr(1).split("&").forEach(function(item) {
                if (param == item.split("=")[0]) {
                    found = item.split("=")[1];
                }
            });
            return found;
        },

        getHashParam: function(param, def){
            if(document.location.hash) {
                var arrParams = document.location.hash.replace("#", "").split("._.");

                for (var i = 0; i < arrParams.length; i++) {
                    var arrItem = arrParams[i].split(":");
                    if(arrItem[0] === param){
                        return arrItem[1];
                    }
                }
            }

            return def ? def : "";
        },

        fitImage: function(obj){
            var naturalWidth = obj.naturalWidth;
            var naturalHeight = obj.naturalHeight;
        
            var imgWidth = $(obj).parent().width();
            var imgHeight = $(obj).parent().height();
        
            if(Math.abs(naturalWidth / imgWidth) < Math.abs(naturalHeight / imgHeight)){
                var fitHeight = imgHeight;
                var fitWidth = Math.floor(naturalWidth * imgHeight/naturalHeight);
                
                $(obj).css('position', 'relative');
                $(obj).css('top', '0px');
                $(obj).css('left', Math.abs((imgWidth - fitWidth) / 2) + 'px');
                
                $(obj).css('height', '100%');
                $(obj).css('width', fitWidth + 'px');
        
            }else if(Math.abs(naturalWidth / imgWidth) > Math.abs(naturalHeight / imgHeight)){
                var fitWidth = imgWidth;
                var fitHeight = Math.floor(naturalHeight * imgWidth/naturalWidth);
                
                $(obj).css('position', 'relative');
                $(obj).css('top', Math.abs((imgHeight - fitHeight) / 2) + 'px');
                $(obj).css('left', '0px');
                
                $(obj).css('width', '100%');
                $(obj).css('height', fitHeight + 'px');
            }else{
                $(obj).css('position', 'relative');
                $(obj).css('top', '0px');
                $(obj).css('left', '0px');
                $(obj).css('width', '100%');
                $(obj).css('height', '100%');
            }
        },
        
        fitImageForReact: function(obj){
            var naturalWidth = obj.naturalWidth;
            var naturalHeight = obj.naturalHeight;
        
            var imgWidth = $(obj).parent().width();
            var imgHeight = $(obj).parent().height();
        
            if(Math.abs(naturalWidth / imgWidth) < Math.abs(naturalHeight / imgHeight)){
                var fitHeight = imgHeight;
                var fitWidth = Math.floor(naturalWidth * imgHeight/naturalHeight)
        
                return {
                    position: 'relative',
                    top: '0px',
                    left: Math.abs((imgWidth - fitWidth) / 2) + 'px',
                    width: fitWidth + 'px',
                    height: '100%'
                }
            }else if(Math.abs(naturalWidth / imgWidth) > Math.abs(naturalHeight / imgHeight)){
                var fitWidth = imgWidth;
                var fitHeight = Math.floor(naturalHeight * imgWidth/naturalWidth)
        
                return {
                    position: 'relative',
                    top: Math.abs((imgHeight - fitHeight) / 2) + 'px',
                    left: '0px',
                    width: '100%',
                    height: fitHeight + 'px'
                }
            }
        
            return {
                position: 'relative',
                top: '0px',
                left: '0px',
                width: '100%',
                height: '100%'
            };
        },
        
        fitImageForReactError: function(){
            return {
                position: 'relative',
                top: '0px',
                left: '0px',
                width: '100%',
                height: '100%'
            };
        },
        convertDate: function(date) {
            var year = date.getFullYear();

            var month = date.getMonth() + 1;
            if (month < 10)  {
                month = '0' + month;
            }

            var date = date.getDate();
            if (date < 10) {
                date = '0' + date;
            }

            return year + '년 ' + month + '월 ' + date + "일";
        },
        getDateYmd: function() {
            var toDay = new Date();

            var year = toDay.getFullYear();

            var month = toDay.getMonth() + 1;
            if (month < 10)  {
                month = '0' + month;
            }

            var date = toDay.getDate();
            if (date < 10) {
                date = '0' + date;
            }

            var hour = toDay.getHours();
            if (hour < 10) {
                hour = '0' + hour;
            }

            var min = toDay.getMinutes();
            if (min < 10) {
                min = '0' + min;
            }

            var sec = toDay.getSeconds();
            if (sec < 10) {
                sec = '0' + sec;
            }

            return year + month + date + hour + min + sec;
        },
        showNotification: function(title, message, type){
            nayuda.titleAlert(title, message);
            //jQuery.notify( { title: '<strong>' + title + '</strong>', message: message}, { type: type});
        },
        confirmWithTitle: function(title, message, successFunc, option){
            jQuery("#CONFIRM_WT").modal('hide');

            this.popupConfirmWtSuccessFunction = successFunc;
            this.popupConfirmWtCancelFunction = null;

            jQuery("#popup_confirm_wt_success_button_title").text("확인");
            jQuery("#popup_confirm_wt_cancel_button_title").text("취소");

            if(option){
                if(option.successTitle){
                    jQuery("#popup_confirm_wt_success_button_title").text(option.successTitle);
                }

                if(option.successAddClass){
                    jQuery("#popup_confirm_wt_success_button_title").addClass(option.successAddClass);
                }

                if(option.cancelTitle){
                    jQuery("#popup_confirm_wt_cancel_button_title").text(option.cancelTitle);
                }

                if(option.cancelAddClass){
                    jQuery("#popup_confirm_wt_cancel_button_title").addClass(option.cancelAddClass);
                }

                if(option.cancelFunc){
                    this.popupConfirmCancelFunction = option.cancelFunc;
                }
            }

            if(title){
                jQuery("#CONFIRM_WT_TITLE").show()
                jQuery("#CONFIRM_WT_TITLE").text(title);

            }else{
                jQuery("#CONFIRM_WT_TITLE").hide()
                jQuery("#CONFIRM_WT_TITLE").text("");
            }

            jQuery("#CONFIRM_WT_MSG").html(nayuda.nl2br(message));
            jQuery("#CONFIRM_WT").modal('show');
        },
        addDashes: function(f){
            var i = f.value.replace('-', '');
            i = i.replace(/\D/g, '');
            i = i.slice(0, 4) + '-' + i.slice(4, 6) + '-' + i.slice(6, 15);

            f.value = i;
        },
        initEditor: function(target, height){
            CKEDITOR.config.height = height;
            CKEDITOR.config.width = 'auto';
            CKEDITOR.config.toolbarCanCollapse = true;
            CKEDITOR.config.language = 'ko';
            CKEDITOR.config.font_names = '맑은 고딕/Malgun Gothic;굴림/Gulim;돋움/Dotum;바탕/Batang;궁서/Gungsuh;' + CKEDITOR.config.font_names;
            CKEDITOR.config.enterMode = CKEDITOR.ENTER_BR;
            CKEDITOR.config.shiftEnterMode = CKEDITOR.ENTER_P;
            CKEDITOR.config.filebrowserUploadUrl = '/editor/upload?type=image';
            CKEDITOR.config.removePlugins = 'easyimage, cloudservices';
            CKEDITOR.disableAutoInline = true;

            CKEDITOR.replace( target );
            /*
            .on('change', function() {
                console.log(this.getData());
            });
             */
        },
        updateEditor: function(){
            for(var instanceName in CKEDITOR.instances){
                CKEDITOR.instances[instanceName].updateElement();
            }
        },
        initBaseTable: function(target, token, url, data, columns, searching, rowFunc, options, dataCallback){
            if(jQuery('#' + target).length > 0){
                nayuda.pageLoadingFrame("show");
                var page = 1;
                var rows = 15;

                if(options){
                    page = options['page'];
                    rows = options['rows'];
                }

                if(jQuery.fn.dataTable.isDataTable(target)){
                    nayuda.dataTableObj[target] = jQuery('#' + target).DataTable();

                }else{
                    nayuda.dataTableObj[target] = jQuery('#' + target).DataTable({
                        displayStart: rows * page,
                        pageLength: rows,
                        destroy: false,
                        searching: searching ? true : false,
                        language: {"url" : "/js/plugins/datatables/Korean.json"},
                        processing: true,
                        serverSide: true,
                        responsive: false,
                        scrollX: true,
                        ajax: {
                            url: url,
                            type: "POST",
                            data: data,
                            headers: {'Authorization': token},
                            error: function (xhr, error, code) {
                                if(xhr.status == 401){
                                    jQuery('#logoutForm').submit();
                                }
                            },
                            dataSrc: function(json){
                                if(dataCallback != null){
                                    dataCallback(json);
                                }

                                return json.data;
                            }
                        },
                        ordering: false,
                        columns: columns,
                        fnInitComplete: function() {
                            nayuda.pageLoadingFrame("hide");
                        },
                        fnDrawCallback: function( oSettings ) {
                            //console.log(oSettings.json);
                        }
                    });
                }

                nayuda.dataTableObj[target].on('click', 'tbody tr', function(){
                    var data = nayuda.dataTableObj[target].row(this).data();
                    rowFunc(data);
                })
            }
        },
        isNumeric: function(text){
            var regExp = /^(0*[0-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/ ;
            return regExp.test(text);
        },
        gotoList: function(basePath){
            location.href = basePath + location.hash;
        },
        checkValidation: function(target){
            resultFlag = true;

            jQuery(target).each(function(index, item){
                if(jQuery(item).data('validation') == "[NOTEMPTY]"){
                    if(!jQuery(item).val()) {
                        resultFlag = false;

                        nayuda.showNotification("[알림]", jQuery(item).data('validation-message'), "danger");
                        return false;
                    }
                }
            });

            return resultFlag;
        },
        pad: function(n, width){
            if (n == undefined || n == null) return '';

            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
        },
        nl2br: function(str, is_xhtml){
            var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
            return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
        },
        getDataWithBlank: function (value){
            if(!value){
                return "&nbsp;";
            }else{
                return value;
            }
        },
        getText: function(val){
            return val ? val : "";
        },
        phoneFormat: function(val){
            return val.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
        },
        escapeHtml: function(string) {
            return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
              return entityMap[s];
            });
        },
        empty: function(e) {
            switch (e) {
                case "":
                case 0:
                case "0":
                case null:
                case false:
                case typeof(e) == "undefined":
                    return true;
                default:
                    return false;
            }
        },
        requestDownloadFile: function(reqObj) {
            if (!reqObj || !reqObj.url) {
                return;
            }

            var isGetMethod = reqObj.method && reqObj.method.toUpperCase() === 'GET';
            jQuery.ajax({
                url: reqObj.url,
                method: isGetMethod ? 'GET' : 'POST',
                xhrFields: {
                    responseType: 'arraybuffer'
                },
                data: jQuery.param(reqObj.data) // a=1&b=2&c=3 방식
                // data: JSON.stringify(reqObj.data) // {a:1, b:2, c:3} JSON 방식

            }).done(function(data, textStatus, jqXhr) {
                if (!data) {
                    return;
                }
                try {
                    var blob = new Blob([data], { type: jqXhr.getResponseHeader('content-type') });

                    var fileNameObj = jqXhr.getResponseHeader('content-disposition')
                        .split(';')
                        .filter(function(ele) {
                            return ele.indexOf('filename') > -1
                        })
                        .map(function(ele) {
                            return ele
                                .replace(/"/g, '')
                                .split('=')[1]
                        });

                    var fileName = fileNameObj[0] ? fileNameObj[0] : null;
                    fileName = decodeURI(fileName);

                    if (window.navigator.msSaveOrOpenBlob) { // IE 10+
                        window.navigator.msSaveOrOpenBlob(blob, fileName);
                    } else { // not IE
                        var link = document.createElement('a');
                        var url = window.URL.createObjectURL(blob);
                        link.href = url;
                        link.target = '_self';
                        if (fileName) link.download = fileName;
                        document.body.append(link);
                        link.click();
                        link.remove();
                        window.URL.revokeObjectURL(url);
                    }
                } catch (e) {
                    console.error(e)
                }
            });
        },
        controlScroll: function(isEnable, target){
            if(target){
                if(isEnable){
                    jQuery(target).removeClass("noscroll");
                }else{
                    jQuery(target).addClass("noscroll");
                }
            }else{
                if(isEnable){
                    jQuery("body").removeClass("modalOpen");
                }else{
                    jQuery("body").addClass("modalOpen");
                }
            }
        },
        titleAlert: function(title, message, next){
            nayuda.controlScroll(false);

            jQuery("#POPUP_ALERT_TITLE").text(title);
            jQuery("#POPUP_TITLE_ALERT_MSG").html(nayuda.nl2br(message));
            jQuery("#POPUP_TITLE_ALERT").show();

            this.popupTitleAlertNextFunction = next;
        },
        alert: function(message, next){
            this.customAlert(message, "확인", next);
        },
        customAlert: function(message, buttonName, next){
            nayuda.controlScroll(false);
            jQuery("#POPUP_ALERT_MSG").html(nayuda.nl2br(message));
            jQuery("#POPUP_ALERT_BUTTON").html(nayuda.nl2br(buttonName));
            jQuery("#POPUP_ALERT").show();

            this.popupAlertNextFunction = next;
        },
        makeHpArryNo: function(hpNo){
            var hp1="010";
            var hp2="";
            var hp3="";

            if(hpNo != null && hpNo.length== 11){
                hp1 = hpNo.substring(0,3);
                hp2 = hpNo.substring(3,7);
                hp3 = hpNo.substring(7,11);
            } else if(hpNo != null && hpNo.length== 10) {
                hp1 = hpNo.substring(0,3);
                hp2 = hpNo.substring(3,6);
                hp3 = hpNo.substring(6,10);
            }
            var arryHpNo = [hp1, hp2, hp3];
            return arryHpNo;
        },
        confirm: function(title, message, successFunc, option){
            nayuda.controlScroll(false);
            this.popupConfirmSuccessFunction = successFunc;
            this.popupConfirmCancelFunction = null;

            jQuery("#popup_confirm_cancel_button_title").text("취소");
            jQuery("#popup_confirm_success_button_title").text("확인");

            if(option){
                if(option.successTitle){
                    jQuery("#popup_confirm_success_button_title").text(option.successTitle);
                }

                if(option.cancelTitle){
                    jQuery("#popup_confirm_cancel_button_title").text(option.cancelTitle);
                }

                if(option.cancelAddClass){
                    jQuery("#popup_confirm_cancel_button_title").addClass(option.cancelAddClass);
                }

                if(option.successAddClass){
                    jQuery("#popup_confirm_success_button_title").addClass(option.successAddClass);
                }

                if(option.cancelFunc){
                    this.popupConfirmCancelFunction = option.cancelFunc;
                }

                if(option.titleBold){
                    jQuery("#POPUP_CONFIRM_TITLE").css("font-weight", "bold");
                }
            }

            if(title){
                jQuery("#POPUP_CONFIRM_TITLE").show();
                jQuery("#POPUP_CONFIRM_TITLE").text(title);
            }else{
                jQuery("#POPUP_CONFIRM_TITLE").hide();
                jQuery("#POPUP_CONFIRM_TITLE").text("");
            }

            jQuery("#POPUP_CONFIRM_MSG").html(nayuda.nl2br(message));
            jQuery("#POPUP_CONFIRM").show();
        },
        customConfirm: function(title, message,  successButton, cancelButton,  successFunc, cancelFunc){
            //nayuda.controlScroll(false);
            this.popupConfirmSuccessFunction = successFunc;
            this.popupConfirmCancelFunction = cancelFunc;

            jQuery("#popup_confirm_cancel_button_title").text(cancelButton);
            jQuery("#popup_confirm_success_button_title").text(successButton);

            if(title){
                jQuery("#POPUP_CONFIRM_TITLE").show();
                jQuery("#POPUP_CONFIRM_TITLE").text(title);
            }else{
                jQuery("#POPUP_CONFIRM_TITLE").hide();
                jQuery("#POPUP_CONFIRM_TITLE").text("");
            }

            jQuery("#POPUP_CONFIRM_MSG").html(nayuda.nl2br(message));
            jQuery("#POPUP_CONFIRM").show();
        },
        addressPop: function(rcvZipCode, rcvZipAddr, rcvSido, callback){
            nayuda.controlScroll(false);
            jQuery("#addrKeyword").val("");
            jQuery("#list").html("");
            jQuery("#pagingList").html("");

            jQuery("#rcvZipCode").val(rcvZipCode); // 법정주소 전달값
            jQuery("#rcvZipAddr").val(rcvZipAddr); // 상세주소 전달
            jQuery("#rcvSido").val(rcvSido); // 시도 전달

            jQuery("#POPUP_ADDR tbody#list").html(""); // 두번째 열었을때 이전 검색기록 남아있어 추가
            jQuery("#POPUP_ADDR").show();

            nayuda.addressPopCallback = callback;
        },

        addressPopDelivery: function(rcvZipCode, rcvZipAddr, rcvSido, rcvSigungu, rcvGumyeon, callback){
            nayuda.controlScroll(false);
            jQuery("#addrKeyword").val("");
            jQuery("#list").html("");
            jQuery("#pagingList").html("");

            jQuery("#rcvZipCode").val(rcvZipCode); // 법정주소 전달값
            jQuery("#rcvZipAddr").val(rcvZipAddr); // 상세주소 전달
            jQuery("#rcvSido").val(rcvSido); // 시도 전달
            jQuery("#rcvSigungu").val(rcvSigungu); // 시군구 전달
            jQuery("#rcvGumyeon").val(rcvGumyeon); // 구면 전달

            jQuery("#POPUP_ADDR tbody#list").html(""); // 두번째 열었을때 이전 검색기록 남아있어 추가
            jQuery("#POPUP_ADDR").show();

            nayuda.addressPopCallback = callback;
        },
        commonLoginPc: function(){
            var $alertMainPopup = $("#alertMainPopup");
            if($alertMainPopup.hasClass("open")){
                $alertMainPopup.removeClass("open");
                $("body").removeClass("menuActive");
                $(".sdwBg").remove();
            }else{
                $alertMainPopup.addClass("open");
                $("body").addClass("menuActive");
                $(".layout--wrap").prepend("<div class='sdwBg'></div>")
            }
        },
        kcbCertPop: function(modeType){
            var popUrl = "/auth/openKcbPop";
            if(modeType != null && modeType != ""){
                popUrl = popUrl + "?modeType="+modeType;
            }

            if(nayuda.isMobileApp()){
                nayuda.openMobilePopup(popUrl, "auth_popup");
            }else{
                window.open(popUrl, "auth_popup", "width=430,height=640,scrollbars=yes");
            }
        },
        openKcbPopForCard: function(modeType){
            var popUrl = "/auth/openKcbPopForCard";
            if(modeType != null && modeType != ""){
                popUrl = popUrl + "?modeType="+modeType;
            }

            if(nayuda.isMobileApp()){
                nayuda.openMobilePopup(popUrl, "auth_popup");
            }else{
                window.open(popUrl, "auth_popup", "width=430,height=640,scrollbars=yes");
            }
        },
        nvl: function(inVal, repVal){
            if(repVal === undefined || repVal === null ) {
                repVal = '';
            }

            if(!inVal) {
                return repVal;
            } else {
                return inVal;
            }
        },
        arraySort: function(arr, isDesc){
            if(isDesc){
                arr.sort(function(a, b)  {
                    if(a > b) return -1;
                    if(a === b) return 0;
                    if(a < b) return 1;
                });
            }else{
                arr.sort(function(a, b)  {
                    if(a > b) return 1;
                    if(a === b) return 0;
                    if(a < b) return -1;
                });
            }

            return arr;
        },
        arrayDeepSort: function(arr, key, isDesc){
            if(isDesc){
                arr.sort(function(a, b)  {
                    if(a[key] > b[key]) return -1;
                    if(a[key] === b[key]) return 0;
                    if(a[key] < b[key]) return 1;
                });
            }else{
                arr.sort(function(a, b)  {
                    if(a[key] > b[key]) return 1;
                    if(a[key] === b[key]) return 0;
                    if(a[key] < b[key]) return -1;
                });
            }

            return arr;
        },
        arrayDeepSortForPrice: function(arr, key, isDesc){
            if(isDesc){
                arr.sort(function(a, b)  {
                    let val1 = a[key] ? parseInt(a[key]) : 0;
                    let val2 = b[key] ? parseInt(b[key]) : 0;

                    if(val1 > val2) return -1;
                    if(val1 === val2) return 0;
                    if(val1 < val2) return 1;
                });
            }else{
                arr.sort(function(a, b)  {
                    let val1 = a[key] ? parseInt(a[key]) : 0;
                    let val2 = b[key] ? parseInt(b[key]) : 0;

                    if(val1 > val2) return 1;
                    if(val1 === val2) return 0;
                    if(val1 < val2) return -1;
                });
            }

            return arr;
        },
        jsonFormSerialize: function(target) {
            var obj = null;
            try {
                if (jQuery(target)[0].tagName && jQuery(target)[0].tagName.toUpperCase() == "FORM") {
                    var arr = jQuery(target).serializeArray();
                    if (arr) {
                        obj = {};
                        jQuery.each(arr, function() {
                            obj[this.name] = this.value;
                        });
                    }
                }
            } catch (e) {
                alert(e.message);
            } finally {
            }

            return obj;
        },
        getFileUrl: function(src){
            return jQuery("#fileUrl").val() + src;
        },
        // as is sso 호출 모듈
        fnHpCallLpointScreen: function(type){
            var returnUrl = "/";
            if(type == 'JOIN_MEMBER'){
                /* 회원가입 */
                returnUrl += "/hp/pub/cmm/viewLoginLpointUsr.do";
                members.handler.join(returnUrl);
            } else if (type == 'FIND_ID') {
                /* 아이디 찾기 */
                returnUrl += "/hp/pub/cmm/viewLoginLpointUsr.do";
                members.handler.findId(null);

            } else if (type == 'FIND_PASSWORD') {
                /* 비밀번호 찾기 */
                returnUrl += "/hp/pub/cmm/viewLoginLpointUsr.do";
                members.handler.findPw(returnUrl);

            } else if (type == 'CHANGE_PASSWORD') {
                /* 비빌번호 변경 */
                returnUrl += "/hp/pub/myp/mem/selectPubMemInfoDet.do";
                members.handler.changePw(returnUrl);

            } else if (type == 'CHANGE_INFO') {
                /* 회원정보 변경 */
                returnUrl += "/hp/pub/myp/mem/selectPubMemInfoDet.do";
                members.handler.changeInfo(returnUrl);

            } else if (type == 'LEAVE_MEMBER') {
                /* 회원탈퇴 */
                returnUrl += "/hp/pub/cmm/viewMain.do";
                members.handler.leave(returnUrl);

            } else if (type == 'CONVERSION_MEMBER'){
                /* LPOINT 회원 전환 */
                var membNo = '${sessionScope.HpLoginVO.userNo}';
                var membId = '${sessionScope.HpLoginVO.id}';
                var membNm = '${sessionScope.HpLoginVO.name}';

                var param = {
                    akDta: {
                        ccoCstNo: membNo
                        , ctfYn: "N"
                        , ccoOnlId: membId + ""
                        , cstNm: membNm + ""
                        , bird: "19900101"
                        , maFemDvC: "0"
                        , frnYn: "N"
                        , elcAdd: "aaa@gmail.com"
                    }
                }
                members.handler.conversionMbr(param);
            }
        },
        getImageUrl: function(src, width, height, wmSize, scale){
            var scale = scale ? scale : 2;

            if(src != null){
                if(src.indexOf("blob:") === 0 || src.indexOf("http") === 0){
                    return src;
                }else if(jQuery("#springProfile").val() === 'prod' || jQuery("#springProfile").val() === 'dev'){

                    if(width && height){
                        return jQuery("#fileCdnUrl").val() + src + "/dims/resize/" + (width * scale) + "x" + (height * scale);
                    } else {
                        return jQuery("#fileCdnUrl").val() + src;
                    }

                    // if(wmSize) {
                    //     //워터마크 추가(~149:wm_8, 150~199:wm_12, 200~249:wm_17, 250~499:wm_32, 500~:wm_52)
                    //     var width = width * scale;
                    //     var height = height * scale;
                    //
                    //     // 사이즈에 따라 적용하는것과 값을 강제로 넣는 방법 추가
                    //     if(wmSize === true || (typeof wmSize === "string" && wmSize.indexOf("wm") === -1)){
                    //         var wmSize = "wm_8";
                    //
                    //         if(width >= 500){
                    //             wmSize = "wm_52";
                    //         }else if(width >= 250){
                    //             wmSize = "wm_32";
                    //         }else if(width >= 200){
                    //             wmSize = "wm_17";
                    //         }else if(width >= 150){
                    //             wmSize = "wm_12";
                    //         }
                    //     }
                    //
                    //     return jQuery("#fileCdnUrl").val() + src + "/dims/resize/" + width + "x" + height + "/composite/" + wmSize;
                    // }else if(width && height){
                    //     return jQuery("#fileCdnUrl").val() + src + "/dims/resize/" + (width * scale) + "x" + (height * scale);
                    // }else{
                    //     return jQuery("#fileCdnUrl").val() + src;
                    // }
                }else{
                    return jQuery("#fileCdnUrl").val() + src;
                }
            }
        },
        getBackgroundCarImage: function(src, width, height, wmSize){
            return "url('" + nayuda.getImageUrl(src, width, height, wmSize) + "'), url('/pc/images/elements/noimage.jpg')"
        },
        getMobileCarImage: function(src,width, height, wmSize){
            return nayuda.getImageUrl(src, width, height, wmSize);
        },
        getMobileCarFullWidthImage: function(src){
            var width = jQuery(window).width();
            var width = width ? width : 400;
            var height = Math.floor(width * 3.0 / 4.0);

            return nayuda.getImageUrl(src, width, height, "wm_52");
        },
        getBackgroundThemeImage: function(src, width, height){
            if(src){
                return "url('" + nayuda.getImageUrl(src, width, height) + "'), url('/pc/images/elements/noimage.jpg')"
            }else{
                return "url('/pc/images/elements/noimage.jpg')"
            }
        },
        //mobile 차량 리스트용 배너 이미지
        getMobileBackgroundThemeImage: function(src, width, height){
            return "url('" + nayuda.getImageUrl(src, width, height) + "'), url('/pc/images/elements/noimage.jpg')"
        },
        //테마 리스트용 이미지
        getMobileThemeImage: function(src) {
            var retStr = '/pc/images/elements/noimage.jpg';
            if (src !== "/") {
                retStr = nayuda.getImageUrl(src)
            }
            return retStr;
        },
        // 토큰으로 자동로그인
        autoLogin(rnwTkn) {
            if (nayuda.nvl(rnwTkn) !== "") {
                nayuda.jsonAjax(null,
                    "/auth/ajax/rnwTknLogin",
                    {rnwTkn: rnwTkn},
                    "POST",
                    function (json) {
                        if (json.status === 'OK') {
                            location.href = "/";
                        }
                    }
                );
            }
        },
        appSaveAccessToken: function(token){
            if(this.isAndroid() && window[nayuda.hybridAppBridgeName].appSaveAccessToken){
                window[nayuda.hybridAppBridgeName].appSaveAccessToken(token);
            }else if(this.isIOS() && window.webkit.messageHandlers.appSaveAccessToken){
                window.webkit.messageHandlers.appSaveAccessToken.postMessage(token);
            }
        },
        appNewActivity: function(url){
            if(this.isAndroid() && window[nayuda.hybridAppBridgeName].appNewActivity){
                window[nayuda.hybridAppBridgeName].appNewActivity(url);
            }else if(this.isIOS() && window.webkit.messageHandlers.appNewActivity){
                window.webkit.messageHandlers.appNewActivity.postMessage(url);
            }
        },
        appExitActivity: function(url){
            url = url ? url : "";
            if(this.isAndroid() && window[nayuda.hybridAppBridgeName].appExitActivity){
                window[nayuda.hybridAppBridgeName].appExitActivity(url);
            }else if(this.isIOS() && window.webkit.messageHandlers.appExitActivity){
                window.webkit.messageHandlers.appExitActivity.postMessage(url);
            }
        },
        appExitAllActivity: function(url){
            url = url ? url : "";
            if(this.isAndroid() && window[nayuda.hybridAppBridgeName].appExitAllActivity){
                window[nayuda.hybridAppBridgeName].appExitAllActivity(url);
            }else if(this.isIOS() && window.webkit.messageHandlers.appExitAllActivity){
                window.webkit.messageHandlers.appExitAllActivity.postMessage(url);
            }
        },
        appGoBrowserLink: function(url){
            if(this.isAndroid() && window[nayuda.hybridAppBridgeName].appGoBrowserLink){
                window[nayuda.hybridAppBridgeName].appGoBrowserLink(url);
            }else if(this.isIOS() && window.webkit.messageHandlers.appGoBrowserLink){
                window.webkit.messageHandlers.appGoBrowserLink.postMessage(url);
            }
        },
        appAgreeSubmit: function(){
            if(this.isAndroid() && window[nayuda.hybridAppBridgeName].appAgreeSubmit){
                window[nayuda.hybridAppBridgeName].appAgreeSubmit();
            }else if(this.isIOS() && window.webkit.messageHandlers.appAgreeSubmit){
                window.webkit.messageHandlers.appAgreeSubmit.postMessage("");
            }
        },
        appOutLink: function() {
            var userAgent = navigator.userAgent;
            var visitedAt = (new Date()).getTime();
            if (userAgent.match(/Android/)) {
                var iframe = document.createElement('iframe');
                iframe.style.visibility = 'hidden';
                iframe.src = 'intent://home#Intent;scheme=lotterental;package=com.kt.main;end'; //AOS 커스텀 스킴 주소
                iframe.onload = function () {
                    document.body.removeChild(iframe);
                }
                document.body.appendChild(iframe);

                setTimeout(
                    function() {
                        if ((new Date()).getTime() - visitedAt < 2000) {
                            location.href = "intent://home#Intent;scheme=lotterental;package=com.kt.main;end";
                        }
                    }, 500);

            }else if(userAgent.match(/iPhone|iPad|iPod/)){
                setTimeout(
                    function() {
                        if ((new Date()).getTime() - visitedAt < 2000) {
                            location.href = "https://itunes.apple.com/kr/app/apple-store/405947384";
                        }
                    }, 500);
                setTimeout(function() {
                    location.href = "lotterentacar://";
                }, 0);
            }
        },

        appAutoLogin: function(rnwTkn){
            if(nayuda.isMobileApp()) {
                nayuda.jsonAjax(null,
                    "/auth/ajax/rnwTknLogin",
                    {rnwTkn: rnwTkn},
                    "POST",
                    function (json) {
                        if (json.status === 'OK') {
                            location.href = "/";
                        }
                    }
                );
            }
        },
        getRegYear: function(regDate,regYear){
            var retStr = "";
            if(regDate && regYear){
                retStr = regDate.slice(0,4)+"/"+regDate.slice(5,7);
                retStr += "("+regYear.slice(2,4)+"년형)";
            }
            return retStr;
        },
        jsZzim: function(carId, e){
            var target = e.currentTarget;
            var activeTf = jQuery(e.currentTarget).hasClass("on");
            var url ="";

            if(activeTf) {
                url = "/co/zzim/ajax/zzimDel";
            }else {
                url = "/co/zzim/ajax/zzimReg";
            }

            nayuda.jsonAjax(
                jQuery("#token").val(),
                url,
                { carId: carId },
                "POST",
                function(json){
                    if(json.catTabCnt) {
                        if(json.catTabCnt.tab0ListCnt>0){ // 찜한차량
                            jQuery('#myCarCount01').css("display","block");
                            jQuery('#myCarCount01').html(json.catTabCnt.tab0ListCnt);
                        }else{
                            jQuery('#myCarCount01').css("display","none");
                        }
                    } else {
                        var num = jQuery('#myCarCount01').text();
                        if(num-1 > 0) {
                            jQuery('#myCarCount01').css("display","block");
                            jQuery('#myCarCount01').html(num-1);
                        }else{
                            jQuery('#myCarCount01').css("display","none");
                        }
                    }
                    if(activeTf) {
                        jQuery(target).removeClass("on");
                    }else {
                        jQuery(target).addClass("on");
                    }
                },
                function(json){
                    nayuda.alert("실패");
                }
            );
        },
        jsCompare: function(carId, e){
            let compareCookieData = nayuda.getCookie("cpc");
            let arrCompareData = [];
            let totalCompareCount = 0;
            let isAdd = false;

            if(compareCookieData){
                arrCompareData = compareCookieData.split("%3B");

                let isDupId = arrCompareData.some(function(id){
                    return id === carId;
                });

                if(isDupId){
                    arrCompareData = arrCompareData.filter(function(id){
                        return id !== carId;
                    });
                    if(arrCompareData.length > 0){
                        nayuda.setCookie("cpc", arrCompareData.join(";"), 60*60);
                        totalCompareCount = arrCompareData.length;
                    }else{
                        nayuda.setCookie("cpc", '', 60*60);
                        totalCompareCount = 0;
                    }
                }else{
                    if(arrCompareData.length >= 5){
                        nayuda.customConfirm("비교하기", "비교하기는 <font color='red'><b>5대</b></font> 까지 등록이 가능합니다.\n등록차량 삭제 후 이용해주세요.", "바로가기", "닫기", function (){
                            location.href = "/co/compare/main";
                        });
                        totalCompareCount = 5;
                    }else{
                        arrCompareData.unshift(carId);
                        nayuda.setCookie("cpc", arrCompareData.join(";"), 60*60);
                        totalCompareCount = arrCompareData.length;
                        isAdd = true;
                    }
                }
            }else{
                nayuda.setCookie("cpc", carId, 60*60);
                totalCompareCount = 1;
                isAdd = true;
            }
            return isAdd;
            // if(totalCompareCount > 0){
            //     jQuery("#myCarCount02").show()
            //     jQuery("#myCarCount02").text(totalCompareCount)
            // }else{
            //     jQuery("#myCarCount02").hide()
            // }
        },
        showLoading: function(text){
            if(jQuery("#photoUploadPop").is(':visible')){
                if(text){
                    jQuery("#loadingText").text(text);
                    jQuery("#loadingText").show();
                    jQuery("#loadingPop").show();
                }else{
                    jQuery("#loadingText").text("");
                    jQuery("#loadingText").hide();
                    jQuery("#loadingPop").show();
                }
            }else{
                jQuery("body").addClass("is--loading");
                jQuery("#loadingCommon").show();
            }
        },
        hideLoading: function(){
            if(jQuery("#photoUploadPop").is(':visible')){
                jQuery("#loadingText").text("");
                jQuery("#loadingText").hide();
                jQuery("#loadingPop").hide();
            }else{
                jQuery("body").removeClass("is--loading");
                jQuery("#loadingCommon").hide();
            }
        },
        showMobileLoading: function(){
            jQuery("#loadingPop").show();
        },
        hideMobileLoading: function(){
            jQuery("#loadingPop").hide();
        },

        // 다이렉트견적용 로딩 추가 (PC용)
        showDirectLoading: function(text){
            if(text){
                jQuery("#directLoadingText").text(text);
                jQuery("#directLoadingText").show();
                jQuery("#directLoadingPop").show();
            }else{
                jQuery("#directLoadingText").text("");
                jQuery("#directLoadingText").hide();
                jQuery("#directLoadingPop").show();
            }
        },
        hideDirectLoading: function(){
            jQuery("#directLoadingPop").hide();
        },

        // 다이렉트견적용 로딩 추가 (모바일용)
        showMobileDirectLoading: function(text){
            if(text){
                jQuery("#directLoadingText").text(text);
                jQuery("#directLoadingText").show();
                jQuery("#directLoadingPop").show();
            }else{
                jQuery("#directLoadingText").text("");
                jQuery("#directLoadingText").hide();
                jQuery("#directLoadingPop").show();
            }
        },
        hideMobileDirectLoading: function(){
            jQuery("#directLoadingPop").hide();
        },

        jsLinkShare: function(shareType,url,title){
            if(shareType == "kakao") nayuda.kakaoShare(url, title);
            else if(shareType == "facebook") nayuda.facebookShare(url, title);
            else if(shareType == "naver") nayuda.naverShare(url, title);
        },
        kakaoShare: function(url, description){
            if(!Kakao.isInitialized()){
                Kakao.init(jQuery("#kakaoAppkey").val());
            }

            Kakao.Link.sendDefault({
                objectType: 'feed',
                content: {
                    title: "롯데오토마켓",
                    description: description,
                    imageUrl: 'http://localhost/pc/images/common/logo.png',
                    imageWidth: 384,
                    imageHeight: 82,
                    link: {
                        mobileWebUrl: url
                    },
                }
            });
        },
        facebookShare: function(url, title){
            var shareUrl = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(url) ;
            window.open(shareUrl, '', 'width=400,height=400,left=600');
        },
        naverShare: function(url,title){
            var shareURL = encodeURI("https://share.naver.com/web/shareView.nhn?url="+ encodeURIComponent(url) + "&title="+ encodeURIComponent(title) );
            window.open(shareURL,"_blank",'width=500,height=500,left=600');
        },
        startTimer: function(duration, display, exfireFunc) {
            var start = Date.now(),
                diff,
                minutes,
                seconds;
            if(duration > 0){
                function timer() {
                    diff = duration - (((Date.now() - start) / 1000) | 0);
                    hours = (diff / 3600) | 0;
                    minutes = (diff / 60) - (hours * 60) | 0;
                    seconds = (diff % 60) | 0;

                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    seconds = seconds < 10 ? "0" + seconds : seconds;
                    timeText = "";
                    if(hours > 0){
                        timeText += hours + "시간 ";
                    }
                    timeText += minutes + "분 " + seconds + "초";

                    jQuery(display).text("* 남은 시간 (" + timeText + ")");

                    if (diff <= 0) {
                        start = Date.now() + 1000;

                        if(exfireFunc){
                            exfireFunc();
                        }
                    }
                };
                timer();
                return setInterval(timer, 1000);
            }
        },
        stopTimer: function(timerId){
            clearInterval(timerId);
        },
        getInputNumber: function(value, min, max){
            min = min ? min : 0;
            max = max ? max : 9999999;

            try{
                var nValue = Number(value);
                if(!isNaN(nValue)){
                    return Math.max(min, Math.min(max, nValue));
                }
            }catch(e){
                return "";
            }

            return "";
        },
        getInputNumberText: function(value){
            try{
                var regex = /[^0-9]/g;
                var nValue = value.replace(regex, "");
                if(nValue){
                    return nValue;
                }
            }catch(e){
                return "";
            }

            return "";
        },
        getCarTitle: function(carData){
            var arr = [];
            if (carData.brand) {
                arr.push(carData.brand);
            } else if (carData.brandName) {
                arr.push(carData.brandName);
            }else if(carData.brandNm){
                arr.push(carData.brandNm)
            }

            if (carData.model) {
                arr.push(carData.model);
            }else if(carData.modelNm){
                arr.push(carData.modelNm);
            } else if (carData.modelName) {
                arr.push(carData.modelName);
            }

            if(!carData.model && !carData.modelNm && !carData.modelName){
                if (carData.modelgroup) {
                    arr.push(carData.modelgroup);
                }else if (carData.modelgroupNm) {
                    arr.push(carData.modelgroupNm);
                } else if (carData.modelgroupName) {
                    arr.push(carData.modelgroupName);
                }
            }

            if (carData.grade) {
                arr.push(carData.grade);
            } else if (carData.gradeName) {
                arr.push(carData.gradeName);
            }else if(carData.gradeNm){
                arr.push(carData.gradeNm);
            }

            if (carData.subgrade) {
                arr.push(carData.subgrade);
            } else if (carData.subgradeName) {
                arr.push(carData.subgradeName);
            }else if(carData.subgradeNm){
                arr.push(carData.subgradeNm);
            }

            return arr.join(" ");
        },
        goJoinUrl: function(){
            nayuda.alert("회원가입은 롯데렌터카 홈페이지에서 가능합니다.\n가입 후 본 페이지에서 롯데오토마켓 이용이 가능합니다.", function(){
                if(nayuda.isMobileApp()){
                    window.open(jQuery("#lotteLpointJoinUrl").val());
                }else{
                    window.open(jQuery("#lotteLpointJoinUrl").val());
                }
            });
        },
        scrollTo: function(offset, isNoAnimate){
            if(isNoAnimate){
                jQuery('html, body').animate({scrollTop: offset}, 0);
            }else{
                jQuery('html, body').animate({scrollTop: offset}, 300);
            }
        },
        isShowSocialLogin: function(){
            if(nayuda.isIOS() && jQuery("#isHideSocialLogin").val() === "Y"){
                return false;
            }

            return true;
        },
        sideMenuCount: function () {
            nayuda.authJson(
                jQuery("#token").val(),
                "/co/zzim/allside/count",
                {  },
                "POST",
                function (json) {
                    if( json.status === "OK") {
                        let zzimListCount = (json.zzimListCount != null && json.zzimListCount) ? json.zzimListCount: 0;
                        if (zzimListCount > 0) {
                            jQuery('#myCarCount01').html(zzimListCount);
                            jQuery('#myCarCount01').css("display","block");
                        }
                        let recentCount = (json.recentCount != null && json.recentCount) ? json.recentCount : 0;
                        if (recentCount > 0) {
                            jQuery('#myCarCount03').html(recentCount);
                            jQuery('#myCarCount03').css("display","block");
                        }
                        let estimateDateCont = (json.estimateDateCont != null && json.estimateDateCont) ? json.estimateDateCont : 0;
                        if (estimateDateCont > 0) {
                            jQuery('#myCarCount02').html(estimateDateCont);
                            jQuery('#myCarCount02').css("display","block");
                        }
                    }
                }.bind(this),
                this)
        },
        /** 크리테오 적용
         * 모든 페이지에 적용은 해야하나 몇몇 타입이 아닐 경우 다른 내용으로 넣어야 하기때문에
         * 스크립트가 로드된 적이 있다면 지우고 다시 로드 하도록 함.
         * type  - viewHome : 카테고리, 검색, 리스팅, 상품상세, 장바구니, 전환완료 페이지를 제외한 모든 페이지
         *       - viewList : 카테고리, 검색, 리스팅 페이지
         *       - viewItem : 차량별 상세 페이지
         *       - trackTransaction : 상담신청 완료 페이지
         * items - viewHome : none (사용안함)
         *       - viewList : array
         *       - viewItem : string
         *       - trackTransaction : json
         *           - id : transaction ID
         *           - item : [{ id : string(개별상품id), price : number, quantity : number }]
         *           ex) { id : '123213', item : [{ id : '11', price : 1000, quantity : 2}]}
        */
        applyCriteo : (type, items, category)=>{
            const scriptSrc = "//dynamic.criteo.com/js/ld/ld.js?a=113046"
            const scriptId = 'criteoScript'

            const afterCallback = ()=>{
                window.criteo_q = window.criteo_q || [];
                let deviceType = /iPad/.test(navigator.userAgent) ? "t"
                    : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(navigator.userAgent) ? "m" : "d";
                let criteoItems = {}
                window.criteo_q.push(
                    // 113046 고정값인듯? 크리테오 고유 식별 아이디로 추측
                    { event: "setAccount", account: '113046'},

                    // To Do 1. 현재 유저의 이메일 주소(공백 제거 및 소문자로 변환 후) 전달. 유저의 이메일을 알수 없는 상황이면 빈 문자열로 전달
                    { event: "setEmail", email: '', hash_method: "sha256" },
                    { event: "setEmail", email: '', hash_method: "md5" },

                    // To Do 2. 현재 유저의 저장된 배송지 우편번호. 유저의 배송지 우편번호를 알수 없는 상황이면 빈 문자열로 전달
                    { event: "setZipcode", zipcode: '' },
                    { event: "setSiteType", type: deviceType},
                );
                // 현재 유저가 보고있는 상품의 ID 전달. 태그에서 전달되는 상품 ID와 피드에서 전달 주신 상품 ID가 매칭이 되어야 함
                if(type === 'viewItem'){
                    window.criteo_q.push({ event: "viewItem", item : items})
                }
                else if(type === 'viewList'){
                    /* items : array */
                    window.criteo_q.push({ event: "viewList", item : items, category : category})
                }
                else if(type === 'trackTransaction'){
                    /* item : { id : transaction ID, item : [] }
                       item.item = [{ id : string(개별상품id), price : number, quantity : number }]
                     */
                    window.criteo_q.push({ event: "trackTransaction", ...items})
                }
            }
            const criteoScript = document.getElementById(scriptId)

            // 기존 등록된 criteo 항목들 제거.
            if(type !== 'viewHome'){
                window.criteo_q = undefined
            }
            if(!criteoScript){
                var script = window.document.createElement('script');
                script.src = scriptSrc;
                script.type = "text/javascript";
                script.async = true;
                script.onload = afterCallback
                script.id = scriptId
                window.document.head.appendChild(script);
            }
            else{
                afterCallback()
            }

        }
    };
    // 뷰저블 스크립트 운영서버에만 적용되도록 하기위한 코드 ( PV로 차징되는 형태라 개발에 넣었을 경우도 돈을내야한다고 함)
    const enableBeusableUrl = 'mycarsave.lotterentacar.net'
    if(window.location.host === enableBeusableUrl){
        (function(w, d, a){
            console.log('becsable')
            w.__beusablerumclient__ = {
                load : function(src){
                    var b = d.createElement("script");
                    b.src = src; b.async=true; b.type = "text/javascript";
                    d.getElementsByTagName("head")[0].appendChild(b);
                }
            };w.__beusablerumclient__.load(a + "?url=" + encodeURIComponent(d.URL));
        })(window, document, "//rum.beusable.net/load/b230628e160509u671");
    }


    nayuda.applyCriteo('viewHome')
    window.nayuda = nayuda;
})(window);

if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}



/**
 *
 *주민 번호 체크 함수
 **/
function JuminCheck(str_jumin1,str_jumin2) {
    errfound = true;

    var i3=0;
    for (var i=0;i<str_jumin1.length;i++)
    {
        //alert(i);
        var ch1 = str_jumin1.substring(i,i+1);
        if (ch1<'0' || ch1>'9') { i3=i3+1; }
    }
    if ((str_jumin1 == '') || ( i3 != 0 )) {errfound = false; }

    var i4=0;
    for (var i=0;i<str_jumin2.length;i++)
    {
        var ch1 = str_jumin2.substring(i,i+1);
        if (ch1<'0' || ch1>'9') { i4=i4+1; }
    }
    if ((str_jumin2 == '') || ( i4 != 0 )) { errfound = false; }
    if(str_jumin1.substring(0,1) < 4) { errfound = false; }
    if(str_jumin2.substring(0,1) > 2) { errfound = false; }
    if((str_jumin1.length > 7) || (str_jumin2.length > 8)) { errfound = false; }
    if ((str_jumin1 == '72') || ( str_jumin2 == '18')) { errfound = false; }

    var f1=str_jumin1.substring(0,1);
    var f2=str_jumin1.substring(1,2);
    var f3=str_jumin1.substring(2,3);
    var f4=str_jumin1.substring(3,4);
    var f5=str_jumin1.substring(4,5);
    var f6=str_jumin1.substring(5,6);
    var hap=f1*2+f2*3+f3*4+f4*5+f5*6+f6*7;
    var l1=str_jumin2.substring(0,1);
    var l2=str_jumin2.substring(1,2);
    var l3=str_jumin2.substring(2,3);
    var l4=str_jumin2.substring(3,4);
    var l5=str_jumin2.substring(4,5);
    var l6=str_jumin2.substring(5,6);
    var l7=str_jumin2.substring(6,7);
    hap=hap+l1*8+l2*9+l3*2+l4*3+l5*4+l6*5;
    hap=hap%11;
    hap=11-hap;
    hap=hap%10;
    if (hap != l7) { errfound = false; }

    return errfound;
}

// 입력값이 NULL 인지 체크
function chkSpace(strValue){
    var flag=true;
    if (strValue !=""){
        for (var i=0; i < strValue.length; i++){
            if (strValue.charAt(i) != " "){
                flag=false;
                break;
            }
        }
    }
    return flag;
}

function isNum(val){
    var valid = "0123456789";
    var ok = "yes";
    var temp;
    for (var i=0; i<val.length; i++) {
        temp = "" + val.substring(i, i+1);
        if (valid.indexOf(temp) == "-1"){
            ok = "no";
        }
    }

    if (ok == "no") {
        return false;
    }else{
        return true;
    }
}

function isNumOrDot(val){
    var valid = ".0123456789";
    var ok = "yes";
    var temp;
    for (var i=0; i<val.length; i++) {
        temp = "" + val.substring(i, i+1);
        if (valid.indexOf(temp) == "-1"){
            ok = "no";
        }
    }

    if (ok == "no") {
        return false;
    }else{
        return true;
    }
}



//새로운창 띄우기
//width,height조정해서 팝업체 위치 조정
function MM_openBrWindow(theURL,winName,features,width,height) { //v2.0
    if(width == 0) width = screen.width+10;
    if(height == 0) height = screen.height+10;

    var winl = (screen.width - width) / 2;
    var wint = (screen.height - height) / 2;
    features = features+",top="+wint+",left="+winl;
    //alert(features);
    window.open(theURL,winName,features);
}

/**
 *입력 금지 캐릭 모음 문자열과 체크할 문자열을 받아서 체크 해줌
 *입력 금지 문자가 있으면 false
 *입력 금지 문자가 없으면 true
 */
function isValid(inValidChars,checkStr){

    var isValid = true;
    for (var i = 0;  i < checkStr.length;  i++){
        ch = checkStr.charAt(i);
        for (var j = 0;  j < inValidChars.length;  j++){
            if(ch == inValidChars.charAt(j)){
                isValid = false;
                break;
            }
        }
        if(!isValid) break;
    }
    return isValid;

}


String.prototype.josa = function(nm) {
    var nm1 = nm.trim().substring(0, nm.trim().indexOf("/"));
    var nm2 = nm.trim().substring(nm.trim().indexOf("/") + 1, nm.trim().length);
    var a = this.substring(this.length - 1, this.length).charCodeAt();
    a = a - 44032;
    var jongsung = a % 28;
    return (jongsung) ? nm1 : nm2;
};


//두 날짜 사이의 일수를 리턴
//파라미터 형식: 2002/08/15 로..
function getDayDifference(sdate,edate){
    now = new Date(sdate);
    dday = new Date(edate);
    days = (dday - now) / 1000 / 60 / 60 / 24;
    daysRound = Math.floor(days);
    return daysRound;
}

//파일의 확장자 가져오기
function getExtension(file_name){
    var tmp_extension = "";
    var tmp_idx = file_name.lastIndexOf(".");
    //alert("["+tmp_idx+"]");
    if(tmp_idx != -1){
        tmp_extension = file_name.substring(tmp_idx+1,file_name.length);
    }
    return tmp_extension;
}

/**
 * 주어진 변수값 원하는  자리수를 맞추기 위한 메소드
 * @param val 자리수 맞출 값
 * @param len 원하는 자리수
 * @param fill 원하는 자리수 보다 작을때 채워줄 캐릭터
 * @return
 */
function setChipher(val,len,fill){
    var val_len = val.length;

    if(val.length < len){
        cnt = len-val_len;
        for(var i=0; i<cnt;i++){
            val = fill+val;
        }
    }
    return val;
}

//한글입력금지.
function hanCheck(fn){
    for(var j=0;j<fn.length;j++) {
        var a=fn.charCodeAt(j);
        if (a > 128) {
            return true;
        }
    }
    return false;
}

function getExtends(file_name){
    if(file_name == "") return "";
    var s_idx = file_name.lastIndexOf(".") +1;
    if(s_idx == -1 ) return "";
    var ext = file_name.slice(s_idx,file_name.length);
    return ext;
}


function enterChk(event) {
    if(event.keyCode == 13) {
        return true;
    }else{
        return false;
    }
}


function DaysInMonth(WhichMonth, WhichYear){
    var DaysInMonth = 31;
    if (WhichMonth == "04" || WhichMonth == "06" || WhichMonth == "09" || WhichMonth == "11") DaysInMonth = 30;
    if (WhichMonth == "02" && (WhichYear/4) != Math.floor(WhichYear/4))        DaysInMonth = 28;
    if (WhichMonth == "02" && (WhichYear/4) == Math.floor(WhichYear/4))        DaysInMonth = 29;
    return DaysInMonth;
}




/**
 * 한글 체크 함수
 */
function isHangle( koreanChar ) {

    if ( koreanChar.value == null ) return false ;

    for(var i=0; i < koreanChar.value.length; i++){

        var c=koreanChar.value.charCodeAt(i);

        //( 0xAC00 <= c && c <= 0xD7A3 ) 초중종성이 모인 한글자
        //( 0x3131 <= c && c <= 0x318E ) 자음 모음

        if( !( ( 0xAC00 <= c && c <= 0xD7A3 ) || ( 0x3131 <= c && c <= 0x318E ) ) ) {
            return false ;
        }
    }
    return true ;
}

/**
 *한글 포함 글자 byte 체크 함수
 */
function StrLen(argStr)
{
    var ii;
    var strLen = 0;

    for(ii = 0; ii < argStr.length; ii++) {
        if(argStr.charCodeAt(ii) < 128)
            strLen ++;
        else
            strLen += 2;
    }
    return strLen;
}



function bookmark(url,title){
    window.external.AddFavorite(url, title);
}

//숫자 세 자리마다 콤마 찍기 함수
function commify(n) {
    var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
    n += '';                          // 숫자를 문자열로 변환

    while (reg.test(n))
        n = n.replace(reg, '$1' + ',' + '$2');

    return n;
}

String.prototype.URLEncode = function URLEncode() {
    var s0, i, s, u, str;
    s0 = ""; // encoded str
    str = this; // src
    for (i = 0; i < str.length; i++){ // scan the source
        s = str.charAt(i);
        u = str.charCodeAt(i); // get unicode of the char
        if (s == " "){s0 += "+";} // SP should be converted to "+"
        else {
            if ( u == 0x2a || u == 0x2d || u == 0x2e || u == 0x5f
                || ((u >= 0x30) && (u <= 0x39)) || ((u >= 0x41) && (u <= 0x5a))
                || ((u >= 0x61) && (u <= 0x7a))) { // check for escape
                s0 = s0 + s; // don't escape
            } else { // escape
                if ((u >= 0x0) && (u <= 0x7f)){ // single byte format
                    s = "0"+u.toString(16);
                    s0 += "%"+ s.substr(s.length-2);
                } else if (u > 0x1fffff){ // quaternary byte format (extended)
                    s0 += "%" + (oxf0 + ((u & 0x1c0000) >> 18)).toString(16);
                    s0 += "%" + (0x80 + ((u & 0x3f000) >> 12)).toString(16);
                    s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                } else if (u > 0x7ff) { // triple byte format
                    s0 += "%" + (0xe0 + ((u & 0xf000) >> 12)).toString(16);
                    s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                } else { // double byte format
                    s0 += "%" + (0xc0 + ((u & 0x7c0) >> 6)).toString(16);
                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                }
            }
        }
    }
    return s0;
};


String.prototype.URLDecode = function URLDecode() {
    var s0, i, j, s, ss, u, n, f, str;
    s0 = ""; // decoded str
    str = this; // src
    for (i = 0; i < str.length; i++){ // scan the source str
        s = str.charAt(i);
        if (s == "+"){
            s0 += " "; // "+" should be changed to SP
        } else {
            if (s != "%"){s0 += s;} // add an unescaped char
            else{ // escape sequence decoding
                u = 0; // unicode of the character
                f = 1; // escape flag, zero means end of this sequence
                while (true) {
                    ss = ""; // local str to parse as int
                    for (j = 0; j < 2; j++ ) { // get two maximum hex characters for parse
                        sss = str.charAt(++i);
                        if (((sss >= "0") && (sss <= "9")) || ((sss >= "a") && (sss <= "f")) || ((sss >= "A") && (sss <= "F"))) {
                            ss += sss; // if hex, add the hex character
                        } else {
                            --i; break;
                        } // not a hex char., exit the loop
                    }
                    n = parseInt(ss, 16); // parse the hex str as byte
                    if (n <= 0x7f){u = n; f = 1;} // single byte format
                    if ((n >= 0xc0) && (n <= 0xdf)){u = n & 0x1f; f = 2;} // double byte format
                    if ((n >= 0xe0) && (n <= 0xef)){u = n & 0x0f; f = 3;} // triple byte format
                    if ((n >= 0xf0) && (n <= 0xf7)){u = n & 0x07; f = 4;} // quaternary byte format (extended)
                    if ((n >= 0x80) && (n <= 0xbf)){u = (u << 6) + (n & 0x3f); --f;} // not a first, shift and add 6 lower bits
                    if (f <= 1){break;} // end of the utf byte sequence
                    if (str.charAt(i + 1) == "%"){ i++ ;} // test for the next shift byte
                    else {break;} // abnormal, format error
                }
                s0 += String.fromCharCode(u); // add the escaped character
            }
        }
    }
    return s0;
};

/**
 * 주어진 이름의 쿠키값을 가져온다
 * @param name
 * @return
 */
function getCookie(name)
{
    var Found = false;
    var start=0, end =0;
    var i = 0;

    while (i <= document.cookie.length)
    {
        start = i;
        end = start + name.length;
        if (document.cookie.substring(start, end) == name)
        {
            Found = true;
            break;
        }

        i++;
    }

    if (Found == true)
    {
        start = end + 1;
        end = document.cookie.indexOf(';', start);
        if (end < start) end = document.cookie.length;
        return document.cookie.substring(start, end);
    }

    return '';
}


/**
 * 쿠키 굽기
 * @param name 쿠키 이름
 * @param value 쿠키 값
 * @param expiredays 쿠키 만료기간(일단위)
 */
function setCookie( name, value, expiredays ){
    var todayDate = new Date();
    todayDate.setDate( todayDate.getDate() + expiredays );
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}



//3자리 숫자마다 콤마찍기
function commaSplit(srcNumber) {
    var txtNumber = '' + srcNumber;
    if (isNaN(txtNumber) || txtNumber == "") {
        return '';
    }else{
        var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
        var arrNumber = txtNumber.split('.');
        arrNumber[0] += '.';
        do {
            arrNumber[0] = arrNumber[0].replace(rxSplit, '$1,$2');
        } while (rxSplit.test(arrNumber[0]));

        if (arrNumber.length > 1) {
            return arrNumber.join('');
        }else{
            return arrNumber[0].split('.')[0];
        }
    }
}
function copyClipBoard(id){
    if( window.clipboardData && clipboardData.setData ){
        clipboardData.setData("Text", document.getElementById(id).innerText);
        alert("복사완료");
    }else{
        alert("Internet Explorer required");
        return;
    }
}

function strByteLen(ls_str){
    //var ls_str = ls_str; // 이벤트가 일어난 컨트롤의 value 값
    var li_str_len = ls_str.length; // 전체길이

    // 변수초기화
    var i = 0; // for문에 사용
    var li_byte = 0; // 한글일경우는 2 그밖에는 1을 더함
    var ls_one_char = ""; // 한글자씩 검사한다

    for(i=0; i< li_str_len; i++){
        // 한글자추출
        ls_one_char = ls_str.charAt(i);

        if (escape(ls_one_char).length > 4)
            li_byte += 2; // 한글이면 2를 더한다.
        else
            li_byte++;// 그밖의 경우는 1을 더한다.


    }
    return li_byte;

}


/**
 * ESC와 INPUT BOX  속성이 READONLY시에 BACK-SPACE 방지를 위한 함수
 * 두키를 막고자하는 페이지에서  자바스크립트 상단에 document.onkeydown = checkBackSpaceEscKey; 삽입
 */
function checkBackSpaceEscKey(){
    if(window.event.keyCode == 27){
        //ESC 키 막음
        window.event.returnValue = false;
        return;
    }else if(window.event.keyCode == 8) {
        //INPUT BOX READONLY 속성일때 BACK_SPACE 막음
        if(window.event.srcElement.isTextEdit && window.event.srcElement.readOnly){
            window.event.returnValue = false;
            return;
        }
    }
    window.event.returnValue = true;

}

function sleep(milliseconds) {

    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

/**
 * 이미지 리사이트 함수
 * @param FIX_W 고정하고자 하는 넓이값
 * @param FIX_H	 고정하고자 하는 높이값
 * @param IMGID 대상이미지 아이디
 * @return
 */
function fnImgResize(P_FIX_W, P_FIX_H, IMGID){
    //alert(IMGID);
    var fix_W = P_FIX_W;														//희망하는 이미지 넓이값
    var fix_H = P_FIX_H;   														//희망하는 이미지 높이값
    var arrImg = document.getElementsByName(IMGID); 		//이미지 축소 대상 id(이미지 태그에 지정)
    //alert(arrImg.length);


    var W, new_W;
    var H, new_H;
    for(var i=0;i<arrImg.length;i++){
        W = arrImg[i].width;
        H = arrImg[i].height;

        //alert("org==>"+W+"," +H);

        if(W > fix_W && H <= fix_H){
            //가로 사이즈만 클때
            //alert("a");
            //alert("org==>"+W+"," +H);


            new_W = fix_W;
            new_H = parseInt((new_W*H)/W);

            //alert("new==>"+new_W+"," +new_H);

        }else if(W <= fix_W && H > fix_H){
            //세로 사이즈만 클때
            //alert("b");

            //alert("org==>"+W+"," +H);

            new_H = fix_H;
            new_W = parseInt( (new_H*W)/H);

            //alert("new==>"+new_W+"," +new_H);

            //alert("new==>"+new_W+"," +new_H);
        }else if(W > fix_W && H > fix_H){
            //가로 세로 모두 클때
            //alert("c");
            //alert("org==>"+W+"," +H);

            //가로 사이즈 조정
            new_W = fix_W;
            new_H = parseInt((new_W*H)/W);

            //alert("new==>"+new_W+"," +new_H);

            //세로 사이즈 조정
            if(new_H>fix_H){
                new_H = fix_H;
                new_W = parseInt( (new_H*W)/H);
            }

            //alert("new==>"+new_W+"," +new_H);
        }else{
            //alert("d");
            //나머지는 원래 사이즈
            new_W = W;
            new_H = H;
        }

        arrImg[i].width = new_W;
        arrImg[i].height = new_H;

    }



}

//-----------------------------------------------------------------------------
//문자 앞 뒤 공백을 제거 한다.
//-----------------------------------------------------------------------------
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};


//-----------------------------------------------------------------------------
//String에 따라서 받침이 있으면 은|이|을 을
//              받침이 없으면 는|가|를 등을 리턴 한다.
//str.josa("을/를") : 구분자는 항상 "/"로
//
//
//@return : 은/는, 이/가 ...
//-----------------------------------------------------------------------------
String.prototype.josa = function(nm) {
    var nm1 = nm.trim().substring(0, nm.trim().indexOf("/"));
    var nm2 = nm.trim().substring(nm.trim().indexOf("/") + 1, nm.trim().length);
    var a = this.substring(this.length - 1, this.length).charCodeAt();
    a = a - 44032;
    var jongsung = a % 28;
    return (jongsung) ? nm1 : nm2;
};

function PopupAutoResize() {
    window.resizeTo(10, 10);
    var thisX = parseInt(document.body.scrollWidth);
    var thisY = parseInt(document.body.scrollHeight);
    var maxThisX = screen.width - 50;
    var maxThisY = screen.height - 50;
    var marginY = 0;
    //alert(thisX + "===" + thisY);
    //alert("임시 브라우저 확인 : " + navigator.userAgent);
    // 브라우저별 높이 조절.
    if (navigator.userAgent.indexOf("MSIE 6") > 0) marginY = 60;        // IE 6.x
    else if(navigator.userAgent.indexOf("MSIE 7") > 0) marginY = 80;    // IE 7.x
    else if(navigator.userAgent.indexOf("MSIE 8") > 0) marginY = 80;    // IE 7.x
    else if(navigator.userAgent.indexOf("MSIE 9") > 0) marginY = 50;    // IE 7.x
    else if(navigator.userAgent.indexOf("Firefox") > 0) marginY = 50;   // FF
    else if(navigator.userAgent.indexOf("Opera") > 0) marginY = 30;     // Opera
    else if(navigator.userAgent.indexOf("Netscape") > 0) marginY = -2;  // Netscape
    else if(navigator.userAgent.indexOf("Chrome") > 0) marginY = 30;  // Chrome

    if (thisX > maxThisX) {
        window.document.body.scroll = "yes";
        thisX = maxThisX;
    }
    if (thisY > maxThisY - marginY) {
        window.document.body.scroll = "yes";
        thisX += 19;
        thisY = maxThisY - marginY;
    }
    window.resizeTo(thisX+10, thisY+marginY);
}


function isExistSpChar(str){
    var re = /[~!@\#$%^&*\()\-=+_'\"]/gi; //특수문자
    if(re.test(str)){
        return true;
    }
    return false;
}

function chkSpChar(e){
    var code = (window.event) ? event.keyCode : e.which;
    if (code > 32 && code < 48) return true;
    if (code > 57 && code < 65) return true;
    if (code > 90 && code < 97) return true;
    if (code > 122 && code < 127) return true;
    return false;
}

function keyInputCancel(e){
    if(navigator.appName!="Netscape"){	//for not returning keycode value
        window.event.returnValue = false;	//IE ,? - Chrome both
    }else{
        e.preventDefault();							//FF ,? - Chrome both
    }
}



/**
 * 이메일 체크 함수
 *
 * @param str
 * @returns {Boolean}
 */
function chkEmail(str){
    //이메일 정규식
    var regExp = /^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if(!regExp.test(str)){
        return false;
    }
    return true;

}

/**
 * 전화번호 체크 함수
 *
 * @param str
 * @returns {Boolean}
 */
function chkPhoneNumber(str){
    //모든 전화 번호 정규식
    var regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

    if(!regExp.test(str)){
        return false;
    }
    return true;

}

/**
 * 패스워드 체크 함수
 *
 * @param str
 * @returns {Boolean}
 */
function chkPassword(str){
    var valid = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*-_~";
    var ok = "yes";
    var temp;
    for (var i=0; i<str.length; i++) {
        temp = "" + str.substring(i, i+1);
        if (valid.indexOf(temp) == -1) ok = "no";
    }

    if (ok == "no") {
        return false;
    }
    return true;
}

/**
 * 숫자나 영문 대문자만 입력
 * @param aObj
 * @param aDesc
 * @returns
 */
function checkNumUpEng(aObj, msg) {
    var val = aObj.value;
    var len = val.length;
    for (var i=0; i<len; i++) {
        var ch = val.charAt(i);
        var isNumEnglish = (ch >= '0' && ch <= '9') || (ch >= 'A' && ch <= 'Z');
        if (!isNumEnglish) {
            aObj.select();
            alert(msg);
            return false;
        }
    }
    return true;
}

/**
 * 숫자만 입력 가능
 * @param aObj
 * @param msg
 * @returns {Boolean}
 */
function checkNum(aObj, msg) {
    var val = aObj.value;
    var len = val.length;
    for (var i=0; i<len; i++) {
        var ch = val.charAt(i);
        var isNum = (ch >= '0' && ch <= '9');
        if (!isNum) {
            aObj.select();
            alert(msg);
            return false;
        }
    }
    return true;
}

function getTimeStamp() {
    var d = new Date();

    var s =
        leadingZeros(d.getFullYear(), 4) + '-' +
        leadingZeros(d.getMonth() + 1, 2) + '-' +
        leadingZeros(d.getDate(), 2);

    /*
    leadingZeros(d.getFullYear(), 4) + '-' +
    leadingZeros(d.getMonth() + 1, 2) + '-' +
    leadingZeros(d.getDate(), 2) + ' ' +
    leadingZeros(d.getHours(), 2) + ':' +
    leadingZeros(d.getMinutes(), 2) + ':' +
    leadingZeros(d.getSeconds(), 2);
    */

    return s;
}

function leadingZeros(n, digits) {
    var zero = '';
    n = n.toString();
    if (n.length < digits) {
        for (var i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}

/**
 * 숫자 키입력 체크 함수
 *
 * @param obj
 * @param e
 * @param msg
 * @returns {Boolean}
 */
function chkEventKeydownNumber(obj, e, msg){
    if(
        (e.keyCode >=  48 && e.keyCode <=  57) ||  	//숫자열 0 ~ 9 : 48 ~ 57
        (e.keyCode >=  96 && e.keyCode <= 105 ) ||		//키패드 0 ~ 9 : 96 ~ 105
        e.keyCode == 8 ||											//BackSpace
        e.keyCode == 46 ||											//Delete
        e.keyCode == 37 ||											//좌 화살표
        e.keyCode == 39 ||											//우 화살표
        e.keyCode == 35 ||											//End 키
        e.keyCode == 36 ||											//Home 키
        e.keyCode == 9 												//Tab 키
    ){
        if(e.keyCode == 48 || e.keyCode == 96) {			//0입력시
            if(obj.value == "" || obj.value == '0'){			//아무것도 없거나 현재 값이 0일 경우에서 0을 눌렀을경우
                e.preventDefault();
                return false;
            }else{
                return true;
            }
        }else{
            return true;
        }
    }else{
        alert(msg);
        e.preventDefault();
        return false;
    }
}

function chkEventKeypressNumber(event, msg){
    if(event.which && (event.which  > 47 && event.which  < 58 || event.which == 8)){
        //alert('숫자임!');
    }else{
        alert(msg);
        event.preventDefault();
    }
}

/**
 * 문자열을 Date객체로 치환 함수(yyyy/MM/dd, yyyy-MM-dd 포멧만 지원)
 *
 * @param str
 * @returns {Date}
 */
function str2date(str){
    if(str.indexOf("-") != -1){
        var tmp = str.split("-");
        str = tmp[0]+"/" + tmp[1] + "/" + tmp[2];
        //alert(str);
    }
    return new Date(str);
}

/*
 * jquery datepicker plugin 환경 설정 변수
 *
 */
var clareCalendar = {
    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    dayNamesMin: ['일','월','화','수','목','금','토'],
    weekHeader: 'Wk',
    dateFormat: 'yy-mm-dd',
    autoSize: false,
    changeMonth: true,
    changeYear: true,
    showMonthAfterYear: true,
    showButtonPanel: true
};



/**
 * 오늘 날짜를 문자열로 반환 (Format : yyyy-MM-dd)
 *
 * @returns
 */
function fnTodayDateStr() {
    var d = new Date();
    return getDateStr(d);
}

/**
 * 오늘로부터 1주일전 날짜 반환 (Format : yyyy-MM-dd)
 *
 * @returns
 */
function fnLastWeekDateStr() {
    var d = new Date();
    var dayOfMonth = d.getDate();
    d.setDate(dayOfMonth - 7);
    return getDateStr(d);
}


/**
 * 오늘로부터 1개월전 날짜 반환 (Format : yyyy-MM-dd)
 *
 * @returns
 */
function fnLastMonthDateStr() {
    var d = new Date();
    var monthOfYear = d.getMonth();
    d.setMonth(monthOfYear - 1);
    return getDateStr(d);
}

/**
 * Date 객체를 이용해 문자열 반환((Format : yyyy-MM-dd)
 *
 * @param myDate
 * @returns
 */
function getDateStr(myDate){
    return (myDate.getFullYear() + '-' + leadingZeros((myDate.getMonth() + 1), 2) + '-' + leadingZeros(myDate.getDate(), 2));
}


function isMobile(){
    var filter = "win16|win32|win64|mac|macintel";
    if (navigator.platform) {
        if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
            //모바일
            return true;
        } else {
            //PC
            return false;
        }

    }
}

function isImageFile(fileNm){
    var ext = fileNm.slice(fileNm.lastIndexOf(".") + 1).toLowerCase();
    if (ext == "gif" || ext == "jpg" || ext == "jpeg" || ext == "png" || ext == "bpm") {
        return true;
    }else{
        return false;
    }
}

function fileClear(fileObj){
    var agent = navigator.userAgent.toLowerCase();
    if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ){
        console.log("ie...................");
        // ie 일때 input[type=file] init.
        $(fileObj).replaceWith( $(fileObj).clone(true) );
    } else {
        console.log("other...................");
        // other browser 일때 input[type=file] init.
        $(fileObj).val("");
    }
}


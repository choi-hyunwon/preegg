var errorMessage = "오류가 발생하였습니다. 다시 시도해주시기 바랍니다.";

/* Utility */

function goReserve(movieIdx, movieGroupCd, title, rating, rKind) {
    if (IsWebView_Master) {
        if (IsNewVersion_Master) {
            CGVHAAppInterface.ReserveFromMovieInfoV4(movieGroupCd, encodeURIComponent(title), rating, rKind);
        }
        else {
            CGVHAAppInterface.ReserveFromMovieInfo(movieIdx);
        }
    }
    else {
        window.location.href = "/WebApp/Reservation/quickResult.aspx?MovieIdx=" + movieIdx;
    }
}
// 세자리마다 ',' 표시
function NumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 날짜 년월일마다 '.' 표시
function DateWithPeriod(date) {
    var regex = /^(\d{4})(\d{2})(\d{2})$/;

    return date.toString().replace(regex, '$1.$2.$3');
};

// Get Query String Value
// https://www.sitepoint.com/url-parameters-jquery/
function GetUrlParam(field) {
    var href = window.location.href;
    var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    var string = reg.exec(href);

    return string ? string[1] : null;
}
// APP 외부링크 열기
function openOutLinkV5(url,type) {
    if (cgv.common.StandardInfo.IsWebView == true && cgv.common.StandardInfo.AppVersion >= 433) {
        CGVHAAppInterface.OutLink(encodeURIComponent(url), type);
    }
    else {
        window.open(url);
    }
}
// 날짜 차이 계산 (2017-02-15,2018-01-05)
function DataDiffDay(startDate, endDate) {
    var stDate = new Date(startDate);
    var endDate = new Date(endDate);
    var btMs = endDate.getTime() - stDate.getTime();
    var btDay = btMs / (1000 * 60 * 60 * 24);

    return (btDay + 1);
}
// 특수 문자가 있나 없나 체크
function checkStringFormat(string) {
    //var stringRegx=/^[0-9a-zA-Z가-힝]*$/; 
    var stringRegx = /[~!@\#$%<>^&*\()\-=+_\’]/gi;
    var isValid = true;
    if (stringRegx.test(string)) {
        isValid = false;
    }
    return isValid;
}
// APP 웹뷰로 열기
function openNewWebViewV5(url, _target, gaType, eventLabel, movieIdx, mTitle, rKind, linkType) {
    var eventCategory = "";
    var eventAction = "";
    var openType = "2";
    var lType = "1";
    var screenName = "";
    var outLinkType = "0";

    var categoryHome = "MW_홈";
    var categoryEvent = "MW_이벤트";
    var categoryStore = "MW_스토어";
    var categoryMy = "MW_마이";

    if (cgv.common.StandardInfo.IsWebView) {
        categoryHome = "MA_홈";
        categoryEvent = "MA_이벤트";
        categoryStore = "MA_스토어";
        categoryMy = "MA_마이";
    }

    switch (gaType) {
        case "H-8":
            eventCategory = categoryHome;
            eventAction = "동영상 광고_상세보기";
            break;
        case "H-15":
        case "H-34":
            eventCategory = categoryHome;
            eventAction = eventLabel;
            eventLabel = "";
            break;
        case "H-13":
            eventCategory = categoryHome;
            var sTemp = eventLabel.split("^");
            eventAction = sTemp[0];
            eventLabel = sTemp[1];
            break;
        case "H-16":
            eventCategory = categoryHome;
            eventAction = "나만의차트";
            break;
        case "H-18-1":
            eventCategory = categoryHome;
            eventAction = "나만의차트_현재상영";
            break;
        case "H-18-2":
            eventCategory = categoryHome;
            eventAction = "나만의차트_개봉예정";
            break;
        case "H-18-3":
            eventCategory = categoryHome;
            eventAction = "나만의차트_아트하우스";
            break;
        case "H-28":
            eventCategory = categoryHome;
            eventAction = "좋아할만한 팬페이지_상세보기";
            break;
        case "H-30":
            eventCategory = categoryHome;
            eventAction = "굿리뷰어_영화정보";
            break;
        case "H-36":
            eventCategory = categoryHome;
            eventAction = "동영상 전체보기_상세보기";
            break;
        case "H-37":
            eventCategory = categoryHome;
           	eventAction = "팬페이지_지금예매";
           	break;
        case "H-38":
            eventCategory = categoryHome;
            eventAction = "특별관 카테고리";
            eventLabel = eventLabel;
            break;
        case "H-39-1":
            eventCategory = categoryHome;
            eventAction = "마케팅배너(상단)";
            outLinkType = linkType;
            break;
        case "H-39-2":
            eventCategory = categoryHome;
            eventAction = "마케팅배너(하단)";
            outLinkType = linkType;
            break;
        case "E-8":
            eventCategory = categoryEvent;
            eventAction = eventLabel;
            break;
        case "E-8-1":
            eventCategory = categoryEvent;
            eventAction = "#지난이벤트_상세보기";
            break;
        case "E-8-2":
            eventCategory = categoryEvent;
            eventAction = "#Special_상세보기";
            break;
        case "E-8-3":
            eventCategory = categoryEvent;
            eventAction = "#영화_상세보기";
            break;
        case "E-8-4":
            eventCategory = categoryEvent;
            eventAction = "#멤버십/Club_상세보기";
            break;
        case "E-8-5":
            eventCategory = categoryEvent;
            eventAction = "#극장_상세보기";
            break;
        case "E-8-6":
            eventCategory = categoryEvent;
            eventAction = "#제휴_상세보기";
            break;
        case "S-7-1":
            eventCategory = categoryStore;
            eventAction = "스토어_내기프트콘";
            break;
        case "S-7-2":
            eventCategory = categoryStore;
            eventAction = "스토어_최근구매";
            break;
        case "S-8":
            eventCategory = categoryStore;
            eventAction = eventLabel;
            break;
        case "S-9":
            eventCategory = categoryStore;
            eventAction = "추천상품";
            break;
        case "S-10":
            eventCategory = categoryStore;
            eventAction = "인기상품";
            break;
        case "S-11":
            eventCategory = categoryStore;
            eventAction = "스토어_상단배너";
            eventLabel = eventLabel;
            break;
        case "M-7":
            eventCategory = categoryMy;
            eventAction = "마이_모바일티켓";
            break;
        case "M-7-1":
            eventCategory = categoryMy;
            eventAction = "마이_모바일티켓";
            openType = "5";
            break;
        case "M-8":
            eventCategory = categoryMy;
            eventAction = "CJ ONE 포인트";
            break;
        case "M-9":
            eventCategory = categoryMy;
            eventAction = "매점적립";
            break;
        case "M-10":
            eventCategory = categoryMy;
            eventAction = "VIP라운지";
            break;
        case "M-11":
        case "M-12":
        case "M-13":
            eventCategory = categoryMy;
            eventAction = eventLabel;
            eventLabel = "";
            break;
        case "M-14":
            eventCategory = categoryMy;
            eventAction = eventLabel;
            eventLabel = "";
            openType = "5";
            break;

            
    }
    // Google Analytics Tag
    // Type은 Event:1 고정
    if (gaType !== "") fnSendGALog(lType, screenName, eventCategory, eventAction, eventLabel);
    if (cgv.common.StandardInfo.IsWebView) {
        if (gaType === "H-28") {
            if (url.indexOf("cgv.co.kr") > -1) {
                CGVHAAppInterface.EventBannerCall(openType, encodeURIComponent(url));
            }
            else {
                CGVHAAppInterface.OutLink(encodeURIComponent(url), '0');
            }
        }
        else if (gaType === "H-37") {
        	CGVHAAppInterface.ReserveFromMovieInfoV4(movieIdx, encodeURIComponent(mTitle), "", rKind);
        }
        else if (gaType === "H-39-1" || gaType === "H-39-2") {
            if (outLinkType === "1") {
                CGVHAAppInterface.OutLink(encodeURIComponent(url), outLinkType);
            }
            else {
                CGVHAAppInterface.EventBannerCall(openType, encodeURIComponent(url));
            }
        }
        else {
			if ((url.indexOf("EventDetailGeneral.aspx") !== -1)&& (url.substring(0, 2) === "./")) {
        		url = "/WebApp/EventNotiV4" + url.substring(1);
        	}

            CGVHAAppInterface.EventBannerCall(openType, encodeURIComponent(url));
        }
    }
    else {
        if (_target === "") window.location.href = url;
        else  window.open(url);
    }
}
    
// APP 웹뷰로 열기(스토어)
function openWebViewV5(url, _target, gaType, eventCategory, eventAction, eventLabel, openType) {
    var screenName = "";
    // Google Analytics Tag 
    // Type은 Event:1 고정
    if (cgv.common.StandardInfo.IsWebView) {
        eventCategory = "MA_" + eventCategory;
    } else {
        eventCategory = "MW_" + eventCategory;
    }

    fnSendGALog(gaType, screenName, eventCategory, eventAction, eventLabel);
    if (url != "") {
        if (cgv.common.StandardInfo.IsWebView) {
            if ((url.indexOf("cgv.co.kr") > -1) || (url.indexOf("cgv.kr") > -1)) {
                CGVHAAppInterface.EventBannerCall(openType, encodeURIComponent(url));
            }
            else {
                if (_target == "") CGVHAAppInterface.EventBannerCall(openType, encodeURIComponent(url));
                else CGVHAAppInterface.OutLink(encodeURIComponent(url), "1");
        }
    }
    else {
        if (_target == "") window.location.href = url;
        else  window.open(url);
        }
    }
}

// GA 향상된전자상거래 전송
function PopcornGoogleAnalyticsPush(view, action, event, data) {
    var ga_data = { 'type': 'popcorn_E'
                    , 'title': view
                    , 'category': 'Ecommerce'
                    , 'action': action
                    , 'event': 'popcorn_' + event
                    , 'ecommerce': data
                };

    //APP
    if (cgv.common.StandardInfo.IsWebView) {
        console.log("APP");
    }
    else {
        dataLayer.push(ga_data);
    }
}

function SetStoreCartCountApp(pos, cnt) {
    if (cgv.common.StandardInfo.IsWebView) {
        // AppVersion 체크해서 장바구니 구현된 버전 이상에서만 해당 WebApp I/F 호출
        if (cgv.common.StandardInfo.AppVersion >= 457) { CGVHAAppInterface.SetStoreBasketCount(pos, cnt); }
    }
}
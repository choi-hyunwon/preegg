var nLastHistoryIndex = 0;
var nStartIndex = null;

function _calliOS(method) {
    var iframe = document.createElement("IFRAME");
    iframe.setAttribute("src", method);
    document.documentElement.appendChild(iframe);
    iframe.parentNode.removeChild(iframe);
    iframe = null;
}

//ajax 호출하여 현재 히스토리에 추가하기
callAjax = function (nIndex) {
    if (typeof nIndex == 'undefined') {
        nIndex = this.nLastHistoryIndex;
    }

    if (typeof this.htDataHistory[(nIndex)] != 'undefined') { return; }

    this.nStartIndex = nIndex;
    this.nLastHistoryIndex = nIndex + this.nCnt - 1;
}

/* 좌측버튼 */
function SetBackButton(setId) {
    SetLeft(setId);
}

function SetLeft(leftId) {
    if (leftId == "MOVIEDETAIL") { setLeftFunction("MAIN"); }
    else if (leftId == "COLLAGE") { setLeftFunction("MAIN"); }
    else if (leftId == "MOVIETRAILER") { setLeftFunction("MAIN"); }
    else if (leftId == "GREETING") { setLeftFunction("MAIN"); }
    else if (leftId == "RATING_VIEW_REAL") { setLeftFunction("MAIN"); }
    else if (leftId == "RATING_VIEW_ALL") { setLeftFunction("MAIN"); }
    else if (leftId == "RATING_VIEW") { setLeftFunction("MAIN"); }
    else if (leftId == "POINT_CJONE_SNACKBAR") { window.location.href = "/WebAPP/MyCgvV4/point_cjone_admin.aspx"; }
    else if (leftId == "POINT_CJONE_SNACKBAR03") { window.location.href = "/WebAPP/MyCgvV4/point_cjone_admin.aspx"; }
    else if (leftId == "POINT_CJONE_SNACKBAR06") { window.location.href = "/WebAPP/MyCgvV4/point_cjone_admin.aspx"; }
    else if (leftId == "POINT_SNACKBAR") { setLeftFunction("MY"); }
    else if (leftId == "POINT_CJONE_ADMIN") { setLeftFunction("MY"); }
    else if (leftId == "OKCASHBAKSAVE") { setLeftFunction("MY"); }
    else if (leftId == "PAYMENT_ITEM") { setLeftFunction("MY"); }
    else if (leftId == "MANAGE_TICKET_COUPON") { setLeftFunction("MY"); }
    else if (leftId == "MOVIE_TICKET_HAVE_LIST") { window.location.href = "/WebAPP/MyCgvV4/manage_ticket_coupon.aspx"; }
    else if (leftId == "MOVIE_TICKET_USE_LIST") { window.location.href = "/WebAPP/MyCgvV4/manage_ticket_coupon.aspx"; }
    else if (leftId == "MOVIE_OLLEH_HAVE_LIST") { window.location.href = "/WebAPP/MyCgvV4/manage_ticket_coupon.aspx"; }
    else if (leftId == "MOVIE_OLLEH_USE_LIST") { window.location.href = "/WebAPP/MyCgvV4/manage_ticket_coupon.aspx"; }
    else if (leftId == "MOVIE_DISCOUNTTICKET_HAVE_LIST") { window.location.href = "/WebAPP/MyCgvV4/manage_ticket_coupon.aspx"; }
    else if (leftId == "MOVIE_DISCOUNTTICKET_USE_LIST") { window.location.href = "/WebAPP/MyCgvV4/manage_ticket_coupon.aspx"; }
    else if (leftId == "GIFTCON_HAVE_LIST") { window.location.href = "/WebAPP/MyCgvV4/manage_ticket_coupon.aspx"; }
    else if (leftId == "GIFTCON_USE_LIST") { window.location.href = "/WebAPP/MyCgvV4/manage_ticket_coupon.aspx"; }
    else if (leftId == "MOVIE_PASSCARD") { window.location.href = "/WebAPP/MyCgvV4/manage_ticket_coupon.aspx"; }
    else if (leftId == "MANAGE_GIFT_LIST") { setLeftFunction("MY"); }
    else if (leftId == "MANAGE_GIFT_DETAIL") { setLeftFunction("MY"); }
    else if (leftId == "MANAGE_CANCEL_LIST") { setLeftFunction("MY"); }
    else if (leftId == "CGV_FAVOR_COMPLETE") { setLeftFunction("MY"); }
    else if (leftId == "FAVOR_CREDIT_CD_COMPLETE") { setLeftFunction("MY"); }
    else if (leftId == "FAVOR_CREDIT_CD_CLAUSE") { setLeftFunction("MY"); }
    else if (leftId == "SPECIAL") { setLeftFunction("MAIN"); }
    else if (leftId == "THEATER") { setLeftFunction("MAIN"); }
    else if (leftId == "NOTICELIST") { setLeftFunction("MAIN"); }
    else if (leftId == "GIFT_PAYMENT_HISTORY") { self.history.back(-1); }
    else if (leftId == "NOTICE") { setLeftFunction("MAIN"); }
    else if (leftId == "GIFT") { setLeftFunction("MAIN"); }
    else if (leftId == "SPECIALCLUB") { setLeftFunction("MAIN"); }
    else if (leftId == "GIFTPAYMENT") { setLeftFunction("MAIN"); }
    else if (leftId == "VIP_COUPON") { setLeftFunction("MY"); }
    else if (leftId == "NOTICE_BOX") { setLeftFunction("MAIN"); }
    else if (leftId == "CREDITCARD_PAYMENT") { setLeftFunction("MAIN"); }
    else if (leftId.indexOf("MAGAZINE") > -1) {setLeftFunction("MAIN"); }
    else if (leftId.indexOf("SALECARD") > -1) {setLeftFunction("MAIN");}
    else if (leftId == "CLUBTOWN") {setLeftFunction("MAIN");}
    else if (leftId == "SHORTCUT") {setLeftFunction("MY");}
    else if (leftId == "MYCGV") {setLeftFunction("MY");}
    else if (leftId == "MOVIELIST") { setLeftFunction("MAIN"); }
    else if (leftId == "ADVIEW") { setLeftFunction("MY"); }
    else if (leftId == "KIAREDMEMBERSSAVE") { setLeftFunction("MY"); }
    else if (leftId == "고객센터") { setLeftFunction("MAIN"); }
    else if (leftId == "THEATER_REGION" || leftId == "THEATER_DETAIL")
    {
        try {
            if (IsWebViewIPhone_Master) { setLeftFunction("MAIN"); }
            else { window.location.href = "/WebApp/TheaterV4/"; }
        } catch (e) {
            setLeftFunction("MAIN");
        }
    }
}

function fnSetLeftBack() {
    var tmp_img = "";
    try {
        tmp_img = document.getElementById("headerTitle").innerHTML;
    } catch (e) { }

    if (tmp_img.indexOf("/backV4") > -1) {
        if (g_refUrl != "") {
            location.href = decodeURIComponent(g_refUrl);
        }
        else {
            self.history.back(-1);
        }
    }
    else {
        setLeftFunction("MAIN");
    }
}

/* 우측버튼 */
function SetExecButton(setId, buttonId) {
    SetRight(setId, buttonId);
}

function SetRight(rightId, btnId) {
    var result;
    if (nStartIndex == null) nStartIndex = 0;
    if (rightId == "LOGIN") {
        if (btnId == "CANCLE") {
            if (history.length > 1) {
                self.history.back(-1);
            }
            else {
                ClosingWeb("MAIN");
            }
        }
    }
    else if (rightId == "LOGIN") {
        if (btnId == "CANCEL") {
            self.history.back(-1);
        }
    }
    else if (rightId == "STILLCUTLIST") {
        if (btnId == "CLOSE") {
            self.history.back(-1);
        }
    }
    else if (rightId == "MOVIETRAILER") {
        if (btnId == "CLOSE") {
            ClosingWeb("DIARY");
        }
        else if (btnId == "SEARCH") {
            schBtnClick();
        }
    }
    else if (rightId == "MY_RATING_VIEW") {
        if (btnId == "CLOSE") {
            if (history.length > 1) {
                self.history.back(-1);
            }
            else {
                ClosingWeb("MAIN");
            }
        }
    }
    else if (rightId == "MY_RATING_VIEW_IN") {
        if (btnId == "CLOSE") {
            ClosingWeb("DIARY");
        }
    }
    else if (rightId == "THEATER_INFO") {
        if (btnId == "CLOSE") {
            ClosingWeb("THEATER");
        }
    }
    else if (rightId == "RATING_VIEW") {
        if (btnId == "MYSTARPOINT") { window.location.href = "/WebAPP/MovieV4/my_rating_view.aspx"; }
        else if (btnId == "MYSTARPOINTLOGIN") {
            if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
                window.location.href = "/WebAPP/MovieV4/my_rating_view.aspx";
            }
        }
    }
    else if (rightId == "POINT_CJONE_SNACKBAR") { if (btnId == "SAVING") { PointSaveWeb(); } }
    else if (rightId == "POINT_CJONE_SNACKBAR03") { if (btnId == "SAVING") { PointSaveWeb(); } }
    else if (rightId == "POINT_CJONE_SNACKBAR06") { if (btnId == "SAVING") { PointSaveWeb(); } }
    else if (rightId == "POINT_SNACKBAR") { if (btnId == "SAVING") { PointSaveWeb(); } }
    else if (rightId == "GIFTCON_REGIST_DETAIL") { if (btnId == "CLOSE") { self.history.back(-1); } }
    else if (rightId == "MOVIE_TICKET_HAVE_LIST") { if (btnId == "REGISTER") { window.location.href = "/WebAPP/MyCgvV4/movie_ticket_regist.aspx"; } }
    else if (rightId == "MOVIE_TICKET_USE_LIST") { if (btnId == "REGISTER") { window.location.href = "/WebAPP/MyCgvV4/movie_ticket_regist.aspx"; } }
    else if (rightId == "MOVIE_TICKET_REGIST") { if (btnId == "CLOSE") { self.history.back(-1); } }
    else if (rightId == "MOVIE_OLLEH_HAVE_LIST") { if (btnId == "REGISTER") { window.location.href = "/WebAPP/MyCgvV4/olleh_internet_regist_detail.aspx"; } }
    else if (rightId == "MOVIE_OLLEH_USE_LIST") { if (btnId == "REGISTER") { window.location.href = "/WebAPP/MyCgvV4/olleh_internet_regist_detail.aspx"; } }
    else if (rightId == "OLLEH_INTERNET_REGIST_DETAIL") { if (btnId == "CLOSE") { self.history.back(-1); } }
    else if (rightId == "COUPON_REGIST_DETAIL") { if (btnId == "CLOSE") { self.history.back(-1); } }
    else if (rightId == "MOVIE_DISCOUNTTICKET_HAVE_LIST") { if (btnId == "REGISTER") { window.location.href = "/WebAPP/MyCgvV4/coupon_regist_detail.aspx"; } }
    else if (rightId == "MOVIE_DISCOUNTTICKET_USE_LIST") { if (btnId == "REGISTER") { window.location.href = "/WebAPP/MyCgvV4/coupon_regist_detail.aspx"; } }

    else if (rightId == "PARTNERSHIP_DISCOUNTTICKET_HAVE_LIST") { if (btnId == "REGISTER") { window.location.href = "/WebAPP/MyCgvV4/partnership_coupon_regist_detail.aspx"; } }
    else if (rightId == "COUPON_PARTNERSHIP_REGIST_DETAIL") { if (btnId == "CLOSE") { self.history.back(-1); } }

    else if (rightId == "MOVIE_PASSCARD") { if (btnId == "REGISTER") { window.location.href = "/WebAPP/MyCgvV4/movie_passcard_regist.aspx"; } }
    else if (rightId == "MOVIE_PASSCARD_REGIST") { if (btnId == "CLOSE") { window.location.href = "/WebAPP/MyCgvV4/movie_passcard_have_list.aspx"; } }

    else if (rightId == "FOURDXREDCARD_HAVE_LIST") { if (btnId == "REGISTER") { window.location.href = "/WebAPP/MyCgvV4/fourdxRedCard_regist.aspx"; } }
    else if (rightId == "FOURDXREDCARD_REGIST") { if (btnId == "CLOSE") { window.location.href = "/WebAPP/MyCgvV4/fourdxRedCard_have_list.aspx"; } }


    else if (rightId == "GIFTCON_HAVE_LIST") { if (btnId == "REGISTER") { window.location.href = "/WebAPP/MyCgvV4/giftcon_regist_detail.aspx"; } }
    else if (rightId == "GIFTCON_USE_LIST") { if (btnId == "REGISTER") { window.location.href = "/WebAPP/MyCgvV4/giftcon_regist_detail.aspx"; } }
    else if (rightId == "CGV_CHOICE_AREA") { if (btnId == "CLOSE") { self.history.back(-1); } }
    else if (rightId == "CGV_CHOICE") { if (btnId == "CLOSE") { window.location.href = "/WebAPP/MyCgvV4/cgv_favor_complete.aspx" } }
    else if (rightId == "CGV_FAVOR_COMPLETE") {
        if (btnId == "REGISTER") { window.location.href = "/WebAPP/MyCgvV4/cgv_choice.aspx"; }
        else if (btnId = "CGVFAVORTHEATERCOUNT") { alert("자주 가는 CGV는 최대 5개까지 등록하실 수 있습니다. 기존 자주 가는 CGV를 삭제 후 등록해주세요."); }
    }
    else if (rightId == "FAVOR_CREDIT_CD_COMPLETE") {
        if (btnId == "REGISTER") { window.location.href = "/WebAPP/MyCgvV4/favor_credit_cd_regist.aspx"; }
        else if (btnId = "CARDOVERCOUNT") { alert("자주 쓰는 카드는 최대 3개까지 등록하실 수 있습니다. 기존 자주 쓰는 카드를 삭제 후 등록해주세요."); }
    }
    else if (rightId == "FAVOR_CREDIT_CD_REGIST") { if (btnId == "CLOSE") { self.history.back(-1); } }
    else if (rightId == "FAVOR_CREDIT_CD_GUIDE") { if (btnId == "CLOSE") { self.history.back(-1); } }
    else if (rightId == "GIFT_PAYMENT") { if (btnId == "CLOSE") { self.history.back(-1); } }
    else if (rightId == "CGV_CHOICE_SEARCH") { if (btnId == "CLOSE") { self.history.back(-1); } }
    else if (rightId == "RATINGTRAILER") {
        if (btnId == "CLOSE") {
            ClosingWeb("DIARY");
        }
    }
    else if (rightId == "RATINGSTILLCUT") {
        if (btnId == "CLOSE") {
            ClosingWeb("DIARY");
        }
    }
    else if (rightId == "SALECARD") {
        if (btnId == "SEARCH") {
            schBtnClick();
        }
        else if (btnId == "MYSALECARD") {
            fnMoveMyList();
        }
    }
    else if (rightId == "GIFT") {
        if (btnId == "GIFTINFO") {
            giftInfo();
        }
    }
    else if (rightId == "NOTICE_BOX") {
        if (btnId == "NOTICEBOXDELETE") {
            deleteNoticeAll();
        }
    }
    else if (rightId == "COLLAGE") {
        if (btnId == "ARTHOUSEINFO") {
            window.location.href = "/WebApp/CollageV4/cont/movieCollage.aspx"
        }
    }
}


/* 네이티브 호출 */
//좌측
function setLeftFunction(MSG) {
    var LEFTMSG = MSG;
    //닫기
    if (LEFTMSG == "MY") {
        ClosingWeb("MY");
    }
    else if (LEFTMSG == "DIARY")
        ClosingWeb("DIARY");
    else if (LEFTMSG == "MAIN")
        ClosingWeb("MAIN");

}
//우측
function setRightFunction(MSG) {
    var RIGHTMSG = MSG;
    //닫기
    if (RIGHTMSG == "DIARY")
        ClosingWeb("DIARY");
    else if (RIGHTMSG == "MYSTARPOINT")
        ClosingWeb("MYSTARPOINT");
    else if (RIGHTMSG == "MAIN")
        ClosingWeb("MAIN");
}

/* 아이폰 및 안드로이드 인터페이스 */
//닫기
function ClosingWeb(Title) {
    CGVHAAppInterface.ClosingWebSetUp(Title);
}
//버튼명령
function PointSaveWeb() {
    CGVHAAppInterface.PointSaveWebSetUp();
}

/* 해더 해상도별 css 설정 */
function setHeaderCss() {
    var headerLeftBtn;
    var headerRightBtn
    if ($$(".ico_lt") != "" && $$(".ico_lt") != null) {
        //좌측 닫기 버튼
        headerLeftBtn = $Element("headerLeftBtn");
    }
    if ($$(".txt_rt") != "" && $$(".txt_rt") != null) {
        //우측 텍스트 버튼
        headerRightBtn = $Element("headerRightBtn");
    }

    if ($Element("headerTitleArea").text() == "") {
        $Element("headerTitle").css("display", "none");
    }
    else {
        //해더 전체
        var header = $Element("headerTitle");
        header.parent().css("padding-top", "44px");

		if($Element("div_customer_navre")) {
			header.parent().css("padding-top", "90px");
			$Element("div_customer_navre").css("position", "fixed");
			$Element("div_customer_navre").css("width", "100%");
			$Element("div_customer_navre").css("top", "44px");
			$Element("div_customer_navre").css("z-index", "9999");
		}

        if (!IsWebView_Master) {
            header.addClass("cls_headertitle_box");
		    header.css("font-size", "1.40em");
            header.css("height", "31px");
            header.css("padding-top", "13px");
            header.css("position", "fixed");
		    header.css("top", "0px");
		    header.css("width", "100%");
		    
            header.css("font-family", "Helvetica");
            header.css("letter-spacing", "-0.5px");
            if ($$(".ico_lt") != "" && $$(".ico_lt") != null) {
                var src;
                if (headerLeftBtn.attr("src").indexOf("backV4.png") != -1) {
                    src = headerLeftBtn.attr("src").replace("backV4.png", "btn_gnbV4.png");
                    headerLeftBtn.attr("src", src);
                    headerLeftBtn.parent().parent().attr("href", "javascript:siteMap();");
                }
            }
		}
		else {
		    try {
		        if ($Document().clientSize().width >= 540) {
		            if ($$(".ico_lt") != "" && $$(".ico_lt") != null) {
		                var src;
		                if (headerLeftBtn.attr("src").indexOf("backV4.png") != -1) {
		                    src = headerLeftBtn.attr("src").replace("backV4.png", "backV4_1080.png");
		                }
		                else if (headerLeftBtn.attr("src").indexOf("btn_gnbV4.png") != -1) {
		                    src = headerLeftBtn.attr("src").replace("btn_gnbV4.png", "btn_gnbV4_1080.png");
		                }
		                else if (headerLeftBtn.attr("src").indexOf("topBtn_closeV4.png") != -1) {
		                    src = headerLeftBtn.attr("src").replace("topBtn_closeV4.png", "topBtn_closeV4_1080.png");
		                }
		                headerLeftBtn.attr("src", src);
		                headerLeftBtn.parent().css("top", "1px");
		                headerLeftBtn.parent().addClass("ico_lt_1080");
		            }
		            if ($$(".txt_rt") != "" && $$(".txt_rt") != null) {
		                if (headerRightBtn.child().length == 1) {
		                    if (headerRightBtn.child()[0].attr("src").indexOf("topBtn_searchV4.png") != -1) {
		                        src = headerRightBtn.child()[0].attr("src").replace("topBtn_searchV4.png", "topBtn_searchV4_1080.png");
		                        headerRightBtn.child()[0].attr("src", src);

		                        headerRightBtn.css("right", "0px");
		                        headerRightBtn.css("top", "0px");
		                    }
		                    else if (headerRightBtn.child()[0].attr("src").indexOf("topBtn_infoV4.png") != -1) {
		                        src = headerRightBtn.child()[0].attr("src").replace("topBtn_infoV4.png", "topBtn_infoV4_1080.png");
		                        headerRightBtn.child()[0].attr("src", src);

		                        headerRightBtn.css("right", "0px");
		                        headerRightBtn.css("top", "0px");
		                    }
		                    headerRightBtn.addClass("txt_rt_1080");
		                }
		                else {
		                    headerRightBtn.css("right", "19px");
		                    headerRightBtn.css("top", "24px");
		                }
		            }
		            header.css("font-size", "29px");
		            header.css("height", "53px");
		            header.css("padding-top", "23px");
		            header.parent().css("padding-top", "76px");

		            if ($Element("div_customer_navre")) {
		                header.parent().css("padding-top", "122px");
		                $Element("div_customer_navre").css("top", "76px");
		            }
		        }
		        else if ($Document().clientSize().width >= 360) {
		            if ($$(".ico_lt") != "" && $$(".ico_lt") != null) {
		                var src;
		                if (headerLeftBtn.attr("src").indexOf("backV4.png") != -1) {
		                    src = headerLeftBtn.attr("src").replace("backV4.png", "backV4_720.png");
		                }
		                else if (headerLeftBtn.attr("src").indexOf("btn_gnbV4.png") != -1) {
		                    src = headerLeftBtn.attr("src").replace("btn_gnbV4.png", "btn_gnbV4_720.png");
		                }
		                else if (headerLeftBtn.attr("src").indexOf("topBtn_closeV4.png") != -1) {
		                    src = headerLeftBtn.attr("src").replace("topBtn_closeV4.png", "topBtn_closeV4_720.png");
		                }
		                headerLeftBtn.attr("src", src);
		                headerLeftBtn.parent().css("top", "0");
		                headerLeftBtn.parent().addClass("ico_lt_720");
		            }
		            if ($$(".txt_rt") != "" && $$(".txt_rt") != null) {
		                if (headerRightBtn.child().length == 1) {
		                    if (headerRightBtn.child()[0].attr("src").indexOf("topBtn_searchV4.png") != -1) {
		                        src = headerRightBtn.child()[0].attr("src").replace("topBtn_searchV4.png", "topBtn_searchV4_720.png");
		                        headerRightBtn.child()[0].attr("src", src);

		                        headerRightBtn.css("right", "0px");
		                        headerRightBtn.css("top", "0px");
		                    }
		                    else if (headerRightBtn.child()[0].attr("src").indexOf("topBtn_infoV4.png") != -1) {
		                        src = headerRightBtn.child()[0].attr("src").replace("topBtn_infoV4.png", "topBtn_infoV4_720.png");
		                        headerRightBtn.child()[0].attr("src", src);

		                        headerRightBtn.css("right", "0px");
		                        headerRightBtn.css("top", "0px");
		                    }
		                    headerRightBtn.addClass("txt_rt_720");
		                }
		                else {
		                    headerRightBtn.css("right", "12px");
		                    headerRightBtn.css("top", "15px");
		                }
		            }
		            header.css("font-size", "19px");
		            header.css("height", "34px");
		            header.css("padding-top", "16px");
		            header.parent().css("padding-top", "50px");

		            if ($Element("div_customer_navre")) {
		                header.parent().css("padding-top", "96px");
		                $Element("div_customer_navre").css("top", "50px");
		            }
		        }
		        else {
		            if ($$(".txt_rt") != "" && $$(".txt_rt") != null) {
		                if (headerRightBtn.child().length == 1) {
		                    if (headerRightBtn.child()[0].attr("src").indexOf("topBtn_searchV4.png") != -1) {
		                        headerRightBtn.css("right", "0px");
		                        headerRightBtn.css("top", "0px");
		                    }
		                    else if (headerRightBtn.child()[0].attr("src").indexOf("topBtn_infoV4.png") != -1) {
		                        headerRightBtn.css("right", "0px");
		                        headerRightBtn.css("top", "0px");
		                    }
		                }
		            }
		        }
		    } catch (e) { }

		    header.css("position", "fixed");
		    header.css("top", "0");
		    header.css("width", "100%");
		    header.css("z-index", "9999");
		}
    }
}

//jindo.$Fn(function () {
    //setHeaderCss();
//}).attach(document, "domready");


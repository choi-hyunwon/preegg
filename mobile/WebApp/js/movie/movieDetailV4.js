
/*
var oLoading = new jindo.m.Loading("divLoading", {
nHeight: 25,
nWidth: 25,
sDefaultForeground: "gray",
sLoadingText: ""
});
*/
var sAjaxUrl = ""; //ajax 호출을 위한 url
var mkShortUrl = "";

makeShortUrl = function () {
    if (mkShortUrl == "") {
        var u = location.href;
        sAjaxUrl = "/WebApp/MovieV4/cont/ajaxShortUrl.aspx";
        $Ajax(sAjaxUrl, {
            type: 'xhr',
            timeout: '30',
            ontimeout: function () {
                return u;
            },
            onload: function (res) {
                if (res.status() == 200) {
                    mkShortUrl = res.text();
                    return res.text();
                }
                else {
                    return u;
                }
            }
        }).request({ surl: currentUrl });
    }
    else {
        return mkShortUrl;
    }
}

btnFaceBook = function () {
    //chkClickTrace("Plus_영화정보/공유하기/페이스북");
    var url = "http://m.cgv.co.kr/WebApp/MovieV4/movieDetail.aspx?MovieIdx=" + strMovieIdx;

    if (IsWebView == "True") {
        CGVHAAppInterface.SNS("f", encodeURIComponent(url), encodeURIComponent(movieTitle));
    }
    else {
        location.href = "http://m.facebook.com/sharer.php?u=" + encodeURIComponent(url);
    }
}
btnTwitter = function () {
    //chkClickTrace("Plus_영화정보/공유하기/트위터");
    var url = "http://m.cgv.co.kr/WebApp/MovieV4/movieDetail.aspx?MovieIdx=" + strMovieIdx;

    if (IsWebView == "True") {
        CGVHAAppInterface.SNS("t", encodeURIComponent(url), encodeURIComponent(movieTitle));
    }
    else {
        var strDesc = $Element("strTwitter").html();
        location.href = "https://twitter.com/share?text=" + encodeURIComponent(strDesc) + "&url=" + encodeURIComponent(shortUrl);
    }
}
btnKakao = function () {
    //chkClickTrace("Plus_영화정보/공유하기/카카오톡");
    try {
        $Element("kakaoFrame").attr("src", "/WebApp/MovieV4/sns/kakao.aspx?MovieIdx=" + strMovieIdx + "&ShortUrl=" + shortUrl);
    } catch (e) {
        $Element("strKakaoTalk").afterHTML("<iframe id='kakaoFrame' style='display:none;' frameborder='0' width='0' height='0' scrolling='no' marginheight='0' marginwidth='0' src=''></iframe>");
        $Element("kakaoFrame").attr("src", "/WebApp/MovieV4/sns/kakao.aspx?MovieIdx=" + strMovieIdx + "&ShortUrl=" + shortUrl);
    }
}

btnSms = function () {
    var message = $Element("strTwitter").html() + " http://m.cgv.co.kr/WebApp/MovieV4/movieDetail.aspx?MovieIdx=" + strMovieIdx;

    if (IsWebView == "True") {
        //            if (navigator.userAgent.indexOf("Android 4.4") != -1) {
        //                alert("지원하지 않는 단말 입니다.");
        //            }
        //            else {
        CGVHAAppInterface.SendSMS(encodeURIComponent(message));
        //            }
    }
    else {
        //            location.href = "sms://?body=test";
    }
}

chkButtonFB = function () {
    var returnCookies = "";
    var woCookie = $Cookie();
    returnCookies = woCookie.get("facebook");
    if (returnCookies == "" || returnCookies == null) {
        var url = "/WebApp/MovieV4/sns/facebook_login.aspx";
        location.href = url;
    } else {
        location.href = "/WebApp/MovieV4/sns/facebook.aspx?MovieIdx=" + strMovieIdx;
    }
}

chkLogin = function (sUrl) {
    if (confirm("현재 비회원 로그인 상태입니다.\n본 서비스는 CGV회원 로그인 후\n이용할 수 있습니다.\nCGV회원으로 로그인 하시겠습니까?")) {
        //CGVHAAppInterface.Logout();
        window.location.href = sUrl;
    }
}


movieTab = function (no) {
    //oLoading.show("block");
    if (no == 1) {
        jQuery("#li_mi_menu_1").addClass("on");
        jQuery("#li_mi_menu_2").removeClass("on");
        jQuery("#li_mi_menu_3").removeClass("on");
        $Element("miCon2").addClass("on");
        $Element("miCon1").removeClass("on");
        $Element("miCon3").removeClass("on");

        sAjaxUrl = "/WebApp/MovieV4/cont/trailer_still.aspx";
        $Ajax(sAjaxUrl, {
            type: 'xhr',
            onload: function (res) {
                if (res.status() == 200) {
                    var resText = res.text();
                    /*setTimeout(function () {
                    $Element("miCon2").html(resText);
                    //setStillcut();
                    photoSlider();
                    }, 100);*/

                    jQuery('#miCon2').html(resText).promise().done(function () { photoSlider(); });

                    //changeTabHistory(no);
                } else {
                    alert('트레일러/스틸컷을 불러올 수 없습니다.\n잠시 후에 다시 이용해 주세요.');
                }
                //oLoading.hide();
            }
        }).request({ MovieIdx: strMovieIdx });
    } else if (no == 2) {
        jQuery("#li_mi_menu_1").removeClass("on");
        jQuery("#li_mi_menu_2").addClass("on");
        jQuery("#li_mi_menu_3").removeClass("on");
        $Element("miCon1").removeClass("on");
        $Element("miCon3").addClass("on");
        $Element("miCon2").removeClass("on");
        sAjaxUrl = "/WebApp/MovieV4/cont/synop_people.aspx";
        $Ajax(sAjaxUrl, {
            type: 'xhr',
            onload: function (res) {
                if (res.status() == 200) {
                    var resText = res.text();
                    //setTimeout(function () {
                    $Element("miCon3").html(resText);
                    //}, 100);
                    //changeTabHistory(no);
                } else {
                    alert('인물정보를 불러올 수 없습니다.\n잠시 후에 다시 이용해 주세요.');
                }
                //oLoading.hide();
            }
        }).request({ MovieIdx: strMovieIdx });
    } else if (no == 3) {
        jQuery("#li_mi_menu_1").removeClass("on");
        jQuery("#li_mi_menu_2").removeClass("on");
        jQuery("#li_mi_menu_3").addClass("on");
        $Element("miCon2").removeClass("on");
        $Element("miCon3").removeClass("on");
        $Element("miCon1").addClass("on");
        jQuery("#load_3comm").show();
        sAjaxUrl = "./cont/140Comment.aspx";
        $Ajax(sAjaxUrl, {
            type: 'xhr',
            timeout: '30',
            ontimeout: function () {
                alert('140자평을 불러올 수 없습니다.\n잠시 후에 다시 이용해 주세요!');
                //oLoading.hide();
            },
            onload: function (res) {
                if (res.status() == 200) {
                    var resText = res.text();
                    //setTimeout(function () {
                    jQuery("#posComment").html(resText);
                    //$Element("AllCommentList").html(resText);
                    jQuery("#load_3comm").fadeOut();
                    iPage = 2;
                    //commentLoad();
                    //}, 100);
                    //changeTabHistory(no);
                } else {
                    alert('140자평을 불러올 수 없습니다.\n잠시 후에 다시 이용해 주세요.');
                }
                //oLoading.hide();
            }
        }).request({ MovieIdx: strMovieIdx, PageSize: 3, viewChk: viewChk });
    } else {
        //oLoading.hide();
        history.go(-1);
    }
}

chkPoint = function () {
    //var strElem = $Element("chkShowView");
    var strPoint = "2";

    var chkShowView = $Element("chkIsShowView").text();
    var comment = $Element("commentContent").text().trim();

    if (jQuery("#likeornotBox1").hasClass('on')) {
        strPoint = "2";
    }
    else if (jQuery("#likeornotBox2").hasClass('on')) {
        strPoint = "1";
    }

    if (chkShowView == "N") {
        alert('실관람객에 한하여 관람평 작성이 가능합니다.');
        return;
    }

    if (comment == "") {
        alert("내용을 입력하지 않았습니다.");
        //}else if(comment=="최대 140자까지 입력이 가능합니다.모바일에서 작성하신 140자평은 CGV홈페이지에도 함께 등록됩니다."){
        //    $Element("commentContent").text("");
        //    alert("140자평 내용을 입력해 주세요.");
    } else {
        //oLoading.show("block");
        sAjaxUrl = "/WebApp/MovieV4/cont/ajax140CommentAction.aspx";
        var commentAjax = $Ajax(sAjaxUrl, {
            type: 'xhr',
            onload: function (res) {
                if (res.status() == 200) {
                    var resText = res.text().trim();
                    var arrRes = resText.split("^");
                    var resCode = arrRes[0];
                    var resMsg = arrRes[1];
                    var resIndex = arrRes[2];
                    if (resCode == "0000") {
                        if (confirm(resMsg)) {
                            charmLayer(resIndex);   /*정상적인 평점 등록 후 매력 포인트 투표 이동. mwpark_RR2015*/
                            /* 매력 포인트 레이어 팝업 열기 전 글쓰기 폼을 닫아야 하는 경우 아래 주석 해제. mwpark_RR2015
                            jQuery(".score_write").hide();
                            jQuery("#writeForm").fadeOut();
                            */
                        } else {
                            jQuery(".score_write").hide();
                            jQuery("#writeForm").fadeOut();
                            movieTab(3);
                        }
                    } else if (resCode == "0005" || resCode == "0022" || resCode == "0031") {
                        alert(resMsg);
                    } else {
                        alert('일시적인 오류가 발생하였습니다.\n잠시 후에 다시 이용해 주세요.');
                    }
                } else {
                    alert('일시적인 오류가 발생하였습니다.\n잠시 후에 다시 이용해 주세요.');
                }
                //alert(resMsg); 임시 주석 처리. mwpark_RR2015

                /* 평점 등록 이후 매력 투표로 가기 위해 페이지 전환 처리 주석. mwpark_RR2015
                if(isPointFlag=="T"){
                        
                }else{
                alert("평점&140자평이 작성 완료되었습니다.");
                }
                if (jQuery("#posComment").html() == undefined) {
                var goUrl = reUrl;

                goUrl = goUrl.replace("&iTab=1", "");
                goUrl = goUrl.replace("&iTab=2", "");
                goUrl = goUrl.replace("&iTab=", "");
                            
                location.replace(goUrl + "&iTab=3");
                }
                        
                        
                } else if (resCode == "0005") {
                alert(resMsg);
                setChkBox();
                } else {
                //2012.09.05. (문구수정) alert('140자평 등록에 실패했습니다.\n잠시 후에 다시 이용해 주세요.');
                alert('일시적인 오류가 발생하였습니다.\n잠시 후에 다시 이용해 주세요.');
                }
                } else {
                //2012.09.05. (문구수정) alert('140자평 등록에 실패했습니다.\n잠시 후에 다시 이용해 주세요.');
                alert('일시적인 오류가 발생하였습니다.\n잠시 후에 다시 이용해 주세요.');
                }*/
                //oLoading.hide();

            }
        });
        // ajax 페이지 호출
        commentAjax.request({ MovieIdx: strMovieIdx, point: strPoint, commentText: comment, isShowView: chkShowView, chkState: "add" });
    }
}

modPoint = function () {
    var strElem = $Element("chkShowView");  /*기존 실관람공개 체크박스 : del_mwpark_RR2015*/
    var strPoint = $Element("point").text();    /*기존 별점 가져오기 : del_mwpark_RR2015*/
    var chkShowView = $Element("chkIsShowView").text(); /*기존 실관람공개 체크박스 : del_mwpark_RR2015*/

    var comment = $Element("commentContent").text().trim();
    var commentIdx = jQuery("#editCommentIdx").val().trim();
    var eggPoint = jQuery(":radio[name='likeornot1']:checked").val(); /*체크된 에그 포인트 값 : mwpark_RR2015*/

    if (comment == "") {
        alert("내용을 입력하지 않았습니다.");
        return;
    }

    sAjaxUrl = "/WebApp/MovieV4/cont/ajax140CommentAction.aspx";
    var commentAjax = $Ajax(sAjaxUrl, {
        type: 'xhr',
        onload: function (res) {
            if (!(res.status() == 200)) {
                alert('일시적인 오류가 발생하였습니다.\n잠시 후에 다시 이용해 주세요.');
                return;
            }
            var resText = res.text().trim();
            var arrRes = resText.split("^");
            var resCode = arrRes[0];
            var resMsg = arrRes[1];
            if (resCode == "0005" || resCode == "0022" || resCode == "0031") {
                alert(resMsg);
                return;
            } else if (resCode != "0000" && resCode != "0005" && resCode != "0022" && resCode != "0031") {
                alert('일시적인 오류가 발생하였습니다.\n잠시 후에 다시 이용해 주세요.');
                return;
            }

            if (confirm("관람평이 수정되었습니다.\n관람하신 영화의 매력 포인트를\n선택하시겠습니까?")) {
                getMyCharm(commentIdx);
            } else {
                jQuery("#writeForm").fadeOut();
                movieTab(3);
            }
        }
    });
    commentAjax.request({ MovieIdx: strMovieIdx, point: eggPoint, commentText: comment, isShowView: 'Y', chkState: "edt", CommentIdx: commentIdx });

    /* 기존 수정 처리 주석. del_mwpark_RR2015
    if (comment == "") {
    alert("140자평 내용을 입력해 주세요.");
    //}else if(comment=="최대 140자까지 입력이 가능합니다.모바일에서 작성하신 140자평은 CGV홈페이지에도 함께 등록됩니다."){
    //    $Element("commentContent").text("");
    //    alert("140자평 내용을 입력해 주세요.");
    } else {
    //실 관람객 체크 삭제 및 더이상 수정시 실관람객 여부를 체크하지 않아도 되므로 로직 변경. mwpark_RR2015
    if (strElem.hasClass("chk")) {
    if (isMovie == "Y") {
    if (confirm("실관람객 체크 해제 시 실 관람객으로 표시되지 않습니다.\n(관람아이콘 표기 불가)\n\n체크하지 않고 등록하시겠습니까?")) {
    //oLoading.show("block");
    sAjaxUrl = "/WebApp/MovieV4/cont/ajax140CommentAction.aspx";
    var commentAjax = $Ajax(sAjaxUrl, {
    type: 'xhr',
    onload: function (res) {
    if (res.status() == 200) {
    var resText = res.text().trim();
    var arrRes = resText.split("^");
    var resCode = arrRes[0];
    var resMsg = arrRes[1];
    //alert(resCode+"\n\n"+resMsg);
    if (resCode == "0000") {
    //if(isPointFlag=="T"){
    alert(resMsg);
    //}else{
    //    alert("평점&140자평이 작성 완료되었습니다.");
    //}
    jQuery("#writeForm").fadeOut();
    movieTab(3);
    //oLoading.hide();

    } else if (resCode == "0005") {
    alert(resMsg);
    //oLoading.hide();
    } else {
    // 2012.09.05. (문구수정) alert('140자평 등록에 실패했습니다.\n잠시 후에 다시 이용해 주세요.'); 
    alert('일시적인 오류가 발생하였습니다.\n잠시 후에 다시 이용해 주세요.');
    //oLoading.hide();
    }
    } else {
    // 2012.09.05. (문구수정) alert('140자평 등록에 실패했습니다.\n잠시 후에 다시 이용해 주세요.'); 
    alert('일시적인 오류가 발생하였습니다.\n잠시 후에 다시 이용해 주세요.');
    //oLoading.hide();
    }
    //oLoading.hide();
    }
    });
    // ajax 페이지 호출
    commentAjax.request({ MovieIdx: strMovieIdx, point: strPoint, commentText: comment, isShowView: chkShowView , chkState: "edt", CommentIdx: commentIdx });
    }
    } else {
    //oLoading.show("block");
    sAjaxUrl = "/WebApp/MovieV4/cont/ajax140CommentAction.aspx";
    var commentAjax = $Ajax(sAjaxUrl, {
    type: 'xhr',
    onload: function (res) {
    if (res.status() == 200) {
    var resText = res.text().trim();
    var arrRes = resText.split("^");
    var resCode = arrRes[0];
    var resMsg = arrRes[1];
    //alert(resCode+"\n\n"+resMsg);
    if (resCode == "0000") {
    //if(isPointFlag=="T"){
    alert(resMsg);
    //}else{
    //    alert("평점&140자평이 작성 완료되었습니다.");
    //}
    jQuery("#writeForm").fadeOut();
    movieTab(3);
    } else if (resCode == "0005") {
    alert(resMsg);
    setChkBox();
    } else {
    //2012.09.05. (문구수정) alert('140자평 등록에 실패했습니다.\n잠시 후에 다시 이용해 주세요.'); 
    alert('일시적인 오류가 발생하였습니다.\n잠시 후에 다시 이용해 주세요.');
    }
    } else {
    // 2012.09.05. (문구수정) alert('140자평 등록에 실패했습니다.\n잠시 후에 다시 이용해 주세요.');
    alert('일시적인 오류가 발생하였습니다.\n잠시 후에 다시 이용해 주세요.');
    }
    //oLoading.hide();
    }
    });
    // ajax 페이지 호출
    commentAjax.request({ MovieIdx: strMovieIdx, point: strPoint, commentText: comment, isShowView: chkShowView, chkState: "edt", CommentIdx: commentIdx });
    }
    } else {
    //oLoading.show("block");
    sAjaxUrl = "/WebApp/MovieV4/cont/ajax140CommentAction.aspx";
    var commentAjax = $Ajax(sAjaxUrl, {
    type: 'xhr',
    onload: function (res) {
    if (res.status() == 200) {
    var resText = res.text().trim();
    var arrRes = resText.split("^");
    var resCode = arrRes[0];
    var resMsg = arrRes[1];
    //alert(resCode+"\n\n"+resMsg);
    if (resCode == "0000") {
    //if(isPointFlag=="T"){
    alert(resMsg);
    //}else{
    //    alert("평점&140자평이 작성 완료되었습니다.");
    //}
    jQuery("#writeForm").fadeOut();
    movieTab(3);
    } else if (resCode == "0005") {
    alert(resMsg);
    setChkBox();
    } else {
    //2012.09.05. (문구수정) alert('140자평 등록에 실패했습니다.\n잠시 후에 다시 이용해 주세요.');
    alert('일시적인 오류가 발생하였습니다.\n잠시 후에 다시 이용해 주세요.');
    }
    } else {
    //2012.09.05. (문구수정) alert('140자평 등록에 실패했습니다.\n잠시 후에 다시 이용해 주세요.');
    alert('일시적인 오류가 발생하였습니다.\n잠시 후에 다시 이용해 주세요.');
    }
    //oLoading.hide();
    }
    });
    // ajax 페이지 호출
    commentAjax.request({ MovieIdx: strMovieIdx, point: strPoint, commentText: comment, isShowView: chkShowView, chkState: "edt", CommentIdx: commentIdx });
    }
    }*/
}

delPoint = function () {
    //oLoading.show("block");
    var resultCd = isCommentPoint();
    var confirmMsg;

    if (resultCd == "Y") confirmMsg = "관람평을 삭제하실 경우\n지급된 포인트는 차감됩니다.\n삭제하시겠습니까?";
    else if (resultCd == "N") confirmMsg = "작성한 관람평을 삭제하시겠습니까?";
    else {
        alert('140자평 삭제에 실패했습니다.\n잠시 후에 다시 이용해 주세요.');
        //oLoading.hide();
        return;
    }

    if (confirm(confirmMsg)) {
        sAjaxUrl = "/WebApp/MovieV4/cont/ajax140CommentAction.aspx";
        var commentAjax = $Ajax(sAjaxUrl, {
            type: 'xhr',
            onload: function (res) {
                if (res.status() == 200) {
                    var resText = res.text().trim();
                    var arrRes = resText.split("^");
                    var resCode = arrRes[0];
                    var resMsg = arrRes[1];
                    //alert(resCode+"\n\n"+resMsg);
                    if (resCode == "0000" || resCode == "0001") {
                        //if (resultCd == "Y") alert("글 삭제와 포인트 차감이 완료되었습니다.");
                        //else if (resultCd == "N") alert("글 삭제가 완료되었습니다.");
                        alert("삭제가 완료되었습니다.");

                        var goUrl = reUrl;
                        goUrl = goUrl.replace("&iTab=1", "");
                        goUrl = goUrl.replace("&iTab=2", "");
                        goUrl = goUrl.replace("&iTab=", "");
                        location.replace(goUrl + "&iTab=3");
                    } else {
                        alert('140자평 삭제에 실패했습니다.\n잠시 후에 다시 이용해 주세요.');
                        //movieTab(3);
                    }
                } else {
                    alert('140자평 삭제에 실패했습니다.\n잠시 후에 다시 이용해 주세요.');
                }
                //oLoading.hide();
            }
        });
        // ajax 페이지 호출
        commentAjax.request({ MovieIdx: strMovieIdx, chkState: "del" });
    }
    else oLoading.hide();
}

isCommentPoint = function () {
    var result;
    sAjaxUrl = "/WebApp/MovieV4/cont/ajax140CommentAction.aspx";
    var commentAjax = $Ajax(sAjaxUrl, {
        type: 'xhr',
        async: false,
        onload: function (res) {
            if (res.status() == 200) {
                var resText = res.text().trim();
                result = resText;
            }
            else {
                result = "ERROR";
            }
        }
    });
    // ajax 페이지 호출
    commentAjax.request({ MovieIdx: strMovieIdx, chkState: "alertDel" });

    return result;
}

RegAct = function (type, cIdx) {
    var result;
    sAjaxUrl = "/WebApp/MovieV4/cont/ajax140CommentAction.aspx";
    var commentAjax = $Ajax(sAjaxUrl, {
        type: 'xhr',
        async: false,
        onload: function (res) {
            if (res.status() == 200) {
                var resText = res.text().trim();
                result = resText;
                if (type == "spo") {
                    alert("신고가 접수되었습니다.\n내용 확인 후 반영하도록 하겠습니다.");
                    //rep_mn_
                    //spo_mn_
                    //텍스트 변경
                    jQuery("#spo_mn_" + cIdx).html("스포일러 신고 취소");
                    //함수 변경
                    jQuery("#spo_lnk_" + cIdx).attr("onclick", "javascript:goSpoiler('" + cIdx + "', 'Y');");
                    //팝업닫기
                    jQuery("#pop_mark_" + cIdx).fadeOut();

                }
                else if (type == "cspo") {
                    alert("신고가 취소되었습니다.");
                    //텍스트 변경
                    jQuery("#spo_mn_" + cIdx).html("스포일러 신고");
                    //함수 변경
                    jQuery("#spo_lnk_" + cIdx).attr("onclick", "javascript:goSpoiler('" + cIdx + "', 'N');");
                    jQuery("#pop_mark_" + cIdx).fadeOut();
                }
                else if (type == "rep") {
                    alert("신고가 접수되었습니다.\n내용 확인 후 반영하도록 하겠습니다.");
                    //텍스트 변경
                    jQuery("#rep_mn_" + cIdx).html("욕설/비방 신고 취소");
                    //함수 변경
                    jQuery("#rep_lnk_" + cIdx).attr("onclick", "javascript:goReport('" + cIdx + "', 'Y');");
                    jQuery("#pop_mark_" + cIdx).fadeOut();
                }
                else if (type == "crep") {
                    alert("신고가 취소되었습니다.");
                    //텍스트 변경
                    jQuery("#rep_mn_" + cIdx).html("욕설/비방 신고");
                    //함수 변경
                    jQuery("#rep_lnk_" + cIdx).attr("onclick", "javascript:goReport('" + cIdx + "', 'N');");
                    jQuery("#pop_mark_" + cIdx).fadeOut();
                }
                else if (type == "like") {
                    var resultValue = result.split('^');
                    var resultCd = resultValue[0];
                    var resultMsg = resultValue[1];

                    if (resultCd == "0001") {
                        alert(resultMsg);
                        return;
                    }
                    //<div class=""write_day""><span>{9} 작성</span><a href=""javascript:goLike('{10}', '{11}');"" class=""write_like"" id=""like_lnk_{10}""><em id=""like_light_{10}"" class=""choice_{12}"">좋아요</em><span class=""number"" id=""likecnt_{10}"">{13}</span></a></div>
                    //CGV_LIGHT ON
                    jQuery("#like_light_" + cIdx).removeClass("choice_off");
                    jQuery("#like_light_" + cIdx).addClass("choice_on");

                    //LikeCnt ++
                    var tmpI = jQuery("#likecnt_" + cIdx).html();
                    var intVal = parseInt(tmpI);
                    intVal = intVal + 1;
                    jQuery("#likecnt_" + cIdx).html(intVal)
                    //likecnt_

                    //함수 치환
                    jQuery("#like_lnk_" + cIdx).attr("onclick", "javascript:goLike('" + cIdx + "', 'Y');");
                }
                else if (type == "clike") {
                    //CGV_LIGHT OFF
                    jQuery("#like_light_" + cIdx).removeClass("choice_on");
                    jQuery("#like_light_" + cIdx).addClass("choice_off");

                    //LikeCnt --
                    var tmpI = jQuery("#likecnt_" + cIdx).html();
                    var intVal = parseInt(tmpI);
                    intVal = intVal - 1;
                    jQuery("#likecnt_" + cIdx).html(intVal)

                    //함수 치환
                    jQuery("#like_lnk_" + cIdx).attr("onclick", "javascript:goLike('" + cIdx + "', 'N');");
                }
                else {
                    //alert("뭔가 완료;;");
                }

            }
            else {
                result = "ERROR";
            }
        }
    });
    // ajax 페이지 호출
    commentAjax.request({ MovieIdx: strMovieIdx, chkState: type, CommentIdx: cIdx });

    return result;
}
isReviewPoint = function () {
    sAjaxUrl = "/WebApp/Movie/cont/ajaxPointFlg.aspx";
    var reviewPointAjax = $Ajax(sAjaxUrl, {
        type: 'xhr',
        onload: function (res) {
            if (res.status() == 200) {
                isPointFlag = res.text().trim();
                if (isPointFlag == "F") {
                    alert("영화본 다음날 '실관람객'평점을 남기시면\nCJ ONE 50 포인트를 드립니다!\n(단, CJ ONE 회원만 적립 가능)");
                } else if (isPointFlag == "T") {
                    alert("CJ ONE 50포인트 적립대상입니다.\n지금 바로 평점 작성하고\nCJ ONE 50포인트 받으세요!\n(단, CJ ONE 회원만 적립 가능)");
                }
            } else {
                //alert('실패');
            }
        }
    });
    // ajax 페이지 호출
    reviewPointAjax.request({ MovieIdx: strMovieIdx });
}

chkLogin = function (sUrl) {
    if (confirm("현재 비회원 로그인 상태입니다.\n본 서비스는 CGV회원 로그인 후\n이용할 수 있습니다.\nCGV회원으로 로그인 하시겠습니까?")) {
        //CGVHAAppInterface.Logout();
        window.location.href = sUrl;
    }
}

//    chkLogin = function (sUrl) {
//        if (confirm("로그인 페이지로 이동 하시겠습니까?")) {
//            //CGVHAAppInterface.Logout();
//            window.location.href = sUrl;
//        }
//    }

//140자평 글자수 표시
function checkTextSize() {
    var value = $Element("commentContent").text().length;
    var text = $Element("commentContent").text();
    if (value > 140) {
        $Element("commentContent").text(text.substring(0, value - 1));
        value = value - 1;
    }
    $Element("output").text(value);
}

setPointImg = function (point) {
    var pointImg = "";
    var sPoint = 0;

    if (point == 10)
        pointImg += "<span style='width:100%;'>평점 10점중 10점</span>";
    else if (point == 9)
        pointImg += "<span style='width:90%;'>평점 10점중 9점</span>";
    else if (point == 8)
        pointImg += "<span style='width:80%;'>평점 10점중 8점</span>";
    else if (point == 7)
        pointImg += "<span style='width:70%;'>평점 10점중 7점</span>";
    else if (point == 6)
        pointImg += "<span style='width:60%;'>평점 10점중 6점</span>";
    else if (point == 5)
        pointImg += "<span style='width:50%;'>평점 10점중 5점</span>";
    else if (point == 4)
        pointImg += "<span style='width:40%;'>평점 10점중 4점</span>";
    else if (point == 3)
        pointImg += "<span style='width:30%;'>평점 10점중 3점</span>";
    else if (point == 2)
        pointImg += "<span style='width:20%;'>평점 10점중 2점</span>";
    else if (point == 1)
        pointImg += "<span style='width:10%;'>평점 10점중 1점</span>";
    //pointImg += "</div>";
    jQuery("#starPoint2").html(pointImg);
}

setChkBox = function () {
    var chkElm = jQuery("#chkShowView");
    //alert(chkElm.prop("checked"));
    if (chkElm.prop("checked") == true) {
        //실관람객이 아니면 체크 못 함
        if (isWatchMovie == "Y") {
            chkElm.prop("checked", true);
            jQuery("#chkIsShowView").val("Y");
        } else {
            alert("고객님은 해당영화의 실관람객이 아니므로 실관람객 체크가 되지 않습니다.");
            chkElm.prop("checked", false);
        }
    } else {
        chkElm.prop("checked", false);
        jQuery("#chkIsShowView").val("N");
        if (isWatchMovie == "Y") {
            alert("실관람객 체크 해제 시 실 관람객으로 표시되지 않습니다.\n(관람아이콘 표기 불가)");
        }
        else {
            alert("고객님은 해당영화의 실관람객이 아니므로 실관람객 체크가 되지 않습니다.");
        }
    }
}

function writeRating(mIdx, mTitle, isView, reUrl) {
    if (isLogin == "True") {
        CGVHAAppInterface.WriteRating(mIdx, encodeURIComponent(mTitle), isView, encodeURIComponent(reUrl));
    }
    else {
        if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
            window.location.href = "/WebApp/MemberV4/Login.aspx?RedirectURL=" + reUrl;
        }
    }
}
function editRating(mIdx, mTitle, isView, isShowView, Point, Comm, CommIdx, reUrl) {
    if (isLogin == "True") {
        CGVHAAppInterface.EditComment(mIdx, encodeURIComponent(mTitle), isView, isShowView, Point, encodeURIComponent(Comm), CommIdx, encodeURIComponent(reUrl));
        //EditComment: function (movieIdx, movieName, isView, showView, point, comm, idx, nextPage)
    }
    else {
        if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
            window.location.href = "/WebApp/MemberV4/Login.aspx?RedirectURL=" + reUrl;
        }
    }
}

isCommentPoint = function () {
    var result;
    sAjaxUrl = "/WebApp/MovieV4/cont/ajax140CommentAction.aspx";
    var commentAjax = $Ajax(sAjaxUrl, {
        type: 'xhr',
        async: false,
        onload: function (res) {
            if (res.status() == 200) {
                var resText = res.text().trim();
                result = resText;
            }
            else {
                return alert("평점 정보를 불러오는데 실패 했습니다.");
            }
        }
    });
    // ajax 페이지 호출
    commentAjax.request({ MovieIdx: strMovieIdx, chkState: "alertDel" });

    return result;
}

function DelRating(Pid, BtnId, mIdx, mTitle, isView) {
    var delPoint = isCommentPoint();
    var confirmMsg;

    /*신규 삭제 확인 메세지 및 result 메세지 셋팅 추가. mwpark_RR2015*/
    if (delPoint != "" && delPoint != "ERROR") {
        confirmMsg = "관람평을 삭제하실 경우\n지급된 포인트는 차감됩니다.\n삭제하시겠습니까?";
    } else if (delPoint == "ERROR") {
        alert('평점 삭제에 실패했습니다.\n잠시 후에 다시 이용해 주세요.');
        return;
    }else{
        confirmMsg = "작성한 관람평을 삭제하시겠습니까?";
    }
    

    /* 삭제 확인 로직 변경으로 인한 기존 로직 주석처리. mwpark_RR2015
    if (resultCd == "Y") {
        confirmMsg = "작성한 평점을 삭제하시겠습니까? 평점을 삭제하시면 CJ ONE 포인트가 50P 차감됩니다.";
        resultMsg = "글 삭제와 포인트 차감이 완료되었습니다. 새로 작성하시겠습니까?";
    }
    else if (resultCd == "N") {
        confirmMsg = "작성한 평점을 삭제하시겠습니까?";
        resultMsg = "글 삭제가 완료되었습니다. 새로 작성하시겠습니까?";
    }
    else {
        alert('평점 삭제에 실패했습니다.\n잠시 후에 다시 이용해 주세요.');
        //oLoading.hide();
        return;
    }
    */

    if (confirm(confirmMsg)) {
        sAjaxUrl = "/WebApp/MovieV4/cont/ajax140CommentAction.aspx";
        var commentAjax = $Ajax(sAjaxUrl, {
            type: 'xhr',
            onload: function (res) {
                if (res.status() == 200) {
                    var resText = res.text().trim();
                    var arrRes = resText.split("^");
                    var resCode = arrRes[0];
                    var resMsg = arrRes[1];
                    if (resCode == "0000" || resCode == "0001") {
                        movieTab(3);
                        if (confirm("삭제가 완료되었습니다.\n새로 작성하시겠습니까?")) {
                            var reUrlRating = reUrl;
                            if (jQuery("#posComment").html() == undefined) {
                                var goUrl = reUrl;
                                goUrl = goUrl.replace("&iTab=1", "");
                                goUrl = goUrl.replace("&iTab=2", "");
                                goUrl = goUrl.replace("&iTab=", "");
                                location.replace(goUrl + "&iTab=3");
                            }
                            //CGVHAAppInterface.WriteRating(mIdx, encodeURIComponent(mTitle), isView, encodeURIComponent(reUrlRating));
                            goWrite();
                        }
                        else {
                            if (jQuery("#posComment").html() == undefined) {
                                var goUrl = reUrl;
                                goUrl = goUrl.replace("&iTab=1", "");
                                goUrl = goUrl.replace("&iTab=2", "");
                                goUrl = goUrl.replace("&iTab=", "");
                                location.replace(goUrl + "&iTab=3");
                            }
                        }
                        jQuery(".score_write").show();
                    } else {
                        alert('평점 삭제에 실패했습니다.\n잠시 후에 다시 이용해 주세요.');
                        //movieTab(3);
                    }
                } else {
                    alert('평점 삭제에 실패했습니다.\n잠시 후에 다시 이용해 주세요.');
                }
            }
        });
        // ajax 페이지 호출
        commentAjax.request({ MovieIdx: strMovieIdx, chkState: "del" });
    }
}



function RegWish() {
    if (isLogin == "True") {
        if (AppVersion_Master >= 431) {
            fnSendGALog("1", "", "MA_영화정보", "위시리스트", movieTitle);
        }
        else {
            fnSendGALog("1", "", "기능선택", "Click", "위시리스트");
        }
        var WishMovieIdx = strMovieIdx;
        var Type = "00";

        if (WishMovieIdx == "") {
            alert("잘못된 접근입니다.");
            return false;
        }

        //                var oLoading = new jindo.m.Loading(null, {
        //                    nHeight: 50,
        //                    nWidth: 50,
        //                    sDefaultForeground: "gray",
        //                    sLoadingText: ""
        //                });

        oLoading.show();

        var DataUrl = "/WebApp/MovieV4/cont/wish_movie.aspx";
        var DataAjax = $Ajax(DataUrl, {
            type: 'xhr',
            async: false,
            onload: function (res) {
                if (res.status() == 200) {
                    var jsonData = eval("(" + res.text() + ")");
                    var ResultCode = jsonData.StrRESULT_CD;
                    var ResultMessage = jsonData.StrRESULT_MSG;
                    var WishSeq = jsonData.StrWISH_SEQ;


                    if (ResultCode == "00000") {
                        isWishMovie = "Y";
                        wishSeq = WishSeq;

                        if (IsApp == "False") {
                            alert("'위시리스트'에 추가되었습니다.\n(위시리스트는 CGV앱과 홈페이지의 무비로그에서 확인이 가능합니다!)");
                            jQuery("#wishMark").addClass("on");
                        }
                        else {
                            //alert("'위시리스트'에 추가되었습니다.");
                            jQuery("#wishMark").addClass("on");
                            //APP 버전 체크
                            //무비로그 동기화
                            //--
                            if (AppVersion_Master >= 417) {
                                CGVHAAppInterface.MovieLogRefresh(strMovieIdx, "Y", WishSeq);

                                //무비로그 이동 컨펌
                                if (confirm("‘위시리스트’에 등록되었습니다.\n상영예정작일 경우 개봉일 하루 전\n알림메시지가 발송됩니다.\n\n지금 위시리스트로 이동하시겠습니까?")) {
                                    CGVHAAppInterface.MoveWishList();
                                    window.location.reload();
                                }
                            }
                            else {
                                alert("'위시리스트'에 추가되었습니다.\n(위시리스트는 CGV앱과 홈페이지의 무비로그에서 확인이 가능합니다!)");
                            }
                        }
                        //PINK LIGHT

                    }
                    else {
                        alert(ResultMessage);
                    }
                }
                else {
                    alert("일시적인 오류가 발생하였습니다.\n잠시 후에 다시 이용해 주세요.");
                }
                oLoading.hide();
            },
            onerror: function (res) {
                alert("일시적인 오류가 발생하였습니다.\n잠시 후에 다시 이용해 주세요.");
                oLoading.hide();
            }
        }).request({ valWishMovieIdx: WishMovieIdx, valType: Type });
    }
    else {
        if (confirm("CGV회원 로그인 후 사용 가능합니다.\n로그인 하시겠습니까?")) {
            window.location.href = "/WebApp/MemberV4/Login.aspx?RedirectURL=" + encodeURIComponent(reUrl);
        }
    }
}

function DelWish() {

    if (AppVersion_Master >= 431) {
        fnSendGALog("1", "", "MA_영화정보", "위시리스트", movieTitle);
    }
    else {
        fnSendGALog("1", "", "기능선택", "Click", "위시리스트");
    }
    var WishMovieIdx = strMovieIdx;
    var Type = "01";

    if (WishMovieIdx == "") {
        alert("잘못된 접근입니다.");
        return false;
    }

    //            var oLoading = new jindo.m.Loading(null, {
    //                nHeight: 50,
    //                nWidth: 50,
    //                sDefaultForeground: "gray",
    //                sLoadingText: ""
    //            });

    oLoading.show();

    var DataUrl = "/WebApp/MovieV4/cont/wish_movie.aspx";
    var DataAjax = $Ajax(DataUrl, {
        type: 'xhr',
        async: false,
        onload: function (res) {
            if (res.status() == 200) {
                var jsonData = eval("(" + res.text() + ")");
                var ResultCode = jsonData.StrRESULT_CD;
                var ResultMessage = jsonData.StrRESULT_MSG;
                var WishSeq = jsonData.StrWISH_SEQ;

                if (ResultCode == "00000") {
                    isWishMovie = "N";
                    alert("'위시리스트'에서 삭제되었습니다.");
                    jQuery("#wishMark").removeClass("on");

                    CGVHAAppInterface.MovieLogRefresh(strMovieIdx, "N", "");

                    //window.location.reload();
                }
                else {
                    alert(ResultMessage);
                }
            }
            else {
                alert("일시적인 오류가 발생하였습니다.\n잠시 후에 다시 이용해 주세요.");
            }
            oLoading.hide();
        },
        onerror: function (res) {
            alert("일시적인 오류가 발생하였습니다.\n잠시 후에 다시 이용해 주세요.");
            oLoading.hide();
        }
    }).request({ valWishMovieIdx: WishMovieIdx, valType: Type, wishSeq: wishSeq });
}
function getComment(typ) {
    //oLoading.show();
    jQuery("#load_more").hide();
    jQuery("#load_10comm").show();

    //Type 처리, 중복 제거
    if (typeof (typ) == "undefined" || typ == null) { typ = ""; }
    var gdrv_idx = jQuery("#hid_gdrv_idx").val();
    if (typeof (gdrv_idx) == "undefined" || gdrv_idx == null) { gdrv_idx = ""; }

    sAjaxUrl = "./cont/140Comment.aspx";
    $Ajax(sAjaxUrl, {
        type: 'xhr',
        timeout: '30',
        ontimeout: function () {
            alert('140자평을 불러올 수 없습니다.\n잠시 후에 다시 이용해 주세요!');
            //oLoading.hide();
        },
        onload: function (res) {
            if (res.status() == 200) {
                var resText = res.text();
                setTimeout(function () {
                    //alert(iPage);
                    if (iPage == 1) {
                        $Element("AllCommentList").html(resText);
                    }
                    else {
                        $Element("AllCommentList").html($Element("AllCommentList").html() + resText);
                    }
                    iPage = iPage + 1;
                    if (TotalPage + 1 > iPage) {
                        jQuery("#load_more").show();
                    }
                    jQuery("#load_10comm").fadeOut();

                    try {
                        //더보기 없을 시 Ex Handle
                        var h_tmp = parseInt(jQuery("#AllCommentList").height() + 300);
                        if (jQuery('#load_more').css('display') == 'none') { h_tmp = h_tmp + 55; }
                        jQuery("#popPoint").css("height", (h_tmp) + "px");

                        jQuery(".fot").css("display", "none"); /*평점 모두 보기 시에 footer 노출로 인한 강제 노출 삭제 처리. mwpark_RR2015*/
                    } catch (e) { }

                }, 100);
            } else {
                alert('140자평을 불러올 수 없습니다.\n잠시 후에 다시 이용해 주세요.');
            }
            //oLoading.hide();
        }
    }).request({ MovieIdx: strMovieIdx, ord: ordType, iPage: iPage, viewChk: viewChk, type: typ, ex_cidx: gdrv_idx });

}
function checkReserve(webViewFlag, mgCD, movTitle, rateCode, rKind, sm_type) {
    var result;
    if (rKind == "00") {
        //00은 체크하지 않는다.
        if (webViewFlag) {
            CGVHAAppInterface.ReserveFromMovieInfoV4(mgCD, encodeURIComponent(movTitle), rateCode, rKind);
        }
        else {
            //그냥 예약
            //함수 재정의가 필요하다. or window.open
            var smtype = sm_type || "";
            goOutLink("/quickReservation/Default.aspx?MovieIdx=" + strMovieIdx + "&sm_type=" + smtype);
        }
    }
    else {
        sAjaxUrl = "/WebApp/MovieV4/cont/chkReserve.aspx";
        var commentAjax = $Ajax(sAjaxUrl, {
            type: 'xhr',
            async: false,
            onload: function (res) {
                if (res.status() == 200) {
                    var resText = res.text().trim();
                    //alert(resText + rKind);
                    if (resText == "00000") {
                        if (webViewFlag) {
                            CGVHAAppInterface.ReserveFromMovieInfoV4(mgCD, encodeURIComponent(movTitle), rateCode, rKind);
                        }
                        else {
                            //그냥 예약
                            //함수 재정의가 필요하다. or window.open
                            var smtype = sm_type || "";
                            goOutLink("/quickReservation/Default.aspx?MovieIdx=" + strMovieIdx + "&sm_type=" + smtype);
                        }

                    }
                    else if (resText == "30031") {
                        //alert("선택하신 상영타입의 예매 스케쥴은\n모두 종료되었습니다.");
                        if (confirm("선택하신 상영타입의 예매 스케쥴은 현재 없습니다.\n해당 특별관 페이지로 이동하시겠습니까?")) {
                            if (rKind === "08") {
                                location.href = "/WebApp/SpecialV4/Detail.aspx?seq=18";
                            }
                            else if (rKind === "03") {
                                location.href = "/WebApp/SpecialV4/Detail.aspx?seq=2";
                            }
                            else if (rKind === "04") {
                                location.href = "/WebApp/SpecialV4/Detail.aspx?seq=1";
                            }
                        }
                        else
                            return false;
                    }
                    else {
                        alert("선택하신 상영타입의 예매 스케쥴이\n모두 종료되었습니다.");
                    }
                }
                else {
                    result = "ERROR";
                }
            }
        });
        // ajax 페이지 호출
        commentAjax.request({ GroupCd: mgCD, rKind: rKind });
    }
    return result;
}

function goCommentOrder(ord) {
    if (ord == "0") {
        jQuery("#mark1").addClass("checked");
        jQuery("#mark2").removeClass("checked");
    }
    else {
        jQuery("#mark1").removeClass("checked");
        jQuery("#mark2").addClass("checked");
    }
    ordType = ord;
    iPage = 1;
    getComment("ALL");
}
function setStillcut() {
    jQuery('.owl-carousel').owlCarousel({
        items: 1,
        lazyLoad: true,
        loop: true,
        nav: false,
        dots: false
    });
}

/*매력 포인트 투표. : mwpark_RR2015*/
function addCharm(param) {
    console.log(param);
    sAjaxUrl = "/WebApp/MovieV4/cont/ajax140CommentAction.aspx";
    var charmAjax = $Ajax(sAjaxUrl, {
        type: 'xhr',
        onload: function (res) {
            if (res.status() == 200) {
                var resText = res.text().trim();
                var arrRes = resText.split("^");
                var resCode = arrRes[0];
                var resMsg = arrRes[1];
                console.log(resCode);
                if (resCode == "0000") {
                    alert(resMsg);
                    if (jQuery("#posComment").html() == undefined) {
                        var goUrl = reUrl;
                        goUrl = goUrl.replace("&iTab=1", "");
                        goUrl = goUrl.replace("&iTab=2", "");
                        goUrl = goUrl.replace("&iTab=3", "");
                        location.replace(goUrl + "&iTab=3");
                    }
                    jQuery("#writeForm").fadeOut();
                    jQuery("#charmWriteForm").fadeOut();
                    jQuery(".score_write").hide();
                    movieTab(3);
                } else if (resCode == "0005") {
                    alert(resMsg);
                }
                else {
                }
            } else {
                alert("일시적인 오류가 발생하였습니다.\n잠시 후에 다시 이용해 주세요.");
            }
        }
    });
    charmAjax.request({ commentIdx: param.commentIdx, movieIdx: param.movieIdx, acting: param.acting, story: param.story, visual: param.visual, ost: param.ost, effect: param.effect, chkState: "updateCharm" });
}

/*해당영화에 자신의 매력 포인트 정보를 가져오기 . mwpark_RR2015*/
function getMyCharm(commentIdx) {
    //console.log("getMyCharm....");
    //console.log(commentIdx);
    sAjaxUrl = "/WebApp/MovieV4/cont/ajax140CommentAction.aspx";
    var charmAjax = $Ajax(sAjaxUrl, {
        type: 'xhr',
        onload: function (res) {
            if (!res.status() == 200) {
                alert("매력 포인트를 불러오는데 실패하였습니다. 잠시후 재시도 바랍니다.");
                return;
            }
            if (res.text().trim() == "ERROR") {
                alert("매력 포인트를 불러오는데 실패하였습니다. 잠시후 재시도 바랍니다.");
                return;
            }
            var resText = res.text().trim();

            if (resText == "") {
                charmLayer(commentIdx);
                return;
            }

            /* charmLayer에서 .charm_list li의 초기화 하도록 변경. 
            * 매력 포인트 체크 표시를 위해 jQuery("#charm1-1").prop("checked", true); → jQuery("#charm1-1").click(); 으로 변경   2016.01.04 yjhan*/

            var charmObj = eval("(" + resText + ")");

            charmLayer(charmObj.commentIdx);

            if (charmObj.acting == "Y") {
                jQuery("#charm1-1").click();
            }
            if (charmObj.story == "Y") {
                jQuery("#charm1-2").click();
            }
            if (charmObj.visual == "Y") {
                jQuery("#charm1-3").click();
            }
            if (charmObj.ost == "Y") {
                jQuery("#charm1-4").click();
            }
            if (charmObj.effect == "Y") {
                jQuery("#charm1-5").click();
            }
        }
    });
    charmAjax.request({ commentIdx: commentIdx, chkState: "getCharm" });
}



var naviAgent = navigator.userAgent;

// 글자수 체크
textCounter = function (field, maxlimit, limitText) {
    var nCnt;
    var sLimitText = document.getElementById(limitText);
    nCnt = getStrLength(field.value)
    sLimitText.innerHTML = nCnt + "/" + maxlimit + "자";
    if (nCnt > maxlimit) {
        //alert('제한된 글자수 ' + (maxlimit / 2) + '자를 초과하였습니다.');
        field.value = assert_msglen(field.value, maxlimit);
        sLimitText.innerHTML = maxlimit + "/" + maxlimit + "자";
        field.focus();
    }
    else {
        //document.all.textlimit1.innerText = nCnt
    }
}

//글자단위 길이
getStrLength = function (str) {
    return str.length;
}

//글자단위로 잘라내기
assert_msglen = function (message, maximum) {
    var inc = 0;
    var nbytes = 0;
    var msg = "";
    var msglen = message.length;

    for (i = 0; i < msglen; i++) {
        var ch = message.charAt(i);
        inc = 1;
        if ((nbytes + inc) > maximum) {
            break;
        }
        nbytes += inc;
        msg += ch;
    }
    return msg;
}

//=============================================================================================
//트레일러 플레이
sVdoPlay = function (mIdx, gIdx, mUrl) {
    saveItems(mIdx, gIdx);
    if (IsWebView_Master) {
        if (IsWebViewIPhone_Master) {
            //CGVHAAppInterface.OpenMoviePlayer(encodeURIComponent(mUrl));
cgv.common.Util.goOutLink(mUrl, '0');
        }
        else {
            if (AppVersion_Master >= 402) {
                CGVHAAppInterface.OpenMoviePlayer(encodeURIComponent(mUrl));
            }
            else {
                location.href = mUrl;
            }
        }
    } else {

        if (naviAgent.indexOf("iPhone") > 0) {
            var iver = fniOSversion();
            if (iver[0] > 6) { fnVodPlay(mUrl, "MOVIEDETAIL"); }
            else { location.href = mUrl; }
        }
        else {
            location.href = mUrl;
        }
    }
}

sMyVdoPlay = function (mIdx, gIdx, mUrl) {
    if (IsWebView_Master) {
        if (IsWebViewIPhone_Master) {
            CGVHAAppInterface.OpenMoviePlayer(encodeURIComponent(mUrl));
        }
        else {
            if (AppVersion_Master >= 402) {
                CGVHAAppInterface.OpenMoviePlayer(encodeURIComponent(mUrl));
            }
            else {
                location.href = mUrl;
            }
        }
    } else {
        if (naviAgent.indexOf("iPhone") > 0) {
            var iver = fniOSversion();
            if (iver[0] > 6) { fnVodPlay(mUrl, "MOVIEDETAIL"); }
            else { location.href = mUrl; }
        }
        else {
            location.href = mUrl;
        }
    }
}

//현재 년월일시분
function getTime() {
    var today = new Date();
    var yy = "";   //년
    var mm = "";  //월
    var dd = "";  //일
    var hr = "";  //시
    var min = ""  //분

    yy = today.getFullYear();

    if (today.getMonth() + 1 < 10) {  //월
        mm = "0" + (today.getMonth() + 1);
    } else {
        mm = today.getMonth() + 1;
    }

    if (today.getDate() < 10) {  //일
        dd = "0" + today.getDate();
    } else {
        dd = today.getDate();
    }

    if (today.getHours() < 10) {   //시
        hr = "0" + today.getHours();
    } else {
        hr = today.getHours();
    }

    if (today.getMinutes() < 10) {   //분
        min = "0" + today.getMinutes();
    } else {
        min = today.getMinutes();
    }

    var ontime = yy + "." + mm + "." + dd + "  " + hr + ":" + min;

    return ontime;
}

//내가본트레일러 저장
//localStorage(HTML5)
var items = [];
//if (window.localStorage    == undefined) {
//    alert("HTML5를 지원하지 않는 단말입니다."); return;
//}
// 저장된 리스트
var list = localStorage.getItem("trailerlist");
if (list == null) {
    list = "";
} else {
    items = list.split("\n");
}

showItems = function () {
    for (var i in items) {
        var data = items[i].split("\\"); // 탭 구분 문자열을 분리
        var groupTitle = data[0];
        var movieIdx = data[1];
        var galleryIdx = data[2];
        //alert(groupTitle + "/" + movieIdx + "/" + galleryIdx);
    }
}

saveItems = function (mIdx, gIdx) {
    //mIdx=영화키, gIdx=영상키
    var item = gIdx + "\\" + getTime();
    var chkData = gIdx;
    if (items.length > 20) {
        items.reverse();
        items.pop();
        items.reverse();
    }
    if (items.indexOf(chkData) == -1) {
        items.push(item);
        var list = items.join("\n");
        try {
            localStorage.removeItem("trailerlist");
            localStorage.setItem("trailerlist", list);
        } catch (err) {
            //alert("저장 실패");
        }
    }
}

//localStorage.removeItem("trailerlist");



//검색버튼 처리
schBtnClick = function () {
    var schBtnSrc = $Element("schBtn").attr("src");
    if ($Element("divSearch").css("display") == "block") {
        $Element("divSearch").hide();
        $Element("schBtn").attr("src", schBtnSrc.replace("_on.png", ".png"));
    } else {
        $Element("divSearch").show("block");
        if (schBtnSrc.indexOf("_on.png") == -1) {
            $Element("schBtn").attr("src", schBtnSrc.replace(".png", "_on.png"));
        }
        close_sitemap();
    }
}

close_search = function () {
    try {
        var schBtnSrc = $Element("schBtn").attr("src");
        if ($Element("divSearch").css("display") == "block") {
            $Element("divSearch").hide();
            $Element("schBtn").attr("src", schBtnSrc.replace("_on.png", ".png"));
        }
    } catch (e) {
    }
}

//트레일러 검색
trailerSch = function () {
    //schKey = document.getElementById("schKey").value;
    schKey = $Element("schKey").text();
    schKeyLen = schKey.length;
    if (schKey != "" && schKey != "영화명, 배우명, 감독명을 입력하세요.") {
        if (schKeyLen == 1) {
            alert("검색어는 2글자 이상 입력해 주세요.");
        } else {
            location.href = "trailerSearch.aspx?schKey=" + escape(schKey);
        }
    } else {
        alert("검색어를 입력해 주세요.");
        //$Element("schKey").text("");
        document.getElementById("schKey").focus();
    }
}

schKeyChk = function () {
    schKey = $Element("schKey").text();
    if (schKey == "영화명, 배우명, 감독명을 입력하세요.") {
        $Element("schKey").text("");
    }
}

schKeyEvent = function () {
    var woEvent = $Event(event);
    var oKey = woEvent.key();
    if (oKey.keyCode == 13) {
        trailerSch();
    }
}
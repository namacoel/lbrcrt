/**
 * source		: cmmAjaxCall.js
 * description	: AJAX를 이용하여 Common CRUD(DB 공통처리)를 호출하기 위한 js
 * ****************************************
 * date			author			description
 * ****************************************
 * 2016.03.07	김상우			최초 작성
 * 2016.08.16	김상우			crudAction에 return을 주어 select나 insert시 예외처리가 가능하도록 수정
 * ****************************************
 */
/** ACTION URL 정의 */
var CMM_ACTION = context_path+"/cmmCrudAction";

/**
 * AJAX를 이용하여 CRUD 서비스를 호출한다.
 * @param pUrl - URL 주소
 * @param pPostData - 파라미터
 * @param pAsync - 비동기 여부
 * @param pFnCallback - 콜백함수
 * @param pBlock - 로딩바 여부
 * @param pElementId - 
 * @returns CRUD마다 다름
 */
function __serviceCall(pUrl, pPostData, pAsync, pFnCallback, pBlock, pElementId) {
	var DB_CRUD = pPostData.get("DB_CRUD");
	
	var POST_DATA = pPostData.toJSONString();
	
	var jsonData = null;
	var type = "";
	var url = pUrl;
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	var rtnVal = null;

//	if ($("div#loader").length>0) $("#loader").show(); // 로더가 존재하는 경우 실행
	switch (DB_CRUD) {
	case "R":
		type = "POST";
		url += "/lists";
		break;
	case "C":
		type = "POST";
		break;
	case "U":
		type = "PUT";
		break;
	case "D":
		type = "DELETE";
		break;
	default:
		return alert("qooServiceCall.파라미터를 확인하세요.");
	}
	$.ajax({
		  type:type
		, url:url
		, headers: {
			"Content-Type":"application/json"
			, "X-HTTP-Method-Override" : "POST"
		}
		, encoding:"UTF-8"
		, jsonp: false // json 값에 물음표 2개가 들어간경우 jQuery 어쩌구로 치환되서 전달되는 문제가 있어서 jsonp 옵션을 추가하고 false로 설정하였다.
		, data: POST_DATA
		, beforeSend: function(xhr) {
			if(pBlock=="BLOCK") { __loadingBar.show(); };
//			console.log(xhr.setRequestHeader(header, token));
//			console.log("header : "+ header + "\ntoken: " +  token);
			xhr.setRequestHeader(header, token);
		}
		, dataType:"json"
		, async: pAsync != true ? false : pAsync 
		, error:function(XMLHttpRequest, textStatus, errorThrown){
//			if ($("div#loader").length>0 ) $("#loader").hide(); // 로더 닫기
			if (XMLHttpRequest.status == "400") {
				alert("전송된 Request에 문제가 있가 있습니다.(code:" + XMLHttpRequest.readyState + ":" + XMLHttpRequest.status+")");
			} else if (XMLHttpRequest.status == "500"){
				alert("서버 처리시 문제가 발생하 문제가 있습니다.(code:" + XMLHttpRequest.readyState + ":" + XMLHttpRequest.status+")");
			} else if (XMLHttpRequest.status == "403"){
				alert("접근이 거부되었습니다.(code:" + XMLHttpRequest.readyState + ":" + XMLHttpRequest.status+")");
			} else {
				alert("AJAX return is...\n" + textStatus + "(" + XMLHttpRequest.status + ")\n" + errorThrown + "\n" + XMLHttpRequest.getAllResponseHeaders());
			}
//			jsonData = null;
			if(pBlock=="BLOCK") { __loadingBar.hide(); };
		}
		, success:function(result){
			jsonData = result;
			
//			if ($("div#loader").length > 0 ) $("#loader").hide(); // 로더 닫기
			if(DB_CRUD == "R") {
				rtnVal = jsonData.length;
//				console.log(jsonData.length +  "건 조회완료..");
			} else if(DB_CRUD == "C") {
				rtnVal = jsonData.cnt;
//				console.log(rtnVal + "건 등록완료..");
				alert(rtnVal + "건이 등록되었습니다.");
				if(jsonData.seq != null) console.log("시퀀스 " + jsonData.seq);
			} else if(DB_CRUD == "U") {
				rtnVal = jsonData.cnt;
//				console.log(rtnVal + "건 수정완료..");
				alert(rtnVal + "건이 수정되었습니다.");
			} else if(DB_CRUD == "D") {
				rtnVal = jsonData.cnt;
				alert(rtnVal + "건이 삭제되었습니다.");
			} else {
				console.log(jsonData + "건 처리완료..");
			}
			if((typeof(pFnCallback)).toUpperCase() == "FUNCTION") { pFnCallback(jsonData, pElementId); };
			if(pBlock=="BLOCK") { __loadingBar.hide(); };
		}
	});
	// 중복체크를 위해서 select의 조회 건수를 rtnVal로 return한다.
//	console.log("rtnVal>> " + rtnVal);
	return rtnVal;
}

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
/**
 * AJAX를 이용하여 CRUD 서비스를 호출한다.
 * @param pAction DB Transaction 종류
 * @param pPostData Parameters 
 * @param pFnCallback 
 * @param pElementId
 * @param pSync 동기여부(not으로 싱크여부로 표현true:동기, false:비동기)
 * @returns
 */
function crudAction(pAction, pPostData, pFnCallback, pElementId, pSync) {
	var jsonData;
	var type;
	var url = "/cmmCrudAction";
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	var rtn = null;

	if ($("div#loader").length>0) $("#loader").show(); // 로더가 존재하는 경우 실행
	switch (pAction) {
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
		return alert("Check your parameter.");
	}
	$.ajax({
		  type:type
		, url:url
		, headers: {
			"Content-Type":"application/json"
			, "X-HTTP-Method-Override" : "POST"
		}
		, encoding:'UTF-8'
		, data:pPostData
		, beforeSend: function(xhr) {
//			console.log(xhr.setRequestHeader(header, token));
//			console.log("header : "+ header + "\ntoken: " +  token);
			xhr.setRequestHeader(header, token);
		}
		, dataType:'json'
		, async:!pSync
		, error:function(XMLHttpRequest, textStatus, errorThrown){
			if ($("div#loader").length>0 ) $("#loader").hide(); // 로더 닫기
			if (XMLHttpRequest.status == "400") {
				alert("전송된 Request에 문제가 있가 있습니다.(code:" + XMLHttpRequest.readyState + ":" + XMLHttpRequest.status+")");
			} else if (XMLHttpRequest.status == "500"){
				alert("서버 처리시 문제가 발생하 문제가 있습니다.(code:" + XMLHttpRequest.readyState + ":" + XMLHttpRequest.status+")");
			} else if (XMLHttpRequest.status == "403"){
				alert("접근이 거부되었습니다.(code:" + XMLHttpRequest.readyState + ":" + XMLHttpRequest.status+")");
			} else {
				alert("AJAX return is...\n" + textStatus + "(" + XMLHttpRequest.status + ")\n" + errorThrown + "\n" + XMLHttpRequest.getAllResponseHeaders());
			}
			jsonData = null;
		}
		, success:function(result){
			jsonData = result;
			
			if ($("div#loader").length>0 ) $("#loader").hide(); // 로더 닫기
			if(pAction == "R") {
				rtn = jsonData.length;
				console.log(jsonData.length +  "건 조회완료..");
			} else if(pAction == "C") {
				alert(jsonData.cnt + "건이 등록되었습니다.");
				rtn = jsonData.cnt;
				console.log(jsonData.cnt + "건 등록완료..");
				if(jsonData.seq != null) console.log("시퀀스 " + jsonData.seq);
			} else if(pAction == "U") {
				alert(jsonData + "건이 수정되었습니다..");
				rtn = jsonData;
				console.log(jsonData + "건 수정완료..");
			} else {
				console.log(jsonData + "건 처리완료..");
			}
			
			pFnCallback(jsonData, pElementId);
		}
	});
	// 중복체크를 위해서 select의 조회 건수를 rtn로 return한다.
	return rtn;
}

/**
 * var getParam = new GetParamsObject(); 의 형태로 객체 선언
 * addParam : 파라미터로 보낼 문자열을 배열 형태로 생성
 * toString : 받은 파라미터를 문자열로 변환 (key1=value1&key2=value2...)
 * 
 * @returns 
 */
function GetParamsObject() {
	var idx=0;
	var params = new Array();
	return {
		 addParam:function(key, value) {
		
		 params[idx++]= new Array(key, encodeURIComponent(value));
		},
		toString:function() {
			var len = params.length;
			var rtn = "";
			
			for(i=0;i<len;i++){
				rtn += params[i][0] + "=" + params[i][1] + (i==(len-1) ? "":"&");
			}
			return rtn;
		}
	};
};

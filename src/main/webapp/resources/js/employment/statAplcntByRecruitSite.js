/**************************************************
 * source		: statAplcntByRecruitSite
 * description	: 통계.채용경로별 지원자 목록
 * ************************************************
 * date			author			description
 * ************************************************
 * 2016.07.03	김상우			최초 작성
 * ************************************************
 **************************************************/

/**************************************************
 * 전역 변수 선언
 **************************************************/

/**************************************************
 * onLoad 이벤트 설정
 **************************************************/
$(document).ready(function() {
	
	cmmSetDropDownBizarea("srchCdBizarea", "NM|CODE", "SHORTNM", true);
	cmmSetDropDownDept("srchCdDept", "NM|CODE", true);
	
	setElementProperty();
	
	$("#srchCdBizarea").trigger("change");
	$("#btnSearchReset").trigger("click");
	//$("#btnSearch").trigger("click");
});
/**************************************************
 * 이벤트 핸들러
 **************************************************/
//사업장 change 이벤트
$(document).on("change", "#srchCdBizarea", function() {
	var value = $(this).val();
	var elementId = "#srchCdDept";
	
	$(elementId).val("");
	$(elementId+" option").filter("[value!='']").hide();
	if(!value) return;
	$(elementId+" option").filter("[data-cdbizarea="+ value + "]").show();
});
//조회조건 초기화 버튼
$(document).on("click", "#btnSearchReset", function() {
	$(".table-search [id^=srch]").val("");
	$("#srchJobDayS,#srchJobDayE,#srchEduSdate").trigger("change");
//	$("#srchJobDayS").val(cmmToDateFormat(cmmGetDate("").left(6),"-"));
//	$("#srchJobDayE").val(cmmToDateFormat(cmmGetDate("").left(6),"-"));
});
//조회 버튼
$(document).on("click", "#btnSearch", function() {
	var aElementId = ["srchJobDayS","srchJobDayE","srchEduSdate","srchAplcntClass"];
	var srchJobDayS = cmmGetNum($("#srchJobDayS").val());
	var srchJobDayE = cmmGetNum($("#srchJobDayE").val());
	
	if(!cmmCheckValidation(aElementId)) return;
	if(srchJobDayS > srchJobDayE) return alert(cmmGetAlertMsg("invalidRange"));
	if(cmmDateInterval(srchJobDayS, srchJobDayE, "MONTH") > 5) return alert(cmmGetAlertMsg("overRange6"));
	
	selectStatAplcntByRecruitSite();
});
//엑셀 추출 버튼
$(document).on("click", "#btnExport", function(e) {
	if(!confirm(cmmGetAlertMsg("exportExcel"))) return;
	cmmExportExcel("채용경로별 지원자 목록", "tblStatAplcntByRecruitSite", e);
});

//교육참석여부 값이 O 인 경우에 교육일을 필수 값으로 변경하기.2016.09.30.namacoel
$(document).on("change", "#srchJobDayS, #srchJobDayE", function() {
	var condition = isNull($("#srchJobDayS").val()) && isNull($("#srchJobDayE").val());

	if(condition) {
		$("#srchEduSdate").prop("required", true);
	} else {
		$("#srchEduSdate").prop("required", false);
	}
//	$("#srchEduSdate").val("");
});
$(document).on("change", "#srchEduSdate", function() {
	var condition = isNull($("#srchEduSdate").val());

	if(condition) {
		$("#srchJobDayS, #srchJobDayE").prop("required", true);
	} else {
		$("#srchJobDayS, #srchJobDayE").prop("required", false);
	}
//	$("#srchEduSdate").val("");
});

/**************************************************
 * 기타 함수
 **************************************************/
/** 엘리먼트 속성(유효성) 세팅 */
function setElementProperty() {
	$("#srchJobDayS").prop("required", true);
	$("#srchJobDayE").prop("required", true);
	$("#srchEduSdate").prop("required", true);
	$("#srchAplcntClass").prop("title", "숫자와 콤마(,)만 입력 가능합니다.");
}

/**************************************************
 * DB 트랜잭션
 **************************************************/

/** 채용경로별 지원자 목록 */
function selectStatAplcntByRecruitSite() {
	var mapList = new Array;
	var srchJobDayS = cmmGetNum($("#srchJobDayS").val());
	var srchJobDayE = cmmGetNum($("#srchJobDayE").val());
	var srchEduSdate = cmmGetNum($("#srchEduSdate").val());
	var srchCdBizarea = $("#srchCdBizarea").val();
	var srchCdDept = $("#srchCdDept").val();
	var srchAplcntClass = $("#srchAplcntClass").val();
	/* 모든 공백 제거 */
	srchAplcntClass = srchAplcntClass.replace(/(\s*)/g, "");
	var temp = srchAplcntClass.split(",");
	if(!isNull(temp)) {
		for(var i in temp) {
			var getData = new nMap();
			if(!isNull(temp[i])) {
				getData.put("aplcntClass", temp[i]);
				mapList.push(getData.map);
			}
		}
	} else {
		mapList = null;
	}

	var getParam = new nMap();
	
	var DB_CRUD = "R";
	getParam.put("DB_MAPPER", "employmentStatMapper");
	getParam.put("DB_REQID", "selectStatAplcntByRecruitSite");

	getParam.put("srchJobDayS", srchJobDayS);
	getParam.put("srchJobDayE", srchJobDayE);
	getParam.put("srchEduSdate", srchEduSdate);
	getParam.put("srchCdBizarea", srchCdBizarea);
	getParam.put("srchCdDept", srchCdDept);
	getParam.put("mapList", mapList);
	
	var postData = getParam.toJSONString();
	
	var cbf = function(rs, elementId) {
		var colWidth = ["20","","", "90", "90", "90", "90", "90", "90", "90","90", "90","90","90"];
		var header = ["","사업장","부서","기수","채용경로1","채용경로2","추천인","사번","이름","생년월일","교육일","입사일","퇴사일","기수교육일"];
		var thead = document.createElement("thead");
		var tbody = document.createElement("tbody");
		var theadtr = document.createElement("tr");
		
		var node = document.getElementById(elementId);
		
		if(!node) return;
		while(node.hasChildNodes()) {
			node.removeChild(node.lastChild);
		}
		
		$("#totalCount").html(" ("+rs.length+"건)");
		
		for(var i=0 in header) {
			var th = document.createElement("th");
			th.innerHTML = header[i];
			th.setAttribute("style", "width: " + colWidth[i] + "px;");
			
			theadtr.appendChild(th);
		}
		thead.appendChild(theadtr);
		node.appendChild(thead);
		
		if(rs.length>0) {
			for(var i in rs) {
				var tbodyTr = document.createElement("tr");
				for(var j in header) {
					var td = document.createElement("td");
					tbodyTr.appendChild(td);
				}
				tbodyTr.childNodes.item(0).appendChild(document.createTextNode(""));
				tbodyTr.childNodes.item(1).appendChild(document.createTextNode(rs[i].aplcntBizarea));
				tbodyTr.childNodes.item(2).appendChild(document.createTextNode(rs[i].aplcntDept));
				tbodyTr.childNodes.item(3).appendChild(document.createTextNode(rs[i].aplcntClass));
				tbodyTr.childNodes.item(4).appendChild(document.createTextNode(rs[i].recruitSite1));
				tbodyTr.childNodes.item(5).appendChild(document.createTextNode(rs[i].recruitSite2));
				tbodyTr.childNodes.item(6).appendChild(document.createTextNode(rs[i].recommender));
				tbodyTr.childNodes.item(7).appendChild(document.createTextNode(rs[i].emplyNum));
				tbodyTr.childNodes.item(8).appendChild(document.createTextNode(rs[i].aplcntNm));
				tbodyTr.childNodes.item(9).appendChild(document.createTextNode(cmmToDateFormat(rs[i].birthday)));
				tbodyTr.childNodes.item(10).appendChild(document.createTextNode(cmmToDateFormat(rs[i].eduDate)));
				tbodyTr.childNodes.item(11).appendChild(document.createTextNode(cmmToDateFormat(rs[i].jobDay)));
				tbodyTr.childNodes.item(12).appendChild(document.createTextNode(cmmToDateFormat(rs[i].quitDay)));
				tbodyTr.childNodes.item(13).appendChild(document.createTextNode(cmmToDateFormat(rs[i].eduSdate)));
				
				tbody.appendChild(tbodyTr);
			}
			node.appendChild(tbody);
		}
		cmmDataTable(elementId, true, "asc", false, "570px", true, true);
	};
	crudAction(DB_CRUD, postData, cbf, "tblStatAplcntByRecruitSite");
}
/**************************************************
 * source		: employeeStatusToPopup.js
 * description	: 통계.지원자 현황
 * ************************************************
 * date			author			description
 * ************************************************
 * 2016.12.05	김상우			최초 작성
 * ************************************************
 * 메모
 *  
 **************************************************/

/**************************************************
 * Global Variable
 **************************************************/
var gCRUD = null;
/**************************************************
 * onLoad Event
 **************************************************/
$(document).ready(function() {
	
	setElementProperty();
	
	cmmSetDropDownBizarea("srchCdBizarea", "NM|CODE", "SHORTNM", true);
	$("#cdBizarea").html($("#srchCdBizarea option").clone());
	// 날짜 세팅시 시작년도를 변경하면 데이터 업데이트시 값선택이 되지 않아 DB에 값이 지워질 수 있으므로 변경하지 않도록 한다.
	setDropDownDate("srchDate", "", "", 2016, 1); // 중요 : 시작년도를 2016 보다 크게 수정하거나 1보다 적은 수로 적용하면 안됨!!
	
	$("#srchDate").val(cmmGetNum(opener.$("#srchDate").val()).left(4));
//	$("#inputMonth").val(cmmToDateFormat(cmmGetDate("").left(6),"-"));
	$("#srchCdBizarea").val(opener.$("#srchCdBizarea option:selected").val());
	
	$("#srchCdBizarea").trigger("change");
});

/**************************************************
 * Event Handler
 **************************************************/
// 사업장, 조회월 change 이벤트
$(document).on("change", "#srchCdBizarea, #srchDate, #cdBizarea", function() {
	var nodeId = $(this).attr("id");
//	console.log("nodeId : "+ nodeId);
	
	if(nodeId == "srchCdBizarea") {
		$("#cdBizarea").val($("#srchCdBizarea").val());
	} else if (nodeId == "cdBizarea") {
		$("#srchCdBizarea").val($("#cdBizarea").val());
	}
	
	// 유효성 검사
	var aElementId = ["srchCdBizarea", "srchDate"];
	if(!cmmCheckValidation(aElementId)) return;
	
	gCRUD = "R";
	setElementEnabled();
	
	selectEmployeeStatistics();
});
$(document).on("click", "#tblEmployeeStatistics tr", function() {
	gCRUD = "U";
	resetElement();
	setElementEnabled(gCRUD);
	
	var cdCompany = $(this).attr("data-cdcompany");
	var cdBizarea = $(this).attr("data-cdbizarea");
	var inputMonth =  $(this).attr("data-inputmonth");
	
	selectOneEmployeeStatistics(cdCompany, cdBizarea, inputMonth);
});
//신규 버튼 클릭
$(document).on("click", "#btnNew", function() {
	gCRUD = "C";
	resetElement();
	setElementEnabled(gCRUD);
});

// 저장 버튼
$(document).on("click", "#btnSave", function() {
	// 유효성 검사
	var aElementId = ["cdBizarea", "inputMonth","monthToCnt","beginEmployeeCnt","beginTraineeCnt"];
	if(!cmmCheckValidation(aElementId)) return;
	
	switch (gCRUD) {
	case "C":
		if(dupCheckEmployeeStatistics()>0) {
			alert(cmmGetAlertMsg("dupCheck"));
			return;
		}
		if(!confirm(cmmGetAlertMsg("save"))) return;
		if(!insertEmployeeStatistics()) return;
		break;
	
	case"U":
		if(!confirm(cmmGetAlertMsg("update"))) return;
		if(!updateEmployeeStatistics()) return;
		break;
	default:
		break;
	}
	$("#srchDate").val(cmmGetNum($("#inputMonth").val()).left(4));
	$("#srchDate").trigger("change");
});
/**************************************************
 * Local Function
 **************************************************/

/** 엘리먼트 속성(유효성) 세팅 */
function setElementProperty() {
	$("#srchCdBizarea, #srchDate").prop("required", true);
	$("#cdBizarea, #inputMonth, #monthToCnt, #beginEmployeeCnt, #beginTraineeCnt").prop("required", true);
	$("#cdBizarea, #inputMonth").prop("required", true);
//	$("#monthToCnt, #beginEmployeeCnt, #beginTraineeCnt").prop("min", "1");
	$("#monthToCnt, #beginEmployeeCnt, #beginTraineeCnt").prop("max", "10000");
	// 미사용
}
/** 엘리먼트 초기화 */
function resetElement() {
	$("#inputMonth").val("");
	$("#monthToCnt").val("");
	$("#beginEmployeeCnt").val("");
	$("#beginTraineeCnt").val("");
}
/** 엘리먼트 활성화 설정 */
function setElementEnabled(condition) {
	$("#tblEmployeeStatisticsInput input").attr("disabled", true);
	$("#tblEmployeeStatisticsInput select").attr("disabled", true);
	$("#tblEmployeeStatisticsInput button").attr("disabled", true);
	$("#tblEmployeeStatisticsInput #btnNew").attr("disabled", false);
	
	switch(condition) {
	case "C" :
		$("#tblEmployeeStatisticsInput #inputMonth").attr("disabled", false);
		$("#tblEmployeeStatisticsInput input[type=number]").attr("disabled", false);
		$("#tblEmployeeStatisticsInput #btnSave").attr("disabled", false);
		break;
	case "U" :
		$("#tblEmployeeStatisticsInput input[type=number]").attr("disabled", false);
		$("#tblEmployeeStatisticsInput #btnSave").attr("disabled", false);
		break;
	default :
	}
}

/**************************************************
 * CRUD Transaction Function
 **************************************************/
/** SELECT 월 운영인원 데이터 */
function selectEmployeeStatistics() {
	
	var srchCdCompny = "1000";
	var srchCdBizarea = $("#srchCdBizarea").val();
	var srchDate = cmmGetNum($("#srchDate").val());

	var getParam = new nMap();
	
	var DB_CRUD = "R";
	getParam.put("DB_MAPPER", "employeeStatusMapper");
	getParam.put("DB_REQID", "selectEmployeeStatistics");
	
	getParam.put("srchCdCompny", srchCdCompny);
	getParam.put("srchCdBizarea", srchCdBizarea);
	getParam.put("srchDate", srchDate);
	
	var postData = getParam.toJSONString();
	
	var cbf = function(rs, elementId) {
		var colWidth = ["60", "40", ""];
		var header = ["연월","월TO","월초재직","월말재직","월초교육","월말교육","사업장"];
		var thead = document.createElement("thead");
		var tbody = document.createElement("tbody");
		var theadTr = document.createElement("tr");
		var node = document.getElementById(elementId);
		
		if(!node) return;
		
		while(node.hasChildNodes()) { // node가 가진 자식 노드가 있으면 
			node.removeChild(node.lastChild); // 마지막 자식노드를 삭제
		}
		
		$("#totalCount").html(" ("+rs.length+"건)");
		
		for(var i=0 in header) {
			var th = document.createElement("th");
			th.innerHTML = header[i];
			th.setAttribute("style", "width: " + colWidth[i] + "px;");
			theadTr.appendChild(th);
		}
		thead.appendChild(theadTr);
		node.appendChild(thead);
		
		if(rs.length>0) {
			for(var i in rs) {
				var tbodyTr = document.createElement("tr");
				tbodyTr.setAttribute("data-cdcompany", rs[i].cdCompany);
				tbodyTr.setAttribute("data-cdbizarea", rs[i].cdBizarea);
				tbodyTr.setAttribute("data-inputMonth", rs[i].inputMonth);
				tbodyTr.setAttribute("data-beginemployeecnt", rs[i].beginEmployeeCnt);
				tbodyTr.setAttribute("data-begintraineecnt", rs[i].beginTraineeCnt);
				tbodyTr.setAttribute("data-putcnt", rs[i].putCnt);
				for(var j in header) {
					var td = document.createElement("td");
					tbodyTr.appendChild(td);
				}
				tbodyTr.childNodes.item(0).appendChild(document.createTextNode(cmmToDateFormat(rs[i].inputMonth)));
				tbodyTr.childNodes.item(1).appendChild(document.createTextNode(rs[i].monthToCnt));
				tbodyTr.childNodes.item(2).appendChild(document.createTextNode(rs[i].beginEmployeeCnt));
				tbodyTr.childNodes.item(3).appendChild(document.createTextNode(rs[i].endEmployeeCnt));
				tbodyTr.childNodes.item(4).appendChild(document.createTextNode(rs[i].beginTraineeCnt));
				tbodyTr.childNodes.item(5).appendChild(document.createTextNode(rs[i].endTraineeCnt));
				tbodyTr.childNodes.item(6).appendChild(document.createTextNode(rs[i].cdBizarea));

				tbody.appendChild(tbodyTr);
			}
			node.appendChild(tbody);
		}
		cmmDataTable(elementId, false, "", true, "350px", true, false);
	};
	// 저장 및 수정 후 자동 조회 및 클릭 이벤트를 주려면 동기화 방식으로 호출 해야한다.
	crudAction(DB_CRUD, postData, cbf, "tblEmployeeStatistics", false);
}
/** SELECT ONE 월 운영인원 데이터 */
function selectOneEmployeeStatistics(cdCompany, cdBizarea, inputMonth) {
	
	var getParam = new nMap();
	
	var DB_CRUD = "R";
	getParam.put("DB_MAPPER", "employeeStatusMapper");
	getParam.put("DB_REQID", "selectOneEmployeeStatistics");
	
	getParam.put("cdCompany", cdCompany);
	getParam.put("cdBizarea", cdBizarea);
	getParam.put("inputMonth", inputMonth);
	
	var postData = getParam.toJSONString();
	
	var cbf = function(rs, elementId) {
		if(rs.length>0) {
			rs = rs[0];
			$("#cdCompany").val(rs.cdCompany);
			$("#cdBizarea").val(rs.cdBizarea);
			$("#inputMonth").val(cmmToDateFormat(rs.inputMonth));
			$("#monthToCnt").val(rs.monthToCnt);
			$("#beginEmployeeCnt").val(rs.beginEmployeeCnt);
			$("#beginTraineeCnt").val(rs.beginTraineeCnt);
		}
	};
	return crudAction(DB_CRUD, postData, cbf, "", true);
}
/** DUP Check 운영인원 월 데이터 */
function dupCheckEmployeeStatistics() {
	var cdCompany = "1000";
	var cdBizarea = $("#cdBizarea").val();
	var inputMonth = cmmGetNum($("#inputMonth").val());
	
	var getParam = new nMap();
	
	var DB_CRUD = "R";
	getParam.put("DB_MAPPER", "employeeStatusMapper");
	getParam.put("DB_REQID", "selectOneEmployeeStatistics");
	
	getParam.put("cdCompany", cdCompany);
	getParam.put("cdBizarea", cdBizarea);
	getParam.put("inputMonth", inputMonth);
	
	var postData = getParam.toJSONString();
	
	var cbf = function(rs, elementId) {
		// 내용 없음
	};
	return crudAction(DB_CRUD, postData, cbf, "", true);
}
/** INSERT 운영인원 월 데이터 */
function insertEmployeeStatistics() {
	var cdCompany = "1000";
	var cdBizarea = $("#cdBizarea").val();
	var inputMonth = cmmGetNum($("#inputMonth").val());
	var monthToCnt = $("#monthToCnt").val();
	var beginEmployeeCnt = $("#beginEmployeeCnt").val();
	var beginTraineeCnt = $("#beginTraineeCnt").val();
	
	var getParam = new nMap();
	
	var DB_CRUD = "C";
	getParam.put("DB_MAPPER", "employeeStatusMapper");
	getParam.put("DB_REQID", "insertEmployeeStatistics");
	
	getParam.put("cdCompany", cdCompany);
	getParam.put("cdBizarea", cdBizarea);
	getParam.put("inputMonth", inputMonth);
	getParam.put("monthToCnt", monthToCnt);
	getParam.put("beginEmployeeCnt", beginEmployeeCnt);
	getParam.put("beginTraineeCnt", beginTraineeCnt);
	
	var postData = getParam.toJSONString();
	
	var cbf = function(rs, elementId) {
	};
	return crudAction(DB_CRUD, postData, cbf, "", true);
}
/** UPDATE 운영인원 월 데이터 */
function updateEmployeeStatistics() {
	var cdCompany = "1000";
	var cdBizarea = $("#cdBizarea").val();
	var inputMonth = cmmGetNum($("#inputMonth").val());
	var monthToCnt = $("#monthToCnt").val();
	var beginEmployeeCnt = $("#beginEmployeeCnt").val();
	var beginTraineeCnt = $("#beginTraineeCnt").val();
	
	var getParam = new nMap();
	
	var DB_CRUD = "U";
	getParam.put("DB_MAPPER", "employeeStatusMapper");
	getParam.put("DB_REQID", "updateEmployeeStatistics");
	
	getParam.put("cdCompany", cdCompany);
	getParam.put("cdBizarea", cdBizarea);
	getParam.put("inputMonth", inputMonth);
	getParam.put("monthToCnt", monthToCnt);
	getParam.put("beginEmployeeCnt", beginEmployeeCnt);
	getParam.put("beginTraineeCnt", beginTraineeCnt);
	
	var postData = getParam.toJSONString();
	
	var cbf = function(rs, elementId) {
	};
	return crudAction(DB_CRUD, postData, cbf, "", true);
}

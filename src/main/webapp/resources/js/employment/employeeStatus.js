/**************************************************
 * source		: employeeStatus.js
 * description	: 통계.지원자 현황
 * ************************************************
 * date			author			description
 * ************************************************
 * 2016.12.01	김상우			최초 작성
 * ************************************************
 * 메모
 *  
 **************************************************/

/**************************************************
 * Global Variable
 **************************************************/
var gCRUD = null;
var gTrColor = null;
/**************************************************
 * onLoad Event
 **************************************************/
$(document).ready(function() {
	
	setElementProperty();
	
	cmmSetDropDownBizarea("srchCdBizarea", "NM|CODE", "SHORTNM", true);
	$("#cdBizarea").html($("#srchCdBizarea option").clone());
	
	$("#srchDate").val(cmmToDateFormat(cmmGetDate("").left(6),"-"));
	
	$("#srchCdBizarea option[value=1000]").prop("selected", true);
	
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
	
	var aElementId = ["srchCdBizarea", "srchDate"];
	if(!cmmCheckValidation(aElementId)) return;
	
	gCRUD = "R";
	setElementEnabled();
	
	$("#thComment, #thTo, #thBeginEmployee").text("");
	if(selectToEmployeeCnt() < 1) $("#thComment").text("해당월의 인원 정보가 등록되지 않았습니다.");
	
	selectEmployeeStatus();
	setEmployeeStatusListSum();
	
});
$(document).on("click", "#tblEmployeeStatusList tr", function() {
	gCRUD = "U";
	resetElement();
	setElementEnabled(gCRUD);
	
	var cdCompany = $(this).attr("data-cdcompany");
	var cdBizarea = $(this).attr("data-cdbizarea");
	var inputDate =  $(this).attr("data-inputdate");
	
	selectOneEmployeeStatus(cdCompany, cdBizarea, inputDate);
});
//신규 버튼 클릭
$(document).on("click", "#btnNew", function() {
	gCRUD = "C";
	resetElement(gCRUD);
	setElementEnabled(gCRUD);
});

//저장 버튼
$(document).on("click", "#btnSave", function() {
	// 유효성 검사
	var aElementId = ["cdBizarea", "inputDate","changeCnt","moveCnt","putCnt","memo"];
	if(!cmmCheckValidation(aElementId)) return;
	
	var cdCompany = "1000";
	var cdBizarea = $("#cdBizarea").val();
	var inputDate = cmmGetNum($("#inputDate").val());
	var changeCnt = $("#changeCnt").val();
	var moveCnt = $("#moveCnt").val();
	var tChangeCnt = $("#tChangeCnt").val();
	var tMoveCnt = $("#tMoveCnt").val();
	var putCnt = $("#putCnt").val();
	var memo = $("#memo").val();
	var inputMonth = inputDate.left(6);
	
	switch (gCRUD) {
	case "C":
		if(dupCheckEmployeeStatus()>0) {
			alert(cmmGetAlertMsg("dupCheck"));
			return;
		}
		if(!confirm(cmmGetAlertMsg("save"))) return;
		if(!insertEmployeeStatus(cdCompany, cdBizarea, inputDate, changeCnt, moveCnt, tChangeCnt, tMoveCnt, putCnt, memo)) return;
		break;
	case"U":
		if(!confirm(cmmGetAlertMsg("update"))) return;
		if(!updateEmployeeStatus(cdCompany, cdBizarea, inputDate, changeCnt, moveCnt, tChangeCnt, tMoveCnt, putCnt, memo)) return;
		break;
	default:
		break;
	}
	$("#srchDate").val(cmmToDateFormat(cmmGetNum($("#inputDate").val()).left(6)));
	$("#srchDate").trigger("change");
	
	var endEmployeeCnt = $("#tblEmployeeStatusList tbody tr:last td:eq(3)").text();
	var endTraineeCnt = $("#tblEmployeeStatusList tbody tr:last td:eq(8)").text();
	updateEndEmployeeCnt(cdCompany, cdBizarea, inputMonth, endEmployeeCnt, endTraineeCnt);
	$("#srchDate").trigger("change");
});


$(document).on("click", "#btnToPopup", function() {
	window.open("employeeStatusToPopup", "employeeStatusToPopup", "left=0, top=50, width=870, height=690")
});

// 엑셀 추출 버튼
$(document).on("click", "#btnExport", function(e) {
	if(!confirm(cmmGetAlertMsg("exportExcel"))) return;
	cmmExportExcel("인원 운영 현황", "tblEmployeeStatusList", e);
});

$(document).on("click", "#tblEmployeeStatusList tbody tr", function() {
	$(this).addClass('selected').siblings().removeClass("selected");
});
$(document).on("click", "#divMonth button", function() {
	var month = cmmPad($(this).text());	
	var year = $("#srchDate").val().left(4);
	$("#srchDate").val(cmmToDateFormat(year+month,"-"));
	$("#srchDate").trigger("change");
});

/**************************************************
 * Local Function
 **************************************************/

/** 엘리먼트 속성(유효성) 세팅 */
function setElementProperty() {
	$("#srchCdBizarea, #srchDate").prop("required", true);
	$("#cdBizarea, #inputDate").prop("required", true);
	//$("#changeCnt, #moveCnt, tChangeCnt, tMoveCnt, #putCnt").prop("min", "1");
	$("#changeCnt, #moveCnt, tChangeCnt, tMoveCnt, #putCnt").prop("max", "10000");
	$("#memo").prop("maxlength", "200");
	// 미사용
}
/** 엘리먼트 초기화 */
function resetElement(condition) {
	$("#tblEmployeeStatusInput").find("#inputDate, input, textarea").val("");
	
	switch (condition) {
	case "C":
		$("#inputDate").val(cmmToDateFormat(cmmGetDate("").left(8),"-"));
		break;
	default:
		break;
	}
}
/** 엘리먼트 활성화 설정 */
function setElementEnabled(condition) {
	$("#tblEmployeeStatusInput").find("input, select, textarea, button").attr("disabled", true);
	$("#tblEmployeeStatusInput #btnNew").attr("disabled", false);
	
	switch(condition) {
	case "C" :
		$("#tblEmployeeStatusInput").find("#inputDate, input[type=number], textarea, #btnSave").attr("disabled", false);
		break;
	case "U" :
		$("#tblEmployeeStatusInput").find("input[type=number], textarea, #btnSave").attr("disabled", false);
		break;
	default :
	}
}

/** 운영 인원 누적 구하기 */
function setEmployeeStatusListSum() {
	var node = document.getElementById("tblEmployeeStatusListSum");
	var theadTr = document.createElement("tr");
	
	if(!node) return;
	
	while(node.hasChildNodes()) { // node가 가진 자식 노드가 있으면 
		node.removeChild(node.lastChild); // 마지막 자식노드를 삭제
	}
	
	var srcNode = $("#tblEmployeeStatusList thead tr:eq(0)");
	var thCnt = srcNode.find("th").length;
	
	for(var i=0;i<thCnt;i++) {
		if(i==0) {
			var th = document.createElement("th");
			th.innerHTML = $("#srchDate").val().right(2)+"월 누적";
			th.colspan = "2";
			var widthSum = Number(cmmGetNum(srcNode.find("th:eq("+i+")").css("width"))) + Number(cmmGetNum(srcNode.find("th:eq("+(i+1)+")").css("width")));
			th.setAttribute("style", "width: " + widthSum + "px; text-align:center");
			theadTr.appendChild(th);
			
		} else if(i>=2) {
			var td = document.createElement("td");
			td.setAttribute("style", "width: " + srcNode.find("th:eq("+i+")").css("width"));
			theadTr.appendChild(td);
		}
	}
	node.appendChild(theadTr);
	
	var trCnt = Number($("#tblEmployeeStatusList tbody tr").length); // 월 총 row 수
	var monthTo = Number($("#thTo").text()); // 월 TO
	var employSum = 0; // 재직인원 합
	var changeSum = 0; // 이직인원 합
	var moveSum = 0; // 이동인원 합
	var traineeSum = 0; // 교육누적인원 합

	var tChangeSum = 0; // 교육이직 합
	var tMoveSum = 0; // 교육시작 합
	var putSum = 0; // 업무투입 합
	
	for(var i=0;i<trCnt;i++) {
		employSum += Number($("#tblEmployeeStatusList tbody tr:eq(" + i + ")").find("td:eq(3)").text());
		changeSum += Number($("#tblEmployeeStatusList tbody tr:eq(" + i + ")").find("td:eq(4)").text());
		moveSum += Number($("#tblEmployeeStatusList tbody tr:eq(" + i + ")").find("td:eq(5)").text());
		traineeSum += Number($("#tblEmployeeStatusList tbody tr:eq(" + i + ")").find("td:eq(8)").text());
		tChangeSum += Number($("#tblEmployeeStatusList tbody tr:eq(" + i + ")").find("td:eq(9)").text());
		tMoveSum += Number($("#tblEmployeeStatusList tbody tr:eq(" + i + ")").find("td:eq(10)").text());
		putSum += Number($("#tblEmployeeStatusList tbody tr:eq(" + i + ")").find("td:eq(11)").text());
	}
	/* 월 누적 결과 표시
	 * 1. 소수점은 소수 둘째자리에서 반올림하여 첫재짜리까지만 표시한다.
	 */
	$("#tblEmployeeStatusListSum tr:eq(0) td:eq(0)").text(monthTo); // 월 TO
	$("#tblEmployeeStatusListSum tr:eq(0) td:eq(1)").text((employSum/trCnt).toFixed(1)); // 재직인원 평균
	$("#tblEmployeeStatusListSum tr:eq(0) td:eq(2)").text(changeSum); // 이직인원 합
	$("#tblEmployeeStatusListSum tr:eq(0) td:eq(3)").text(moveSum); // 이동인원 합
	$("#tblEmployeeStatusListSum tr:eq(0) td:eq(4)").text(((employSum/trCnt)/monthTo*100).toFixed(1)+"%"); // 월 운영비율
	$("#tblEmployeeStatusListSum tr:eq(0) td:eq(5)").text(Math.round(employSum/trCnt)-monthTo); // 재직인원 평균과 월TO의 GAP
	$("#tblEmployeeStatusListSum tr:eq(0) td:eq(6)").text((traineeSum/trCnt).toFixed(1)); // 교육누적인원 평균
	$("#tblEmployeeStatusListSum tr:eq(0) td:eq(7)").text(tChangeSum); // 교육이직 합
	$("#tblEmployeeStatusListSum tr:eq(0) td:eq(8)").text(tMoveSum); // 교육시작 합
	$("#tblEmployeeStatusListSum tr:eq(0) td:eq(9)").text(putSum); // 업무투입 합
}

/**************************************************
 * CRUD Transaction Function
 **************************************************/
/** SELECT 채용 현황 목록 */
function selectEmployeeStatus() {
	
	var srchCdCompny = "1000";
	var srchCdBizarea = $("#srchCdBizarea").val();
	var srchDate = cmmGetNum($("#srchDate").val());

	var getParam = new nMap();
	
	var DB_CRUD = "R";
	getParam.put("DB_MAPPER", "employeeStatusMapper");
	getParam.put("DB_REQID", "selectEmployeeStatus");
	
	getParam.put("srchCdCompny", srchCdCompny);
	getParam.put("srchCdBizarea", srchCdBizarea);
	getParam.put("srchDate", srchDate);
	
	var postData = getParam.toJSONString();
	
	var cbf = function(rs, elementId) {
		var arrDayWeek = new Array('일', '월', '화', '수', '목', '금', '토');
		var colWidth = ["80","50","","","","","","","","","","","300"];
		var header = ["일자","요일","재직TO","재직인원","이직","이동","운영비율"," GAP"
		              , "교육누적","교육이직","교육시작","업무투입","비고"];
		var node = document.getElementById(elementId);
		var thead = document.createElement("thead");
		var tbody = document.createElement("tbody");
		var theadTr = document.createElement("tr");
		
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
				var dw = Number(rs[i].dayWeek-1);
				
				if(dw==0) {
					tbodyTr.setAttribute("class", "tr-color-holiday");
				} else if(dw==6) {
					tbodyTr.setAttribute("class", "tr-color-saturday");
				}
				
				tbodyTr.setAttribute("data-cdcompany", rs[i].cdCompany);
				tbodyTr.setAttribute("data-cdbizarea", rs[i].cdBizarea);
				tbodyTr.setAttribute("data-inputdate", rs[i].inputDate);
				tbodyTr.setAttribute("data-changecnt", rs[i].changeCnt);
				tbodyTr.setAttribute("data-movecnt", rs[i].moveCnt);
				tbodyTr.setAttribute("data-tchangecnt", rs[i].tChangeCnt);
				tbodyTr.setAttribute("data-tmovecnt", rs[i].tMoveCnt);
				tbodyTr.setAttribute("data-putcnt", rs[i].putCnt);
				for(var j in header) {
					var td = document.createElement("td");
					tbodyTr.appendChild(td);
				}
				tbodyTr.childNodes.item(0).appendChild(document.createTextNode(cmmToDateFormat(rs[i].inputDate)));
				tbodyTr.childNodes.item(1).appendChild(document.createTextNode(arrDayWeek[dw]));
				tbodyTr.childNodes.item(4).appendChild(document.createTextNode(rs[i].changeCnt));
				tbodyTr.childNodes.item(5).appendChild(document.createTextNode(rs[i].moveCnt));
				tbodyTr.childNodes.item(9).appendChild(document.createTextNode(rs[i].tChangeCnt));
				tbodyTr.childNodes.item(10).appendChild(document.createTextNode(rs[i].tMoveCnt));
				tbodyTr.childNodes.item(11).appendChild(document.createTextNode(rs[i].putCnt));
				tbodyTr.childNodes.item(12).appendChild(document.createTextNode(rs[i].memo));
//				tbodyTr.childNodes.item(12).appendChild(document.createTextNode(rs[i].cdBizarea));

				tbody.appendChild(tbodyTr);
			}
			node.appendChild(tbody);

		}
//		cmmDataTable(elementId, false, "", true, "630px", true, false);
		
		var e = $("#tblEmployeeStatusList tbody");
		var dayCnt = $("#tblEmployeeStatusList tbody tr").length;
		
		var fChangeCnt = Number(e.find("tr:eq(0) td:eq(4)").text());
		var fMoveCnt = Number(e.find("tr:eq(0) td:eq(5)").text());
		var fTChangeCnt = Number(e.find("tr:eq(0) td:eq(9)").text());
		var fTMoveCnt = Number(e.find("tr:eq(0) td:eq(10)").text());
		var fPutCnt = Number(e.find("tr:eq(0) td:eq(11)").text());
		
		var monthTo = $("#thTo").text();
		var beginEmployee = $("#thBeginEmployee").text()-fChangeCnt+fMoveCnt+fPutCnt;
		// TODO: 첫줄 재직인원처럼 교육누적도 계산이 필요할듯하다. 
		var beginTrainee = $("#thBeginTrainee").text()-fTChangeCnt+fTMoveCnt-fPutCnt;
		
		e.find("tr:eq(0) td:eq(2)").text(monthTo);
		e.find("tr:eq(0) td:eq(3)").text(beginEmployee);
		e.find("tr:eq(0) td:eq(6)").text((beginEmployee/monthTo*100).toFixed(1)+"%");
		e.find("tr:eq(0) td:eq(7)").text(beginEmployee-monthTo);
		e.find("tr:eq(0) td:eq(8)").text(beginTrainee);
		
		for(var i=1; i<dayCnt;i++) {
			var p = i-1;
			
			e.find("tr:eq("+i+") td:eq(2)").text(monthTo);
			
			var prevEmployeeCnt = Number(e.find("tr:eq("+p+") td:eq(3)").text());
			var prevTraineeCnt = Number(e.find("tr:eq("+p+") td:eq(8)").text());
			
			var changeCnt = Number(e.find("tr:eq("+i+")").attr("data-changecnt"));
			var moveCnt = Number(e.find("tr:eq("+i+")").attr("data-movecnt"));
			var tChangeCnt = Number(e.find("tr:eq("+i+")").attr("data-tchangecnt"));
			var tMoveCnt = Number(e.find("tr:eq("+i+")").attr("data-tmovecnt"));
			var putCnt = Number(e.find("tr:eq("+i+")").attr("data-putcnt"));
			var to = e.find("tr:eq("+i+") td:eq(2)").text();
			var employeeCnt = "";
			var traineeCnt = "";
			
			// console.log(prevEmployeeCnt + " / " + changeCnt + " / " + moveCnt + " / "+putCnt);

			// 재직인원
			e.find("tr:eq("+i+") td:eq(3)").text(prevEmployeeCnt-changeCnt+moveCnt+putCnt);
			employeeCnt = e.find("tr:eq("+i+") td:eq(3)").text();
			// 운영비율
			e.find("tr:eq("+i+") td:eq(6)").text((employeeCnt/to*100).toFixed(1)+"%");
			// GAP
			e.find("tr:eq("+i+") td:eq(7)").text(employeeCnt-to);
			// 교육누적
			e.find("tr:eq("+i+") td:eq(8)").text(prevTraineeCnt-tChangeCnt+tMoveCnt-putCnt);
			//traineeCnt = e.find("tr:eq("+i+") td:eq(8)").text();
		
		}
		
	};
	// 저장 및 수정 후 자동 조회 및 클릭 이벤트를 주려면 동기화 방식으로 호출 해야한다.
	crudAction(DB_CRUD, postData, cbf, "tblEmployeeStatusList", true);
}
/** SELECT ONE 월 운영인원 데이터 */
function selectOneEmployeeStatus(cdCompany, cdBizarea, inputDate) {
	
	var getParam = new nMap();
	
	var DB_CRUD = "R";
	getParam.put("DB_MAPPER", "employeeStatusMapper");
	getParam.put("DB_REQID", "selectOneEmployeeStatus");
	
	getParam.put("cdCompany", cdCompany);
	getParam.put("cdBizarea", cdBizarea);
	getParam.put("inputDate", inputDate);
	
	var postData = getParam.toJSONString();
	
	var cbf = function(rs, elementId) {
		if(rs.length>0) {
			rs = rs[0];
			$("#cdCompany").val(rs.cdCompany);
			$("#cdBizarea").val(rs.cdBizarea);
			$("#inputDate").val(cmmToDateFormat(rs.inputDate));
			$("#changeCnt").val(rs.changeCnt);
			$("#moveCnt").val(rs.moveCnt);
			$("#tChangeCnt").val(rs.tChangeCnt);
			$("#tMoveCnt").val(rs.tMoveCnt);
			$("#putCnt").val(rs.putCnt);
			$("#memo").val(rs.memo);
		}
	};
	return crudAction(DB_CRUD, postData, cbf, "", true);
}
/** DUP Check 일 운영인원*/
function dupCheckEmployeeStatus() {
	var cdCompany = "1000";
	var cdBizarea = $("#cdBizarea").val();
	var inputDate = cmmGetNum($("#inputDate").val());
	
	var getParam = new nMap();
	
	var DB_CRUD = "R";
	getParam.put("DB_MAPPER", "employeeStatusMapper");
	getParam.put("DB_REQID", "selectOneEmployeeStatus");
	
	getParam.put("cdCompany", cdCompany);
	getParam.put("cdBizarea", cdBizarea);
	getParam.put("inputDate", inputDate);
	
	var postData = getParam.toJSONString();
	
	var cbf = function(rs, elementId) {
		// 내용 없음
	};
	return crudAction(DB_CRUD, postData, cbf, "", true);
}
/** INSERT 운영인원 월 데이터 */
function insertEmployeeStatus(cdCompany, cdBizarea, inputDate, changeCnt, moveCnt, tChangeCnt, tMoveCnt, putCnt, memo) {
	var getParam = new nMap();
	
	var DB_CRUD = "C";
	getParam.put("DB_MAPPER", "employeeStatusMapper");
	getParam.put("DB_REQID", "insertEmployeeStatus");
	
	getParam.put("cdCompany", cdCompany);
	getParam.put("cdBizarea", cdBizarea);
	getParam.put("inputDate", inputDate);
	getParam.put("changeCnt", changeCnt);
	getParam.put("tChangeCnt", tChangeCnt);
	getParam.put("tMoveCnt", tMoveCnt);
	getParam.put("moveCnt", moveCnt);
	getParam.put("putCnt", putCnt);
	getParam.put("memo", memo);
	
	var postData = getParam.toJSONString();
	
	var cbf = function(rs, elementId) {
	};
	return crudAction(DB_CRUD, postData, cbf, "", true);
}
/** UPDATE 운영인원 월 데이터 */
function updateEmployeeStatus(cdCompany, cdBizarea, inputDate, changeCnt, moveCnt, tChangeCnt, tMoveCnt, putCnt, memo) {
	var getParam = new nMap();
	
	var DB_CRUD = "U";
	getParam.put("DB_MAPPER", "employeeStatusMapper");
	getParam.put("DB_REQID", "updateEmployeeStatus");
	
	getParam.put("cdCompany", cdCompany);
	getParam.put("cdBizarea", cdBizarea);
	getParam.put("inputDate", inputDate);
	getParam.put("changeCnt", changeCnt);
	getParam.put("tChangeCnt", tChangeCnt);
	getParam.put("tMoveCnt", tMoveCnt);
	getParam.put("moveCnt", moveCnt);
	getParam.put("putCnt", putCnt);
	getParam.put("memo", memo);
	
	var postData = getParam.toJSONString();
	
	var cbf = function(rs, elementId) {
	};
	return crudAction(DB_CRUD, postData, cbf, "", true);
}
/** SELECT TO와 재직인원 */
function selectToEmployeeCnt() {
	
	var getParam = new nMap();
	
	var DB_CRUD = "R";
	getParam.put("DB_MAPPER", "employeeStatusMapper");
	getParam.put("DB_REQID", "selectOneEmployeeStatistics");
	
	getParam.put("cdCompany", "1000");
	getParam.put("cdBizarea", $("#srchCdBizarea").val());
	getParam.put("inputMonth", cmmGetNum($("#srchDate").val()));
	
	var postData = getParam.toJSONString();
	
	var cbf = function(rs, elementId) {
		if(rs.length>0) {
			rs = rs[0];
			$("#thTo").text(rs.monthToCnt);
			$("#thBeginEmployee").text(rs.beginEmployeeCnt);
			$("#thEndEmployee").text(rs.endEmployeeCnt);
			$("#thBeginTrainee").text(rs.beginTraineeCnt);
			$("#thEndTrainee").text(rs.endTraineeCnt);
		}
	};
	return crudAction(DB_CRUD, postData, cbf, "", true);
}
/** UPDATE 최종 월 인원 운영 정보를 갱신한다. */
function updateEndEmployeeCnt(cdCompany, cdBizarea, inputMonth, endEmployeeCnt, endTraineeCnt) {
	
	var getParam = new nMap();
	
	var DB_CRUD = "U";
	getParam.put("DB_MAPPER", "employeeStatusMapper");
	getParam.put("DB_REQID", "updateEndEmployeeCnt");
	
	getParam.put("cdCompany", cdCompany);
	getParam.put("cdBizarea", cdBizarea);
	getParam.put("inputMonth", inputMonth);
	getParam.put("endEmployeeCnt", endEmployeeCnt);
	getParam.put("endTraineeCnt", endTraineeCnt);
	
	var postData = getParam.toJSONString();
	
	var cbf = function(rs, elementId) {
	};
	return crudAction(DB_CRUD, postData, cbf, "", true);
}
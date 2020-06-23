/**************************************************
 * source		: aplcntOperation.js
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

/**************************************************
 * onLoad Event
 **************************************************/
$(document).ready(function() {
	
	cmmSetDropDownBizarea("srchCdBizarea", "NM|CODE", "SHORTNM", true);
	
	$("#cdBizarea").html($("#srchCdBizarea option").clone());
	
	$("#srchDate").val(cmmToDateFormat(cmmGetDate("").left(6),"-"));
	$("#inputDate").val(cmmToDateFormat(cmmGetDate("").left(8),"-"));
	$("#srchCdBizarea option[value=1000]").prop("selected", true);
	
	$("#srchCdBizarea").trigger("change");
	
	setElementProperty();
	resetElement();
});

/**************************************************
 * Event Handler
 **************************************************/
// 사업장 change 이벤트
$(document).on("change", "#srchCdBizarea, #srchDate, #cdBizarea", function() {
	var nodeId = $(this).attr("id");
//	console.log("nodeId : "+ nodeId);
	
	if(nodeId == "srchCdBizarea") {
		$("#cdBizarea").val($("#srchCdBizarea").val());
	} else if (nodeId == "cdBizarea") {
		$("#srchCdBizarea").val($("#cdBizarea").val());
	}
	
	selectAplcntOperationData();
});
// 조회월 change 이벤트

// 엑셀 추출 버튼
$(document).on("click", "#btnExport", function(e) {
	if(!confirm(cmmGetAlertMsg("exportExcel"))) return;
	cmmExportExcel($("#resultTitle").val() + $("#totalCount").html(), "tblAplcntOperation", e);
});

/**************************************************
 * Local Function
 **************************************************/

/** 엘리먼트 속성(유효성) 세팅 */
function setElementProperty() {
	$("#srchCdBizarea, #srchDate").prop("required", true);
	$("#cdBizarea, #inputDate").prop("required", true);
	$("#changeCnt, #moveCnt, #putCnt").prop("min", "1");
	$("#changeCnt, #moveCnt, #putCnt").prop("max", "5000");
	// 미사용
}
/** 엘리먼트 초기화 */
function resetElement() {
	$("#checkDate").val(cmmToDateFormat(cmmGetDate().left(8),"-"));
	$("#centerCd").val("1");
//	$("input:radio[value=1]").prop("checked", true);
	$("textarea").val("");
}

/**************************************************
 * CRUD Transaction Function
 **************************************************/
/** SELECT 채용 현황 목록 */
function selectAplcntOperationData() {
	
	var srchCdCompny = "1000";
	var srchCdBizarea = $("#srchCdBizarea").val();
	var srchDate = cmmGetNum($("#srchDate").val());

	var getParam = new nMap();
	
	var DB_CRUD = "R";
	getParam.put("DB_MAPPER", "aplcntOperationMapper");
	getParam.put("DB_REQID", "selectOperationData");
	
	getParam.put("srchCdCompny", srchCdCompny);
	getParam.put("srchCdBizarea", srchCdBizarea);
	getParam.put("srchDate", srchDate);
	
	var postData = getParam.toJSONString();
	
	var cbf = function(rs, elementId) {
		var arrDayWeek = new Array('일', '월', '화', '수', '목', '금', '토');
		var colWidth = ["60", "40", ""];
		var header = ["일자","요일","TO","재직인원","이직","이동","투입","운영비율"," GAP", "사업장"];
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
				tbodyTr.setAttribute("data-inputdate", rs[i].inputDate);
				tbodyTr.setAttribute("data-changecnt", rs[i].changeCnt);
				tbodyTr.setAttribute("data-movecnt", rs[i].moveCnt);
				tbodyTr.setAttribute("data-putcnt", rs[i].putCnt);
				for(var j in header) {
					var td = document.createElement("td");
					tbodyTr.appendChild(td);
				}
				tbodyTr.childNodes.item(0).appendChild(document.createTextNode(cmmToDateFormat(rs[i].inputDate)));
				tbodyTr.childNodes.item(1).appendChild(document.createTextNode(arrDayWeek[Number(rs[i].dayWeek-1)]));
				tbodyTr.childNodes.item(4).appendChild(document.createTextNode(rs[i].changeCnt));
				tbodyTr.childNodes.item(5).appendChild(document.createTextNode(rs[i].moveCnt));
				tbodyTr.childNodes.item(6).appendChild(document.createTextNode(rs[i].putCnt));
				tbodyTr.childNodes.item(9).appendChild(document.createTextNode(rs[i].cdBizarea));

				tbody.appendChild(tbodyTr);
			}
			node.appendChild(tbody);

		}
		cmmDataTable(elementId, false, "", true, "480px", true, false);
		
		var e = $("div.dataTables_scrollBody table tbody");
		var dayCnt = $("div.dataTables_scrollBody table tbody tr").length;
		
		var to_0 = 623;
		var employeeCnt_0 = 606;
		
		e.find("tr:eq(0) td:eq(2)").text(to_0);
		e.find("tr:eq(0) td:eq(3)").text(employeeCnt_0);
		e.find("tr:eq(0) td:eq(7)").text((employeeCnt_0/to_0*100).toFixed(1)+"%");
		
		for(var i=1; i<dayCnt;i++) {
			var p = i-1;
			
			e.find("tr:eq("+i+") td:eq(2)").text("623");
			
			var prevEmployeeCnt = Number(e.find("tr:eq("+p+") td:eq(3)").text());
			var changeCnt = Number(e.find("tr:eq("+p+")").attr("data-changecnt"));
			var moveCnt = Number(e.find("tr:eq("+i+")").attr("data-movecnt"));
			var putCnt = Number(e.find("tr:eq("+i+")").attr("data-putcnt"));
//			console.log(prevEmployeeCnt + " / " + changeCnt + " / " + moveCnt + " / "+putCnt);

			// 재직인원
			e.find("tr:eq("+i+") td:eq(3)").text(prevEmployeeCnt-changeCnt+moveCnt+putCnt);
			var to = e.find("tr:eq("+i+") td:eq(2)").text();
			var employeeCnt = e.find("tr:eq("+i+") td:eq(3)").text();
			// 운영비율
			e.find("tr:eq("+i+") td:eq(7)").text((employeeCnt/to*100).toFixed(1)+"%");
			// GAP
			e.find("tr:eq("+i+") td:eq(8)").text(employeeCnt-to);
		
		}
		
	};
	// 저장 및 수정 후 자동 조회 및 클릭 이벤트를 주려면 동기화 방식으로 호출 해야한다.
	crudAction(DB_CRUD, postData, cbf, "tblAplcntOperation", false);
}
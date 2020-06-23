/**************************************************
 * source		: centerCheck.js
 * description	: 통계.지원자 현황
 * ************************************************
 * date			author			description
 * ************************************************
 * 2016.11.24	김상우			최초 작성
 * ************************************************
 * 메모
 *  
 **************************************************/

/**************************************************
 * Global Variable
 **************************************************/
var gCRUD_FLAG = null;

/**************************************************
 * onLoad Event
 **************************************************/
$(document).ready(function() {
	
	cmmSetDropDown("centerCd", "CCLOCATION", true);
	cmmSetDropDown("refDeviceCd", "CCDEVICE", true);
	cmmSetDropDown("refCheckItemCd", "CCCHECKITEM", true);
	$("#refDeviceCd").children("option").filter("[value='']").remove();
	$("#refCheckItemCd").children("option").filter("[value='']").remove();
//	$("#srchCdBizarea").trigger("change");
	setCheckForm("tblCenterCheckList");

	setElementProperty();
	resetElement();
	setElementEnabled();
	
	$("#checkDate").trigger("change");
	
});

/**************************************************
 * Event Handler
 **************************************************/
$(document).on("change", "#centerCd", function() {
	$("#checkDate").trigger("change");
});
$(document).on("change", "#checkDate", function() {
	gCRUD_FLAG = "R";

	if(!checkValidation()) return;
	
	selectCenterCheckList();
	setElementEnabled(gCRUD_FLAG);
	$("#btnNew").trigger("click");
});
$(document).on("click", "#btnNew", function(){
	setCheckForm("tblCenterCheckList")
});
$(document).on("click", "#btnMod", function(){
	$("#tblCenterCheckList tbody tr").each(function(){
		var itemRadio1 = document.createElement("input");
		var itemRadio2 = document.createElement("input");
		
		itemRadio1.setAttribute("type","radio");
		itemRadio1.setAttribute("name",$(this).attr("data-devicecd")+$(this).attr("data-checkitemcd"));
		itemRadio1.setAttribute("value","1");

		
		itemRadio2.setAttribute("type","radio");
		itemRadio2.setAttribute("name",$(this).attr("data-devicecd")+$(this).attr("data-checkitemcd"));
		itemRadio2.setAttribute("value","2");
		
		var resultCd = $(this).attr("data-resultcd"); 
		
		if(resultCd==1) {
			itemRadio1.setAttribute("checked",true);
		} else if(resultCd==2){
			itemRadio2.setAttribute("checked",true);
		}
		
		$(this).find("td:eq(2)").empty();
		$(this).find("td:eq(2)").append(itemRadio1);
		$(this).find("td:eq(2)").append(" 양호\u00A0\u00A0\u00A0\u00A0\u00A0");
		$(this).find("td:eq(2)").append(itemRadio2);
		$(this).find("td:eq(2)").append(" 불량");
		
		$(this).find("td:eq(3) > textarea").prop("disabled", false);
		$(this).find("td:eq(4) > textarea").prop("disabled", false);
	});
	
	gCRUD_FLAG = "U";
	setElementEnabled(gCRUD_FLAG);
	
});
$(document).on("click", "#btnSave", function() {
	if(!checkValidation()) return;
	
	switch(gCRUD_FLAG) {
	case "C":
		
		if(!confirm(cmmGetAlertMsg("save"))) return;
		if(!insertCenterCheck()) return;
		break;
	case "U":
		if(!confirm(cmmGetAlertMsg("update"))) return;
		if(!updateCenterCheck()) return;
		break;
	}
	gCRUD_FLAG = null;
	
	$("#checkDate").trigger("change");
});
/**************************************************
 * Local Function
 **************************************************/
/** 엘리먼트 속성(유효성) 세팅 */
function setElementProperty() {
	$("#checkDate").prop("required", true);
	$("#centerCd").prop("required", true);
//	$("#tblCenterCheckList tr").find("td:eq(3) textarea").prop("required", true);
	$("#tblCenterCheckList tr").find("td:eq(3) textarea").prop("maxlength", "1000");
	$("#tblCenterCheckList tr").find("td:eq(4) textarea").prop("maxlength", "500");
	// 미사용
}
/** 엘리먼트 초기화 */
function resetElement() {
	$("#checkDate").val(cmmToDateFormat(cmmGetDate().left(8),"-"));
	$("#centerCd").val("1");
//	$("input:radio[value=1]").prop("checked", true);
	$("textarea").val("");
}

/** 엘리먼트 활성화 설정 */
function setElementEnabled(condition) {
	$(".input-group-btn #btnNew").attr("disabled", true);
	$(".input-group-btn #btnMod").attr("disabled", true);
	$(".input-group-btn #btnSave").attr("disabled", true);
	switch(condition) {
	case "C" :
		$(".input-group-btn #btnNew").attr("disabled", false);
		$(".input-group-btn #btnSave").attr("disabled", false);
		break;
	case "R" :
		$(".input-group-btn #btnMod").attr("disabled", false);
		break;
	case "U" :
		$(".input-group-btn #btnSave").attr("disabled", false);
		break;
	default :
	}
}

function checkValidation() {
	var aElementId = ["checkDate", "centerCd"];
	var node1 = $("#tblCenterCheckList tr").find("td:eq(3) textarea");
	var node2 = $("#tblCenterCheckList tr").find("td:eq(4) textarea");
	var nodeCnt = node1.size();

	if(!cmmCheckValidation(aElementId)) return false;
	
	// id가 없는 경우에 유효성 검사를 별개로 진행되도록 하기 위한 코드
	for(var i=0;i<nodeCnt;i++) {
		if (!node1[i].checkValidity()) {
			return node1[i].reportValidity();
		}
		if (!node2[i].checkValidity()) {
			return node2[i].reportValidity();
		}
	}
	return true;
}
/** 점검표 세팅 */
function setCheckForm(elementId) {
	var node = document.getElementById(elementId);
	var thead = document.createElement("thead");
	var tbody = document.createElement("tbody");
	var colWidth = ["130","130","120","",""];
	var header = ["장비","항목","점검결과","점검내용","비고"];
	var theadTr = document.createElement("tr");
	var deviceCnt = $("#refDeviceCd option").size();
	var checkItemCnt = $("#refCheckItemCd option").size();
	
	if(!node) return;
	while(node.hasChildNodes()) { // node가 가진 자식 노드가 있으면 
		node.removeChild(node.lastChild); // 마지막 자식노드를 삭제
	}
	
	for(var i=0 in header) {
		var th = document.createElement("th");
		th.innerHTML = header[i];
		th.setAttribute("style", "width: " + colWidth[i] + "px;");
		theadTr.appendChild(th);
	}
	thead.appendChild(theadTr);
	node.appendChild(thead);
	
	for(var i=0;i<deviceCnt;i++) {
		for(var j=0;j<checkItemCnt;j++) {
			var tbodyTr = document.createElement("tr");
			var itemRadio1 = document.createElement("input");
			var itemRadio2 = document.createElement("input");
			var itemTextarea1 = document.createElement("textarea");
			var itemTextarea2 = document.createElement("textarea");
			
			var device = $("#refDeviceCd option:eq("+i+")");
			var checkItem = $("#refCheckItemCd option:eq("+j+")");
			
			tbodyTr.setAttribute("data-devicecd", device.val());
			tbodyTr.setAttribute("data-checkitemcd", checkItem.val());
			
			for(var k in header) {
				var td = document.createElement("td");
				tbodyTr.appendChild(td);
			}
			tbodyTr.childNodes.item(0).appendChild(document.createTextNode(device.text()));
			tbodyTr.childNodes.item(1).appendChild(document.createTextNode(checkItem.text()));
			
			itemRadio1.setAttribute("type","radio");
			itemRadio1.setAttribute("name",device.val()+checkItem.val());
			itemRadio1.setAttribute("value","1");
			itemRadio1.setAttribute("checked",true);
			
			itemRadio2.setAttribute("type","radio");
			itemRadio2.setAttribute("name",device.val()+checkItem.val());
			itemRadio2.setAttribute("value","2");
			
//			itemTextarea1.setAttribute("placeholder", device.text()+" "+checkItem.text());
			
			tbodyTr.childNodes.item(2).appendChild(itemRadio1);
			tbodyTr.childNodes.item(2).appendChild(document.createTextNode(" 양호\u00A0\u00A0\u00A0\u00A0\u00A0"));
			tbodyTr.childNodes.item(2).appendChild(itemRadio2);
			tbodyTr.childNodes.item(2).appendChild(document.createTextNode(" 불량"));
			tbodyTr.childNodes.item(3).appendChild(itemTextarea1);
			tbodyTr.childNodes.item(4).appendChild(itemTextarea2);
			tbody.appendChild(tbodyTr);
		}
	}
	node.appendChild(tbody);
	$("#tblCenterCheckList").span("row","td",0);
}
/**************************************************
 * CRUD Transaction Function
 **************************************************/
/** INSERT 점검표 */
function insertCenterCheck() {
	var mapList = new Array;
	var rowCnt = $("#tblCenterCheckList tbody tr").size();
	
	for(var i=0;i<rowCnt;i++) {

		var getData = new nMap();
		var node = $("#tblCenterCheckList tbody tr:eq("+i+")");
		
		getData.put("checkDate", cmmGetNum($("#checkDate").val()));
		getData.put("centerCd", $("#centerCd").val());
		getData.put("deviceCd", node.attr("data-devicecd"));
		getData.put("checkItemCd", node.attr("data-checkitemcd"));
		getData.put("resultCd", node.find("td:eq(2) :radio:checked").val());
		getData.put("contents", node.find("td:eq(3) textarea").val());
		getData.put("etc1", node.find("td:eq(4) textarea").val());
		mapList.push(getData.map);
	}

	var getParam = new nMap();
	
	var DB_CRUD = "C";
	getParam.put("DB_MAPPER", "itCenterCheckMapper");
	getParam.put("DB_REQID", "insertListCenterCheck");
	
	getParam.put("mapList", mapList);
	
	var postData = getParam.toJSONString();
	console.log(postData);

	var cbf = function(rs, elementId) {
		if(rs.cnt>0) {
			$("#checkDate").trigger("change");
		} else {
			cmmGetAlertMsg("error");
		}
	};
	
	return crudAction(DB_CRUD, postData, cbf, "", true);
}

function updateCenterCheck() {
	var mapList = new Array;
	var rowCnt = $("#tblCenterCheckList tbody tr").size();
	
	for(var i=0;i<rowCnt;i++) {

		var getData = new nMap();
		var node = $("#tblCenterCheckList tbody tr:eq("+i+")");
		
		getData.put("checkDate", cmmGetNum($("#checkDate").val()));
		getData.put("centerCd", $("#centerCd").val());
		getData.put("deviceCd", node.attr("data-devicecd"));
		getData.put("checkItemCd", node.attr("data-checkitemcd"));
		getData.put("resultCd", node.find("td:eq(2) :radio:checked").val());
		getData.put("contents", node.find("td:eq(3) textarea").val());
		getData.put("etc1", node.find("td:eq(4) textarea").val());
		mapList.push(getData.map);
	}

	var getParam = new nMap();
	
	var DB_CRUD = "U";
	getParam.put("DB_MAPPER", "itCenterCheckMapper");
	getParam.put("DB_REQID", "insertListCenterCheck");
	
	getParam.put("mapList", mapList);
	
	var postData = getParam.toJSONString();
	console.log(postData);

	var cbf = function(rs, elementId) {
		if(rs.cnt>0) {
			$("#checkDate").trigger("change");
		} else {
			cmmGetAlertMsg("error");
		}
	};
	
	return crudAction(DB_CRUD, postData, cbf, "", true);
	alert("미구현");
}

/** SELECT 채용 현황 리스트 */
function selectCenterCheckList() {
	var checkDate = cmmGetNum($("#checkDate").val());
	var centerCd = $("#centerCd").val();
	
	var getParam = new nMap();
	
	var DB_CRUD = "R";
	getParam.put("DB_MAPPER", "itCenterCheckMapper");
	getParam.put("DB_REQID", "selectCenterCheck");
	
	getParam.put("checkDate", checkDate);
	getParam.put("centerCd", centerCd);
	
	var postData = getParam.toJSONString();
	
	var cbf = function(rs, elementId) {
	
		if(rs.length>0) {
			for(var i in rs) {
				$("#tblCenterCheckList tbody tr").each(function(){
					var deviceCd = $(this).attr("data-devicecd");
					var checkItemCd = $(this).attr("data-checkitemcd");
					
					if(deviceCd == rs[i].deviceCd && checkItemCd == rs[i].checkItemCd) {
						
						var itemResultCd = document.createElement("span");
						if(rs[i].resultCd == "1") { // 정상
							itemResultCd.classList.add("label", "label-success");
							itemResultCd.appendChild(document.createTextNode("양호"));
						} else if(rs[i].resultCd == "2") { // 비정상
							itemResultCd.classList.add("label", "label-danger");
							itemResultCd.appendChild(document.createTextNode("불량"));
						}
						$(this).find("td:eq(2)").empty();
						$(this).find("td:eq(2)").append(itemResultCd);
						$(this).attr("data-resultcd", rs[i].resultCd);
						$(this).find("td:eq(3) > textarea").prop("disabled", true);
						$(this).find("td:eq(3) > textarea").val(rs[i].contents);
						$(this).find("td:eq(4) > textarea").prop("disabled", true);
						$(this).find("td:eq(4) > textarea").val(rs[i].etc1);
					}
				});
			}
			gCRUD_FLAG = "R";
		} else {
			gCRUD_FLAG = "C";
		}
	};
	// 저장 및 수정 후 자동 조회 및 클릭 이벤트를 주려면 동기화 방식으로 호출 해야한다.
	crudAction(DB_CRUD, postData, cbf, "tblCenterCheckList", true);
}
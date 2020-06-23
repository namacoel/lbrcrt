/**************************************************
 * source		: prgmMng.js
 * description	: 프로그램 관리 화면
 * ************************************************
 * date			author			description
 * ************************************************
 * 2016.03.17	김상우			최초 작성
 * ************************************************
 **************************************************/

/**************************************************
 * 전역 변수 선언
 **************************************************/
var gCRUD = null;
/**************************************************
 * onLoad Event Setting
 **************************************************/
$(document).ready(function() {
	
	$("#btnSrch").trigger("click");
	cmmSetDropDown("srchUseYn", "OXSTTS");
	cmmSetDropDown("slctUseYn", "OXSTTS", true);
//	cmmSetComboBox("useYn", "#srchUseYn");
//	cmmSetComboBox("useYn", "#slctUseYn");
	fnGetPrmgGrpCombo();
	fnGetUpperPrgmCombo();
	
});

/**************************************************
 * Event Handler
 **************************************************/
// 프로그램 조회 버튼 클릭 이벤트
$(document).on("click", "#btnSrch", function() {
	gCRUD = null;
	fnEnabled("DEFAULT");
	fnSelectPrgmList();
});

// 프로그램 리스트 클릭 이벤트
$(document).on("click", "#tbdListMain tr", function() {
	gCRUD = "U";
	fnEnabled("LIST");
	fnInitDtl("ALL");
	$("#tbdListMain tr").css("font-weight", "normal");
	$(this).css("font-weight", "bold");
	
	
	// TODO 다시 해보기
	var tempPrgmId = $(this).children("td:eq(1)").text();
	
	fnSelectOnePrgm(tempPrgmId);
	
});

// 신규 버튼 클릭
$(document).on("click", "#btnNew", function() {
	gCRUD = "C";
	fnInitDtl();
	fnEnabled("NEW");
});
// 저장 버튼 클릭
$(document).on("click", "#btnSave", function() {
	console.log("first is.. " + gCRUD);
	switch(gCRUD) {
	case "C" :
		if(!confirm(cmmGetAlertMsg("save") + "\n(상위프로그램 미선택 시 그룹으로 등록됨.)")) return;
		fnInsertPrgm();
		break;
	case "U" :
		if(!confirm(cmmGetAlertMsg("update") + "\n(상위프로그램 미선택 시 그룹으로 등록됨.)")) return;
		fnUpdatePrgm();
		break;
	}
	
	gCRUD = null;
	console.log("end is.. " + gCRUD);
	$("#btnSearch").trigger("click");
});

$(document).on("change", "#slctUpperPrgmId", function() {
	$("#slctPrgmGrpId").val($(this).children("option:selected").attr("value1"));
});

/**************************************************
 * CRUD 처리 함수
 **************************************************/
/** 프로그램 리스트를 조회 함수 */
function fnSelectPrgmList() {
	// 파라미터 수집
	var srchPrgmGrpId = $("#srchPrgmGrpId").val();
	var srchPrgmNm = $("#srchPrgmNm").val();
	var srchUseYn = $("#srchUseYn").val();
	
	// 맵 객체 선언
	var getParam = new nMap();
	
	// DB 트랜잭션 설정
	var DB_ACTION = "R";
	getParam.put("DB_MAPPER", "prgmMngMapper"); // DB 네임스페이스
	getParam.put("DB_REQID", "selectPrgmList"); // DB 요청ID
	
	// 파라미터 할당
	getParam.put("srchPrgmGrpId", srchPrgmGrpId);
	getParam.put("srchPrgmNm", srchPrgmNm);
	getParam.put("srchUseYn", srchUseYn);
	
	// 파라미터를 JSON문자열로 변환
	var postData = getParam.toJSONString();
	
	// 로그 확인
	console.log(postData);
	
	// AJAX 호출 및 콜백 함수
	crudAction(DB_ACTION, postData, cb_fnSelectPrgmList);
}
/** 프로그램 리스트 조회 콜백 함수 */
function cb_fnSelectPrgmList(retData) {
	var htmlScript = "";
	if(retData.length > 0) {
		for(var i=0; i<retData.length; i++) {		
			htmlScript += "<tr>";
//			htmlScript += "<td>" + retData[i].prgmGrpId + "</td>";
			htmlScript += "<td>" + retData[i].prgmGrpNm + "</td>";
			htmlScript += "<td>" + retData[i].prgmId + "</td>";
			htmlScript += "<td>" + cmmSpaceToChar(retData[i].prgmNm,"&nbsp;") + "</td>";
			htmlScript += "<td>" + retData[i].level + "</td>";
			htmlScript += "<td>" + retData[i].prgmUri + "</td>";
		}
	} else {
		htmlScript += "<tr>";
		htmlScript += "<td colspan='4'>조회된 내용이 없습니다.</td>";
		htmlScript += "</tr>";
	}
	$("#tbdListMain").html(htmlScript);
}

/** 프로그램 조회 */
function fnSelectOnePrgm(pPrgmId) {
	
	// 맵객체 선언
	var getParam = new nMap();
	
	// DB 트랜잭션 설정
	var DB_CRUD = "R";
	
	getParam.put("DB_MAPPER", "prgmMngMapper");
	getParam.put("DB_REQID", "selectPrgmList")
	
	getParam.put("pPrgmId",pPrgmId);
	
	var postData = getParam.toJSONString();
	crudAction(DB_CRUD, postData, cb_fnSelectOnePrgm);
	
	
}
function cb_fnSelectOnePrgm(retData) {
	if(retData == undefined || retData == "undefined") { return; } else { retData = retData[0]; }
	
	$("#txtPrgmId").val(retData.prgmId);
	$("#txtPrgmNm").val(cmmRemoveSpace(retData.prgmNm));
	$("#slctUpperPrgmId").val(retData.upperPrgmId);
	$("#slctUpperPrgmId").trigger("change");
//	$("#slctPrgmGrpId").val(retData.prgmGrpId);
	$("#txtPrgmUri").val(retData.prgmUri);
	$("#txtSortOrder").val(retData.sortOrder);
	$("#slctUseYn").val(retData.useYn);
	$("#txtCreatorId").val(retData.creatorId);
	$("#txtCreatedDt").val(cmmJsonDateToString(retData.createdDt));
	$("#txtModifierId").val(retData.modifierId);
	$("#txtModifiedDt").val(cmmJsonDateToString(retData.modifiedDt));
}
function fnGetPrmgGrpCombo() {
	
	// 맵 객체 선언
	var getParam = new nMap();
	
	// DB 트랜잭션 설정
	var DB_ACTION = "R";
	getParam.put("DB_MAPPER", "prgmMngMapper");
	getParam.put("DB_REQID", "getPrgmGrpCombo");
	
	// 파라미터 할당
	
	// 파라미터를 JSON 문자열로 변환
	var postData = getParam.toJSONString();
	
	// 로그확인
	
	// AJAX 호출
	crudAction(DB_ACTION, postData, cb_fnGetPrmgGrpCombo);
}

function fnInsertPrgm() {
	var txtPrgmId = $("#txtPrgmId").val();
	var txtPrgmNm = $("#txtPrgmNm").val();
	var slctUpperPrgmId = $("#slctUpperPrgmId").val();
	var slctPrgmGrpId = $("#slctPrgmGrpId").val();
	if(isNull(slctPrgmGrpId)) slctPrgmGrpId = txtPrgmId;
	var txtPrgmUri = $("#txtPrgmUri").val();
	var txtSortOrder = $("#txtSortOrder").val();
	var slctUseYn = $("#slctUseYn").val();
	var creatorId = "세션후적용";
	var modifierId = "세션후적용";
	
	var getParam = new nMap();
	
	var DB_CRUD = "C";
	
	getParam.put("DB_MAPPER", "prgmMngMapper");
	getParam.put("DB_REQID", "insertPrgm");
	
	getParam.put("txtPrgmId", txtPrgmId);
	getParam.put("txtPrgmNm", txtPrgmNm);
	getParam.put("slctUpperPrgmId", slctUpperPrgmId);
	getParam.put("slctPrgmGrpId", slctPrgmGrpId);
	getParam.put("txtPrgmUri", txtPrgmUri);
	getParam.put("txtSortOrder", txtSortOrder);
	getParam.put("slctUseYn", slctUseYn);
	getParam.put("creatorId", creatorId);
	getParam.put("modifierId", modifierId);
	
	var postData = getParam.toJSONString();
	crudAction(DB_CRUD, postData, cb_fnInsertPrgm);
}

function cb_fnInsertPrgm() {
	console.log("fnInsertPrgm");
}

function fnUpdatePrgm() {
	
	var txtPrgmId = $("#txtPrgmId").val();
	var slctPrgmGrpId = $("#slctPrgmGrpId").val();
	var slctUpperPrgmId = $("#slctUpperPrgmId").val();
	if(isNull(slctPrgmGrpId)) slctPrgmGrpId = txtPrgmId;
	var txtPrgmNm = $("#txtPrgmNm").val();
	var txtPrgmUri = $("#txtPrgmUri").val();
	var txtPrgmDesc = $("#txtPrgmDesc").val();
	var txtSortOrder = $("#txtSortOrder").val();
	var slctUseYn = $("#slctUseYn").val();
	var creatorId = "세션후적용";
	var modifierId = "세션후적용";
	
	var getParam = new nMap();
	
	var DB_CRUD = "U";
	
	getParam.put("DB_MAPPER", "prgmMngMapper");
	getParam.put("DB_REQID", "updatePrgm");
	
	getParam.put("slctPrgmGrpId", slctPrgmGrpId);
	getParam.put("txtPrgmId", txtPrgmId);
	getParam.put("txtPrgmNm", txtPrgmNm);
	getParam.put("slctUpperPrgmId", slctUpperPrgmId);
	getParam.put("txtPrgmUri", txtPrgmUri);
	getParam.put("txtPrgmDesc", txtPrgmDesc);
	getParam.put("txtSortOrder", txtSortOrder);
	getParam.put("slctUseYn", slctUseYn);
	getParam.put("creatorId", creatorId);
	getParam.put("modifierId", modifierId);
	
	var postData = getParam.toJSONString();
	crudAction(DB_CRUD, postData, cb_fnUpdatePrgm);
}
function cb_fnUpdatePrgm() {
	console.log("수정 완료..");
}



function cb_fnGetPrmgGrpCombo(retData) {
	var htmlScript = "";
	
	htmlScript += "<option value=''>없음</option>";
	
	if(retData.length > 0 ) {
		for(var i=0; i<retData.length; i++) {
			htmlScript += "<option value='"
				+ retData[i].prgmId + "'>"
				+ retData[i].prgmNm + "</option>";
		}
	} else {
//		htmlScript += "<option value='00'>None--</option>";
	}
	$("#srchPrgmGrpId").html(htmlScript);
	$("#slctPrgmGrpId").html(htmlScript);
}


function fnGetUpperPrgmCombo() {
	
	var getParam = new nMap();
	
	var DB_ACTION = "R";
	getParam.put("DB_MAPPER", "prgmMngMapper");
	getParam.put("DB_REQID", "getUpperPrgmCombo");
	
	var postData = getParam.toJSONString();
	
	crudAction(DB_ACTION, postData, cb_fnGetUpperPrgmCombo);
}

function cb_fnGetUpperPrgmCombo(retData) {
var htmlScript = "";
	
	htmlScript += "<option value=''>없음</option>"
	
	if(retData.length > 0 ) {
		for(var i=0; i<retData.length; i++) {
			htmlScript += "<option value='"	+ retData[i].prgmId + "' "
				+ "value1='" + retData[i].prgmGrpId + "'>"
				+ cmmSpaceToChar(retData[i].prgmNm, "&nbsp;") + "</option>";
		}
	} else {
//		htmlScript += "<option value='00'>None--</option>";
	}
	$("#slctUpperPrgmId").html(htmlScript);
}


function fnInitDtl() {
	$("#tblDtlMain tr > td > input[id^='txt'").val("");
	$("#tblDtlMain tr > td > select").val("");
}

function fnEnabled(pFLAG) {
	$("#tblDtlMain tr > td > input[id^='txt']").attr("disabled", true);
	$("#tblDtlMain tr > td > select").attr("disabled", true);
	$("#btnSave").attr("disabled", true);
	
	if(pFLAG=="DEFAULT") {
		$("#btnNew").attr("disabled", false);
	} else if(pFLAG=="NEW") {
		$("#txtPrgmId").attr("disabled", false);
		$("#txtPrgmNm").attr("disabled", false);
		$("#slctUpperPrgmId").attr("disabled", false);
//		$("#slctPrgmGrpId").attr("disabled", false);
		$("#txtPrgmUri").attr("disabled", false);
		$("#txtSortOrder").attr("disabled", false);
		$("#slctUseYn").attr("disabled", false);
		$("#btnNew").attr("disabled", false);
		$("#btnSave").attr("disabled", false);
	} else if(pFLAG=="LIST") {
		$("#txtPrgmNm").attr("disabled", false);
		$("#slctUpperPrgmId").attr("disabled", false);
//		$("#slctPrgmGrpId").attr("disabled", false);
		$("#txtPrgmUri").attr("disabled", false);
		$("#txtSortOrder").attr("disabled", false);
		$("#slctUseYn").attr("disabled", false);
		$("#btnNew").attr("disabled", false);
		$("#btnSave").attr("disabled", false);
	}
}




/**************************************************
 * Debugging 함수
 **************************************************/
// input button click 시 로그 출력
$(document).on("click", "input[id^='btn']", function() {
	console.log($(this).attr("id") + " clicked..");
})

// select change 시 로그 출력
$(document).on("change", "select", function() {
	console.log($(this).val());
});


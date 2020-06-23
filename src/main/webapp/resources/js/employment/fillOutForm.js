/**************************************************
 * source		: fillOutForm.js
 * description	: 공통 코드 관리 화면
 * ************************************************
 * date			author			description
 * ************************************************
 * 2016.03.31	김상우			최초 작성
 * ************************************************
 **************************************************/


/**************************************************
 * 전역 변수 선언
 **************************************************/
var aplcntFormIdx = "1";
//var aplcntFormIdx = $("#aplcntFormIdx").val();
	// TODO 지원서 번호와 섹션 코드 관리 고민
var sectionCd1 = "SCHOOL";
var sectionCd2 = "COMPANY";
var sectionCd3 = "CERTI";
var aplcntId = "Test";
var modifierId = "JS";
/**************************************************
 * onLoad 이벤트 설정
 **************************************************/
$(document).ready(function() {
	setDropDownDate("schoolSyear", "schoolSmonth", "", 1960, 1);
	setDropDownDate("schoolEyear", "schoolEmonth", "", 1960, 1);
	setDropDownDate("companySyear", "companySmonth", "", 1970, 1);
	setDropDownDate("companyEyear", "companyEmonth", "", 1970, 1);
	setDropDownDate("milSyear", "milSmonth", "", 1970, 1);
	setDropDownDate("milEyear", "milEmonth", "", 1970, 1);
	setDropDownDate("certiYear", "certiMonth", "", 1970, 1);
	cmmSetDropDown("schoolSttsCd", "SCHOOLSTTS");
	cmmSetDropDown("companyPosCd", "COMPANYPOS");
	cmmSetDropDown("engLvCd", "LV5");
	cmmSetDropDown("jpnLvCd", "LV5");
	cmmSetDropDown("etclangLvCd", "LV5");
	cmmSetDropDown("pptLvCd", "LV5");
	cmmSetDropDown("excelLvCd", "LV5");
	cmmSetDropDown("milDischargedCd", "MILDISCHARGED");
	/* ajax 호출 시 드롭다운과 메인 데이터의 조회시간차이로 표시가 제대로 안되는 경우가 발생하여 
	제일 하단 콤보에만 동기 방식으로 옵션을 줌.*/
	cmmSetDropDown("milRankCd", "MILRANK", true);

	init("SCHOOL");
	init("COMPANY");
	init("FAM");
	init("APLCNT");
	selectAplcntForm();

	return;
	
	selectSchoolInfo();
	selectCompanyInfo();
	selectCertiInfo();
	selectFamInfo();
});


/**************************************************
 * Event Handler
 **************************************************/
// 지원자 정보 갱신 후 리스트 이동 버튼 이벤트
$(document).on("click", "#btnSavePreview", function() {
	// TODO 주석 풀기
	if(!$("#factAgrmntCd").is(":checked")) {
		alert("기재사항의 사실여부를 확인하셔야 등록할 수 있습니다.");
		$("#factAgrmntCd").focus();
		return false;
	}
	// 파라미터 수집
	updateAplcntForm();
});

// 학력사항 추가 버튼 이벤트
$(document).on("click", "#btnAddSchool", function() {
	var flag = $(this).attr("data-flag")
	console.log("flag is " + flag);
	
	switch(flag) {
	case "C" :
		insertSchoolInfo();
		break;
	case "U" :
		updateSchoolInfo();
		break;
	}
});

// 학력사항 취소 버튼 이벤트
$(document).on("click", "#btnCancelSchool", function() {
	init("SCHOOL");
});

// 학력 수정 버튼 이벤트
$(document).on("click", "input[name=btnModiSchoolInfo]", function() {
	
//	var index = $("input[name=btnModiSchoolInfo]").index(this);
	var idx = $(this).parent().parent().attr("data-idx");
	$("#tbdSchoolAdd tr:eq(0)").attr("data-idx", idx);
	console.log("input idx is " + idx);
	var date = $(this).parent().parent().children().eq(0).attr("data-date");
	$("#schoolSyear").val(date.substr(0,4));
	$("#schoolSmonth").val(date.substr(4,2));
	$("#schoolEyear").val(date.substr(6,4));
	$("#schoolEmonth").val(date.substr(10,2));
	$("#schoolName").val($(this).parent().parent().children().eq(1).text());
	$("#schoolMajor").val($(this).parent().parent().children().eq(2).text());
	$("#schoolSttsCd").val($(this).parent().parent().children().eq(3).attr("data-code"));
	$("#schoolLoc").val($(this).parent().parent().children().eq(4).text());
	$("#btnAddSchool").val("저장");
	$("#btnAddSchool").attr("data-flag", "U");
});
// 학력 삭제 버튼 이벤트
$(document).on("click", "input[name=btnDelSchoolInfo]", function() {
	var idx = $(this).parent().parent().attr("data-idx");
	deleteSchoolInfo(idx);
});
// 경력 추가 버튼 이벤트
$(document).on("click", "#btnAddCompany", function() {
	var flag = $(this).attr("data-flag")
	console.log("flag is " + flag);
	
	switch(flag) {
	case "C" :
		insertCompanyInfo();
		break;
	case "U" :
		console.log(1);
		updateCompanyInfo();
		break;
	}
});
// 경력 취소 버튼 이벤트
$(document).on("click", "#btnCancelCompany", function() {
	init("COMPANY");
});
// 경력 수정 버튼 이벤트
$(document).on("click", "input[name=btnModiCompanyInfo]", function() {
	
	var idx = $(this).parent().parent().attr("data-idx");
	$("#tbdCompanyAdd tr:eq(0)").attr("data-idx", idx);
	console.log("input idx is " + idx);
	var date = $(this).parent().parent().children().eq(0).attr("data-date");
	$("#companySyear").val(date.substr(0,4));
	$("#companySmonth").val(date.substr(4,2));
	$("#companyEyear").val(date.substr(6,4));
	$("#companyEmonth").val(date.substr(10,2));
	$("#companyName").val($(this).parent().parent().children().eq(1).text());
	$("#companyPosCd").val($(this).parent().parent().children().eq(2).attr("data-code"));
	$("#companyDept").val($(this).parent().parent().children().eq(3).text());
	$("#companySal").val(cmmGetNum($(this).parent().parent().children().eq(4).text()));
	$("#companyResiRsn").val($(this).parent().parent().children().eq(5).text());
	$("#btnAddCompany").val("저장");
	$("#btnAddCompany").attr("data-flag", "U");
});
// 경력 삭제 버튼 이벤트
$(document).on("click", "input[name=btnDelCompanyInfo]", function() {
	var idx = $(this).parent().parent().attr("data-idx");
	deleteCompanyInfo(idx);
});
// 자격사항 추가 버튼 이벤트
$(document).on("click", "#btnAddCerti", function() {
	var flag = $(this).attr("data-flag")
	console.log("flag is " + flag);
	
	switch(flag) {
	case "C" :
		insertCertiInfo();
		break;
	case "U" :
		console.log(1);
		updateCertiInfo();
		break;
	}
});
// 자격사항 취소 버튼 이벤트
$(document).on("click", "#btnCancelCerti", function() {
	init("CERTI");
});

// 자격사항 수정 버튼 이벤트
$(document).on("click", "input[name=btnModiCertiInfo]", function() {
	
	var idx = $(this).parent().parent().attr("data-idx");
	$("#tbdCertiAdd tr:eq(0)").attr("data-idx", idx);
	console.log("input idx is " + idx);
	
	$("#certiName").val($(this).parent().parent().children().eq(0).text());
	var date = $(this).parent().parent().children().eq(1).attr("data-date");
	$("#certiYear").val(date.substr(0,4));
	$("#certiMonth").val(date.substr(4,2));
	
	$("#btnAddCerti").val("저장");
	$("#btnAddCerti").attr("data-flag", "U");
});
// 자격사항 삭제 버튼 이벤트
$(document).on("click", "input[name=btnDelCertiInfo]", function() {
	var idx = $(this).parent().parent().attr("data-idx");
	deleteCertiInfo(idx);
});
// 가족 추가 버튼 이벤트
$(document).on("click", "#btnAddFam", function() {
	var flag = $(this).attr("data-flag")
	console.log("flag is " + flag);
	
	switch(flag) {
	case "C" :
		insertFamInfo();
		break;
	case "U" :
		updateFamInfo();
		break;
	}
});
// 가족 취소 버튼 이벤트
$(document).on("click", "#btnCancelFam", function() {
	init("FAM");
});

// 가족 수정 버튼 이벤트
$(document).on("click", "input[name=btnModiFamInfo]", function() {
	
	var idx = $(this).parent().parent().attr("data-idx");
	$("#tbdFamAdd tr:eq(0)").attr("data-idx", idx);
	console.log("input idx is " + idx);
	
	$("#famRelations").val($(this).parent().parent().children().eq(0).text());
	$("#famName").val($(this).parent().parent().children().eq(1).text());
	$("#famAge").val($(this).parent().parent().children().eq(2).text());
	$("#famJob").val($(this).parent().parent().children().eq(3).text());
	$("#famTogetherSttsCd").prop("checked", $(this).parent().parent().children().eq(4).text());
	
	$("#btnAddFam").val("저장");
	$("#btnAddFam").attr("data-flag", "U");
});
// 자격사항 삭제 버튼 이벤트
$(document).on("click", "input[name=btnDelFamInfo]", function() {
	var idx = $(this).parent().parent().attr("data-idx");
	deleteFamInfo(idx);
});

$(document).on("click", "#btnFilePopup", function() {
	console.log("done");
	var url = 'photoPopup';
	console.log(window.open(url ,'photoPopup','left=0,top=0,width=550,height=180,scrollbars=no'));
});

/**************************************************
 * CRUD 함수 정의
 **************************************************/
/** 입사자 정보 select 함수 */
function selectAplcntForm() {
	var getParam = new nMap();
	
	var DB_CRUD = "R";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "selectAplcntForm");
	
	getParam.put("aplcntFormIdx", aplcntFormIdx);
	
	var postData = getParam.toJSONString();
	
	console.log(postData);
	
	var cbf = function(rs, elementId) {
		console.log("조회 콜백");
		
		deleteChildElements(elementId);
		
		if(rs.length>0) {
			rs = rs[0]
			$("#aplcntPhotoNm").attr("src", gFileSrc + rs.aplcntPhotoNm);
			$("#aplcntPhotoNm").attr("data-src", gFileSrc + rs.aplcntPhotoNm);
			$("#korName").val(rs.korName);
			$("#chnName").val(rs.chnName);
			$("#engName").val(rs.engName);
			$("#ihidnum").val(rs.ihidnum);
			$("#addr1").val(rs.addr1);
			$("#addr2").val(rs.addr2);
			$("#mobilenum").val(rs.mobilenum);
			$("#phonenum").val(rs.phonenum);
			$("#email").val(rs.email);
			$(":radio[name='disabledSttsCd']:radio[value='"+rs.disabledSttsCd+"']").prop("checked", true);
			$(":radio[name='bohunSttsCd']:radio[value='"+rs.bohunSttsCd+"']").prop("checked", true);
			$(":radio[name='maritalSttsCd']:radio[value='"+rs.maritalSttsCd+"']").prop("checked", true);
			
			$("#engLvCd").val(rs.engLvCd);
			$("#excelLvCd").val(rs.excelLvCd);
			$("#specialty").val(rs.specialty);
			$("#milDischargedCd").val(rs.milDischargedCd);
			$("#milServ").val(rs.milServ);
			$("#jpnLvCd").val(rs.jpnLvCd);
			$("#pptLvCd").val(rs.pptLvCd);
			$("#hobby").val(rs.hobby);
			
			$("#milSyear").val(rs.milSdate.substr(0,4));
			$("#milSmonth").val(rs.milSdate.substr(4,2));
			$("#milEyear").val(rs.milEdate.substr(0,4));
			$("#milEmonth").val(rs.milEdate.substr(4,2));		
			
			
			$("#milSdate").val(rs.milSdate);
			$("#milEdate").val(rs.milEdate);
			$("#milRankCd").val(rs.milRankCd);
			$("#etclang").val(rs.etclang);
			$("#etclangLvCd").val(rs.etclangLvCd);
			$("#typingSpd").val(rs.typingSpd);
			$("#religion").val(rs.religion);
			$("#exemptionRsn").val(rs.exemptionRsn);
			$("#factAgrmntCd").val(rs.factAgrmntCd);
		}
	}
	crudAction(DB_CRUD, postData, cbf);
}
/** 입사자 정보 Update 함수 */
function updateAplcntForm() {
	
	var korName = $("#korName").val();
	var chnName = $("#chnName").val();
	var engName = $("#engName").val();
	var ihidnum = $("#ihidnum").val();
	var addr1 = $("#addr1").val();
	var addr2 = $("#addr2").val();
	var mobilenum = $("#mobilenum").val();
	var phonenum = $("#phonenum").val();
	var email = $("#email").val();
	var disabledSttsCd = $(":radio[name=disabledSttsCd]:checked").val();
	var maritalSttsCd = $(":radio[name=maritalSttsCd]:checked").val();
	var disabledSttsCd = $(":radio[name=disabledSttsCd]:checked").val();

	var engLvCd = $("#engLvCd").val();
	var excelLvCd = $("#excelLvCd").val();
	var specialty = $("#specialty").val();
	var milDischargedCd = $("#milDischargedCd").val();
	var milServ = $("#milServ").val();
	var jpnLvCd = $("#jpnLvCd").val();
	var pptLvCd = $("#pptLvCd").val();
	var hobby = $("#hobby").val();
	var milSdate = $("#milSyear").val() + $("#milSmonth").val();
	var milEdate = $("#milEyear").val() + $("#milEmonth").val();
	var milRankCd = $("#milRankCd").val();
	var etclang = $("#etclang").val();
	var etclangLvCd = $("#etclangLvCd").val();
	var typingSpd = $("#typingSpd").val();
	var religion = $("#religion").val();
	var exemptionRsn = $("#exemptionRsn").val();
	var factAgrmntCd = $("#factAgrmntCd:checked").val();
	
	// 맵 객체 선언
	var getParam = new nMap();
	
	// DB 트랜잭션 설정
	var DB_CRUD = "R";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "updateAplcntForm");
	
	// 파라미터 할당
	getParam.put("aplcntFormIdx", aplcntFormIdx);
	getParam.put("aplcntId", aplcntId);
	
	getParam.put("aplcntPhotoNm", aplcntPhotoNm);
	getParam.put("korName", korName);
	getParam.put("chnName", chnName);
	getParam.put("engName", engName);
	getParam.put("ihidnum", ihidnum);
	getParam.put("addr1", addr1);
	getParam.put("addr2", addr2);
	getParam.put("mobilenum", mobilenum);
	getParam.put("phonenum", phonenum);
	getParam.put("email", email);
	getParam.put("disabledSttsCd", disabledSttsCd);
	getParam.put("maritalSttsCd", maritalSttsCd);
	getParam.put("disabledSttsCd", disabledSttsCd);
	
	getParam.put("engLvCd", engLvCd);
	getParam.put("excelLvCd", excelLvCd);
	getParam.put("specialty", specialty);
	getParam.put("milDischargedCd", milDischargedCd);
	getParam.put("milServ", milServ);
	getParam.put("jpnLvCd", jpnLvCd);
	getParam.put("pptLvCd", pptLvCd);
	getParam.put("hobby", hobby);
	getParam.put("milSdate", milSdate);
	getParam.put("milEdate", milEdate);
	getParam.put("milRankCd", milRankCd);
	getParam.put("etclang", etclang);
	getParam.put("etclangLvCd", etclangLvCd);
	getParam.put("typingSpd", typingSpd);
	getParam.put("religion", religion);
	getParam.put("exemptionRsn", exemptionRsn);
	getParam.put("factAgrmntCd", factAgrmntCd);

	// JSON 문자열로 변환
	var postData = getParam.toJSONString();
	
	// 로그 확인
	console.log(postData);
	
	// 콜백함수 정의
	var cbf = function(rs, elementId) {
		console.log("done");
		var url = 'fillOutFormPreview';
	    window.open(url ,'fillOutFormPreview','left=0,top=0,width=720,height=900,scrollbars=yes');
	};
	
	// AJAX 호출 및 콜백 함수
	crudAction(DB_CRUD, postData, cbf);
}

/** 입사자 사잔 Update 함수 */
function updateAplcntPhotoNm() {
	
	var aplcntPhotoNm = $("#aplcntPhotoNm").attr("data-src");
	
	// 맵 객체 선언
	var getParam = new nMap();
	
	// DB 트랜잭션 설정
	var DB_CRUD = "R";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "updateAplcntPhotoNm");
	
	// 파라미터 할당
	getParam.put("aplcntFormIdx", aplcntFormIdx);
	getParam.put("aplcntId", aplcntId);
	
	getParam.put("aplcntPhotoNm", aplcntPhotoNm);

	// JSON 문자열로 변환
	var postData = getParam.toJSONString();
	
	// 로그 확인
	console.log(postData);
	
	// 콜백함수 정의
	var cbf = function(rs, elementId) {
		
	};
	
	// AJAX 호출 및 콜백 함수
	crudAction(DB_CRUD, postData, cbf);
}

/** 학력리스트 조회 */
function selectSchoolInfo() {
	
	var getParam = new nMap();
	
	var DB_CRUD = "R";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "selectSchoolInfo");
	
	getParam.put("aplcntFormIdx", aplcntFormIdx);
	getParam.put("sectionCd", sectionCd1);
	
	var postData = getParam.toJSONString();
	
	console.log(postData);
	
	var cbf = function(rs, elementId) {
		console.log("조회 콜백");
		
		deleteChildElements(elementId);
		
		if(rs.length>0) {
			for(var i in rs) {
				console.log("i:"+i);
				var tr = document.createElement("tr");
				tr.setAttribute("data-idx", rs[i].aplcntOrgIdx);
				
				for(var j=0;j<6;j++) {
					var td = document.createElement("td");
					tr.appendChild(td);
				}
				var sYear = rs[i].orgSdate.substr(0,4);
				var sMonth = rs[i].orgSdate.substr(4,2);
				var eYear = rs[i].orgEdate.substr(0,4);
				var eMonth = rs[i].orgEdate.substr(4,2);
				tr.childNodes.item(0).appendChild(document.createTextNode(sYear+"."+sMonth+" ~ "+eYear+"."+eMonth));
				tr.childNodes.item(0).setAttribute("data-date", sYear+sMonth+eYear+eMonth);
				tr.childNodes.item(1).appendChild(document.createTextNode(rs[i].orgName));
				tr.childNodes.item(2).appendChild(document.createTextNode(rs[i].orgDept));
				var orgSttdCd = rs[i].orgSttsCd;
				if(!isNull(orgSttdCd)) {
					tr.childNodes.item(3).appendChild(document.createTextNode($("#schoolSttsCd > option[value=" + orgSttdCd + "]").text()));
					tr.childNodes.item(3).setAttribute("data-code", orgSttdCd);
				}
				tr.childNodes.item(4).appendChild(document.createTextNode(rs[i].orgLoc));
				var htmlScript = "<input type='button' name='btnModiSchoolInfo' value='수정'>";
				htmlScript += "<input type='button' name='btnDelSchoolInfo' value='삭제'>"; 
				tr.childNodes.item(5).innerHTML = htmlScript;
				document.getElementById(elementId).appendChild(tr);
			}
		}
	}
	crudAction(DB_CRUD, postData, cbf, "tbdSchoolList");
}

/** 학력 Insert */
function insertSchoolInfo() {
	
	var sDate = $("#schoolSyear").val() + $("#schoolSmonth").val();
	var eDate = $("#schoolEyear").val() + $("#schoolEmonth").val();
	var schoolName = $("#schoolName").val();
	var schoolMajor = $("#schoolMajor").val();
	var schoolSttsCd = $("#schoolSttsCd").val();
	var schoolLoc = $("#schoolLoc").val();
	
	var getParam = new nMap();
	
	var DB_CRUD = "C";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "insertSchoolInfo");
	
	//TODO 테스트 후 삭제하기
	getParam.put("aplcntFormIdx", aplcntFormIdx);
	getParam.put("sectionCd", sectionCd1);
	getParam.put("modifierId", modifierId);
	getParam.put("sDate", sDate);
	getParam.put("eDate", eDate);
	getParam.put("schoolName", schoolName);
	getParam.put("schoolMajor", schoolMajor);
	getParam.put("schoolSttsCd", schoolSttsCd);
	getParam.put("schoolLoc", schoolLoc);
	
	var postData = getParam.toJSONString();
	
	console.log(postData);
	
	var cbf = function(rs, elementId) {
		selectSchoolInfo();
		init("SCHOOL");
	};
	
	crudAction(DB_CRUD, postData, cbf);
}
/** 학력 Update */
function updateSchoolInfo() {
	
	var aplcntOrgIdx = $("#tbdSchoolAdd tr:eq(0)").attr("data-idx");
	// TODO 세션ID로 변경하기
	
	var sDate = $("#schoolSyear").val() + $("#schoolSmonth").val();
	var eDate = $("#schoolEyear").val() + $("#schoolEmonth").val();
	var schoolName = $("#schoolName").val();
	var schoolMajor = $("#schoolMajor").val();
	var schoolSttsCd = $("#schoolSttsCd").val();
	var schoolLoc = $("#schoolLoc").val();
	
	var getParam = new nMap();
	
	var DB_CRUD = "U";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "updateSchoolInfo");
	
	getParam.put("aplcntFormIdx", aplcntFormIdx);
	getParam.put("sectionCd", sectionCd1);
	getParam.put("aplcntOrgIdx", aplcntOrgIdx);
	getParam.put("modifierId", modifierId);
	getParam.put("sDate", sDate);
	getParam.put("eDate", eDate);
	getParam.put("schoolName", schoolName);
	getParam.put("schoolMajor", schoolMajor);
	getParam.put("schoolSttsCd", schoolSttsCd);
	getParam.put("schoolLoc", schoolLoc);
	
	var postData = getParam.toJSONString();
	
	console.log(postData);
	
	var cbf = function(rs, elementId) {
		selectSchoolInfo();
		init("SCHOOL");
	};
	crudAction(DB_CRUD, postData, cbf);
}
/** 학력 삭제 */
function deleteSchoolInfo(idx) {
	
	var aplcntOrgIdx = idx;
	
	var getParam = new nMap();
	
	var DB_CRUD = "U";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "deleteSchoolInfo");
	
	getParam.put("aplcntOrgIdx", aplcntOrgIdx);
	getParam.put("modifierId", modifierId);
	
	var postData = getParam.toJSONString();
	
	console.log(postData);
	
	var cbf = function(rs, elementId) {
		selectSchoolInfo();
		init("SCHOOL");
	};
	crudAction(DB_CRUD, postData, cbf);
}
/** 경력 리스트 조회 */
function selectCompanyInfo() {
	
	var getParam = new nMap();
	
	var DB_CRUD = "R";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "selectCompanyInfo");
	
	getParam.put("aplcntFormIdx", aplcntFormIdx);
	getParam.put("sectionCd", sectionCd2);
	
	var postData = getParam.toJSONString();
	
	console.log(postData);
	
	var cbf = function(rs, elementId) {
		console.log("조회 콜백");
		
		deleteChildElements(elementId);
		
		if(rs.length>0) {
			for(var i in rs) {
				console.log("i:"+i);
				var tr = document.createElement("tr");
				tr.setAttribute("data-idx", rs[i].aplcntOrgIdx);
				
				for(var j=0;j<7;j++) {
					var td = document.createElement("td");
					tr.appendChild(td);
				}
				var sYear = rs[i].orgSdate.substr(0,4);
				var sMonth = rs[i].orgSdate.substr(4,2);
				var eYear = rs[i].orgEdate.substr(0,4);
				var eMonth = rs[i].orgEdate.substr(4,2);
				tr.childNodes.item(0).appendChild(document.createTextNode(sYear+"."+sMonth+" ~ "+eYear+"."+eMonth));
				tr.childNodes.item(0).setAttribute("data-date", sYear+sMonth+eYear+eMonth);
				tr.childNodes.item(1).appendChild(document.createTextNode(rs[i].orgName));
				var orgPosCd = rs[i].orgPosCd;
				if(!isNull(orgPosCd)) {
					tr.childNodes.item(2).appendChild(document.createTextNode($("#companyPosCd > option[value=" + orgPosCd + "]").text()));
					tr.childNodes.item(2).setAttribute("data-code", orgPosCd);
				}
				tr.childNodes.item(3).appendChild(document.createTextNode(rs[i].orgDept));
				tr.childNodes.item(4).appendChild(document.createTextNode(cmmToCommaUnit(rs[i].orgSal)+"만원"));
				tr.childNodes.item(5).appendChild(document.createTextNode(rs[i].orgResiRsn));
				var htmlScript = "<input type='button' name='btnModiCompanyInfo' value='수정'>";
				htmlScript += "<input type='button' name='btnDelCompanyInfo' value='삭제'>"; 
				tr.childNodes.item(6).innerHTML = htmlScript;
				document.getElementById(elementId).appendChild(tr);
			}
		}
	}
	crudAction(DB_CRUD, postData, cbf, "tbdCompanyList");
}
/** 경력 Insert */
function insertCompanyInfo() {
	
	var sDate = $("#companySyear").val() + $("#companySmonth").val();
	var eDate = $("#companyEyear").val() + $("#companyEmonth").val();
	var companyName = $("#companyName").val();
	var companyPosCd = $("#companyPosCd").val();
	var companyDept = $("#companyDept").val();
	var companySal = $("#companySal").val();
	var companyResiRsn = $("#companyResiRsn").val();
	
	var getParam = new nMap();
	
	var DB_CRUD = "C";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "insertCompanyInfo");
	
	//TODO 테스트 후 삭제하기
	getParam.put("aplcntFormIdx", aplcntFormIdx);
	getParam.put("sectionCd", sectionCd2);
	getParam.put("modifierId", modifierId);
	
	getParam.put("sDate", sDate);
	getParam.put("eDate", eDate);
	getParam.put("companyName", companyName);
	getParam.put("companyPosCd", companyPosCd);
	getParam.put("companyDept", companyDept);
	getParam.put("companySal", companySal);
	getParam.put("companyResiRsn", companyResiRsn);
	
	var postData = getParam.toJSONString();
	
	console.log(postData);

	var cbf = function(rs, elementId) {
		selectCompanyInfo();
		init("COMPANY");
	};
	
	crudAction(DB_CRUD, postData, cbf);
}

/** 경력 Update */
function updateCompanyInfo() {
	
	var aplcntOrgIdx = $("#tbdCompanyAdd tr:eq(0)").attr("data-idx");
	// TODO 세션ID로 변경하기
	
	var sDate = $("#companySyear").val() + $("#companySmonth").val();
	var eDate = $("#companyEyear").val() + $("#companyEmonth").val();
	var companyName = $("#companyName").val();
	var companyPosCd = $("#companyPosCd").val();
	var companyDept = $("#companyDept").val();
	var companySal = $("#companySal").val();
	var companyResiRsn = $("#companyResiRsn").val();
	
	var getParam = new nMap();
	
	var DB_CRUD = "U";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "updateCompanyInfo");
	
	
	//TODO 테스트 후 삭제하기
	getParam.put("aplcntFormIdx", aplcntFormIdx);
	getParam.put("sectionCd", sectionCd2);
	getParam.put("aplcntOrgIdx", aplcntOrgIdx);
	getParam.put("modifierId", modifierId);
	
	getParam.put("sDate", sDate);
	getParam.put("eDate", eDate);
	getParam.put("companyName", companyName);
	getParam.put("companyPosCd", companyPosCd);
	getParam.put("companyDept", companyDept);
	getParam.put("companySal", companySal);
	getParam.put("companyResiRsn", companyResiRsn);
	
	var postData = getParam.toJSONString();
	
	console.log(postData);
	
	var cbf = function(rs, elementId) {
		selectCompanyInfo();
		init("COMPANY");
	};
	crudAction(DB_CRUD, postData, cbf);
}
/** 경력 Delete */
function deleteCompanyInfo(idx) {
	
	var aplcntOrgIdx = idx;
	
	var getParam = new nMap();
	
	var DB_CRUD = "U";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "deleteCompanyInfo");
	
	getParam.put("aplcntOrgIdx", aplcntOrgIdx);
	getParam.put("modifierId", modifierId);
	
	var postData = getParam.toJSONString();
	
	console.log(postData);
	
	var cbf = function(rs, elementId) {
		selectCompanyInfo();
		init("COMPANY");
	};
	crudAction(DB_CRUD, postData, cbf);
}
/** 자격사항 Insert */
function insertCertiInfo() {
	
	var sDate = $("#certiYear").val() + $("#certiMonth").val();
	var certiName = $("#certiName").val();
	
	var getParam = new nMap();
	
	var DB_CRUD = "C";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "insertCertiInfo");
	
	//TODO 테스트 후 삭제하기
	getParam.put("aplcntFormIdx", aplcntFormIdx);
	getParam.put("sectionCd", sectionCd3);
	getParam.put("modifierId", modifierId);
	
	getParam.put("sDate", sDate);
	getParam.put("certiName", certiName);
	
	var postData = getParam.toJSONString();
	
	console.log(postData);

	var cbf = function(rs, elementId) {
		selectCertiInfo();
		init("CERTI");
	};
	
	crudAction(DB_CRUD, postData, cbf);
}
/** 자격사항 리스트 조회 */
function selectCertiInfo() {
	
	var getParam = new nMap();
	
	var DB_CRUD = "R";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "selectCertiInfo");
	
	getParam.put("aplcntFormIdx", aplcntFormIdx);
	getParam.put("sectionCd", sectionCd3);
	
	var postData = getParam.toJSONString();
	
	console.log(postData);
	
	var cbf = function(rs, elementId) {
		console.log("조회 콜백");
		
		deleteChildElements(elementId);
		
		if(rs.length>0) {
			for(var i in rs) {
				console.log("i:"+i);
				var tr = document.createElement("tr");
				tr.setAttribute("data-idx", rs[i].aplcntOrgIdx);
				
				for(var j=0;j<3;j++) {
					var td = document.createElement("td");
					tr.appendChild(td);
				}
								
				var sYear = rs[i].orgSdate.substr(0,4);
				var sMonth = rs[i].orgSdate.substr(4,2);
				
				tr.childNodes.item(0).appendChild(document.createTextNode(rs[i].orgName));
				tr.childNodes.item(1).appendChild(document.createTextNode(sYear+"."+sMonth));
				tr.childNodes.item(1).setAttribute("data-date", sYear+sMonth);

				var htmlScript = "<input type='button' name='btnModiCertiInfo' value='수정'>";
				htmlScript += "<input type='button' name='btnDelCertiInfo' value='삭제'>"; 
				tr.childNodes.item(2).innerHTML = htmlScript;
				
				document.getElementById(elementId).appendChild(tr);
			}
		}
	}
	crudAction(DB_CRUD, postData, cbf, "tbdCertiList");
}
/** 자격사항 Update */
function updateCertiInfo() {
	
	var aplcntOrgIdx = $("#tbdCertiAdd tr:eq(0)").attr("data-idx");
	// TODO 세션ID로 변경하기
	
	var sDate = $("#certiYear").val() + $("#certiMonth").val();
	var certiName = $("#certiName").val();
		
	var getParam = new nMap();
	
	var DB_CRUD = "U";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "updateCertiInfo");
	
	//TODO 테스트 후 삭제하기
	getParam.put("aplcntFormIdx", aplcntFormIdx);
	getParam.put("sectionCd", sectionCd3);
	getParam.put("aplcntOrgIdx", aplcntOrgIdx);
	getParam.put("modifierId", modifierId);
	
	getParam.put("sDate", sDate);
	getParam.put("certiName", certiName);
	
	var postData = getParam.toJSONString();
	
	console.log(postData);
	
	var cbf = function(rs, elementId) {
		selectCertiInfo();
		init("CERTI");
	};
	crudAction(DB_CRUD, postData, cbf);
}
/** 자격사항 Delete */
function deleteCertiInfo(idx) {
	
	var aplcntOrgIdx = idx;
	
	var getParam = new nMap();
	
	var DB_CRUD = "U";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "deleteCertiInfo");
	
	getParam.put("aplcntOrgIdx", aplcntOrgIdx);
	getParam.put("modifierId", modifierId);
	
	var postData = getParam.toJSONString();
	
	console.log(postData);
	
	var cbf = function(rs, elementId) {
		selectCertiInfo();
		init("CERTI");
	};
	crudAction(DB_CRUD, postData, cbf);
}
/** 가족 Insert */
function insertFamInfo() {
	
	var famRelations = $("#famRelations").val();
	var famName = $("#famName").val();
	var famAge = $("#famAge").val();
	var famJob = $("#famJob").val();
	var famTogetherSttsCd = $("#famTogetherSttsCd").prop("checked");
	
	var getParam = new nMap();
	
	var DB_CRUD = "C";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "insertFamInfo");
	
	//TODO 테스트 후 삭제하기
	getParam.put("aplcntFormIdx", aplcntFormIdx);
	getParam.put("modifierId", modifierId);
	
	getParam.put("famRelations", famRelations);
	getParam.put("famName", famName);
	getParam.put("famAge", famAge);
	getParam.put("famJob", famJob);
	getParam.put("famTogetherSttsCd", famTogetherSttsCd);
	
	var postData = getParam.toJSONString();
	
	console.log(postData);

	var cbf = function(rs, elementId) {
		selectFamInfo();
		init("FAM");
	};
	
	crudAction(DB_CRUD, postData, cbf);
}
/** 가족 리스트 조회 */
function selectFamInfo() {
	
	var getParam = new nMap();
	
	var DB_CRUD = "R";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "selectFamInfo");
	
	getParam.put("aplcntFormIdx", aplcntFormIdx);
	
	var postData = getParam.toJSONString();
	
	console.log(postData);
	
	var cbf = function(rs, elementId) {
		console.log("조회 콜백");
		
		deleteChildElements(elementId);
		
		if(rs.length>0) {
			for(var i in rs) {
				console.log("i:"+i);
				var tr = document.createElement("tr");
				tr.setAttribute("data-idx", rs[i].aplcntFamIdx);
				
				for(var j=0;j<6;j++) {
					var td = document.createElement("td");
					tr.appendChild(td);
				}
								
				tr.childNodes.item(0).appendChild(document.createTextNode(rs[i].famRelations));
				tr.childNodes.item(1).appendChild(document.createTextNode(rs[i].famName));
				tr.childNodes.item(2).appendChild(document.createTextNode(rs[i].famAge));
				tr.childNodes.item(3).appendChild(document.createTextNode(rs[i].famJob));
				tr.childNodes.item(4).appendChild(document.createTextNode(rs[i].famTogetherSttsCd));

				var htmlScript = "<input type='button' name='btnModiFamInfo' value='수정'>";
				htmlScript += "<input type='button' name='btnDelFamInfo' value='삭제'>"; 
				tr.childNodes.item(5).innerHTML = htmlScript;
				
				document.getElementById(elementId).appendChild(tr);
			}
		}
	}
	crudAction(DB_CRUD, postData, cbf, "tbdFamList");
}
/** 가족사항 Update */
function updateFamInfo() {
	
	var aplcntFamIdx = $("#tbdFamAdd tr:eq(0)").attr("data-idx");
	// TODO 세션ID로 변경하기
	
	var famRelations = $("#famRelations").val();
	var famName = $("#famName").val();
	var famAge = $("#famAge").val();
	var famJob = $("#famJob").val();
	var famTogetherSttsCd = $("#famTogetherSttsCd").prop("checked");

	var getParam = new nMap();
	
	var DB_CRUD = "U";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "updateFamInfo");
	
	//TODO 테스트 후 삭제하기
	getParam.put("aplcntFormIdx", aplcntFormIdx);
	getParam.put("sectionCd", sectionCd3);
	getParam.put("aplcntFamIdx", aplcntFamIdx);
	getParam.put("modifierId", modifierId);
	
	getParam.put("famRelations", famRelations);
	getParam.put("famName", famName);
	getParam.put("famAge", famAge);
	getParam.put("famJob", famJob);
	getParam.put("famTogetherSttsCd", famTogetherSttsCd);
	
	var postData = getParam.toJSONString();
	
	console.log(postData);
	
	var cbf = function(rs, elementId) {
		selectFamInfo();
		init("FAM");
	};
	crudAction(DB_CRUD, postData, cbf);
}
/** 가족 Delete */
function deleteFamInfo(idx) {
	
	var aplcntFamIdx = idx;
	
	var getParam = new nMap();
	
	var DB_CRUD = "U";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "deleteFamInfo");
	
	getParam.put("aplcntFamIdx", aplcntFamIdx);
	getParam.put("modifierId", modifierId);
	
	var postData = getParam.toJSONString();
	
	console.log(postData);
	
	var cbf = function(rs, elementId) {
		selectFamInfo();
		init("FAM");
	};
	crudAction(DB_CRUD, postData, cbf);
}
/** 엘리먼트 초기화 */
function init(condition) {
	console.trace("init." + condition);
	switch (condition) {
	case "SCHOOL":
		$("#tbdSchoolAdd tr:eq(0)").attr("data-idx", "");		
		$("#btnAddSchool").attr("data-flag", "C");
		$("#tbdSchoolAdd input[type=text], #tbdSchoolAdd select").val("");
		$("#btnAddSchool").val("추가");
		break;
	case "COMPANY":
		$("#tbdCompanyAdd tr:eq(0)").attr("data-idx", "");
		$("#btnAddCompany").attr("data-flag", "C");
		$("#tbdCompanyAdd input[type=text], #tbdCompanyAdd select").val("");
		$("#btnAddCompany").val("추가");
		break;
	case "CERTI":
		$("#tbdCertiAdd tr:eq(0)").attr("data-idx", "");
		$("#btnAddCerti").attr("data-flag", "C");
		$("#tbdCertiAdd input[type=text], #tbdCertiAdd select").val("");
		$("#btnAddCerti").val("추가");
		break;
	case "FAM":
		$("#tbdFamAdd tr:eq(0)").attr("data-idx", "");
		$("#btnAddFam").attr("data-flag", "C");
		$("#tbdFamAdd input[type=text], #tbdFamAdd select").val("");
		$("#famTogetherSttsCd").prop("checked", false);
		$("#btnAddFam").val("추가");
	case "APLCNT":
		console.log("이 초기화는 보류.. 굳이 만들 필요없을것 같음");
		break;
	}
}

/**************************************************
 * Debugging 함수
 **************************************************/
// input button click 시 로그 출력
$(document).on("click", "input[id^='btn']", function() {
	console.log($(this).attr("id") + " clicked..");
});

// select change 시 로그 출력
$(document).on("change", "select", function() {
	console.log($(this).val());
});

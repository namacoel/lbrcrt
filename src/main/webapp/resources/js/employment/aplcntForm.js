/**************************************************
 * source		: aplcntForm.js
 * description	: 채용 대상자 등록 양식
 * ************************************************
 * date			author			description
 * ************************************************
 * 2016.05.12	ksw				최초 작성
 * 2017.09.27	ksw				리팩토링
 * ************************************************/

/**************************************************
 * 전역 변수 선언
 **************************************************/

var GRID1 		= "#gridList1";
var FORM1		= "#divDetail";
var _tempAplcntRecruitSite2	= ""; // 코드의 사용여부가 N이어도 나타날수 있도록 조치

var gIsChange = null; // element 값 변경 여부
var gAplcntIdx = ""; // 부모창에서 받은 지원자의 인덱스
//--var dsRecruitSite2; // MGM의 경우 select가 아닌 input으로 사용해야 해서 채용경로2의 select값을 가지고 있도록 사용하는 임시 변수;
//--var dsDeptList; // 채용경로1이 MGM인 경우 채용경로2를 부서코드로 설정하기 위한 변수
//var gFlagNewPopup = false;
//var gFlagSaveClose = false;
var gCondSaveAct = "DEFAULT"; // 저장후 행동 상태
var gFlagScroll = false; // 더블클릭시 스크롤 상/하단 이동 플래그

/**************************************************
 * 화면 초기화를 위한 객체 설정
 **************************************************/
var _pObj = {
		// 지원자폼에서는 부모창에서 job 값을 받아옴 
		job	: "INIT",	// "INIT", "NEW", "MOD", "DEL", ...
		validElementsSrch : "",	// 조회조건 validation 개체
		validElementsForm1 : "",	// validation 대상 리스트
		deptListMap : new nMap(),		// 부서코드 보관
		addrListMap : new nMap(),		// 주소코드 보관
		recruitSite2Map : new nMap(), 	// 채용경로2 코드보관 
		/*initPage:function() { this.init.Variable(); },*/
		/** 변수 초기화 */
		initVariable:function() {
//			 this.validElementsSrch = __getValidElements(FORM_SRCH);
			this.validElementsForm1 = __getValidElements(FORM1);
		},
		/** 셀렉트박스 초기화 */
		initDropDown:function() {
			// DB에서 공통코드 가져오기
			var codeListMap = __appCmm.getMultiCodeBookDB(
					"SEX, HIGHESTEDU, RECRUITSITE1, RECRUITSITE2, PHONEITVWRESULT, ATTDSTTS, ITVWRESULT, OXSTTS"
					);
			
			codeListMap.put("BIZAREA", __appCmm.getBizareaCodeBook());
			this.deptListMap.put("DEPT", __appCmm.getDeptCodeBook());
			__appCmm.setDropDown(codeListMap, "BIZAREA", "aplcntBizarea", "선택", "subNm");
			__appCmm.setBizareaChangeEvent(this.deptListMap.get("DEPT"), "aplcntBizarea", "aplcntDept", "선택", "subNm");
			$("#aplcntBizarea").trigger("change");
			
			__appCmm.setDropDown(codeListMap, "SEX", "aplcntSex", "선택");
			__appCmm.setDropDown(codeListMap, "HIGHESTEDU", "highestEdu", "선택");
			__appCmm.setDropDown(codeListMap, "RECRUITSITE1", "recruitSite1", "선택");
			
			this.recruitSite2Map.put("RECRUITSITE2", codeListMap.get("RECRUITSITE2"));
			__appCmm.setDropDown(this.recruitSite2Map, "RECRUITSITE2", "recruitSite2", "선택");
			
			$("#recruitSite1").trigger("change");
			__appCmm.setDropDown(codeListMap, "PHONEITVWRESULT", "phoneItvwResult", "선택");
			__appCmm.setDropDown(codeListMap, "ATTDSTTS", "eduAttdIttnStts", "선택");
			__appCmm.setDropDown(codeListMap, "ITVWRESULT", "itvwResult", "선택");
			__appCmm.setDropDown(codeListMap, "OXSTTS", "maritalStts", "선택");
			__appCmm.setDropDown(codeListMap, "OXSTTS", "careerStts", "선택");
			__appCmm.setDropDown(codeListMap, "OXSTTS", "blacklist", "선택");
			__appCmm.setDropDown(codeListMap, "OXSTTS", "itvwAttd", "선택");
			__appCmm.setDropDown(codeListMap, "OXSTTS", "eduAttdStts", "선택");
			
			this.addrListMap = __appCmm.getAddrCodeBook();
			__appCmm.setAddrDropDown(this.addrListMap, "D", "addrDo", "")
			__appCmm.setAddrChangeEvent(this.addrListMap, "addrDo", "addrSi", "addrGu");
			$("#addrDo").trigger("change");
			
			 // 주의 : 해당 범위를 좁히는 경우, 값 수정시 목록에 없으면 영향이 발생하므로 적은 범위로는 변경 금지!!!
			__setDropdownTime("itvwTimeH", "itvwTimeM", "", 7, 23, 0, 59); 
			
		},
		/** 유효성, 마스킹 초기화 */
		initMask:function() {
			// 필수값 설정
			$("#receiptDate").prop("required", true);
			$("#aplcntNm").prop("required", true);
			$("#birthday").prop("required", true);
			$("#aplcntSex").prop("required", true);

			// 유효성 설정
			$("#aplcntClass").prop("min", "1");
			$("#aplcntClass").prop("max", "5000");
			$("#emplyNum").upperNumber();
			$("#emplyNum").prop("maxlength", "6");
			$("#emplyNum").prop("pattern", "([0-9A-Z]{1})([0-9]{5})");
			$("#emplyNum").prop("title", "숫자 6자리, 단기는 알파벳1자리+숫자5자리입니다.");
			$("#aplcntNm").prop("maxlength", "50");
			$("#aplcntNm").prop("pattern", "[a-zA-Z0-9가-힣\\s]+");
			$("#aplcntNm").prop("title", "한글, 영문, 숫자만 입력 가능합니다.");
			
			$("#birthday").dateYYYYMask();
			$("#contactInfo").prop("maxlength", "20");
			$("#contactInfo").prop("pattern", "[0-9-]+");
			$("#email").prop("maxlength", "100");
			$("#major").prop("maxlength", "50");
			$("#major").prop("pattern", "[a-zA-Z0-9가-힣\\s]+");
			$("#major").prop("title", "한글, 영문, 숫자만 입력 가능합니다.");
			
			$("#company1").prop("maxlength", "50");
			$("#companyPeriod1").prop("maxlength", "15");
			$("#companyPeriod1").prop("pattern", "[0-9가-힣/~]+");
			$("#companyPeriod1").prop("placeholder", "ex) yyyy/mm~재직중");
			$("#companyPeriod1").prop("title", "2016/06~재직중 또는 2016/06~2016/07 의 형태로 입력해주세요.");
			$("#assignedTask1").prop("maxlength", "50");
			$("#company2").prop("maxlength", "50");
			$("#companyPeriod2").prop("maxlength", "15");
			$("#companyPeriod2").prop("pattern", "[0-9가-힣/~]+");
			$("#companyPeriod2").prop("placeholder", "ex) yyyy/mm~재직중");
			$("#companyPeriod1").prop("title", "2016/06~재직중 또는 2016/06~2016/07 의 형태로 입력해주세요.");
			$("#assignedTask2").prop("maxlength", "50");
			$("#recommender").prop("maxlength", "50");
			$("#recommender").prop("pattern", "[a-zA-Z0-9가-힣\\s]+");
			$("#recommender").prop("title", "한글, 영문, 숫자만 입력 가능합니다.");
			$("#docItvw").prop("maxlength", "1000");
			$("#phoneItvw").prop("maxlength", "1000");
			$("#ptopItvw").prop("maxlength", "1000");
			$("#interviewer").prop("maxlength", "50");
			
		},
		/** 그리드 초기화 */
		initGrid:function() {
			_initGrid1(GRID1);
		},
		/** 데이터 초기화 */
		initData:function() {
			this.setFormStatus(this.job); // job = "INIT" 처리
			this.job = $("#job").val();
			var job =  this.job;
			
			if(job == "NEW") {
				// "NEW"인 경우에도 setFormStatus(gFalg) 실행을 해야하므로 명시 해둠
			} else if(job == "MOD") {
				gAplcntIdx = $("#gAplcntIdx").val();
				selectAplcntForm();
			}
			_pObj.setFormStatus(job);
			_btnObj.setButton(job);
			
			// 화면 init 이후 false로 해줘야 세팅시 발생하는 change로 인해 true로 변경되는 것을 방지한다.
			gIsChange = false;
		},
		/** 페이지 상태 세팅
		 * job(INIT, NEW, MOD, ..)의 값에 따라 개체 초기화, 개체 비/활성화, 버튼 설정
		 * */
		setFormStatus:function(cond) {
			// 없음
			var job = cond;
			this.job = job;
			
			switch(job) {
			case "INIT":
				__elementClear(FORM1);
				__elementDis(FORM1, job, "DIS");

				
				break;
			case "NEW":
				__elementClear(FORM1);
				__elementDis(FORM1, job, "ENA");
				// 초기화시 chain 걸린 개체 추가 작업(setFormStatus에서 __elementClear로 인해 초기화 됨)
				
				$("#receiptDate").val(__toDateFormat(__getDate().left(8),"-"));
				$("#aplcntBizarea").trigger("change");
				$("#emplyNum").trigger("change");
				$("#addrDo").val("D000");
				$("#addrDo").trigger("change");
				$("#recruitSite1").trigger("change");
				$("#eduAttdStts").trigger("change");
				break;
			case "MOD":
				__elementDis(FORM1, job, "ENA");
				break;
			default:
				break;
			}
			
		}
	}
/**************************************************
 * 버튼 상태 설정(버튼/상태의 순서/갯수는 동일해야함)
 **************************************************/
var _btnObj = {
	setButton:function(pJob) {
		var node = document.getElementById("divBtn");
		var div = document.createElement("div");
		var attr = [
		            ["btn btn-default", "btnReset", "fa fa-eraser", "초기화", "NEW"]
		            ,["btn btn-default", "btnSave", "fa fa-save", "저장", "NEW|MOD"]
		            ,["btn btn-default", "btnSaveNew", "fa fa-user-plus", "저장 후 새로작성", "NEW"]
		            ,["btn btn-default", "btnSaveClose", "fa fa-rocket", "저장 후 닫기", "NEW|MOD"]
		            ,["btn btn-default", "btnDelete", "fa fa-trash-o", "삭제", "MOD"]
		            ,["btn btn-default", "btnClose", "fa fa-close", "닫기", "NEW|MOD"]
//		            ,["btn btn-default", "btnSetDummy", "fa fa-commenting-o", "DUMMY", "NEW"]
		          ];
		
		div.setAttribute("class", "btn-group pull-right");
		
		for(var i in attr) {
			if(attr[i][4].indexOf(pJob) > -1) {
				var tagBtn = document.createElement("button");
				var tagI = document.createElement("i");
				
				tagBtn.setAttribute("class", attr[i][0]);
				tagBtn.setAttribute("title", attr[i][3]);
				tagBtn.setAttribute("id", attr[i][1]);
				tagI.setAttribute("class", attr[i][2]);
				tagBtn.appendChild(tagI);
				div.appendChild(tagBtn);
			}
		}
		node.appendChild(div);
	}
};

/**************************************************
 * 페이징 로딩 전 설정
 **************************************************/
$(document).ready(function() {
	_pObj.initVariable();
	_pObj.initDropDown();
	_pObj.initMask();
	_pObj.initGrid();
	_pObj.initData();
	
});

/**************************************************
 * 이벤트 핸들러
 **************************************************/
/** button 태그의 click 이벤트 */
$(document).on("click", "button", function() {
	var elementId = $(this).attr("id");
	
	switch (elementId) {
	case "btnReset":
		if(!__confirmMsg("RESET")) { return; }
		_pObj.setFormStatus("NEW");
		break;
	case "btnSetDummy":
		setDummy();
		break;
	case "btnSave":
		var job =  _pObj.job;
		
		if(!gIsChange) { 
			alert("수정된 내용이 없습니다.");
			return;
		}
		
		if(!__checkValidation(_pObj.validElementsForm1)) { return; }
		
		if(job == "NEW") {
			if(!__confirmMsg("SAVE")) return;
			insertData();
		} else if(job == "MOD") {
			if(!__confirmMsg("UPDATE")) return;
			updateData();
		}
		break;
	case "btnSaveNew":
		gCondSaveAct  = "NEW";
		$("#btnSave").trigger("click");
		break;
	case "btnSaveClose":
		gCondSaveAct  = "CLOSE";
		$("#btnSave").trigger("click");
		break;
	case "btnDelete":
		if(!__confirmMsg("DELETE")) return;
		deleteData();
		break;
		
	case "btnClose":
//		if(!confirm(cmmGetAlertMsg("close"))) return;
		self.close();
		break;
	default:
		break;
	}
});

/** selectbox 태그의 change 이벤트 정의 */ 
$(document).on("change", "select", function() {
	var elementId = $(this).attr("id");
	
	switch (elementId) {
	// 교육참석여부 값이 있는 경우 교육일을 필수값으로 변경 2017.10.10 ksw
	case "eduAttdStts":
		var condition = $("#"+elementId).val();
		
		if(condition == '1' || condition == '2') {
			$("#eduDate").attr("disabled", false);
			$("#eduDate").prop("required", true);
		} else {
			$("#eduDate").attr("disabled", true);
			$("#eduDate").prop("required", false);
		}
		$("#eduDate").val("");
		break;
	// 채용경로1의 변경여부에 따라 채용경로2의 dropdown 변경됨
	case "recruitSite1":
		var siteCode = $(this).val();
		var elementId = "recruitSite2";
		
		if(siteCode == "RCS_MGM") { // RCS_MGM만 input 태그 사용(기타속성을 활용하려고 했으나, 빈도가 적다고 판단하여 그냥 코드그룹으로 함
			__appCmm.setDropDown(_pObj.deptListMap, "DEPT", elementId, "선택(부서)");
			$("#recommender").val("");
			$("#recommender").prop("disabled", false);
		} else if(siteCode == "RCS_SEARCH") {
			__appCmm.setRecruitSite2DropDownUsyn(_pObj.recruitSite2Map.get("RECRUITSITE2"), siteCode, "recruitSite2", "선택(경로)", _tempAplcntRecruitSite2);
			$("#recommender").val("");
			$("#recommender").prop("disabled", false);
		}else {
			__appCmm.setRecruitSite2DropDownUsyn(_pObj.recruitSite2Map.get("RECRUITSITE2"), siteCode, "recruitSite2", "선택(경로)", _tempAplcntRecruitSite2);
			$("#recommender").val("");
			$("#recommender").prop("disabled", true);
		}
		break;
	default:
		break;
	}
});
/* 이름, 생년, 성별이 변경될때마다 중복 지원자 체크 하기 */
$(document).on("change", "#aplcntNm, #birthday, #aplcntSex", function() {
	checkDupAplcnt();
});

/* 사번 입력시 중복 지원자 체크 하기 */
$(document).on("change", "#emplyNum", function() {
	if($(this).val().length !=6) {
		$("#thDuptEmplyNum").html('사번');
		return;
	}
	checkDupemplyNum();
});
/* 더블클릭시 스크롤 상/하단으로 이동시키기 */
$(document).on("dblclick", "div", function(e) {
	document.getSelection().removeAllRanges();
	if (e.target == this && gFlagScroll == false) {
		$('html, body').animate({scrollTop : document.body.scrollHeight}, 100);
		gFlagScroll = true;
	} else if(e.target == this && gFlagScroll == true) {
		$('html, body').animate({scrollTop : 0}, 100);
		gFlagScroll = false;
	} 
});



// 아래 이벤트는 확인 필요..

/* input, select, textarea 변화여부 값 변경 */
$(document).on("change", "input, select, textarea", function() {
	gIsChange = true;
});



/**************************************************
 * Event Handler
 **************************************************/


/*$(document).on("click", "#btnSave", function() {
	if(!gIsChange) {
		alert("수정된 내용이 없습니다.");
		return;
	}
	var aElementId = ["receiptDate", "aplcntClass", "emplyNum", "aplcntNm", "birthdayY",
	                  "aplcntSex", "contactInfo", "email", "itvwDate",
	                  "eduDate", "jobDay", "putDay", "quitDay", "companyPeriod1", "companyPeriod2",
	                  "recruitSite2", "recommender"];
	if(!cmmCheckValidation(aElementId)) return;
	
	switch (gFlag) {
	case "NEW":
		if(!confirm(cmmGetAlertMsg("save"))) return;
		insertAplcntForm();
		break;
	case "MODI":
		if(!confirm(cmmGetAlertMsg("update"))) return;
		updateAplcntForm();
		break;
	}
});*/


/*$(document).on("change", "#aplcntBizarea", function() {
	var value = $(this).val();
	var elementId = "#aplcntDept";
	
	$(elementId).val("");
	$(elementId+" option").filter("[value!='']").hide();
	if(!value) return;
	$(elementId+" option").filter("[data-cdbizarea="+ value + "]").show();
});*/

/*
$(document).on("change", "#addrDo", function() {
	var value = $(this).val();
	var elementId = "#addrSi";

	$(elementId).children("option").hide();
	$(elementId).children("option").filter("[data-upper='"+value+"']").show();
	$(elementId).find("option").each(function() {
		if($(this).css("display")!="none") {
			$(this).prop("selected", true);
			return false;
		}
	});
	$(elementId).trigger("change");
});
$(document).on("change", "#addrSi", function() {
	var value = $(this).val();
	var elementId = "#addrGu";
	
	$(elementId).children("option").hide();
	$(elementId).children("option").filter("[data-upper='"+value+"']").show();
	$(elementId).find("option").each(function() {
		if($(this).css("display")!="none") {
			$(this).prop("selected", true);
			return false;
		}
	});
});
*/

//이름 th 클릭시 스크롤 하단 이동
$(document).on("click", "#thDuptDisp", function() {
    var offset = $("#btnReloadCheckDup").offset();
    $('html, body').animate({scrollTop : document.body.scrollHeight}, 100);
    gFlagScroll = true;
});

// 페이지 이동 이벤트 발생시 데이터 변경 여부를 확인하여 경고창 띄우기
$(window).on("beforeunload", function(){
	// 데이터 변경이 있을경우
	if(gIsChange) return true;
});

/**************************************************
 * CRUD 함수 정의
 **************************************************/
/** 입사자 정보 insert 함수 */

/** 더미 데이터 입력 */
function setDummy() {
	$("#receiptDate").val(__toDateFormat(__getDate().left(8),"-"));
	$("#aplcntBizarea").val("1000");
	$("#aplcntBizarea").trigger("change");
	$("#aplcntDept").val("120000");
	$("#aplcntClass").val("10");
	$("#emplyNum").val("100044");
	$("#emplyNum").trigger("change");
	$("#aplcntNm").val("테스트");
	$("#birthday").val("19820802");
	$("#birthday").trigger("change");
	$("#aplcntSex").val("M");
	$("#addrDo").val("D001");
	$("#addrDo").trigger("change");
	$("#addrSi").val("S003");
	$("#addrSi").trigger("change");
	$("#addrGu").val("G030");
	$("#contactInfo").val("010-4444-6666");
	$("#contactInfo").trigger("change");
	$("#email").val("test@lbhunet.com");
	$("#maritalStts").val("1");
	$("#highestEdu").val("5");
	$("#major").val("개발자");
	$("#careerStts").val("2");
	$("#company1").val("쉴드");
	$("#companyPeriod1").val("2016/08/08~2016/09/09");
	$("#assignedTask1").val("팀관리");
	$("#company2").val("네트워크");
	$("#companyPeriod2").val("1년");
	$("#assignedTask2").val("영업");
	$("#blacklist").val("1");	
	$("#recruitSite1").val("RCS_MGM");
	$("#recruitSite1").trigger("change");
	$("#recruitSite2").val("120000");
	$("#recommender").val("서희승");
	$("#docItvw").val("서류면접내용");
	$("#phoneItvw").val("전화면접내용");
	$("#ptopItvw").val("대면면접내용");
	$("#phoneItvwResult").val("1");
	$("#interviewer").val("서희승, 이병철");
	$("#itvwDate").val("2017-10-27");
	$("#itvwTimeH").val("18");
	$("#itvwTimeM").val("30");
	$("#itvwAttd").val("2");
	$("#itvwResult").val("1");
	$("#eduAttdIttnStts").val("3");
	$("#eduAttdStts").val("1");
	$("#eduAttdStts").trigger("change");
	$("#eduDate").val("2017-10-01");
	$("#jobDay").val("2017-10-02");
	$("#putDay").val("2017-10-03");
	$("#quitDay").val("2017-10-04");
	$("#inid").val("test");
}

function insertData() {
	var postData = new nMap();
	
	postData.put("DB_CRUD", "C");
	postData.put("DB_MAPPER", "aplcntFormMapper");
	postData.put("DB_REQID", "insertAplcntForm");

	// 하위 태그에서 데이터 추출
	postData = __putIntoPostData(FORM1, postData);
	
	postData.put("itvwTime", postData.get("itvwTimeH")+postData.get("itvwTimeM"));
	postData.remove("itvwTimeH");
	postData.remove("itvwTimeM");
	
	postData.remove("aplcntIdx");
	postData.remove("indt");
	postData.remove("inid");
	postData.remove("updt");
	postData.remove("upid");
	
	var cbf = function(rs, elementId) {
		if(isNull(rs.cnt)) {
			return;
		} else {
			gIsChange = false;
			__elementDis(FORM1, job, "DIS");
			$("#btnClose").prop("disabled",false)
			opener.$("#btnSrch").trigger("click");
			opener.$("#gridList1").DataTable().order([1,'desc']).draw()
			
			if(gCondSaveAct == "NEW") {
				$('html, body').animate({scrollTop : 0}, 100);
				window.location.reload(false);
				return;
			} else if (gCondSaveAct == "CLOSE") {
				$("#btnClose").trigger("click");
				return;
			} else {
				/*아무것도 하지 않음*/			
			}
		}
	};
	__serviceCall(CMM_ACTION, postData, false, cbf, "BLOCK");
}

/** 지원저 정보 update 함수 */
function updateData() {
	var postData = new nMap();
	
	postData.put("DB_CRUD", "U");
	postData.put("DB_MAPPER", "aplcntFormMapper");
	postData.put("DB_REQID", "updateAplcntForm");

	// 하위 태그에서 데이터 추출
	postData = __putIntoPostData(FORM1, postData);
	
	postData.put("itvwTime", postData.get("itvwTimeH")+postData.get("itvwTimeM"));
	postData.remove("itvwTimeH");
	postData.remove("itvwTimeM");
	
	postData.remove("indt");
	postData.remove("inid");
	postData.remove("updt");
	postData.remove("upid");
	
	var cbf = function(rs, elementId) {
		if(isNull(rs.cnt)) {
			return;
		} else {
			gIsChange = false;

			$('html, body').animate({scrollTop : 0}, 100);
			
			// opener가 부서별 채용현황이면 새로고침
//			if(opener && opener.location.pathname == "/employment/statRcrtStatusPop") opener.window.location.reload(false); // 새로고침
			if(opener && opener.location.pathname == "/employment/statRcrtStatusPop") opener.$("#itvwDt").trigger("change");
			if(opener && opener.location.pathname == "/employment/statRcrtStatusPopUpd") opener.$("#itvwDt").trigger("change");
			
			// opener의 opener가 부서별 채용현황 팝업이면 재조회 
			if(opener.opener && opener.opener.location.pathname == "/employment/statRcrtStatus") opener.opener.$("#btnSearch").trigger("click");
			
			// 재조회 (재조회 되어도 dataTable의 state를 true로 설정하여 정렬이 유지됨 - 2019.06.28
			opener.$("#btnSrch").trigger("click");
			
			// 2016.10.18.namacoel : 수정후에는 재조회 되지 않도록 변경 요청함.
//			opener.$("#gridList1").DataTable().order([1,'desc']).draw()
			/*opener.$("#tblAplcntList tr").each(function() {
				if($(this).children("td:eq(0)").text() == gAplcntIdx) {
					this.scrollIntoView();
					$(this).trigger("click");
					return false;
				}
			});*/
			/* TODO: 요청사항이 있을 때까진 그냥 둔다. 2016.07.04
			 * 수정 후 부모창의 지원자 목록을 재조회 하고 수정된 행을 찾아서 선택하는 코드이지만
			 * 부모창 조회 후, 창이 달라서 비동기 형태로 진행되어서 추가 수정이 필요하다.
			 * 아마도, 부모창에 값을 보관하는 변수를 만들고, 부모창에서 검색 결과가 완료되는 시점에 이동하도록 해야할 것같다.
			 */
			if(gCondSaveAct == "CLOSE") {
				$("#btnClose").trigger("click");
				return;
			}
			selectAplcntForm();
		}
	};
	
	return __serviceCall(CMM_ACTION, postData, false, cbf, "BLOCK");
}

/** 지원저 정보 delete 함수 */
function deleteData() {
	var postData = new nMap();
	
	postData.put("DB_CRUD", "D");
	postData.put("DB_MAPPER", "aplcntFormMapper");
	postData.put("DB_REQID", "deleteAplcntForm");
	const ACTION = context_path+"/employmentAction/deleteAplcntForm";

	// 하위 태그에서 데이터 추출
//	postData = __putIntoPostData(FORM1, postData);
	
	var aplcntIdx = $("#aplcntIdx").val();
	postData.put("aplcntIdx", aplcntIdx);
	
	var cbf = function(rs, elementId) {
		if(isNull(rs.cnt)) {
			return;
		} else {
			gIsChange = false;

			$('html, body').animate({scrollTop : 0}, 100);
			
			// opener가 부서별 채용현황이면 새로고침
//			if(opener && opener.location.pathname == "/employment/statRcrtStatusPop") opener.window.location.reload(false); // 새로고침
			if(opener && opener.location.pathname == "/employment/statRcrtStatusPop") opener.$("#itvwDt").trigger("change");
			if(opener && opener.location.pathname == "/employment/statRcrtStatusPopUpd") opener.$("#itvwDt").trigger("change");
			
			// opener의 opener가 부서별 채용현황 팝업이면 재조회 
			if(opener.opener && opener.opener.location.pathname == "/employment/statRcrtStatus") opener.opener.$("#btnSearch").trigger("click");
			
			// 재조회 (재조회 되어도 dataTable의 state를 true로 설정하여 정렬이 유지됨 - 2019.06.28
			opener.$("#btnSrch").trigger("click");
			
			// 2016.10.18.namacoel : 수정후에는 재조회 되지 않도록 변경 요청함.
//			opener.$("#gridList1").DataTable().order([1,'desc']).draw()
			/*opener.$("#tblAplcntList tr").each(function() {
				if($(this).children("td:eq(0)").text() == gAplcntIdx) {
					this.scrollIntoView();
					$(this).trigger("click");
					return false;
				}
			});*/
			/* TODO: 요청사항이 있을 때까진 그냥 둔다. 2016.07.04
			 * 수정 후 부모창의 지원자 목록을 재조회 하고 수정된 행을 찾아서 선택하는 코드이지만
			 * 부모창 조회 후, 창이 달라서 비동기 형태로 진행되어서 추가 수정이 필요하다.
			 * 아마도, 부모창에 값을 보관하는 변수를 만들고, 부모창에서 검색 결과가 완료되는 시점에 이동하도록 해야할 것같다.
			 */
			if(gCondSaveAct == "CLOSE") {
				$("#btnClose").trigger("click");
				return;
			}
//			selectAplcntForm();
		}
	};
	
	__serviceCall(ACTION, postData, true, cbf, "BLOCK");
}

/** 지원자 정보 select 함수 */
function selectAplcntForm() {
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "aplcntFormMapper");
	postData.put("DB_REQID", "selectAplcntForm");
	
	postData.put("aplcntIdx", gAplcntIdx);
	
	var cbf = function(rs, elementId) {
		console.log("조회 콜백");
		
		if(rs.length>0) {
			rs = rs[0];
			console.log(rs);
			__bindToDataset(rs);
			// hashmap 세팅 순서를 지정하기는 어렵기 때문에 이벤트가 걸린 개체들은 별개로 처리한다.
			$("#aplcntBizarea").val(rs.aplcntBizarea);
			$("#aplcntBizarea").trigger("change");
			$("#aplcntDept").val(rs.aplcntDept);
			
			$("#addrDo").val(rs.addrDo);
			$("#addrDo").trigger("change");
			$("#addrSi").val(rs.addrSi);
			$("#addrSi").trigger("change");
			$("#addrGu").val(rs.addrGu);
			
			_tempAplcntRecruitSite2 = rs.recruitSite2; // 
			$("#recruitSite1").val(rs.recruitSite1);
			$("#recruitSite1").trigger("change");
			$("#recruitSite2").val(rs.recruitSite2);
			
			$("#recommender").val(rs.recommender);
			$("#eduDate").val(__toDateFormat(rs.eduDate, "-"));
			
			$("#itvwTimeH").val(rs.itvwTime.substr(0,2));
			$("#itvwTimeM").val(rs.itvwTime.substr(2,2));
			
			gIsChange=false; // 조회후 데이터의 변동이 없을테니 false 설정
			// __bindToDataset()에서 birthday와 aplcntsex 세팅시
			// change 이벤트로 인해 checkDupAplcnt() 2회 발생함.. 
			// 위내용 재발 안해서 원복시킴
			checkDupAplcnt(); // 중복 지원자 체크
		}
	}
	__serviceCall(CMM_ACTION, postData, false, cbf, "BLOCK", GRID1);
}

/** 중복 사번 조회 */
function checkDupemplyNum() {
	var aplcntIdx = $("#aplcntIdx").val();
	var emplyNum=$("#emplyNum").val();
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "aplcntFormMapper");
	postData.put("DB_REQID", "checkDupEmplyNum");
	
	postData.put("aplcntIdx", aplcntIdx);
	postData.put("emplyNum", emplyNum);
	
	var cbf = function(rs, elementId) {
		if(rs.length>0) {
			rs = rs[0];
			alert(rs.emplyNum+"는 이미 등록된 사번입니다.\n"
					+"\n순  번 :  "+rs.aplcntIdx
					+"\n사업장 :  "+rs.aplcntBizarea
					+"\n부  서 :  "+rs.aplcntDept
					+"\n기  수 :  "+rs.aplcntClass+"기"
					+"\n사  번 :  "+rs.emplyNum
					+"\n이  름 :  "+rs.aplcntNm
			);
			$("#emplyNum").val("");
			$("#emplyNum").focus();
			$("#thDuptEmplyNum").html('사번');
		} else {
			$("#thDuptEmplyNum").html('사번&nbsp;&nbsp;<i class="fa fa-check fa-lg text-green" title="등록 가능한 사번입니다." style="font-weight:bold"></i>');
		}
	}
	__serviceCall(CMM_ACTION, postData, true, cbf, "BLOCK");
}

/**************************************************
 * 일반 함수 정의
 **************************************************/
/** 중복 지원자 목록 조회 */
function checkDupAplcnt() {
	var aplcntIdx = $("#aplcntIdx").val();
	var aplcntNm = $("#aplcntNm").val();
	var birthday = $("#birthday").numVal().left(4);
	var aplcntSex = $("#aplcntSex").val();
	
	if(isNull(aplcntNm) || isNull(birthday) || isNull(aplcntSex)) return;
	
	$("#btnReloadCheckDup").removeClass("disabled");
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "aplcntFormMapper"); // DB 네임스페이스
	postData.put("DB_REQID", "checkDupAplcnt"); // DB 요청 ID
	
	postData.put("aplcntIdx", aplcntIdx);
	postData.put("aplcntNm", aplcntNm);
	postData.put("birthday", birthday);
	postData.put("aplcntSex", aplcntSex);
	
	var cbf = function(rs, elementId) {
		$("#thDuptDisp").html("이름");
		/*console.log("result count is " + rs.length);
		return;
		$("#thDuptDisp").html("이름");
		
		var header = ["순번","접수일","이름","생년월일","성별", "블랙"];

		var thead = document.createElement("thead");
		var tbody = document.createElement("tbody");
		var theadtr = document.createElement("tr");
		
		var node = document.getElementById(elementId);
		
		if(!node) return;
		while(node.hasChildNodes()) { // node가 가진 자식 노드가 있으면 
			node.removeChild(node.lastChild); // 마지막 자식노드를 삭제
		}
		
		for(var i=0 in header) {
			var th = document.createElement("th");
			th.innerHTML = header[i];
			theadtr.appendChild(th);
		}
		thead.appendChild(theadtr);
		node.appendChild(thead);*/
		
		if(rs.length > 0) {
			$("#thDuptDisp").html('이름&nbsp;&nbsp;<i class="fa fa-exclamation-triangle fa-lg text-red" title="중복 지원자가 있습니다." style="font-weight:bold"></i>');
			/*
			for(var i in rs) {
				var tbodyTr = document.createElement("tr");
				tbodyTr.setAttribute("data-aplcntidx", rs[i].aplcntIdx);
				for(var j in header) {
					var td = document.createElement("td");
					tbodyTr.appendChild(td);
				}
				tbodyTr.childNodes.item(0).appendChild(document.createTextNode(rs[i].aplcntIdx));
				tbodyTr.childNodes.item(1).appendChild(document.createTextNode(cmmToDateFormat(rs[i].receiptDate)));
				tbodyTr.childNodes.item(2).appendChild(document.createTextNode(rs[i].aplcntNm));
				tbodyTr.childNodes.item(3).appendChild(document.createTextNode(cmmToDateFormat(rs[i].birthday)));
				tbodyTr.childNodes.item(4).appendChild(document.createTextNode(rs[i].aplcntSex));
				var blacklist =  rs[i].blacklist;
				if(blacklist == "O") {
					tbodyTr.setAttribute("style", "background-color: cornsilk;");
				}
				tbodyTr.childNodes.item(5).appendChild(document.createTextNode(rs[i].blacklist));

				tbody.appendChild(tbodyTr);
			}
			node.appendChild(tbody);*/
		}
		__setGridData(rs, elementId);
//		cmmDataTable(elementId, false, "desc", true, "250", true);
	};
	__serviceCall(CMM_ACTION, postData, true, cbf, "BLOCK", GRID1);

}

/**************************************************
 * 그리드 정의
 **************************************************/
/** 그리드1 초기화 */
function _initGrid1(elementId) {
	$(elementId).DataTable( {
//	    data: dataSet	// 사용 안하기로 함
		columnDefs: [
		             {"targets": "_all", "createdCell": function(td){ td.setAttribute("title", td.innerText); }}
//		             , {className: "dt-center dt-nowrap", targets: [0,3,7,8]} // 복수 개 선언시 [] 사용하며, _all 이전에 선언해주어야함
		             , {className: "dt-center dt-nowrap", targets: "_all"} // css/bootstrap.min.css에서 table 글씨를좌측 정렬하는 css가 있어서 추가함.
		              ]
		, columns: [
		            { title: "", 			data: null, searchable: false, orderable: false, defaultContent: "" }
		          , { title: "순번",		data: "aplcntIdx" }
		          , { title: "접수일",		data: "receiptDate"  }
		          , { title: "이름",		data: "aplcntNm" }
		          , { title: "생년월일",	data: "birthday", render: __dtMaskDate }
		          , { title: "성별",		data: "aplcntSex" }
		          , { title: "블랙", 		data: "blacklist"}
			    ]
		, searching: false // 자체 검색 기능 여부 	
		, paging: false	// 자체 페이징 기능 여부
	    , info: false // info 기능 여부
		, ordering: false // 정렬 기능 여부
		, order: [[ 1, "asc" ]] // 최초 정렬 기준 설정(컬럼위치, asc/desc)
		, language: { // 테이블 데이터가 없을 때 표시할 내용
		       emptyTable : "조회된 데이터가 없습니다."
		    }
//	    , autoWidth: true
//		, scrollX: true		// true/false 가능
//		, scrollY: "480"
//	    , destroy: true
		, select: {
	        style: "single",  // false : row 선택x, single : row 선택 가능, multi : 여러개 row 선택 가능(라이브러리 추가해야가능)
		}
		,  "initComplete": function () {
			// row 클릭 이벤트 정의
			/*$(document).on("click", GRID1 + ">tbody>tr", function() {
				var data = $(GRID1).DataTable().row( this ).data();
				console.log(data.aplcntIdx);
			});*/
			// 지원자 중복 목록 더블 클릭
			$(document).on("dblclick", GRID1 + ">tbody>tr", function() {
				var data = $(GRID1).DataTable().row( this ).data();
				window.open("aplcntInfoPop?aplcntIdx="+data.aplcntIdx, "aplcntInfoPop", "left=0, top=0, width=930, height=690");
			});
			
        }
		, "rowCallback": function(row, data, index) {
        	if(data.blacklist == 'O') {
        		row.setAttribute("style", "background-color: cornsilk;");
        	}
        }
	});
}

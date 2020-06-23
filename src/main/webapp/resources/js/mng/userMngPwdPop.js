/******************************************
 * Source		: userMngPwdPop
 * Description	: 비밀번호 변경(팝업)
 * ****************************************
 * Date			Author			Description
 * ****************************************
 * 2016.08.28	ksw				최초 작성
 * ****************************************/

var FORM1 		= "#tableDetail1"; 	// 상세정보 개체 Selector
var gUserid		= "";
/** 화면 초기화를 위한 객체 */
var _pObj = {
	job	: "INIT",	// "INIT", "NEW", "MOD", "DEL", ...
	validElements : "",	// validation 대상 리스트

	/*initPage:function() { this.init.Variable(); },*/
	/** 변수 초기화 */
	initVariable:function() {
		this.validElements = __getValidElements(FORM1);
		gUserid = $("#pUserid").val();
	},
	/** 셀렉트박스 초기화 */
	initDropDown:function() {
		// 없음
	},
	/** 그리드 초기화 */
	initGrid:function() {
		// 없음
	},
	/** 유효상, 마스킹 초기화 */
	initMask:function() {
		// 필수값 설정
		$("#newPwd, #newPwdConfirm").prop("required", true);
		
		// 유효성 설정
		$("#password").prop("maxlength", "20");		
	},
	/** 데이터 초기화 */
	/*initData:function() {	},*/
	/** 페이지 상태 세팅
	 * job(INIT, NEW, MOD, ..)의 값에 따라 개체 초기화, 개체 비/활성화, 버튼 설정
	 * */
	setFormStatus:function(cond) {
		var job = cond;
		this.job = job;
		
		switch(job) {
		case "INIT":
			__elementClear(FORM1);
			__elementDis(FORM1, job, "DIS");
			_btnObj.setButton(job);
			break;
		case "NEW":
			__elementClear(FORM1);
			__elementDis(FORM1, job, "ENA");
			_btnObj.setButton(job);
			break;
		case "MOD":
			__elementDis(FORM1, job, "ENA");
			_btnObj.setButton(job);
			break;
		default:
			break;
		}
	}
}
/** 버튼 상태를 설정한다.(버튼/상태의 순서/갯수는 동일해야함) */
var _btnObj = {
	btn:["btnSave"],
	stts:{		INIT 	: [0],	// 초기화
		NEW 	: [1], 	// 추가
		MOD 	: [1]  	// 수정
	},
	setButton:function(cond) {
		if(cond == undefined) { return; }
		if(this.stts[cond] != undefined) {
			for(var i in this.stts[cond]) {
				if(this.stts[cond][i] == 1) {
					$("#"+this.btn[i]).prop("disabled", false);
				} else {
					$("#"+this.btn[i]).prop("disabled", true);
				}
			}
		}
	}
};
/****************************************
 * 초기 이벤트를 설정
 ****************************************/
$(document).ready(function(){
	// onLoad
	_pObj.initVariable();
	// _pObj.initDropDown();
	// _pObj.initGrid();
	_pObj.initMask();
	_pObj.setFormStatus("INIT");
	selectList();
	_pObj.setFormStatus("MOD");
});

/****************************************
 * Event Handler
 ****************************************/
$(document).on("click", "button", function() {
	var elementId = $(this).attr("id");
	
	switch (elementId) {
	case "btnSave":
		var job = _pObj.job;

		if(isNull($("#userid").val())) { return alert("ID가 비어있습니다."); }
		if(!__checkValidation(_pObj.validElements)) { return; }
		if(job == "MOD") {
			if(!__confirmMsg("UPDATE")) { return; }
			if(!updateData()) { return; }
		}
		/* 중요: 함수 return이 false면 아래 코드 실행되지 않도록 __serviceCall의 결과를 return으로 받음 */
		break;
	default:
		break;
	}
});

/** 데이터 목록을 조회한다.*/
function selectList() {
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "userMngMapper"); // DB 네임스페이스
	postData.put("DB_REQID", "selectUserList"); // DB 요청 ID
	
	// 하위 태그에서 데이터 추출
	postData.put("userid", gUserid);
	
	var cbf = function(rs, elementId) {
		if(rs == undefined || rs == "undefined") {
			return;
		} else {
			rs = rs[0];
		}
		__bindToDataset(rs);
	};
	__serviceCall(CMM_ACTION, postData, true, cbf);
}

function updateData() {
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "U");
	postData.put("DB_MAPPER", "userMngMapper");
	postData.put("DB_REQID", "updateUserPwd");

	// 하위 태그에서 데이터 추출
	 postData = __putIntoPostData(FORM1, postData);
	postData.renameKey("password", "newPwd");
//	postData.put("userid", "아이디1");
//	postData.put("password", "비밀번호1");
	
	var cbf = function(rs, elementId) {
//		console.log("AJAX Return : " + rs + " / " + typeof(rs));
	}
	return __serviceCall("updateUserPwd", postData, true, cbf);
}

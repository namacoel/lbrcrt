/*************************************************
 * Source		: userMng.js
 * Description	: 사용자 관리 화면
 * ***********************************************
 * Date			Author		Description
 * ***********************************************
 * 2016.03.07	ksw			최초 작성
 * 2017.07.03	ksw			dataTable 연동
 * ***********************************************/

/**************************************************
 * 전역 변수 선언
 **************************************************/
var FORM_SRCH 	= "#tableSearch"; 	// 검색조건 개체 Selector
var GRID1 		= "#gridList1";		// 그리드1 개체 Selecotr ID
var FORM1 		= "#tableDetail1"; 	// 상세정보 개체 Selector

/**************************************************
 * 화면 초기화를 위한 객체 설정
 **************************************************/
var _pObj = {
	job	: "INIT",	// "INIT", "NEW", "MOD", "DEL", ...
	// validElementsSrch : "",	// 조회조건 validation 개체
	validElementsForm1 : "",	// validation 대상 리스트

	/*initPage:function() { this.init.Variable(); },*/
	/** 변수 초기화 */
	initVariable:function() {
		this.validElementsForm1 = __getValidElements(FORM1);
	},
	/** 셀렉트박스 초기화 */
	initDropDown:function() {
		// DB에서 공통코드 가져오기
		var codeListMap = __appCmm.getMultiCodeBookDB("USERSTTS, USERCLSS, SEX");
		
		// selectBox 세팅
		__appCmm.setDropDown(codeListMap, "USERSTTS", "srchSttscd", "전체");
		__appCmm.setDropDown(codeListMap, "USERSTTS", "sttscd", "선택");
		__appCmm.setDropDown(codeListMap, "USERCLSS", "clsscd", "선택");
		__appCmm.setDropDown(codeListMap, "SEX", "sexcd", "선택");
	},
	/** 유효상, 마스킹 초기화 */
	initMask:function() {
		// 필수값 설정
		$("#userid, #password, #kornm, #clsscd, #sttscd").prop("required", true);
		
		// 유효성 설정
		$("#userid, #srchUserid").prop("maxlength", "20");
		$("#userid, #srchUserid").prop("pattern", "[a-z0-9]+");
		$("#userid, #srchUserid").prop("title", "영문, 숫자만 입력 가능합니다.");
		$("#userid, #srchUserid").lowerNumber();
		
		$("#password").prop("maxlength", "20");
		$("#kornm, #srchKornm").prop("maxlength", "20");
		$("#birthday").dateMask();

		$("#email").prop("maxlength", "50");
		
		$("#emplno").upperNumber();
		$("#emplno").prop("maxlength", "6");
		$("#emplno").prop("pattern", "([0-9A-Z]{1})([0-9]{5})");
		$("#emplno").prop("title", "숫자 6자리, 단기는 알파벳1자리+숫자5자리입니다.");
		
	},
	/** 그리드 초기화 */
	initGrid:function() {
		_initGrid1(GRID1);
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

/**************************************************
 * 버튼 상태 설정(버튼/상태의 순서/갯수는 동일해야함)
 **************************************************/
var _btnObj = {
	btn:["btnNew", "btnSave"],
	stts:{
		INIT 	: [1,0],	// 초기화
		NEW 	: [1,1], 	// 추가
		MOD 	: [1,1]  	// 수정
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
/**************************************************
 * 페이징 로딩 전 설정
 **************************************************/
$(document).ready(function(){
	
	_pObj.initVariable();
	_pObj.initDropDown();
	_pObj.initMask();
	_pObj.initGrid();
	_pObj.setFormStatus("INIT");
	$("#btnSrch").trigger("click");
});

/**************************************************
 * 이벤트 핸들러
 **************************************************/
$(document).on("click", "button", function() {
	var elementId = $(this).attr("id");
	
	switch (elementId) {
	case "btnSrch":
		_pObj.setFormStatus("INIT");
		selectList();
		break;
	case "btnResetSrch":
		__elementClear(FORM_SRCH);
		break;
	case "btnNew":
		_pObj.setFormStatus("NEW");
		break;
	case "btnSave":
		var job = _pObj.job;
//		console.log("_pObj.job >> " + job)
		if(!__checkValidation(_pObj.validElementsForm1)) { return; }
		if(job == "NEW") {
			if(!__confirmMsg("SAVE")) { return; }
			if(!insertData()) { return; }
		} else if(job == "MOD") {
			if(!__confirmMsg("UPDATE")) { return; }
			if(!updateData()) { return; }
		}
		/* 중요: 함수 return이 false면 아래 코드 실행되지 않도록 __serviceCall의 결과를 return으로 받음 */
		$("#btnSrch").trigger("click");
		break;
	case "btnPopChangePwd":
		var dtRow = $(GRID1).DataTable().row('.selected');
		// TODO: 비활성화 해야되는데 임시로 경고창으로 대체
		if(dtRow.length != 1) { return alert("선택된 사용자가 없습니다."); }
		var pUserid = dtRow.data().userid;
		aplcntOpenPopup("userMngPwdPop?pUserid="+pUserid);
		break;
	case "btnExportExcel":
		if(!__confirmMsg("EXPORT_EXCEL")) { return; }
		$(".buttons-excel").click();
		break;
	default:
		break;
	}
});

/**************************************************
 * 일반 함수 정의
 **************************************************/
/** 지원자 양식 팝업 함수 */
function aplcntOpenPopup(url) {
	// 듀얼 모니터 환경 반영 안되어 있음.
	var scWidth = screen.availWidth;
	var scHeight = screen.availHeight;

	var left = (parseInt(scWidth)+100)/2; // 해상도 가로 중심의 우측
	var top = (parseInt(scHeight)-960)/2; // 해상도 세로의 중심

	var win = window.open(url, "userMngPwdPop", 'width=650, height=900, top='+top+', left='+left);
	win.focus(); 
	// 열린 페이지에 포커스를 준다. 열림과동시에 앞쪽으로
	// 팝업창에서 부모창에 포커스를 줄때는 parent.focus();
}

/**************************************************
 * CRUD 함수 정의
 **************************************************/
/** 리스트 조회 : */
function selectList() {
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "userMngMapper"); // DB 네임스페이스
	postData.put("DB_REQID", "selectUserList"); // DB 요청 ID
	
	// 하위 태그에서 데이터 추출
	postData = __putIntoPostData(FORM_SRCH, postData);
	
	var cbf = function(rs, elementId) {
		__setGridData(rs, elementId);
	};
	__serviceCall(CMM_ACTION, postData, true, cbf, "BLOCK", GRID1);
}
/** 단건 조회 :  */
function selectOneData(pKey) {
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "userMngMapper");
	postData.put("DB_REQID", "selectUserList");
	
	postData.put("userid", pKey);	// key
	
	var cbf = function(rs, elementId) {
		if(rs == undefined || rs == "undefined") {
			return;
		} else {
			rs = rs[0];
		}
		
		__bindToDataset(rs);
	}
	__serviceCall(CMM_ACTION, postData, true, cbf, "BLOCK");
}
/** 데이터 저장 : */
function insertData() {

	var postData = new nMap();
	
	postData.put("DB_CRUD", "C");
	postData.put("DB_MAPPER", "userMngMapper");
	postData.put("DB_REQID", "insertUser");

	// 하위 태그에서 데이터 추출
	postData = __putIntoPostData(FORM1, postData);
	
	var cbf = function(rs, elementId) {
//		console.log("AJAX Return : " + rs + " / " + typeof(rs));
	}
	return __serviceCall(CMM_ACTION, postData, false, cbf, "BLOCK");
}
/** 데이터 수정 : */
function updateData() {

	var postData = new nMap();
	
	postData.put("DB_CRUD", "U");
	postData.put("DB_MAPPER", "userMngMapper");
	postData.put("DB_REQID", "updateUser");

	// 하위 태그에서 데이터 추출
	postData = __putIntoPostData(FORM1, postData);
	
	var cbf = function(rs, elementId) {
//		console.log("AJAX Return : " + rs + " / " + typeof(rs));
	}
	return __serviceCall(CMM_ACTION, postData, false, cbf, "BLOCK");
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
		             , {className: "dt-center dt-nowrap", targets: [0,3,7,8]} // 복수 개 선언시 [] 사용하며, _all 이전에 선언해주어야함
		             , {className: "dt-head-center dt-nowrap", targets: "_all"} // css/bootstrap.min.css에서 table 글씨를좌측 정렬하는 css가 있어서 추가함.
		              ]
		, columns: [
		            { title: "", 			data: null, searchable: false, orderable: false, defaultContent: "" }
		          , { title: "사용자",		data: "userid" }
		          , { title: "이름",		data: "kornm"  }
		          , { title: "성별",		data: "sexcd" }
		          , { title: "생년월일",	data: "birthday", render: __dtMaskDate }
		          , { title: "이메일",		data: "email" }
		          , { title: "상태코드", 	data: "sttscd", visible: false }
		          , { title: "상태", 		data: "sttsnm"
		        	  , render: function (data, type, row, set) {
		        		  return data+' ('+ row.sttscd+')';
		        	  }
		          }
		          , { title: "등록일",		data: "indt", render: __dtMaskDate }
			    ]
		, searching: false // 자체 검색 기능 여부 	
		, paging: false	// 자체 페이징 기능 여부
	    , info: false // info 기능 여부
		, ordering: true // 정렬 기능 여부
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
			// p.s. 현 구조에서는 재조회시마다 실행되지 않고, 최최 화면 렌더링시에만 적용됨.(그래서 loading 기능 적용하려면 방법 강구 필요)
			$(".buttons-excel").hide();
			// row 클릭 이벤트 정의
			$(document).on("click", GRID1 + ">tbody>tr", function() {
				var data = $(GRID1).DataTable().row( this ).data();
				selectOneData(data.userid);
				_pObj.setFormStatus("MOD");
//				console.log(data.userid);
			});
        }
		// 엑셀 추출시 필요 : ST
		, dom: 'Bfrtip'
		,  buttons: [ {
			extend:"excelHtml5"
			, filename: function(){
				var d = new Date();
				var n = d.getTime();
				return $("title").text() + n;
			}
			, exportOptions: {
				columns: ':visible' // visible인 컬럼만 추출
			}
			// 아래 커스터마이즈 삭제하면 원래 스타일로 원복됨
			, customize: function( xlsx ) {
				// 엑셀 다운로드라이브러리가 가지고 있는 styles.xml 내부의 태그를 찾아서 값을 바꿔주는 형태로 글꼴과 크기를 변경하여 적용할수 있게 수정함 2019.06.22
				var sheet = xlsx.xl['styles.xml'];
				
				var tagName = sheet.getElementsByTagName("sz"); // 전체 글씨크기
				for (i = 0; i < tagName.length; i++) { tagName[i].setAttribute("val", "10"); }
				
				var tagNameFonts = sheet.getElementsByTagName("font"); // 전체 글씨 폰트
				for (i = 0; i < tagNameFonts.length; i++) { tagNameFonts[i].getElementsByTagName("name")[0].setAttribute("val", "맑은고딕"); }
					
            }
		}]
		// 엑셀 추출시 필요 : ED
	});
}

/*체크박스 추가시*/
/*
if (type === 'display') {
    return '<input type="checkbox" class="editable">';
}*/

/**************************************************
 * source		: deptMng.js
 * description	: 사업장정보관리
 * ************************************************
 * date			author			description
 * ************************************************
 * 2016.08.17	김상우			최초 작성
 * 2018.04.02	김상우			리팩토링 진행
 * ************************************************
 **************************************************/

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
		var codeListMap = __appCmm.getMultiCodeBookDB("TPBIZAREA");
		
		// selectBox 세팅
		__appCmm.setDropDown(codeListMap, "TPBIZAREA", "tpBizarea", "선택");
	},
	/** 유효상, 마스킹 초기화 */
	initMask:function() {
		// 필수값 설정
		$("#cdBizarea, #nmBizarea, #nmBizareaL1, #tpBizarea").prop("required", true);
		
		// 유효성 설정
		$("#srchCdBizarea, #cdBizarea").attr("maxlength", "7");
		$("#srchCdBizarea, #cdBizarea").attr("pattern", "[A-Z0-9]+")
		$("#srchCdBizarea, #cdBizarea").attr("title", "대문자나 숫자 7자리까지만 입력가능합니다.");
		$("#srchNmBizarea, #nmBizarea, #nmBizareaL1").attr("maxlength", "50");
		$("#srchNmBizarea, #nmBizarea, #nmBizareaL1").attr("title", "50자리까지만 입력가능합니다.");
		
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
		$("#cdCompany").val("1000");
		break;
	case "btnSave":
		var job = _pObj.job;
//		console.log("_pObj.job >> " + job)
		if(!__checkValidation(_pObj.validElementsForm1)) { return; }
		if(job == "NEW") {
			if(dupCheck() > 0) { 
				__alertMsg("dupCheck");
				return;
			}
			if(!__confirmMsg("SAVE")) { return; }
			if(!insertData()) { return; }
		} else if(job == "MOD") {
			if(!__confirmMsg("UPDATE")) { return; }
			if(!updateData()) { return; }
		}
		/* 중요: 함수 return이 false면 아래 코드 실행되지 않도록 __serviceCall의 결과를 return으로 받음 */
		$("#btnSrch").trigger("click");
		break;
	default:
		break;
	}
});


/**************************************************
 * CRUD 함수 정의
 **************************************************/
/** 리스트 조회 : */
function selectList() {
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "bizareaMngMapper"); // DB 네임스페이스
	postData.put("DB_REQID", "selectBizareaList"); // DB 요청 ID
	
	// 하위 태그에서 데이터 추출
	postData = __putIntoPostData(FORM_SRCH, postData);
	
	var cbf = function(rs, elementId) {
		__setGridData(rs, elementId);
		$("#totalCount").html(" ("+rs.length+"건)");
	};
	__serviceCall(CMM_ACTION, postData, true, cbf, "BLOCK", GRID1);
}
/** 단건 조회 :  */
function selectOneData(pCdCompany, pCdBizarea) {
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "bizareaMngMapper");
	postData.put("DB_REQID", "selectBizareaList");
	
	postData.put("cdCompany", pCdCompany);	// key
	postData.put("cdBizarea", pCdBizarea);	// key
	
	var cbf = function(rs, elementId) {
		if(rs == undefined || rs == "undefined") {
			return;
		} else {
			rs = rs[0];
		}
		
		var tempDate = __toDateFormat(rs.dtsUpdate.left(8), "-");
		tempDate += (" "+__toTimeFormat(rs.dtsUpdate.right(6)));
		rs.dtsUpdate = tempDate;
		
		__bindToDataset(rs);
	}
	__serviceCall(CMM_ACTION, postData, true, cbf, "BLOCK");
}
/** 데이터 중복 체크 : */
function dupCheck() {
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "bizareaMngMapper");
	postData.put("DB_REQID", "selectBizareaList");
	
	// 하위 태그에서 데이터 추출
	postData = __putIntoPostData(FORM1, postData);
	
	return __serviceCall(CMM_ACTION, postData, false, "", "");
	
}
/** 데이터 저장 : */
function insertData() {

	var postData = new nMap();
	
	postData.put("DB_CRUD", "C");
	postData.put("DB_MAPPER", "bizareaMngMapper");
	postData.put("DB_REQID", "insertBizarea");

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
	postData.put("DB_MAPPER", "bizareaMngMapper");
	postData.put("DB_REQID", "updateBizarea");

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
		             , {className: "dt-head-center dt-body-left dt-nowrap", targets: [3]} // 복수 개 선언시 [] 사용하며, _all 이전에 선언해주어야함
		             , {className: "dt-center dt-nowrap", targets: "_all"} // css/bootstrap.min.css에서 table 글씨를좌측 정렬하는 css가 있어서 추가함.
		              ]
		, columns: [
		            { title: "", 			data: null, searchable: false, orderable: false, defaultContent: "", width:"20px" }
		          , { title: "회사코드",	data: "cdCompany", width:"80px"  }
		          , { title: "사업장코드",	data: "cdBizarea", width:"80px" }
		          , { title: "사업장명",	data: "nmBizarea"}
		          
		         
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
				selectOneData(data.cdCompany, data.cdBizarea);
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
		}]
		// 엑셀 추출시 필요 : ED
	});
}

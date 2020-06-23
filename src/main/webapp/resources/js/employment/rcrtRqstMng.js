/**************************************************
 * source		: rcrtRqstMng.js
 * description	: 채용현황관리(부서별)
 * ************************************************
 * date			author			description
 * ************************************************
 * 2016.08.29	김상우			최초 작성
 * 2017.12.28	ksw				리팩토링
 * ************************************************/

/**************************************************
 * 전역 변수 선언
 **************************************************/
var FORM_SRCH 	= "#tableSearch"; 	// 검색조건 개체 Selector
var GRID 		= "#gridList";
var FORM		= "#tableDetail";

/**************************************************
 * 화면 초기화를 위한 객체 설정
 **************************************************/
var _pObj = {
	job	: "INIT",	// "INIT", "NEW", "MOD", "DEL", ...
	// validElementsSrch : "",	// 조회조건 validation 개체
	validElementsForm : "",	// validation 대상 리스트
	
	deptListMap : new nMap(),	// 부서코드북 보관
	/*initPage:function() { this.init.Variable(); },*/
	/** 변수 초기화 */
	initVariable:function() {
		this.validElementsForm = __getValidElements(FORM);
	},
	/** 셀렉트박스 초기화 */
	initDropDown:function() {
		// DB에서 공통코드 가져오기
		var codeListMap = __appCmm.getMultiCodeBookDB("RCPROGCD");
		
		codeListMap.put("BIZAREA", __appCmm.getBizareaCodeBook());
		this.deptListMap.put("DEPT", __appCmm.getDeptCodeBook());
		__appCmm.setDropDown(codeListMap, "BIZAREA", "srchBizarea", "전체");
		__appCmm.setDropDown(this.deptListMap, "DEPT", "hiddenAllDept", "전체");
		__appCmm.setBizareaChangeEvent(this.deptListMap.get("DEPT"), "srchBizarea", "srchDept", "전체");
		$("#srchBizarea").trigger("change");
		
		
		
		__appCmm.setDropDown(codeListMap, "BIZAREA", "cdBizarea", "선택");
		__appCmm.setBizareaChangeEvent(this.deptListMap.get("DEPT"), "cdBizarea", "cdDept", "선택");
		$("#cdBizarea").trigger("change");
		
		// selectBox 세팅
		__appCmm.setDropDown(codeListMap, "RCPROGCD", "srchRcProgCd", "전체");
		__appCmm.setDropDown(codeListMap, "RCPROGCD", "rcProgCd", "선택");
	},
	/** 유효상, 마스킹 초기화 */
	initMask:function() {
		// 필수값 설정
		$("#cdBizarea, #cdDept, #deptClass, #rcProgCd").attr("required", true);
		
		// 유효성 설정
		$("#deptClass").prop("min", "1");
		$("#deptClass").prop("max", "5000");
		$("#requestPeopleCnt").prop("min", "1");
		$("#requestPeopleCnt").prop("max", "1000");
	
		$("#rcProgMemo").prop("maxlength", "30");
		
	},
	/** 그리드 초기화 */
	initGrid:function() {
		_initGrid(GRID);
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
			__elementClear(FORM);
			__elementDis(FORM, job, "DIS");
			_btnObj.setButton(job);
			break;
		case "NEW":
			__elementClear(FORM);
			__elementDis(FORM, job, "ENA");
			_btnObj.setButton(job);
			
			$("#cdCompany").val("1000");	// 기본값 세팅
			
			break;
		case "MOD":
			__elementDis(FORM, job, "ENA");
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
	__setCustomTree(top.cmmDsDept);
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
//			console.log("_pObj.job >> " + job)
		if(!__checkValidation(_pObj.validElementsForm)) { return; }
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
	case "btnExportExcel":
		if(!__confirmMsg("EXPORT_EXCEL")) { return; }
		$(".buttons-excel").click();
		break;
	default:
		break;
	}
});

/** 부서 th 선택시 부서조회 modal 띄우기(treeview에서 사용) */
$(document).on("click", "#modalSearchDept", function() {
	$("#myModal").modal("show");
});

//모달창 띄우면서 focus를 주기 위한 이벤트 함수
$(document).on("shown.bs.modal", "#myModal", function() {
	console.log("test");
	$('#input-search').focus();
})
/**************************************************
 * 일반 함수 정의
 **************************************************/


/**************************************************
 * CRUD 함수 정의
 **************************************************/
/** 리스트 조회 : */
function selectList() {
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "rcrtRqstMngMapper"); // DB 네임스페이스
	postData.put("DB_REQID", "selectDeptRcStatusList"); // DB 요청 ID
	
	// 하위 태그에서 데이터 추출
	postData = __putIntoPostData(FORM_SRCH, postData);
	
	var cbf = function(rs, elementId) {
		__setGridData(rs, elementId);
	};
	__serviceCall(CMM_ACTION, postData, true, cbf, "BLOCK", GRID);
}
/** 단건 조회 :  */
function selectOneData(cdCompany, cdBizarea, cdDept, deptClass) {
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "rcrtRqstMngMapper");
	postData.put("DB_REQID", "selectOneDeptRcStatus");
	
	postData.put("cdCompany", cdCompany);
	postData.put("cdBizarea", cdBizarea);
	postData.put("cdDept", cdDept);
	postData.put("deptClass", deptClass);
	
	
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

/** 데이터 중복 체크 : */
function dupCheck() {
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "rcrtRqstMngMapper");
	postData.put("DB_REQID", "selectOneDeptRcStatus");
	
	// 하위 태그에서 데이터 추출
	postData = __putIntoPostData(FORM, postData);
	
	return __serviceCall(CMM_ACTION, postData, false, "", "");
}

/** 데이터 저장 : */
function insertData() {

	var postData = new nMap();
	
	postData.put("DB_CRUD", "C");
	postData.put("DB_MAPPER", "rcrtRqstMngMapper");
	postData.put("DB_REQID", "insertDeptRcStatusList");

	// 하위 태그에서 데이터 추출
	postData = __putIntoPostData(FORM, postData);
	
	var cbf = function(rs, elementId) {
//			console.log("AJAX Return : " + rs + " / " + typeof(rs));
	}
	return __serviceCall(CMM_ACTION, postData, false, cbf, "BLOCK");
}
/** 데이터 수정 : */
function updateData() {

	var postData = new nMap();
	
	postData.put("DB_CRUD", "U");
	postData.put("DB_MAPPER", "rcrtRqstMngMapper");
	postData.put("DB_REQID", "updateDeptRcStatus");

	// 하위 태그에서 데이터 추출
	postData = __putIntoPostData(FORM, postData);
	
	var cbf = function(rs, elementId) {
//			console.log("AJAX Return : " + rs + " / " + typeof(rs));
	}
	return __serviceCall(CMM_ACTION, postData, false, cbf, "BLOCK");
}
/**************************************************
 * 그리드 정의
 **************************************************/
/** 그리드1 초기화 */
function _initGrid(elementId) {
	$(elementId).DataTable( {
//		    data: dataSet	// 사용 안하기로 함
		columnDefs: [
		             {targets: 7, "createdCell": function(td){ td.setAttribute("style", "padding-right:20px"); }}
		             , {targets: 3, "createdCell": function(td){ td.setAttribute("style", "padding-right:10px"); }}
		             , {targets: 9, "createdCell": function(td, cellData, rowData){
		            	 td.setAttribute("style", "padding-right:10px");
		            	 td.setAttribute("title", rowData.rcProgMemo);
		            	 }
		             }
//		             , {"targets": "_all", "createdCell": function(td, cellData, rowData, row, col){ td.setAttribute("title", td.innerText); }}
//		             // rules : 복수 개 선언시 [] 사용, 개별 컬럼을 _all 이전에 선언, 1개 컬럼을 지정하면 _all의 설정에서는 제외됨  
		             , {className: "dt-head-center dt-body-left dt-nowrap", targets: [1,2]}
		             , {className: "dt-head-center dt-body-right dt-nowrap", targets: [3,7]}
		             , {className: "dt-center dt-nowrap", targets: "_all"} // css/bootstrap.min.css에서 table 글씨를좌측 정렬하는 css가 있어서 추가함.
		              ]
		, columns: [
		            { title: "", 			data: null, searchable: false, orderable: false, defaultContent: "", width:"20px" }
		          , { title: "사업장",		data: "nmBizarea", width:"120px" }
		          , { title: "부서",		data: "nmDept" }
		          , { title: "기수",		data: "deptClass"
		        	  , render: function (data, type, row, set) {
						  return data+'기';
					  }, width:"35px"
		          }
		          , { title: "요청일",		data: "requestDate", render: __dtMaskDate, width:"80px" }
		          , { title: "시작일",		data: "rcSdate", render: __dtMaskDate, width:"80px" }
		          , { title: "종료일",		data: "rcEdate", render: __dtMaskDate, width:"80px" }
		          , { title: "채용일수",	data: "rcDays"
		        	  , render: function (data, type, row, set) {
						  return data+'일';
					  }, width:"50px"
		          }
		          , { title: "기수교육일",	data: "eduSdate", render: __dtMaskDate }
		          , { title: "진행상태",	data: "rcProgNm"
		        	  , render: function (data, type, row, set) {
						  var rtnVal = document.createElement("span");
						  rtnVal.appendChild(document.createTextNode(data));
						  if(row.rcProgCd == "1") {
							  rtnVal.classList.add("label", "label-success");
						  } else if(row.rcProgCd == "2") {
							  rtnVal.classList.add("label", "label-danger");
						  } else if(row.rcProgCd == "3") {
							  rtnVal.classList.add("label", "label-default");
						  }
						  return rtnVal.outerHTML;
					  }
		          }
		          , { title: "요청인원",	data: "requestPeopleCnt" }
		          , { title: "합격자",		data: "pickedPeopleCnt" }
		          , { title: "지원자",		data: "aplcntPeopleCnt" }
		          
		          , { title: "cdCompany",	data: "cdCompany", visible:false }
		          , { title: "cdBizarea",	data: "cdBizarea", visible:false }
		          , { title: "cdDept",		data: "cdDept", visible:false }
		          , { title: "deptClass",	data: "deptClass", visible:false }

			    ]
		, searching: false // 자체 검색 기능 여부 	
		, paging: false	// 자체 페이징 기능 여부
	    , info: false // info 기능 여부
		, ordering: true // 정렬 기능 여부
		, order: [[ 9, "asc" ]] // 최초 정렬 기준 설정(컬럼위치, asc/desc)
		, language: { // 테이블 데이터가 없을 때 표시할 내용
		       emptyTable : "조회된 데이터가 없습니다."
		    }
//		    , autoWidth: true
//			, scrollX: true		// true/false 가능
			, scrollY: "550"
//		    , destroy: true
		, select: {
	        style: "single",  // false : row 선택x, single : row 선택 가능, multi : 여러개 row 선택 가능(라이브러리 추가해야가능)
		}
		,  "initComplete": function () {
			// p.s. 현 구조에서는 재조회시마다 실행되지 않고, 최최 화면 렌더링시에만 적용됨.(그래서 loading 기능 적용하려면 방법 강구 필요)
			$(".buttons-excel").hide();
			// row 클릭 이벤트 정의
			$(document).on("click", GRID + ">tbody>tr", function() {
				var data = $(GRID).DataTable().row( this ).data();
				selectOneData(data.cdCompany, data.cdBizarea, data.cdDept, data.deptClass);
				_pObj.setFormStatus("MOD");
//				console.log(data.cdCompany, data.cdBizarea, data.cdDept, data.deptClass);
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

//부서 리스트 클릭시 코드값 추출
$(document).on("click", "li", function() {
	
	var str = $(this).text();
	str = str.match(/\[.*\]/g);
	str = str[0].replace(/\[|\]/g, "")
	console.log($(this).hasClass("node-selected"));
	if(($(this).hasClass("node-selected") || $(this).hasClass("search-result")) && str.length >= 6) {
		$("#hiddenAllDept").val(str);
		
		$("#srchBizarea").val($("#hiddenAllDept [value="+str+"]").attr("code-grp"));
		$("#srchBizarea").trigger("change");
		$("#srchDept").val(str);
		
		$("#myModal").modal("hide");
	}
});

/**************************************************
 * source		: codeMng.js
 * description	: 공통 코드 관리 화면
 * ************************************************
 * date			author			description
 * ************************************************
 * 2016.03.11	김상우			최초 작성
 * 2016.08.01	김상우			디자인 개편 및 기능 수정
 * 2016.08.09	김상우			디자인 개편 및 기능 수정1
 * 2018.04.16	ksw				리팩토링
 * 2019.06.07	ksw				리팩토링
 * ************************************************
 **************************************************/

/**************************************************
 * 전역 변수 선언
 **************************************************/
var FORM_SRCH_1 = "#tableSearch1";
var FORM_SRCH_3	= "#tableSearch3";
var GRID1 		= "#gridList1";
var GRID2 		= "#gridList2";
var GRID3 		= "#gridList3";
var FORM1 		= "#tableDetail1";
var FORM2 		= "#tableDetail2";
var selectedCodeGrp = null;
var selectedCode = null;

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
		this.validElementsSrchFormA = __getValidElements(FORM_SRCH_1);
		this.validElementsSrchFormB = __getValidElements(FORM_SRCH_3);
		this.validElementsForm1 = __getValidElements(FORM1);
		this.validElementsForm2 = __getValidElements(FORM2);
	},
	/** 셀렉트박스 초기화 */
	initDropDown:function() {
		// DB에서 공통코드 가져오기
		var codeListMap = __appCmm.getMultiCodeBookDB("OXSTTS");
		
		// selectBox 세팅
		__appCmm.setDropDown(codeListMap, "OXSTTS", "srchUsyn", "전체");
		__appCmm.setDropDown(codeListMap, "OXSTTS", "codeGrpUsyn");
		__appCmm.setDropDown(codeListMap, "OXSTTS", "codeUsyn");

	},
	/** 유효상, 마스킹 초기화 */
	initMask:function() {
		
		// 필수값 설정
		$("#codeGrp, #codeGrpNm, #codeGrpUsyn, #code, #codeNm, #codeUsyn").prop("required", true);
		
		// 유효성 설정
		$("#srchCodeGrp, #srchCode").attr("maxlength", "40");
		$("#srchCodeGrp, #srchCode").attr("pattern", "[A-Z0-9]+")
		$("#srchCodeGrp, #srchCode").attr("title", "대문자, 숫자 40자리까지만 입력가능합니다.");
		$("#srchCodeGrpNm, srchCodeNm").attr("maxlength", "20");
		
		$("#codeGrp, #code").attr("maxlength", "40");
		$("#codeGrp, #code").attr("pattern", "[A-Z0-9_]+")
		$("#codeGrp, #code").attr("title", "대문자, 숫자, _ 40자리까지만 입력가능합니다.");
		$("#codeGrpNm, #codeNm").attr("maxlength", "20");
		$("#codeGrpDesc, #codeDesc").attr("maxlength", "50");
		
		$("#sortOrder").attr("min", "1");
		$("#sortOrder").attr("max", "100");
		$("#etc1, #etc2, #etc3").attr("maxlength", "40");

		// 마스킹
		$("#srchCodeGrp, #codeGrp").upperNumber();
		$("#srchCode, #code").upperNumber1();
		
	},
	/** 그리드 초기화 */
	initGrid:function() {
		_initGrid1(GRID1);
		_initGrid2(GRID2);
		_initGrid3(GRID3);
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
			__elementClear(FORM2);
			__elementDis(FORM1, job, "DIS");
			__elementDis(FORM2, job, "DIS");
			_btnObj.setButton(job);
			break;
		case "NEW1":
			__elementClear(FORM1);
			__elementDis(FORM1, "NEW", "ENA");
			__elementClear(FORM2);
			__elementDis(FORM2, "NEW", "DIS");
			_btnObj.setButton(job);
			$("#codeGrpUsyn").val("1");
			break;
		case "NEW2":
			__elementDis(FORM1, "", "DIS");
			__elementClear(FORM2);
			__elementDis(FORM2, "NEW", "ENA");
			_btnObj.setButton(job);
			$("#codeUsyn").val("1");
			break;
		case "MOD1":
			__elementDis(FORM1, "MOD", "ENA");
			_btnObj.setButton(job);
			break;
		case "MOD2":
			__elementDis(FORM2, "MOD", "ENA");
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
	btn:["btnNew1", "btnSave1", "btnNew2", "btnSave2"],
	stts:{
		INIT 	: [1,0,0,0],	// 초기화
		NEW1 	: [1,1,0,0],
		MOD1 	: [1,1,1,0],
		NEW2 	: [0,0,1,1],
		MOD2 	: [0,0,1,1]
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
	$("#btnSrch1").trigger("click");
	
});

/**************************************************
 * 이벤트 핸들러
 **************************************************/
$(document).on("click", "button", function() {
	var elementId = $(this).attr("id");
	
	switch (elementId) {
	case "btnSrch1":
		if(!__checkValidation(_pObj.validElementsSrchFormA)) { return; };
		_pObj.setFormStatus("INIT");
		selectList1();
		break;
	case "btnSrch3":
		_pObj.setFormStatus("INIT");
		selectList3();
		break;
	case "btnResetSrch1":
		__elementClear(FORM_SRCH_1);
		break;
	case "btnResetSrch3":
		__elementClear(FORM_SRCH_3);
		break;
	case "btnNew1":
		_pObj.setFormStatus("NEW1");
		$(GRID2).DataTable().clear().draw();
		break;
	case "btnSave1":
		var job = _pObj.job;
//		console.log("_pObj.job >> " + job)
		if(!__checkValidation(_pObj.validElementsForm1)) { return; }
		if(job == "NEW1") {
			if(dupCheck1() > 0) { 
				__alertMsg("dupCheck");
				return;
			}
			if(!__confirmMsg("SAVE")) { return; }
			if(!insertData1()) { return; }
		} else if(job == "MOD1") {
			if(!__confirmMsg("UPDATE")) { return; }
			if(!updateData1()) { return; }
		}
		/* 중요: 함수 return이 false면 아래 코드 실행되지 않도록 __serviceCall의 결과를 return으로 받음 */
		$("#btnSrch1").trigger("click");
		break;
	case "btnNew2":
		_pObj.setFormStatus("NEW2");
		break;
	case "btnSave2":
		var job = _pObj.job;
//		console.log("_pObj.job >> " + job)
		if(!__checkValidation(_pObj.validElementsForm2)) { return; }
		if(job == "NEW2") {
			if(dupCheck2() > 0) { 
				__alertMsg("dupCheck");
				return;
			}
			if(!__confirmMsg("SAVE")) { return; }
			if(!insertData2()) { return; }
		} else if(job == "MOD2") {
			if(!__confirmMsg("UPDATE")) { return; }
			if(!updateData2()) { return; }
		}
		/* 중요: 함수 return이 false면 아래 코드 실행되지 않도록 __serviceCall의 결과를 return으로 받음 */
		$("#btnSrch1").trigger("click");
		break;
	
	default:
		break;
	}
});

/**************************************************
 * 일반 함수 정의
 **************************************************/


/**************************************************
 * CRUD 함수 정의
 **************************************************/
/** 리스트 조회 : */
function selectList1() {
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "codeMngMapper"); // DB 네임스페이스
	postData.put("DB_REQID", "selectCodeGrpList"); // DB 요청 ID
	
	// 하위 태그에서 데이터 추출
	postData = __putIntoPostData(FORM_SRCH_1, postData);
	
	var cbf = function(rs, elementId) {
		__setGridData(rs, elementId);
		$("#totalCount1").html(" ("+rs.length+"건)");
		
		if(selectedCodeGrp != "") {
			$(GRID1+" tr").find("td:eq(1)").each(function(){
				if($(this).text() == selectedCodeGrp) {
					$(this).click();
					$(this)[0].scrollIntoView();
				}
			});
			selectedCodeGrp = "";
		}
	};
	__serviceCall(CMM_ACTION, postData, true, cbf, "BLOCK", GRID1);
}
/** 단건 조회 :  */
function selectOneData1(pKey) {
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "codeMngMapper");
	postData.put("DB_REQID", "selectCodeGrpList");
	
	postData.put("codeGrp", pKey);	// key
	
	var cbf = function(rs, elementId) {
		if(rs == undefined || rs == "undefined") {
			return;
		} else {
			rs = rs[0];
			$("#codeGrp").val(rs.codeGrp);
			$("#codeGrpNm").val(rs.codeGrpNm);
			$("#codeGrpDesc").val(rs.codeGrpDesc);
			$("#codeGrpUsyn").val(rs.usyn);
			$("#codeGrpUpid").val(rs.upid);
			$("#codeGrpUpdt").val(__jsonDateToStr(rs.updt, "DISP"));
		}
	}
	__serviceCall(CMM_ACTION, postData, true, cbf, "BLOCK");
}

/** 데이터 중복 체크 : */
function dupCheck1() {
	
	var codeGrp = $("#codeGrp").val();
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "codeMngMapper");
	postData.put("DB_REQID", "selectCodeGrpList");
	
	postData.put("codeGrp", codeGrp);
	
	return __serviceCall(CMM_ACTION, postData, false, "", "");
	
}

/** 데이터 저장 : */
function insertData1() {

	var codeGrp = $("#codeGrp").val();
	var codeGrpNm = $("#codeGrpNm").val();
	var codeGrpDesc = $("#codeGrpDesc").val();
	var codeGrpUsyn = $("#codeGrpUsyn").val();
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "C");
	postData.put("DB_MAPPER", "codeMngMapper");
	postData.put("DB_REQID", "insertCodeGrp");

	postData.put("codeGrp", codeGrp);
	postData.put("codeGrpNm", codeGrpNm);
	postData.put("codeGrpDesc", codeGrpDesc);
	postData.put("codeGrpUsyn", codeGrpUsyn);
	
	var cbf = function(rs, elementId) {
		if(rs.cnt==1) {
			selectedCodeGrp = codeGrp;
		}
	}
	return __serviceCall(CMM_ACTION, postData, false, cbf, "BLOCK");
}
/** 데이터 수정 : */
function updateData1() {

	var codeGrp = $("#codeGrp").val();
	var codeGrpNm = $("#codeGrpNm").val();
	var codeGrpDesc = $("#codeGrpDesc").val();
	var codeGrpUsyn = $("#codeGrpUsyn").val();
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "U");
	postData.put("DB_MAPPER", "codeMngMapper");
	postData.put("DB_REQID", "updateCodeGrp");

	postData.put("codeGrp", codeGrp);
	postData.put("codeGrpNm", codeGrpNm);
	postData.put("codeGrpDesc", codeGrpDesc);
	postData.put("codeGrpUsyn", codeGrpUsyn);
	
	var cbf = function(rs, elementId) {
		if(rs.cnt==1) {
			selectedCodeGrp = codeGrp;
		}
	}
	return __serviceCall(CMM_ACTION, postData, false, cbf, "BLOCK");
}

/** 리스트 조회 : */
function selectList2(pKey) {
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "codeMngMapper"); // DB 네임스페이스
	postData.put("DB_REQID", "selectCodeList"); // DB 요청 ID
	
	// 파라미터 할당
	postData.put("codeGrp", pKey);
	
	var cbf = function(rs, elementId) {
		__setGridData(rs, elementId);
		$("#totalCount2").html(" ("+rs.length+"건)");
		
		if(selectedCode != "") {
			$(GRID2+" tr").find("td:eq(2)").each(function(){
				if($(this).text() == selectedCode) {
					$(this).click();
					$(this)[0].scrollIntoView();
				}
			});
			selectedCode = "";
		}
	};
	__serviceCall(CMM_ACTION, postData, true, cbf, "BLOCK", GRID2);
}
/** 단건 조회 :  */
function selectOneData2(pKey1, pKey2) {
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "codeMngMapper");
	postData.put("DB_REQID", "selectCodeList");
	
	postData.put("codeGrp", pKey1);
	postData.put("code", pKey2);
	
	var cbf = function(rs, elementId) {
		if(rs == undefined || rs == "undefined") {
			return;
		} else {
			rs = rs[0];
			
			$("#code").val(rs.code);
			$("#codeNm").val(rs.codeNm);
			$("#codeDesc").val(rs.codeDesc);
			$("#sortOrder").val(rs.sortOrder);
			$("#etc1").val(rs.etc1);
			$("#etc2").val(rs.etc2);
			$("#etc3").val(rs.etc3);
			$("#codeUsyn").val(rs.usyn);
			$("#codeUpid").val(rs.upid);
			$("#codeUpdt").val(__jsonDateToStr(rs.updt, "DISP"));
		}
	}
	__serviceCall(CMM_ACTION, postData, true, cbf, "BLOCK");
}

/** 데이터 중복 체크 : */
function dupCheck2() {
	
	var codeGrp = $("#codeGrp").val();
	var code = $("#code").val();
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "codeMngMapper");
	postData.put("DB_REQID", "selectCodeList");
	
	postData.put("codeGrp", codeGrp);
	postData.put("code", code);
	
	return __serviceCall(CMM_ACTION, postData, false, "", "");
	
}

/** 데이터 저장 : */
function insertData2() {

	var codeGrp = $("#codeGrp").val();
	var code = $("#code").val();
	var codeNm = $("#codeNm").val();
	var codeDesc = $("#codeDesc").val();
	var sortOrder = $("#sortOrder").val();
	var etc1 = $("#etc1").val();
	var etc2 = $("#etc2").val();
	var etc3 = $("#etc3").val();
	var codeUsyn = $("#codeUsyn").val();
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "C");
	postData.put("DB_MAPPER", "codeMngMapper");
	postData.put("DB_REQID", "insertCode");

	postData.put("codeGrp", codeGrp);
	postData.put("code", code);
	postData.put("codeNm", codeNm);
	postData.put("codeDesc", codeDesc);
	postData.put("sortOrder", sortOrder);
	postData.put("etc1", etc1);
	postData.put("etc2", etc2);
	postData.put("etc3", etc3);
	postData.put("codeUsyn", codeUsyn);
	
	var cbf = function(rs, elementId) {
		if(rs.cnt==1) {
			selectedCodeGrp = codeGrp;
			selectedCode = code;
		}
	}
	return __serviceCall(CMM_ACTION, postData, false, cbf, "BLOCK");
}
/** 데이터 수정 : */
function updateData2() {

	var codeGrp = $("#codeGrp").val();
	var code = $("#code").val();
	var codeNm = $("#codeNm").val();
	var codeDesc = $("#codeDesc").val();
	var sortOrder = $("#sortOrder").val();
	var etc1 = $("#etc1").val();
	var etc2 = $("#etc2").val();
	var etc3 = $("#etc3").val();
	var codeUsyn = $("#codeUsyn").val();
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "U");
	postData.put("DB_MAPPER", "codeMngMapper");
	postData.put("DB_REQID", "updateCode");

	postData.put("codeGrp", codeGrp);
	postData.put("code", code);
	postData.put("codeNm", codeNm);
	postData.put("codeDesc", codeDesc);
	postData.put("sortOrder", sortOrder);
	postData.put("etc1", etc1);
	postData.put("etc2", etc2);
	postData.put("etc3", etc3);
	postData.put("codeUsyn", codeUsyn)
	
	var cbf = function(rs, elementId) {
		if(rs.cnt==1) {
			selectedCodeGrp = codeGrp;
			selectedCode = code;
		}
	}
	return __serviceCall(CMM_ACTION, postData, false, cbf, "BLOCK");
}

/** 리스트 조회 : */
function selectList3() {
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "codeMngMapper"); // DB 네임스페이스
	postData.put("DB_REQID", "selectListJoin"); // DB 요청 ID
	
	// 하위 태그에서 데이터 추출
	postData = __putIntoPostData(FORM_SRCH_3, postData);
	
	var cbf = function(rs, elementId) {
		__setGridData(rs, elementId);
//		$("#totalCount3").html(" ("+rs.length+"건)");
	};
	__serviceCall(CMM_ACTION, postData, true, cbf, "BLOCK", GRID3);
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
		             , {className: "dt-center dt-nowrap", targets: [0,4]} // 복수 개 선언시 [] 사용하며, _all 이전에 선언해주어야함
		             , {className: "dt-head-center dt-nowrap", targets: "_all"} // css/bootstrap.min.css에서 table 글씨를좌측 정렬하는 css가 있어서 추가함.
		              ]
		, columns: [
		            { title: "", 				data:null, searchable:false, orderable:false, defaultContent:"" }
		          , { title: "코드그룹",		data: "codeGrp" }
		          , { title: "코드그룹명",		data: "codeGrpNm"  }
		          , { title: "사용여부코드",	data: "usyn", visible:false }
		          , { title: "사용",		data: "usynnm"
		        	  , render: function (data, type, row, set) {
						  var rtnVal = document.createElement("span");
						  rtnVal.appendChild(document.createTextNode(data));
						  if(row.usyn == "1") {
							  rtnVal.classList.add("label", "bg-green");
						  } else if(row.usyn == "2") {
							  rtnVal.classList.add("label", "bg-red");
						  }
						  return rtnVal.outerHTML;
					  }  
		          }
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
		, scrollY: "380"
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
				selectOneData1(data.codeGrp);
				selectList2(data.codeGrp);
				_pObj.setFormStatus("MOD1");
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

/** 그리드2 초기화 */
function _initGrid2(elementId) {
	$(elementId).DataTable( {
//	    data: dataSet	// 사용 안하기로 함
		columnDefs: [
		             {"targets": "_all", "createdCell": function(td){ td.setAttribute("title", td.innerText); }}
		             , {className: "dt-center dt-nowrap", targets: [0,4,6]} // 복수 개 선언시 [] 사용하며, _all 이전에 선언해주어야함
		             , {className: "dt-head-center dt-nowrap", targets: "_all"} // css/bootstrap.min.css에서 table 글씨를좌측 정렬하는 css가 있어서 추가함.
		              ]
		, columns: [
		            { title: "", 				data:null, searchable:false, orderable:false, defaultContent:"" }
		          , { title: "코드그룹",		data: "codeGrp" }
		          , { title: "코드",			data: "code" }
		          , { title: "코드명",			data: "codeNm" }
		          , { title: "순서",			data: "sortOrder" }
		          , { title: "사용여부코드",	data: "usyn", visible:false }
		          , { title: "사용",		data: "usynnm"
		        	  , render: function (data, type, row, set) {
						  var rtnVal = document.createElement("span");
						  rtnVal.appendChild(document.createTextNode(data));
						  if(row.usyn == "1") {
							  rtnVal.classList.add("label", "bg-green");
						  } else if(row.usyn == "2") {
							  rtnVal.classList.add("label", "bg-red");
						  }
						  return rtnVal.outerHTML;
					  }  
		          }
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
		, scrollY: "380"
//	    , destroy: true
		, select: {
	        style: "single",  // false : row 선택x, single : row 선택 가능, multi : 여러개 row 선택 가능(라이브러리 추가해야가능)
		}
		,  "initComplete": function () {
			// p.s. 현 구조에서는 재조회시마다 실행되지 않고, 최최 화면 렌더링시에만 적용됨.(그래서 loading 기능 적용하려면 방법 강구 필요)
			$(".buttons-excel").hide();
			// row 클릭 이벤트 정의
			$(document).on("click", GRID2 + ">tbody>tr", function() {
				var data = $(GRID2).DataTable().row( this ).data();
				selectOneData2(data.codeGrp, data.code);
				_pObj.setFormStatus("MOD2");
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

/** 그리드3 초기화 */
function _initGrid3(elementId) {
	$(elementId).DataTable( {
//	    data: dataSet	// 사용 안하기로 함
		columnDefs: [
		             {"targets": "_all", "createdCell": function(td){ td.setAttribute("title", td.innerText); }}
		             , {className: "dt-center dt-nowrap", targets: [0,6,7]} // 복수 개 선언시 [] 사용하며, _all 이전에 선언해주어야함
		             , {className: "dt-head-center dt-nowrap", targets: "_all"} // css/bootstrap.min.css에서 table 글씨를좌측 정렬하는 css가 있어서 추가함.
		              ]
		, columns: [
		            { title: "", 				data:null, searchable:false, orderable:false, defaultContent:"" }
		          , { title: "코드그룹",		data: "codeGrp" }
		          , { title: "코드그룹명",		data: "codeGrpNm"  }
		          , { title: "코드",			data: "code"  }
		          , { title: "코드명",			data: "codeNm"  }
		          , { title: "순서",			data: "sortOrder"  }
		          , { title: "사용여부코드",	data: "usyn", visible:false }
		          , { title: "사용",		data: "usynnm"
		        	  , render: function (data, type, row, set) {
						  var rtnVal = document.createElement("span");
						  rtnVal.appendChild(document.createTextNode(data));
						  if(row.usyn == "1") {
							  rtnVal.classList.add("label", "bg-green");
						  } else if(row.usyn == "2") {
							  rtnVal.classList.add("label", "bg-red");
						  }
						  return rtnVal.outerHTML;
					  }  
		          }
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
		, scrollY: "90"
//	    , destroy: true
		, select: {
	        style: "single",  // false : row 선택x, single : row 선택 가능, multi : 여러개 row 선택 가능(라이브러리 추가해야가능)
		}
		,  "initComplete": function () {
			// p.s. 현 구조에서는 재조회시마다 실행되지 않고, 최최 화면 렌더링시에만 적용됨.(그래서 loading 기능 적용하려면 방법 강구 필요)
			$(".buttons-excel").hide();
			// row 클릭 이벤트 정의
			$(document).on("click", GRID1 + ">tbody>tr", function() {
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

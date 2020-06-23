/**************************************************
 * source		: statRcrtStatus.js
 * description	: 통계.지원자 현황
 * ************************************************
 * date			author			description
 * ************************************************
 * 2016.09.05	김상우			최초 작성
 * 2018.04.20	ksw				리팩토링
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
	deptListMap : new nMap(),	// 부서코드북 보관
	/*initPage:function() { this.init.Variable(); },*/
	/** 변수 초기화 */
	initVariable:function() {
//		this.validElementsForm1 = __getValidElements(FORM1);
	},
	/** 셀렉트박스 초기화 */
	initDropDown:function() {
		// DB에서 공통코드 가져오기
		var codeListMap = __appCmm.getMultiCodeBookDB("RCPROGCD");
		codeListMap.put("BIZAREA", __appCmm.getBizareaCodeBook());
		this.deptListMap.put("DEPT", __appCmm.getDeptCodeBook());
		__appCmm.setDropDown(codeListMap, "BIZAREA", "srchBizarea", "전체");
		__appCmm.setBizareaChangeEvent(this.deptListMap.get("DEPT"), "srchBizarea", "srchDept", "전체");
		$("#srchBizarea").trigger("change");
		
		// selectBox 세팅
		__appCmm.setDropDown(codeListMap, "RCPROGCD", "srchRcProgCd", "전체");
	},
	/** 유효상, 마스킹 초기화 */
	initMask:function() {
		// 필수값 설정
		$("#userid, #password, #kornm, #clsscd, #sttscd").prop("required", true);
		
		// 유효성 설정
		
		// 마스크 설정
		$("#srchItvwDate").addClass("dateMask"); // html5의 input:date는 dateMask 클래스만 추가
		
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
	$("#btnResetSrch").trigger("click");
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
		var sMonth = new Date();
		var eMonth = new Date();
		sMonth.setMonth(sMonth.getMonth()-1); 
		eMonth.setMonth(eMonth.getMonth()+1);
		$("#srchEduSdate").val(__toDateFormat(__getDate(sMonth).left(6),"-"));
		$("#srchEduEdate").val(__toDateFormat(__getDate(eMonth).left(6),"-"));
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
	case "btnExportExcel":
		if(!__confirmMsg("EXPORT_EXCEL")) { return; }
		$(".buttons-excel").click();
		break;
	default:
		break;
	}
});
/* 커서 모양 지정 */
$(document).on("mouseover", GRID1+" tr td", function() {
	var idx = $(this).index();
	if(idx > 6 && idx <14 && $(this).text()>0) {
//		$(this).css("background-color", "#d2d6de");
		$(this).css("cursor","pointer");	
	}
});
/* 커서 모양 지정 */
$(document).on("mouseout", GRID1+" tr td", function() {
	var idx = $(this).index();
	if(idx > 6 && idx <14 && $(this).text()>0) {
//		$(this).css("background-color", "#fff");
		$(this).css("cursor","auto");
	}
});

/* 인원 컬럼 클릭 이벤트 */
$(document).on("click", GRID1+" tr td", function() {
	
	// 일반 셀렉터
//	if($(this).text()<1) return;
//	var idx = $(this).index();
//	var resultTitle = "&resultTitle=" + $(this).parent().children("td:eq(1)").text()
//			+ " " + $(this).parent().children("td:eq(2)").text()
//			+ " " + $(this).parent().children("td:eq(3)").text()
//			+ " " + $("#tblStatAplcntStatusList th:eq("+idx+")").text();
//	var flag = "";
//	var cdCompany = "&cdCompany=" + $(this).parent().attr("data-cdcompany");
//	var cdBizarea = "&cdBizarea=" + $(this).parent().attr("data-cdbizarea");
//	var cdDept = "&cdDept=" + $(this).parent().attr("data-cddept");
//	var deptClass = "&deptClass=" + $(this).parent().attr("data-deptclass");

	// dataTable 셀렉터
	
	var table = $(GRID1).DataTable();
	
	if(table.cell(this).data()<1) return;
	
	var idx = table.cell(this).index().column;
	var nmBizarea = table.row(this).data().nmBizarea;
	var nmDept = table.row(this).data().nmDept;
	var deptClass = table.row(this).data().deptClass;
	var header = $(table.column(idx).header()).html();
	
	var resultTitle = "&resultTitle=" + nmBizarea+ " "+nmDept+ " "+deptClass+"기"+" "+header;
	var cdCompany = "&cdCompany=" + table.row(this).data().cdCompany;
	var cdBizarea = "&cdBizarea=" + table.row(this).data().cdBizarea;
	var cdDept = "&cdDept=" + table.row(this).data().cdDept;
	var deptClass = "&deptClass=" + deptClass;
	var flag = "";
	
	switch (idx) {
	case 7: // 지원자
		flag = "APLCNT";
		break;
	case 8: // 면접대상
		flag = "ITVW_WATING";
		break;
	case 9: // 면접참석
		flag = "ITVW_ATTD";
		break;
	case 10: // 합격자
		flag = "PICKED";
		break;
	case 11: // 포기자
		flag = "GIVEUP";
		break;
	case 12: // 최종합격
		flag = "FINAL_PICKED";
		break;
	case 13: // 교육출석
		flag = "EDU_ATTD";
		break;
	default:
		return;
	}
	window.open("statRcrtStatusPopUpd?flag="+flag+cdCompany+cdBizarea+cdDept+deptClass+resultTitle
			, "statRcrtStatusPopUpd", "left=0, top=50, width=1880, height=660");
});
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
	postData.put("DB_MAPPER", "employmentStatMapper"); // DB 네임스페이스
	postData.put("DB_REQID", "selectStatAplcntStatusList"); // DB 요청 ID
	
	// 하위 태그에서 데이터 추출
	postData = __putIntoPostData(FORM_SRCH, postData);
	
	var cbf = function(rs, elementId) {
		__setGridData(rs, elementId);
		$("#totalCount").html(" ("+rs.length+"건)");
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
		             , {className: "dt-head-center dt-body-left", targets: [1,2]} // 복수 개 선언시 [] 사용하며, _all 이전에 선언해주어야함
		             , {className: "dt-head-center dt-body-right", targets: [3]} // 복수 개 선언시 [] 사용하며, _all 이전에 선언해주어야함
		             , {className: "dt-center dt-nowrap", targets: "_all"} // css/bootstrap.min.css에서 table 글씨를좌측 정렬하는 css가 있어서 추가함.
		              ]
		, columns: [
		            { title: "", 			data: null, searchable: false, orderable: false, defaultContent: "" }
		          , { title: "사업장",		data: "nmBizarea", width:"130px" }
		          , { title: "부서",		data: "nmDept", width:"150px"  }
		          , { title: "기수",		data: "deptClass", width:"40px"
		        	  , render: function (data, type, row, set) {
						  var rtnVal = document.createElement("span");
						  rtnVal.setAttribute("style", "padding-right:5px");
						  rtnVal.appendChild(document.createTextNode(data+"기"));
						 
						  return rtnVal.outerHTML;
					  }
		          }
		          , { title: "기수교육월",	data: "eduMonth", render: __dtMaskDate, width:"70px" }
		          , { title: "진행상태",	data: "rcProgNm", width:"70px"
		        	  , render: function (data, type, row, set) {
						  var rtnVal = document.createElement("span");
						  rtnVal.appendChild(document.createTextNode(data));
						  var colVal = row.rcProgCd;
						  if(colVal == "1") {
							  rtnVal.classList.add("label", "bg-green");
						  } else if(colVal == "2") {
							  rtnVal.classList.add("label", "bg-red");
						  } else if(colVal == "3") {
							  rtnVal.classList.add("label", "bg-gray");
						  }
						  return rtnVal.outerHTML;
					  }  
		        	  
		          }
		          , { title: "요청인원", 	data: "requestPeopleCnt"
		        	  , render: function (data, type, row, set) {
						  var rtnVal = document.createElement("span");
						  rtnVal.setAttribute("style", "font-weight:bold;");
						  rtnVal.appendChild(document.createTextNode(data));
						 
						  return rtnVal.outerHTML;
					  }}
		          , { title: "지원자", 		data: "aplcntCnt" }
		          , { title: "면접대상",	data: "itvwWatingCnt" }
		          , { title: "면접참석",	data: "itvwAttdCnt"  }
		          , { title: "면접합격",	data: "pickedCnt"  }
		          , { title: "포기자",		data: "giveupCnt"  }
		          , { title: "최종합격",	data: "finalPickedCnt"  }
		          , { title: "교육출석",	data: "eduAttdCnt"  }
		          , { title: "진행상태코드",data: "rcProgCd", visible:false }
		          , { title: "회사코드",	data: "cdCompany", visible:false }
		          , { title: "사업장코드",	data: "cdBizarea", visible:false }
		          , { title: "부서코드",	data: "cdDept", visible:false }
		          
		          
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
		, scrollY: "480"
//	    , destroy: true
		, select: {
	        style: "single",  // false : row 선택x, single : row 선택 가능, multi : 여러개 row 선택 가능(라이브러리 추가해야가능)
		}
		,  "initComplete": function () {
			// p.s. 현 구조에서는 재조회시마다 실행되지 않고, 최최 화면 렌더링시에만 적용됨.(그래서 loading 기능 적용하려면 방법 강구 필요)
			$(".buttons-excel").hide();
			// row 클릭 이벤트 정의
//			$(document).on("click", GRID1 + ">tbody>tr", function() {
//				console.log(data.userid);
//			});
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

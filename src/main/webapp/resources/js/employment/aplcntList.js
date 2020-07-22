/**************************************************
 * source		: aplcntList.js
 * description	: 입사자 목록
 * ************************************************
 * date			author		description
 * ************************************************
 * 2016.05.12	ksw			최초 작성
 * 2017.09.18	ksw			리팩토링
 * ************************************************/

/**************************************************
 * 전역 변수 선언
 **************************************************/
var FORM_SRCH 	= "#tableSearch"; 	// 검색조건 개체 Selector
var GRID1 		= "#gridList1";		// 그리드1 개체 Selecotr ID

var pm = new PageMaker();
pm.cri.setPerPageNum(200);
pm.cri.setFunc(selectListTotalCount);

/**************************************************
 * 화면 초기화를 위한 객체 설정
 **************************************************/
var _pObj = {
	// job	: "INIT",	// "INIT", "NEW", "MOD", "DEL", ...
	validElementsSrch : "",	// 조회조건 validation 개체
	// validElementsForm1 : "",	// validation 대상 리스트
	deptListMap : new nMap(),	// 부서코드북 보관
	/*initPage:function() { this.init.Variable(); },*/
	/** 변수 초기화 */
	initVariable:function() {
		 this.validElementsSrch = __getValidElements(FORM_SRCH);
	},
	/** 셀렉트박스 초기화 */
	initDropDown:function() {
		// DB에서 공통코드 가져오기
		var codeListMap = __appCmm.getMultiCodeBookDB("PHONEITVWRESULT, ITVWRESULT");
		
		codeListMap.put("BIZAREA", __appCmm.getBizareaCodeBook());
		this.deptListMap.put("DEPT", __appCmm.getDeptCodeBook());
		__appCmm.setDropDown(codeListMap, "BIZAREA", "srchBizarea", "전체");
		__appCmm.setBizareaChangeEvent(this.deptListMap.get("DEPT"), "srchBizarea", "srchDept", "전체");
		$("#srchBizarea").trigger("change");
		__appCmm.setDropDown(codeListMap, "PHONEITVWRESULT", "srchPhoneItvwResult", "전체");
		__appCmm.setDropDown(codeListMap, "ITVWRESULT", "srchItvwResult", "전체");
	},
	/** 그리드 초기화 */
	initGrid:function() {
		_initGrid1(GRID1);
	},
	/** 유효상, 마스킹 초기화 */
	initMask:function() {
		// 필수값 설정
		
		// 유효성 설정
		$("#srchAplcntClass").prop("min", "1");
		$("#srchAplcntClass").prop("max", "5000");
		$("#srchAplcntNm").prop("maxlength", "15");
		$("#srchAplcntNm").prop("pattern", "[a-zA-Z0-9가-힣\\s]+");
		$("#srchAplcntNm").prop("title", "한글, 영문, 숫자만 입력 가능합니다.");
		$("#srchContactInfo").prop("maxlength", "20");
		$("#srchContactInfo").prop("pattern", "[0-9-]+");
		
		$("#srchItvwDate").addClass("dateMask"); // html5의 input:date는 dateMask 클래스만 추가
	},
	/** 데이터 초기화 */
	/*initData:function() {	},*/
	/** 페이지 상태 세팅
	 * job(INIT, NEW, MOD, ..)의 값에 따라 개체 초기화, 개체 비/활성화, 버튼 설정
	 * */
	setFormStatus:function(cond) {
		// 없음
	}
}

/**************************************************
 * 페이징 로딩 전 설정
 **************************************************/
$(document).ready(function() {
	_pObj.initVariable();
	_pObj.initDropDown();
	_pObj.initGrid();
	_pObj.initMask();
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
		if(!__checkValidation(_pObj.validElementsSrch)) { return; }
		selectListTotalCount();
		break;
	case "btnResetSrch":
		__elementClear(FORM_SRCH);
		break;
	case "btnNew":	// 신규 지원자 작성 화면 팝업
		openPopup("aplcntForm?job=NEW");
		break;
	case "btnMod":
		var sRow = $("tr.selected");
		var data = $(GRID1).DataTable().row( sRow ).data();
		if(isNull(data)) {
			__alertMsg("notSelected");
			return;
		}
		openPopup("aplcntForm?job=MOD&aplcntIdx=" + data.aplcntIdx);
		break;
	case "btnClipMobile":
		var text = "";
		var length = $(GRID1 + " tbody tr").length;
		document.getElementById("clipboard").value = "";
		for(var i=0; i<length; i++) {
			text += $(GRID1 + " tbody tr:eq("+i+")").attr("data-contactinfo")+"\n";
		}
		document.getElementById("clipboard").value = text;
		document.getElementById("clipboard").select();
		document.execCommand("Copy");
		alert("클립보드("+length+"개)를 확인하세요."+"\n"+text);
//		console.log(document.execCommand('Paste')); // Paste는 크롬에서 동작하지 않음.2016.06.21.namacoel
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
/** 팝업 함수 */
function openPopup(url) {
	// 듀얼 모니터 환경 반영 안되어 있음.
	var scWidth = screen.availWidth;
	var scHeight = screen.availHeight;

	var left = (parseInt(scWidth)+100)/2; // 해상도 가로 중심의 우측
	var top = (parseInt(scHeight)-960)/2; // 해상도 세로의 중심

	var win = window.open(url, "aplcntForm", 'width=650, height=900, top='+top+', left='+left);
	win.focus(); 
	// 열린 페이지에 포커스를 준다. 열림과동시에 앞쪽으로
	// 팝업창에서 부모창에 포커스를 줄때는 parent.focus();
}

/**************************************************
 * CRUD 함수 정의
 **************************************************/
/** 리스트 건수 조회 */
function selectListTotalCount() {
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "aplcntFormMapper");
	postData.put("DB_REQID", "selectAplcntListTotalCount");
	postData = __putIntoPostData(FORM_SRCH, postData);
	
	var cbf = function(rs) {
		var rs = rs[0];
		pm.setTotalCount(rs.totalCount);
		document.getElementById("totalCount").innerHTML = " / " + pm.getTotalCount();

		var ul = __makePageAllButton(pm.isPrev(), pm.isNext(), pm.getStartPage(), pm.getEndPage(), pm.cri.getPage());
		var node = document.getElementById("pagination");
		if(!node) return;

		while(node.hasChildNodes()) { // node가 가진 자식 노드가 있으면 
			node.removeChild(node.lastChild); // 마지막 자식노드를 삭제
		}
		node.appendChild(ul);
		selectList();
	};
	__serviceCall(CMM_ACTION, postData, true, cbf);
}

/** 리스트 조회 : 지원자리스트 */
function selectList() {
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "aplcntFormMapper");
	postData.put("DB_REQID", "selectAplcntListPaging");

	postData.put("page", pm.cri.getPage());
	postData.put("perPageNum", pm.cri.getPerPageNum());
	postData = __putIntoPostData(FORM_SRCH, postData);

	var cbf = function(rs, elementId) {
		
		document.getElementById("resultRange").innerHTML = pm.getResultRange(rs.length);
		__setGridData(rs, elementId, true);
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
		             , {className: "dt-center dt-nowrap", targets: [0]} // css/bootstrap.min.css에서 table 글씨를좌측 정렬하는 css가 있어서 추가함.
//		               {className: "td-ellipsis", targets: [0,3,7,8]} // 복수 개 선언시 [] 사용하며, _all 이전에 선언해주어야함
//		             , {className: "dt-head-center dt-nowrap", targets: "_all"} // css/bootstrap.min.css에서 table 글씨를좌측 정렬하는 css가 있어서 추가함.
		              ]
		, columns: [
				{ title: "", 			data: null, searchable: false, orderable: false, defaultContent: "", width:"10px" }
				  , { title: "순번",		data: "aplcntIdx"}
				  , { title: "접수일",	data: "receiptDate", render: __dtMaskDate }
				  , { title: "사업장",	data: "aplcntBizarea" }
				  , { title: "부서",		data: "aplcntDept" }
				  , { title: "기수",		data: "aplcntClass"
					  , render: function (data, type, row, set) {
						  if (isNull(data)) { return data; }
						  return data+'기';
					  }
				  }
				  , { title: "사번", 		data: "emplyNum" }
				  , { title: "이름", 		data: "aplcntNm" }
				  , { title: "생년월일",	data: "birthday", render: __dtMaskDate }
				  , { title: "성별",		data: "aplcntSex" }
				  , { title: "연락처",	data: "contactInfo", render: __dtMaskPhone }
				  , { title: "전면결과",	data: "phoneItvwResult" }
				  , { title: "면접일",	data: "itvwDate", render: __dtMaskDate }
				  , { title: "면접시간",	data: "itvwTime", render: __dtMaskTime }
				  , { title: "면접참석",	data: "itvwAttd" }
				  , { title: "면접결과",	data: "itvwResult"
					  , render: function (data, type, row, set) {
						  var rtnVal = document.createElement("span");
						  rtnVal.appendChild(document.createTextNode(data));
						  if(data == "합격") {
							  rtnVal.classList.add("badge", "bg-green");
						  } else if(data == "불합격") {
							  rtnVal.classList.add("badge", "bg-red");
						  }
						  return rtnVal.outerHTML;
					  }
				  }
				  , { title: "교육의사",	data: "eduAttdIttnStts" }
				  , { title: "교육참석",	data: "eduAttdStts" }
				  , { title: "교육일",	data: "eduDate" }
				  , { title: "주소(도)",	data: "addrDoNm" }
				  , { title: "주소(시)",	data: "addrSiNm" }
				  , { title: "주소(구)",	data: "addrGuNm" }
				  , { title: "이메일",	data: "email", className: "td-ellipsis" }
				  , { title: "결혼",		data: "maritalStts" }
				  , { title: "학력",		data: "highestEdu" }
				  , { title: "전공",		data: "major" }
				  , { title: "경력",		data: "careerStts" }
				  , { title: "회사명1",	data: "company1" }
				  , { title: "근무기간1",	data: "companyPeriod1", className: "td-ellipsis" }
				  , { title: "담당업무1",	data: "assignedTask1", className: "td-ellipsis" }
				  , { title: "회사명2",	data: "company2" }
				  , { title: "근무기간2",	data: "companyPeriod2", className: "td-ellipsis" }
				  , { title: "담당업무2",	data: "assignedTask2", className: "td-ellipsis" }
				  , { title: "블랙",		data: "blacklist" }
				  , { title: "채용경로1",	data: "recruitSite1" }
				  , { title: "채용경로2",	data: "recruitSite2", className: "td-ellipsis" }
				  , { title: "채용경로3",	data: "recommender", className: "td-ellipsis"}
				  , { title: "서류면접",	data: "docItvw", className: "td-ellipsis" }
				  , { title: "전화면접",	data: "phoneItvw", className: "td-ellipsis" }
				  , { title: "대면면접",	data: "ptopItvw", className: "td-ellipsis" }
				  , { title: "면접관",	data: "interviewer" }
				  , { title: "입사일",	data: "jobDay" }
				  , { title: "투입일",	data: "putDay" }
				  , { title: "퇴사일",	data: "quitDay" }
				  , { title: "수정자",	data: "upid" }
			    ]
		, searching: false // 자체 검색 기능 여부 	
		, paging: false	// 자체 페이징 기능 여부
	    , info: false // info 기능 여부
		, ordering: true // 정렬 기능 여부
		, order: [[ 1, "desc" ]] // 최초 정렬 기준 설정(컬럼위치, asc/desc)
//		, stateSave: true // 정렬등 상태값을 저장하여 재조회 하여도 상태가 유지됨 (의미없는듯... ?)
		, language: { // 테이블 데이터가 없을 때 표시할 내용
		       emptyTable : "조회된 데이터가 없습니다."
		    }
	    , autoWidth: false
		, scrollX: true		// true/false 가능
		, scrollY: "550"
//	    , destroy: true
		, select: true
/*		, fixedColumns:   {
			leftColumns: 8,
        }*/
	    , createdRow: function(row, data, index) {
	    	row.setAttribute("data-aplcntIdx", data.aplcntIdx);
	    	row.setAttribute("data-contactinfo", data.contactInfo);
	    	if(data.blacklist == 'O') {
        		row.setAttribute("style", "background-color: cornsilk;");
        	}
	    	if(!isNull(data.quitDay)) {
	    		$(row).css("color", "tomato");
	    	}
	    }
		, initComplete: function () {
			// p.s. 현 구조에서는 재조회시마다 실행되지 않고, 최초 화면 렌더링시에만 적용됨.(그래서 loading 기능 적용하려면 방법 강구 필요)
			$(".buttons-excel").hide();
			$(document).on("dblclick", GRID1+" tbody>tr", function() {
				// 선택 후 더블클릭이었으나 그냥 더블클릭으로 변경한다. 2020.01.16
				var aplcntIdx = $(this).attr("data-aplcntidx");
				openPopup("aplcntForm?job=MOD&aplcntIdx=" + aplcntIdx);
				
//				$("#btnMod").trigger("click");
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
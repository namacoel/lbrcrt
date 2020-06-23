/**************************************************
 * source		: statRcrtStatusPopUpd.js
 * description	: 통계.지원자 현황
 * ************************************************
 * date			author			description
 * ************************************************
 * 2016.09.05	김상우			최초 작성
 * 2018.05.02	ksw				리팩토링
 * 2019.06.04	ksw				누락부분 추가(지원자 정보 더블 클릭시 팝업)
 * 2019.08.02	ksw				멀티셀릭트 추가
 * ************************************************
 * 메모
 *  
 **************************************************/

/**************************************************
 * 전역 변수 선언
 **************************************************/
//var FORM_SRCH 	= "#tableSearch"; 	// 검색조건 개체 Selector
var GRID1 		= "#gridList1";		// 그리드1 개체 Selecotr ID
//var FORM1 		= "#tableDetail1"; 	// 상세정보 개체 Selector

var codeListMap = new nMap();

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
		// DB에서 공통코드 가져오기
		codeListMap = __appCmm.getMultiCodeBookDB(
			"SEX, HIGHESTEDU, RECRUITSITE1, RECRUITSITE2, PHONEITVWRESULT, ATTDSTTS, ITVWRESULT, OXSTTS"
			);

		// selectBox 세팅
		
	},
	/** 유효상, 마스킹 초기화 */
	initMask:function() {
		// 필수값 설정
		
		// 유효성 설정
		
		// 마스크 설정
		
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
		// 내용 없음
	}
}

/**************************************************
 * 버튼 상태 설정(버튼/상태의 순서/갯수는 동일해야함)
 **************************************************/
var _btnObj = {
//	내용 없음
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
	$("#itvwDt").trigger("change");
});

/**************************************************
 * 이벤트 핸들러
 **************************************************/
$(document).on("click", "button", function() {
	var elementId = $(this).attr("id");
	
	switch (elementId) {
	case "btnClipMobile":
		var text = "";
		var dtLength = $(GRID1).DataTable().rows().data().length;
		document.getElementById("clipboard").value = "";
		for(var i=0; i<dtLength; i++) {
			text += __toPhoneFormat($(GRID1).DataTable().row(i).data().contactInfo)+"\n";
//			text += $("#tblResultList tbody tr:eq("+i+")").attr("data-contactinfo")+"\n";
		}
		document.getElementById("clipboard").value = text;
		document.getElementById("clipboard").select();
		document.execCommand("Copy");
		alert("클립보드("+dtLength+")를 확인하세요."
				+ "\n"
				+ text
				);
//		console.log(document.execCommand('Paste')); // Paste는 크롬에서 동작하지 않음.2016.06.21.namacoel
		break;
	case "btnExportExcel":
		if(!__confirmMsg("EXPORT_EXCEL")) { return; }
		$(".buttons-excel").click();
		break;
	case "btnSave":
		updateList();
		
		break;
	default:
		break;
	}
});

/** 행 선택시 팝업이 된다. tr로 했으나 td에 데이터를 추가하면서 td로 변경했다. */
$(document).on("dblclick", GRID1 + ">tbody>tr>td", function() {
	var idx = $(this).index()
	// 입력하는 부분은 더블클릭 이벤트를 실행하지 않는다.
	if(idx>11 && idx<20) return;
	// 여기서 this 가 td인데 row(this)가 정상적으로 동작하는건 잘 이해되지 않는다.
	var aplcntIdx = $(GRID1).DataTable().row(this).data().aplcntIdx;
	aplcntOpenPopup("aplcntForm?job=MOD&aplcntIdx=" + aplcntIdx);
});


/** 면접일시 변경시 이벤트 */
$(document).on("change", "#itvwDt", function() {
	selectList();
});

/** 테이블의 셀렉트 박스가 변경되면 로우가 선택되는 이벤트 */
$(document).on("change", "#gridList1 select, #gridList1 input, #gridList1 textarea ", function() {
//	console.log("셀렉트박스 값 : "+$(this).val());
	$(this).parent().parent().addClass("selected");
});

/**************************************************
 * 일반 함수 정의
 **************************************************/
//지원자 양식 팝업 함수
function aplcntOpenPopup(url) {
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

/** 지원자 일괄 수정 */
function updateList() {
	
	var mapList = new Array;
	var dt = $(GRID1).DataTable();
	// datatable에서 선택된 로우의 인덱스를 가져온다. (이 부분 도출하는데 사흘 걸렸다.)
	/* 참고 사이트 https://stackoverflow.com/questions/34329997/export-data-from-datatable-with-select-element-exports-each-option-from-the-sele */
	var listIdx = dt.rows('.selected').indexes().toArray();
	
	if(isNull(listIdx.length)) {
		__alertMsg("notSelected");
		return;
	} else {
		
		if(!__confirmMsg("UPDATE")) { return; }
		
		
		for(var i in listIdx) {
			var mapData = new nMap();
			var idx = listIdx[i];
			
			/* 아래처럼 [idx]의 형태로 사용하면 dt의 해당idx와 그리드에서 정렬순서를 변경시 실제idx값과 그리드상의 idx가 달라서 문제가 된다.
			var aplcntIdx 		= dt.rows().data()[idx].aplcntIdx;
			var interviewer 	= dt.rows().column(12).nodes().to$().children('input')[idx].value;
			객체 찾기느 ㄴchidren() 혹은 find() 사용 가능
			*/
			
			// 고유 idx를 사용하려면 아래처럼 사용하면 해결 된다.
			
			var aplcntIdx 		= dt.row(idx).data().aplcntIdx;
			var interviewer 	= dt.cell({row:idx, column:12}).nodes().to$().children('input').val();
			var itvwAttd 		= dt.cell({row:idx, column:13}).nodes().to$().children('select').val();
			var itvwResult 		= dt.cell({row:idx, column:14}).nodes().to$().children('select').val()
			var ptopItvw 		= dt.cell({row:idx, column:15}).nodes().to$().children('textarea').val();
			var eduAttdIttnStts = dt.cell({row:idx, column:16}).nodes().to$().children('select').val();
			var eduAttdStts 	= dt.cell({row:idx, column:17}).nodes().to$().children('select').val();
			var eduDate 		= dt.cell({row:idx, column:18}).nodes().to$().children('input').val();
			var emplyNum 		= dt.cell({row:idx, column:19}).nodes().to$().children('input').val();
			
			mapData.put("aplcntIdx", aplcntIdx);
//			mapData.put("phoneItvwResult", phoneItvwResult);
			mapData.put("interviewer", interviewer.trim());
			mapData.put("itvwAttd", itvwAttd);
			mapData.put("itvwResult", itvwResult);
			mapData.put("ptopItvw", ptopItvw.trim());
			mapData.put("eduAttdIttnStts", eduAttdIttnStts);
			mapData.put("eduAttdStts", eduAttdStts);
			mapData.put("eduDate", __getNum(eduDate));
			mapData.put("emplyNum", emplyNum);
			
			mapList.push(mapData.map);
		}
	}

//	console.log(mapList);
	for(var i in mapList) {
//		console.log(mapList[i]);
	}
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "U");
	postData.put("DB_MAPPER", "employmentStatMapper");
	postData.put("DB_REQID", "updateAplcntList");
	const ACTION = context_path+"/employmentAction/updateAplcntList";
	postData.put("mapList", mapList);
	
	var cbf = function(rs, elementId) {
		if(isNull(rs.cnt)) {
			return;
		} else {
			// 정상조회시 처리 로직
			selectList();
		}
	};
	
	return __serviceCall(ACTION, postData, false, cbf, "BLOCK");
}

/** 리스트 조회 : */
function selectList() {
	
	var flag = $("#flag").val();
	var cdCompany = $("#cdCompany").val();
	var cdBizarea = $("#cdBizarea").val();
	var cdDept = $("#cdDept").val();
	var deptClass = $("#deptClass").val();
	var itvwDt = $("#itvwDt").val();
	var itvwDate = "";
	var itvwTime = "";
	
	var fullPathName = opener.location.pathname;
	var arrPathName = fullPathName.split("/");
	var lastPathName = arrPathName[arrPathName.length-1];
	
	if(!isNull(itvwDt)) {
		itvwDate = itvwDt.substr(0,8);
		itvwTime = itvwDt.substr(8,4);		
	} else {
		itvwDate = $("#itvwDate").val();
	}
	
	/* statRcrtStatus가 아닐떈 날짜정보가 꼭 있어야 하도록 예외처리 */
	if(lastPathName != "statRcrtStatus") {
		if(isNull(deptClass)||isNull(cdDept)) {
			if(isNull(itvwDate)) {
				__alertMsg("invalidRange")
				return;
			}
		}
	}
	
//	console.log(flag+"/"+cdCompany+"/"+cdBizarea+"/"+cdDept+"/"+deptClass+"/"+itvwDt);
	
	var postData = new nMap();

	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "employmentStatMapper"); // DB 네임스페이스
	postData.put("DB_REQID", "selectStatRcrtStatusResultList"); // DB 요청 ID
	
	// 하위 태그에서 데이터 추출
//	postData = __putIntoPostData(FORM_SRCH, postData);
	postData.put("flag", flag);
	postData.put("cdCompany", cdCompany);
	postData.put("cdBizarea", cdBizarea);
	postData.put("cdDept", cdDept);
	postData.put("deptClass", deptClass);
	postData.put("itvwDate", itvwDate);
	postData.put("itvwTime", itvwTime);
	
	var cbf = function(rs, elementId) {
		__setGridData(rs, elementId, false);
		$("#totalCount").html(" ("+rs.length+"건)");
		
		$(GRID1+" tbody tr").each(function() { $(this).find("td:eq(19) input").upperNumber() });
		
		// selectbox option 이 없을 때만 세팅하도록 한다.
		if($("#itvwDt option").length == 0) {
		
			// 면접일시를 배열어 넣고, 중복값을 제거하기 위한 변수 선언
			var arrItvwDt = new Array;
			var dtLength = $(GRID1).DataTable().rows().data().length;
			
			for(var i=0;i<dtLength;i++) {
				var tempItvwDt = $(GRID1).DataTable().row(i).data().itvwDate+$(GRID1).DataTable().row(i).data().itvwTime;
				if(!isNull(tempItvwDt)) { arrItvwDt.push(tempItvwDt); }
			}
		
			var arrUniqItvwDt = arrItvwDt.slice().sort(function(a,b){return a - b}).reduce(function(a,b){if (a.slice(-1)[0] !== b) a.push(b);return a;},[]);
			var e = "itvwDt";
			deleteChildElements(e, "option", "선택");
			
			for(var i in arrUniqItvwDt) {
				var optionElement = document.createElement("option");
				optionElement.setAttribute("value", arrUniqItvwDt[i]);
				arrUniqItvwDt[i] = __toDateFormat(arrUniqItvwDt[i].substr(0,8))+" "+__toTimeFormat(arrUniqItvwDt[i].substr(8,4));
				optionElement.appendChild(document.createTextNode(arrUniqItvwDt[i]));
				document.getElementById(e).appendChild(optionElement);
			}
		}
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
		             , { orderable: false, className: 'select-checkbox', targets: 0 }
		             , {className: "dt-head-center dt-body-left dt-nowrap", targets: [2,4]} // 복수 개 선언시 [] 사용하며, _all 이전에 선언해주어야함
		             , {className: "dt-head-center dt-body-left td-ellipsis", targets: [10,12,20,23,24,25,26,27,28]} // 복수 개 선언시 [] 사용하며, _all 이전에 선언해주어야함
		             , {className: "dt-center dt-nowrap", targets: "_all"} // css/bootstrap.min.css에서 table 글씨를좌측 정렬하는 css가 있어서 추가함.
		              ]
		, columns: [
		            { title: "", 		data: null, searchable: false, orderable: false, defaultContent: "", width:"10px" }
		          , { title: "순번",		data: "aplcntIdx", width:"50px" }
		          , { title: "사업장",	data: null, defaultContent: ""
		        	  , render: function (data, type, row, set) {
						  var rtnVal = row.aplcntBizareaNm+" "+row.aplcntDeptNm+"\u00A0\u00A0\u00A0"+row.aplcntClass+"기";
						  return rtnVal;
					  }
		          }
		          , { title: "이름",		data: "aplcntNm", width:"50px" }
		          , { title: "생년월일",	data: "birthday", width:"80px", render: __dtMaskDate }
		          , { title: "성별",		data: "aplcntSex", width:"40px" }
		          , { title: "연락처",	data: "contactInfo", width:"80px", render: __dtMaskPhone }
		          , { title: "채용경로1",	data: "recruitSite1", width:"80px" }
		          , { title: "채용경로2",	data: "recruitSite2", width:"80px" }
	          
		          , { title: "전면결과",	data: "phoneItvwResultNm", width:"60px" }		          
		          , { title: "전화면접",	data: "phoneItvw", width:"80px" }
		          , { title: "면접일시",	data: null, width:"60px"
		        	  , render: function (data, type, row, set) {
						  var rtnVal = __toDateFormat(row.itvwDate)+"\u00A0"+__toTimeFormat(row.itvwTime);
						  
						  return rtnVal;
					  }
		          }
		          , { title: "면접관",	data: "interviewer", width:"60px", orderable: false, render: _dtSetText_interviewer }
		          , { title: "면접참석",	data: "itvwAttd", width:"60px", orderable: false, render: _dtSetDropdown_oxStts }
		          , { title: "면접결과",	data: "itvwResult", width:"60px", orderable: false, render: _dtSetDropdown_itvwResult }
		        
		          , { title: "대면면접",	data: "ptopItvw", width:"100px", orderable: false, render: _dtSetTextarea }
		          , { title: "교육의사",	data: "eduAttdIttnStts", width:"60px", orderable: false, render: _dtSetDropdown_eduAttdIttnStts }
		          , { title: "교육참석",	data: "eduAttdStts", width:"60px", orderable: false, render: _dtSetDropdown_oxStts }
		          , { title: "교육일",	data: "eduDate", width:"60px", orderable: false, render: _dtSetDate }
		          , { title: "사번",		data: "emplyNum", width:"60px", orderable: false, render: _dtSetText_emplyNum }
		          
		          , { title: "주소",		data: null, width:"100px", defaultContent: ""
		        	  , render: function (data, type, row, set) {
						  var rtnVal = "";
						  
						  if(row.addrDo != "없음" && row.addrDo != null) rtnVal += row.addrDo+"\u00A0";
						  if(row.addrSi != "없음" && row.addrSi != null) rtnVal += row.addrSi+"\u00A0";
						  if(row.addrGu != "없음" && row.addrGu != null) rtnVal += row.addrGu;
						  
						  return rtnVal;
					  }
		          }
		          , { title: "학력",		data: "highestEdu", width:"40px" }
		          , { title: "경력",		data: "careerStts", width:"40px" }
		          , { title: "회사명1",	data: "company1", width:"100px" }
		          , { title: "근무기간1",	data: "companyPeriod1", width:"80px" }
		          , { title: "담당업무1",	data: "assignedTask1", width:"100px" }
		          , { title: "회사명2",	data: "company2", width:"100px" }
		          , { title: "근무기간2",	data: "companyPeriod2", width:"80px" }
		          , { title: "담당업무2",	data: "assignedTask2", width:"100px" }
		          
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
		, scrollX: "2840px"		// true/false 가능
		, scrollY: "480"
		, fixedColumns: {
			leftColumns: 0 // 컬럼과 멀티셀렉트 호환 문제 있음
			, rightColumns: 0
		}
//	    , destroy: true
		, select: {
			style: 'multi'  // false : row 선택x, single : row 선택 가능, multi : 여러개 row 선택 가능(라이브러리 추가해야가능)
			, selector: 'td:first-child' // 클릭시 셀렉트가 되는 범위 지정
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

/**************************************************
 * 그리드 함수
 **************************************************/

/** dt 그리드 : 전화면접 */
/*
function _dtSetDropdown_phoneItvwResult(data, type, row, set) {

//	console.log("set.row : " + set.row);
	var $select = $("<select></select>", {
		// 처리할 것이 아니면 id를 따로 설정할 필요는 없을 것으로 판단된다.
//		"id": row["phoneItvwResult"]+"start",
		"value": data
	});
	var $nullName = $("<option></option>", {
		"text": "선택",
		"value": ""
	});
	$select.append($nullName);

	$.each(codeListMap.get("PHONEITVWRESULT"), function(k,v){
		var $option = $("<option></option>", {
			"text": v.codeNm,
			"value": v.code
		});
		// console.log("data === v : " + (data === v.code) + " : " + data + " / " + v.code)
		if(data === v.code){
			$option.attr("selected", "selected")
		}
		$select.append($option);
	});
	return $select.prop("outerHTML");
}
*/
/** dt 그리드 : 면접관 */
function _dtSetText_interviewer(data, type, row, set) {

	var $select = $("<input></input>", {
		"type": "text",
		"maxlength": "50",
		"value": data
	});

	return $select.prop("outerHTML");
}

/** dt 그리드 : 사번 */
function _dtSetText_emplyNum(data, type, row, set) {

	var $select = $("<input></input>", {
		"type": "text",
		"maxlength": "6",
		"pattern": "([0-9A-Z]{1})([0-9]{5})",
		"title": "숫자 6자리, 단기는 알파벳1자리+숫자5자리입니다.",
		"value": data
	});

	return $select.prop("outerHTML");
}


/** dt 그리드 : 면접참석, 교육참석여부 */
function _dtSetDropdown_oxStts(data, type, row, set) {
	var $select = $("<select></select>", {
		"value": data
	});
	var $nullName = $("<option></option>", {
		"text": "선택",
		"value": ""
	});
	$select.append($nullName);

	$.each(codeListMap.get("OXSTTS"), function(k,v){
		var $option = $("<option></option>", {
			"text": v.codeNm,
			"value": v.code
		});
		// console.log("data === v : " + (data === v.code) + " : " + data + " / " + v.code)
		if(data === v.code){
			$option.attr("selected", "selected")
		}
		$select.append($option);
	});
	return $select.prop("outerHTML");
}

/** dt 그리드 : 면접결과 */
function _dtSetDropdown_itvwResult(data, type, row, set) {

	var $select = $("<select></select>", {
		"value": data
	});
	var $nullName = $("<option></option>", {
		"text": "선택",
		"value": ""
	});
	$select.append($nullName);

	$.each(codeListMap.get("ITVWRESULT"), function(k,v){
		var $option = $("<option></option>", {
			"text": v.codeNm,
			"value": v.code
		});
		// console.log("data === v : " + (data === v.code) + " : " + data + " / " + v.code)
		if(data === v.code){
			$option.attr("selected", "selected")
		}
		$select.append($option);
	});
	return $select.prop("outerHTML");
}

/** dt 그리드 : 대면면접 */
function _dtSetTextarea(data, type, row, set) {

	var $select = $("<textarea></textarea>", {
		"maxlength": "1000",
		"text": data
	});
	
	return $select.prop("outerHTML");
}

/** dt 그리드 : 교육의사 */
function _dtSetDropdown_eduAttdIttnStts(data, type, row, set) {

	var $select = $("<select></select>", {
		"value": data
	});
	var $nullName = $("<option></option>", {
		"text": "선택",
		"value": ""
	});
	$select.append($nullName);

	$.each(codeListMap.get("ATTDSTTS"), function(k,v){
		var $option = $("<option></option>", {
			"text": v.codeNm,
			"value": v.code
		});
		// console.log("data === v : " + (data === v.code) + " : " + data + " / " + v.code)
		if(data === v.code){
			$option.attr("selected", "selected")
		}
		$select.append($option);
	});
	return $select.prop("outerHTML");
}

/** dt 그리드 : 교육일 */
function _dtSetDate(data, type, row, set) {

	var $select = $("<input></input>", {
		"type": "date",
		"value": __toDateFormat(data, "-")
	});
	var $nullName = $("<option></option>", {
		"text": "선택",
		"value": ""
	});
	$select.append($nullName);

	$.each(codeListMap.get("ATTDSTTS"), function(k,v){
		var $option = $("<option></option>", {
			"text": v.codeNm,
			"value": v.code
		});
		// console.log("data === v : " + (data === v.code) + " : " + data + " / " + v.code)
		if(data === v.code){
			$option.attr("selected", "selected")
		}
		$select.append($option);
	});
	return $select.prop("outerHTML");
}

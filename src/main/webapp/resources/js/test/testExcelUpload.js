/*************************************************
 * Source		: testExcelUplaod.js
 * Description	: 엑셀 업로드
 * ***********************************************
 * Date			Author		Description
 * ***********************************************
 * 2020.06.05	ksw			최초 작성
 * ***********************************************/

/**************************************************
 * 전역 변수 선언
 **************************************************/
var FORM_SRCH 	= "#tableSearch"; 	// 검색조건 개체 Selector
var GRID1 		= "#gridList1";		// 그리드1 개체 Selecotr ID
var FORM1 		= "#tableDetail1"; 	// 상세정보 개체 Selector

var codeListMap = new nMap();

var cols = Array();
cols.push(["CHECK"		,"isCheck"]);
cols.push(["접수일"		,"receiptDate", "NUMBER"]);
cols.push(["회사"			,"aplcntCompany", "ENGNUM"]);
cols.push(["사업장"		,"aplcntBizarea", "ENGNUM"]);
cols.push(["부서"			,"aplcntDept", "ENGNUM"]);
cols.push(["기수"			,"aplcntClass", "NUMBER"]);
cols.push(["사번"			,"emplyNum"]);
cols.push(["이름"			,"aplcntNm", ]);
cols.push(["생년월일"		,"birthday", "NUMBER"]);
cols.push(["성별"			,"aplcntSex", "ENG"]);
cols.push(["연락처"		,"contactInfo", "NUMBER"]);

cols.push(["주소(도)"		,"addrDo", "ENGNUM"]);
cols.push(["주소(시)"		,"addrSi", "ENGNUM"]);
cols.push(["주소(구)"		,"addrGu", "ENGNUM"]);
cols.push(["이메일"		,"email"]);
cols.push(["학력"			,"highestEdu", "ENGNUM"]);
cols.push(["전공"			,"major"]);
cols.push(["경력"			,"careerStts", "ENGNUM"]);
cols.push(["회사명1"		,"company1"]);
cols.push(["근무기간1"		,"companyPeriod1"]);
cols.push(["담당업무1"		,"assignedTask1"]);

cols.push(["회사명2"		,"company2"]);
cols.push(["근무기간2"		,"companyPeriod2"]);
cols.push(["담당업무2"		,"assignedTask2"]);
cols.push(["블랙"			,"blacklist", "ENGNUM"]);
cols.push(["채용경로1"		,"recruitSite1"]);
cols.push(["채용경로2"		,"recruitSite2"]);
cols.push(["추천인"		,"recommender"]);
cols.push(["서류면접"		,"docItvw"]);
cols.push(["입사일"		,"jobDay", "NUMBER"]);
cols.push(["퇴사일"		,"quitDay", "NUMBER"]);
		  

/**************************************************
 * 화면 초기화를 위한 객체 설정
 **************************************************/
var _pObj = {
	job	: "INIT",	// "INIT", "NEW", "MOD", "DEL", ...
	// validElementsSrch : "",	// 조회조건 validation 개체
	// validElementsForm1 : "",	// validation 대상 리스트
	deptListMap : new nMap(),		// 부서코드 보관
	addrListMap : new nMap(),		// 주소코드 보관
	recruitSite2Map : new nMap(), 	// 채용경로2 코드보관 

	/*initPage:function() { this.init.Variable(); },*/
	/** 변수 초기화 */
	initVariable:function() {
		this.validElementsForm1 = __getValidElements(FORM1);
	},
	/** 셀렉트박스 초기화 */
	initDropDown:function() {
		// DB에서 공통코드 가져오기
		//var codeListMap = __appCmm.getMultiCodeBookDB("USERSTTS, USERCLSS, SEX");
		codeListMap = __appCmm.getMultiCodeBookDB("SEX, HIGHESTEDU, OXSTTS, RECRUITSITE1, RECRUITSITE2");
		
		codeListMap.put("BIZAREA", __appCmm.getBizareaCodeBook());
		this.deptListMap.put("DEPT", __appCmm.getDeptCodeBook());
		//__appCmm.setDropDown(codeListMap, "BIZAREA", "srchBizarea", "전체");
		//__appCmm.setBizareaChangeEvent(this.deptListMap.get("DEPT"), "srchBizarea", "srchDept", "전체");
		//$("#srchBizarea").trigger("change");
		//__appCmm.setDropDown(codeListMap, "PHONEITVWRESULT", "srchPhoneItvwResult", "전체");
		//__appCmm.setDropDown(codeListMap, "ITVWRESULT", "srchItvwResult", "전체");

		this.addrListMap = __appCmm.getAddrCodeBook();

		// selectBox 세팅

	},
	/** 유효상, 마스킹 초기화 */
	initMask:function() {
		// 필수값 설정
		
		// 유효성 설정
	
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

var _jobStts = {
	isCheckValue : false
	, excelDup : false
	, dbDup : false
	, done : false
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
	
//	_pObj.initVariable();
//	_pObj.initDropDown();
//	_pObj.initMask();
	_pObj.initGrid();
//	_pObj.setFormStatus("INIT");
//	$("#btnSrch").trigger("click");
  
});

/**************************************************
 * 이벤트 핸들러
 **************************************************/

 /** 파일 업로드 버튼 체인지 */
$(document).on("change", "#excelFile", function() {
	console.log(1);
	if (window.FileReader) {
		var filename = $(this)[0].files[0].name;
	} else {
		var filename = $(this).val().split('/').pop().split('\\').pop();
	}
	$(this).siblings('.upload-name').val(filename); // 파일명 디른 개체에 표기

	// 파일형식 검사
	console.log("this.files[0].type : "+this.files[0].type);
	if(!checkImageType(this.files[0].type)) {
		alert("엑셀 파일만 등록 가능합니다.");
		$(this).val("");
		$("#uploadName").val("");
		return;
	}
	
	console.log("this.files[0].size : "+this.files[0].size);
	// 파일크기 검사
	if(this.files[0].size > 10485760) {
		
		alert("10MB 미만의 파일만 등록 가능합니다.("+this.files[0].size+")");
		$(this).val("");
		$("#uploadName").val("");
		return;
	}
	uploadForm();
});

/** formdata 전송 */
function uploadForm() {
	var form = $("#formUpload")[0];
	var data = new FormData(form);

//	for (var pair of data.entries()) { console.log(pair[0]+ ', ' + pair[1]); }
	var it = data.entries();
	var result = it.next();
	while(!result.done) {
		console.log(result.value);
		result= it.next();
	}

	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	
	$.ajax({
		enctype : "multipart/form-data",
		method : "POST",
		url : context_path+"/test/excelUpload",
		processData : false,
		contentType : false,
		cache : false,
		data : data,
		beforeSend: function(xhr) {
			__loadingBar.show();
			xhr.setRequestHeader(header, token);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			if (XMLHttpRequest.status == "400") {
				alert("전송된 Request에 문제가 있가 있습니다.(code:" + XMLHttpRequest.readyState + ":" + XMLHttpRequest.status+")");
			} else if (XMLHttpRequest.status == "500"){
				alert("서버 처리시 문제가 발생하 문제가 있습니다.(code:" + XMLHttpRequest.readyState + ":" + XMLHttpRequest.status+")");
			} else if (XMLHttpRequest.status == "403"){
				alert("접근이 거부되었습니다.(code:" + XMLHttpRequest.readyState + ":" + XMLHttpRequest.status+")");
			} else {
				alert("AJAX return is...\n" + textStatus + "(" + XMLHttpRequest.status + ")\n" + errorThrown + "\n" + XMLHttpRequest.getAllResponseHeaders());
			}
			__loadingBar.hide();
		}
		, success:function(result){
			jsonData = result;
			alert(jsonData.cnt + " 건이 업로드 되었습니다.");
			__loadingBar.hide(); 
		}
	});
}

$(document).on("click", "button", function(e) {
	var elementId = $(this).attr("id");
	
	switch (elementId) {
	case "btnSrch":
		_pObj.setFormStatus("INIT");
		selectList();
		break;
	case "btnNew":
		_pObj.setFormStatus("NEW");
		break;
	case "btnSave":
		var job = _pObj.job;
//		console.log("_pObj.job >> " + job)
		
		if(!insertData()) { return; }
		
		break;
	case "btnFileUpload":
		e.preventDefault();
		$(GRID1).DataTable().clear().draw();
		// file 태그가 val값이 동일하면 change 이벤트가 일어나지않아 동일한 파일을 재선택해도 동작하도록 초기화 해준다.
		$("#uploadName").val("");
		$("#excelFile").val("");
		$("#excelFile").trigger("click");
		break;
	case "btnDupCheck":
		dupCheck();
		break;
	}
});

/**************************************************
 * 일반 함수 정의
 **************************************************/

 /** 중복 검사 */
function dupCheck() {
	var dt = $(GRID1).DataTable();
	
	var mapList = new Array();

	// 데이터 존재여부 검사
	if(dt.rows().count() < 1 ) {
		alert("데이터가 없습니다.");
		return;
	}
	
	var maxCnt = 200;
	if(dt.rows().count() > maxCnt) {
		// 중복체크시 200개이하, insert시 30개로 제한..
		alert("데이터는 "+maxCnt+"개를 초과할수 없습니다.");
		return; 
	}

	var arrTemp = dt.rows().data().toArray();	// dataTable에 있는 dataSet을 array로 가져오기

	for(var idx in arrTemp) {
		// 에러여부 검사
		if(!isNull(arrTemp[idx].isCheck)) {
			 alert((Number(idx)+1)+"번째 데이터를 확인해주세요");
			 return;
		}

		// 이름, 생년월일, 성별만 추출(DB 검사용)
		var tempMap = new nMap();
		tempMap.put("idx", idx);
		tempMap.put("aplcntNm", arrTemp[idx].aplcntNm);
		tempMap.put("birthday", (arrTemp[idx].birthday).left(4));
		tempMap.put("aplcntSex", arrTemp[idx].aplcntSex);
		mapList.push(tempMap.map);
	}
	
	// 엑셀 데이터 내에 이름/생년월일/성별 중복 검사
	// 2개(i, j)의 데이터를 비교해서 중복이면, j는 중복 검사 안하도록 로직 추가
	for(var i in arrTemp) {
		if(!isNull(arrTemp[i].excelDup)) continue;
//		console.log("i : "+i);
		for(var j in arrTemp) {
			if(!isNull(arrTemp[j].excelDup)) continue;
//			console.log("j : "+j);
			if(i!=j &&  arrTemp[i].aplcntNm == arrTemp[j].aplcntNm && arrTemp[i].birthday == arrTemp[j].birthday && arrTemp[i].aplcntSex == arrTemp[j].aplcntSex) {
//				console.log(arrTemp[i].aplcntNm + " : " + arrTemp[j].aplcntNm);
				arrTemp[i].excelDup = true;
				arrTemp[j].excelDup = true;
				// dt.cell({row:i, column:1}).data('중복'); // 이렇게하면 화면에 보이는 값과 dataSet 값도 함께 변경됨
			}
		}
	}

	for(var idx in arrTemp) {
		if(!isNull(arrTemp[idx].excelDup)) {
			dt.rows().data()[idx].isCheck = "엑셀중복";
			_jobStts.excelDup = true;
		}
	}
	__setGridData(dt.rows().data().toArray(), GRID1); // 수정된 데이터셋으로 다시 그리기

	if(_jobStts.excelDup) {
		__loadingBar.hide();
		alert("엑셀상의 중복 데이터를 제거해주세요.");
		return;
	}

	// 엑셀 상의 중복을 제거한 후에 DB 상의 중복 건수 체크가 진행된다.
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R");
	postData.put("DB_MAPPER", "aplcntFormMapper");
	postData.put("DB_REQID", "selectAplcntListDupCnt");
	const ACTION = context_path+"/employmentAction/selectAplcntListDupCnt";
	
	postData.put("mapList", mapList);
	
	var cbf = function(rs, elementId) {
//		console.log("AJAX Return : " + rs + " / " + typeof(rs));

		for(var idx in rs) {
			if(rs[idx].cnt != 0) {
				dt.rows().data()[idx].isCheck = "DB중복("+rs[idx].cnt+")";
				_jobStts.dbDup = true;	
			}
		}
		__setGridData(dt.rows().data().toArray(), GRID1); // 수정된 데이터셋으로 다시 그리기
		_jobStts.isCheckValue = true; // 저장버튼 누를때 중복체크 실행 여부 확인
		__loadingBar.hide();
	}
	
	__serviceCall(ACTION, postData, true, cbf, "BLOCK");
	

}

function checkImageType(fileName) {
	var pattern = /application\/vnd.ms-excel|application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet|application\/haansoftxlsx/i;
	return fileName.match(pattern);
}


/**************************************************
 * CRUD 함수 정의
 **************************************************/
/** 리스트 조회 : */
function selectList() {

}
/** 단건 조회 :  */
function selectOneData(pKey) {
	
}
/** 데이터 저장 : */
function insertData() {
	if(_jobStts.done == true) {
		alert("이미 처리되었습니다");
		return;
	}

	var dt = $(GRID1).DataTable();

	// 데이터 존재여부 검사
	if(dt.rows().count() < 1 ) {
		alert("데이터가 없습니다.");
		return;
	}

	if(!_jobStts.isCheckValue) {
		alert("중복체크가 완료되어야 저장이 가능합니다.");
		return;
	}

	if(_jobStts.dbDup) {
		if(!confirm("DB에 중복된 데이터가 존재합니다. 계속 하시겠습니까?")) { return; }
	} else {
		if(!confirm("데이터를 반영하시겠습니까?")){ return; }
	}

	var mapList = new Array;
	mapList = dt.rows().data().toArray();
	// dt의 toArray()는 자바스크립트의 new Array에 map을 넣은 것과 동일한 형태로 리턴해주므로 그대로 사용하면 됨
	
	// console.log(mapList);

	var postData = new nMap();
	
	postData.put("DB_CRUD", "C");
	postData.put("DB_MAPPER", "aplcntFormMapper");
	postData.put("DB_REQID", "insertAplcntListExcel");
	const ACTION = context_path+"/employmentAction/insertAplcntListExcel";

	postData.put("mapList", mapList);

	var cbf = function(rs, elementId) {
		//		console.log("AJAX Return : " + rs + " / " + typeof(rs));
		_jobStts.done = true;
	}
	return __serviceCall(ACTION, postData, false, cbf, "BLOCK");

}
/** 데이터 수정 : */
function updateData() {
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
					 , {className: "dt-center td-ellipsis", targets: "_all"} // 복수 개 선언시 [] 사용하며, _all 이전에 선언해주어야함
		             , {className: "dt-head-center dt-nowrap", targets: "_all"} // css/bootstrap.min.css에서 table 글씨를좌측 정렬하는 css가 있어서 추가함.

					//  , {className: "dt-center dt-nowrap", targets: [0,3,7,8]} // 복수 개 선언시 [] 사용하며, _all 이전에 선언해주어야함
		            //  , {className: "dt-head-center dt-body-left d ", targets: [3,4]} // 복수 개 선언시 [] 사용하며, _all 이전에 선언해주어야함
		            //  , {className: "dt-center dt-nowrap ellipsis", targets: "_all"} // css/bootstrap.min.css에서 table 글씨를좌측 정렬하는 css가 있어서 추가함.
		              ]
		, columns: [
		            { title: ""				, data: null, searchable: false, orderable: false, defaultContent: "" }
		            , { title: "CHECK"		, data: "isCheck" }
					, { title: "접수일"		, data: "receiptDate", render: _dtMaskDateCheckRquired }
					, { title: "회사"			, data: "aplcntCompany", render: _dtCheckAplcntCompany }
					, { title: "사업장"		, data: "aplcntBizarea", render: _dtCheckAplcntBizarea }
					, { title: "부서"			, data: "aplcntDept", render: _dtCheckAplcntDept}
					, { title: "기수"			, data: "aplcntClass", render: _dtCheckAplcntClass }
					, { title: "사번"			, data: "emplyNum" }
					, { title: "이름"			, data: "aplcntNm", render: _dtCheckRequired }
					, { title: "생년월일"		, data: "birthday", render: _dtMaskDateCheckRquired }
					, { title: "성별"			, data: "aplcntSex", render: _dtCheckAplcntSex }
					, { title: "연락처"		, data: "contactInfo", render: __dtMaskPhone }
					
					, { title: "주소(도)"		, data: "addrDo", render: _dtCheckAddrDo }
					, { title: "주소(시)"		, data: "addrSi", render: _dtCheckAddrSi }
					, { title: "주소(구)"		, data: "addrGu", render: _dtCheckAddrGu }
					, { title: "이메일"		, data: "email" }
					, { title: "학력"			, data: "highestEdu", render: _dtCheckHighestedu }
					, { title: "전공"			, data: "major" }
					, { title: "경력"			, data: "careerStts", render: _dtCheckOxstts }
					, { title: "회사명1"		, data: "company1" }
					, { title: "근무기간1"		, data: "companyPeriod1" }
					, { title: "담당업무1"		, data: "assignedTask1" }
					
					, { title: "회사명2"		, data: "company2" }
					, { title: "근무기간2"		, data: "companyPeriod2" }
					, { title: "담당업무2"		, data: "assignedTask2" }
					, { title: "블랙"			, data: "blacklist", render: _dtCheckOxstts }
					, { title: "채용경로1"		, data: "recruitSite1", render: _dtCheckRecruitsite1 }
					, { title: "채용경로2"		, data: "recruitSite2", render: _dtCheckRecruitsite2 }
					, { title: "추천인"		, data: "recommender" }
					, { title: "서류면접"		, data: "docItvw" }
					, { title: "입사일"		, data: "jobDay", render: __dtMaskDate }
					, { title: "퇴사일"		, data: "quitDay", render: __dtMaskDate }
					
				
			    ]
		, searching: false // 자체 검색 기능 여부 	
		, paging: false	// 자체 페이징 기능 여부
	    , info: false // info 기능 여부
		, ordering: false // 정렬 기능 여부
		// , order: [[ 1, "asc" ]] // 최초 정렬 기준 설정(컬럼위치, asc/desc)
		, language: { // 테이블 데이터가 없을 때 표시할 내용
		       emptyTable : "조회된 데이터가 없습니다."
		    }
//	    , autoWidth: true
		, scrollX: true		// true/false 가능
		, scrollY: "550"
//	    , destroy: true
		, select: {
	        style: "single",  // false : row 선택x, single : row 선택 가능, multi : 여러개 row 선택 가능(라이브러리 추가해야가능)
		}
		, createdRow: function(row, data, index) {
			// dataTable의 컬럼 render 함수에서 isCheck여부 값을 추가하고 이 값이 true면 해당 row의 배경색을 지정한다.
			// 디버깅을 해보면 dataTable의  initGrid의 한 행씩 세팅(?)이 세팅되고, createdRow에 의해서 한행이 그려지는 한행씩 처리되는 형태이다. 
			if (!isNull(data.isCheck)) {
				row.setAttribute("style", "background-color: gold;");
				row.children[1].setAttribute("style", "font-weight: bold; color: red");
				row.children[1].textContent=data.isCheck;
			}
			//_checkAplcntBizarea(row, data, index);

	    }
		, initComplete: function () {
			// p.s. 현 구조에서는 재조회시마다 실행되지 않고, 최최 화면 렌더링시에만 적용됨.(그래서 loading 기능 적용하려면 방법 강구 필요)
			// $(".buttons-excel").hide();
			// // row 클릭 이벤트 정의
			// $(document).on("click", GRID1 + ">tbody>tr", function() {
			// 	var data = $(GRID1).DataTable().row( this ).data();
			// 	selectOneData(data.userid);
			// 	_pObj.setFormStatus("MOD");
//				console.log(data.userid);
			// });
        }
		
	});
}


/**************************************************
 * dataTable Render함수 정의
 **************************************************/
/** 값에 span 감싸기 */
function setSpanDanger(node, data) {
	node.appendChild(document.createTextNode(data));
	node.classList.add("label", "label-danger");
	return node;
}

/** (필수값) 일반 텍스트 일 경우 검사 */
function _dtCheckRequired(data, type, row, set) {
	var isCheck = true;
	var rtnVal = document.createElement("span");

	if(!isNull(data)) {
		rtnVal.appendChild(document.createTextNode(data));
		isCheck = false;
	} else {
		rtnVal.appendChild(document.createTextNode("[필수]"));
	}

	if(isCheck) {
		rtnVal = setSpanDanger(rtnVal, data);
		row.isCheck="문자";
	}

	return rtnVal.outerHTML;
}

/** 회사코드 검사 */
function _dtCheckAplcntCompany(data, type, row, set) {
	var isCheck = true;
	var rtnVal = document.createElement("span");
	if(!isNull(data) && "1000" == data) {
		rtnVal.appendChild(document.createTextNode("엘비휴넷"));
		isCheck = false;
	} else if(isNull(data)) {
		rtnVal.appendChild(document.createTextNode("[필수]"));
	} else {
		// 유지
	}

	if(isCheck) {
		rtnVal = setSpanDanger(rtnVal, data);
		row.isCheck="회사";
	}
	return rtnVal.outerHTML;
}

/** 사업장 코드 검사 */
function _dtCheckAplcntBizarea(data, type, row, set) {
	var isCheck = true;
	var rtnVal = document.createElement("span");

	if(!isNull(data)) {
		codeListMap.get("BIZAREA").forEach(function(obj, idx) {
			if(data == obj.code) {
				rtnVal.appendChild(document.createTextNode(obj.codeNm));
				isCheck = false;
			}
		});	
	} else {
		isCheck = false; // 필수값이 아니어서 널이면 정상
	}

	if(isCheck) {
		rtnVal = setSpanDanger(rtnVal, data);
		row.isCheck="사업장";
	}
	return rtnVal.outerHTML;
}

/** 부서 코드 검사 */
function _dtCheckAplcntDept(data, type, row, set) {
	var isCheck = true;
	var rtnVal = document.createElement("span");
	var tempList = _pObj.deptListMap.get("DEPT");
	/* var rsList = []; */

	if(!isNull(data)) {
		for(var i in tempList) {
			if(row.aplcntBizarea == tempList[i].codeGrp && data == tempList[i].code) {
				rtnVal.appendChild(document.createTextNode(tempList[i].codeNm));
				isCheck = false;
				// rsList.push(tempList[i]);
			}
		}
	
		/* rsList.forEach(function(obj, idx) {
			if(data == obj.code) {
				
				isCheck = false;
			}
		}); */
	} else {
		isCheck = false; // 필수값이 아니어서 널이면 정상
	}
	
	if(isCheck) {
		rtnVal = setSpanDanger(rtnVal, data);
		row.isCheck="부서";
	}
	return rtnVal.outerHTML;
}

/** 기수 표시 */
function _dtCheckAplcntClass(data, type, row, set) {
	var rtnVal = data;
	if(!isNull(data)) { rtnVal=data+"기"; }
	return rtnVal;
}

/** (필수값) 날짜 (필수가 아니면 common에 있는 함수로 사용해라) */
function _dtMaskDateCheckRquired(data, type, row, set) {
	var isCheck = true;
	var rtnVal = document.createElement("span");

	if(!isNull(data) && data.length <= 8) {
		rtnVal.appendChild(document.createTextNode(__dtMaskDate(data, type, row, set)));
		isCheck = false;
	} else if(isNull(data)) {
		rtnVal.appendChild(document.createTextNode("[필수]"));
	} else {
		// 유지
	}

	if(isCheck) {
		rtnVal = setSpanDanger(rtnVal, data);
		row.isCheck="날짜";
	}

	return rtnVal.outerHTML;
}

/** (필수값) 성별 표시 */
function _dtCheckAplcntSex(data, type, row, set) {
	var isCheck = true;
	var rtnVal = document.createElement("span");

	if(!isNull(data)) {
		codeListMap.get("SEX").forEach(function(obj, idx) {
			if(data == obj.code) {
				rtnVal.appendChild(document.createTextNode(obj.codeNm));
				isCheck = false;
			}
		});
	} else {
		rtnVal.appendChild(document.createTextNode("[필수]"));
	}

	if(isCheck) {
		rtnVal = setSpanDanger(rtnVal, data);
		row.isCheck="성별";
	}

	return rtnVal.outerHTML;
}

/** 주소(도) 코드 검사 */
function _dtCheckAddrDo(data, type, row, set) {
	var isCheck = true;
	var rtnVal = document.createElement("span");
	var tempList = _pObj.addrListMap.get("D");

	// 미입력이면 기본값 세팅
	if(isNull(data)) {
		data = "D000";
		row.addrDo = data;
	 }

	if(!isNull(data)) {
		tempList.forEach(function(obj, idx) {
			if(data == obj.addrId) {
				rtnVal.appendChild(document.createTextNode(obj.addrNm));
				isCheck = false; // 값이 있으면 정상
			}
		});
	}

	// 정상적으로 치환이 안된 경우 에러
	if(isCheck) {
		rtnVal = setSpanDanger(rtnVal, data);
		row.isCheck="주소(도)"; // 입력한 값이 존재할수 없는 값이면 에러
	}

	return rtnVal.outerHTML;
}

/** 주소(시) 코드 검사 */
function _dtCheckAddrSi(data, type, row, set) {
	var isCheck = true;
	var rtnVal = document.createElement("span");
	var tempList = _pObj.addrListMap.get("S");
	
	// 주소(도)가 없음이면서 주소(시)가 미입력이면 기본값 세팅
	if(row.addrDo == "D000" && isNull(data)) {
		data = "S000";
		row.addrSi = data;
	}

	if(!isNull(data)) {
		tempList.forEach(function(obj, idx) {
			if(row.addrDo == obj.upperAddrId && data == obj.addrId ) {
				rtnVal.appendChild(document.createTextNode(obj.addrNm));
				isCheck = false; // 값이 있으면 정상
			}
		});
	} else if(row.addrDo != "D000" && isNull(data)) {
		rtnVal.appendChild(document.createTextNode("[필수]"));
	} else {
		// 유지
	}
	
	if(isCheck) {
		rtnVal = setSpanDanger(rtnVal, data);
		row.isCheck="주소(시)"; // 입력한 값이 존재할수 없는 값이면 에러
	}

	return rtnVal.outerHTML;
}

/** 주소(구) 코드 검사 */
function _dtCheckAddrGu(data, type, row, set) {
	var isCheck = true;
	var rtnVal = document.createElement("span");
	var tempList = _pObj.addrListMap.get("G");

	// 미입력이면 기본값 세팅
	if(row.addrDo == "D000" && row.addrSi == "S000" && isNull(data)) {
		data = "G000";
		row.addrGu = data;
	}

	if(!isNull(data)) {
		tempList.forEach(function(obj, idx) {
			if(row.addrSi == obj.upperAddrId && data == obj.addrId ) {
				rtnVal.appendChild(document.createTextNode(obj.addrNm));
				isCheck = false; // 값이 있으면 정상
			}
		});
	} else if(row.addrDo != "D000" && row.addrSi != "S000" && isNull(data)) {
		rtnVal.appendChild(document.createTextNode("[필수]"));
	} else {
		// 유지
	}
	if(isCheck) {
		rtnVal = setSpanDanger(rtnVal, data);
		row.isCheck="주소(구)"; // 입력한 값이 존재할수 없는 값이면 에러
	}

	return rtnVal.outerHTML;
}

/** 학력 표시 */
function _dtCheckHighestedu(data, type, row, set) {
	var isCheck = true;
	var rtnVal = document.createElement("span");

	if(!isNull(data)) {
		codeListMap.get("HIGHESTEDU").forEach(function(obj, idx) {
			if(data == obj.code) {
				rtnVal.appendChild(document.createTextNode(obj.codeNm));
				isCheck = false;
			}
		});
	} else {
		isCheck = false; // 필수값이 아니어서 널이면 정상
	}

	if(isCheck) {
		rtnVal = setSpanDanger(rtnVal, data);
		row.isCheck="최종학력";
	}

	return rtnVal.outerHTML;
}

/** OX 표시 */
function _dtCheckOxstts(data, type, row, set) {
	var isCheck = true;
	var rtnVal = document.createElement("span");

	if(!isNull(data)) {
		codeListMap.get("OXSTTS").forEach(function(obj, idx) {
			if(data == obj.code) {
				rtnVal.appendChild(document.createTextNode(obj.codeNm));
				isCheck = false;
			}
		});
	} else {
		isCheck = false; // 필수값이 아니어서 널이면 정상
	}

	if(isCheck) {
		rtnVal = setSpanDanger(rtnVal, data);
		row.isCheck="코드오류";
	}

	return rtnVal.outerHTML;
}

/** 채용경로1 표시 */
function _dtCheckRecruitsite1(data, type, row, set) {
	var isCheck = true;
	var rtnVal = document.createElement("span");

	if(!isNull(data)) {
		codeListMap.get("RECRUITSITE1").forEach(function(obj, idx) {
			if(data == obj.code) {
				rtnVal.appendChild(document.createTextNode(obj.codeNm));
				isCheck = false;
			}
		});
	} else {
		isCheck = false; // 필수값이 아니어서 널이면 정상
	}

	if(isCheck) {
		rtnVal = setSpanDanger(rtnVal, data);
		row.isCheck="채용경로1";
	}

	return rtnVal.outerHTML;
}

/** 채용경로2 표시 */
function _dtCheckRecruitsite2(data, type, row, set) {
	var isCheck = true;
	var rtnVal = document.createElement("span");
	
	if(!isNull(data)) {
		if(row.recruitSite1 == "RCS_MGM" ) {
			var tempList = _pObj.deptListMap.get("DEPT");
			/* var rsList = []; */

			for(var i in tempList) {
				if(data == tempList[i].code) {
					rtnVal.appendChild(document.createTextNode(tempList[i].codeNm));
					isCheck = false;
					// rsList.push(tempList[i]);
				}
			}
		} else {
			codeListMap.get("RECRUITSITE2").forEach(function(obj, idx) {
				if(row.recruitSite1 == obj.etc1 && data == obj.code ) {
					rtnVal.appendChild(document.createTextNode(obj.codeNm));
					isCheck = false; // 값이 있으면 정상
				}
			});
		}
	} else if(!isNull(row.recruitSite1) && isNull(data)) {
		isCheck = false; // 값이 있으면 정상
		// 채용경로1이 존재하여도 채용경로2는 필수설정하지 않기로 함 2019.07.26
		// rtnVal.appendChild(document.createTextNode("[필수]"));
	} else if(isNull(row.recruitSite1) && isNull(data)) {
	// 채용경로1이 널이고, 채용경로2도 널이면 패스
		isCheck = false; // 값이 있으면 정상
	} else {
		// 유지
	}

	if(isCheck) {
		rtnVal = setSpanDanger(rtnVal, data);
		row.isCheck="채용경로2";
	}

	return rtnVal.outerHTML;
}
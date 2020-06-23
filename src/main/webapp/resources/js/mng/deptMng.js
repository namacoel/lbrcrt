/**************************************************
 * source		: deptMng.js
 * description	: 부서정보관리
 * ************************************************
 * date			author			description
 * ************************************************
 * 2016.08.11	김상우			최초 작성
 * 2018.04.17	ksw				리팩토링 진행
 * ************************************************
 * 메모
 * TODO: 나중에 라이브러리 사이트 보고 검색시 선택까지 가능하도록 수정하기. 지금하려니 시간 부족
 *  
 **************************************************/


/**************************************************
 * 전역 변수 선언
 **************************************************/
var FORM_SRCH 	= "#tableSearch"; 	// 검색조건 개체 Selector
var GRID1 		= "#gridList1";		// 그리드1 개체 Selecotr ID
var FORM1 		= "#tableDetail1"; 	// 상세정보 개체 Selector

var dsBiz = null; // Bizarea(사업장) 조회결과 데이터셋
var levels = 1; // 트리의 expand 기능을 단계적으로 사용하기 위해 추가함
var selectedCdDept = null;

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
		this.validElementsForm1 = __getValidElements(FORM1);
	},
	/** 셀렉트박스 초기화 */
	initDropDown:function() {
		
		// DB에서 공통코드 가져오기
		var codeListMap = new nMap();
		codeListMap.put("BIZAREA", __appCmm.getBizareaCodeBook());
		this.deptListMap.put("DEPT", __appCmm.getDeptCodeBook());
		__appCmm.setDropDown(codeListMap, "BIZAREA", "cdBizarea", "선택", "subNm");
		__appCmm.setBizareaChangeEvent(this.deptListMap.get("DEPT"), "cdBizarea", "hDept", "선택", "subNm");
		$("#cdBizarea").trigger("change");
		
		// selectBox 세팅
	},
	/** 유효상, 마스킹 초기화 */
	initMask:function() {
		// 필수값 설정
		$("#cdBizarea, #nmBizarea, #nmBizareaL1, #tpBizarea, #cdDept, #nmDept").prop("required", true);

		// 유효성 설정
		$("#srchCdBizarea").attr("maxlength", "7");
		$("#srchCdBizarea").attr("pattern", "[A-Z0-9]+")
		$("#srchCdBizarea").attr("title", "대문자나 숫자 7자리까지만 입력가능합니다.");
		
		$("#srchNmBizarea").attr("maxlength", "50");
		$("#srchNmBizarea").attr("title", "50자리까지만 입력가능합니다.");

		$("#cdDept").attr("maxlength", "12");
		$("#cdDept").attr("pattern", "[A-Z0-9]{6,12}")
		$("#cdDept").attr("title", "대문자나 숫자 12자리까지만 입력가능합니다.");
		
	},
	/** 그리드 초기화 */
	initGrid:function() {
//		_initGrid1(GRID1);
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
		DIS 	: [0,0],	// 잠금
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
//	_pObj.initGrid();
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
		_btnObj.setButton("DIS");
		selectBizareaTree();
		break;
	case "btnResetSrch":
		__elementClear(FORM_SRCH);
		$("#srchDtEnd").val(__toDateFormat(__getDate().left(8),"-"));
		break;
	case "btnNew":
		var cdCompany = "1000";
		var cdBizarea = $("#cdBizarea").val()
		var hDept = $("#cdDept").val();
		
		_pObj.setFormStatus("NEW");
		
		$("#cdCompany").val(cdCompany);
		$("#cdBizarea").val(cdBizarea);
		$("#hDept").val(hDept);
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

/** 트리에서 부서리스트 단건 선택시 */
$(document).on("click", "li", function() {
	
	var str = $(this).text();
	str = str.match(/\[.*\]/g);
	
	if(str == null)  {
		_pObj.setFormStatus("INIT");
		_btnObj.setButton("DIS");
		return;
	} else {
		str = str[0].replace(/\[|\]/g, "")
		
		/* FIXME: 차후 회사코드가 추가될경우 문제가 될 수 있음
		 * treeview에 data 속성을 자유롭게 설정할 수가 없어서 li의 text 에 cdDept값만 설정함
		 * 회사코드가 추가 될 경우, cdDept의 값이 중복될 수 있는데 이 부분을 어떻게 풀어야 할지 고민해봐야함
		 * 2016.08.31 
		 */
		var cdCompany = '1000';
			
		if(str.length < 6) {
			_pObj.setFormStatus("INIT");

			$("#cdCompany").val(cdCompany);
			$("#cdBizarea").val(str);
			$("#cdBizarea").trigger("change");
		} else {
			_pObj.setFormStatus("MOD");
			selectOneDept(cdCompany, str);
		}
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
	postData.put("DB_REQID", "selectOneDept");
	
	// 하위 태그에서 데이터 추출
	postData = __putIntoPostData(FORM1, postData);
	
	return __serviceCall(CMM_ACTION, postData, false, "", "");
	
}

/** 데이터 저장 : */
function insertData() {

	var postData = new nMap();
	
	postData.put("DB_CRUD", "C");
	postData.put("DB_MAPPER", "bizareaMngMapper");
	postData.put("DB_REQID", "insertDept");

	// 하위 태그에서 데이터 추출
	postData = __putIntoPostData(FORM1, postData);
	var dtStart = $("#dtStart").numVal();
	var dtEnd = $("#dtEnd").numVal();
	postData.put("dtStart", dtStart);
	postData.put("dtEnd", dtEnd);
	
	var cbf = function(rs, elementId) {
		selectedCdDept = postData.get("cdDept");
	}
	return __serviceCall(CMM_ACTION, postData, false, cbf, "BLOCK");
	
}

/** 데이터 수정 : */
function updateData() {

	var postData = new nMap();
	
	postData.put("DB_CRUD", "U");
	postData.put("DB_MAPPER", "bizareaMngMapper");
	postData.put("DB_REQID", "updateDept");

	// 하위 태그에서 데이터 추출
	postData = __putIntoPostData(FORM1, postData);
	var dtStart = $("#dtStart").numVal();
	var dtEnd = $("#dtEnd").numVal();
	postData.put("dtStart", dtStart);
	postData.put("dtEnd", dtEnd);
	
	var cbf = function(rs, elementId) {
		selectedCdDept = postData.get("cdDept");
	}
	return __serviceCall(CMM_ACTION, postData, false, cbf, "BLOCK");
	
}

/**************************************************
 * 그리드 정의
 **************************************************/
/*그리드 없음*/

/**************************************************
 *  treeview - 사업장 부서 정보 세팅
 **************************************************/
/** 사업장 리스트 조회 */
function selectBizareaTree() {
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "bizareaMngMapper"); // DB 네임스페이스
	postData.put("DB_REQID", "selectBizareaList"); // DB 요청 ID
	
	// 하위 태그에서 데이터 추출
	postData = __putIntoPostData(FORM_SRCH, postData);
	
	var cbf = function (rs, elementId) {
		cmmDsBiz = JSON.parse(JSON.stringify(rs));
		selectDeptTree();
	};
	__serviceCall(CMM_ACTION, postData, true, cbf, "BLOCK");
}

/** 부서 리스트 조회 */
function selectDeptTree() {
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "commonMapper"); // DB 네임스페이스
	postData.put("DB_REQID", "selectDeptTree"); // DB 요청 ID
	postData.put("srchDtEnd", $("#srchDtEnd").numVal()); // 프로젝트 종료일 확인하는 용도
	
	var cbf = function (rs, elementId) {
		var dsBiz = cmmDsBiz;
		var dsDept = JSON.parse(JSON.stringify(rs));
		var space = "&nbsp; &nbsp; &nbsp;";
		var arrTop = new Array();
		var mapCom = new nMap();
		var arrCom = new Array();
		
		for(var i in dsBiz) {
			eval("var mapBiz"+dsBiz[i].cdBizarea+"= new nMap();");
			eval("var arrBiz"+dsBiz[i].cdBizarea+"= new Array();");
			eval("mapBiz"+dsBiz[i].cdBizarea+".put('text', dsBiz[i].nmBizarea+space+'['+dsBiz[i].cdBizarea+']');");
			
			for(var j in rs) {
				eval("var mapDept"+dsDept[j].cdDept+"= new nMap();");
				eval("var arrDept"+dsDept[j].cdDept+"= new Array();");
				if(dsBiz[i].cdBizarea == dsDept[j].cdBizarea && dsDept[j].level == 1) {
					eval("mapDept"+dsDept[j].cdDept+".put('text', dsDept[j].nmDept+space+'['+dsDept[j].cdDept+'] - '+dsDept[j].level);");
					if(eval("mapDept"+dsDept[j].cdDept+".size()")) eval("arrBiz"+dsBiz[i].cdBizarea+".push(mapDept"+dsDept[j].cdDept+".map);");
				} else if(dsBiz[i].cdBizarea == dsDept[j].cdBizarea && dsDept[j].level > 1) {
					eval("mapDept"+dsDept[j].cdDept+".put('text', dsDept[j].nmDept+space+'['+dsDept[j].cdDept+'] - '+dsDept[j].level);");
					if(eval("mapDept"+dsDept[j].cdDept+".size()")) eval("arrDept"+dsDept[j].hDept+".push(mapDept"+dsDept[j].cdDept+".map);");
					eval("mapDept"+dsDept[j].hDept+".put('nodes', arrDept"+dsDept[j].hDept+");");
				}
			}
			eval("mapBiz"+dsBiz[i].cdBizarea+".put('nodes', arrBiz"+dsBiz[i].cdBizarea+");");
			eval("arrCom.push(mapBiz"+dsBiz[i].cdBizarea+".map);");
		}
		mapCom.put("text", "LB휴넷주식회사");
		mapCom.put("nodes", arrCom);
		
		arrTop.push(mapCom.map);
		setCustomTree(arrTop);
		// insert, update 이후 처리된 부서코드 값을 조회
		$("#input-search").val(selectedCdDept);
		$("#btn-search").click();
	};
	__serviceCall(CMM_ACTION, postData, true, cbf, "BLOCK");
}

/** 부서 상세 조회*/
function selectOneDept(cdCompany, cdDept) {
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "bizareaMngMapper");
	postData.put("DB_REQID", "selectOneDept");
	
//	postData = __putIntoPostData(FORM1, postData);
	postData.put("cdCompany", cdCompany);
	postData.put("cdDept", cdDept);
	
	
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

/**************************************************
 * 사용자 정의 함수
 **************************************************/

/** 트리메뉴 세팅 */
function setCustomTree(json) {
	/* 하드코딩시에 사용하는 json 타입 형태 샘플 */
/*
	var json = '[{"text": "LB휴넷주식회사","nodes": [{"text": "엘비휴넷(주)","nodes": [{"text": "대표이사 [110000]"}]},' +
        '{"text": "엘비휴넷(주) 본사"}]},{"text": "Parent 2"}]';
*/
	/*추가 기능 없이 사용할 때 사용한 tree의 샘플 코드*/
/*
	var $tree = $('#treeBiz').treeview({
    data: json,
    levels: 2,
    showBorder: true
	});
*/  
	var $customtTree = $('#treeBiz').treeview({
		data: json,
		levels: 2
	});
	
	var search = function(e) {
		
		var pattern = $('#input-search').val();
		var options = {
//	      ignoreCase: $('#chk-ignore-case').is(':checked'),
		ignoreCase: true,
		exactMatch: false,
		revealResults: true
		};
		var results = $customtTree.treeview('search', [ pattern, options ]);
	}
	$('#btn-search').on('click', search);

	$('#btn-clear-search').on('click', function (e) {
		$customtTree.treeview('clearSearch');
		$('#input-search').val('');
	});
	
	//Expand/collapse all
	$('#btn-expand-all').on('click', function (e) {
		levels++; // 트리 단계적으로 확장
		$customtTree.treeview('expandAll', { levels: levels });
	});

	$('#btn-collapse-all').on('click', function (e) {
		levels=1; // 트리 확장한 레벨 초기화
		$customtTree.treeview('expandAll', { levels: levels});
	});
	
	$("#input-search").on("keyup", function() {
		$('#btn-collapse-all').trigger("click");
		$("#btn-search").click();
	});
}


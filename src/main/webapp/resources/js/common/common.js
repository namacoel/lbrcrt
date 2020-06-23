/**************************************************
 * source		: common.js
 * description	: Common JS Resources
 * ************************************************
 * date			author			description
 * ************************************************
 * 2016.03.11	김상우			최초 작성
 * ************************************************
 **************************************************/
// 사진 파일 조회시 사용하는 경로
var gFileSrc = "/test/upload/displayFile?fileName=";

/******************************
 * Test 함수
 ******************************/
//change 이벤트
$(document).on("change", "select", function() {
 	console.log($(this).val() + " is selected.(from common.js)");
});


/******************************
 *  공통 키 이벤트 정의
 ******************************/

// .input-phone인 경우, keyup 이벤트시 하이픈을 입력한다.
$(document).on("keyup", ".input-phone", function() {
	event.preventDefault();
	this.value = cmmToPhoneFormat(this.value);
	$(this).trigger("change");
});

// .table-search input 태그의 keyup인 경우 btnSearch 조회  
$(document).on("keyup", ".table-search input", function(e) {
	if(e.keyCode==13) {
		$("#btnSearch").trigger("click");
	}
});
$(document).on("keyup", ".table-search-sub input", function(e) {
	if(e.keyCode==13) {
		$("#btnSearchSub").trigger("click");
	}
});

/******************************
 *  공통 함수 정의
 ******************************/
/**
 * 
 */
// TODO 차후 DB로 관리하여 공통으로 사용하기(마이플랫폼이나 google참고해서 개발하자)
function cmmGetAlertMsg(pStr) {

	var altertStr = {
			"save":"새로운 내용을 등록하시겠습니까?",
			"update":"수정된 내용을 저장하시겠습니까?",
			"close":"창을 닫으시겠습니까?",
			"reset":"입력값을 초기화 하시겠습니까?", 
			"alert001":"코드그룹을 다시 선택해주십시오.",
			"exportExcel":"조회된 목록을 추출하시겠습니까?",
			"notSelected":"선택된 데이터가 없습니다.",
			"invalidRange":"조회범위가 잘못되었습니다.",
			"overRange6":"조회기간은 6개월이내입니다.",
			"overRange1":"조회기간은 1개월이내입니다.",
			"dupCheck":"중복 데이터가 존재합니다.",
			"copyAplcntInfo":"지원자 정보를 복사 하시겠습니까?",
			"error":"저장시 오류가 발생하였습니다."
	};
	
	return altertStr[pStr];
}

/**
 * datetime 형식의 JSON 데이터를 날짜, 시간 형식으로 리턴한다. 
 * @param pJsonDate
 * @returns {String}
 */
function cmmJsonDateToString(pJsonDate) {

    var year, month, day, hour, minute, second, returnValue, date;

    date = new Date(pJsonDate);
    
    year = date.getFullYear();
    month = cmmPad(date.getMonth()+1);
    day = cmmPad(date.getDate());
    hour = cmmPad(date.getHours());
    minute = cmmPad(date.getMinutes());
    second = cmmPad(date.getSeconds());
    returnValue = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    
    return returnValue;
}

/**
 * 두 날짜의 차이를 day/month/year로 계산 해주는 함수
 * @param input1 : 시작날짜
 * @param input2 : 종료날짜
 * @param type : 리턴할 단위선택 (day/month/year)
 * @returns
 */
function cmmDateInterval(input1, input2, type) {
	var date1 = new Date(input1.substr(0,4),input1.substr(4,2)-1,input1.substr(6,2));
	var date2 = new Date(input2.substr(0,4),input2.substr(4,2)-1,input2.substr(6,2));

	var interval = date2 - date1;
	var day = 1000*60*60*24;
	var month = day*30;
	var year = month*12;

//	console.log("기간 날짜수: " + parseInt(interval/day) + "일");
//	console.log("기간 개월수: 약 " + parseInt(interval/month) + "개월");
//	console.log("기간 개년수: 약 " + parseInt(interval/year) + "개년");
	
	if(type=="DAY") return parseInt(interval/day);
	if(type=="MONTH") return parseInt(interval/month);
	if(type=="YEAR") return parseInt(interval/year);
}

/**
 * 값 앞에 0을 붙이고 뒤 2자리만 추출(날짜 및 시간이 1자리 인경우를 위한 함수)
 * @param num
 * @returns
 */
function cmmPad(num) {
//	num < 10 ? num = '0'+num : num;
//	return num.toString();
	num = "0" + num;
    return num.slice(-2);
}

/**
 * 현재 로컬 날짜와 시간을 구한다.
 * 용도에 따라 GMT 와 연관 있을수 있으니 주의
 * @returns String
 */
function cmmGetDate(date, format) {
	
	var dt = null;
	
	if(isNull(date)) {
		dt = new Date();
	} else {
		// date에 입력되는 날짜, 시간 정보는 여러가지 형태가 될 수 있다.
		// '2016-0-01' 등
		dt = new Date(date);
	}
	
	var year = dt.getFullYear();
	var month = cmmPad(dt.getMonth() + 1);
	var day = cmmPad(dt.getDate());
	var hour = cmmPad(dt.getHours());
	var min = cmmPad(dt.getMinutes());
	var sec = cmmPad(dt.getSeconds());
	
	return year + month + day + hour + min +sec;
}
function cmmExportExcel(title, element, e) {
	var fileName = title+"_"+cmmGetDate()+".xls";
    var a = document.createElement('a');
    var dataType = "data:application/vnd.ms-excel";
    var tableHtml = document.getElementById(element).outerHTML.replace(/ /g, '%20');

    a.href = dataType +', '+tableHtml;
    a.download = fileName;
    a.click();
    e.preventDefault();
}


/**
 * null, undefined, "", false 이면 true 아니면 false를 리턴한다.
 * false와 ""을 동등연산자로 비교하면 true로 나옴... 참고..isNull(false)를 하면 결과로 true가 나옴
 * @param obj
 * @returns boolean
 */
// TODO: 고심 필요 ("", 숫자 0, NaN, Null, Undefined 일 경우에는 false 나머지는 모두 true를 표현합니다.)
function isNull(obj) {
	return (typeof obj != undefined && obj != null && obj !="") ? false : true;
}

function nullToEmpty(obj) {
	return (typeof obj != undefined && obj != null && obj !="") ? obj : "";
}
/** str과 text를 입력 받아 isNull(str) 이면 에 값이 있으면 str을 리턴하고, 아니면 str뒤에 text를 붙여서 리턴한다. */
function cmmTextPaste(str, text) {
	if(isNull(str)) return str;
	return str + text;
}
/**
 * 맵 형태로 파라미터를 추가하고, JSON 스트링으로 변환하기 위함
 */
function nMap() {
	this.map = new Object();
};
nMap.prototype = {
	put:function(key, value) {
		// DB 트랜잭션시 바이바티스에서 컬럼에 입력되는 값이 null인경우 오류가 발생하므로, 값이 없는 경우 공백으로 처리되도록 구현
		isNull(value) ? this.map[key] = "" : this.map[key] = value; 
		/*
		if(!(value == null || value == "")) {
			this.map[key] = value;
		}
		*/
	},
	get:function(key) {
		return this.map[key];
	},
	toJSONString:function() {
		return JSON.stringify(this.map);
	},
	/* Map에 구성된 개수 반환 */
	size:function () {
    	var count = 0;
        for (var prop in this.map) {
        	count++;
        }
        return count;
    }
}

// TODO 나중에 지우세요2016.08.02.yagami
/**셀렉트박스 생성해주는 함수*/

/*function cmmSetComboBox(pStr, pSelector) {
	var htmlScript = "";
	
	switch(pStr) {
	case "useYn" :
		htmlScript += ""
			+ "<option value=''>선택</option>"
			+ "<option value='Y'>Y</option>"
			+ "<option value='N'>N</option";
		break;
	default :
		console.log("SetComboBox is " + pStr);
	}
	$(pSelector).html(htmlScript);
}*/
/**
 * 공백을 임의의 문자로 변환해주는 함수. 공백이 안먹는 일부 element에서 사용하기 위한 것이다.
 * @param pStr
 * @returns {String}
 */
function cmmSpaceToChar(pStr, pOutput) { 
	var result = ""; //반환해주는 결과값
	for (i=0; i<pStr.length; i++ ) {
		var tempStr=pStr.charAt(i);
		if (tempStr == " ") tempStr = pOutput;
		result += tempStr;
	}
	return result;
}
/** 공백 제거 함수 */
function cmmRemoveSpace(pStr) {
	var result = "";
	for(i=0; i<pStr.length; i++) {
		var tempStr=pStr.charAt(i);
		if (tempStr == " ") tempStr = "";
		result += tempStr;
	}
	return result;
}

/** selectbox의 값이 null이면 data-previous에 저장된 값을, null이 아니면 현재 값을 반환 */
function cmmGeDropDownData(elementId) {
	var currentData = $("#"+elementId).val();
	if (currentData == null) {
		return $("#"+elementId).attr("data-previous");
	} else {
		return currentData;
	}
}
/** 속성에 기존 값을 저장하는 함수 */
function cmmSetAttrData(elementId, rsData) {
	$("#"+elementId).val(rsData);
	$("#"+elementId).attr("data-previous", rsData);
}
/**
 * 
 * @param elementId - 엘리먼트 ID
 * @param codeGrp - 공통코드명
 * @param pSync 동기여부(not으로 싱크여부로 표현true:동기, false:비동기(default))
 */
function cmmSetDropDown(elementId, codeGrp, pSync) {
	var getParam = new nMap();
	
	var DB_ACTION = "R";
	getParam.put("DB_MAPPER", "commonMapper"); // DB 네임스페이스
	getParam.put("DB_REQID", "getCommonCode"); // DB 요청 ID
	
	getParam.put("codeGrp", codeGrp);
	
	var postData = getParam.toJSONString();
	
	console.log(postData);
	
	var cbf = function (rs, elementId) {
		deleteChildElements(elementId, "option", "선택");
		if(rs.length > 0) {
			for(var i in rs) {
				var optionElement = document.createElement("option");
				optionElement.setAttribute("value", rs[i].code);
				optionElement.setAttribute("data-etc1", rs[i].etc1);
				optionElement.appendChild(document.createTextNode(rs[i].codeNm));
				document.getElementById(elementId).appendChild(optionElement);
			}
		}
	};
	crudAction(DB_ACTION, postData, cbf, elementId, pSync);
}

function cmmSetAddr(elementId, pSync) {
	var getParam = new nMap();
	
	var DB_ACTION = "R";
	getParam.put("DB_MAPPER", "commonMapper");
	getParam.put("DB_REQID", "getCommonAddr");
	
	var postData = getParam.toJSONString();
	
	var cbf = function(rs, elementId) {
		if(rs.length>0) {
			for(var i in rs) {
				var optionElement = document.createElement("option");
				optionElement.setAttribute("value", rs[i].addrId);
				optionElement.setAttribute("data-upper", rs[i].upperAddrId);
				optionElement.appendChild(document.createTextNode(rs[i].addrNm));
				document.getElementById(elementId).appendChild(optionElement);
			}
		}
	};
	crudAction(DB_ACTION, postData, cbf, elementId, pSync);
}

/** 사업장 정보를 select element 생성 */
function cmmSetDropDownBizarea(elementId, opt1, opt2, pSync) {
	var getParam = new nMap();
	
	var DB_ACTION = "R";
	getParam.put("DB_MAPPER", "commonMapper"); // DB 네임스페이스
	getParam.put("DB_REQID", "getBizarea"); // DB 요청 ID
	getParam.put("srchDtTopen", cmmGetDate().left(8)); // 사용중인 데이터만 조회를 위해 추가.2016.09.26
	
	var postData = getParam.toJSONString();
	
	console.log(postData);
	
	var cbf = function (rs, elementId) {
		deleteChildElements(elementId, "option", "선택");
		if(rs.length >0) {
			for(var i in rs) {
				var optionElement = document.createElement("option");
				optionElement.setAttribute("value", rs[i].cdBizarea);
				if(opt1 == "NM") {
					if(opt2 == "SHORTNM") {
						optionElement.appendChild(document.createTextNode(rs[i].nmBizareaL1));
					} else {
						optionElement.appendChild(document.createTextNode(rs[i].nmBizarea));
					}
					
				} else if(opt1 =="NM|CODE") {
					if(opt2 == "SHORTNM") {
						optionElement.appendChild(document.createTextNode(rs[i].nmBizareaL1+" ["+ rs[i].cdBizarea +"]"));
					} else { 
					optionElement.appendChild(document.createTextNode(rs[i].nmBizarea+" ["+ rs[i].cdBizarea +"]"));
					}
				}
				document.getElementById(elementId).appendChild(optionElement);
			}
		}
	};
	crudAction(DB_ACTION, postData, cbf, elementId, pSync);
}
/** 부서 정보를 select element 생성 */
function cmmSetDropDownDept(elementId, opt1, pSync) {
	var getParam = new nMap();
	
	var DB_ACTION = "R";
	getParam.put("DB_MAPPER", "commonMapper"); // DB 네임스페이스
	getParam.put("DB_REQID", "getDept"); // DB 요청 ID
	getParam.put("srchDtEnd", cmmGetDate().left(8)); // 사용중인 데이터만 조회를 위해 추가.2016.09.26
	
	var postData = getParam.toJSONString();
	
	console.log(postData);
	
	var cbf = function (rs, elementId) {
		deleteChildElements(elementId, "option", "선택");
		if(rs.length >0) {
			for(var i in rs) {
				var optionElement = document.createElement("option");
				optionElement.setAttribute("value", rs[i].cdDept);
				optionElement.setAttribute("data-cdbizarea", rs[i].cdBizarea);
				if(opt1 =="NM") {
					optionElement.appendChild(document.createTextNode(cmmSpaceToChar(rs[i].tapNmDept, "\u00A0")));
				} else if(opt1 =="NM|CODE") {
					optionElement.appendChild(document.createTextNode(cmmSpaceToChar(rs[i].tapNmDept, "\u00A0")+"\u00A0 \u00A0 ["+rs[i].cdDept+"]"));
				}
				document.getElementById(elementId).appendChild(optionElement);
			}
		}
	};
	crudAction(DB_ACTION, postData, cbf, elementId, pSync);
}
/**
 * 문자열에서 숫자만 추출하는 함수
 * @param str : 문자열
 * @returns 숫자
 */
function cmmGetNum(str) {
	return str.replace(/[^\d]+/g,"");
}
/** 문자열의 3자리마다 콤마 붙이는 함수	
 * @param str
 * @returns
 */
function cmmToCommaUnit(str) {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function cmmToPhoneFormat(str) {
	str = str.replace(/[^\d]+/g, "");
	str = str.replace(/(^02.{0}|^01.{1}|^050.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");
	return str;
}
/** 
 * YYYY:MM:DD가 가능한 형태의 문자를 받아서 구분자를 추가하고 리턴 
 * null, undefined, NaN, empty string (“”), 0, false 이면 return;  */
function cmmToDateFormat(str, dmt) {
	if (!str) return ""; 
	str = str.replace(/[^\d]+/g, "");
	if(isNull(dmt)) dmt = "-";
	
	if(str.length == 8) {
		str = str.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, "$1"+dmt+"$2"+dmt+"$3");
	} else if(str.length == 6) {
//		str = str.replace(/([0-9]{4})([0-9]{2})/, "$1"+dmt+"$2"+dmt+"XX");
		str = str.replace(/([0-9]{4})([0-9]{2})/, "$1"+dmt+"$2");
	} else if(str.length == 4) {
//		str = str.replace(/([0-9]{4})/, "$1"+dmt+"XX"+dmt+"XX");
		str = str.replace(/([0-9]{4})/, "$1");
	}
	return str;
}

/** HH:MM의 형태가 가능한 숫자를 받아서 구분자를 추가하고 리턴 */
function cmmToTimeFormat(str) {
	if (!str) return ""; 
	str = str.replace(/[^\d]+/g, "");
	if (str.length == 4) {
		str = str.replace(/([0-9]{2})([0-9]{2})/, "$1:$2");
	} else {
		return "";
	}
	return str;
}

/**
 * length 만큼 좌측에서 추출
 */
String.prototype.left = function(length){
	if(this.length <= length){
			return this;
	} else {
		return this.substring(0, length);
	}
}
/**
 * length만큼 우측에서 추출 
 */
String.prototype.right = function(length){
	if(this.length <= length){
		return this;
	} else {
		return this.substring(this.length - length, this.length);
	}
}
/**
 * length만큼 우측에서 제외하고 추출
 */
String.prototype.rightReverse = function(length){
	if(this.length <= length){
		return this;
	} else {
	 return this.substring(0, this.length - length);
	}
}

// 페이징 기본 정보 을 관련 함수
function Criteria() {
	this.page = 1;
	this.perPageNum = 10;
	this.func;
}
Criteria.prototype = {
	setPage:function(page) {
		if(page <= 0){
			this.page = 1;
			return;
		}
		this.page = page;
	},
	setPerPageNum:function(perPageNum) {
		if(perPageNum <= 0 || perPageNum > 500) {
			this.perPageNum = 500;
			return;
		}
		this.perPageNum = perPageNum;	
	},
	getPage:function() {
		return this.page;
	},
	getPageStart:function() {
		return (this.page -1)* this.perPageNum;
	},
	getPerPageNum:function() {
		return this.perPageNum;
	},
	setFunc:function(func) {
		this.func = func;
	},
	doFunc:function() {
		this.func();
	},
	toString:function() {
		return "Criteria [page=" + this.page + ", perPageNum=" + this.perPageNum + "]";
	}
}
//페이징에서 페이지 선택시 이벤트
$(document).on("click", ".pagination li a", function(){
	event.preventDefault();
	var dataPage = $(this).attr("data-page")
	if (dataPage == 0) return;
	pm.cri.setPage(dataPage); // 현재 페이지 세팅
	pm.cri.doFunc(); // 설정한 조회 함수 호출
});
// 페이징 정보 세팅 함수
function PageMaker()  {
		
	this.totalCount = 0;
	this.startPage = 0;
	this.endPage = 0;
	this.prev = 0;
	this.next = 0;
	this.displayPageNum = 5;
	this.tempEndPage = 0;
	
	this.cri = new Criteria();
}
PageMaker.prototype = {
	setTotalCount:function(totalCount) {
		this.totalCount = totalCount;
		this.calcData();
	},
	calcData:function() {
		this.endPage = Math.ceil(this.cri.getPage() / this.displayPageNum) * this.displayPageNum; // 끝 페이지 (Math.ceil은 올림 함수)
		this.startPage = (this.endPage - this.displayPageNum) + 1; // 시작 페이지
		
		this.tempEndPage = Math.ceil(this.totalCount / this.cri.getPerPageNum());
		if(this.endPage > this.tempEndPage) this.endPage = this.tempEndPage;
		
		this.prev = this.startPage == 1 ? false : true;
		this.next = this.endPage * this.cri.getPerPageNum() >= this.totalCount ? false : true; 
	},
	getTotalCount:function() {
		return this.totalCount;
	},
	getStartPage:function() {
		return this.startPage;
	},
	getEndPage:function() {
		return this.endPage;
	},
	isPrev:function() {
		return this.prev;
	},
	isNext:function() {
		return this.next;
	},
	getDisplayPageNum:function() {
		return this.displayPageNum;
	},
	// 조회 결과 건수를 받아서 페이지의 시작 갯수와 끝 갯수를 리턴
	getResultRange:function(rsLength) {
		var startCount = (this.cri.page-1) * this.cri.perPageNum;
		var endCount = (this.cri.page-1) * this.cri.perPageNum + rsLength;
		return startCount + " - " + endCount;  
	},
	toString:function() {
		return "PageMaker [totalCount=" + this.totalCount + ", startPage="
				+ this.startPage + ", endPage=" + this.endPage + ", prev=" + this.prev
				+ ", next=" + this.next + ", displayPageNum=" + this.displayPageNum
				+ ", cri=" + this.cri + "]";
	}
}
/**
 * 이전 페이지 다음 페이지 엘리멘트의 ID를 받아서 세팅해준다.
 * @param pStr
 * @param pCondition
 * @returns
 */
function makePageShiftButton(pStr, pCondition, pSetPage) {
	var li = document.createElement("li");
	var a  = document.createElement("a");
	
	if(pStr == "prev") {
		a.text = "«";
		pSetPage = pSetPage-1;
	} else {
		a.text = "»";
		pSetPage = pSetPage+1;
	}
	if(pCondition) {
		li.setAttribute("class", "paginate_button previous");
		a.setAttribute("data-page", pSetPage);
	} else {
		li.setAttribute("class", "paginate_button previous disabled");
		a.setAttribute("data-page", 0);
	}
	li.appendChild(a);
	return li;
}
/**
 * 페이징의 버튼을 만들어 준다.
 * @param pIsPrev
 * @param pIsNext
 * @param pStartPage
 * @param pEndPage
 * @param pPage
 * @returns ul 엘리먼트를 반환한다.
 */
function makePageAllButton(pIsPrev, pIsNext, pStartPage, pEndPage, pPage) {
	var ul = document.createElement("ul");
	ul.setAttribute("class", "pagination");
	
	ul.appendChild(makePageShiftButton("prev", pIsPrev, pStartPage));
	
	for(pStartPage; pStartPage <= pEndPage; pStartPage++) {
		var li = document.createElement("li");
		var a  = document.createElement("a");
		
		if(pPage == pStartPage) {
			li.setAttribute("class", "paginate_button active");
		} else {
			li.setAttribute("class", "paginate_button");
		}
		a.text = pStartPage;
		a.setAttribute("data-page", pStartPage);
		a.setAttribute("href", "#");
		li.appendChild(a);
		ul.appendChild(li);
	}
	ul.appendChild(makePageShiftButton("next", pIsNext, pEndPage));
	
	return ul;
}

/**
 * html5의 JavaScript Validation을 이용한 유효성 검사 함수
 * 적용할 element Id를 배열로 전달한다.
 * type이 date인 input element는 값이 10자리가 넘어가는 경우 setCustomValidity를 해준다. 
 */
function cmmCheckValidation(aStr) {
	// 조회조건 배열이 없으면 유효성 체크가 필요 없으므로 true 리턴 
	if(aStr.length < 1) return true;
	
	for(var i in aStr) {
		var obj = document.getElementById(aStr[i]);
		obj.setCustomValidity("");
		
		if (!obj.checkValidity()) {
			return obj.reportValidity();
		} else if (obj.checkValidity() && (obj.type =="date" && obj.value.length > 10) || (obj.type=="month" && obj.value.length > 7)) {
			obj.setCustomValidity("연도를 확인해주세요");
			console.log("obj(" + obj + ") date length is " + obj.value.length);
			console.log("obj(" + obj + ") validationMessage is " + obj.validationMessage);
			return obj.reportValidity();
		}
	}
	return true;
}
/**
 * dataTable을 그려주기 위한 공통함수
 * DataTables 라이브러리가 추가된 페이지에서만 사용 가능 (불필요한 리소스 요청을 방지하기 위해 수동으로 추가함)
 * @param elementId
 * @param ordering : 컬럼 정렬 사용 여부
 * @param order0 : 0번재 컬럼 asc/desc 여부
 * @param scrollX : 테이블 가로 길이
 * @param scrollY : 테이블 세로 길이
 * @param autoWidth
 * @param index : Row Counter(넘버링) 여부(이것을 사용하려면 테이블 맨 앞 컬럼에 빈 컬럼을 추가해주어야 한다.).2016.11.17.namacoel
 */

function cmmDataTable(elementId, ordering, sort, scrollX, scrollY, autoWidth, numbering) {
	// numbering을 사용하면 첫번째 컬럼은 정렬기능이나 조회기능에서 제외되도록 설정해둠.2016.11.18
	var columnTarget = (numbering) ? 0 : -1;
	var orderColumn = (numbering) ? 1 : 0;

	var t = $("#"+elementId).DataTable({
		"destroy": true, // ajax로 데이터 반복적으로 조회시 destroy 옵션 사용해야함
		"renderer": "bootstrap", // 데이터 재조회 할 때마다 dataTable의 컬럼 크기가 변경되는 현상이 있어서 추가하였더니 해결됨.2016.08.03.yagami
		"ordering": ordering, // 정렬기능 사용여부(사용안하면 order도 동작하지 않는 것 같음
		"order": [[ orderColumn, sort ]], // "desc: 0번째 컬럼 내림차순
		"language": { // 테이블 데이터가 없을 때 표시할 내용
		      "emptyTable": "조회된 데이터가 없습니다."
		    },
		"select": true,
		"scrollX": scrollX,	// true/false 가능
		"scrollY": scrollY,
		"scrollCollapse": false, // row 데이터가 없을 경우 테이블의 크기가 동적으로 변경되는 지 여부
		"autoWidth": autoWidth, // false 변경하지 말것 가로화면이 동적으로 변경시 헤더가 변형됨
	    "paging": false, // 자체 paging 사용 안함
	    "searching": false, // 자체 searching 사용 안함
	    "info": false, // info 사용 안함
	    "columnDefs": [ {
	    		"searchable": false,
	    		"orderable": false,
	            "targets": columnTarget
	            } ]
//	    "fixedColumns":   { // 컬럼 고정 가능(css 설정과 js,css import해야함)
//            "leftColumns": 6
//	    }
	});
	
	if (numbering) {
		t.on( 'draw.dt', function () {
//			console.log( 'Redraw occurred at: '+new Date().getTime() );
			t.column().nodes().each( function (cell, i) {
				cell.innerHTML = i+1;
			} );
		} ).draw();
	}
}
// datatable로 그려진 테이블의 로우 클릭 이벤트시 selected 색 적용 
/*$(document).on("click", "table.dataTable tbody tr", function () {
	 if ( $(this).hasClass('selected') ) {
//	        $(this).removeClass('selected');
	    }
	    else {
	    	$(this).parent().children("tr.selected").removeClass("selected");
	        $(this).addClass('selected');
	    }
});

*/
/** treeview 사업장 부서 세팅 */
function setCustomTree(json) {

	var $customtTree = $('#treeBiz').treeview({
		data: json,
		cmmTreeLevels: 2
	});
	var search = function(e) {
		var pattern = $('#input-search').val();
		var options = {
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
		top.cmmTreeLevels++; // 트리 단계적으로 확장
		$customtTree.treeview('expandAll', { levels: top.cmmTreeLevels });
	});
	$('#btn-collapse-all').on('click', function (e) {
		top.cmmTreeLevels=1; // 트리 확장한 레벨 초기화
		$customtTree.treeview('expandAll', { levels: top.cmmTreeLevels});
	});
	$("#input-search").on("keyup", function() {
		$('#btn-collapse-all').trigger("click");
		$("#btn-search").click();
	});
}

/**
 * 같은 값이 있는 행을 병합함
 * 사용법 : $('#테이블 ID').span(row/col, tr/td, 위치, isStats(뭔지 모름));
 */
$.fn.span = function(type, kind, idx, isStats) {
	if(type=="row") {
	return this.each(function(){      
		var that;     
		$('tr', this).each(function(row) {      
			$(kind+':eq('+idx+')', this).filter(':visible').each(function(col) {
				
				if ($(this).html() == $(that).html()
					&& (!isStats 
							|| isStats && $(this).prev().html() == $(that).prev().html()
							)
					) {            
					rowspan = $(that).attr("rowspan") || 1;
					rowspan = Number(rowspan)+1;

					$(that).attr("rowspan",rowspan);
					
					// do your action for the colspan cell here            
					$(this).hide();
					
					//$(this).remove(); 
					// do your action for the old cell here
					
				} else {            
					that = this;         
				}          
				// set the that if not already set
				that = (that == null) ? this : that;      
			});     
		});    
	});
	} else if(type=="col") {
		return this.each(function(){
			var that;
			$('tr', this).filter(":eq("+idx+")").each(function(row) {
				$(this).find(kind).filter(':visible').each(function(col) {
					if ($(this).html() == $(that).html()) {
						colspan = $(that).attr("colSpan") || 1;
						colspan = Number(colspan)+1;
						
						$(that).attr("colSpan",colspan);
						$(this).hide(); // .remove();
					} else {
						that = this;
					}
					
					// set the that if not already set
					that = (that == null) ? this : that;
				});
			});
		});
	}
};
/******************************************
 * Source		: qooCommon.js
 * Description	: 공통JS
 * ****************************************
 * Date			Author			Description
 * ****************************************
 * 2016.07.24	ksw				최초 작성
 * 2019.06.07	ksw				리팩토링
 * ****************************************/

/********** Function common **********/
/** 사업장 정보를 select element 생성 */

/********** Function common ********************/
// TODO 차후 DB로 관리하여 공통으로 사용하기(마이플랫폼이나 google참고해서 개발하자)
function __confirmMsg(pKey) {
	var arrMsg = {
			"SAVE":"새로운 내용을 등록하시겠습니까?",
			"UPDATE":"수정된 내용을 저장하시겠습니까?",
			"CLOSE":"창을 닫으시겠습니까?",
			"RESET":"입력값을 초기화 하시겠습니까?", 
			"EXPORT_EXCEL":"조회된 목록을 추출하시겠습니까?",
			"COPY_INFO":"지원자 정보를 복사 하시겠습니까?",
			"DELETE":"정말로 삭제하시겠습니까?",
			// alert은 따로 만들기
			/*
			"alert001":"코드그룹을 다시 선택해주십시오.",
			"notSelected":"선택된 데이터가 없습니다.",
			"invalidRange":"조회범위가 잘못되었습니다.",
			"overRange6":"조회기간은 6개월이내입니다.",
			"overRange1":"조회기간은 1개월이내입니다.",
			"dupCheck":"중복 데이터가 존재합니다.",
			
			"error":"저장시 오류가 발생하였습니다."
				*/
	};
	return confirm(arrMsg[pKey]);
}
function __alertMsg(pKey) {
	var arrMsg = {
			"alert001":"코드그룹을 다시 선택해주십시오.",
			"notSelected":"선택된 데이터가 없습니다.",
			"invalidRange":"조회범위가 잘못되었습니다.",
			"overRange6":"조회기간은 6개월이내입니다.",
			"overRange1":"조회기간은 1개월이내입니다.",
			"dupCheck":"중복 데이터가 존재합니다.",
			"error":"저장시 오류가 발생하였습니다.",
			
	};
	 alert(arrMsg[pKey]);
}

/** 로딩바설정 */
var __loadingBar = {
	show : function() {
		var left = $("body").width()/2-100+"px";
		var top = $("body").height()/2-50+"px";
		$('body').oLoader({
			backgroundColor: '#666',
			style: "<div style='position:absolute;left:"+left+";top:"+top+";background:#333;color:#ddd;padding:5px;border-radius:4px;font-size:30px'>Loading...</div>",
		});
	},
	hide : function() {
		$('body').oLoader('hide');
	}
}
/*
*//** AJAX 통신 시작 *//*
$( document ).ajaxStart(function() {
	__loadingBar.show();
});

*//** AJAX 통신 종료 *//*
$( document ).ajaxStop(function() {
    __loadingBar.hide();
});
*/


/**
 * html5의 JavaScript Validation을 이용한 유효성 검사 함수
 * 적용할 element Id를 배열로 전달한다.
 * type이 date인 input element는 값이 10자리가 넘어가는 경우 setCustomValidity를 해준다. 
 */
function __checkValidation(arrE) {
	// 조회조건 배열이 없으면 유효성 체크가 필요 없으므로 true 리턴 
	if(arrE.length < 1) { return true; }
	
	for(var i in arrE) {
		var obj = document.getElementById(arrE[i]);
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

/** __checkValid에서 검사할 개체를 배열로 리턴한다. */
function __getValidElements(e) {
	// if(e == "" || e == undefined) { return console.log("check elementId.."); }
	if($(e).get(0) == undefined) { return alert("element 지정이 잘못되었습니다.( " + e + " )"); }
	 
	var arrE = [];	// new Array()는 안티패턴이라함..
	
	$(e).find("input:not([type='button'], [type='radio'], [type='checkbox']), select, textarea").each(function() {
		arrE.push($(this).prop("id"));
	});
	
	return arrE;
}
/********** Grid(dataTables) 공통 ********************/
/** dataTables에 데이터 넣기
 * dataSet : 그리드에 넣을 데이터
 * elementId : 데이터가 그려질 그리드의 ID
 * indexColumn : 그리드의 넘버링 사용시 true
 */
function __setGridData(dataSet, elementId, indexColumn){
	
	var dt = $(elementId).DataTable();
	dt.clear().draw();
	
	// order 기능은 일단 여기서 하지 않고, 각 화면의 _initGrid에서 지정하면 된다.
//	dt.order([ 0, 'asc' ]).draw();

	dt.rows.add(dataSet).draw();
	
	if(indexColumn) {
		dt.on('draw.dt', function () {
			// console.log( 'Redraw occurred at: '+new Date().getTime() );
			dt.column().nodes().each( function (cell, i) {
				cell.innerHTML = i+1;
			});
		}).draw();
	}


	/** dataTable에서 멀티셀렉트 사용을 위해 row 선택시 동일한 row인 경우 selected 유지되도록 의 속성(옵션)을 참조하여 분기를 만들어 주었음 */
	var selectStyle = dt.settings()[0]._select.style;
	if( selectStyle == "multi" || selectStyle == "os" ) {
		// 생략
	} else {
		dt.on('user-select', function(e, dt, type, cell, originalEvent) {
			if ($(cell.node()).parent().hasClass('selected')) { e.preventDefault(); }
		});
	}	
	
}

/* datatable로 그려진 테이블의 로우 클릭 이벤트시 selected 색 적용 */ 
/*$(document).on("click", "table.dataTable tbody tr", function () {
	 if ( $(this).hasClass('selected') ) {
//	        $(this).removeClass('selected');
	    }
	    else {
	    	$(this).parent().children("tr.selected").removeClass("selected");
	        $(this).addClass('selected');
	    }
});*/


/** DataTable 옵션 설명
 * type 인자 값이 display, sort, filter, type 4가지 타입이 있다.
 * type이 sort나 type 인 경우에도 변환을 하면 정렬이 되지 않을 수 있다.
 * 아래처럼 하면 sort에 기본값이나 ""빈값이 들어가서 헤더를 클릭하여 정렬하여도 변화가 없다. - 2019.04.19
 * e.g. if (type !== 'display' && type !== 'filter') { return data; }
 */


/** dt: 날짜 포맷 */
function __dtMaskDate(data, type, row, set) {
//	if (type !== 'display' && type !== 'filter') { return data; }
	var rtnVal = data;
//	var dataLength = data.length;
	var dataType = typeof data;

	if(dataType == "number") {
		rtnVal = __toDateFormat(__jsonDateToStr(data, "DATE"), "/");
	} else if(dataType == "string") {
		rtnVal = __toDateFormat(data, "/");
	}
	return rtnVal;
}
/** dt: 시간 포맷  */
function __dtMaskTime(data, type, row, set) {
	return __toTimeFormat(data);
}
/** dt: 전화번호 포맷  */
function __dtMaskPhone(data, type, row, set) {
	return __toPhoneFormat(data);
}


function __setDropdownTime(hourId, minId, secId, sHour, eHour, sMin, eMin) {
	if(!isNull(hourId)) __makeDropdownTime("option", hourId, sHour, eHour, "hour", "시");
	if(!isNull(minId)) __makeDropdownTime("option", minId, sMin, eMin, "min", "분");
	
} 
function __makeDropdownTime(elementName, id, startVal, endVal, opt1, opt2) {
	
	var selectElement = document.getElementById(id);
	
	deleteChildElements(id, elementName, "선택");
	
	switch (elementName) {
	case "option" :
		for(var i=startVal; i<=endVal; i++) { // 인자로 받은 시작값과 끝값을 범위로
			if(opt1 == "min") {
				if(i%10 == 0) {
					var optionElement = document.createElement(elementName); // option 엘리먼트 생성
					optionElement.setAttribute("value", __pad(i)); // option 엘리먼트의 value 속성 추가
					optionElement.appendChild(document.createTextNode(__pad(i)+opt2)); // option 엘리먼트의 text 속성 추가
					selectElement.appendChild(optionElement); // 생성된 option 엘리먼트를 select 엘리먼트에 자식으로 추가
				}
			} else {
				var optionElement = document.createElement(elementName); // option 엘리먼트 생성
				optionElement.setAttribute("value", __pad(i)); // option 엘리먼트의 value 속성 추가
				optionElement.appendChild(document.createTextNode(__pad(i)+opt2)); // option 엘리먼트의 text 속성 추가
				selectElement.appendChild(optionElement); // 생성된 option 엘리먼트를 select 엘리먼트에 자식으로 추가
			}
			
		}
		break;
	}
} 


/********** APP common ********************/
var __appCmm = {
	objName: "APP 공통", // Object명
	
	/** 코드그룹명으로 DB에서 코드북 가져오기 */
	getMultiCodeBookDB : function(strList) {
		var codeGrpList = [];
		codeGrpList = strList.split(",");
		for(var i in codeGrpList) {
			codeGrpList[i]=codeGrpList[i].trim();
		}
		
		var postData = new nMap();
		
		postData.put("DB_CRUD", "R"); 				// DB 트랜잭션
		postData.put("DB_MAPPER", "commonMapper"); // DB 네임스페이스
		postData.put("DB_REQID", "selectMultiCodeBook"); // DB 요청 ID
		postData.put("list", codeGrpList);
		
		var rtnListMap = new nMap();
		
		var cbf = function (rs) {
			for(var i in codeGrpList) {
					var tempList = [];
				for(var j in rs) {
					if(codeGrpList[i] == rs[j].codeGrp) {
						tempList.push(rs[j]);
					}
					rtnListMap.put(codeGrpList[i], tempList);
				}
			}
		};
		__serviceCall(CMM_ACTION, postData, false, cbf);
		
		return rtnListMap;
	},
	/** 사업장 정보 코드북 가져오기 */
	getBizareaCodeBook : function() {
		var postData = new nMap();
		
		postData.put("DB_CRUD", "R"); // DB 트랜잭션
		postData.put("DB_MAPPER", "commonMapper"); // DB 네임스페이스
		postData.put("DB_REQID", "selectBizareaCodeBook"); // DB 요청 ID
		postData.put("srchDtTopen", __getDate().left(8)); // 사용중인 데이터만 조회를 위해 추가.2016.09.26
		
		var rtnListMap = new nMap();
		
		var cbf = function (rs) {
			for(var i in rs) {
				rs[i].subNm=rs[i].codeNm+" \u00A0 \u00A0["+rs[i].code+"]";
			}
			rtnListMap = rs;
		};
		__serviceCall(CMM_ACTION, postData, false, cbf)
		
		return rtnListMap;
	},
	/** 부서 정보 코드북 가져오기 */
	getDeptCodeBook : function () {
		var postData = new nMap();
		
		postData.put("DB_CRUD", "R"); // DB 트랜잭션
		postData.put("DB_MAPPER", "commonMapper"); // DB 네임스페이스
		postData.put("DB_REQID", "selectDeptCodeBook"); // DB 요청 ID
		postData.put("srchDtEnd", __getDate().left(8)); // 사용중인 데이터만 조회를 위해 추가.2016.09.26
		
		var rtnListMap = new nMap();
		
		var cbf = function (rs) {
			for(var i in rs) {
				rs[i].codeNm = __spaceToChar(rs[i].codeNm, "\u00A0");
				rs[i].subNm=rs[i].codeNm+" \u00A0 \u00A0["+rs[i].code+"]";
			}
			rtnListMap = rs;
		};
		__serviceCall(CMM_ACTION, postData, false, cbf);
		
		return rtnListMap;
	},
	/** 코드그룹 listMap으로 selecbox 세팅하기
	 *  참고 : defaultVal은 __elementClear()가 나중에 실해되면 의미 없어짐
	 *  */
	setDropDown : function(obj, codeGrp, elementId, nullName, pStr1) {
		var rtnList = [];
		if(!obj.containsKey(codeGrp)) { return; }
		rtnList = obj.get(codeGrp);
		
		deleteChildElements(elementId, "option", nullName);
		if(rtnList.length > 0) {
			for(var i in rtnList) {
				var optionElement = document.createElement("option");
				optionElement.setAttribute("code-grp", rtnList[i].codeGrp);
				optionElement.setAttribute("value", rtnList[i].code);
				optionElement.setAttribute("data-etc1", rtnList[i].etc1);
				optionElement.setAttribute("data-usyn", rtnList[i].usyn);
				if(pStr1 == "subNm") {
					optionElement.appendChild(document.createTextNode(rtnList[i].subNm));
				} else {
					optionElement.appendChild(document.createTextNode(rtnList[i].codeNm));
				}
				document.getElementById(elementId).appendChild(optionElement);
			}
		}
		//if(defaultVal != undefined) { document.getElementById(elementId).value = defaultVal; }
	},
	/** 사업장에 따른 부서 코드 세팅 및 change 이벤트 걸기 */
	setBizareaChangeEvent : function(tempList, bizareaId, deptId, emptyText, pStr1) {
		$(document).on("change", "#"+bizareaId, function() {
			var code = $(this).val();
			var tempListMap = new nMap();
			var rsList = [];
			
			for(var i in tempList) {
				if(code == tempList[i].codeGrp) {
					rsList.push(tempList[i]);
				}
			}
			tempListMap.put("DEPT", rsList);
			__appCmm.setDropDown(tempListMap, "DEPT", deptId, emptyText, pStr1);
		});
		
	},
	/** 주소코드 DB에서 가져오기 */
	getAddrCodeBook : function() {
		var postData = new nMap();
		
		postData.put("DB_CRUD", "R");
		postData.put("DB_MAPPER", "commonMapper");
		postData.put("DB_REQID", "selectAddrCode");
		
		var rtnListMap = new nMap();
		
		var cbf = function (rs) {
			var listD = [];
			var listS = [];
			var listG = [];
			for(var i in rs) {
				var tempId = rs[i].addrId;
				if(tempId.left(1) == "D") {
					listD.push(rs[i]);
				} else if(tempId.left(1) == "S") {
					listS.push(rs[i]);
				} else if(tempId.left(1) == "G") {
					listG.push(rs[i]);
				}
			}
			rtnListMap.put("D", listD);
			rtnListMap.put("S", listS);
			rtnListMap.put("G", listG);
		};
		__serviceCall(CMM_ACTION, postData, false, cbf);
		
		return rtnListMap;
	},
	/** 주소코드 selectbox 세팅하기 */
	setAddrDropDown : function(obj, grpId, elementId, upperId) {
		var rtnList = [];
		if(!obj.containsKey(grpId)) { return; }
		rtnList = obj.get(grpId);
		
		deleteChildElements(elementId, "option");
		if(rtnList.length > 0) {
			for(var i in rtnList) {
				if(upperId == rtnList[i].upperAddrId) {
					var optionElement = document.createElement("option");
					optionElement.setAttribute("data-upper", rtnList[i].upperAddrId);
					optionElement.setAttribute("value", rtnList[i].addrId);
					optionElement.appendChild(document.createTextNode(rtnList[i].addrNm));
					document.getElementById(elementId).appendChild(optionElement);
				}
			}
		}
	},
	/** 주소에 따른 코드 세팅 및 chagne 이벤트 걸기 */
	setAddrChangeEvent : function(tempListMap, e1, e2, e3) {
		$(document).on("change", "#"+e1, function() {
			var upperId = $(this).val();
			__appCmm.setAddrDropDown(tempListMap, "S", e2, upperId);
			$("#"+e2).trigger("change");
		});
		$(document).on("change", "#"+e2, function() {
			var upperId = $(this).val();
			__appCmm.setAddrDropDown(tempListMap, "G", e3, upperId);
		});
	},
	/** 채용경로2 세팅
	 * 채용경로1이 MGM인 경우 dropdown 내용이 달라지므로 change이벤트는 별도로 구현함 */
	setRecruitSite2DropDown : function(tempList, key, eId, emptyText) {
		var tempListMap = new nMap();
		var rsList = [];
		
		for(var i in tempList) {
			if(key == tempList[i].etc1) {
				rsList.push(tempList[i]);
			}
		}
		tempListMap.put("RECRUITSITE2", rsList);
		__appCmm.setDropDown(tempListMap, "RECRUITSITE2", eId, emptyText);
		
	},
	/** 채용경로2 세팅
	 * 채용경로1이 MGM인 경우 dropdown 내용이 달라지므로 change이벤트는 별도로 구현함 */
	setRecruitSite2DropDownUsyn : function(tempList, key, eId, emptyText, appendKey) {
		var tempListMap = new nMap();
		var rsList = [];
		
		for(var i in tempList) {
			if(key == tempList[i].etc1) {
				if(tempList[i].usyn==1 || tempList[i].code == appendKey) {
					rsList.push(tempList[i]);
				}
			}
		}
		tempListMap.put("RECRUITSITE2", rsList);
		__appCmm.setDropDown(tempListMap, "RECRUITSITE2", eId, emptyText);
		
	},
}


/** 공백을 임의의 문자로 변환해주는 함수. 공백이 안먹는 일부 element에서 사용하기 위한 것이다. */
function __spaceToChar(pStr, pOutput) { 
	var result = ""; //반환해주는 결과값
	for (i=0; i<pStr.length; i++ ) {
		var tempStr=pStr.charAt(i);
		if (tempStr == " ") tempStr = pOutput;
		result += tempStr;
	}
	return result;
}


/** 하위 태그에서 데이터 추출하여 postData에 데이터 넣기 */
function __putIntoPostData(e, postData, pNullVal) {
	var nullVal	= ""; // null|공백이면 대신 채울 값?
	if(pNullVal != undefined) { nullVal	= pNullVal;	 }

	if((typeof(e)).toUpperCase() == "OBJECT") {
		for(var key in e) {
			if(key != "") {
				var tmpVal	= e[key];
				// NULL 값 치환
				if(tmpVal == "" || tmpVal == null) { tmpVal	= nullVal; }
				postData.put(key, tmpVal);
			}
		}
	} else {
		$(e).find("input:not([type='button']), select, textarea").each(function() {
			var objClass	= $(this).hasClass("phoneMask") || $(this).hasClass("dateMask") || $(this).hasClass("numberMask");
			var objId		= $(this).attr("id");
			var objName		= $(this).attr("name");
			var objTagName	= ($(this).get(0).tagName).toUpperCase();
			var objType		= ($(this).get(0).type).toUpperCase();
			var isTypeNum 	= objType=="NUMBER"||objType=="DATE"||objType=="MONTH"||objType=="TEL";
			var objVal		= (objClass||isTypeNum) == true ? $(this).numVal() : $(this).val();	// 값을 추출하는데 숫자class면 숫자만 추출하고 나머지는 그대로 추출한다.

			var key		= typeof(objName) == "undefined" ? objId : objName;		// name 값이 없을 경우 id 값으로 key 설정을 한다.
			var val		= objVal.trim();
			
			// 값이 공백|null이면 대체 값 입력
			if(val == "" || val == null) { val	= nullVal; } 
			
			// 빈값 체크
			if(key != "") {
				// 배열에 셋팅
				switch (objTagName) {
					case "INPUT":
						if(objType == "CHECKBOX") {
							var bChecked = $(this).is(":checked");
							if(bChecked) {
								postData.put(key,	val);
							} else {
								postData.put(key,	$(this).attr("novalue"));
							}
						} else if(objType == "RADIO") {
							// 라디오 박스가 체크 되어 있을 경우만 add 한다.
							var bChecked	= $(this).is(":checked");
							if(bChecked == true) { postData.put(key,	val); }
						} else {
							// 그 외의type인 경우 파라미터 세팅(type = text, hidden, password...)
							postData.put(key,	val);
						}
					break;
					case "SELECT":
						postData.put(key,		val);
					break;
					case "TEXTAREA":
						postData.put(key,		val);
					break;
					default:
						postData.put(key,		val);
					break;
				}
			}
		});
	}
	return postData;
}
/** 데이터셋을 각 태그에 바인딩 한다. */
function __bindToDataset(pMap) {
	$.each(pMap, function(key, value){
//		console.log(key);
		var setObj = $("[name='"+key+"']").length>0 ? $("[name='"+key+"']") : $("#"+key);
		if(setObj.size() > 0) {
//			var objClass 	= setObj.hasClass("phoneMask") || $(this).hasClass("dateMask");
			var objId 		= setObj.attr("id");
//			var objName 	= setObj.attr("name");
			var objTagName 	= (setObj.get(0).tagName).toUpperCase();
			var objType 	= (setObj.get(0).type).toUpperCase();

			switch(objTagName) {
			case "INPUT":
				if(objType=="CHECKBOX") {
					$("input[name='"+key+"']").filter("input:checkbox[value='"+value+"'").prop("checked", true);
				} else if(objType == "RADIO") {
					if($("input:radio[name='"+key+"']").length > 0) {
						$("input[name='"+key+"']").filter("input:radio[value='"+value+"']").prop("checked", true);
					}
				} else if(objType == "DATE") {
					if(setObj.length > 0) {
						setObj.val(__toDateFormat(value, "-"));
					}
				} else {
					if(setObj.hasClass("phoneMask")) {
						// TODO:phoneval 기능 없음
						setObj.phoneVal(value);
					} else if(setObj.hasClass("dateMask")) {
						setObj.val(value);
						setObj.trigger("change");
					// db에서 가져온 datetime인 경우
					} else if(setObj.hasClass("dbDatetime")) {
						setObj.val(__jsonDateToStr(value, "DISP"));
					} else {
						setObj.val(value);
					}
				}
				// db에서 가져온 datetime인 경우
				if(key=="indt" || key=="updt") {
					setObj.val(__jsonDateToStr(value, "DISP"));
				}
				break;
			case "SELECT":
				setObj.val(value);
				setObj.trigger("change");
				break;
			case "TEXTAREA":
				setObj.val(value);
				break;
			case "SPAN":
				setObj.text(value);
				break;
			default:
				setObj.val(value);
					
			}
		}
	});
}
/********** 미정 common ********************/

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
function __textPaste(str, text) {
	if(isNull(str)) { return str; }
	return str + text;
}

/** 맵 형태로 파라미터를 추가하고, JSON 스트링으로 변환하기 위함  */
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
	size:function() {
		var count = 0;
		for (var prop in this.map) {
			count++;
		}
		return count;
	},
	/** Map key가 있는지 여부 */
	containsKey:function(pKey) {
		for(var key in this.map) {
			if(key == pKey) { return true; }
		}
		return false;
	},
    /** 지정된 key 를 삭제한다 */
	remove:function(key) {
		for(var tKey in this.map) {
			if (tKey == key) {
				delete this.map[tKey];
				return true;
			}
		}
		return false;
	},
	/** 키를 변경한다.(new, old) */
	renameKey:function(nKey, oKey) {
		for(var tKey in this.map) {
			if (tKey == oKey) {
				this.map[nKey] = this.map[oKey];
				delete this.map[oKey];
				return true;
			}
		}
		return false;
	}
}


/** length 만큼 좌측에서 추출 */
String.prototype.left = function(length){
	if(this.length < length){
			return this;
	} else {
		return this.substring(0, length);
	}
}
/** length만큼 우측에서 추출 */
String.prototype.right = function(length){
	if(this.length <= length){
		return this;
	} else {
		return this.substring(this.length - length, this.length);
	}
}
/** length만큼 우측에서 제외하고 추출 */
String.prototype.rightReverse = function(length){
	if(this.length <= length){
		return this;
	} else {
	 return this.substring(0, this.length - length);
	}
}
/** 페이징 기본 정보 관련 함수 */
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
/** 페이징 정보 세팅 함수 */
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

/** 이전 페이지 다음 페이지 엘리멘트의 ID를 받아서 세팅해준다. */
function __makePageShiftButton(pStr, pCondition, pSetPage) {
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

/** 페이징의 버튼을 만들어 준다. */
function __makePageAllButton(pIsPrev, pIsNext, pStartPage, pEndPage, pPage) {
	var ul = document.createElement("ul");
	ul.setAttribute("class", "pagination");
	
	ul.appendChild(__makePageShiftButton("prev", pIsPrev, pStartPage));
	
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
	ul.appendChild(__makePageShiftButton("next", pIsNext, pEndPage));
	
	return ul;
}


/********** cmmElement ********************/
/** 자식 엘리먼트 모두 삭제 */
function deleteChildElements(id, elementTag, pStr) {
	var node = document.getElementById(id);
	
	if(!node) { return; }
	
	while(node.hasChildNodes()) { // node가 가진 자식 노드가 있으면 
		node.removeChild(node.lastChild); // 마지막 자식노드를 삭제
	}
	switch(elementTag) {
	case "option":
		// pStr이 있는 경우에만 nullText 세팅
		if(pStr !=  undefined) {
			var optionElement = document.createElement(elementTag);
			optionElement.setAttribute("value", "");
			optionElement.appendChild(document.createTextNode(pStr));
			node.appendChild(optionElement);
		}
		break;
	}
}


/** #tableSearch input 태그의 keyup인 경우 btnSrch 조회 */  
$(document).on("keyup", "#tableSearch input", function(e) {
	if(e.keyCode==13) {
		$("#btnSrch").trigger("click");
	}
});
/** #tableSearch input 태그의 keyup인 경우 btnSrch 조회 */  
$(document).on("keyup", "#tableSearch1 input", function(e) {
	if(e.keyCode==13) {
		$("#btnSrch1").trigger("click");
	}
});
/** #tableSearch2 input 태그의 keyup인 경우 btnSrch 조회 */  
$(document).on("keyup", "#tableSearch2 input", function(e) {
	if(e.keyCode==13) {
		$("#btnSrch2").trigger("click");
	}
});
/** #tableSearch3 input 태그의 keyup인 경우 btnSrch 조회 */  
$(document).on("keyup", "#tableSearch3 input", function(e) {
	if(e.keyCode==13) {
		$("#btnSrch3").trigger("click");
	}
});

//.input-phone인 경우, keyup 이벤트시 하이픈을 입력한다.
$(document).on("keyup", ".input-phone", function() {
	event.preventDefault();
	this.value = __toPhoneFormat(this.value);
	$(this).trigger("change");
});


/********** cmmDate ********************/

/** 값 앞에 0을 붙이고 뒤 2자리만 추출(날짜 및 시간이 1자리 인경우를 위한 함수) */
function __pad(num) {
//	num < 10 ? num = '0'+num : num;
//	return num.toString();
	num = "0" + num;
   return num.slice(-2);
}


/** datetime 형식의 JSON 데이터를 날짜, 시간 형식으로 리턴한다. */ 
function __jsonDateToStr(jsonDate, option) {

    var year, month, day, hour, minute, second, date;
    var rtnVal = "";
    
    if(isNull(jsonDate)) { return rtnVal; }

    date = new Date(jsonDate);
    
    year = date.getFullYear();
    month = __pad(date.getMonth()+1);
    day = __pad(date.getDate());
    hour = __pad(date.getHours());
    minute = __pad(date.getMinutes());
    second = __pad(date.getSeconds());
    
    switch (option) {
	case "DATE":
		rtnVal = year+month+day;
		break;
	case "TIME":
		rtnVal = hour+minute+second;
		break;
	case "DATETIME":
		rtnVal = year+month+day+hour+minute+second;
	break;
	case "DISP":
		rtnVal = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	break;
	default:
		break;
	}
    return rtnVal;
}

/** YYYY:MM:DD가 가능한 형태의 문자를 받아서 구분자를 추가하고 리턴한다.
 * null, undefined, NaN, empty string (“”), 0, false 이면 return;  */
function __toDateFormat(str, dmt, fmt) {
	if (!str) { return ""; } 
	str = str.replace(/[^\d]+/g, "");
	if(isNull(dmt)) { dmt = "-"; }
	
	if(str.length == 8) {
		str = str.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, "$1"+dmt+"$2"+dmt+"$3");
	} else if(str.length == 6) {
//		str = str.replace(/([0-9]{4})([0-9]{2})/, "$1"+dmt+"$2"+dmt+"XX");
		str = str.replace(/([0-9]{4})([0-9]{2})/, "$1"+dmt+"$2");
	} else if(str.length == 4) {
		if(fmt=="MMDD") {
			str = str.replace(/([0-9]{2})([0-9]{2})/, "$1"+dmt+"$2");
		} else {
//		str = str.replace(/([0-9]{4})/, "$1"+dmt+"XX"+dmt+"XX");
			str = str.replace(/([0-9]{4})/, "$1");
		}
	}
	return str;
}

/** HH:MM의 형태가 가능한 숫자를 받아서 구분자를 추가하고 리턴한다. */
function __toTimeFormat(str) {
	if (!str) { return ""; } 
	str = str.replace(/[^\d]+/g, "");
	if(str.length == 4) {
		str = str.replace(/([0-9]{2})([0-9]{2})/, "$1:$2");
	} else if(str.length == 6) {
		str = str.replace(/([0-9]{2})([0-9]{2})([0-9]{2})/, "$1:$2:$3");
	}  else {
		return "";
	}
	return str;
}

function __toPhoneFormat(str) {
	str = str.replace(/[^\d]+/g, "");
	str = str.replace(/(^02.{0}|^01.{1}|^050.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");
	return str;
}

/** 현재 로컬 날짜와 시간을 구한다. 용도에 따라 GMT 와 연관 있을수 있으니 주의 */
function __getDate(date, format) {
	
	var dt = null;
	
	if(isNull(date)) {
		dt = new Date();
	} else {
		// date에 입력되는 날짜, 시간 정보는 여러가지 형태가 될 수 있다.
		// '2016-0-01' 등
		dt = new Date(date);
	}
	
	var year = dt.getFullYear();
	var month = __pad(dt.getMonth() + 1);
	var day = __pad(dt.getDate());
	var hour = __pad(dt.getHours());
	var min = __pad(dt.getMinutes());
	var sec = __pad(dt.getSeconds());
	
	return year + month + day + hour + min +sec;
}


/********** common : View Setting ********************/
/** element 값 clear 시키기 */
function __elementClear(e) {
	if(e == "" || e == undefined) { return console.log("check elementId.."); }

	$(e).find("input:not([type='button'], [type='radio'], [type='checkbox'])").each(function() {
		$(this).val("");
	});
	$(e).find("select").each(function() {
		$(this).val("");
	});
	$(e).find("textarea").each(function() {
		$(this).val("");
	});
}
/** 공통 - element disabled/enabled 상태 설정 */ 
function __elementDis(e, pJob, cond) {
	if(e == "" || e == undefined) { return console.log("check elementId.."); }
	
	if (cond == "DIS") {
		$(e).find("input, button").not(".nonDis").each(function() {
			$(this).prop("disabled", true);
		});
		$(e).find("select").not(".nonDis").each(function() {
			$(this).prop("disabled", true);
//			$(this).next().find("i").prop("disabled", true); // ???
		});
		$(e).find("textarea").not(".nonDis").each(function() {
			$(this).prop("disabled", true);
		});
	/*	$(e).find("img").not(".nonDis").each(function() {
			$(this).prop("disabled", true);
			$(this).addClass("imgDis");
		});*/
	} else if (cond == "ENA"){
		$(e).find("input:not([type='file']), button").not(".dis").each(function() {
			if(pJob == "MOD") {
				if( $(this).hasClass("modDis") ) {
					$(this).prop("disabled", true);
				} else {
					$(this).prop("disabled", false);				
				}
			} else {
				$(this).prop("disabled", false);
			}
		});
		$(e).find("select").not(".dis").each(function() {
			if(pJob == "MOD") {
				if( $(this).hasClass("modDis") ) {
					$(this).prop("disabled", true);
				} else {
					$(this).prop("disabled", false);
				}
			} else {
				$(this).prop("disabled", false);
			}
		});
		$(e).find("textarea").not(".dis").each(function() {
			if(pJob == "MOD") {
				if( $(this).hasClass("modDis") ) {
					$(this).prop("disabled", true);
				} else {
					$(this).prop("disabled", false);
				}
			} else {
				$(this).prop("disabled", false);
			}
		});
		/*$(e).find("img").not(".dis").each(function() {
			if(pJob == "MOD") {
				if( $(this).hasClass("modDis") ) {
					$(this).prop("disabled", true);
				} else {
					$(this).prop("disabled", false);
					$(this).removeClass("imgDis");
				}
			} else {
				$(this).prop("disabled", false);
				$(this).removeClass("imgDis");
			}
		});*/
	}
}


/** treeview 사업장 부서 세팅 */
function __setCustomTree(json) {

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

/** 문자열에서 숫자만 추출하는 함수 */
function __getNum(str) {
	return str.replace(/[^\d]+/g,"");
}
/** 문자열에서 영문과 숫자만 추출 */
function __getEngNum(str) {
	return str.replace( /[^a-z^0-9]/gi,"");
}
/** 문자열에서 영문과 숫자만 추출 */
function __getEng(str) {
	return str.replace( /[^a-z]/gi,"");
}




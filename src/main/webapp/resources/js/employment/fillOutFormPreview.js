/**************************************************
 * source		: fillOutFormPreview.js
 * description	: 공통 코드 관리 화면
 * ************************************************
 * date			author			description
 * ************************************************
 * 2016.05.09	김상우			최초 작성
 * ************************************************
 **************************************************/


/**************************************************
 * 전역 변수 선언
 **************************************************/
var aplcntFormIdx = opener.aplcntFormIdx;
var sectionCd1 = "SCHOOL";
var sectionCd2 = "COMPANY";
var sectionCd3 = "CERTI";
var aplcntId = "Test";
var modifierId = "JS";
$(document).ready(function() {
	selectAplcntFormPreview();
	selectSchoolInfoPreview();
	selectCompanyInfoPreview();
	selectCertiInfoPreview();
	selectFamInfoPreview();
	setReadonly("input");
});
$(document).on("click", "#btnPrint", function() {
	$("#divHide").hide();
	window.print();
	$("#divHide").show();
});
$(document).on("click", "#btnClose", function() {
	window.open("about:blank","_self").close();
});

/**************************************************
 * CRUD 함수 정의
 **************************************************/
/** 입사자 정보 미리보기 select 함수 */
function selectAplcntFormPreview() {
	var getParam = new nMap();
	
	var DB_CRUD = "R";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "selectAplcntFormPreview");
	
	getParam.put("aplcntFormIdx", aplcntFormIdx);
	
	var postData = getParam.toJSONString();
	
	console.log(postData);
	
	var cbf = function(rs) {
		console.log("Preview 콜백");
		
		
		if(rs.length>0) {
			rs = rs[0]
			var allName = rs.korName + " (" + rs.chnName + " | " + rs.engName +" )";
			var korName = "&nbsp;&nbsp;작성자 : <b>" + rs.korName+"</b>";
			var tempDate = cmmJsonDateToString(rs.modifiedDt);
			var modifiedDt = "작성일 : <b>" + tempDate.substr(0,4) + "년 " + tempDate.substr(5,2) + "월 " + tempDate.substr(8,2) + "일</b>";
			 
			$("#signature").html(modifiedDt + korName);
			$("#allName").val(allName);
			$("#aplcntPhotoNm").attr("src", gFileSrc + rs.aplcntPhotoNm);
			$("#ihidnum").val(rs.ihidnum);
			$("#fullAddr").val(rs.addr1 + " " + rs.addr2);
			$("#mobilenum").val(rs.mobilenum);
			$("#phonenum").val(rs.phonenum);
			$("#email").val(rs.email);
			$("#disabledSttsCd").val(rs.disabledSttsCd);
			$("#bohunSttsCd").val(rs.bohunSttsCd);
			$("#maritalSttsCd").val(rs.maritalSttsCd);
			
			$("#engLvCd").val(rs.engLvCd);
			$("#excelLvCd").val(rs.excelLvCd);
			$("#specialty").val(rs.specialty);
			$("#milDischargedCd").val(rs.milDischargedCd);
			$("#milServ").val(rs.milServ);
			$("#jpnLvCd").val(rs.jpnLvCd);
			$("#pptLvCd").val(rs.pptLvCd);
			$("#hobby").val(rs.hobby);
			var milPeriod = rs.milSdate.substr(0,4) + "." + rs.milSdate.substr(4,2) + " ~ " + rs.milEdate.substr(0,4) + "." + rs.milEdate.substr(4,2);
			$("#milPeriod").val(milPeriod);
			$("#milRankCd").val(rs.milRankCd);
			$("#etclang").text(rs.etclang);
			$("#etclangLvCd").val(rs.etclangLvCd);
			$("#typingSpd").val(rs.typingSpd+"타");
			$("#religion").val(rs.religion);
			$("#exemptionRsn").val(rs.exemptionRsn);
			$("#factAgrmntCd").val(rs.factAgrmntCd);
		}
	}
	crudAction(DB_CRUD, postData, cbf);
}

/** 학력리스트 미리보기 조회 */
function selectSchoolInfoPreview() {
	
	var getParam = new nMap();
	
	var DB_CRUD = "R";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "selectSchoolInfoPreview");
	
	getParam.put("aplcntFormIdx", aplcntFormIdx);
	getParam.put("sectionCd", sectionCd1);
	
	var postData = getParam.toJSONString();
	
	console.log(postData);
	
	var cbf = function(rs, elementId) {
		
		var colgroup = document.createElement("colgroup");
		var tr = document.createElement("tr");
		var colWidth = ["20px","120px","*","21%","15%","18%"];
		var header = ["학<br><br>력","재학기간", "출신학교", "전공", "졸업여부", "소재지"];
		
		for(var i=0 in header) {
			var col = document.createElement("col");
			col.setAttribute("width", colWidth[i]);
			colgroup.appendChild(col);
			
			var th = document.createElement("th");
			th.innerHTML = header[i];
			if (i == 0) th.setAttribute("rowspan", "4"); 
			tr.appendChild(th);
		}
		document.getElementById(elementId).appendChild(colgroup);
		document.getElementById(elementId).appendChild(tr);
		
		if(rs.length>0) {
			for(var i in rs) {
				tr = document.createElement("tr");
				for(var j=0;j<5;j++) {
					var td = document.createElement("td");
					tr.appendChild(td);
				}
				var sYear = rs[i].orgSdate.substr(0,4);
				var sMonth = rs[i].orgSdate.substr(4,2);
				var eYear = rs[i].orgEdate.substr(0,4);
				var eMonth = rs[i].orgEdate.substr(4,2);
				tr.childNodes.item(0).appendChild(document.createTextNode(sYear+"."+sMonth+" ~ "+eYear+"."+eMonth));
				tr.childNodes.item(1).appendChild(document.createTextNode(rs[i].orgName));
				tr.childNodes.item(2).appendChild(document.createTextNode(rs[i].orgDept));
				tr.childNodes.item(3).appendChild(document.createTextNode(rs[i].orgSttsCd));
				tr.childNodes.item(4).appendChild(document.createTextNode(rs[i].orgLoc));
				document.getElementById(elementId).appendChild(tr);
			}
		}
		/* 학력이 3개 미만일 경우 빈 행을 채우도록 한다. */
		if(rs.length<3) {
			for(var i=0;i<(3-rs.length);i++) {
				tr = document.createElement("tr");
				for(var j=0;j<5;j++) {
					var td = document.createElement("td");
					td.appendChild(document.createTextNode("-"));
					tr.appendChild(td);
				}
				document.getElementById(elementId).appendChild(tr);
			}
		}
	}
	crudAction(DB_CRUD, postData, cbf, "tbdSchoolList");
}
/** 경력 미리보기 조회 */
function selectCompanyInfoPreview() {
	
	var getParam = new nMap();
	
	var DB_CRUD = "R";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "selectCompanyInfoPreview");
	
	getParam.put("aplcntFormIdx", aplcntFormIdx);
	getParam.put("sectionCd", sectionCd2);
	
	var postData = getParam.toJSONString();
	
	console.log(postData);
	
	var cbf = function(rs, elementId) {
		
		var colgroup = document.createElement("colgroup");
		var tr = document.createElement("tr");
		var colWidth = ["20px","120px","*","13%","20%","10%","13%"];
		var header = ["경<br><br>력","근무기간","회사명","직위","담당업무","월급여","사직사유"];
		
		for(var i=0 in header) {
			var col = document.createElement("col");
			col.setAttribute("width", colWidth[i]);
			colgroup.appendChild(col);
			
			var th = document.createElement("th");
			th.innerHTML = header[i];
			if (i == 0) th.setAttribute("rowspan", "5"); 
			tr.appendChild(th);
		}
		document.getElementById(elementId).appendChild(colgroup);
		document.getElementById(elementId).appendChild(tr);
		
		if(rs.length>0) {
			for(var i in rs) {
				tr = document.createElement("tr");
				for(var j=0;j<6;j++) {
					var td = document.createElement("td");
					tr.appendChild(td);
				}
				var sYear = rs[i].orgSdate.substr(0,4);
				var sMonth = rs[i].orgSdate.substr(4,2);
				var eYear = rs[i].orgEdate.substr(0,4);
				var eMonth = rs[i].orgEdate.substr(4,2);
				tr.childNodes.item(0).appendChild(document.createTextNode(sYear+"."+sMonth+" ~ "+eYear+"."+eMonth));
				tr.childNodes.item(1).appendChild(document.createTextNode(rs[i].orgName));
				tr.childNodes.item(2).appendChild(document.createTextNode(rs[i].orgPosCd));
				tr.childNodes.item(3).appendChild(document.createTextNode(rs[i].orgDept));
				tr.childNodes.item(4).appendChild(document.createTextNode(cmmToCommaUnit(rs[i].orgSal)+"만원"));
				tr.childNodes.item(5).appendChild(document.createTextNode(rs[i].orgResiRsn));
				document.getElementById(elementId).appendChild(tr);
			}
		}
		
		/* 경력이 4개 미만일 경우 빈 행을 채우도록 한다. */
		if(rs.length<4) {
			for(var i=0;i<(4-rs.length);i++) {
				tr = document.createElement("tr");
				for(var j=0;j<6;j++) {
					var td = document.createElement("td");
					td.appendChild(document.createTextNode("-"));
					tr.appendChild(td);
				}
				document.getElementById(elementId).appendChild(tr);
			}
		}
	}
	crudAction(DB_CRUD, postData, cbf, "tbdCompanyList");
}
/** 자격사항 리스트 조회 */
function selectCertiInfoPreview() {
	
	var getParam = new nMap();
	
	var DB_CRUD = "R";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "selectCertiInfoPreview");
	
	getParam.put("aplcntFormIdx", aplcntFormIdx);
	getParam.put("sectionCd", sectionCd3);
	
	var postData = getParam.toJSONString();
	
	console.log(postData);
	
	var cbf = function(rs, elementId) {
		
		var colgroup = document.createElement("colgroup");
		var tr = document.createElement("tr");
		var colWidth = ["20px","*","60px"];
		var header = ["자격사항","종류","취득일자"];
		
		for(var i=0 in header) {
			var col = document.createElement("col");
			col.setAttribute("width", colWidth[i]);
			colgroup.appendChild(col);
			
			var th = document.createElement("th");
			th.appendChild(document.createTextNode(header[i]));
			if (i == 0) th.setAttribute("rowspan", "6"); 
			tr.appendChild(th);
		}
		document.getElementById(elementId).appendChild(colgroup);
		document.getElementById(elementId).appendChild(tr);
		
		if(rs.length>0) {
			for(var i in rs) {
				console.log("i:"+i);
				var tr = document.createElement("tr");
				
				for(var j=0;j<2;j++) {
					var td = document.createElement("td");
					tr.appendChild(td);
				}
								
				var sYear = rs[i].orgSdate.substr(0,4);
				var sMonth = rs[i].orgSdate.substr(4,2);
				
				tr.childNodes.item(0).appendChild(document.createTextNode(rs[i].orgName));
				tr.childNodes.item(1).appendChild(document.createTextNode(sYear+"."+sMonth));
				
				document.getElementById(elementId).appendChild(tr);
			}
		}
		/* 경력이 4개 미만일 경우 빈 행을 채우도록 한다. */
		if(rs.length<5) {
			for(var i=0;i<(5-rs.length);i++) {
				tr = document.createElement("tr");
				for(var j=0;j<2;j++) {
					var td = document.createElement("td");
					td.appendChild(document.createTextNode("-"));
					tr.appendChild(td);
				}
				document.getElementById(elementId).appendChild(tr);
			}
		}
	}
	crudAction(DB_CRUD, postData, cbf, "tbdCertiList");
}
/** 가족 미리보기 조회 */
function selectFamInfoPreview() {
	
	var getParam = new nMap();
	
	var DB_CRUD = "R";
	getParam.put("DB_MAPPER", "fillOutFormMapper");
	getParam.put("DB_REQID", "selectFamInfoPreview");
	
	getParam.put("aplcntFormIdx", aplcntFormIdx);
	
	var postData = getParam.toJSONString();
	
	console.log(postData);
	
	var cbf = function(rs, elementId) {
		
		var colgroup = document.createElement("colgroup");
		var tr = document.createElement("tr");
		var colWidth = ["20px","50px","120px","50px","*","60px"];
		var header = ["가족사항","관계","성명","연령","근무처","동거여부"];
		
		for(var i=0 in header) {
			var col = document.createElement("col");
			col.setAttribute("width", colWidth[i]);
			colgroup.appendChild(col);
			
			var th = document.createElement("th");
			th.appendChild(document.createTextNode(header[i]));
			if (i == 0) th.setAttribute("rowspan", "6"); 
			tr.appendChild(th);
		}
		document.getElementById(elementId).appendChild(colgroup);
		document.getElementById(elementId).appendChild(tr);
		
		if(rs.length>0) {
			for(var i in rs) {
				console.log("i:"+i);
				var tr = document.createElement("tr");
				
				for(var j=0;j<5;j++) {
					var td = document.createElement("td");
					tr.appendChild(td);
				}
								
				tr.childNodes.item(0).appendChild(document.createTextNode(rs[i].famRelations));
				tr.childNodes.item(1).appendChild(document.createTextNode(rs[i].famName));
				tr.childNodes.item(2).appendChild(document.createTextNode(rs[i].famAge));
				tr.childNodes.item(3).appendChild(document.createTextNode(rs[i].famJob));
				tr.childNodes.item(4).appendChild(document.createTextNode(rs[i].famTogetherSttsCd));
				
				document.getElementById(elementId).appendChild(tr);
			}
		}
		/* 경력이 4개 미만일 경우 빈 행을 채우도록 한다. */
		if(rs.length<5) {
			for(var i=0;i<(5-rs.length);i++) {
				tr = document.createElement("tr");
				for(var j=0;j<5;j++) {
					var td = document.createElement("td");
					td.appendChild(document.createTextNode("-"));
					tr.appendChild(td);
				}
				document.getElementById(elementId).appendChild(tr);
			}
		}
	}
	crudAction(DB_CRUD, postData, cbf, "tbdFamList");
}

function setReadonly(pTag) {
	$(pTag).attr("readonly", true);
}

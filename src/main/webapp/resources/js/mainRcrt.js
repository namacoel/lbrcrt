/**************************************************
 * source		: mainRcrt.js
 * description	: 통계.지원자 현황
 * ************************************************
 * Date			Author			Description
 * ************************************************
 * 2016.11.11	김상우			최초 작성
 * 2017.09.05	김상우			리팩토링
 * ************************************************/

/**************************************************
 * 화면 초기화를 위한 객체 설정
 **************************************************/
var _pObj = {
	bizareaMap : new nMap(),	// 부서코드북 보관
	initDropDown:function() {
		var bizareaList = __appCmm.getBizareaCodeBook();
		for(var i in bizareaList) {
			this.bizareaMap.put(bizareaList[i].code, bizareaList[i].codeNm);
		}
	}
}
/**************************************************
 * 페이징 로딩 전 설정
 **************************************************/
$(document).ready(function() {
	_pObj.initDropDown();
	
	$("#srchDate").val(__toDateFormat(__getDate().left(8),"-"));
	$("#srchDate").trigger("change");
});

/**************************************************
 * 이벤트 핸들러
 **************************************************/
/** 조회날짜 change 이벤트 */
$(document).on("change", " #srchDate", function() {
	selectList1();
	selectList2();
	selectList3();
});
/** 전날/다음날 click 이벤트 */
$(document).on("click", "#div_btnDay > button", function() {
	var elementId = $(this).attr("id");
	
	submitCheck();
	var srchDate = new Date($("#srchDate").val());
	
	switch (elementId) {
	case "btnPrevDay":	// 전날 클릭
		srchDate.setDate(srchDate.getDate()-7);
		break;
	case "btnNextDay":	// 다음날 클릭
		srchDate.setDate(srchDate.getDate()+7); 
		break;
	default:
		break;
	}
	$("#srchDate").val(__toDateFormat(__getDate(srchDate).left(8),"-"));
	$("#srchDate").trigger("change");
});

$(document).on("mouseover", "#tblStatItvwWeeklyReport tr td", function() {
	var idx = $(this).index();
	var trIdx = $(this).parent().last().index();
	
	if(trIdx!=4 && idx>0 && idx<16 && $(this).text()>0) {
		$(this).css("background-color", "#d2d6de");
		$(this).css("cursor","pointer");	
	}
});

$(document).on("mouseout", "#tblStatItvwWeeklyReport tr td", function() {
	var idx = $(this).index();
	var trIdx = $(this).parent().last().index();
	
	if(trIdx!=4 && idx>0 && idx<16 && $(this).text()>0) {
		$(this).css("background-color", "#fff");
		$(this).css("cursor","auto");
	}
});

$(document).on("mouseover", "#tblStatRcrtReport tr td", function() {
	var idx = $(this).index();
	if(idx > 3 && idx <8 && $(this).text()>0) {
		$(this).css("background-color", "#d2d6de");
		$(this).css("cursor","pointer");	
	}
});

$(document).on("mouseout", "#tblStatRcrtReport tr td", function() {
	var idx = $(this).index();
	if(idx > 3 && idx <8 && $(this).text()>0) {
		$(this).css("background-color", "#fff");
		$(this).css("cursor","auto");
	}
});

/** 면접 주간 현황 컬럼 클릭 */
$(document).on("click", "#tblStatItvwWeeklyReport tr td", function() {
	var idx = $(this).index();
	var trIdx = $(this).parent().last().index();
	
	if(trIdx== 4 || idx<=0 || idx>=16 || $(this).text()<=0) return;
	
	var idxName = $("#tblStatItvwWeeklyReport tr:eq(1) th:eq("+(idx-1)+")").text();
	var resultTitle = "&resultTitle=" + $(this).parent().children("th:eq(0)").text() + " 면접" + idxName;
	var flag = "";
	var cdCompany = "&cdCompany=" + $(this).parent().attr("data-cdcompany");
	var cdBizarea = "&cdBizarea=" + $(this).parent().attr("data-cdbizarea");
	var itvwDate = "&itvwDate=" + $("#tblStatItvwWeeklyReport tr:eq(0) th:eq("+ Math.ceil(idx/3)+")").attr("data-itvwdate"); 
	
	switch (idxName) {
	case "대상": // 면접대상
		flag = "ITVW_WATING";
		break;
	case "참석": // 면접참석
		flag = "ITVW_ATTD";
		break;
	case "합격": // 합격자
		flag = "PICKED";
		break;
	default:
		return;
	}
	console.log("idxName : " + idxName + " / " + "flag : " + flag);
	window.open("employment/statRcrtStatusPop?flag="+flag+cdCompany+cdBizarea+itvwDate+resultTitle
			, "statRcrtStatusPop", "left=0, top=50, width=1880, height=650");
});
/** 채용진행현황 지원자~면접합격자 컬럼 클릭 */
$(document).on("click", "#tblStatRcrtReport tr td", function() {
	if($(this).text()<1) return;
	var idx = $(this).index();
	var resultTitle = "&resultTitle=" + $(this).parent().children("th:eq(0)").text()
			+ " " + $(this).parent().children("th:eq(1)").text()
			+ " " + $("#tblStatRcrtReport th:eq("+idx+")").text();
	var flag = "";
	var cdCompany = "&cdCompany=" + $(this).parent().attr("data-cdcompany");
	var cdBizarea = "&cdBizarea=" + $(this).parent().attr("data-cdbizarea");
	var cdDept = "&cdDept=" + $(this).parent().attr("data-cddept");
	var deptClass = "&deptClass=" + $(this).parent().attr("data-deptclass");
	
	switch (idx) {
	case 4: // 지원자
		flag = "APLCNT";
		break;
	case 5: // 면접대상
		flag = "ITVW_WATING";
		break;
	case 6: // 면접참석
		flag = "ITVW_ATTD";
		break;
	case 7: // 합격자
		flag = "PICKED";
		break;
	default:
		return;
	}
	window.open("employment/statRcrtStatusPop?flag="+flag+cdCompany+cdBizarea+cdDept+deptClass+resultTitle
			, "statRcrtStatusPop", "left=0, top=50, width=1880, height=650");
});
/**************************************************
 * 일반 함수 정의
 **************************************************/
/** 연속 클릭 딜레이 주는 함수 */
function submitCheck() {
	$("#btnPrevDay, #btnNextDay").attr("disabled", true);
	setTimeout(function(){
		$("#btnPrevDay, #btnNextDay").attr("disabled", false);
	}, 1500);
}
/**************************************************
 * CRUD 함수 정의
 **************************************************/
/** 리스트 조회 : 센터별 인원 운영 현황 */
function selectList1() {
	var srchDate = $("#srchDate").numVal().left(6);
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "employmentStatMapper");
	postData.put("DB_REQID", "selectStatEmployeeMonthReport");
	
	postData.put("srchDate", srchDate);
	
	var cbf = function(rs, elementId) {
		var node = document.getElementById(elementId);
		var thead = document.createElement("thead");
		var theadTr1 = document.createElement("tr");
		var theadTr2 = document.createElement("tr");
		var tbody = document.createElement("tbody");
		
		var today = __getDate().left(8);
		
		if(!node) return;
		while(node.hasChildNodes()) { // node가 가진 자식 노드가 있으면 
			node.removeChild(node.lastChild); // 마지막 자식노드를 삭제
		}
		
		if(rs.length>0) {
			var arrUniqCdBizarea = ["1000", "3000", "5000", "8000"];
			
			var th_a1 = document.createElement("th");
			var th_a2 = document.createElement("th");
			
			th_a1.innerHTML = "구분";
			th_a1.setAttribute("rowspan", "2");
			
			th_a2.innerHTML =srchDate.left(4)+"년 "+srchDate.substr(4,2)+"월 운영 현황";
			th_a2.setAttribute("colspan", "7");
			
			theadTr1.appendChild(th_a1);
			theadTr1.appendChild(th_a2);
			
			var thItem = ["TO","재직인원","이직","GAP","투입대기","운영비율","확보율"];
			for(var j=0 in thItem) {
				var th = document.createElement("th");
				th.innerHTML = thItem[j];
				theadTr2.appendChild(th);
			}
			
			thead.appendChild(theadTr1);
			thead.appendChild(theadTr2);
			node.appendChild(thead);
			
			for(var i in arrUniqCdBizarea) {
				var tbodyTr = document.createElement("tr");
				var th = document.createElement("th");
				
				th.innerHTML = _pObj.bizareaMap.get(arrUniqCdBizarea[i]);;
				tbodyTr.appendChild(th);
				
				for(var j=0; j<theadTr2.childElementCount;j++) {
					var td = document.createElement("td");
					tbodyTr.appendChild(td);
				}
				
				for(var j in rs) {
					if(arrUniqCdBizarea[i] == rs[j].cdBizarea) {
						tbodyTr.childNodes.item(1).appendChild(document.createTextNode(rs[j].monthToCnt));
						tbodyTr.childNodes.item(2).appendChild(document.createTextNode(rs[j].endEmployeeCnt));
						tbodyTr.childNodes.item(3).appendChild(document.createTextNode(rs[j].changeCnt));
						tbodyTr.childNodes.item(4).appendChild(document.createTextNode(rs[j].gap));
						tbodyTr.childNodes.item(5).appendChild(document.createTextNode(rs[j].endTraineeCnt));
						tbodyTr.childNodes.item(6).appendChild(document.createTextNode(rs[j].ratio1));
						tbodyTr.childNodes.item(7).appendChild(document.createTextNode(rs[j].ratio2));
					}
				}
				tbody.appendChild(tbodyTr);
			}
			node.appendChild(tbody);
		}
	};
	__serviceCall(CMM_ACTION, postData, true, cbf, "", "tblStatEmployeeMonthReport");
}

/** 리스트 조회 : 면접 주간 현황 */
function selectList2() {
	var srchDate = $("#srchDate").numVal();
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "employmentStatMapper");
	postData.put("DB_REQID", "selectStatItvwWeeklyReport");
	
	postData.put("srchDate", srchDate);
	
	var cbf = function(rs, elementId) {
		var node = document.getElementById(elementId);
		var thead = document.createElement("thead");
		var theadTr1 = document.createElement("tr");
		var theadTr2 = document.createElement("tr");
		var tbody = document.createElement("tbody");
		var today = __getDate().left(8);
		
		if(!node) return;
		while(node.hasChildNodes()) { // node가 가진 자식 노드가 있으면 
			node.removeChild(node.lastChild); // 마지막 자식노드를 삭제
		}
		
		if(rs.length>0) {
			var arrItvwDate = [];
//			var arrCdCompany = new Array;
//			var arrCdBizarea = new Array;
			
			// 해당 데이터의 날짜 정보를 중복없이 가져오기 위해서 사용함.
			// 날짜를 가져오기 위해서 날짜만 가져오는 쿼리문을 사용할 수도 있고,
			// JS단에서 처리할 수 도 있지만, 데이터 일관성을 위해서 이렇게 해둠.
			for(var i in rs) {
				var tempItvwDate = rs[i].srchDate;
//				var tempCdCompany = rs[i].cdCompany;
//				var tempCdBizarea = rs[i].cdBizarea;
				
				if(!isNull(tempItvwDate)) arrItvwDate.push(tempItvwDate);
//				if(!isNull(tempCdCompany)) arrCdCompany.push(tempCdCompany);
//				if(!isNull(tempCdBizarea)) arrCdBizarea.push(tempCdBizarea);
			}
			
			var arrUniqItvwDate = arrItvwDate.slice().sort(function(a,b){return a - b}).reduce(function(a,b){if (a.slice(-1)[0] !== b) a.push(b);return a;},[]);
//			var arrUniqCdCompany = arrCdCompany.slice().sort(function(a,b){return a - b}).reduce(function(a,b){if (a.slice(-1)[0] !== b) a.push(b);return a;},[]);
//			var arrUniqCdBizarea = arrCdBizarea.slice().sort(function(a,b){return a - b}).reduce(function(a,b){if (a.slice(-1)[0] !== b) a.push(b);return a;},[]);
			var arrUniqCdBizarea = ["1000", "3000", "5000", "8000"];
			
			var th_a1 = document.createElement("th");
			th_a1.innerHTML = "구분";
			th_a1.setAttribute("rowspan", "2");
			theadTr1.appendChild(th_a1);
			arrUniqItvwDate.push("센터 합계");
			arrUniqCdBizarea.push("일 합계");
			
			for(var i=0 in arrUniqItvwDate) {
				// DB에서 요일 정보를 가져오기가 난해해서 JS에서 처리해준다.
				var arrDayWeek = ['일', '월', '화', '수', '목', '금', '토'];
				var idx = new Date(__toDateFormat(arrUniqItvwDate[i], "-")).getDay();
				var th = document.createElement("th");
				
				th.setAttribute("colspan", "3");
				th.setAttribute("data-itvwdate", arrUniqItvwDate[i]);

				if(idx==0) {
					th.setAttribute("class", "th-color-holiday");
				} else if(idx==6) {
					th.setAttribute("class", "th-color-saturday");
				}
				
				if(arrUniqItvwDate[i] == today) th.setAttribute("class", "th-bgcolor-today");
				
				if(arrUniqItvwDate[i] == "센터 합계") {
					th.innerHTML = arrUniqItvwDate[i];
					th.setAttribute("class", "color-sum");
				} else {
					th.innerHTML = __toDateFormat(arrUniqItvwDate[i], "/").right(5)+" ("+arrDayWeek[idx]+")";
				}
				theadTr1.appendChild(th);
			}
			
			for(var i=0 in arrUniqItvwDate) {
				var thItem = ["대상","참석","합격"];
				for(var j=0 in thItem) {
					var th = document.createElement("th");
					th.innerHTML = thItem[j];
					if(arrUniqItvwDate[i] == today) {
						th.setAttribute("class", "th-bgcolor-today");
					} else if (arrUniqItvwDate[i] == "센터 합계") {
						th.setAttribute("class", "color-sum");
					}
					theadTr2.appendChild(th);
				}
			}
			thead.appendChild(theadTr1);
			thead.appendChild(theadTr2);
			node.appendChild(thead);
			
			var arrSumDay = new Array(5);
			for(var x=0;x<5;x++) {
				arrSumDay[x] = new Array(3);
				for(var y=0;y<3;y++) {
					arrSumDay[x][y] = 0;
				}
			}
			
			for(var i in arrUniqCdBizarea) {
				var tbodyTr = document.createElement("tr");
				var th = document.createElement("th");
				
				var sumItvwWatingCnt = 0;
				var sumItvwAttdCnt = 0;
				var sumPickedCnt = 0;
				
				if(arrUniqCdBizarea[i] == "일 합계") {
					th.innerHTML = arrUniqCdBizarea[i];
					th.setAttribute("class", "color-sum");
				} else {
					th.innerHTML = _pObj.bizareaMap.get(arrUniqCdBizarea[i]);;
					th.setAttribute("class", "th-align-left");
				}
				tbodyTr.appendChild(th);
				
				for(var j=0; j<theadTr2.childElementCount;j++) {
					var td = document.createElement("td");
					if(arrUniqCdBizarea[i] == "일 합계") td.setAttribute("class", "color-sum");
					tbodyTr.appendChild(td);
				}
				
				for(var j in rs) {
					if(arrUniqCdBizarea[i] == rs[j].cdBizarea) {
						if(isNull(tbodyTr.getAttribute("data-cdcompany"))) tbodyTr.setAttribute("data-cdcompany", rs[j].cdCompany);
						if(isNull(tbodyTr.getAttribute("data-cdbizarea"))) tbodyTr.setAttribute("data-cdbizarea", rs[j].cdBizarea);
						
						if (rs[j].srchDate == arrUniqItvwDate[0]) {
							tbodyTr.childNodes.item(1).appendChild(document.createTextNode(rs[j].itvwWatingCnt));
							tbodyTr.childNodes.item(2).appendChild(document.createTextNode(rs[j].itvwAttdCnt));
							tbodyTr.childNodes.item(3).appendChild(document.createTextNode(rs[j].pickedCnt));
							arrSumDay[0][0] += Number(rs[j].itvwWatingCnt);
							arrSumDay[0][1] += Number(rs[j].itvwAttdCnt);
							arrSumDay[0][2] += Number(rs[j].pickedCnt);
						} else if (rs[j].srchDate == arrUniqItvwDate[1]) {
							tbodyTr.childNodes.item(4).appendChild(document.createTextNode(rs[j].itvwWatingCnt));
							tbodyTr.childNodes.item(5).appendChild(document.createTextNode(rs[j].itvwAttdCnt));
							tbodyTr.childNodes.item(6).appendChild(document.createTextNode(rs[j].pickedCnt));
							arrSumDay[1][0] += Number(rs[j].itvwWatingCnt);
							arrSumDay[1][1] += Number(rs[j].itvwAttdCnt);
							arrSumDay[1][2] += Number(rs[j].pickedCnt);
						} else if (rs[j].srchDate == arrUniqItvwDate[2]) {
							tbodyTr.childNodes.item(7).appendChild(document.createTextNode(rs[j].itvwWatingCnt));
							tbodyTr.childNodes.item(8).appendChild(document.createTextNode(rs[j].itvwAttdCnt));
							tbodyTr.childNodes.item(9).appendChild(document.createTextNode(rs[j].pickedCnt));
							arrSumDay[2][0] += Number(rs[j].itvwWatingCnt);
							arrSumDay[2][1] += Number(rs[j].itvwAttdCnt);
							arrSumDay[2][2] += Number(rs[j].pickedCnt);
						} else if (rs[j].srchDate == arrUniqItvwDate[3]) {
							tbodyTr.childNodes.item(10).appendChild(document.createTextNode(rs[j].itvwWatingCnt));
							tbodyTr.childNodes.item(11).appendChild(document.createTextNode(rs[j].itvwAttdCnt));
							tbodyTr.childNodes.item(12).appendChild(document.createTextNode(rs[j].pickedCnt));
							arrSumDay[3][0] += Number(rs[j].itvwWatingCnt);
							arrSumDay[3][1] += Number(rs[j].itvwAttdCnt);
							arrSumDay[3][2] += Number(rs[j].pickedCnt);
						} else if (rs[j].srchDate == arrUniqItvwDate[4]) {
							tbodyTr.childNodes.item(13).appendChild(document.createTextNode(rs[j].itvwWatingCnt));
							tbodyTr.childNodes.item(14).appendChild(document.createTextNode(rs[j].itvwAttdCnt));
							tbodyTr.childNodes.item(15).appendChild(document.createTextNode(rs[j].pickedCnt));
							arrSumDay[4][0] += Number(rs[j].itvwWatingCnt);
							arrSumDay[4][1] += Number(rs[j].itvwAttdCnt);
							arrSumDay[4][2] += Number(rs[j].pickedCnt);
						}
						sumItvwWatingCnt += Number(rs[j].itvwWatingCnt);
						sumItvwAttdCnt += Number(rs[j].itvwAttdCnt);
						sumPickedCnt += Number(rs[j].pickedCnt);
					}
				}
				tbodyTr.childNodes.item(16).appendChild(document.createTextNode(nullToEmpty(Number(sumItvwWatingCnt))));
				tbodyTr.childNodes.item(16).setAttribute("class", "color-sum");
				tbodyTr.childNodes.item(17).appendChild(document.createTextNode(nullToEmpty(Number(sumItvwAttdCnt))));
				tbodyTr.childNodes.item(17).setAttribute("class", "color-sum");
				tbodyTr.childNodes.item(18).appendChild(document.createTextNode(nullToEmpty(Number(sumPickedCnt))));
				tbodyTr.childNodes.item(18).setAttribute("class", "color-sum");
				
				if(arrUniqCdBizarea[i] == "일 합계") {
					var z=0;
					for(var x=0;x<5;x++) {
						for(var y=0;y<3;y++) {
							tbodyTr.childNodes.item(++z).appendChild(document.createTextNode(nullToEmpty(Number(arrSumDay[x][y]))));
						}
					}
					tbodyTr.childNodes.item(16).setAttribute("colspan", "3");
					tbodyTr.removeChild(tbodyTr.lastChild); // 마지막 자식노드를 삭제
					tbodyTr.removeChild(tbodyTr.lastChild); // 마지막 자식노드를 삭제
				}
				tbody.appendChild(tbodyTr);
			}
			node.appendChild(tbody);
		}
	};
	__serviceCall(CMM_ACTION, postData, true, cbf, "", "tblStatItvwWeeklyReport");
	
}
/** 리스트 조회 : 채용 진행 현황 */
function selectList3() {
	var srchDate = $("#srchDate").numVal();
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "employmentStatMapper");
	postData.put("DB_REQID", "selectStatRcrtReport");
	
	postData.put("srchDate", srchDate);
	
	var cbf = function(rs, elementId) {
		var colWidth = ["100","100","50","50","50","50","50","50","70","120"];
		var header = ["사업장", "부서", "교육시작일", "요청인원", "지원자", "면접대상", "면접참석", "면접합격","진행상태","채용기간"];
		var thead = document.createElement("thead");
		var tbody = document.createElement("tbody");
		var theadTr = document.createElement("tr");
		var node = document.getElementById(elementId);
		
		if(!node) return;
		
		while(node.hasChildNodes()) { // node가 가진 자식 노드가 있으면 
			node.removeChild(node.lastChild); // 마지막 자식노드를 삭제
		}
		
		$("#totalCount").html(" ("+rs.length+"건)");
		
		for(var i=0 in header) {
			var th = document.createElement("th");
			th.innerHTML = header[i];
			th.setAttribute("style", "width: " + colWidth[i] + "px;");
			theadTr.appendChild(th);
		}
		thead.appendChild(theadTr);
		node.appendChild(thead);
		
		if(rs.length>0) {
			for(var i in rs) {
				var tbodyTr = document.createElement("tr");
				tbodyTr.setAttribute("data-cdcompany", rs[i].cdCompany);
				tbodyTr.setAttribute("data-cdbizarea", rs[i].cdBizarea);
				tbodyTr.setAttribute("data-cddept", rs[i].cdDept);
				tbodyTr.setAttribute("data-deptclass", rs[i].deptClass);
				for(var j=0;j<2;j++) {
					var th = document.createElement("th");
					tbodyTr.appendChild(th);
				}
				for(var j=0;j<header.length-2;j++) {
					var td = document.createElement("td");
					tbodyTr.appendChild(td);
				}
				tbodyTr.childNodes.item(0).appendChild(document.createTextNode(rs[i].nmBizarea));
				tbodyTr.childNodes.item(0).setAttribute("title", rs[i].nmBizarea);
				tbodyTr.childNodes.item(0).setAttribute("class", "td-ellipsis");
				tbodyTr.childNodes.item(0).setAttribute("style", "text-align:left;");
				tbodyTr.childNodes.item(1).appendChild(document.createTextNode(rs[i].nmDept+"\u00A0\u00A0\u00A0"+__textPaste(rs[i].deptClass, "기")));
				tbodyTr.childNodes.item(1).setAttribute("title", rs[i].nmDept);
				tbodyTr.childNodes.item(1).setAttribute("class", "td-ellipsis");
				tbodyTr.childNodes.item(1).setAttribute("style", "text-align:left;font-weight:normal;");
				tbodyTr.childNodes.item(2).appendChild(document.createTextNode(__toDateFormat(rs[i].eduSdate)));
				tbodyTr.childNodes.item(3).appendChild(document.createTextNode(rs[i].requestPeopleCnt));
				tbodyTr.childNodes.item(3).setAttribute("style", "font-weight:bold;");
				tbodyTr.childNodes.item(4).appendChild(document.createTextNode(rs[i].aplcntCnt));
				tbodyTr.childNodes.item(5).appendChild(document.createTextNode(rs[i].itvwWatingCnt));
				tbodyTr.childNodes.item(6).appendChild(document.createTextNode(rs[i].itvwAttdCnt));
				tbodyTr.childNodes.item(7).appendChild(document.createTextNode(rs[i].pickedCnt));
				var itemRcProgCd = document.createElement("span");
				if(rs[i].rcProgCd == "1") { // 완료
					itemRcProgCd.classList.add("label", "label-success");
				} else if(rs[i].rcProgCd == "2") { // 채용중
					itemRcProgCd.classList.add("label", "label-danger");
				} else if(rs[i].rcProgCd == "3") { // 취소
					itemRcProgCd.classList.add("label", "label-default");
				}
				itemRcProgCd.appendChild(document.createTextNode(rs[i].rcProgNm));
				tbodyTr.childNodes.item(8).appendChild(itemRcProgCd);
				tbodyTr.childNodes.item(9).appendChild(document.createTextNode(__toDateFormat(rs[i].rcSdate)+" ~ "+__toDateFormat(rs[i].rcEdate)));
				
				tbody.appendChild(tbodyTr);
			}
			node.appendChild(tbody);
		}
		$("#tblStatRcrtReport").span("row","th",0);
	};
	__serviceCall(CMM_ACTION, postData, true, cbf, "BLOCK", "tblStatRcrtReport");
}

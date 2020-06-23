/**************************************************
 * Source		: home.js
 * Description	: 홈 화면
 * ************************************************
 * Date			Author		Description
 * ************************************************
 * 2016.03.29	ksw			최초 작성
 * 2017.09.05	ksw			리팩토링
 * ************************************************/

/**************************************************
 * 전역 변수 선언
 **************************************************/
/* treeview용 공통 변수 */
var cmmDsBiz = null; // Bizarea(사업장) 조회결과 데이터셋
var cmmDsDept = null; // Bizarea(사업장) 조회결과 데이터셋
var cmmTreeLevels = 1; // 트리의 expand 기능을 단계적으로 사용하기 위해 추가함

/**************************************************
 * 페이징 로딩 전 설정
 **************************************************/
$(document).ready(function() {
	getNavPrgmList();	// 사용자에게 할당된 메뉴 불러오기(사용자ID는 서버단에서 조회하도록 한다.)
	selectBizareaTree(); // treeview용 사업장 및 부서 정보 조회;
	$("#mainPage").trigger("click");
});

/****************************************
 * 이벤트 핸들러
 ****************************************/
$(document).on("click", " li[name=liNavList]", function(){
	
//	var option = "width=" + $(this).attr("vwidth") + ", height=" + $(this).attr("vheight");
//	var path = context_path + "/jsp/" + $(this).attr("vpath") + "/" +  $(this).attr("vname");
	var uri = $(this).attr("vuri");
	console.log(uri);
	
	// TODO 스타일 적용하기 : 두께 동적 길이
	$("#ifrmLoadPage").attr("src", uri);
});
// 2016.10.20.namacoel 임시로 작성
$(document).on("click", "#temp", function(){
	
	var uri = $(this).attr("vuri");
	console.log(uri);
	
	// TODO 스타일 적용하기 : 두께 동적 길이
	$("#ifrmLoadPage").attr("src", uri);
});

/**************************************************
 * CRUD 처리 함수
 **************************************************/
/** 사용자에게 할당된 메뉴 불러온다. */
function getNavPrgmList() {
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "memberMapper");
	postData.put("DB_REQID", "getNavPrgmList");
	
	var cbf = function(rs, elementId) {

		//  FIXME: 차후 동적 객체 생성을이용해서 하자
		if (rs.length > 0) {
			for(var i=0;i<rs.length;i++) {
				var html = "";
				
				/* 상위 메뉴 세팅 */
				if(rs[i].level == 1) {
					html = "<li class='treeview'><a href='#'><i class='fa " + rs[i].prgmIcon + "'></i><span>" + rs[i].prgmNm + "</span><i class='fa fa-angle-left pull-right'></i></a>";
					html += "<ul class='treeview-menu'>";
					/* 하위 메뉴 세팅 */
					for(var j=0;j<rs.length;j++) {
						if ((rs[i].prgmId == rs[j].upperPrgmId) && (rs[j].level != 1)) {
							html += "<li name='liNavList' vuri='" + rs[j].prgmUri + "'><a href='#'><i class='fa fa-circle-o'></i> " + rs[j].prgmNm + "</li>"
						}
					}
					html += "</ul>";
					html += "</li>";
					$(elementId).append(html);
				}
			}
		}
	}
	__serviceCall(CMM_ACTION, postData, true, cbf, "", "#ulNavSideGrp");
};

/** 로그아웃 함수 */
function logout() {
	document.getElementById("logout").submit(); 
}

/**************************************************
 *  treeview - 사업장 부서 정보 세팅
 **************************************************/
/** 부서 정보 조회 */
function selectBizareaTree() {
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "commonMapper"); // DB 네임스페이스
	postData.put("DB_REQID", "selectBizareaTree"); // DB 요청 ID
	
	var cbf = function (rs, elementId) {
		cmmDsBiz = JSON.parse(JSON.stringify(rs));
		selectDeptTree();
	};
	__serviceCall(CMM_ACTION, postData, true, cbf);
}
/** 부서 정보 조회 */
function selectDeptTree() {
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "commonMapper"); // DB 네임스페이스
	postData.put("DB_REQID", "selectDeptTree"); // DB 요청 ID
	postData.put("srchDtEnd", __getDate().left(8)); // 프로젝트 종료일 확인하는 용도
	
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
		cmmDsDept = arrTop;
	};
	__serviceCall(CMM_ACTION, postData, true, cbf);
}

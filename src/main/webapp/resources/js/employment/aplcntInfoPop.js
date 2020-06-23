/**************************************************
 * source		: aplcntInfoPop.js
 * description	: 지원자 정보 팝업
 * ************************************************
 * date			author			description
 * ************************************************
 * 2016.09.29	ksw				최초 작성
 * 2017.10.23	ksw				리팩토링
 **************************************************/

/**************************************************
 *  전역 변수 선언
 **************************************************/
var gAplcntIdx = "" // 부모창에서 받은 지원자의 인덱스
var gRs = null;

/**************************************************
 * 페이징 로딩 전 설정
 **************************************************/
$(document).ready(function() {
	setElementProperty();
	gAplcntIdx = $("#gAplcntIdx").val();
	selectAplcntForm();
});
/**************************************************
 * 이벤트 핸들러
 **************************************************/
$(document).on("click", "#btnCopy", function(){
	
	if(!checkAplcntInfo()) return alert("중복자 정보가 일치하지 않습니다.");
	
	if(!__confirmMsg("COPY_INFO")) return;
	
	opener.$("#addrDo").val(gRs.addrDoCd);
	opener.$("#addrDo").trigger("change");
	opener.$("#addrSi").val(gRs.addrSiCd);
	opener.$("#addrSi").trigger("change");
	opener.$("#addrGu").val(gRs.addrGuCd);
	opener.$("#contactInfo").val(gRs.contactInfo);
	opener.$("#email").val(gRs.email);
	
	opener.$("#maritalStts").val(gRs.maritalSttsCd);
	opener.$("#highestEdu").val(gRs.highestEduCd);
	opener.$("#major").val(gRs.major);
	opener.$("#careerStts").val(gRs.careerSttsCd);
	opener.$("#company1").val(gRs.company1);
	opener.$("#companyPeriod1").val(gRs.companyPeriod1);
	opener.$("#assignedTask1").val(gRs.assignedTask1);
	opener.$("#company2").val(gRs.company2);
	opener.$("#companyPeriod2").val(gRs.companyPeriod2);
	opener.$("#assignedTask2").val(gRs.assignedTask2);
	opener.$("#blacklist").val(gRs.blacklistCd);
});
/**************************************************
 * Local Function
 **************************************************/
/** 엘리먼트 속성(유효성) 세팅 */
function setElementProperty() {
	$("#btnCopy").attr("disabled", true);
	if(opener && opener.location.pathname == "/employment/aplcntForm") {
		$("#btnCopy").attr("disabled", false);
//		opener.window.location.reload(false);
	}
}
// 부모창의 이름, 생년, 성별 이 일치하는지 확인하는 함수
function checkAplcntInfo() {
	debugger;
	if(gRs.aplcntNm != opener.$("#aplcntNm").val()) return false;
	if(gRs.birthday.left(4) != opener.$("#birthday").numVal().left(4)) return false;
	if(gRs.aplcntSexCd != opener.$("#aplcntSex").val()) return false;

	return true;
}

/**************************************************
 * CRUD 함수 정의
 **************************************************/
/** 지원자 정보 select 함수 */
function selectAplcntForm() {
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "aplcntFormMapper");
	postData.put("DB_REQID", "selectAplcntFormView");
	
	postData.put("aplcntIdx", gAplcntIdx);
	
	var cbf = function(rs, elementId) {

		var space = "\u00A0 \u00A0"
		if(rs.length>0) {
			rs = rs[0];
			gRs = rs;
			
			$("#aplcntIdx").text(rs.aplcntIdx);
			$("#receiptDate").text(__toDateFormat(rs.receiptDate));
			$("#aplcntBizarea").text(rs.aplcntBizarea
					+space+"/"+space+rs.aplcntDept
					+space+"/"+space+rs.aplcntClass+"기");
			$("#emplyNum").text(rs.emplyNum);
			$("#aplcntNm").text(rs.aplcntNm
					+space+"("+rs.aplcntSex+")");
			$("#birthday").text(__toDateFormat(rs.birthday));
			var addr = "";
			if(rs.addrDo != "없음") addr+=rs.addrDo;
			if(rs.addrSi != "없음") addr+=" "+rs.addrSi;
			if(rs.addrGu != "없음") addr+=" "+rs.addrGu;
			$("#addr").text(addr);
			$("#contactInfo").text(__toPhoneFormat(rs.contactInfo)
					+space+"/"+space+rs.email);
			$("#maritalStts").text(rs.maritalStts);
			$("#highestEdu").text(rs.highestEdu
					+space+"/"+space+rs.major);
			$("#careerStts").text(rs.careerStts);
			$("#company1").text(rs.company1);
			$("#companyPeriod1").text(rs.companyPeriod1);
			$("#assignedTask1").text(rs.assignedTask1);
			$("#company2").text(rs.company2);
			$("#companyPeriod2").text(rs.companyPeriod2);
			$("#assignedTask2").text(rs.assignedTask2);
			$("#blacklist").text(rs.blacklist);
			$("#recruitSite1").text(rs.recruitSite1
					+space+"/"+space+rs.recruitSite2
					+space+"/"+space+rs.recommender);
			$("#docItvw").text(rs.docItvw);
			$("#docItvw").attr("title", rs.docItvw);
			$("#phoneItvw").text(rs.phoneItvw);
			$("#phoneItvw").attr("title", rs.phoneItvw);
			$("#phoneItvwResult").text(rs.phoneItvwResult);
			$("#ptopItvw").text(rs.ptopItvw);
			$("#ptopItvw").attr("title", rs.ptopItvw);
			$("#itvwDate").text(__toDateFormat(rs.itvwDate)
					+space+__toTimeFormat(rs.itvwTime)
					+space+"/"+space+rs.interviewer);
			$("#itvwAttd").text(rs.itvwAttd
					+space+"/"+space+rs.itvwResult);
			$("#eduAttdIttnStts").text(rs.eduAttdIttnStts
					+space+"/"+space+rs.eduAttdStts);
			$("#eduDate").text(__toDateFormat(rs.eduDate)
					+space+"/"+space+__toDateFormat(rs.jobDay));
			$("#putDay").text(__toDateFormat(rs.putDay)
					+space+"/"+space+__toDateFormat(rs.quitDay));
			$("#upiddt").text(__jsonDateToStr(rs.updt, "DISP")
					+space+"("+rs.upid+")");
		}
	}
	__serviceCall(CMM_ACTION, postData, true, cbf, "BLOCK");
}

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String job = request.getParameter("job");
	String aplcntIdx = request.getParameter("aplcntIdx");
%>
<!DOCTYPE html>
<html>
<head>
<!-- 공통 라이브러리 설정 -->
<%@include file="/WEB-INF/views/include/import.jsp"%>
<%@include file="/WEB-INF/views/include/importBootstrap.jsp"%>
<!-- DataTables -->
<!-- <link rel="stylesheet" href="/resources/plugins/datatables/jquery.dataTables.min.css"> -->
<!-- <script src="/resources/plugins/datatables/jquery.dataTables.min.js"></script> -->

<!-- <link rel="stylesheet" type="text/css" href="/resources/css/common/commonWithBs.css"> -->
<!-- <link rel="stylesheet" type="text/css" href="/resources/css/common/common.css"> -->
<!-- <link rel="stylesheet" type="text/css" href="/resources/css/common/custom1.css"> -->
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/employment/aplcntForm.js"></script>
<style>
table.table-common th { width: 110px !important;}
td.td-height1 {	height: 85px !important; }
#itvwTimeH, #itvwTimeM { width: 50px; }
</style>
<title>지원자 정보</title>
</head>

<body>
<input type="hidden" id="job" value="<%=job%>">
<input type="hidden" id="gAplcntIdx" value="<%=aplcntIdx%>">
<div class="wrapper">
	<div class="content-wrapper content-custom">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>지원자 입력 폼<small>지원자 정보를 등록하거나 수정합니다.</small></h1>
		</section>
		<section class="content">
			<div class="row">
				<div class="col-md-12">
					<div class="box box-primary">
						<!-- SEARCH : ST -->
						<div id="divDetail" class="box-body">
							<div class="col-md-4 div-padding-custom">
								<table class="table-common table-fill">
									<tr>
										<th>순번</th>
										<td><input type="number" id="aplcntIdx" class="dis"></td>
									</tr>
									<tr>
										<th>접수일</th>
										<td><input type="date" id="receiptDate"></td>
									</tr>
									<tr>
										<th>사업장</th>
										<td><select id="aplcntBizarea"></select></td>
									</tr>
									<tr>
										<th>지원부서</th>
										<td><select id="aplcntDept"></select></td>
									</tr>
									<tr>
										<th>기수</th>
										<td><input type="number" id="aplcntClass"></td>
									</tr>
									<tr>
										<th id="thDuptEmplyNum">사번</th>
										<td><input type="text" id="emplyNum"></td>
									</tr>
								</table>
								<div class="div-space-h5"></div>
								<table class="table-common table-fill">
									<tr>
										<th id="thDuptDisp">이름</th>
										<td><input type="text" id="aplcntNm"></td>
									</tr>
									<tr>
										<th>생년월일</th>
										<td>
<!-- 											<select class="dropdown-date-y" id="birthdayY"></select><select class="dropdown-date-m" id="birthdayM"></select><select class="dropdown-date-d" id="birthdayD"></select> -->
											<input type="text" id="birthday">
										</td>
									</tr>
									<tr>
										<th>성별</th>
										<td><select id="aplcntSex" required="required"></select></td>
									</tr>
									<tr>
										<th>주소(도)</th>
										<td><select id="addrDo"></select></td>
									</tr>
									<tr>
										<th>주소(시)</th>
										<!-- <td><input type="text" id="addrSi"></td> -->
										<td><select id="addrSi"></select></td>
									</tr>
									<tr>
										<th>주소(구)</th>
										<!-- <td><input type="text" id="addrGu"></td> -->
										<td><select id="addrGu"></select></td>
									</tr>
									<tr>
										<th>연락처</th>
										<td><input type="tel" class="input-phone" id="contactInfo"></td>
									</tr>
									<tr>
										<th>이메일</th>
										<td><input type="email" id="email"></td>
									</tr>
								</table>
								<div class="div-space-h5"></div>
								<table class="table-common table-fill">
									<tr>
										<th>결혼여부</th>
										<td><select id="maritalStts"></select></td>
									</tr>
									
									<tr>
										<th>최종학력</th>
										<td><select id="highestEdu"></select></td>
									</tr>
									<tr>
										<th>전공</th>
										<td><input type="text" id="major"></td>
									</tr>
									<tr>
										<th>경력여부</th>
										<td><select id="careerStts"></select></td>
									</tr>
									<tr>
										<th>회사명1</th>
										<td><input type="text" id="company1"></td>
									</tr>
									<tr>
										<th>근무기간1</th>
										<td><input type="text" id="companyPeriod1"></td>
									</tr>
									<tr>
										<th>담당업무1</th>
										<td><input type="text" id="assignedTask1"></td>
									</tr>
									<tr>
										<th>회사명2</th>
										<td><input type="text" id="company2"></td>
									</tr>
									<tr>
										<th>근무기간2</th>
										<td><input type="text" id="companyPeriod2"></td>
									</tr>
									<tr>
										<th>담당업무2</th>
										<td><input type="text" id="assignedTask2"></td>
									</tr>
								</table>
							</div>
							
							<div class="col-md-4 div-padding-custom">
								<table class="table-common table-fill">
									<tr>
										<th>블랙리스트</th>
										<td><select id="blacklist"></select></td>
									</tr>
									<tr>
										<th>채용경로1</th>
										<td><select id="recruitSite1"></select></td>
									</tr>
									<tr>
										<th>채용경로2</th>
										<td id="tdRecruitSite2"><select id="recruitSite2"></select></td>
									</tr>
									<tr>
										<th>추천인</th>
										<td><input type="text" id="recommender" class="dis"></td>
									</tr>
									<tr>
										<th>서류면접</th>
										<td class="td-height1"><textarea id="docItvw"></textarea></td>
									</tr>
									<tr>
										<th>전화면접</th>
										<td class="td-height1"><textarea id="phoneItvw"></textarea></td>
									</tr>
									<tr>
										<th>전화면접결과</th>
										<td><select id="phoneItvwResult"></select></td>
									</tr>
								</table>
								<div class="div-space-h5"></div>
								<table class="table-common table-fill">
									<tr>
										<th>대면면접</th>
										<td class="td-height1"><textarea id="ptopItvw"></textarea></td>
									</tr>
									<tr>
										<th>면접관</th>
										<td><input type="text" id="interviewer"></td>
									</tr>
									<tr>
										<th>면접일</th>
										<td><input type="date" id="itvwDate"></td>
									</tr>
									<tr>
										<th>면접시간</th>
										<td><select id="itvwTimeH"></select><select id="itvwTimeM"></select></td>
									</tr>
									<tr>
										<th>면접참석여부</th>
										<td><select id="itvwAttd"></select></td>
									</tr>
									<tr>
										<th>면접결과</th>
										<td><select id="itvwResult"></select></td>
									</tr>
								</table>
								<div class="div-space-h5"></div>
								<table class="table-common table-fill">
									<tr>
										<tr>
										<th>교육참석의사</th>
										<td><select id="eduAttdIttnStts"></select></td>
									</tr>
									<tr>
										<th>교육참석여부</th>
										<td><select id="eduAttdStts"></select></td>
									</tr>
									<tr>
										<th>교육일</th>
										<td><input type="date" id="eduDate" class="dis"></td>
									</tr>
									<tr>
										<th>입사일</th>
										<td><input type="date" id="jobDay"></td>
									</tr>
									<tr>
										<th>투입일</th>
										<td><input type="date" id="putDay"></td>
									</tr>
									<tr>
										<th>퇴사일</th>
										<td><input type="date" id="quitDay"></td>
									</tr>
								</table>
							</div>
							<div class="col-md-4 div-padding-custom">
								<table class="table-common table-fill">
									<tr>
										<th>생성자</th>
										<td><input type="text" id="inid" class="dis"></td>
									</tr>
									<tr>
										<th>생성일시</th>
										<td><input type="text" id="indt" class="dis dbDatetime"></td>
									</tr>
									<tr>
										<th>수정자</th>
										<td><input type="text" id="upid" class="dis"></td>
									</tr>
									<tr>
										<th>수정일시</th>
										<td><input type="text" id="updt" class="dis dbDatetime"></td>
									</tr>
								</table>
								<div class="box-body with-border" id="divBtn" style="padding-top:5px;padding-right:0px;margin-bottom:20px">
										<!-- 동적할당으로 변경 -->
<!-- 									<div class="btn-group pull-right" style="margin-top:5px"> -->
<!-- 										<a class="btn btn-default" id="btnResetAplcntForm"><i class="fa fa-eraser"></i></a> -->
<!-- 										<a class="btn btn-default" id="btnSaveAplcntForm"><i class="fa fa-save"></i></a> -->
<!-- 										<a class="btn btn-default" id="btnClose"><i class="fa fa-close"></i></a> -->
<!-- 									</div> -->
								</div>
								<div class="box-header with-border">
									<a class="btn btn-block btn-warning btn-sm disabled" id="btnReloadCheckDup" title="이름, 생년, 성별이 동일하면 중복 데이터로 조회 됩니다.">지원자 중복 목록(이름,생년,성별)</a>
								</div>
<!-- 								<table id="tblDupAplcntList" class="row-border order-column hover"> -->
<!-- 									<tr> -->
<!-- 										<td>이름, 생년(출생년도)과 성별을 입력하면 중복 데이터를 검색합니다.</td> -->
<!-- 									</tr> -->
<!-- 								</table> -->
								<table id="gridList1" class="display compact" style="width:100%"></table>
							</div>
							<!-- 테스트용 버튼 -->
<!-- 							<div class="row"> -->
<!-- 								<input type="button" id="btnSetDummy" value="더미"> -->
<!-- 								<input type="button" id="btnResetAplcntForm" value="초기화"> -->
<!-- 								<input type="button" id="btnCheckValidation" value="유효성"> -->
<!-- 								<input type="button" id="btnSaveAplcntForm" value="저장"> -->
<!-- 								<input type="button" id="btnReadAplcntForm" value="조회"> -->
<!-- 								<input type="button" id="btnClose" value="닫기"> -->
<!-- 							</div> -->
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</div>
</body>
</html>
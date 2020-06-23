<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String aplcntIdx = request.getParameter("aplcntIdx");
%>
<!DOCTYPE html>
<html>
<head>
<!-- 공통 라이브러리 설정 -->
<%@include file="/WEB-INF/views/include/import.jsp"%>
<%@include file="/WEB-INF/views/include/importBootstrap.jsp"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/employment/aplcntInfoPop.js"></script>
<style>
/* col 안에 col이 사용되어 패딩이 누적되는 부분을 조정 */
.div-padding-custom {
	padding: 10px 15px 10px 10px; 
}
table.table-common th {
	width: 130px;
	min-width: 130px;
}
table.table-common td {
	vertical-align: middle;
	padding: 4px 10px;
	max-width: 300px;
}
/* table안에서 내용이 길어지면 개행되지 않고 ...으로 표시 */
.td-height1 {
	height: 85px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: pre;
}
</style>
<title>지원자 정보 팝업</title>
</head>

<body>
<input type="hidden" id="gAplcntIdx" value="<%=aplcntIdx%>">
<div class="wrapper">
<div id="loader"></div>
	<div class="content-wrapper content-custom">
		<!-- Content Header (Page header) -->
		<section class="content-header">
		<div class="btn-group pull-right" style="margin-top:5px">
			<button class="btn btn-default btn-sm" id="btnCopy" title="지원자 정보 복사"><i class="fa fa-copy"></i></button>
		</div>
		<h1>지원자 정보<small>지원자 정보를 확입합니다.</small></h1>
		</section>
		<section class="content">
			<div class="row">
				<div class="col-md-12">
					<div class="box box-danger">
						<div class="box-body">
							<div class="col-sm-5 div-padding-custom">
								<table class="table-common">
									<tr>
										<th>순번</th>
										<td id="aplcntIdx"></td>
									</tr>
									<tr>
										<th>접수일</th>
										<td id="receiptDate"></td>
									</tr>
									<tr>
										<th>지원 부서</th>
										<td id="aplcntBizarea"></td>
									</tr>
									<tr>
										<th>사번</th>
										<td id="emplyNum"></td>
									</tr>
									<tr>
										<th>이름(성별)</th>
										<td id="aplcntNm"></td>
									</tr>
									<tr>
										<th>생년월일</th>
										<td id="birthday"></td>
									</tr>
									<tr>
										<th>주소</th>
										<td id="addr"></td>
									</tr>
									<tr>
										<th>연락처 / 이메일</th>
										<td id="contactInfo"></td>
									</tr>
									<tr>
										<th>결혼여부</th>
										<td id="maritalStts"></td>
									</tr>
									<tr>
										<th>최종학력</th>
										<td id="highestEdu"></td>
									</tr>
									<tr>
										<th>경력여부</th>
										<td id="careerStts"></td>
									</tr>
									<tr>
										<th>회사명1</th>
										<td id="company1"></td>
									</tr>
									<tr>
										<th>근무기간1</th>
										<td id="companyPeriod1"></td>
									</tr>
									<tr>
										<th>담당업무1</th>
										<td id="assignedTask1"></td>
									</tr>
									<tr>
										<th>회사명2</th>
										<td id="company2"></td>
									</tr>
									<tr>
										<th>근무기간2</th>
										<td id="companyPeriod2"></td>
									</tr>
									<tr>
										<th>담당업무2</th>
										<td id="assignedTask2"></td>
									</tr>
								</table>
							</div>
							<div class="col-sm-7 div-padding-custom">
								<table class="table-common">
									<tr>
										<th>블랙리스트</th>
										<td id="blacklist"></td>
									</tr>
									<tr>
										<th>채용경로 / 추천인</th>
										<td id="recruitSite1"></td>
									</tr>
									<tr>
										<th>서류면접</th>
										<td id="docItvw" class="td-height1"></td>
									</tr>
									<tr>
										<th>전화면접</th>
										<td id="phoneItvw" class="td-height1"></td>
									</tr>
									<tr>
										<th>전화면접결과</th>
										<td id="phoneItvwResult"></td>
									</tr>
									<tr>
										<th>대면면접</th>
										<td id="ptopItvw" class="td-height1"></td>
									</tr>
									<tr>
										<th>면접일 / 면접관</th>
										<td id="itvwDate"></td>
									</tr>
									<tr>
										<th>면접참석여부 / 결과</th>
										<td id="itvwAttd"></td>
									</tr>
									<tr>
										<tr>
										<th>교육참석의사 / 여부</th>
										<td id="eduAttdIttnStts"></td>
									</tr>
									<tr>
										<th>교육일 / 입사일</th>
										<td id="eduDate"></td>
									</tr>
									<tr>
										<th>투입일 / 퇴사일</th>
										<td id="putDay"></td>
									</tr>
									<tr>
										<th>수정일시(수정자)</th>
										<td id="upiddt"></td>
									</tr>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</div>
</body>
</html>
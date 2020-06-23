<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String flag = request.getParameter("flag");
	String cdCompany = request.getParameter("cdCompany");
	String cdBizarea = request.getParameter("cdBizarea");
	String cdDept = (request.getParameter("cdDept") == null) ? "" : request.getParameter("cdDept");
	String deptClass = (request.getParameter("deptClass") == null) ? "" : request.getParameter("deptClass");
	String itvwDate = (request.getParameter("itvwDate") == null) ? "" : request.getParameter("itvwDate");
	String resultTitle = request.getParameter("resultTitle");
	
%>
<!DOCTYPE html>
<html>
<head>
<!-- 공통 라이브러리 설정 -->
<%@include file="/WEB-INF/views/include/import.jsp"%>
<%@include file="/WEB-INF/views/include/importBootstrap.jsp"%>

<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/employment/statRcrtStatusPop.js"></script>
<style>
/* col 안에 col이 사용되어 패딩이 누적되는 부분을 조정 */
.div-padding-custom {
	padding: 10px 15px 10px 10px; 
}

#gridList1 textarea {
	width: 150px;
	height: 30px;
	margin: 0;
	padding: 0 0 0 px;
	border: 1px solid darkgrey;
	resize: none;
}

#gridList1 input[type="text"]
, #gridList1 input[type="password"]
, #gridList1 input[type="number"]
, #gridList1 input[type="tel"]
, #gridList1 input[type="email"]
, #gridList1 input[type="date"]
, #gridList1 input[type="month"] {
	margin: 0;
	padding: 0 0 0 5px; 
	border: 1px solid darkgrey;
	width: 50px; 
	height: 30px; /* td안에 element의 height를 100%를 적용하려면 감싸는 element의 height가 지정되어있어야함(100%는 안되는듯..) */
}

#gridList1 input[type="date"] {
	width: 100%; 
}

#gridList1 input[type="date"]::-webkit-inner-spin-button, input[type="month"]::-webkit-inner-spin-button {
	-webkit-appearance: none; /* 조절 버튼 표시안함 */
/* 	height: 100%; */ /* 값 조절 버튼 크기 */
}
#gridList1 input[type="date"]::-webkit-calendar-picker-indicator, input[type="month"]::-webkit-calendar-picker-indicator {
	font-size: 10px /* 우측 역삼각형 크기 */
}

#gridList1 input[type=number]::-webkit-inner-spin-button {
/* 	-webkit-appearance: none; */
	height:30px;
}

#gridList1 select {
	border: 1px solid darkgrey;
	width: 100%;
	padding-left: 0px;
	height: 30px;
}


/* .dataTables_scrollBody table tbody tr:last-child td { */
/* 	border-bottom: 1px solid green; */
/* } */

</style>
<title>통계.부서별 채용 현황(POP)</title>
</head>

<body>
<input type="hidden" id="flag" value="<%=flag%>">
<input type="hidden" id="cdCompany" value="<%=cdCompany%>">
<input type="hidden" id="cdBizarea" value="<%=cdBizarea%>">
<input type="hidden" id="cdDept" value="<%=cdDept%>">
<input type="hidden" id="deptClass" value="<%=deptClass%>">
<input type="hidden" id="itvwDate" value="<%=itvwDate%>">
<input type="hidden" id="resultTitle" value="<%=resultTitle%>">

<div class="wrapper">
	<div id="loader"></div>
	<!-- Content Wrapper. Contains page content -->
	<div class="content-wrapper content-custom">
		<!-- Content Header (Page header) -->
		<section class="content-header">
				<label style="font-size:25px;"><i class="fa fa-check"></i> <%=resultTitle%><span id="totalCount"></span> </label>
				<!-- textarea의 크기를 0으로 만들거나, hidden이 되면 클립보드 복사가 동작하지 않음 -->
				<textarea id="clipboard" readonly style="width:1px;height:1px;padding:0;margin:0;border:0;;overflow:hidden;resize:none;"></textarea>
				면접일시 <select id="itvwDt" style="width:150px;height:30px;border:1px solid #e7e7e7;font-size:16px;"></select>
				<div class="btn-group" style="margin-left:10px;padding-bottom: 5px;">
					<button class="btn btn-default btn-sm" id="btnExportExcel" title="엑셀추출"><i class="fa fa-file-excel-o"></i></button>
					<button class="btn btn-default btn-sm" id="btnClipMobile" title="전화번호 추출"><i class="fa fa-clipboard"></i></button>
				</div>
		</section>
		<!-- Main content -->
		<section class="content">
			<div class="row">
				<div class="col-md-12">
					<div class="box box-danger">
						<div class="box-body">
							<div class="col-md-12 div-padding-custom">
								<table id="gridList1" class="display compact cell-border" style="width:100%"></table>
							</div>
						</div>
<!-- 						<div class="box-footer" style="padding-top: 0px;padding-bottom: 0px"> -->
<!-- 							<div class="text-center" id="pagination"></div> -->
<!-- 						</div> -->
					</div>
				</div>
			</div>
		</section>
	</div>
</div>
</body>
</html>
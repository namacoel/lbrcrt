<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<!-- 공통 라이브러리 설정 -->
<%@include file="/WEB-INF/views/include/import.jsp"%>
<%@include file="/WEB-INF/views/include/importBootstrap.jsp"%>

<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/mainRcrt.js"></script>

<style>
table.table-common th {
    padding: 0px 6px 0px 6px;
    text-align: center;
    vertical-align: middle;
    border: 1px solid #bbb;
}
table.table-common th.th-color-saturday {
	color: blue;
}
table.table-common th.th-color-holiday {
	color: red;
}
table.table-common th.th-bgcolor-today {
	background-color: gold;
}
table.table-common td {
    text-align: center;
    vertical-align: middle;
    border: 1px solid #bbb;
}
table.table-common .th-align-left {
	text-align: left;
}
table.table-common .color-sum {
	background: #E9E9E9;
}
#tblStatEmployeeMonthReport,
#tblStatItvwWeeklyReport,
#tblStatRcrtReport {
	border: 2px solid #bbb;
}
#tblStatItvwWeeklyReport tr:nth-child(1) th:nth-child(2),
#tblStatItvwWeeklyReport tr:nth-child(1) th:nth-child(3),
#tblStatItvwWeeklyReport tr:nth-child(1) th:nth-child(4),
#tblStatItvwWeeklyReport tr:nth-child(1) th:nth-child(5),
#tblStatItvwWeeklyReport tr:nth-child(1) th:nth-child(6),
#tblStatItvwWeeklyReport tr:nth-child(1) th:nth-child(7),
#tblStatItvwWeeklyReport tr:nth-child(2) th:nth-child(1),
#tblStatItvwWeeklyReport tr:nth-child(2) th:nth-child(4),
#tblStatItvwWeeklyReport tr:nth-child(2) th:nth-child(7),
#tblStatItvwWeeklyReport tr:nth-child(2) th:nth-child(10),
#tblStatItvwWeeklyReport tr:nth-child(2) th:nth-child(13),
#tblStatItvwWeeklyReport tr:nth-child(2) th:nth-child(16),
#tblStatItvwWeeklyReport td:nth-child(2),
#tblStatItvwWeeklyReport td:nth-child(5),
#tblStatItvwWeeklyReport td:nth-child(8),
#tblStatItvwWeeklyReport td:nth-child(11),
#tblStatItvwWeeklyReport td:nth-child(14),
#tblStatItvwWeeklyReport td:nth-child(17),
#tblStatRcrtReport th:nth-child(3),
#tblStatRcrtReport td:nth-child(3),
#tblStatEmployeeMonthReport tr:nth-child(1) th:nth-child(2),
#tblStatEmployeeMonthReport td:nth-child(2)
{
	border-left: 2px solid #bbb;
}

</style>
<title>메인 통계</title>
</head>

<body>
<div class="wrapper">
	<div id="loader"></div>
	<!-- Content Wrapper. Contains page content -->
	<div class="content-wrapper content-custom">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>메인 통계<small>면접 주간 현황, 채용 진행 현황</small></h1>
		</section>
		<!-- Main content -->
		<section class="content">
			<div class="row">
				<div class="col-md-12">
					<div class="box box-warning">
						<div class="box-header with-border">
							<!-- SEARCH : ST -->
							<div class="col-md-3">
								<div class="input-group">
									<table class="table-search table-fill">
										<tr>
											<th style="min-width:120px">조회일자</th>
											<td><input type="date" id="srchDate"></td>
										</tr>
									</table>
									<span id="div_btnDay" class="input-group-btn">
										<button class="btn btn-default btn-sm" id="btnPrevDay" title="이전"><i class="fa fa-caret-left"></i></button>
										<button class="btn btn-default btn-sm" id="btnNextDay" title="다음"><i class="fa fa-caret-right"></i></button>
									</span>
								</div>
							</div>
							<!-- SEARCH : ED -->
						</div>
						<div class="box-body">
							<div class="col-md-6 div-padding-custom">
								<div class="box-header" style="">
									<label><i class="fa fa-check"></i> 센터별 인원 운영 현황</label>
									<small style="font-size:xx-small;color:grey">월 통계</small>
								</div>
								<table id="tblStatEmployeeMonthReport" class="table-common"></table>
							</div>
						</div>
						<div class="box-body">
							<div class="col-md-9 div-padding-custom">
								<div class="box-header" style="">
									<label><i class="fa fa-check"></i> 면접 주간 현황</label>
								</div>
								<table id="tblStatItvwWeeklyReport" class="table-common"></table>
							</div>
						</div>
						<div class="box-body">
							<div class="col-md-12 div-padding-custom">
								<div class="box-header" style="">
									<label><i class="fa fa-check"></i> 채용 진행 현황<span id="totalCount"></span></label>
								</div>
								<table id="tblStatRcrtReport" class="table-common"></table>
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
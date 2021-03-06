<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<!-- 공통 라이브러리 설정 -->
<%@include file="/WEB-INF/views/include/import.jsp"%>
<%@include file="/WEB-INF/views/include/importBootstrap.jsp"%>

<script src="<%=request.getContextPath()%>/resources/plugins/jquery-ui/jquery-ui.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/plugins/chartjs/Chart.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/mainRcrt.js"></script>

<style>
.div-shade {
	border-radius: 3px;
	box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.2);
	transition: all 0.25s ease;
}

.div-shade:hover {
	box-shadow: 8px 8px 10px 0 rgba(0, 0, 0, 0.2);
}

table.table-common th {
	padding: 0px 6px 0px 6px;
	text-align: center;
	vertical-align: middle;
	/*     border: 1px solid #bbb; */
}

table.table-common th.th-color-saturday {
	color: blue;
}

table.table-common th.th-color-holiday {
	color: red;
}

table.table-common th.th-bgcolor-today {
	background-color: #eccc7b61;
}

table.table-common td {
	text-align: center;
	vertical-align: middle;
}

table.table-common .th-align-left {
	text-align: left;
}

table.table-common .color-sum {
	background: #e9e9e9;
}

#btnModal {
	background: #3d8dbc38;
	border: 1px solid #3d8dbc6e;
	border-radius: 2px;
	box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.1);
	transition: all 0.25s;
}

#btnModal>i {
	transition: all 0.25s;
}

#btnModal:hover {
	box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.2);
}

#btnModal:hover>i {
	font-size: 18px;
}

#modalWrapper {
	display: none;
	position: fixed;
	z-index: 1;
	text-align: center;
	border-radius: 5px; /* 안먹네.. */
	top: 390px;
}
/* 모달차트 CSS  */
#modalChart {
	background: #fff;
	border-radius: 10px;
	box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.2);
	transition: all 0.25s ease;
}

#modalChart:hover {
	box-shadow: 8px 8px 10px 0 rgba(0, 0, 0, 0.3);
}

#modalChart .modal-header {
	position: relative;
	height: 30px;
	padding: 5px;
	/* gainsboro */
	background: #3d8dbc38;
	border-bottom: 1px solid #ebebeb;
	font-weight: bold;
}

.modal-header a {
	display: block;
	position: absolute;
	text-align: center;
	font-size: 20px;

	right: 7px;
	top: 7px;
}

#modalChart .modal-body {
	width: 800px;
	height: 300px;
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
				<h1>메인 통계<small>면접 주간 현황, 채용 진행 현황</small>
				</h1>
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
												<th style="min-width: 120px;">조회일자</th>
												<td><input type="date" id="srchDate" /></td>
											</tr>
										</table>
										<span id="div_btnDay" class="input-group-btn">
											<button class="btn btn-default btn-sm" id="btnPrevDay"><i class="fa fa-caret-left"></i></button>
											<button class="btn btn-default btn-sm" id="btnNextDay"><i class="fa fa-caret-right"></i></button>
										</span>
									</div>
								</div>
								<!-- SEARCH : ED -->
							</div>
							<!-- <div class="box-body">
							<div class="col-md-6 div-padding-custom">
								<div class="box-header" style="">
									<label><i class="fa fa-check"></i> 센터별 인원 운영 현황</label>
									<small style="font-size:xx-small;color:grey">월 통계</small>
								</div>
								<table id="tblStatEmployeeMonthReport" class="table-common"></table>
							</div>
						</div> -->
							<div class="box-body">
								<div class="col-md-9 div-padding-custom">
									<div class="box-header" style="">
										<button id="btnModal"><i class="fa fa-bar-chart"></i>&nbsp;주간 면접 현황</button>
									</div>
									<div id="modalWrapper">
										<div id="modalChart">
											<div class="modal-content">
												<div class="modal-header">
													<i class="fa fa-bar-chart"></i>&nbsp;주간 면접 대상자
													<a class="close"><i class="fa fa-close"></i></a>
											</div>
												<div class="modal-body"><canvas id="aChart"></canvas></div>
											</div>
										</div>
									</div>
									<div class="div-shade">
										<table id="tblStatItvwWeeklyReport" class="table-common"></table>
									</div>
								</div>
							</div>
							<div class="box-body">
								<div class="col-md-12 div-padding-custom">
									<div class="box-header" style="">
										<label><i class="fa fa-check"></i> 채용 진행 현황<span id="totalCount"></span></label>
									</div>
									<div class="div-shade">
										<table id="tblStatRcrtReport" class="table-common"></table>
									</div>
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

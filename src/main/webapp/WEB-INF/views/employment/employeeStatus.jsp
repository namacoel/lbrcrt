<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<!-- 공통 라이브러리 설정 -->
<%@include file="/WEB-INF/views/include/import.jsp"%>
<%@include file="/WEB-INF/views/include/importBootstrap.jsp"%>
<!-- DataTables -->
<link rel="stylesheet" href="/resources/plugins/datatables/jquery.dataTables.min.css">
<script src="/resources/plugins/datatables/jquery.dataTables.min.js"></script>

<link rel="stylesheet" type="text/css" href="/resources/css/common/commonWithBs.css">
<link rel="stylesheet" type="text/css" href="/resources/css/common/common.css">
<link rel="stylesheet" type="text/css" href="/resources/css/common/dataTable-custom.css">

<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/employment/employeeStatus.js"></script>

<style>
/*
div.dataTables_scrollHeadInner table th, div.dataTables_scrollBody table td  {
	text-align: center;
}

div.dataTables_scrollBody table td:nth-child(8)  {
	
	border-right:2px solid #ddd;
}

div.dataTables_scrollBody table td  {
	padding: 1.5px !important;
}
*/
#tblEmployeeStatusList tr:hover {
	background-color: #e1e1e1;
}

#tblEmployeeStatusList tbody tr.selected {
	background-color: #ffff99;
	font-weight: bold;
}

#tblEmployeeStatusList th
, #tblEmployeeStatusList td
, #tblEmployeeStatusListSum td {
	text-align: center;
	vertical-align: middle;
	padding: 3px;
}
#tblEmployeeStatusList thead tr:nth-child(1) {
	border-bottom:2px solid black;
}
#tblEmployeeStatusListSum tr:nth-child(1) {
	border-top:2px solid black;
}
#tblEmployeeStatusList td:nth-child(8)
, #tblEmployeeStatusList th:nth-child(8) {
	border-right:2px solid #bbb;
}
#tblEmployeeStatusList td:nth-child(3) {
	font-weight: bold;
}

#tblEmployeeStatusList td:nth-child(13) {
	text-align: left;
	
}


input[type=number]::-webkit-inner-spin-button
, input[type=number]::-webkit-outer-spin-button {
	height:40px;
}
table tr.tr-color-holiday {
	background-color: #ffe6e6;
}
table tr.tr-color-saturday {
	background-color: #e6ffff;
}

.table-th-center th{
	text-align: center;
}
#btnNew {
	display: none;
}

</style>
<title>인원 운영 현황</title>
</head>

<body>
<div class="wrapper">
	<div id="loader"></div>
	<!-- Content Wrapper. Contains page content -->
	<div class="content-wrapper content-custom">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>인원 운영 현황<small>인원 운영 현황을 관리합니다.</small></h1>
		</section>
		<!-- Main content -->
		<section class="content">
			<div class="row">
				<div class="col-md-12">
					<div class="box box-primary">
						<div class="box-header with-border">
							<div class="input-group">
								<table class="table-search">
									<tr>
										<th style="width:120px">사업장</th>
										<td style="width:170px"><select id="srchCdBizarea"></select></td>
										<th style="width:120px">조회월</th>
										<td style="width:150px"><input type="month" id="srchDate"></td>
										<th style="padding:0px;text-align:left">
											<div class="btn-group" id="divMonth">
												<button class="btn btn-default btn-sm">1</button>
												<button class="btn btn-default btn-sm">2</button>
												<button class="btn btn-default btn-sm">3</button>
												<button class="btn btn-default btn-sm">4</button>
												<button class="btn btn-default btn-sm">5</button>
												<button class="btn btn-default btn-sm">6</button>
												<button class="btn btn-default btn-sm">7</button>
												<button class="btn btn-default btn-sm">8</button>
												<button class="btn btn-default btn-sm">9</button>
												<button class="btn btn-default btn-sm">10</button>
												<button class="btn btn-default btn-sm">11</button>
												<button class="btn btn-default btn-sm">12</button>
											</div>
										</th>
									</tr>
								</table>
								<div class="input-group-btn">
									<button class="btn btn-default" id="btnExport" title="엑셀추출"><i class="fa fa-file-excel-o"></i></button>
									<button class="btn btn-default" id="btnToPopup" title="TO/재직인원 등록 팝업"><i class="fa fa-plus-circle"></i></button>
<!-- 									<button class="btn btn-default" id="btnSearchReset" title="조건 초기화"><i class="fa fa-eraser"></i></button> -->
								</div>
							</div>
						</div>
						<div class="box-body">
							<div class="col-md-9 div-padding-custom">
<!-- 								<div class="box-header" style=""> -->
<!-- 									<label><i class="fa fa-check"></i> 운영 연황<span id="totalCount"></span> </label> -->
<!-- 								</div> -->
<!-- 								<table id="tblEmployeeStatusList" class="compact cell-border"></table> -->
								<table id="tblEmployeeStatusList" class="table-common"></table>
								<table id="tblEmployeeStatusListSum" class="table-common">
<!-- 									<tr> -->
<!-- 										<td>월 누적</td> -->
<!-- 										<td>a</td> -->
<!-- 										<td>a</td> -->
<!-- 										<td>a</td> -->
<!-- 										<td>a</td> -->
<!-- 										<td>a</td> -->
<!-- 										<td>a</td> -->
<!-- 										<td>a</td> -->
<!-- 										<td>a</td> -->
<!-- 										<td>a</td> -->
<!-- 										<td>a</td> -->
<!-- 										<td>a</td> -->
<!-- 									</tr> -->
								</table>
							</div>
							<div class="col-md-3 div-padding-custom" style="margin-top:25px">
								<table class="table-common table-th-center">
									<tr>
										<th colspan="5" id="thComment" style="color:red;padding:0px"></th>
									</tr>
									<tr>
										<th >월TO</th>
										<th >월초재직</th>
										<th >월말재직</th>
										<th >월초교육</th>
										<th >월말교육</th>
									</tr>
									<tr>
										<th id="thTo"></th>
										<th id="thBeginEmployee"></th>
										<th id="thEndEmployee"></th>
										<th id="thBeginTrainee"></th>
										<th id="thEndTrainee"></th>
									</tr>
								</table>
								<div style="margin:10px"></div>
								<table id="tblEmployeeStatusInput" class="table-common">
									<tr>
										<th style="width:80px">센터</th>
										<td><select id="cdBizarea"></select></td>
									</tr>
									<tr>
										<th>등록일</th>
										<td><input type="date" id="inputDate"></td>
									</tr>
									<tr>
										<th>이직</th>
										<td><input type="number" id="changeCnt"></td>
									</tr>
									<tr>
										<th>이동</th>
										<td><input type="number" id="moveCnt"></td>
									</tr>
									<tr>
										<th>교육이직</th>
										<td><input type="number" id="tChangeCnt"></td>
									</tr>
									<tr>
										<th>교육시작</th>
										<td><input type="number" id="tMoveCnt"></td>
									</tr>
									<tr>
										<th>업무투입</th>
										<td><input type="number" id="putCnt"></td>
									</tr>
									<tr>
										<th style="height:80px">비고</th>
										<td><textarea id="memo"></textarea></td>
									</tr>
								</table>
								<div class="btn-group pull-right"  style="margin-top:5px">
									<button class="btn btn-default" id="btnNew" title="새로 작성하기"><i class="fa fa-plus"></i></button>
									<button class="btn btn-default" id="btnSave" title="저장"><i class="fa fa-save"></i></button>
								</div>
							</div>
						</div>
						<div class="box-footer" style="padding-top: 0px;padding-bottom: 0px">
<!-- 							<div class="text-center" id="pagination"></div> -->
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</div>
</body>
</html>
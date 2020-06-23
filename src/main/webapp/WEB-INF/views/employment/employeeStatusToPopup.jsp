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

<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/employment/employeeStatusToPopup.js"></script>

<style>

div.dataTables_scrollHeadInner table th, div.dataTables_scrollBody table td  {
	text-align: center;
}
input[type=number]::-webkit-inner-spin-button
, input[type=number]::-webkit-outer-spin-button {
	height:40px;
}

</style>
<title>인원 운영 현황(팝업)</title>
</head>

<body>
<div class="wrapper">
	<div id="loader"></div>
	<!-- Content Wrapper. Contains page content -->
	<div class="content-wrapper content-custom">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>월별 TO 및 재직인원 관리</h1>
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
										<th style="width:120px">조회범위</th>
										<td style="width:150px"><select id="srchDate"></select></td>
										<th></th>
									</tr>
								</table>
<!-- 								<div class="input-group-btn"> -->
<!-- 									<button class="btn btn-default" id="btnExport" title="엑셀추출"><i class="fa fa-file-excel-o"></i></button> -->
<!-- 								</div> -->
							</div>
						</div>
						<div class="box-body">
							<div class="col-md-6 div-padding-custom">
								<div class="box-header" style="">
									<label><i class="fa fa-check"></i> 월 운영 현황<span id="totalCount"></span> </label>
								</div>
								<table id="tblEmployeeStatistics" class="display compact cell-border"></table>
								<table id="tblEmployeeStatisticsInput" class="table-common">
									<thead>
									<tr>
										<th style="width:170px">센터</th>
										<th style="width:120px">등록일</th>
										<th>월TO</th>
										<th>월초재직</th>
										<th>월초교육</th>
										<td style="width:10px"><button class="btn btn-default" id="btnNew" title="새로 작성하기"><i class="fa fa-plus"></i></button></td>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td><select id="cdBizarea"></select></td>
										<td><input type="month" id="inputMonth"></td>
										<td><input type="number" id="monthToCnt"></td>
										<td><input type="number" id="beginEmployeeCnt"></td>
										<td><input type="number" id="beginTraineeCnt"></td>
										<td><button class="btn btn-default" id="btnSave" title="저장"><i class="fa fa-save"></i></button></td>
									</tr>
									</tbody>
								</table>
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
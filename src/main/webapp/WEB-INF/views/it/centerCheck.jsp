<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<!--  SVN 테스트용 주석 -->
<!-- 공통 라이브러리 설정 -->
<%@include file="/WEB-INF/views/include/import.jsp"%>
<%@include file="/WEB-INF/views/include/importBootstrap.jsp"%>
<!-- DataTables -->
<link rel="stylesheet" href="/resources/plugins/datatables/jquery.dataTables.min.css">
<script src="/resources/plugins/datatables/jquery.dataTables.min.js"></script>

<link rel="stylesheet" type="text/css" href="/resources/css/common/commonWithBs.css">
<link rel="stylesheet" type="text/css" href="/resources/css/common/common.css">
<link rel="stylesheet" type="text/css" href="/resources/css/common/dataTable-custom.css">

<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/it/centerCheck.js"></script>

<style>

table.table-common textarea {
	height: 98.5%;
}
table.table-common td {
	vertical-align: middle;
	border: 1px solid #bbb;
}
table.table-common td:nth-child(1)
, table.table-common td:nth-child(2) {
	background: #F9F9F9;
	padding-left: 20px;
	font-weight: bold;
}
table.table-common th
, table.table-common td:nth-child(3) {
	text-align: center;
	height: 36px;
}
</style>
<title>센터 점검 현황</title>
</head>

<body>
<div class="wrapper">
	<div id="loader"></div>
	<!-- Content Wrapper. Contains page content -->
	<div class="content-wrapper content-custom">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>센터 점검 현황<small>센터 점검 현황을 조회 / 작성합니다.</small></h1>
		</section>
		<!-- Main content -->
		<section class="content" style="padding-bottom: 0px">
			<div class="row">
				<div class="col-md-12">
					<div class="box box-warning">
						<div class="box-header with-border">
							<div class="input-group">
								<table class="table-search">
									<tr>
										<th>점검일</th>
										<td style="width:135px"><input type="date" id="checkDate"></td>
										<th>점검센터</th>
										<td><select id="centerCd"></select></td>
									</tr>
								</table>
								<span class="input-group-btn">
									<select id="refDeviceCd" style="display:none;"></select>
									<select id="refCheckItemCd" style="display:none;"></select>
									<button class="btn btn-default" id="btnNew" title="새로 작성하기"><i class="fa fa-plus"></i></button>
									<button class="btn btn-default" id="btnMod" title="수정하기"><i class="fa fa-pencil-square-o"></i></button>
									<button class="btn btn-default" id="btnSave" title="저장"><i class="fa fa-save"></i></button>
								</span>
							</div>
						</div>
						<div class="box-body">
							<table id="tblCenterCheckList" class="table-common"></table>
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
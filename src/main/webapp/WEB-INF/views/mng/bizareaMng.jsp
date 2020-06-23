<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<!-- 공통 LIB  설정 : ST -->
<%@include file="/WEB-INF/views/include/import.jsp"%>
<%@include file="/WEB-INF/views/include/importBootstrap.jsp"%>

<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/mng/bizareaMng.js"></script>
<!-- 공통 LIB  설정 : ED -->
<style>

</style>
<title>사업장 정보 관리</title>
</head>
<body>
<div class="wrapper">
	<!-- Content Wrapper. Contains page content -->
	<div class="content-wrapper content-custom">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>사업장 정보 관리<small>사업장 정보를 관리합니다.</small></h1>
		</section>
		<!-- Main content -->
		<section class="content">
			<div class="row">
				<div class="col-md-12">
					<div class="box box-primary">
						<div class="box-header with-border">
							<div class="input-group">
								<table id="tableSearch" class="table-search table-fill">
									<tr>
										<th>사업장코드</th>
										<td><input type="text" id="srchCdBizarea"></td>
										<th>사업장명</th>
										<td><input type="text" id="srchNmBizarea"></td>
									</tr>
								</table>
								<div class="input-group-btn">
									<button class="btn btn-default btn-sm" id="btnSrch" title="조회"><i class="fa fa-search"></i></button>
									<button class="btn btn-default btn-sm" id="btnResetSrch" title="조건 초기화"><i class="fa fa-eraser"></i></button>
<!-- 									<a class="btn btn-default" id="btnExport" title="엑셀추출"><i class="fa fa-file-excel-o"></i></a> -->
								</div>
							</div>
						</div>
						<div class="box-body">
							<div class="col-md-6 div-padding-custom">
								<div class="box-header" style="padding:0px;">
									<span class="btn btn-block btn-default btn-sm">사업장 목록<span id="totalCount"></span></span>
								</div>
								<div id="div_gridList1">
									<table id="gridList1" class="display compact" style="width:100%"></table>
								</div>
							</div>
							<div class="col-md-6 div-padding-custom" id="divBizareaDetail" style="padding-top:40px;">
								<label><i class="fa fa-check"></i> 사업장 정보</label>
								<table id="tableDetail1" class="table-detail table-fill">
									<tr>
										<th>회사코드</th>
										<td><input type="text" id="cdCompany" class="dis"></td>
									</tr>
									<tr>
										<th>사업장코드</th>
										<td><input type="text" id="cdBizarea" class="dis"></td>
									</tr>
									<tr>
										<th>사업장명</th>
										<td><input type="text" id="nmBizarea" class=""></td>
									</tr>
									<tr>
										<th>사업장명_L1</th>
										<td><input type="text" id="nmBizareaL1" class=""></td>
									</tr>
									<tr>
										<th>사업장구분</th>
										<td><select id="tpBizarea" class=""></select></td>
									</tr>
									<tr>
										<th>수정자</th>
										<td><input type="text" id="idUpdate" class="dis"></td>
									</tr>
									<tr>
										<th>수정일</th>
										<td><input type="text" id="dtsUpdate" class="dis"></td>
									</tr>
								</table>
								<div class="btn-group pull-right" style="margin-top:5px">
									<button class="btn btn-default btn-sm" id="btnNew" title="신규"><i class="fa fa-plus"></i></button>
									<button class="btn btn-default btn-sm" id="btnSave" title="저장"><i class="fa fa-save"></i></button>
								</div>
							</div>
						</div>
						<div class="box-footer" style="padding-top: 0px;padding-bottom: 0px">
							<div class="text-center" id="pagination"></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</div>
</body>
</html>
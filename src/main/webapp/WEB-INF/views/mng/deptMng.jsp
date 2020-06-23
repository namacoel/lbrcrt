<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<!-- 공통 라이브러리 설정 -->
<%@include file="/WEB-INF/views/include/import.jsp"%>
<%@include file="/WEB-INF/views/include/importBootstrap.jsp"%>

<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/bootstrap/css/bootstrap-treeview.min.css">
<script src="<%=request.getContextPath()%>/resources/bootstrap/js/bootstrap-treeview.min.js"></script>

<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/mng/deptMng.js"></script>
<style>
#treeBiz li{
	padding-top: 3px;
	padding-bottom: 3px;
/* 	font-weight: bold; */
/* 	font-size: 12px; */
}
</style>
<title>부서 정보 관리</title>
</head>
<body>
<div class="wrapper">
	<div id="loader"></div>
	<!-- Content Wrapper. Contains page content -->
	<div class="content-wrapper content-custom">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>부서 정보 관리<small>부서 정보를 관리합니다.</small></h1>
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
										<th>부서종료일</th>
										<td><input type=date id="srchDtEnd"></td>
									</tr>
								</table>
								<div class="input-group-btn">
									<button class="btn btn-default btn-sm" id="btnSrch" title="조회"><i class="fa fa-search"></i></button>
									<button class="btn btn-default btn-sm" id="btnResetSrch" title="조건 초기화"><i class="fa fa-eraser"></i></button>
<!-- 									<button class="btn btn-default btn-sm" id="btnExportExcel" title="엑셀추출"><i class="fa fa-file-excel-o"></i></button> -->
								</div>
							</div>
						</div>
						<div class="box-body">
							<div class="col-md-6 div-padding-custom" style="padding-top:10px;">
								<div class="input-group" style="margin-bottom:5px;">
								<label><i class="fa fa-check"></i> 부서 목록</label>
									<div class="input-group-btn">
										<button type="button" class="btn btn-success btn-sm" id="btn-expand-all" title="펴기"><i class="fa fa-plus"></i></button>
										<button type="button" class="btn btn-danger btn-sm" id="btn-collapse-all" title="접기(All)"><i class="fa fa-minus"></i></button>
									</div>
								</div>
          						<div id="treeBiz" style="overflow-y:auto;height:600px;"></div>
							</div>
							<div class="col-md-6 div-padding-custom" id="divDeptDetail" style="padding-top:10px;">
								
								<!-- </form> -->
								<label><i class="fa fa-check"></i> 부서 검색</label>
								<!-- <form> -->
								<div class="input-group" style="margin-top:10px;margin-bottom:20px;">
									<input type="search" class="form-control input-sm" id="input-search" placeholder="원하는 부서명을 입력해주세요.">
									<div class="input-group-btn">
										<button type="button" class="btn btn-default btn-sm" id="btn-clear-search">Clear</button>
										<button type="button" class="btn btn-success btn-sm" id="btn-search">Search</button>
									</div>
								</div>
								
								<label><i class="fa fa-check"></i> 부서 정보</label>
								<table id="tableDetail1" class="table-detail table-fill">
									<tr>
										<th style="width:25%;">회사</th>
										<td><input type="text" id="cdCompany" class="dis"></td>
									</tr>
									<tr>
										<th>사업장</th>
										<td><select id="cdBizarea" class="dis"></select></td>
									</tr>
									<tr>
										<th>상위부서</th>
										<td><select id="hDept" class="dis"></select></td>
									</tr>
									<tr>
										<th>부서코드</th>
										<td><input type="text" id="cdDept" class="modDis"></td>
									</tr>
									<tr>
										<th>부서명</th>
										<td><input type="text" id="nmDept" class=""></td>
									</tr>
									<tr>
										<th>부서시작일</th>
										<td><input type="date" id="dtStart"></td>
									</tr>
									<tr>
										<th>부서종료일</th>
										<td><input type="date" id="dtEnd"></td>
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
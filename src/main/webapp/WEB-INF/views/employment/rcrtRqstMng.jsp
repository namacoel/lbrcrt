<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
<!-- <link rel="stylesheet" type="text/css" href="/resources/css/common/dataTable-custom.css"> -->

<!-- treeview 라이브러리 -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/bootstrap/css/bootstrap-treeview.min.css">
<script src="<%=request.getContextPath()%>/resources/bootstrap/js/bootstrap-treeview.min.js"></script>

<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/employment/rcrtRqstMng.js"></script>

<style>
/* div.dataTables_scrollHeadInner table th, div.dataTables_scrollBody table td  { */
/* 	text-align: center; */
/* } */
#treeBiz {
	overflow-y:auto;
	height:300px;"
}
#treeBiz li{
	padding-top: 1px;
	padding-bottom: 1px;
 	font-size: 12px;
}

</style>
<title>채용 현황 관리</title>
</head>

<body>
<div class="wrapper">
	<div id="loader"></div>
	<!-- Content Wrapper. Contains page content -->
	<div class="content-wrapper content-custom">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>채용 현황 관리<small>부서별 채용 현황을 관리합니다.</small></h1>
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
										<th style="width:100px">사업장</th>
										<td style="width:150px"><select id="srchBizarea"></select></td>
										<th style="width:100px" id="modalSearchDept">
											부서&nbsp;&nbsp;<i class="fa fa-search"style="font-weight:bold"></i>
											</th>
										<td style="width:200px">
											<select id="srchDept"></select>
											<select id="hiddenAllDept" style="display:none"></select></td>
										<th style="width:100px">진행상태</th>
										<td style="width:100px"><select id="srchRcProgCd"></select></td>
										<th></th>
									</tr>
								</table>
								<span class="input-group-btn">
									<button class="btn btn-default btn-sm" id="btnSrch" title="조회"><i class="fa fa-search"></i></button>
									<button class="btn btn-default btn-sm" id="btnResetSrch" title="조건 초기화"><i class="fa fa-eraser"></i></button>
									<button class="btn btn-default btn-sm" id="btnExportExcel" title="엑셀추출"><i class="fa fa-file-excel-o"></i></button>
								</span>
							</div>
						</div>
						<div class="box-body">
							<div class="col-md-9 div-padding-custom">
								<div class="box-header" style="padding:0">
									<label><i class="fa fa-check"></i> 채용 현황<span id="totalCount"></span> </label>
								</div>
<!-- 								<table id=tblRcrtRqstList class="display compact cell-border"></table> -->
								<table id="gridList" class="display compact cell-border" style="width:100%"></table>
							</div>
							<div class="col-md-3 div-padding-custom" id="divRcrtRqstDetail">
								<div class="box-header">
									<label><i class="fa fa-check"></i> 채용 현황 정보</label>
								</div>
								<table id="tableDetail" class="table-detail table-fill">
									<tr>
										<th style="min-width:80px;">회사</th>
										<td style="width:300px"><input type="text" id="cdCompany" class="dis"></td>
									</tr>
									<tr>
										<th>사업장</th>
										<td><select id="cdBizarea" class="modDis"></select></td>
									</tr>
									<tr>
										<th>부서</th>
										<td><select id="cdDept" class="modDis"></select></td>
									</tr>
									<tr>
										<th>기수</th>
										<td><input type="number" id="deptClass" class="modDis"></td>
									</tr>
									<tr>
										<th>요청일</th>
										<td><input type="date" id="requestDate"></td>
									</tr>
									<tr>
										<th>시작일</th>
										<td><input type="date" id="rcSdate"></td>
									</tr>
									<tr>
										<th>종료일</th>
										<td><input type="date" id="rcEdate"></td>
									</tr>
									<tr>
										<th title="기수 교육일로 지원자의 교육일 컬럼과 다르다.">기수교육일</th>
										<td><input type="date" id="eduSdate"></td>
									</tr>
									<tr>
										<th>요청인원</th>
										<td><input type="number" id=requestPeopleCnt></td>
									</tr>
									<tr>
										<th title="진행상태는 수동으로 관리한다.">진행상태</th>
										<td><select id="rcProgCd"></select>
									</tr>
									<tr>
										<th>사유</th>
										<td><input type="text" id="rcProgMemo"></td>
									</tr>
									<tr>
										<th>수정자</th>
										<td><input type="text" id="upid" class="dis"></td>
									</tr>
									<tr>
										<th>수정일시</th>
										<td><input type="text" id="updt" class="dis"></td>
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
	
<!-- Modal -->
<div class="modal fade" id="myModal" role="dialog">
	<div class="modal-dialog" style="width:450px">
		<!-- Modal content-->
		<div class="modal-content">
<!-- 			<div class="modal-header"> -->
<!-- 				<button type="button" class="close" data-dismiss="modal">&times;</button> -->
<!-- 			</div> -->
			<div class="modal-body">
				<div class="input-group" style="margin-bottom:10px;">
					<input type="search" class="form-control input-sm" id="input-search" placeholder="원하는 부서명을 입력해주세요.">
					<div class="input-group-btn">
						<button type="button" class="btn btn-default btn-sm" id="btn-search" title="조회" style="display:none"><i class="fa fa-search"></i></button>
						<button type="button" class="btn btn-default btn-sm" id="btn-clear-search" title="조건초기화"><i class="fa fa-eraser"></i></button>
						<button type="button" class="btn btn-success btn-sm" id="btn-expand-all" title="펴기"><i class="fa fa-plus"></i></button>
						<button type="button" class="btn btn-danger btn-sm" id="btn-collapse-all" title="접기(All)"><i class="fa fa-minus"></i></button>
					</div>
				</div>
 				<div id="treeBiz"></div>
			</div>
<!-- 			<div class="modal-footer"> -->
<!-- 				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button> -->
<!-- 			</div> -->
		</div>
	</div>
</div>
  
	</div>
</div>
</body>
</html>

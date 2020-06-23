<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<!-- 공통 라이브러리 설정 -->
<%@include file="/WEB-INF/views/include/import.jsp"%>
<%@include file="/WEB-INF/views/include/importBootstrap.jsp"%>

<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/employment/statRcrtStatus.js"></script>

<style>
/* div.dataTables_scrollHeadInner table th, div.dataTables_scrollBody table td  {
	text-align: center;
} */
/* x 클릭 제거 */
input[type="month"]::-webkit-clear-button {
	font-size: 22px
	-webkit-appearance: none;
	display: none;
}

</style>
<title>통계.부서별 채용 현황</title>
</head>

<body>
<div class="wrapper">
	<div id="loader"></div>
	<!-- Content Wrapper. Contains page content -->
	<div class="content-wrapper content-custom">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>통계.부서별 채용 현황<small>부서별 채용 현황을 조회합니다.</small></h1>
		</section>
		<!-- Main content -->
		<section class="content">
			<div class="row">
				<div class="col-md-12">
					<div class="box box-warning">
						<div class="box-header with-border">
							<div class="input-group">
								<table id="tableSearch" class="table-search table-fill">
									<tr>
										<th>교육월</th>
										<td style="width:135px"><input type="month" id="srchEduSdate"></td>
										<td style="width:30px;text-align:center">~</td>
										<td style="width:135px"><input type="month" id="srchEduEdate"></td>
										<th>사업장</th>
										<td style="width:135px">
											<select id="srchBizarea"></select></td>
										<th>부서</th>
										<td style="width:135px"><select id="srchDept"></select></td>
										<th>진행상태</th>
										<td style="width:135px"><select id="srchRcProgCd"></select></td>
									</tr>
								</table>
								<div class="input-group-btn">
									<button class="btn btn-default btn-sm" id="btnSrch" title="조회"><i class="fa fa-search"></i></button>
									<button class="btn btn-default btn-sm" id="btnResetSrch" title="조건 초기화"><i class="fa fa-eraser"></i></button>
									<button class="btn btn-default btn-sm" id="btnExportExcel" title="엑셀추출"><i class="fa fa-file-excel-o"></i></button>
								</div>
							</div>
						</div>
						<div class="box-body">
							<div class="col-md-12 div-padding-custom">
								<div class="box-header" style="">
									<label><i class="fa fa-check"></i> 지원 현황<span id="totalCount"></span> </label>
								</div>
								<div id="div_gridList1">
									<table id="gridList1" class="display compact cell-border" style="width:100%"></table>
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
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
<link rel="stylesheet" type="text/css" href="/resources/css/common/custom1.css">
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/employment/statAplcntByRecruitSite.js"></script>
<style>
/* input[type="month"]::-webkit-clear-button { */
#srchJobDaySinput::-webkit-clear-button, srchJobDayE::-webkit-clear-button {
 -webkit-appearance: none;
  display: none;
}
</style>
<title>통계.채용경로별 지원자</title>
</head>
<body>
<div class="wrapper">
	<!-- Content Wrapper. Contains page content -->
	<div class="content-wrapper content-custom">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>통계.채용경로별 지원자<small>입사월을 기준으로 채용경로별로 지원자 목록을 조회합니다.</small></h1>
		</section>

		<!-- Main content -->
		<section class="content">
			<div class="row">
				<div class="col-md-12">
					<div class="box box-warning">
						<div class="box-header with-border">
							<div class="input-group">
								<table class="table-search">
									<tr>
										
										<th style="min-width:100px;width:100px">입사월</th>
										<td style="width:120px">
											<input type="month" id="srchJobDayS" style="width:120px">
										</td>
										<td style="width:30px;text-align:center">~</td>
										<td style="width:120px">
											<input type="month" id="srchJobDayE" style="width:120px">
										</td>
										<th style="width:100px">기수교육월</th>
										<td style="width:120px">
											<input type="month" id="srchEduSdate" style="width:120px">
										</td>
										<th>사업장</th>
										<td><select id="srchCdBizarea"></select></td>
										<th>부서</th>
										<td style="width:300px"><select id="srchCdDept"></select></td>
										<th>기수</th>
										<td><input type="text" id="srchAplcntClass"></td>
									</tr>
								</table>
								<div class="input-group-btn">
									<button class="btn btn-default" id="btnSearchReset" title="조건 초기화"><i class="fa fa-eraser"></i></button>
									<button class="btn btn-default" id="btnSearch" title="조회"><i class="fa fa-search"></i></button>
									<button class="btn btn-default" id="btnExport" title="엑셀추출"><i class="fa fa-file-excel-o"></i></button>
								</div>
							</div>
						</div>
						<div class="box-header" style="padding-bottom:0px">
							<h3 class="box-title">조회목록</h3>
							<span id="resultRange"></span><span id="totalCount"></span>
						</div>
						<div class="box-body">
							<table id="tblStatAplcntByRecruitSite" class="row-border order-column hover">
							</table>
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
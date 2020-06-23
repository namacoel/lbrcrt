<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<!-- 공통 라이브러리 설정 -->
<%@include file="/WEB-INF/views/include/import.jsp"%>
<%@include file="/WEB-INF/views/include/importBootstrap.jsp"%>

<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/employment/aplcntList.js"></script>

<title>지원자 목록</title>
</head>
<body>
<div id="mask"></div>
<div id="loader"></div>
<div class="wrapper">
	<div class="content-wrapper content-custom">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>지원자 목록<small>지원자 정보를 조회합니다.</small></h1>
		</section>
		<!-- Main content -->
		<section class="content" style="padding-bottom:0px">
			<div class="row">
				<div class="col-md-12">
					<div class="box box-primary" style="margin-bottom:0px">
						<div class="box-header with-border">
							<div class="input-group">
								<table id="tableSearch" class="table-search table-fill">
									<tr>
										<th style="min-width:52px">사업장</th>
										<td style="width:100px"><select id="srchBizarea"></select></td>
										<th style="min-width:40px">부서</th>
										<td style="width:205px"><select id="srchDept"></select></td>
										<th style="min-width:40px">기수</th>
										<td><input type="number" id="srchAplcntClass"></td>
										<th style="min-width:64px">전면결과</th>
										<td><select id="srchPhoneItvwResult"></select></td>
										<th style="min-width:52px">면접일</th>
										<td><input type="date" id="srchItvwDate"></td>
										<th style="min-width:64px">면접결과</th>
										<td><select id="srchItvwResult"></select></td>
										<th style="min-width:40px">이름</th>
										<td><input type="text" id="srchAplcntNm"></td>
										<!-- 생년월일은 제외 요청하여 제외함.2016.10.17.namacoel -->
<!-- 										<th style="min-width:64px">생년월일</th> -->
<!-- 										<td><select id="srchBirthdayY"></select></td> -->
										<th style="min-width:52px">연락처</th>
										<td><input type="tel" class="input-phone" id="srchContactInfo"></td>
										<!-- 생년월일은 제외 요청하여 제외함.2016.10.17.namacoel -->
<!-- 										<th style="min-width:52px">작업자</th> -->
<!-- 										<td><input type="text" id="srchUserId"></td> -->
									</tr>
								</table>
								<div class="input-group-btn">
									<button class="btn btn-default btn-sm" id="btnSrch" title="검색"><i class="fa fa-search"></i></button>
									<button class="btn btn-default btn-sm" id="btnResetSrch" title="조건 초기화"><i class="fa fa-eraser"></i></button>
									<button class="btn btn-default btn-sm" id="btnExportExcel" title="엑셀추출"><i class="fa fa-file-excel-o"></i></button>
								</div>
							</div>
						</div>
						<div class="box-header" style="padding-bottom:0px">
							<label><i class="fa fa-check"></i> 조회목록</label>
							<span id="resultRange"></span><span id="totalCount"></span>
						</div>
						<div class="box-body" style="padding-top:0">
							<table id="gridList1" class="row-border order-column hover" style="width:4300px;">
							</table>
						</div>
						<div class="box-footer text-right" style="padding-top: 0px;padding-bottom: 0px">
							<div class="btn-group pull-right" style="margin-top:5px">
								<button class="btn btn-default btn-sm" id="btnNew" title="등록"><i class="fa fa-user-plus"></i></button>
								<button class="btn btn-default btn-sm" id="btnMod" title="수정"><i class="fa fa-user"></i></button>
								<button class="btn btn-default btn-sm" id="btnClipMobile" title="전화번호추출"><i class="fa fa-clipboard"></i></button>
								<!-- textarea의 크기를 0으로 만들거나, hidden이 되면 클립보드 복사가 동작하지 않음 -->
								<textarea id="clipboard" readonly style="width:1px;height:1px;padding:0;margin:0;border:0;;overflow:hidden;resize:none;"></textarea>
							</div>
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
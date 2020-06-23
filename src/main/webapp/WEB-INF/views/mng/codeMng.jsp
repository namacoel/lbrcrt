<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<!-- 공통 라이브러리 설정 -->
<%@include file="/WEB-INF/views/include/import.jsp"%>
<%@include file="/WEB-INF/views/include/importBootstrap.jsp"%>

<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/mng/codeMng.js"></script>
<title>코드 관리</title>
</head>

<body>
<div class="wrapper">
	<div id="loader"></div>
	<div class="content-wrapper content-custom">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>코드 관리<small>코드 정보를 등록하거나 수정합니다.</small></h1>
		</section>
		<section class="content" style="padding-bottom:0px">
			<div class="row">
				<div class="col-md-12">
					<div class="box box-primary">
						<div class="box-header with-border">
							<div class="input-group">
								<table id="tableSearch1" class="table-search table-fill">
									<tr>
										<th>코드그룹</th>
										<td><input type="text" id="srchCodeGrp"></td>
										<th>코드그룹명</th>
										<td><input type="text" id="srchCodeGrpNm"></td>
										<th>사용여부</th>
										<td><select id="srchUsyn"></select></td>
									</tr>
								</table>
								<div class="input-group-btn">
									<button class="btn btn-default btn-sm" id="btnSrch1" title="조회"><i class="fa fa-search"></i></button>
									<button class="btn btn-default btn-sm" id="btnResetSrchA" title="조건 초기화"><i class="fa fa-eraser"></i></button>
								</div>
							</div>
						</div>
						<div class="box-body">
							<div class="col-md-4 div-padding-custom">
								<div class="box-header" style="padding:0px;">
									<span class="btn btn-block btn-primary btn-sm">코드그룹 목록<span id="totalCount1"></span></span>
								</div>
								<div id="div_gridList1">
									<table id="gridList1" class="display compact" style="width:100%"></table>
								</div>
							</div>
							<div class="col-md-4 div-padding-custom">
								<div class="box-header with-border" style="padding:0px;">
									<span class="btn btn-block btn-success btn-sm">코드 목록<span id="totalCount2"></span></span>
								</div>
								<div id="div_gridList2">
									<table id="gridList2" class="display compact" style="width:100%"></table>
								</div>
							</div>
							<div class="col-md-4 div-padding-custom" style="padding-top:30px;">
								<div class="box-body" style="padding-bottom:0px;">
									<div class="form-group" id="divCodeGrpDetail">
										<label><i class="fa fa-check"></i> 코드그룹 정보</label>
										<table id="tableDetail1" class="table-detail table-fill">
											<tr>
												<th style="min-width:70px">코드그룹</th>
												<td><input type="text" id="codeGrp" class="modDis"></td>
												<th style="min-width:80px">코드그룹명</th>
												<td><input type="text" id="codeGrpNm"></td>
											</tr>
											<tr>
												<th>설명</th>
												<td><input type="text" id="codeGrpDesc"></td>
												<th>사용여부</th>
												<td><select id="codeGrpUsyn"></select></td>
											</tr>
											<tr>
												<th>수정자</th>
												<td><input type="text" id="codeGrpUpid" class="dis"></td>
												<th>수정일시</th>
												<td><input type="text" id="codeGrpUpdt" class="dis dbDatetime"></td>
											</tr>
										</table>
										<div class="btn-group pull-right" style="margin-top:5px;">
											<button class="btn btn-default btn-sm" id="btnNew1" title="신규"><i class="fa fa-plus"></i></button>
											<button class="btn btn-default btn-sm" id="btnSave1" title="저장"><i class="fa fa-save"></i></button>
										</div>
									</div>
								</div>
								<div class="box-body" style="padding-bottom:0px;">
									<div class="form-group" id="divCodeDetail">
										<label><i class="fa fa-check"></i> 코드 정보</label>
										<table id="tableDetail2" class="table-detail table-fill">
											<tr>
												<th style="min-width:70px">코드</th>
												<td><input type="text" id="code" class="modDis"></td>
												<th style="min-width:80px">코드명</th>
												<td><input type="text" id="codeNm"></td>
											</tr>
											<tr>
												<th>설명</th>
												<td><input type="text" id="codeDesc"></td>
												<th>우선순위</th>
												<td><input type="number" id="sortOrder"></td>
											</tr>
											<tr>
												<th>ETC1</th>
												<td><input type="text" id="etc1"></td>
												<th>ETC2</th>
												<td><input type="text" id="etc2"></td>
											</tr>
											<tr>
												<th>ETC3</th>
												<td><input type="text" id="etc3"></td>
												<th>사용여부</th>
												<td><select id="codeUsyn"></select>
												</td>
											</tr>
											<tr>
												<th>수정자</th>
												<td><input type="text" id="codeUpid" class="dis"></td>
												<th>수정일시</th>
												<td><input type="text" id="codeUpdt" class="dis dbDatetime"></td>
											</tr>
										</table>
										<div class="btn-group pull-right" style="margin-top:5px">
											<button class="btn btn-default btn-sm" id="btnNew2" title="신규"><i class="fa fa-plus"></i></button>
											<button class="btn btn-default btn-sm" id="btnSave2" title="저장"><i class="fa fa-save"></i></button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="box box-primary">
						<div class="box-header with-border">
							<div class="input-group">
								<table id="tableSearch3" class="table-search table-fill">
									<tr>
										<th>코드ID</th>
										<td><input type="text" id="srchCode"></td>
										<th>코드명</th>
										<td><input type="text" id="srchCodeNm"></td>
									</tr>
								</table>
								<div class="input-group-btn">
									<button class="btn btn-default btn-sm" id="btnSrch3" title="조회"><i class="fa fa-search"></i></button>
									<button class="btn btn-default btn-sm" id="btnResetSrch3" title="조건 초기화"><i class="fa fa-eraser"></i></button>
								</div>
							</div>
						</div>
						<div class="box-body">
							<div class="col-md-12 div-padding-custom">
<!-- 								<div class="box-header with-border" style="padding-top:0px;"> -->
<!-- 									<a class="btn btn-block btn-primary btn-sm">코드 조회</a> -->
<!-- 								</div> -->
								<div id="div_gridList3">
									<table id="gridList3" class="display compact cell-border" style="width:100%"></table>
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
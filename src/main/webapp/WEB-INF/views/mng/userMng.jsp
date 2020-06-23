<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<!-- 공통 LIB  설정 : ST -->
<%@include file="/WEB-INF/views/include/import.jsp"%>
<%@include file="/WEB-INF/views/include/importBootstrap.jsp"%>

<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/mng/userMng.js"></script>
<!-- 공통 LIB  설정 : ED -->

<title>사용자 관리</title>
</head>
<body>
<div id="wrapper">
	<div class="content-wrapper content-custom">
		<section class="content-header">
			<h1>사용자 관리</h1>
		</section>
		<section class="content">
			<div class="row">
				<div class="col-md-12">
					<div class="box box-primary">
						<!-- SEARCH : ST -->
						<div class="box-header with-border">
							<div class="input-group">
								<table id="tableSearch" class="table-search table-fill">
									<tr>
										<th>ID</th>
										<td><input type="text" id="srchUserid"></td>
										<th>이름</th>
										<td><input type="text" id="srchKornm"></td>
										<th>계정상태</th>
										<td><select id="srchSttscd"></select></td>
									</tr>
								</table>
								<span class="input-group-btn">
									<button class="btn btn-default btn-sm" id="btnSrch" title="조회"><i class="fa fa-search"></i></button>
									<button class="btn btn-default btn-sm" id="btnResetSrch" title="조건 초기화"><i class="fa fa-eraser"></i></button>
									<button class="btn btn-default btn-sm" id="btnExportExcel" title="엑셀추출"><i class="fa fa-file-excel-o"></i></button>
								</span>
							</div>
						</div>
						<!-- SEARCH : ED -->
						<!-- BODY : ST -->
						<div class="box-body">
							<!-- GRID : ST -->
							<div class="col-md-8 div-padding-custom">
								<div class="box-header" style="padding:0px">
									<label><i class="fa fa-check"></i> 조회목록</label>
									<span id="resultRange"></span><span id="totalCount"></span>
								</div>
								<div id="div_gridList1">
									<table id="gridList1" class="display compact" style="width:100%"></table>
								</div>
							</div>
							<!-- GRID : ED -->
							<!-- DETAIL : ST -->
							<div class="col-md-4">
								<div class="box-header" style="padding-bottom:0px">
									<label><i class="fa fa-check"></i> 상세정보</label>
								</div>
								<table id="tableDetail1" class="table-detail table-fill">
									<tr>
										<th width="100px">ID</th>
										<td><input type="text" id="userid" class="modDis"></td>
									</tr>
									<tr>
										<th>비밀번호</th>
										<td>
											<div class="input-group" style="width:100%;height:100%">
                    							<input type="password" id="password" class="modDis" style="width:100%">
                    							<span class="input-group-btn">
                      								<button class="btn btn-warning btn-flat btn-sm nonDis" id="btnPopChangePwd" title="비밀번호 변경"><i class="fa fa-edit"></i></button>
                    							</span>
											</div>
										</td>
										
									</tr>
									<tr>
										<th>이름</th>
										<td><input type="text" id="kornm" maxlength="20"></td>
									</tr>
									<tr>
										<th>성별</th>
										<td><select id="sexcd"></select></td>
									</tr>
									<tr>
										<th>생년월일</th>
										<td><input type="text" id="birthday"></td>
									</tr>
									<tr>
										<th>이메일</th>
										<td><input type="email" id="email"></td>
									</tr>
									<tr>
										<th>사번</th>
										<td><input type="text" id="emplno"></td>
									</tr>
									<tr>
										<th>사용자등급</th>
										<td><select id="clsscd"></select></td>
									</tr>
									<tr>
										<th>계정상태</th>
										<td><select id="sttscd"></select></td>
									</tr>
									<tr>
										<th>등록자</th>
										<td><input type="text" id="inid" class="dis"></td>
									</tr>
									<tr>
										<th>등록일시</th>
										<td><input type="text" id="indt" class="dis"></td>
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
								<!-- 상세정보 버튼 : ST -->
								<div class="btn-group pull-right" style="margin-top:5px">
									<button class="btn btn-default btn-sm" id="btnNew" title="신규"><i class="fa fa-plus"></i></button>
									<button class="btn btn-default btn-sm" id="btnSave" title="저장"><i class="fa fa-save"></i></button>
								</div>
								<!-- 상세정보 버튼 : ED -->
							</div>
							<!-- DETAIL : ED -->
						</div>
						<!-- BODY : ED -->
					</div>
				</div>
			</div>
		</section>
	</div>
</div>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String pUserid = request.getParameter("pUserid");
%>
<!DOCTYPE html>
<html>
<head>
<!-- 공통 LIB  설정 : ST -->
<%@include file="/WEB-INF/views/include/import.jsp"%>
<%@include file="/WEB-INF/views/include/importBootstrap.jsp"%>

<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/mng/userMngPwdPop.js"></script>
<!-- 공통 LIB  설정 : ED -->

<title>비밀번호 변경</title>
</head>
<body>
<input type="hidden" id="pUserid" value="<%=pUserid%>">
<div id="wrapper">
<div class="content-wrapper content-custom">
		<section class="content-header">
			<h1>비밀번호 변경</h1>
		</section>
		<section class="content">
			<div class="row">
				<div class="col-md-12">
					<div class="box box-primary">
						<!-- BODY : ST -->
						<div class="box-body">
							<!-- DETAIL : ST -->
							<div class="col-md-12">
								<div class="box-header" style="padding-bottom:0px">
									<label><i class="fa fa-check"></i> 상세정보</label>
								</div>
								<table id="tableDetail1" class="table-detail table-fill">
									<tr>
										<th width="130px">ID</th>
										<td><input type="text" id="userid" class="dis"></td>
									</tr>
									<tr>
										<th>이름</th>
										<td><input type="text" id="kornm" maxlength="20" class="dis"></td>
									</tr>
									<tr>
										<th width="100px">새 비밀번호</th>
										<td><input type="password" id="newPwd"></td>
									</tr>
									<tr>
										<th>새 비밀번호 확인</th>
										<td><input type="password" id="newPwdConfirm"></td>
									</tr>
									<tr>
										<th>비밀번호 수정자</th>
										<td><input type="text" id="pwdupid" class="dis"></td>
									</tr>
									<tr>
										<th>비밀번호 수정일시</th>
										<td><input type="text" id="updt" class="dis"></td>
									</tr>
								</table>
								<!-- 상세정보 버튼 : ST -->
								<div class="btn-group pull-right" style="margin-top:5px">
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
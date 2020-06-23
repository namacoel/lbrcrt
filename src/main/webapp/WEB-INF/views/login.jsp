<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@include file="/WEB-INF/views/include/import.jsp"%>
<%@include file="/WEB-INF/views/include/importBootstrap.jsp"%>
<!DOCTYPE html>
<html>
<head>
<title>Login page</title>
<script>
if(parent && parent!=this) {
	top.location.href = location.pathname;
} else {
// 	console.log("부모창 없음");
}
</script>
</head>
<body class="hold-transition login-page">
	<div class="login-box">
		<div class="login-logo" style="vertical-align:middle;">
			<b>LBH</b>unet
		</div><!-- /.login-logo -->
		<div class="login-box-body">

			<c:if test="${(param.fail == null) && param.logout == null}">
				<p class="login-box-msg">로그인 정보를 입력하세요.</p>
			</c:if>
			<c:if test="${not empty param.fail}">
				<p class="login-box-msg" style="color:#f56954;">${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message}</p>
			<c:remove scope="session" var="SPRING_SECURITY_LAST_EXCEPTION"/>
        	</c:if>
			<c:if test="${param.logout != null}">
				<p class="login-box-msg" style="color:#00a65a;">성공적으로 로그아웃 되었습니다.</p>
			</c:if>
			<c:url var="loginUrl" value="/login" />
		<form action="${loginUrl}" method="POST">
			<div class="form-group has-feedback">
				<input type="text" id="username" name="username" class="form-control" placeholder="Enter Account" required="required" autofocus>
				<span class="glyphicon glyphicon-user form-control-feedback"></span>
			</div>
			<div class="form-group has-feedback">
			<input type="password" id="password" name="password" class="form-control" placeholder="Enter Password" required="required">
			<span class="glyphicon glyphicon-lock form-control-feedback"></span>
			</div>
			<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
			<div class="row">
<!-- 				<div class="col-md-8"> -->
<!-- 					<div class="checkbox icheck"> -->
<!-- 						<label> -->
<!-- 							<input type="checkbox"> Remember Me -->
<!-- 						</label> -->
<!-- 					</div> -->
<!-- 				</div>/.col -->
				<div class="col-md-12">
					<button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
				</div><!-- /.col -->
			</div>
		</form>
<!--         <a href="#">I forgot my password</a><br> -->
<!--         <a href="register.html" class="text-center">Register a new membership</a> -->
      </div><!-- /.login-box-body -->
    </div><!-- /.login-box -->
</body>
</html>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 공통 라이브러리 설정 -->
<%@include file="/WEB-INF/views/include/import.jsp"%>
<%@include file="/WEB-INF/views/include/importBootstrap.jsp"%>
<!-- js 파일 설정 -->
<title>Warning</title>
<script>
if(parent && parent!=this) {
	top.location.href = location.pathname;
} else {
// 	console.log("부모창 없음");
}
</script>
</head>
<body>
<div class="wrapper">
	<div class="content-wrapper content-custom">
		<!-- Main content -->
		<section class="content">
			<div class="callout callout-danger lead">
    			<h4>Warning!</h4>
    			<p>The page you requested has expired. Please login again.</p>
  			</div>	
    		<a href="<%=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()%>">
	    		<button type="button" class="btn btn-block btn-warning btn-lg">로그인 화면으로 이동</button>
   			</a>
		</section>
	</div>
</div>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="org.springframework.security.core.context.SecurityContextHolder" %>
<%@ page import="org.springframework.security.core.Authentication" %>

<%@ page import="com.lbrcrt.domain.MemberInfo" %>

<% Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	Object principal = auth.getPrincipal(); 
	String username = "";
	String name = "";
	if(principal != null && principal instanceof MemberInfo){
		username = ((MemberInfo)principal).getUsername();
		name = ((MemberInfo)principal).getName();
	}
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<!-- 공통 라이브러리 설정 -->
<%@include file="/WEB-INF/views/include/import.jsp"%>
<%@include file="/WEB-INF/views/include/importBootstrap.jsp"%>
<!-- js 파일 설정 -->
<script src="<%=request.getContextPath()%>/resources/js/home.js"></script>
<script>
/* 사용자 로그인 정보 */
var context_path = "<%=request.getContextPath()%>";
var loginIp = "<%=request.getRemoteAddr()%>";
var loginId = "<%=username%>";
var loginName = "<%=name%>";
var loginEmail= "";
/* /.사용자 로그인 정보 */
</script>
<title>LB Recruit</title>
</head>
<body class="hold-transition skin-blue sidebar-mini">
<c:url var="logoutUrl" value="/logout" /> 
	<form action="${logoutUrl}" id="logout" method="post"> 
		<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" /> 
	</form> 
	<div class="wrapper">
		<header class="main-header">
			<!-- Logo -->
			<a href="<%=request.getContextPath()%>" class="logo">
				<!-- mini logo for sidebar mini 50x50 pixels -->
				<span class="logo-mini"><b>LBH</b></span>
				<!-- logo for regular state and mobile devices -->
				<span class="logo-lg"><b>LB</b>Hunet</span>	
			</a>
			<!-- Header Navbar: style can be found in header.less -->
			<nav class="navbar navbar-static-top" role="navigation">
				<!-- Sidebar toggle button-->
				<a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
					<span class="sr-only">Toggle navigation</span>
				</a>
			</nav>
		</header>
		<!-- Left side column. contains the logo and sidebar -->
		<aside class="main-sidebar">
			<!-- sidebar: style can be found in sidebar.less -->
			<section class="sidebar">
				<!-- Sidebar user panel -->
				<div class="user-panel">
					<div class="pull-left image">
						<img src="resources/img/lbhunet_symbol.png" class="img-circle" alt="User Image">
					</div>
					<div class="pull-left info">
						<p style="text-align: center;line-height: 18px;"><%=name%> 님 (부서입력)<br><a href="#" onclick="logout();">로그아웃</a></p>
					</div>
				</div>
				
				<!-- sidebar menu: : style can be found in sidebar.less -->
				<ul class="sidebar-menu" id="ulNavSideGrp" >
					<li class="header">MAIN NAVIGATION (<%=request.getRemoteAddr()%>)</li>
					<li class="active treeview" id="temp" vuri="mainRcrt">
						<a id="mainPage" href="#">
							<i class="fa fa-home"></i> <span>Main</span>
						</a>
					</li>
					<!-- 메뉴 동적 할당 부분 : ST-->
					<li class="treeview">
					</li>
					<!-- 메뉴 동적 할당 부분 : ED-->
				</ul>
			</section>
		<!-- /.sidebar -->
		</aside>
		<!-- Content Wrapper. Contains page content -->
		<div class="content-wrapper">
		<!-- Import each page -->
		<iframe id="ifrmLoadPage" style="width:100%;height:840px;border:0;overflow:hidden;"></iframe>
		</div>
		<!-- /.content-wrapper -->
	<%@include file="/WEB-INF/views/include/footer.jsp"%>
	</div><!-- /.wrapper -->
</body>
</html>
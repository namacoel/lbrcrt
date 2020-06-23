<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<link rel="shortcut icon" href="<%=request.getContextPath()%>/resources/img/favicon.png"/>
<link rel="icon" href="<%=request.getContextPath()%>/resources/img/favicon.png"/>

<!-- 스프링 시큐리티의 csrf 방어 설정시 ajax 사용을 위해 토큰을 설정하는 부분 -->
<meta name="_csrf" content="${_csrf.token}"/>
<meta name="_csrf_header" content="${_csrf.headerName}"/>
<!-- jQuery 2.2.0 -->
<script src="<%=request.getContextPath()%>/resources/plugins/jQuery/jQuery-2.2.0.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/plugins/jQuery/jquery.oLoader.min.js"></script>

<script type="text/javascript">
	var context_path = "<%= request.getContextPath() %>";
</script>

<!-- jquery.jqGrid-4.6.0 -->
<!-- 부트스트랩와 css 충돌이 확인되어 사용 안하기로함 -->
<%-- <link rel="stylesheet" type="text/css" media="screen" href="<%=request.getContextPath()%>/resources/plugins/jquery-ui/jquery-ui.min.css">		<!-- jqUI CSS --> --%>
<%-- <link rel="stylesheet" type="text/css" media="screen" href="<%=request.getContextPath()%>/resources/plugins/jqGrid/css/ui.jqgrid.css">	<!-- jqGrid CSS --> --%>
<%-- <script src="<%=request.getContextPath()%>/resources/plugins/jqGrid/js/jquery.jqGrid.min.js"></script>			<!-- jqGrid JS --> --%>

<!-- 웹 프로젝트 공통함수 js -->
<%-- <script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/common/common.js"></script> --%>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/common/qooCommon.js"></script>
<%-- <script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/common/cmmDate.js"></script> --%>
<!-- DB 공통 처리를 위한 js -->
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/common/qooServiceCall.js" ></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/common/qooPrototype.js" ></script>
<%-- <script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/common/cmmAjaxCall.js" ></script>	 --%>
<!-- 웹 프로젝트 공통 CSS -->
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/common/qooCommon.css">
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">


<!-- AdminLTE2 관련 라이브러리 -->
<!-- Tell the browser to be responsive to screen width -->
<!-- 아래 부분은 용도 파악 전까지 주석처리 2016.03.29 -->
<!-- <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport"> -->

<!-- Bootstrap 3.3.6 -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/bootstrap/css/bootstrap.min.css">
<script src="<%=request.getContextPath()%>/resources/bootstrap/js/bootstrap.min.js"></script>

<!-- Font Awesome -->
<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css"> -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/font-awesome-4.6.3/css/font-awesome.min.css">
<!-- Ionicons -->
<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css"> -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/css/common/ionicons.min.css">
<!-- DataTables -->
<!-- <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/plugins/datatables/jquery.dataTables.min.css"> -->
<!-- jvectormap -->
<%-- <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/plugins/jvectormap/jquery-jvectormap-1.2.2.css"> --%>
<!-- Theme style -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/dist/css/AdminLTE.min.css">
<!-- AdminLTE Skins. Choose a skin from the css/skins
     folder instead of downloading all of them to reduce the load. -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/dist/css/skins/_all-skins.min.css">

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->


<!-- DataTables 1.10.15 -->
<!-- datatable 폴더 복사했는데 페이지 로딩시 404떠서 열받음.. 지금은 잘됨.20170717 -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/plugins/datatables/media/css/jquery.dataTables.min.css">
<script src="<%=request.getContextPath()%>/resources/plugins/datatables/media/js/jquery.dataTables.min.js"></script>

<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/plugins/datatables/extensions/FixedColumns/css/fixedColumns.dataTables.min.css">
<script src="<%=request.getContextPath()%>/resources/plugins/datatables/extensions/FixedColumns/js/dataTables.fixedColumns.min.js"></script>

<!-- DataTables Select 1.2.2 -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/plugins/datatables/extensions/Select/css/select.dataTables.min.css">
<script src="<%=request.getContextPath()%>/resources/plugins/datatables/extensions/Select/js/dataTables.select.min.js"></script>
<!-- DataTables Buttons 1.3.1 -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/plugins/datatables/extensions//Buttons/css/buttons.dataTables.min.css">
<script src="<%=request.getContextPath()%>/resources/plugins/datatables/extensions/Buttons/js/dataTables.buttons.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/plugins/datatables/extensions/Buttons/js/buttons.html5.min.js"></script>
<script src="<%=request.getContextPath()%>/resources/plugins/jszip\jszip.min.js"></script>



<!-- FastClick -->
<%-- <script src="<%=request.getContextPath()%>/resources/plugins/fastclick/fastclick.js"></script> --%>
<!-- AdminLTE App -->
<script src="<%=request.getContextPath()%>/resources/dist/js/app.min.js"></script>
<!-- Sparkline -->
<%-- <script src="<%=request.getContextPath()%>/resources/plugins/sparkline/jquery.sparkline.min.js"></script> --%>
<!-- jvectormap -->
<%-- <script src="<%=request.getContextPath()%>/resources/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script> --%>
<%-- <script src="<%=request.getContextPath()%>/resources/plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script> --%>
<!-- SlimScroll 1.3.0 -->
<%-- <script src="<%=request.getContextPath()%>/resources/plugins/slimScroll/jquery.slimscroll.min.js"></script> --%>
<!-- ChartJS 1.0.1 -->
<%-- <script src="<%=request.getContextPath()%>/resources/plugins/chartjs/Chart.min.js"></script> --%>

<!-- 하기 2개는 데모용이므로 주석처리함 -->
<!-- dashboard2.js는 주석 처리 하지 않으면 스크립트 에러남 -->
<!-- 에러 : Uncaught TypeError: Cannot read property 'getContext' of undefined -->
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<%-- <script src="<%=request.getContextPath()%>/resources/dist/js/pages/dashboard2.js"></script> --%>
<!-- AdminLTE for demo purposes -->
<%-- <script src="<%=request.getContextPath()%>/resources/dist/js/demo.js"></script> --%>

<!-- /.AdminLTE2 관련 라이브러리 -->
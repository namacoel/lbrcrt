<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 공통 라이브러리 설정 -->
<%@include file="/WEB-INF/views/include/import.jsp"%>
<!-- js 파일 설정 -->
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/employment/photoPopup.js"></script>
<link rel="stylesheet" type="text/css" href="/resources/css/common/common.css">
<title>사진 등록/수정</title>
<style>
body {
	background: #fafafa
}
table {
	height: 140px;
}
th, td {
	text-align: center;
	vertical-align: middle !important;
}
</style>
</head>
<body>

<div>
	<div>
		<div style="float: left; width: 25%;">
			<img id="fileName" style="width:118px;height:157px">
		</div>
		<div style="float: left; width: 74%;">
			<table>
				<tr>
					<th>사진크기(권장)</th>
					<th>파일형식</th>
					<th>파일용량</th>
				</tr>
				<tr>
					<td>118 x 157(픽셀)</td>
					<td>JPG, GIF, PNG</td>
					<td>1Mb 이하</td>
				</tr>
				<tr>
					<td colspan="3">
						파일선택 버튼을 클릭하고, 사진 파일(JPG, GIF, PNG)을 선택합니다.
					</td>
				</tr>
				<tr>
					<td colspan="3">
					<input type="file" id="file">
					<input type="button" id="btnInsertFile" value="등록">
					<input type="button" id="btnDeleteFile" value="삭제">
					</td>
				</tr>
			</table>
		</div>
	</div>
</div>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<!-- 공통 라이브러리 설정 -->
<%@include file="/WEB-INF/views/include/import.jsp"%>
<%@include file="/WEB-INF/views/include/importBootstrap.jsp"%>

<link rel="stylesheet" type="text/css" href="resources/css/common/common.css">
<style>

table.table-common th {
    vertical-align: middle;
    text-align: center;
    background: #F9F9F9;
    border: 1px solid #ccc;
	line-height: 1.82857143;
    color: #333;
    font-size: 15px;
}
table.table-common td {
    padding: 10px;
    vertical-align: middle;
    border: 1px solid #ccc;
    font-size: 14px;
}
</style>
<title>Main</title>
</head>

<body>
<div class="wrapper">
	<div class="content-wrapper content-custom">
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1><small>.</small></h1>
		</section>
		<section class="content" style="padding-bottom:0px">
			<div class="row">
			<div class="col-md-12">
					<div class="box box-primary">
<!-- main page..... -->
<table class="table-common" style="width: 1200px">
	<tr style="height: 70px">
		<th style="width: 180px">구분</th>
		<th>Asis</th>
		<th>Tobe</th>
		<th style="width: 200px">비고</th>
	</tr>
	<tr style="height: 100px">
		<th>시스템</th>
		<td>- 엑셀 개별 관리</td>
		<td>- 데이터 통합, 동시 접근</td>
		<td></td>
	</tr>
	<tr style="height: 100px">
		<th>지원자 등록</th>
		<td>
			- 년도/프로젝트 별 파일 관리<br><br>
			- 정합성 미보장<br><br>
			- 블랙리스트 및 중복지원 조회<br><br>
		</td>
		<td>
			- 사이트에서 바로 등록<br><br>
			- 데이터 정합성 보장()<br><br>
			- 지원자 입력시 중복자 바로 조회 및 블랙리스트 구분<br><br>
		</td>
		<td>2015년~2016 DB 저장	</td>
	</tr>
	<tr style="height: 100px">
		<th>지원자 조회</th>
		<td>
			- 년도/프로젝트 별 파일 검색<br><br>
			- 동시 접근 불가</td>
		<td>
			- DBMS에서 검색<br><br>
			- 동시 접근 가능</td>
		<td></td>
	</tr>
	<tr style="height: 100px">
		<th>통계</th>
		<td>- 지원자 파일 참고하여 수작업 진행</td>
		<td>- 지원자 정보 갱신만으로 통계 데이터 갱신</td>
		<td></td>
	</tr>
	<tr style="height: 100px">
		<th>기타</th>
		<td></td>
		<td>
			- 팩트 북(이병철)<br><br>
			- 채용 통계<br><br>
			- 주간 통계<br><br>
			- 일괄 저장 기능<br><br>
		</td>
		<td></td>
	</tr>
</table>
</div>
</div>
	</div>
		</section>
	</div>
</div>
</body>
</html>
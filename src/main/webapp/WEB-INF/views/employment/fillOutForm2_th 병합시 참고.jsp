<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<!-- 공통 라이브러리 설정 -->
	<%@include file="/WEB-INF/views/include/import.jsp"%>
	<!-- js 파일 설정 -->
	<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/home.js"></script>
	<title>입사지원서 작성</title>

<style>
th {
	width: 90px;
	text-align: center;
}
.tdTitle {
	padding:0px;
	width: 20px;
	font-size: 17px;
	height:40px;
	vertical-align: middle;
}
</style>

</head>
<body class="hold-transition skin-blue sidebar-mini">
<div>
	<!-- Content Wrapper. Contains page content -->
	<div style="background-color: #ecf0f5;">
	<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>입사지원서 작성<small>하기 내용을 작성하세요</small></h1>
		</section>
		
		<section class="content">
			<div class="row">
				<div class="col-md-12">
					<div class="box box-primary">
						<div class="box-body table-responsive no-padding">
							<table class="table table-bordered">
								<tr>
									<th rowspan="5">
										<img style="width:113px;height:151px" src="">
										<input type="button" value="첨부">
									</th>
									<th rowspan="2">성<br>명</th>
									<th>한글</th>
									<td></td>
									<th>성별</th>
									<td></td>
									<th>나이</th>
									<td></td>
								</tr>
								<tr>
									<th>영문</th>
									<td></td>
									<th>주민번호</th>
									<td colspan="3"></td>
								</tr>
								<tr>
									<th colspan="2">휴대폰</th>
									<td></td>
									<th>결혼여부</th>
									<td></td>
									<th>보훈대상</th>
									<td></td>
								</tr>
								<tr>
									<th colspan="2">자택번호</th>
									<td></td>
									<th>email</th>
									<td colspan="3"></td>
								</tr>
								<tr>
									<th colspan="2">현주소</th>
									<td colspan="5"></td>
								</tr>						
							</table>
						</div><!-- /.box-body -->
					</div><!-- /.box -->
				</div><!-- /.col -->
			</div><!-- /.row -->
			<div class="row">
				<div class="col-md-12">
					<div class="box box-primary">
						<div class="box-body no-padding">
							<table class="table table-bordered" >
								<tr>
									<td class="tdTitle" rowspan="4">학력사항</td>
									<th>재학기간</th>
									<th>출신학교</th>
									<th>전공학과</th>
									<th>소재지</th>
									<th>졸업여부</th>
								</tr>
								<tr>
									<td>테스트1</td>
									<td>테스트2</td>
									<td>테스트3</td>
									<td>테스트4</td>
									<td>테스트5</td>
								</tr>
								<tr>
									<td>테스트1</td>
									<td>테스트2</td>
									<td>테스트3</td>
									<td>테스트4</td>
									<td>테스트5</td>
								</tr>
								<tr>
									<td>테스트1</td>
									<td>테스트2</td>
									<td>테스트3</td>
									<td>테스트4</td>
									<td>테스트5</td>
								</tr>
							</table>
						</div><!-- box-body -->
					</div><!-- ./box -->
				</div><!-- ./col -->
			</div><!-- ./row -->
			<div class="row">
				<div class="col-md-12">
					<div class="box box-primary">
						<div class="box-body no-padding">
							<table class="table table-bordered" >
								<tr>
									<th rowspan="3">경<br>력<br>사<br>항</th>
									<th>회사명</th>
									<th>근무기간</th>
									<th>직위</th>
									<th>담당업무</th>
									<th>월급여</th>
									<th>퇴직사유</th>
								</tr>
								<tr>
									<td>테스트1</td>
									<td>테스트2</td>
									<td>테스트3</td>
									<td>테스트4</td>
									<td>테스트5</td>
									<td>테스트5</td>
								</tr>
								<tr>
									<td>테스트1</td>
									<td>테스트2</td>
									<td>테스트3</td>
									<td>테스트4</td>
									<td>테스트5</td>
									<td>테스트5</td>
								</tr>
							</table>
						</div><!-- box-body -->
					</div><!-- ./box -->
				</div><!-- ./col -->
			</div><!-- ./row -->
			<div class="row">
				<div class="col-md-12">
					<div class="box box-primary">
						<div class="box-body no-padding">
							<table class="table table-bordered" >
								<tr>
									<th rowspan="4">가<br>족<br>관<br>계</th>
									<th>관계</th>
									<th>성명</th>
									<th>연령</th>
									<th>학력</th>
									<th>근무처 및 직위</th>
									<th>연락처</th>
									<th>동거여부</th>
								</tr>
								<tr>
									<td>테</td>
									<td>테스트2</td>
									<td>테스트3</td>
									<td>테스트4</td>
									<td>테스트4</td>
									<td>테스트4</td>
									<td>테스트5</td>
								</tr>
								<tr>
									<td>테</td>
									<td>테스트2</td>
									<td>테스트3</td>
									<td>테스트4</td>
									<td>테스트4</td>
									<td>테스트4</td>
									<td>테스트5</td>
								</tr>
								<tr>
									<td>테</td>
									<td>테스트2</td>
									<td>테스트3</td>
									<td>테스트4</td>
									<td>테스트4</td>
									<td>테스트4</td>
									<td>테스트5</td>
								</tr>
							</table>
						</div><!-- box-body -->
					</div><!-- ./box -->
				</div><!-- ./col -->
			</div><!-- ./row -->
			<div class="row">
				<div class="col-md-12">
					<div class="box box-primary">
						<div class="box-body no-padding">
							<table class="table table-bordered" >
								<tr>
									<th rowspan="3">면<br>허<br>자<br>격</th>
									<th>면허/자격(등급)</th>
									<th>발행기관</th>
									<th>취득년월</th>
									<th rowspan="3">외국어<br>능력</th>
									<th>시험명</th>
									<th>점수(등급)</th>
									<th>취득년월</th>
								</tr>
								<tr>
									<td>테스트1</td>
									<td>테스트2</td>
									<td>테스트3</td>
									<td>테스트4</td>
									<td>테스트4</td>
									<td>테스트5</td>
								</tr>
								<tr>
									<td>테스트1</td>
									<td>테스트2</td>
									<td>테스트3</td>
									<td>테스트4</td>
									<td>테스트5</td>
									<td>테스트5</td>
								</tr>
							</table>
						</div><!-- box-body -->
					</div><!-- ./box -->
				</div><!-- ./col -->
			</div><!-- ./row -->
			<div class="row">
				<div class="col-md-12">
					<div class="box">
						<div class="box-body no-padding">
							<table class="table table-bordered" >
								<tr>
									<th>군필</th>
									<td>빈값</td>
									<th>계급</th>
									<td>빈값</td>
									<th>면제사유</th>
									<td>빈값</td>
									<th>장애등록여부</th>
									<td>빈값</td>
								</tr>
								<tr>
									<th>군별</th>
									<td>빈값</td>
									<th>병과</th>
									<td>빈값</td>
									<th>복무기간</th>
									<td>빈값</td>
									<th>장애급수</th>
									<td>빈값</td>
								</tr>
								<tr>
									<th>특기사항</th>
									<td colspan="7">빈값</td>
								</tr>
							</table>
						</div><!-- box-body -->
					</div><!-- ./box -->
				</div><!-- ./col -->
			</div><!-- ./row -->
		</section>
		
		
	</div><!-- /.content-wrapper -->
</div><!-- ./wrapper -->
</body>
</html>
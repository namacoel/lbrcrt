<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 공통 라이브러리 설정 -->
<%@include file="/WEB-INF/views/include/import.jsp"%>
<%@include file="/WEB-INF/views/include/importBootstrap.jsp"%>
<!-- js 파일 설정 -->
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/employment/fillOutForm.js"></script>
<title>입사지원서 작성</title>
</head>
<body class="hold-transition skin-blue sidebar-mini">
<div>
	<!-- Content Wrapper. Contains page content -->
	<div style="background-color: #ecf0f5;">
	<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>입사지원서 작성</h1>
			<h5>사진, 학력, 경력, 자격사항, 가족사항은 변경 즉시 저장됩니다.</h5>
		</section>
		<section class="content">
			<div class="row">
				<div class="col-md-12">
					<div class="box box-primary">
						<div class="box-body no-padding">
							<table class="table table-bordered">
								<tr>
									<td rowspan="6" style="text-align: center;">
										<img id="aplcntPhotoNm" style="width:118px;height:157px"><br>
										<input type="button" id="btnFilePopup" value="선택">
										
									</td>
									<th>성 명</th>
									<td colspan="3">
										<table>
											<tr>
												<th>한글</th>
												<td><input type="text" id="korName"></td>
												<th>한자</th>
												<td><input type="text" id="chnName"></td>
												<th>영문</th>
												<td><input type="text" id="engName"></td>
											</tr>
										</table>
									</td>
								</tr>
								<tr>
									<th>생년월일</th>
									<td><input type="text" id="ihidnum"></td>
									<th>성별</th>
									<td>주민번호7자리 받아서 처리하기</td>
								<tr>
									<th>주소</th>
									<td colspan="3">
										<input type="text" id="addr1">&nbsp;
										<input type="text" id="addr2">
									</td>
								</tr>
								<tr>
									<th>휴대폰</th>
									<td><input type="text" id="mobilenum"></td>
									<th>전화번호</th>
									<td><input type="text" id="phonenum"></td>
								<tr>
									<th>이메일</th>
									<td><input type="text" id="email"></td>
									<th>장애유무</th>
									<td>
										<div class="form-group">
											<label>
												<input type="radio" name="disabledSttsCd" value="N" checked>무
											</label>
											<label>
												<input type="radio" name="disabledSttsCd" value="Y">유
											</label>
                      					</div>
									</td>
								</tr>
								<tr>
									<th>보훈대상</th>
									<td>
										<div class="form-group">
											<label>
												<input type="radio" name="bohunSttsCd" value="N" checked>비대상
											</label>
											<label>
												<input type="radio" name="bohunSttsCd" value="Y">대상
											</label>
										</div>
									</td>
									<th>결혼유무</th>
									<td>
										<div class="form-group">
											<label>
												<input type="radio" name="maritalSttsCd" value="N" checked>미혼
											</label>
											<label>
												<input type="radio" name="maritalSttsCd" value="Y">기혼
											</label>
                      					</div>
                      				</td>
								</tr>
							</table>
						</div><!-- /.box-body -->
					</div><!-- /.box -->
				</div><!-- /.col -->
			</div><!-- /.row -->
			<div class="row">
				<div class="col-md-12">
					<div class="box box-primary">
						<div class="box-header">
							<h3 class="box-title">학력</h3>
						</div><!-- /.box-header -->
						<div class="box-body no-padding">
							<table class="table table-bordered">
								<colgroup>
									<col width="20%">
									<col width="20">
									<col width="20%">
									<col width="10%">
									<col width="20%">
									<col width="10%">
								</colgroup>
								<tr>
									<th>재학기간</th>
									<th>출신학교</th>
									<th>전공</th>
									<th>졸업여부</th>
									<th>소재지</th>
									<th></th>
								</tr>
								<tbody id="tbdSchoolAdd">
									<tr data-idx="">
										<td>
											<select id="schoolSyear"></select>년
											<select id="schoolSmonth"></select>월~
											<select id="schoolEyear"></select>년
											<select id="schoolEmonth"></select>월
										</td>
										<td>
											<input type="text" id="schoolName">
										</td>
										<td>
											<input type="text" id="schoolMajor">
										</td>
										<td>
											<select id="schoolSttsCd">
											</select>
										</td>
										<td>
											<input type="text" id="schoolLoc">
										</td>
										<td>
											<input type="button" id="btnAddSchool" value="추가">
											<input type="button" id="btnCancelSchool" value="취소">
										</td>
									</tr>
								</tbody>
							</table>
							<table class="table table-bordered">
								<colgroup>
									<col width="20%">
									<col width="20">
									<col width="20%">
									<col width="10%">
									<col width="20%">
									<col width="10%">
								</colgroup>
								<tbody id="tbdSchoolList">
								</tbody>
							</table>
						</div><!-- box-body -->
					</div><!-- ./box -->
				</div><!-- ./col -->
			</div><!-- ./row -->
			<div class="row">
				<div class="col-md-12">
					<div class="box box-primary">
						<div class="box-header">
							<h3 class="box-title">경력</h3>
						</div><!-- /.box-header -->
						<div class="box-body no-padding">
							<table class="table table-bordered">
								<colgroup>
									<col width="20%">
									<col width="20">
									<col width="10%">
									<col width="10%">
									<col width="10%">
									<col width="20%">
									<col width="10%">
								</colgroup>
								<tr>
									<th>근무기간</th>
									<th>회사명</th>
									<th>직위</th>
									<th>담당업무</th>
									<th>월급여</th>
									<th>사직사유</th>
									<th></th>
								</tr>
								<tbody id="tbdCompanyAdd">
									<tr>
										<td>
											<select id="companySyear"></select>년
											<select id="companySmonth"></select>월~
											<select id="companyEyear"></select>년
											<select id="companyEmonth"></select>월
										</td>
										<td>
												<input type="text" id="companyName">
											</td>
											<td>
												<select id="companyPosCd">
												</select>
											</td>
											<td>
												<input type="text" id="companyDept">
											</td>
											<td>
												<input type="text" id="companySal">만원
											</td>
											<td>
												<input type="text" id="companyResiRsn">
											</td>
											<td>
												<input type="button" id="btnAddCompany" value="추가">
												<input type="button" id="btnCancelCompany" value="취소">
											</td>
									</tr>
								</tbody>
							</table>
							<table class="table table-bordered">
								<colgroup>
									<col width="20%">
									<col width="20">
									<col width="10%">
									<col width="10%">
									<col width="10%">
									<col width="20%">
									<col width="10%">
								</colgroup>
								<tbody id="tbdCompanyList">
								</tbody>
							</table>
						</div><!-- box-body -->
					</div><!-- ./box -->
				</div><!-- ./col -->
			</div><!-- ./row -->
			<div class="row">
				<div class="col-md-12">
					<div class="box box-primary">
						<div class="box-header">
							<h3 class="box-title">기타사항</h3>
						</div><!-- /.box-header -->
						<div class="box-body no-padding">
							<table class="table table-bordered">
								<tr>
									<th rowspan="3">외<br>국<br>어</th>
									<th>영어</th>
									<td><select id="engLvCd"></select></td>
									<th rowspan="3">OA<br>활<br>용</th>
									<th>Excel</th>
									<td><select id="excelLvCd"></select></td>
									<th>특기</th>
									<td><input type="text" id="specialty"></td>
									<th rowspan="3">병<br>역</th>
									<th>병역구분</th>
									<td><select id="milDischargedCd"></select></td>
									<th>병과</th>
									<td><input type="text" id="milServ"></td>
								</tr>
								<tr>
									<th>일어</th>
									<td><select id="jpnLvCd"></select></td>
									<th>PPT</th>
									<td><select id="pptLvCd"></select></td>
									<th>취미</th>
									<td><input type="text" id="hobby"></td>
									<th>복무기간</th>
									<td>
										<select id="milSyear"></select>년
										<select id="milSmonth"></select>월
										<br>~
										<select id="milEyear"></select>년
										<select id="milEmonth"></select>월
									</td>
									<th>계급</th>
									<td><select id="milRankCd"></select></td>
								</tr>
								<tr>
									<th><input type="text" id="etclang" placeholder="기타언어"></th>
									<td><select id="etclangLvCd"></select></td>
									<th>타자수</th>
									<td><input type="text" id="typingSpd">타</td>
									<th>종교</th>
									<td><input type="text" id="religion"></td>
									<th>면제사유</th>
									<td colspan="3"><input type="text" id="exemptionRsn"></td>
								</tr>
							</table>
						</div><!-- box-body -->
					</div><!-- ./box -->
				</div><!-- ./col -->
			</div><!-- ./row -->
			<div class="row">
				<div class="col-md-12">
					<div class="box box-primary">
						<div class="box-header">
							<h3 class="box-title">자격사항</h3>
						</div><!-- /.box-header -->
						<div class="box-body no-padding">
							<table class="table table-bordered">
								<colgroup>
									<col width="*">
									<col width="40%">
									<col width="10%">
								</colgroup>
								<tr>
									<th>종류</th>
									<th>취득일자</th>
									<th></th>
								</tr>
								<tbody id="tbdCertiAdd">
									<tr>
										<td><input type="text" id="certiName"></td>
										<td>
											<select id="certiYear"></select>년
											<select id="certiMonth"></select>월
										</td>
										<td>
											<input type="button" id="btnAddCerti" value="추가">
											<input type="button" id="btnCancelCerti" value="취소">
										</td>
									</tr>
								</tbody>
							</table>
							<table class="table table-bordered">
								<colgroup>
									<col width="*">
									<col width="40%">
									<col width="10%">
								</colgroup>
								<tbody id="tbdCertiList">
								</tbody>
							</table>
						</div><!-- box-body -->
					</div><!-- ./box -->
				</div><!-- ./col -->
			</div><!-- ./row -->
			<div class="row">
				<div class="col-md-12">
					<div class="box box-primary">
						<div class="box-header">
							<h3 class="box-title">가족사항</h3>
						</div><!-- /.box-header -->
						<div class="box-body no-padding">
							<table class="table table-bordered">
								<colgroup>
									<col width="10%">
									<col width="*">
									<col width="20%">
									<col width="20%">
									<col width="10%">
									<col width="10%">
								</colgroup>
								<tr>
									<th>관계</th>
									<th>성명</th>
									<th>연령</th>
									<th>근무처</th>
									<th>동거여부</th>
									<th></th>
								</tr>
								<tbody id="tbdFamAdd">
									<tr>
										<td><input type="text" id="famRelations"></td>
										<td><input type="text" id="famName"></td>
										<td><input type="text" id="famAge"></td>
										<td><input type="text" id="famJob"></td>
										<td>
											<div class="form-group">
												<label>
													<input type="checkbox" class="minimal" id="famTogetherSttsCd">
												</label>
											</div>
										</td>
										<td>
											<input type="button" id="btnAddFam" value="추가">
											<input type="button" id="btnCancelFam" value="취소">
										</td>
									</tr>
								</tbody>
							</table>
							<table class="table table-bordered">
								<colgroup>
									<col width="10%">
									<col width="*">
									<col width="20%">
									<col width="20%">
									<col width="10%">
									<col width="10%">
								</colgroup>
								<tbody id="tbdFamList">
								</tbody>
							</table>
						</div><!-- box-body -->
					</div><!-- ./box -->
				</div><!-- ./col -->
			</div><!-- ./row -->
			<div class="callout callout-info lead">
				<p>
					<input type="checkbox" id="factAgrmntCd" value="Y">
					상기의 기재사항은 사실과 틀림없음을 확인합니다.(필수)
					<br>작성일 년 월 일 (화) / 작성자 : 관리자
				</p> 
			</div>
				<input type="button" id="btnSavePreview" value="저장 후 미리보기">
		</section>
	</div><!-- /.content-wrapper -->
</div><!-- ./wrapper -->
</body>
</html>
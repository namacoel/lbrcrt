<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<!-- 공통 라이브러리 설정 -->
	<%@include file="/WEB-INF/views/include/import.jsp"%>
	<!-- js 파일 설정 -->
	<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/employment/fillOutFormPreview.js"></script>
	<link rel="stylesheet" type="text/css" href="/resources/css/common/fillOutFormPreview.css">
	
	<title>입사지원서 미리보기</title>
		
</head>
<body>
<div id="divHide">
	<input type="button" id ="btnPrint" value="인쇄">
	<input type="button" id ="btnClose" value="닫기">
</div>
<div id="printArea">
	<section class="content">
		<div class="item-contents margin-bottom10">
			<table class="noborder">
				<tr>
					<td class="noborder font-title"><b>입 사 지 원 서</b></td>
				</tr>
			</table>
			<br>
			<table>
				<colgroup>
					<col width="*">
					<col width="13%">
					<col width="27%">
					<col width="13%">
					<col width="27%">
				</colgroup>
				<tr>
					<td rowspan="6"><img id="aplcntPhotoNm" style="width:118px;height:157px" src=""></td>
					<th>성&nbsp;&nbsp;&nbsp;&nbsp;명</th>
					<td colspan="3"><input type="text" id="allName" style="text-align:left;margin-left:10px;"></td>
				</tr>
				<tr>
					<th>생년월일</th>
					<td><input type="text" id="ihidnum"></td>
					<th>성&nbsp;&nbsp;&nbsp;&nbsp;별</th>
					<td>주민번호7자리 받아서 처리하기</td>
				<tr>
					<th>주&nbsp;&nbsp;&nbsp;&nbsp;소</th>
					<td colspan="3"><input type="text" id="fullAddr"></td>
				</tr>
				<tr>
					<th>휴 대 폰</th>
					<td><input type="text" id="mobilenum"></td>
					<th>전화번호</th>
					<td><input type="text" id="phonenum"></td>
				<tr>
					<th>이 메 일</th>
					<td><input type="text" id="email"></td>
					<th>장애유무</th>
					<td><input type="text" id="disabledSttsCd"></td>
				</tr>
				<tr>
					<th>보훈대상</th>
					<td><input type="text" id="bohunSttsCd"></td>
					<th>결혼유무</th>
					<td><input type="text" id="maritalSttsCd"></td>
				</tr>
			</table>
		</div><!-- /.box -->
		<div class="item-contents margin-bottom10">
			<table id="tbdSchoolList">
			</table>
		</div>
		<div class="item-contents margin-bottom10">
			<table id="tbdCompanyList">
			</table>
		</div><!-- box-body -->
		<div class="item-contents margin-bottom10">
			<table>
				<colgroup>
					<col width="20px">
					<col width="50px">
					<col width="50px">
					<col width="20px">
					<col width="50px">
					<col width="50px">
					<col width="50px">
					<col width="80px">
					<col width="20px">
					<col width="70px">
					<col width="*">
					<col width="50px">
					<col width="60px">
				</colgroup>
				<tr>
					<th rowspan="3">외 국 어</th>
					<th>영어</th>
					<td><input type="text" id="engLvCd"></td>
					<th rowspan="3">OA활용</th>
					<th>Excel</th>
					<td><input type="text" id="excelLvCd"></td>
					<th>특기</th>
					<td><input type="text" id="specialty"></td>
					<th rowspan="3">병역</th>
					<th>병역구분</th>
					<td><input type="text" id="milDischargedCd"></td>
					<th>병과</th>
					<td><input type="text" id="milServ"></td>
				</tr>
				<tr>
					<th>일어</th>
					<td><input type="text" id="jpnLvCd"></td>
					<th>PPT</th>
					<td><input type="text" id="pptLvCd"></td>
					<th>취미</th>
					<td><input type="text" id="hobby"></td>
					<th>복무기간</th>
					<td><input type="text" id="milPeriod" style="font-size:8px;"></td>
					<th>계급</th>
					<td><input type="text" id="milRankCd"></td>
				</tr>
				<tr>
					<th id="etclang"></th>
					<td><input type="text" id="etclangLvCd"></td>
					<th>타자수</th>
					<td><input type="text" id="typingSpd"></td>
					<th>종교</th>
					<td><input type="text" id="religion"></td>
					<th>면제사유</th>
					<td colspan="3"><input type="text" id="exemptionRsn"></td>
				</tr>
			</table>
		</div><!-- box-body -->
		<div class="item-contents margin-bottom10">
			<table class="noborder">
				<tr>
					<td class="noborder td-vtop">
						<table class="table-fam" id="tbdFamList">
						</table>
					</td>
					<td class="noborder td-vtop">
						<table class="table-certi" id="tbdCertiList">
						</table>
					</td>
				</tr>
			</table>
		</div><!-- box-body -->
		<div class="item-contents margin-bottom10">
			<table class="noborder">
				<tr>
					<td class="noborder margin-bottom10">
						<b>상기의 기재사항은 사실과 틀림없음을 확인합니다.</b>
					</td>
				</tr>
				<tr>
					<td class="noborder" id="signature"></td>
				</tr>
			</table>
		</div>
	</section>

</div><!-- /.preview Wrapper -->
</body>
</html>
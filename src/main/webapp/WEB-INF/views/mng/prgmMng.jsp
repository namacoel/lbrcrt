<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- 공통 라이브러리 설정 -->
<%@include file="/WEB-INF/views/include/import.jsp"%>
<!-- js 파일 설정 -->
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/mng/prgmMng.js"></script>
<link rel="stylesheet" type="text/css" href="/resources/css/common/common.css">
<title>프로그램 관리</title>
</head>
<body>
<table>
	<tr>
		<td colspan="2">
			<table>
				<tr>
					<td>프로그램 그룹</td>
					<td>
						<select id="srchPrgmGrpId">
							<option value="">선택</option>
						</select>
					</td>
					<td>프로그램명</td>
					<td>
						<input type="text" id="srchPrgmNm">
					</td>
					<td>사용여부</td>
					<td>
						<select id="srchUseYn">
							<option value="">선택</option>
						</select>
					</td>
					<td>
						<input type="button" id="btnSrch" value="조회">
					</td>
					
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table class="table-list" id="tblListMain">
				<tr>
					<th>그룹명</th>
					<th>프로그램ID</th>
					<th>프로그램명</th>
					<th>레벨</th>
					<th>URI</th>
				</tr>
				<tbody id="tbdListMain">
					<tr>
						<td colspan="5">표시 할 내용이 없습니다.</td>
					</tr>
				</tbody>
			</table>
		</td>
		<td>
			<table id="tblDtlMain">
				<tr>
					<th>프로그램ID</th>
					<td>
						<input type="text" id="txtPrgmId">
					</td>
				</tr>
				<tr>
					<th>프로그램명</th>
					<td>
						<input type="text" id="txtPrgmNm">
					</td>
				</tr>
				<tr>
					<th>상위프로그램</th>
					<td>
						<select id="slctUpperPrgmId">
							<option value="">선택</option>
						</select>
					</td>
				</tr>
				<tr>
					<th>그룹</th>
					<td>
						<select id="slctPrgmGrpId">
							<option value="">선택</option>
						</select>
					</td>
				</tr>
				<tr>
					<th>URI</th>
					<td>
						<input type="text" id="txtPrgmUri">
					</td>
				</tr>
				<tr>
					<th>정렬순서</th>
					<td>
						<input type="text" id="txtSortOrder">
					</td>
				</tr>
				<tr>
					<th>사용여부</th>
					<td>
						<select id="slctUseYn">
							<option value="">선택</option>
						</select>
					</td>
				</tr>
				<tr>
					<th>등록자</th>
					<td>
						<input type="text" id="txtCreatorId">
					</td>
				</tr>
				<tr>
					<th>등록일시</th>
					<td>
						<input type="text" id="txtCreatedDt">
					</td>
				</tr>
				<tr>
					<th>수정자</th>
					<td>
						<input type="text" id="txtModifierId">
					</td>
				</tr>
				<tr>
					<th>수정일시</th>
					<td>
						<input type="text" id="txtModifiedDt">
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<input type="button" id="btnNew" value="신규">
						<input type="button" id="btnSave" value="저장">
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>

</body>
</html>
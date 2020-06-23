<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<!-- 공통 LIB  설정 : ST -->
<%@include file="/WEB-INF/views/include/import.jsp"%>
<%@include file="/WEB-INF/views/include/importBootstrap.jsp"%>
<script src="<%=request.getContextPath()%>/resources/plugins/jQuery/xlsx.full.min.js"></script>


<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/test/testExcelUpload.js"></script>
<!-- 공통 LIB  설정 : ED -->
<style>
/* body {margin: 10px} */


.filebox input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    /* margin: -1px; */
    overflow: hidden;
    clip:rect(0,0,0,0);
    border: 0;
}

.filebox label {
    display: inline-block;
    padding: .5em .75em;
    color: #999;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    background-color: #fdfdfd;
    cursor: pointer;
    border: 1px solid #ebebeb;
    border-bottom-color: #e2e2e2;
    border-radius: .25em;
    margin: 0 !important;
}

/* named upload */
.filebox .upload-name {
    display: inline-block;
    padding: .5em .75em;
    font-size: inherit;
    font-family: inherit;
    line-height: normal;
    vertical-align: middle;
    background-color: #f5f5f5 !important;
    border: 1px solid #ebebeb;
    border-bottom-color: #e2e2e2;
    border-radius: .25em;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.filebox.bs3-primary label {
  color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
}

</style>

<title>테스트 화면</title>
</head>
<body>

<div class="content-wrapper content-custom">
    <section class="content-header">
        <h1>테스트 엑셀 업로드<small style="color:red">데이터를 확인 해주세요.</small></h1>
    </section>
    <section class="content" style="padding-bottom:0px">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <div class="input-group">
                            <div class="filebox bs3-primary">
                            
                           	<!-- 참고 form태그 사용안하고 file타입을 forData에 직접 넣을 수도 있음  -->
                           	<!-- formData.append("uploadfile",$("input[name=uploadfile]")[0].files[0]); -->
                            <form name="formUpload" id="formUpload">
                         		<input id="uploadName" class="upload-name" value="" disabled="disabled">
                            	<!-- 중요!! file 엘리먼트에 name 안 써주면 formdata에서 확인이 안된다. -->
                                <input type="file" id="excelFile" name="excelFile" class="upload-hidden">      
                                <div class="btn-group">
                                	<button class="btn btn-danger" id="btnFileUpload">파일선택</button>
                                </div>
                            </form>

                            </div>
                        </div>
                    </div>
                    <div class="box-body">
                        <div class="box-header" style="padding:0px;">
                            <span class="btn btn-block btn-primary btn-sm">업로드 대상 목록<span id="totalCount1"></span></span>
                        </div>
                        <div id="div_gridList1">
                            <table id="gridList1" class="display compact row-border" style="width:100%"></table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </section>
</div>




</div>
</div>
</body>
</html>
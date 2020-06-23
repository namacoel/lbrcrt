<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<!-- 공통 LIB  설정 : ST -->
<%@include file="/WEB-INF/views/include/import.jsp"%>
<%@include file="/WEB-INF/views/include/importBootstrap.jsp"%>
<script src="<%=request.getContextPath()%>/resources/plugins/jQuery/xlsx.full.min.js"></script>


<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/employment/emplUpload.js"></script>
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

<title>테스트 페이지</title>
</head>
<body>

<div class="content-wrapper content-custom">
    <section class="content-header">
        <h1>지원자 엑셀 등록<small style="color:red">필수값이 아닌 값을 미입력시 기본값이나 공백으로 치환됩니다.</small></h1>
    </section>
    <section class="content" style="padding-bottom:0px">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <div class="input-group">
                            <div class="filebox bs3-primary">
                                    
                                <input id="uploadName" class="upload-name" value="" disabled="disabled">
<!--                                 <label for="fileUpload">파일선택</label>  -->
                                <input type="file" id="fileUpload" class="upload-hidden">              
                                <div class="btn-group">
                                	<button class="btn btn-danger" id="btnFileUpload">파일선택</button>
                                    <button class="btn btn-warning" id="btnDupCheck">중복체크</button>
                                    <button class="btn btn-success" id="btnSave">저장</button>
                                </div>

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
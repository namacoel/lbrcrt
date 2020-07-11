<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<!-- 공통 LIB  설정 : ST -->
<%@include file="/WEB-INF/views/include/import.jsp"%>
<%@include file="/WEB-INF/views/include/importBootstrap.jsp"%>
<script src="<%=request.getContextPath()%>/resources/plugins/chartjs/Chart.min.js"></script>


<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/test/testChartjs.js"></script>
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

<title>Sample Chart</title>
</head>
<body>

<div class="content-wrapper content-custom">
    <section class="content-header">
        <h1>Sample Chart<small style="color:red">데이터를 확인 해주세요.</small></h1>
    </section>
    <section class="content" style="padding-bottom:0px">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <div class="input-group">
                            <table class="table-search table-fill">
								<tr>
									<th style="min-width:120px">조회일자</th>
									<td><input type="date" id="srchDate"></td>
								</tr>
							</table>
							<span id="div_btnDay" class="input-group-btn">
								<button class="btn btn-default btn-sm" id="btnPrevDay" title="이전"><i class="fa fa-caret-left"></i></button>
								<button class="btn btn-default btn-sm" id="btnNextDay" title="다음"><i class="fa fa-caret-right"></i></button>
							</span>
                        </div>
                    </div>
                    <div class="box-body">
                        <div class="box-header" style="padding:0px;margin-bottom:20px;">
                            <span class="btn btn-block btn-primary btn-sm">업로드 대상자 차트<span id="totalCount1"></span></span>
                        </div>
						<div class="container" style="width: 70%;">
							<canvas id="barChart"></canvas>
						</div>
						<button id="btnRandomizeData">Randomize Data</button>
						<button id="btnAddDataset">Add Dataset</button>
						<button id="btnRemoveDataset">Remove Dataset</button>
						<button id="btnAddData">Add Data</button>
						<button id="btnRemoveData">Remove Data</button>
                    </div>
                </div>
            </div>
        </div>
        
    </section>
</div>


</body>
</html>
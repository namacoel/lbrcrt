/*************************************************
 * Source		: testExcelUplaod.js
 * Description	: 엑셀 업로드
 * ***********************************************
 * Date			Author		Description
 * ***********************************************
 * 2020.06.29	ksw			최초 작성
 * ***********************************************/

/**************************************************
 * 전역 변수 선언
 **************************************************/
var FORM_SRCH 	= "#tableSearch"; 	// 검색조건 개체 Selector
var GRID1 		= "#gridList1";		// 그리드1 개체 Selecotr ID
var FORM1 		= "#tableDetail1"; 	// 상세정보 개체 Selector

var codeListMap = new nMap();

/* chartjs 그래프 색세팅 */
var chartColors = {
	red : "rgb(255, 99, 132)",
	orange : "rgb(255, 159, 64)",
	yellow : "rgb(255, 205, 86)",
	green : "rgb(75, 192, 192)",
	blue : "rgb(54, 162, 235)",
	purple : "rgb(153, 102, 255)",
	grey : "rgb(201, 203, 207)",
};

var color = Chart.helpers.color;
var colorNames = Object.keys(chartColors);
var _barChart = "";
var _barChartData = {};

/** chartjs legend 여백 두기 */
Chart.Legend.prototype.afterFit = function() {
    this.height = this.height + 20;
};

// charjs 샘플 데이터
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// chartjs 샘플 함수
var Samples = {};
Samples.utils = {
  // Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
  srand: function (seed) {
    this._seed = seed;
  },

  rand: function (min, max) {
    var seed = this._seed;
    min = min === undefined ? 0 : min;
    max = max === undefined ? 1 : max;
    this._seed = (seed * 9301 + 49297) % 233280;
    return min + (this._seed / 233280) * (max - min);
  },

  numbers: function (config) {
    var cfg = config || {};
    var min = cfg.min || 0;
    var max = cfg.max || 1;
    var from = cfg.from || [];
    var count = cfg.count || 8;
    var decimals = cfg.decimals || 8;
    var continuity = cfg.continuity || 1;
    var dfactor = Math.pow(10, decimals) || 0;
    var data = [];
    var i, value;

    for (i = 0; i < count; ++i) {
      value = (from[i] || 0) + this.rand(min, max);
      if (this.rand() <= continuity) {
        data.push(Math.round(dfactor * value) / dfactor);
      } else {
        data.push(null);
      }
    }

    return data;
  },

  labels: function (config) {
    var cfg = config || {};
    var min = cfg.min || 0;
    var max = cfg.max || 100;
    var count = cfg.count || 8;
    var step = (max - min) / count;
    var decimals = cfg.decimals || 8;
    var dfactor = Math.pow(10, decimals) || 0;
    var prefix = cfg.prefix || "";
    var values = [];
    var i;

    for (i = min; i < max; i += step) {
      values.push(prefix + Math.round(dfactor * i) / dfactor);
    }

    return values;
  },

  months: function (config) {
    var cfg = config || {};
    var count = cfg.count || 12;
    var section = cfg.section;
    var values = [];
    var i, value;

    for (i = 0; i < count; ++i) {
      value = MONTHS[Math.ceil(i) % 12];
      values.push(value.substring(0, section));
    }

    return values;
  },

  color: function (index) {
    return COLORS[index % COLORS.length];
  },

  transparentize: function (color, opacity) {
    var alpha = opacity === undefined ? 0.5 : 1 - opacity;
    return Color(color).alpha(alpha).rgbString();
  },
};

/**************************************************
 * 화면 초기화를 위한 객체 설정
 **************************************************/
var _pObj = {
	job	: "INIT",	// "INIT", "NEW", "MOD", "DEL", ...
	// validElementsSrch : "",	// 조회조건 validation 개체
	// validElementsForm1 : "",	// validation 대상 리스트
	deptListMap : new nMap(),		// 부서코드 보관
	addrListMap : new nMap(),		// 주소코드 보관
	recruitSite2Map : new nMap(), 	// 채용경로2 코드보관 

	/*initPage:function() { this.init.Variable(); },*/
	/** 변수 초기화 */
	initVariable:function() {
		this.validElementsForm1 = __getValidElements(FORM1);
	},
	/** 셀렉트박스 초기화 */
	initDropDown:function() {
		// DB에서 공통코드 가져오기
		//var codeListMap = __appCmm.getMultiCodeBookDB("USERSTTS, USERCLSS, SEX");
		codeListMap = __appCmm.getMultiCodeBookDB("SEX, HIGHESTEDU, OXSTTS, RECRUITSITE1, RECRUITSITE2");
		
		codeListMap.put("BIZAREA", __appCmm.getBizareaCodeBook());
		this.deptListMap.put("DEPT", __appCmm.getDeptCodeBook());
		//__appCmm.setDropDown(codeListMap, "BIZAREA", "srchBizarea", "전체");
		//__appCmm.setBizareaChangeEvent(this.deptListMap.get("DEPT"), "srchBizarea", "srchDept", "전체");
		//$("#srchBizarea").trigger("change");
		//__appCmm.setDropDown(codeListMap, "PHONEITVWRESULT", "srchPhoneItvwResult", "전체");
		//__appCmm.setDropDown(codeListMap, "ITVWRESULT", "srchItvwResult", "전체");

		this.addrListMap = __appCmm.getAddrCodeBook();

		// selectBox 세팅

	},
	/** 유효상, 마스킹 초기화 */
	initMask:function() {
		// 필수값 설정
		
		// 유효성 설정
	
	},
	/** 그리드 초기화 */
	initGrid:function() {
		_initGrid1(GRID1);
	},
	/** 데이터 초기화 */
	/*initData:function() {	},*/
	/** 페이지 상태 세팅
	 * job(INIT, NEW, MOD, ..)의 값에 따라 개체 초기화, 개체 비/활성화, 버튼 설정
	 * */
	setFormStatus:function(cond) {
		var job = cond;
		this.job = job;
		
		switch(job) {
		case "INIT":
			__elementClear(FORM1);
			__elementDis(FORM1, job, "DIS");
			_btnObj.setButton(job);
			break;
		case "NEW":
			__elementClear(FORM1);
			__elementDis(FORM1, job, "ENA");
			_btnObj.setButton(job);
			break;
		case "MOD":
			__elementDis(FORM1, job, "ENA");
			_btnObj.setButton(job);
			break;
		default:
			break;
		}
	}
}

var _jobStts = {
	isCheckValue : false
	, excelDup : false
	, dbDup : false
	, done : false
}

/**************************************************
 * 버튼 상태 설정(버튼/상태의 순서/갯수는 동일해야함)
 **************************************************/
var _btnObj = {
	btn:["btnNew", "btnSave"],
	stts:{
		INIT 	: [1,0],	// 초기화
		NEW 	: [1,1], 	// 추가
		MOD 	: [1,1]  	// 수정
	},
	setButton:function(cond) {
		if(cond == undefined) { return; }
		if(this.stts[cond] != undefined) {
			for(var i in this.stts[cond]) {
				if(this.stts[cond][i] == 1) {
					$("#"+this.btn[i]).prop("disabled", false);
				} else {
					$("#"+this.btn[i]).prop("disabled", true);
				}
			}
		}
	}
};

/**************************************************
 * 페이징 로딩 전 설정
 **************************************************/
$(document).ready(function(){
	
	var chartInfo = {
		type : "bar",
		data : _barChartData,
		options : {
			responsive : true,
			legend : {
				position : "top",
			},
			title : {
				display : false,
				text : "차트",
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true,
						max: 10, // 데이터 조회시 갱신되게 로직 추가한다.
						stepSize: 10, // y축 간격 크기
					}
				}]
			},
			events: [], // 마우스 이벤트 설정; []이면 아무것도 실행하지 않는다.
			animation: {
				onComplete: function(animation) {
					// 그래프가 그려지면 값이 표시되도록 한다.
			        var ctx = this.chart.ctx;
			        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
			        ctx.fillStyle = 'gray';
			        ctx.textAlign = 'center';
			        ctx.textBaseline = 'bottom';

			        this.data.datasets.forEach(function (dataset) {
			        	for (var i = 0; i < dataset.data.length; i++) {
			                for(var key in dataset._meta) {
			                    var model = dataset._meta[key].data[i]._model;
			                    ctx.fillText(dataset.data[i], model.x, model.y - 5);
			                }
			            }
			        });
				}
			}
		},		
	};
	
	var ctx = document.getElementById("barChart");
	_barChart = new Chart(ctx, chartInfo);
	
	Samples.utils.srand(Date.now());
	
// _pObj.initVariable();
// _pObj.initDropDown();
//	_pObj.initMask();
	_pObj.initGrid();
//	_pObj.setFormStatus("INIT");
//	$("#btnSrch").trigger("click");
	
	$("#srchDate").val(__toDateFormat(__getDate().left(8),"-"));
	$("#srchDate").trigger("change");  
});

/**************************************************
 * 이벤트 핸들러
 **************************************************/

$(document).on("click", "button", function(e) {
	var elementId = $(this).attr("id");
	
	switch (elementId) {
	case "btnSrch":
		_pObj.setFormStatus("INIT");
		selectList();
		break;
	case "btnRandomizeData":
		 var zero = Math.random() < 0.2 ? true : false;
		_barChartData.datasets.forEach(function(dataset) {
			dataset.data = dataset.data.map(function() {
				return zero ? 0.0 : randomScalingFactor();
			});
		});
		_barChart.update();
		break;
	case "btnAddDataset":
		var colorName = colorNames[_barChartData.datasets.length % colorNames.length];
		var dsColor = chartColors[colorName];
		
		var newDataset = {};
		
		newDataset.label = "사업장" + (_barChartData.datasets.length + 1);
		newDataset.backgroundColor = color(dsColor).alpha(0.5).rgbString();
		newDataset.borderColor = dsColor;
		newDataset.borderWidth = 1;
		newDataset.data = [];
		
		/** 데이터셋.데이터 세팅하기 */
		for (var index = 0; index < _barChartData.labels.length; ++index) {
			newDataset.data.push(randomScalingFactor());
		}
		
		_barChartData.datasets.push(newDataset);
		_barChart.update();
		break;
	case "btnRemoveDataset":
		_barChartData.datasets.pop();
		_barChart.update();
		break;
	case "btnAddData":
		if (_barChartData.datasets.length > 0) {
			var month = MONTHS[_barChartData.labels.length % MONTHS.length];
			_barChartData.labels.push(month);
		}
		for (var index = 0; index < _barChartData.datasets.length; ++index) {
			_barChartData.datasets[index].data.push(randomScalingFactor());
		}
		_barChart.update();
		break;
	case "btnRemoveData":
		_barChartData.labels.splice(-1, 1); // remove the label first
		_barChartData.datasets.forEach(function (dataset) {
			dataset.data.pop();
		});
		
		_barChart.update();
		break;
	default:
		break;
	}
});

$(document).on("change", " #srchDate", function() {
//	selectList1();
	selectList2();
//	selectList3();
});

/** 전날/다음날 click 이벤트 */
$(document).on("click", "#div_btnDay > button", function() {
	var elementId = $(this).attr("id");
	
	submitCheck();
	var srchDate = new Date($("#srchDate").val());
	
	switch (elementId) {
	case "btnPrevDay":	// 전날 클릭
		srchDate.setDate(srchDate.getDate()-7);
		break;
	case "btnNextDay":	// 다음날 클릭
		srchDate.setDate(srchDate.getDate()+7); 
		break;
	default:
		break;
	}
	$("#srchDate").val(__toDateFormat(__getDate(srchDate).left(8),"-"));
	$("#srchDate").trigger("change");
});


/**************************************************
 * 일반 함수 정의
 **************************************************/

/** chartjs 랜덤값 생성한다. */
function randomScalingFactor() {
	return Math.round(Samples.utils.rand(1, 100));
}

/** 연속 클릭 딜레이 주는 함수 */
function submitCheck() {
	$("#btnPrevDay, #btnNextDay").attr("disabled", true);
	setTimeout(function(){
		$("#btnPrevDay, #btnNextDay").attr("disabled", false);
	}, 1500);
}

/** 차트의 데이터셋을 삭제한다. */
function removeAllDataset() {
	var datasetCnt = _barChart.data.datasets.length;
	/*for (var i=0;i<datasetCnt;i++) {
		_barChart.data.datasets.pop();
	}*/
	
	var labelsCnt = _barChartData.labels.length;
	for (var i=0;i<labelsCnt;i++) {
		_barChartData.labels.splice(-1, 1); // remove the label first
		_barChartData.datasets.forEach(function (dataset) {
			dataset.data.pop();
		});
	}
	
	_barChart.update();
}


/**************************************************
 * CRUD 함수 정의
 **************************************************/
/** 리스트 조회 : */
function selectList() {

}
/** 단건 조회 :  */
function selectOneData(pKey) {
	
}
/** 데이터 저장 : */
function insertData() {
}
/** 데이터 수정 : */
function updateData() {
}
/**************************************************
 * 그리드 정의
 **************************************************/
/** 그리드1 초기화 */
function _initGrid1(elementId) {

}

/** 리스트 조회 : 면접 주간 현황 */
function selectList2() {
	
	removeAllDataset();
	var srchDate = $("#srchDate").numVal();
	
	var postData = new nMap();
	
	postData.put("DB_CRUD", "R"); // DB 트랜잭션
	postData.put("DB_MAPPER", "employmentStatMapper");
	postData.put("DB_REQID", "selectStatItvwWeeklyReport");
	
	postData.put("srchDate", srchDate);
	
	var cbf = function(rs, elementId) {

		if(rs.length>0) {
			// 날짜 중복 제거 후 추출 ; 익스11 에서는 안될 수 있음
			var arrUniqItvwDate = []; //날짜담기(5일치 중복제거)
			var arrUniqCdBizarea = []; //사업장 가져오기(중복제거)
			var arrData = []; // 리스트로 데이터 담기
			var arrTemp = []; // 임시
			
			for(var i in rs) {
				arrUniqItvwDate.includes(rs[i].srchDate) ||  arrUniqItvwDate.push(rs[i].srchDate);
				// 회사구분은 처리 안했으니 참고...(현재는 무조건 1000임)
				arrUniqCdBizarea.includes(rs[i].nmBizarea) ||  arrUniqCdBizarea.push(rs[i].nmBizarea);
				arrData.push(rs[i].itvwWatingCnt);
			}
			
			// y축 max값 세팅
			var tempMax = Math.floor((Math.max.apply(null, arrData) + 9)/10)*10;
			_barChart.options.scales.yAxes[0].ticks.max = tempMax < 10 ? 10 : tempMax;
			
			for(var i in arrUniqItvwDate) {
				var temp = [];
				for(var i in arrUniqCdBizarea) {
					temp.push(arrData.shift());
				}
				arrTemp.push(temp);
			}
			
			// charjs label 세팅 (사업장)
			if(!_barChart.data.datasets.length) {
				for(var i in arrUniqCdBizarea) {
					var colorName = colorNames[_barChartData.datasets.length % colorNames.length];
					var dsColor = chartColors[colorName];
					
					var newDataset = {};
					
					newDataset.label = arrUniqCdBizarea[i];
					newDataset.backgroundColor = color(dsColor).alpha(0.5).rgbString();
					newDataset.borderColor = dsColor;
					newDataset.borderWidth = 1;
					newDataset.data = [];
					
					/*
					// 샘플 데이터를 생성한다.
					for (var index = 0; index < _barChartData.labels.length; ++index) {
						newDataset.data.push(randomScalingFactor());
					}
					*/
					_barChartData.datasets.push(newDataset);
				}
			}
			
			/*
			// 샘플 데이터를 생성한다.
			if (_barChartData.datasets.length > 0) {
				var month = MONTHS[_barChartData.labels.length % MONTHS.length];
			}
		
			for (var index = 0; index < _barChartData.datasets.length; ++index) {
				_barChartData.datasets[index].data.push(randomScalingFactor());
			}
			*/
			
			// (일자정보) x축 데이터를 생성한다.
			for(var i in arrUniqItvwDate) {
				_barChartData.labels.push(__toDateFormat(arrUniqItvwDate[i].right(4), ".", "MMDD"));
			}
			
			var arrItvwDateCnt = arrUniqItvwDate.length;
			// 데이터를 사업장과 날짜에 맞게 재 배치 한다. (DB에서 가져올때는 날짜와 사업장 순인데 배치할 때는 날짜마다 사업장으로 배분 해줘야 한다.)
			for (var i in arrUniqCdBizarea) {
				for(var j=0;j<arrItvwDateCnt;j++) {
					var data =  arrTemp[j].shift();
					_barChartData.datasets[i].data.push(data);
				}
			}
			_barChart.update();
		}

	};
	__serviceCall(CMM_ACTION, postData, true, cbf, "");
}

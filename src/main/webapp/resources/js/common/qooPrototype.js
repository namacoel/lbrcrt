/******************************************
 * Source		: qooPrototype.s
 * Description	: 사용자 관리 화면
 * ****************************************
 * Date			Author			Description
 * ****************************************
 * 2016.08.02	ksw				최초 작성
 * 
 * ****************************************/

/********** An object to merge onto the jQuery prototype. ********************/
/** $.fn.extend({}); 와 (function($){})(jQuery); 차이가 먼지 알아봐야 할듯. */
/** 커스터마이징 함수 정의 */
$.fn.extend({
	/** 숫자만 추출 */
	numVal:function(inParam) {
		if(!inParam) {
			var rtnVal	= null;
			var tempVal	= $(this).val();
//			var regExp		= /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
			var regExp	= /[^0-9]/gi;
			
			rtnVal		= tempVal.replace(regExp, "");
	
			return rtnVal;
		} else {
			$(this).val(inParam);
		}
		
	},
	/** 날짜 형태로 변환 */
	dateVal:function(inParam) {
		// mask 걸린 모든 태그는 event trigge거 주면 이거 필요 없을 듯
		if(inParam) {
			
		/*	var str = inParam.replace(/[^\d]+/g, "");
			var dmt = "/";
			if(str == "" || str == null) { return; }
			
			if(str.length == 8) {
				str = str.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, "$1"+dmt+"$2"+dmt+"$3");
			} else if(str.length == 6) {
				str = str.replace(/([0-9]{4})([0-9]{2})/, "$1"+dmt+"$2");
			} else if(str.length == 4) {
				str = str.replace(/([0-9]{4})/, "$1");
			} else
				str = str;
		    
		    $(this).val(str);*/
		}
	},
	/**
	 *  테이블에서 같은 값이 있는 행 병합
	 * 사용법 : $('#테이블 ID').span(row/col, tr/td, 위치, isStats(뭔지 모름));
	 */
	span:function(type, kind, idx, isStats) {
		if(type=="row") {
			return this.each(function(){      
				var that;     
				$('tr', this).each(function(row) {      
					$(kind+':eq('+idx+')', this).filter(':visible').each(function(col) {
						
						if ($(this).html() == $(that).html()
							&& (!isStats 
									|| isStats && $(this).prev().html() == $(that).prev().html()
									)
							) {            
							rowspan = $(that).attr("rowspan") || 1;
							rowspan = Number(rowspan)+1;

							$(that).attr("rowspan",rowspan);
							
							// do your action for the colspan cell here            
							$(this).hide();
							
							//$(this).remove(); 
							// do your action for the old cell here
							
						} else {            
							that = this;         
						}          
						// set the that if not already set
						that = (that == null) ? this : that;      
					});     
				});    
			});
		} else if(type=="col") {
			return this.each(function(){
				var that;
				$('tr', this).filter(":eq("+idx+")").each(function(row) {
					$(this).find(kind).filter(':visible').each(function(col) {
						if ($(this).html() == $(that).html()) {
							colspan = $(that).attr("colSpan") || 1;
							colspan = Number(colspan)+1;
							
							$(that).attr("colSpan",colspan);
							$(this).hide(); // .remove();
						} else {
							that = this;
						}
						
						// set the that if not already set
						that = (that == null) ? this : that;
					});
				});
			});
		}
	}
	
});


/** jQuery Plugin
 * 1. DOM일부를 조작하는 함수인 객체 메소드 정의
 * 2. ($) (jQuery)는 즉석 호출 함수 표현식(IIFE, Immediately Invoked Function Expression
 *    충돌을 피하기 위해 사용
 */

(function ($) {
	/** 날짜(YYYY/MM/DD) */
	// html5의 input date 타입을 사용할 때는 이것을 사용하지말고 class에 datemask만 추가해주자
	$.fn.dateMask = function() {
		var rtnVal	= "";
		
		$(this).addClass("dateMask");	// __putDataInPostData시 사용
		$(this).prop("maxlength", "10");
		$(this).prop("pattern", "(19|20)[0-9][0-9](/)(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])");
		$(this).prop("title", "숫자만 눌러주세요(1900년도~2000년도)");
		
		$(this).bind("keyup blur change", function(e){
			if(this.value == "" || this.value == "undefined" || this.value == undefined) return;

			// 현재위치 : 전체 길이
//			console.log(this.selectionStart + " : " + this.value.length);
//			if(this.selectionStart != this.value.length || this.value.length >= 10) return;
			// 48:0, 57:9, 96:0(Num Lock), 105:9(Num Lock) 
//			if( !(e.keyCode >=  48 && e.keyCode <= 57 || e.keyCode >=  96 && e.keyCode <= 105) ) {
//				return;
//			}
//			var tmpVal	= this.value.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi, "");
//			rtnVal = tmpVal.replace(/(^0.{0}|[0-9]{4})([0-9]{2})([0-9]{2})/,"$1/$2/$3");
			var tmpVal	= this.value.replace(/[^0-9]/gi, "");
			
			if(this.value.length == 8) {
				rtnVal = tmpVal.replace(/(^0.{0}|[0-9]{4})([0-9]{2})([0-9]{2})/,"$1/$2/$3");
			} else if(this.value.length > 8) {
				tmpVal = tmpVal.substr(0,8);
				rtnVal = tmpVal.replace(/(^0.{0}|[0-9]{4})([0-9]{2})([0-9]{2})/,"$1/$2/$3");
			} else {
				rtnVal = this.value.replace(/[^0-9]/gi, "");
			}
			this.value = rtnVal;
		});
	};
	/** 날짜(YYYY/MM/DD) */
	// 지원자 입력폼 용(YYYY만 입력해도 되도록 수정)
	$.fn.dateYYYYMask = function() {
		var rtnVal	= "";
		
		$(this).addClass("dateMask");	// __putDataInPostData시 사용
		$(this).prop("maxlength", "10");
		$(this).prop("pattern", "(19|20)[0-9][0-9](/)(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])");
		$(this).prop("title", "숫자만 눌러주세요(1900년도~2000년도)");
		
		$(this).bind("keyup blur change", function(e){
			if(this.value == "" || this.value == "undefined" || this.value == undefined) return;

			var tmpVal	= this.value.replace(/[^0-9]/gi, "");
			
			if(this.value.length >= 8) {
				$(this).prop("pattern", "(19|20)[0-9][0-9](/)(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])");
				tmpVal = tmpVal.substr(0,8);
				rtnVal = tmpVal.replace(/(^0.{0}|[0-9]{4})([0-9]{2})([0-9]{2})/,"$1/$2/$3");
			} else if(this.value.length == 4) {
				$(this).prop("pattern", "(19|20)[0-9][0-9]");
				rtnVal = tmpVal.replace(/(^0.{0}|[0-9]{4})/,"$1");
			} else {
				rtnVal = this.value.replace(/[^0-9]/gi, "");
			}
			this.value = rtnVal;
		});
	};
	
	/** 영문(대문자),숫자만 허용 */
	$.fn.upperNumber = function() {
		
		$(this).bind("keyup blur change", function(e) {
			var rtnVal = "";
			var regExp = null;
			var tmpVal = this.value;

			if( (e.keyCode == "8" || e.keyCode == "37" || e.keyCode == "38" || e.keyCode == "39" || e.keyCode == "40") ) return;
						
			// 영어와 숫자만 허용
			// regExp = /[가-힣ㄱ-ㅎㅏ-ㅣ]|[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
			regExp = /[^a-z^0-9]/gi;
			rtnVal = tmpVal.replace(regExp, "");
			
			this.value = rtnVal.toUpperCase();
		});
	};
	
	/** 영문(대문자),숫자, _만 허용 */
	$.fn.upperNumber1 = function() {
		
		$(this).bind("keyup blur change", function(e) {
			var rtnVal = "";
			var regExp = null;
			var tmpVal = this.value;

			if( (e.keyCode == "8" || e.keyCode == "37" || e.keyCode == "38" || e.keyCode == "39" || e.keyCode == "40") ) return;
						
			// 영어와 숫자만 허용
			// regExp = /[가-힣ㄱ-ㅎㅏ-ㅣ]|[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
			regExp = /[^a-z^0-9_]/gi;
			rtnVal = tmpVal.replace(regExp, "");
			
			this.value = rtnVal.toUpperCase();
		});
	};
	
	/** 영문(소문자), 숫자만 허용 */
	$.fn.lowerNumber = function() {
		
		$(this).bind("keyup blur change", function(e) {
			var rtnVal = "";
			var regExp = null;
			var tmpVal = this.value;
			
			if( (e.keyCode == "8" || e.keyCode == "37" || e.keyCode == "38" || e.keyCode == "39" || e.keyCode == "40") ) return;
			
			// 영어와 숫자만 허용
			regExp = /[^a-z^0-9]/gi;
			rtnVal = tmpVal.replace(regExp, "");
			
			this.value = rtnVal.toLowerCase();
		});
	};
	
	/** 영문, 숫자만 허용 */
	$.fn.engNumber = function() {
		
		$(this).bind("keyup blur change", function(e) {
			var rtnVal = "";
			var regExp = null;
			var tmpVal = this.value;
			
			if( (e.keyCode == "8" || e.keyCode == "37" || e.keyCode == "38" || e.keyCode == "39" || e.keyCode == "40") ) return;
			
			// 영어와 숫자만 허용
			regExp = /[^a-z^0-9]/gi;
			rtnVal = tmpVal.replace(regExp, "");
			
			this.value = rtnVal;
		});
	};
	
})(jQuery);
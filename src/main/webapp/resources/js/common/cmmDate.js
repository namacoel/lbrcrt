/**
 * source		: cmmSetDate.js
 * description	: AJAX를 이용하여 Common CRUD(DB 공통처리)를 호출하기 위한 js
 * ****************************************
 * date			author			description
 * ****************************************
 * 2016.03.31	김상우			최초 작성
 * 2016.05.18	김상우			시작년도를 4자리 지정하는 형태로 수정 
 * ****************************************
 */

/**
 * 년월일 select 엘리먼트의 ID를 받아서 option 엘리먼트의 value와 text의 값을 설정한다.  
 * @param yearId - 년 selector
 * @param monthId - 월 selector
 * @param dayId - 일 selector
 * @param fromYear - 시작 연도
 * @param yMore - 높은 연도 범위 수
 * @param year - 지정년
 * @param month - 지정월
 * @param day - 지정일
 */
function setDropDownDate(yearId, monthId, dayId, fromYear, yMore, year, month, day) {

	setYearRange(yearId, fromYear, yMore);
	setMonthRange(monthId);
	
	// dayId를 받은 경우에만 실행
	// day부분을 임의로 세팅하기 위한 설정이다. year나 month에 대한 change 이벤트를 걸어주었으니 크게 의미 없음.
	if(!isNull(dayId)) setDayData(dayId, 2016, 1);
	
	/*
	if(year && month && day) {
		setDayData(dayId, year, month);
		console.log(1);
	} else {
		var date = new Date(); // 현재 시간 구하기
		year = date.getFullYear();
		month = date.getMonth()+1;
		day = date.getDate();
		console.log(2);
	}
	 */
	// 드롭다운 값 세팅 하는 부분 주석 처리 필요할때 공통으로 처리하기
	/*
	setSelectValue(yearId, parseInt(year));
	setSelectValue(monthId, parseInt(month));
    if(!isNull(dayId)) setSelectValue(dayId, parseInt(day));
    */
}

/** 년월일 Option 엘리먼트 추가 */
// TODO 세팅값을 배열러 넣어서 처리하게 만들기.
function addOptionElement(elementName, id, startVal, endVal, opt1, opt2) {
	
	var selectElement = document.getElementById(id);
//	console.log("x" + selectElement);
	if(!selectElement) {
//		console.log("해당 object는 " + " 없습니다(addOptionElement()).");
		return;
	}
	
	deleteChildElements(id, elementName, "선택");
	
	switch (elementName) {
	case "option" :
		if(opt1 == "month" || opt1 =="day") {
			for(var i=startVal; i<=endVal; i++) { // 인자로 받은 시작값과 끝값을 범위로  
				var optionElement = document.createElement(elementName); // option 엘리먼트 생성
				optionElement.setAttribute("value", cmmPad(i)); // option 엘리먼트의 value 속성 추가
					optionElement.appendChild(document.createTextNode(cmmPad(i)+opt2)); // option 엘리먼트의 text 속성 추가
				selectElement.appendChild(optionElement); // 생성된 option 엘리먼트를 select 엘리먼트에 자식으로 추가
			}
		} else {
			for(var i=endVal; i>=startVal; i--) { // 인자로 받은 시작값과 끝값을 범위로  
				var optionElement = document.createElement(elementName); // option 엘리먼트 생성
				optionElement.setAttribute("value", i); // option 엘리먼트의 value 속성 추가
				optionElement.appendChild(document.createTextNode(i+opt2)); // option 엘리먼트의 text 속성 추가
				selectElement.appendChild(optionElement); // 생성된 option 엘리먼트를 select 엘리먼트에 자식으로 추가
			}
		}
		break;
	}
}

/** 자식 엘리먼트 모두 삭제 */
function deleteChildElements(id, elementName, pStr) {
	var node = document.getElementById(id);
	if(!node) return;
	while(node.hasChildNodes()) { // node가 가진 자식 노드가 있으면 
		node.removeChild(node.lastChild); // 마지막 자식노드를 삭제
	}
	switch(elementName) {
	case "option":
		var optionElement = document.createElement(elementName);
		optionElement.setAttribute("value", "");
		optionElement.appendChild(document.createTextNode(pStr));
		node.appendChild(optionElement);
		break;
	}
}

/** 2016.05.18.sml - 연도를 fromYear 부터 yMore까지 생성한다. */
function setYearRange(id, fromYear, yMore) {
	var date = new Date();
	var curYear = date.getFullYear();
	
//	if(isNull(yLess)) yLess = 0;
	if(isNull(yMore)) yMore = 0;
	
	addOptionElement("option", id, fromYear, curYear+yMore, "", "년");
}

/** 선택한 value의 option을 선택 */
function setSelectValue(id, value) {
	var selectElement = document.getElementById(id);
	
	for(var i=0; i<selectElement.options.length; i++) {
		if(selectElement.options[i].value == value) {
            selectElement.options[i].selected = "selected";
        }
    }
}

/** 월 범위 생성 */
function setMonthRange(id) {
    addOptionElement("option", id, 1, 12, "month", "월");
}
/** 일 범위 생성 */
function setDayData(id, year, month) {
	var date = new Date(year, month, 1);
    date.setDate(0);
    var lastDay = date.getDate();
    addOptionElement("option", id, 1, lastDay, "day", "일");
}

/** 년과 월이 변경되면 일자를 재설저한다.
 * @SEE 사용시 dayId 부분 수정해야함
 */
function refreshDayDate(yearId, monthId, dayId) {
	deleteChildElements(dayId);
	setDayData(dayId, document.getElementById(yearId).value, document.getElementById(monthId).value);
}


function setDropdownTime(hourId, minId, secId, sHour, eHour, sMin, eMin) {
	if(!isNull(hourId)) makeDropdownTime("option", hourId, sHour, eHour, "hour", "시");
	if(!isNull(minId)) makeDropdownTime("option", minId, sMin, eMin, "min", "분");
	
} 
function makeDropdownTime(elementName, id, startVal, endVal, opt1, opt2) {
	
	var selectElement = document.getElementById(id);
	
	deleteChildElements(id, elementName, "선택");
	
	switch (elementName) {
	case "option" :
		for(var i=startVal; i<=endVal; i++) { // 인자로 받은 시작값과 끝값을 범위로
			if(opt1 == "min") {
				if(i%10 == 0) {
					var optionElement = document.createElement(elementName); // option 엘리먼트 생성
					optionElement.setAttribute("value", cmmPad(i)); // option 엘리먼트의 value 속성 추가
					optionElement.appendChild(document.createTextNode(cmmPad(i)+opt2)); // option 엘리먼트의 text 속성 추가
					selectElement.appendChild(optionElement); // 생성된 option 엘리먼트를 select 엘리먼트에 자식으로 추가
				}
			} else {
				var optionElement = document.createElement(elementName); // option 엘리먼트 생성
				optionElement.setAttribute("value", cmmPad(i)); // option 엘리먼트의 value 속성 추가
				optionElement.appendChild(document.createTextNode(cmmPad(i)+opt2)); // option 엘리먼트의 text 속성 추가
				selectElement.appendChild(optionElement); // 생성된 option 엘리먼트를 select 엘리먼트에 자식으로 추가
			}
			
		}
		break;
	}
} 


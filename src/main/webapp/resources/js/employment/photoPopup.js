/**************************************************
 * source		: photoPopup.js
 * description	: 사진 등록 팝업창
 * ************************************************
 * date			author			description
 * ************************************************
 * 2016.05.17	김상우			최초 작성
 * ************************************************
 **************************************************/


/**************************************************
 * 전역 변수 선언
 **************************************************/
$(document).ready(function() {
	$("#fileName").attr("src", opener.$("#aplcntPhotoNm").attr("src"));
});
$(document).on("change", "#file", function() {
	var file = $("#file")[0].files[0];
	
	if(!checkImageType(file.type)) {
		alert("JPG, GIF, PNG 파일만 등록 가능합니다.");
		$(this).val("");
		return;
	}
	if(file.size > 512000) {
		alert("500KB 미만의 파일만 등록 가능합니다.");
		$(this).val("");
		return;
	}
	
	
});
$(document).on("click", "#btnInsertFile", function() {
	if($("#file").val() == "") {
		alert("선택된 파일이 없습니다.");
		return;
	}
	delFile();
	setFile();
});
$(document).on("click", "#btnDeleteFile", function() {
	if($("#fileName").attr("src") == "") {
		alert("선택된 파일이 없습니다.");
		return;
	}
	delFile();
});

function delFile() {
	$.ajax({
		url:"/test/upload/deleteFile",
		type:"post",
		data:{fileName:opener.$("#aplcntPhotoNm").attr("data-src")},
		dataType:"text",
		async:"false",
		success:function(result) {
			if(result == "deleted") {
//				that.parent("div").remove();
				$("#fileName").attr("src", "");
				$("#fileName").attr("data-src", "");
				opener.$("#aplcntPhotoNm").attr("src", "");
				opener.$("#aplcntPhotoNm").attr("data-src", "");
				opener.updateAplcntPhotoNm();
			}
		}
		
	})
}
function setFile() {
	
	var file = $("#file")[0].files[0];
	var formData = new FormData();
	
	formData.append("file", file);
	
	console.log(file);
	console.log(formData);
	
	$.ajax({
		url: "/test/upload/uploadAjax",
		data: formData,
		dataType: "text",
		processData: false,
		contentType: false,
		type: "POST",
		async:"false",
		success: function(data) {
			
			var str = "";
			console.log(data);
			console.log(checkImageType(data));
			if(checkImageType(data)) {
//				str = "<div><img src='/test/upload/displayFile?fileName="+ data +"'/>";
				$("#fileName").attr("src", gFileSrc+ data);
				$("#fileName").attr("data-src", data);
				opener.$("#aplcntPhotoNm").attr("src", gFileSrc + data);
				opener.$("#aplcntPhotoNm").attr("data-src", data);
			} else {
//				str = "<div><a href='/test/upload/displayFile?fileName=" + data + "'>" + getOriginalName(data) + "</a>";
//				str += "<small data-src="+data+">X</small></dv>";
			}
			opener.updateAplcntPhotoNm();
		}
	});
}

function checkImageType(fileName) {
	var pattern = /jpg|gif|png|jpeg/i;
	return fileName.match(pattern);
}
function getOriginalName(fileName) {
	if(checkImageType(fileName)) {
		return;
	}
	var idx = fileName.indexOf("_") + 1;
	return fileName.substr(idx);
}
function getImageLink(fileName) {
	if(!checkImageType(fileName)) {
		return;
	}
	var front = fileName.substr(0,12);
	var end = fileName.substr(14);
	return front + end;
}


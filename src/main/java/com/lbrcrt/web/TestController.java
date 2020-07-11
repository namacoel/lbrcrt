package com.lbrcrt.web;

import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.lbrcrt.service.TestServiceImpl;
import com.lbrcrt.util.CmmUtils;

@Controller
@RequestMapping("/test")
/*관리페이지*/ 
public class TestController {
	private static final Logger logger = LoggerFactory.getLogger(TestController.class);
	
	@Inject
	TestServiceImpl service;
	
	@Inject
	CmmUtils cmmUtils;
	
	String path = "test/";

	/** 업로드 테스트 */
	@RequestMapping(value="/excelUpload", method=RequestMethod.GET)
	public String emplUpload() {
		logger.info("testExcelUpload(GET) called...");
		return path+ "testExcelUpload";
	}
	
	@RequestMapping(value = "/excelUpload", method = RequestMethod.POST)
	public ResponseEntity<Map<String, Integer>> testExcelUpload(HttpServletRequest req, HttpServletResponse res) {
		logger.info(path+"excelUpload(POST) Method - START");
		
		ResponseEntity<Map<String, Integer>> entity = null;
		Map<String, Integer> rsMap = new HashMap<String, Integer>();
	
		String loginId = cmmUtils.getSessionLoginId(); // 세션 없으면 에러 처리
		if(loginId == null) { return new ResponseEntity<Map<String, Integer>>(rsMap, HttpStatus.BAD_REQUEST); }
		
		try {
			long startTime = 0; // 시작시간
			long endTime = 0; // 종료시간
			
			startTime = System.currentTimeMillis();
			
			rsMap = service.insertExcelUpload(req, loginId);
			
			endTime = System.currentTimeMillis();
			
			logger.info("처리 시작시간  : " + cmmUtils.formatTime(startTime));
			logger.info("처리 종료시간  : " + cmmUtils.formatTime(endTime));
			logger.info("처리 소요시간(초.0f) : " + (endTime - startTime) / 1000.0f + "초");
			
			entity = new ResponseEntity<Map<String, Integer>>(rsMap, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("Error in ..."+e);
//			e.printStackTrace();
			entity = new ResponseEntity<Map<String, Integer>>(rsMap, HttpStatus.BAD_REQUEST);
		}
		logger.info(path+"excelUpload(POST) Method - END");
		return entity;
	}

	
	/** chart.js 테스트 화면 */
	@RequestMapping(value="/testChartjs", method=RequestMethod.GET)
	public String chartemplUpload() {
		logger.info("testChartjs called...");
		return path+ "testChartjs";
	}
}
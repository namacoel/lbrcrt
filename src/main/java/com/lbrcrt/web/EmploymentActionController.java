package com.lbrcrt.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.lbrcrt.service.EmploymentServiceImpl;
import com.lbrcrt.util.CmmUtils;

@RestController
@RequestMapping("/employmentAction")
public class EmploymentActionController {

	private static final Logger logger = LoggerFactory.getLogger(EmploymentActionController.class);
	final static String SqlMapName = "com.lbrcrt.mapper."; /*js파일에서 네임스페이스를 추가적으로 전달받아야한다.*/
	
	@Inject
	EmploymentServiceImpl service;
	
	@Inject
	CmmUtils cmmUtils;
	
	/** 지원자 업로드 > 중복체크 - Action - 2019.07.26*/
	@RequestMapping(value="/selectAplcntListDupCnt/lists", method=RequestMethod.POST)
	public ResponseEntity<List<Map<String, Object>>> selectAplcntListDupCnt(@RequestBody Map<String, Object> map) {
		logger.info("employmentAction/selectAplcntListDupCnt/lists called..");
		
		map = cmmUtils.setSessionLoginIdIntoMap(map);
		
		final String SQL = SqlMapName + map.get("DB_MAPPER") + "." + map.get("DB_REQID");
		List<Map<String, Object>> lists = new ArrayList<Map<String, Object>>();
		
		ResponseEntity<List<Map<String, Object>>> entity = null;
				
		entity = new ResponseEntity<List<Map<String,Object>>>(lists, HttpStatus.OK);
		
		logger.info(SQL);
		logger.info(map.toString());
		
		try {
			lists = service.selectAplcntListDupCnt(SQL, map);
			entity = new ResponseEntity<List<Map<String,Object>>>(lists, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<List<Map<String,Object>>>(lists, HttpStatus.BAD_REQUEST);
		}
		
		return entity;
	}
	
	/** 지원자 업로드 > 등록 - Action - 2019.07.29 */
	@RequestMapping(value="insertAplcntListExcel", method=RequestMethod.POST)
	public ResponseEntity<Map<String, Integer>> insertAplcntListExcel(@RequestBody Map<String, Object> map) {
		logger.info("employmentAction/insertAplcntListExcel called..");
		
		map = cmmUtils.setSessionLoginIdIntoMap(map);
		
		final String SQL = SqlMapName + map.get("DB_MAPPER") + "." + map.get("DB_REQID");
		
		Map<String, Integer> rs = new HashMap<String, Integer>();
		ResponseEntity<Map<String, Integer>> entity = null;
				
		logger.info(SQL);
		logger.info(map.toString());
		
		try {
			rs = service.insertAplcntListExcel(SQL, map);
			entity = new ResponseEntity<Map<String, Integer>>(rs, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<Map<String, Integer>>(rs, HttpStatus.BAD_REQUEST);
		}
		
		return entity;	
	}
	
	/** 지원자 리스트를 일괄 수정한다.*/
	@RequestMapping(value="updateAplcntList", method=RequestMethod.PUT)
	public ResponseEntity<Map<String, Integer>> updateAplcntList(@RequestBody Map<String, Object> map) {
		logger.info("employmentAction/updateAplcntList called..");
		
		map = cmmUtils.setSessionLoginIdIntoMap(map);
		
		final String SQL = SqlMapName + map.get("DB_MAPPER") + "." + map.get("DB_REQID");
		
		Map<String, Integer> rs = new HashMap<String, Integer>();
		ResponseEntity<Map<String, Integer>> entity = null;
				
		logger.info(SQL);
		logger.info(map.toString());
		
		try {
			rs = service.updateAplcntList(SQL, map);
			entity = new ResponseEntity<Map<String, Integer>>(rs, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<Map<String, Integer>>(rs, HttpStatus.BAD_REQUEST);
		}
		
		return entity;	
	}
	
	/** 지원자를 삭제한다.*/
	@RequestMapping(value="deleteAplcntForm", method=RequestMethod.DELETE)
	public ResponseEntity<Map<String, Integer>> deleteAplcntForm(@RequestBody Map<String, Object> map) {
		logger.info("employmentAction/deleteAplcntForm called..");
				
		final String SQL = SqlMapName + map.get("DB_MAPPER") + "." + map.get("DB_REQID");
		
		Map<String, Integer> rs = new HashMap<String, Integer>();
		ResponseEntity<Map<String, Integer>> entity = null;
				
		logger.info(SQL);
		logger.info(map.toString());
		
		try {
			/* 추후에 삭제 권한 관리하는 화면으로 대체합시다!! 당장은 특정ID만 체크 */
			String checkId = cmmUtils.getSessionLoginId();
			if("300064".equals(checkId)) {
				logger.info(checkId+" deletes "+map.get("aplcntIdx"));
				rs = service.deleteAplcntForm(SQL, map);
				entity = new ResponseEntity<Map<String, Integer>>(rs, HttpStatus.OK);
			} else {
				entity = new ResponseEntity<Map<String, Integer>>(rs, HttpStatus.FORBIDDEN);				
			}
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<Map<String, Integer>>(rs, HttpStatus.BAD_REQUEST);
		}
		
		return entity;	
	}
}
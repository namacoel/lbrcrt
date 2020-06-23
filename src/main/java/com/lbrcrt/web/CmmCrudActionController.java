package com.lbrcrt.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.lbrcrt.service.CmmCrudServiceImpl;
import com.lbrcrt.util.CmmUtils;

/**
 * View에서 호출 받는 DB Transaction 중 단순처리하는 부분을 공통으로 처리하기 위한 Controller이다.
 * <br>호출 URI가
 * <br>/cmmCrudaction/lists에 POST는 Select
 * <br>/cmmCrudaction에 POST는 Insert
 * <br>/cmmCrudaction에 PUT는 Update
 * <br>/cmmCrudaction에 DELETE는 Delete
 * <br>이다.
 * @author Namacoel
 *
 */
@RestController
@RequestMapping("/cmmCrudAction")
public class CmmCrudActionController {

	private static final Logger logger = LoggerFactory.getLogger(CmmCrudActionController.class);
	
	@Inject
	CmmCrudServiceImpl service;

	@Inject
	CmmUtils cmmUtils;
	
	@Autowired
	PasswordEncoder passwordEncoder;	

	final static String SqlMapName = "com.lbrcrt.mapper."; /*js파일에서 네임스페이스를 추가적으로 전달받아야한다.*/

	/**
	 * View로부터 Parameter를 JSON(Map) 형식으로 전달받아 Service를 호출하여 그 결과를 JSON(Map) 형식으로 리턴한다.
	 * @param map
	 * @return 
	 */
	
	@RequestMapping(value = "/lists", method = RequestMethod.POST)
	public ResponseEntity<List<Map<String, Object>>> selectListAll(@RequestBody Map<String, Object> map) {
		
		logger.info("/cmmCrudAction/lists start");
		
		/* 내용 확인 */
        Iterator<String> iterator = map.keySet().iterator();
        while (iterator.hasNext()) {
            String key = (String) iterator.next();
            System.out.print(key+" : "+map.get(key)+", ");
		}
		
		map = cmmUtils.setSessionLoginIdIntoMap(map);
		
		final String SQL = SqlMapName + map.get("DB_MAPPER") + "." + map.get("DB_REQID");
		List<Map<String, Object>> lists = new ArrayList<Map<String, Object>>();
		ResponseEntity<List<Map<String, Object>>> entity = null;
		
//		Map<String, Object> maps = new HashMap<String, Object>();
		
		entity = new ResponseEntity<List<Map<String,Object>>>(lists, HttpStatus.OK);
		
		logger.info(SQL);
		logger.info(map.toString());
		
		try {
			lists = service.selectList(SQL, map);
			entity = new ResponseEntity<List<Map<String,Object>>>(lists, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<List<Map<String,Object>>>(lists, HttpStatus.BAD_REQUEST);
		}
		
		return entity;
	}

	@RequestMapping(value="", method=RequestMethod.POST)
	public ResponseEntity<Map<String, Integer>> insert(@RequestBody Map<String, Object> map) {
		
		map = cmmUtils.setSessionLoginIdIntoMap(map);
		map = pwdEnc(map);
		
		final String SQL = SqlMapName + map.get("DB_MAPPER") + "." + map.get("DB_REQID");
		// 기존에 결과여부나 시퀀스 중 한개를 Integer로 리턴 받는 형태였는데 둘다 받아오도록 수정함
		Map<String, Integer> rs = new HashMap<String, Integer>();
		ResponseEntity<Map<String, Integer>> entity = null;

		logger.info(SQL);
		logger.info(map.toString());
		
		try {
			rs = service.insert(SQL, map);
			entity = new ResponseEntity<Map<String, Integer>>(rs, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<Map<String, Integer>>(rs, HttpStatus.BAD_REQUEST);
		}

		return entity;
	}
	
	@RequestMapping(value="", method=RequestMethod.PUT)
	public ResponseEntity<Map<String, Integer>> update(@RequestBody Map<String, Object> map) {
		
		
		logger.info("/cmmCrudAction/lists start");
		
		/* 내용 확인 */
        Iterator<String> iterator = map.keySet().iterator();
        while (iterator.hasNext()) {
            String key = (String) iterator.next();
            System.out.print(key+" : "+map.get(key)+", ");
		}
		
		
		map = cmmUtils.setSessionLoginIdIntoMap(map);
		map = pwdEnc(map);
		
		final String SQL = SqlMapName + map.get("DB_MAPPER") + "." + map.get("DB_REQID");
//		Integer rs = new Integer(0);
		Map<String, Integer> rs = new HashMap<String, Integer>();
		ResponseEntity<Map<String, Integer>> entity = null;
		
		logger.info(SQL);
		logger.info(map.toString());
		
		try {
			rs = service.update(SQL, map);
			entity = new ResponseEntity<Map<String, Integer>>(rs, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<Map<String, Integer>>(rs, HttpStatus.BAD_REQUEST);
		}
		return entity;
	}
	
	@RequestMapping(value="", method=RequestMethod.DELETE)
	public ResponseEntity<Integer> delete(@RequestBody Map<String, Object> map) {
		
		map = cmmUtils.setSessionLoginIdIntoMap(map);
		
		final String SQL = SqlMapName + map.get("DB_MAPPER") + "." + map.get("DB_REQID");
		Integer rs = new Integer(0);
		ResponseEntity<Integer> entity = null;

		logger.info(SQL);
		logger.info(map.toString());
		
		try {
			rs = service.delete(SQL, map);
			entity = new ResponseEntity<Integer>(rs, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<Integer>(rs, HttpStatus.BAD_REQUEST);
		}

		return entity;
	}
	
	/**
	 * 비밀번호를 스프링시큐리티를 이용하여 암호화 된 비밀번호로 리턴한다.
	 * @param map
	 * @return
	 */
	private Map<String, Object> pwdEnc(Map<String, Object> map) {
		
		String password = (String) map.get("password");
		// String에 값이 있는지 검사(null이나 " "의 경우도 false로 처리)
		if(StringUtils.hasText(password)) {
			String bCryptString = passwordEncoder.encode(password);
			map.put("password", bCryptString);
		}
		return map;
	}
}

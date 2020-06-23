package com.lbrcrt.web;

import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.lbrcrt.domain.UserInfoVO;
import com.lbrcrt.service.MngCrudServiceImpl;
import com.lbrcrt.util.CmmUtils;

@Controller
@RequestMapping("/mng")
/*관리페이지*/ 
public class MngController {
	private static final Logger logger = LoggerFactory.getLogger(MngController.class);
	final static String SqlMapName = "com.lbrcrt.mapper."; /*js파일에서 네임스페이스를 추가적으로 전달받아야한다.*/
	
	@Inject
	MngCrudServiceImpl service;
	
	@Inject
	CmmUtils cmmUtils;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	String path = "mng/";

	/**
	 *  사용자 관리 화면
	 * @return
	 */
	@RequestMapping(value="/userMng", method=RequestMethod.GET)
	public String userMng() {
		logger.info("userMng called...");
		return "mng/userMng";
	}
	
	/**
	 * 코드 관리 화면
	 * @return
	 */
	@RequestMapping(value="codeMng", method=RequestMethod.GET)
	public String codeMng() {
		logger.info("codeMng called..");
		return "mng/codeMng";
	}
	
	/**
	 * 프로그램 관리 화면
	 */
	@RequestMapping(value="prgmMng", method=RequestMethod.GET)
	public String prgmMng() {
		logger.info("prgmMng called..");
		return "mng/prgmMng";
	}
	/**
	 * 사업장 관리 화면
	 */
	@RequestMapping(value="bizareaMng", method=RequestMethod.GET)
	public String bizareaMng() {
		logger.info("bizareaMng called..");
		return "mng/bizareaMng";
	}
	/**
	 * 부서정보 관리 화면
	 */
	@RequestMapping(value="deptMng", method=RequestMethod.GET)
	public String deptMng() {
		logger.info("deptMng called..");
		return "mng/deptMng";
	}
	/** 비밀번호 변경 팝업.2017.08.22 */
	@RequestMapping(value="userMngPwdPop", method=RequestMethod.GET)
	public String changePwdPop() {
		logger.info(path+"userMngPwdPop called..");
		return path + "userMngPwdPop";
	}
	/** 비밀번호 변경 팝업.2017.08.22 */
	@RequestMapping(value="updateUserPwd", method=RequestMethod.PUT)
//	public ResponseEntity<Integer> updateUserPwd(@RequestBody UserInfoVO vo) {
	public ResponseEntity<Map<String, Integer>> updateUserPwd(@RequestBody UserInfoVO vo) {
		
//		Integer rs = new Integer(0);
		/* 화면에서는 json으로 받아야 되는데 updte 결과 건수만 int로 던져서 undefined으로 나와서 json 데이터 셋으로 수정함 */
		Map<String, Integer> rsMap = new HashMap<String, Integer>();
		rsMap.put("cnt", 0);
		
		String loginId = cmmUtils.getSessionLoginId();
		
		// 세션정보 없으면 에러
//		if(loginId == null) { return new ResponseEntity<Integer>(rs, HttpStatus.BAD_REQUEST); }
		if(loginId == null) { return new ResponseEntity<Map<String, Integer>>(rsMap, HttpStatus.BAD_REQUEST); }
		
		final String SQL = SqlMapName + "userMngMapper.updateUserPwd";
		
		logger.info(path+"userMngPwdPop called..");
		logger.info("vo.toString() >> " + vo.toString());
		
		vo.setPassword((passwordEncoder.encode(vo.getPassword())));
		vo.setPwdupid(loginId);
		
//		ResponseEntity<Integer> entity = null;
		ResponseEntity<Map<String, Integer>> entity = null;
		
		try {
			rsMap.put("cnt", service.updateUserPwd(SQL, vo));
//			entity = new ResponseEntity<Integer>(rs, HttpStatus.OK);
			entity = new ResponseEntity<Map<String, Integer>>(rsMap, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
//			entity = new ResponseEntity<Integer>(rs, HttpStatus.BAD_REQUEST);
			entity = new ResponseEntity<Map<String, Integer>>(rsMap, HttpStatus.BAD_REQUEST);
		}
		return entity;
	}
}
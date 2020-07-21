package com.lbrcrt.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.lbrcrt.persistence.EmploymentDaoImpl;

@Service
public class EmploymentServiceImpl implements EmploymentService {

	@Inject
	EmploymentDaoImpl<Map<String, Object>, Map<String, Object>> dao;
	
	/** 엑셀업로드 하기전에 중복체크를 한다. */
	public List<Map<String, Object>> selectAplcntListDupCnt(String statement, Map<String, Object> parameter) {
//		logger.info("selectAplcntListDupCnt - parameter.. " + parameter.toString());
//		logger.info("parameter : " + parameter.toString());
//		logger.info("mapList : " + parameter.get("mapList"));
		
		// 화면에 응답해줄 결과 객체
		List<Map<String, Object>> lists = new ArrayList<Map<String, Object>>();
		
		// SQL에 전달되는 파라미터만 추출 
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> mapList = (List<Map<String, Object>>) parameter.get("mapList");
		
		// 파라미터의 리스트 수만큼 SQL문을 반복 처리한다. > 그 결과를 lists에 쌓는다.
		for(Map<String, Object> m : mapList) {
			System.out.println(m.toString());
			Map<String, Object> tempRsMap = dao.selectAplcntListDupCnt(statement, m);
			m.put("cnt", tempRsMap.get("cnt"));
//			Map<String, Object> rsMap = dao.selectAplcntListDupCnt(statement, m);
			lists.add(m);
		}
		
		return lists;
	}

	/** 엑셀업로드를 이용하여 등록한다. */
	public Map<String, Integer> insertAplcntListExcel(String statement, Map<String, Object> parameter) {
		
		Map<String, Integer> rsMap = new HashMap<String, Integer>();
		String loginId = (String) parameter.get("loginId"); // 로그인ID 추가
		Integer totalCnt = 0;
		
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> mapList = (List<Map<String, Object>>) parameter.get("mapList");
		
		
		for(Map<String, Object> m : mapList) {
			m.put("loginId", loginId);
			System.out.println(m.toString());
			Map<String, Integer> tempRsMap = dao.insertAplcntListExcel(statement, m);
			totalCnt += tempRsMap.get("cnt");				
		}
		
		
//		try {
//			for(Map<String, Object> m : mapList) {
//				m.put("loginId", loginId);
//				System.out.println(m.toString());
//				Map<String, Integer> tempRsMap = dao.insertAplcntListExcel(statement, m);
//				totalCnt += tempRsMap.get("cnt");				
//			}
//		} catch (Exception e) {
//			logger.info("### 강제 롤백 ###");
//			e.printStackTrace();
//			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
//			throw new Exception();
//		}

		
		rsMap.put("cnt", totalCnt);
		
		return rsMap;
	}
	
	/** 지원자 리스트를 일괄 수정한다. */
	public Map<String, Integer> updateAplcntList(String statement, Map<String, Object> parameter) {
		
		Map<String, Integer> rsMap = new HashMap<String, Integer>();
		String loginId = (String) parameter.get("loginId"); // 로그인ID 추가
		Integer totalCnt = 0;
		
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> mapList = (List<Map<String, Object>>) parameter.get("mapList");
		
		for(Map<String, Object> m : mapList) {
			m.put("loginId", loginId);
			System.out.println(m.toString());
			Map<String, Integer> tempRsMap = dao.updateAplcntList(statement, m);
			totalCnt += tempRsMap.get("cnt");				
		}
		
		rsMap.put("cnt", totalCnt);
		
		return rsMap;
	}
	
	/** 지원자를 삭제한다. */
	public Map<String, Integer> deleteAplcntForm(String statement, Map<String, Object> parameter) {		
		return dao.deleteAplcntForm(statement, parameter);
	}

}

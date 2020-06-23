package com.lbrcrt.persistence;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class EmploymentDaoImpl<T, C> implements EmploymentDao<T, C> {
	
	@Inject
	@Resource(name="sqlSession-APPDB")
	SqlSession sqlSession;
	
	@Override
	public Map<String, Object> selectAplcntListDupCnt(String statement, C parameter) {
		return sqlSession.selectOne(statement, parameter);
	}

	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Integer> insertAplcntListExcel(String statement, C parameter) {
		Map<String, Integer> rsMap = new HashMap<String, Integer>();
		
		rsMap.put("cnt", sqlSession.insert(statement, parameter));
		rsMap.put("seq", ((Map<String,Integer>) parameter).get("seq"));
	
		System.out.println(rsMap.toString());	
		
		return rsMap;
	}
	
	@SuppressWarnings("unchecked")
	public Map<String, Integer> updateAplcntList(String statement, C parameter) {
		Map<String, Integer> rsMap = new HashMap<String, Integer>();
		
		rsMap.put("cnt", sqlSession.update(statement, parameter));
		rsMap.put("seq", ((Map<String,Integer>) parameter).get("seq"));
	
		System.out.println(rsMap.toString());	
		
		return rsMap;
	}
}

package com.lbrcrt.persistence;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class CmmCrudDaoImpl<T, C> implements CmmCrudDao<T, C> {

	@Inject
	@Resource(name="sqlSession-APPDB")
	SqlSession sqlSession;
	
	@Override
	public List<T> selectList(String statement, C parameter) {
		
		return sqlSession.selectList(statement, parameter);
	}
	
	/* TODO unchecked 왜 생기는지 확인하기*/
	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Integer> insert(String statement, C parameter) {
		
		Map<String, Integer> rsMap = new HashMap<String, Integer>();
		
		rsMap.put("cnt", sqlSession.insert(statement, parameter));
		rsMap.put("seq", ((Map<String,Integer>) parameter).get("seq"));
		
//		Integer seq = (Integer)((Map<String, Object>)parameter).get("seq");
		System.out.println(rsMap.toString());	
		
		return rsMap;
	}

	@Override
	public Map<String, Integer> update(String statement, C parameter) {
		
		Map<String, Integer> rsMap = new HashMap<String, Integer>();
		
		rsMap.put("cnt", sqlSession.update(statement, parameter));
		return rsMap;
	}

	@Override
	public Integer delete(String statement, C parameter) {

		return sqlSession.delete(statement, parameter);
	}

}

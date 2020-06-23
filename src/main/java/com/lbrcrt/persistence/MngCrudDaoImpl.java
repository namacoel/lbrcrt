package com.lbrcrt.persistence;

import javax.annotation.Resource;
import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.lbrcrt.domain.UserInfoVO;

@Repository
public class MngCrudDaoImpl<T, C> implements MngCrudDao<T, C> {

	
	@Inject
	@Resource(name="sqlSession-APPDB")
	SqlSession sqlSession;
	
/*	@Override
	public List<T> selectList(String statement, C parameter) {
		
		return sqlSession.selectList(statement, parameter);
	}
	
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
	public Integer update(String statement, C parameter) {
		
		return sqlSession.update(statement, parameter);
	}

	@Override
	public Integer delete(String statement, C parameter) {

		return sqlSession.delete(statement, parameter);
	}*/
	@Override
	public Integer updateUserPwd(String statement, UserInfoVO vo) {
		
		return sqlSession.update(statement, vo);
	}

}

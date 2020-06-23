package com.lbrcrt.service;

import java.util.Map;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.lbrcrt.domain.UserInfoVO;
import com.lbrcrt.persistence.MngCrudDaoImpl;

/**
 * CmmCrudActionController에서 CRUD를 공통으로 처리하기 위해 DAO를 호출하는 Service 
 *
 */
@Service
public class MngCrudServiceImpl implements MngCrudService {

	@Inject
	MngCrudDaoImpl<Map<String, Object>, Map<String, Object>> dao;
	
	/**
	 * DB Select를 위한 Service 호출
	 */
/*	@Override
	public List<Map<String, Object>> selectList(String statement, Map<String, Object> parameter) {

		System.out.println("CmmServiceImpl - parameter.. " + parameter.toString());
		logger.info("parameter.. " + parameter.toString());
		List<Map<String, Object>> lists = dao.selectList(statement, parameter);
		
		return lists;
	}	*/

	/**
	 * DB Insert를 위한 Service 호출
	 */
	/*@Override
	public Map<String, Integer> insert(String statement, Map<String, Object> parameter) {

//		Integer rs = new Integer(0);
		
		System.out.println("CmmServiceImpl - parameter.. " + parameter.toString());
		
		return dao.insert(statement, parameter);
	}*/
	/**
	 * DB Update를 위한 Service 호출
	 */
	/*@Override
	public Integer update(String statement, Map<String, Object> parameter) {

		Integer rs = new Integer(0);
		
		rs = dao.update(statement, parameter);
		
		return rs;
	}*/
	/**
	 * DB Delete를 위한 Service 호출
	 */
	/*@Override
	public Integer delete(String statement, Map<String, Object> parameter) {
		
		System.out.println("CmmServiceImpl - parameter.. " + parameter.toString());
		
		return dao.delete(statement, parameter);
	}*/
	/**
	 * DB Update를 위한 Service 호출
	 */
	@Override
	public Integer updateUserPwd(String statement, UserInfoVO vo) {

		Integer rs = new Integer(0);
		
		rs = dao.updateUserPwd(statement, vo);
		
		return rs;
	}
}

package com.lbrcrt.service;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.lbrcrt.persistence.CmmCrudDaoImpl;

/**
 * CmmCrudActionController에서 CRUD를 공통으로 처리하기 위해 DAO를 호출하는 Service 
 * @author Namacoel
 *
 */
@Service
public class CmmCrudServiceImpl implements CmmCrudService {

	private static final Logger logger = LoggerFactory.getLogger(CmmCrudServiceImpl.class);
	
	@Inject
	CmmCrudDaoImpl<Map<String, Object>, Map<String, Object>> dao;
	
	/**
	 * DB Select를 위한 Service 호출
	 */
	@Override
	public List<Map<String, Object>> selectList(String statement, Map<String, Object> parameter) {
		logger.info("CmmServiceImpl - parameter.. " + parameter.toString());
		List<Map<String, Object>> lists = dao.selectList(statement, parameter);
		
		return lists;
	}	

	/**
	 * DB Insert를 위한 Service 호출
	 */
	@Override
	public Map<String, Integer> insert(String statement, Map<String, Object> parameter) {
//		Integer rs = new Integer(0);	
		logger.info("CmmServiceImpl - parameter.. " + parameter.toString());
		
		return dao.insert(statement, parameter);
	}
	/**
	 * DB Update를 위한 Service 호출
	 */
	@Override
	public Map<String, Integer> update(String statement, Map<String, Object> parameter) {
		logger.info("CmmServiceImpl - parameter.. " + parameter.toString());
		
		return dao.update(statement, parameter);
	}
	/**
	 * DB Delete를 위한 Service 호출
	 */
	@Override
	public Integer delete(String statement, Map<String, Object> parameter) {
		logger.info("CmmServiceImpl - parameter.. " + parameter.toString());
		
		return dao.delete(statement, parameter);
	}
	
}

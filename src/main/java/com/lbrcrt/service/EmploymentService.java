package com.lbrcrt.service;

import java.util.List;
import java.util.Map;

public interface EmploymentService {

	public List<Map<String, Object>> selectAplcntListDupCnt(String statement, Map<String, Object> parameter);
	public Map<String, Integer> insertAplcntListExcel(String statement, Map<String, Object> parameter) throws Exception;
//	public Map<String, Integer> insert(String statement, Map<String, Object> parameter);
//	public Integer update(String statement, Map<String, Object> parameter);
//	public Integer delete(String statement, Map<String, Object> parameter);
}

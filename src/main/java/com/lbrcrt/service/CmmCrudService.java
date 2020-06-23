package com.lbrcrt.service;

import java.util.List;
import java.util.Map;

public interface CmmCrudService {

	public List<Map<String, Object>> selectList(String statement, Map<String, Object> parameter);
	public Map<String, Integer> insert(String statement, Map<String, Object> parameter);
	public Map<String, Integer> update(String statement, Map<String, Object> parameter);
	public Integer delete(String statement, Map<String, Object> parameter);
}

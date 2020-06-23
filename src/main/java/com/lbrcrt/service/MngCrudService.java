package com.lbrcrt.service;

import com.lbrcrt.domain.UserInfoVO;

public interface MngCrudService {

//	public List<Map<String, Object>> selectList(String statement, Map<String, Object> parameter);
//	public Map<String, Integer> insert(String statement, Map<String, Object> parameter);
//	public Integer update(String statement, Map<String, Object> parameter);
//	public Integer delete(String statement, Map<String, Object> parameter);
	public Integer updateUserPwd(String statement, UserInfoVO vo);
}

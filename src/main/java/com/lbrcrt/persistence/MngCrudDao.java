package com.lbrcrt.persistence;

import com.lbrcrt.domain.UserInfoVO;

public interface MngCrudDao<T, C> {
	/**
	 * 전달받은 파라미터를 조건으로 검색 후, 그 결과를 리턴한다.
	 * @param statement
	 * @param parameter
	 * @return
	 */
//	public List<T> selectList(String statement, C parameter);
	/**
	 * 전달받은 Parameter를 DB Insert 후, 성공여부 또는 시퀀스를 리턴한다. 
	 * @param statement
	 * @param parameter
	 * @return
	 */
//	public Map<String, Integer> insert(String statement, C parameter);
	/**
	 * 전달받은 Parameter를 조건으로 DB Update 후, 그 결과 건수를 리턴한다.
	 * @param statement
	 * @param parameter
	 * @return
	 */
//	public Integer update(String statement, C parameter);
	/**
	 * 전달받은 Parameter를 조건으로 DB Delete 후, 그 결과 건수를 리턴한다.
	 * @param statement
	 * @param parameter
	 * @return
	 */
//	public Integer delete(String statement, C parameter);
	/**
	 * 전달받은 Parameter를 조건으로 DB Update 후, 그 결과 건수를 리턴한다.
	 * @param statement
	 * @param parameter
	 * @return
	 */
	public Integer updateUserPwd(String statement, UserInfoVO vo);
}

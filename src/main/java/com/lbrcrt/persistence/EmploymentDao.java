package com.lbrcrt.persistence;

import java.util.Map;

public interface EmploymentDao<T, C> {
	/** 전달받은 파라미터를 조건으로 검색 후, 그 결과를 리턴한다. */
	public Map<String, Object> selectAplcntListDupCnt(String statement, C parameter);
	
	/** 전달받은 Parameter를 DB Insert 후, 성공여부 또는 시퀀스를 리턴한다. */
	public Map<String, Integer> insertAplcntListExcel(String statement, C parameter);
}

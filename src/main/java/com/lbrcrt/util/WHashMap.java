package com.lbrcrt.util;

import java.util.HashMap;

public class WHashMap<K,V> extends HashMap<K,V> {
	private static final long serialVersionUID = 1L;

	/**
	 * JDBC에서 MyBatis로 결과 리턴시 컬럼명을 대문자로 반환해준다.
	 * 대문자로 리턴되는 것을 camelCase로 받기 위해 HashMap을 상속받아 아래와 같이 수정한다.
	 * db 조회 결과가 null인 컬럼은 마이바티스가 map으로 생성하지 않아, null인 경웨도 map을 생성하는 설정을 mybatis-config.xml에 추가했고,
	 * null값을 view로 전달하는 경우, null이 문자 그대로 출력되는 문제가 있어 아래와 같이 값이 null이면 공백으로 치환해준다. 
	 */
	@SuppressWarnings("unchecked")
	public V put(K key, V value) {
		if (key != null && key instanceof String)
			key  = (K) CmmUtils.toCamelCase(((String) key));
		if (value == null)
			value = (V) "";
		return super.put(key, value);
	}
}

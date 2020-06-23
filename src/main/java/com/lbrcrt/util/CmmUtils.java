package com.lbrcrt.util;

import java.util.Calendar;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.lbrcrt.domain.MemberInfo;

@Service
public class CmmUtils {

	private static final Logger logger = LoggerFactory.getLogger(CmmUtils.class);
	
	/** snake_case를 camelCase로 변환 후 반환  */
	public static String toCamelCase(String target) {

		StringBuffer buffer = new StringBuffer();

		for (String token : target.toLowerCase().split("_")) {
			buffer.append(StringUtils.capitalize(token));
		}
		
		return StringUtils.uncapitalize(buffer.toString());
	}
	
	/** 스프링시큐리티로부터 로그인 ID를 받아와서 String으로 리턴한다. */
	public String getSessionLoginId() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Object principal = auth.getPrincipal(); 
		String loginId = "";
		if(principal != null && principal instanceof MemberInfo){
			loginId = ((MemberInfo)principal).getUsername();
			logger.info("Login Id is " + loginId);
		} else {
			logger.info("Login Id is not exist. Please contact your developer. ");
		}
		return loginId;
	}
	
	/**
	 * 스프링시큐리티로부터 로그인 ID를 받아서 map에 추가 해주고 리턴한다.
	 * @param map
	 * @return
	 */
	public Map<String, Object> setSessionLoginIdIntoMap(Map<String, Object> map) {
		
	//	MemberInfo memberInfo = (MemberInfo)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Object principal = auth.getPrincipal(); 
		String loginId = "";
		if(principal != null && principal instanceof MemberInfo){
			loginId = ((MemberInfo)principal).getUsername();
			map.put("loginId", loginId);
			logger.info("Login Id is " + map.toString());
		} else {
			logger.info("Login Id is not exist. Please contact your developer. ");
		}
		return map;
	}
	
	/** 실행 시간 확인 형식을 설정하는 메서드 */
	public String formatTime(long lTime) {
		Calendar c = Calendar.getInstance();
		c.setTimeInMillis(lTime);
		return (c.get(Calendar.HOUR_OF_DAY) + "시 "
				+ c.get(Calendar.MINUTE) + "분 "
				+ c.get(Calendar.SECOND) + "." + c.get(Calendar.MILLISECOND) + "초");
	}
}

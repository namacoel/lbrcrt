package com.lbrcrt.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class LoginController {

	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
	
	/**
	 * 사용자가 로그인을 하는 화면
	 * @return
	 */
	@RequestMapping(value="/login", method=RequestMethod.GET)
	public String login() {
		logger.info("login called..");
		return "login";
	}
	/**
	 * 세션이 만료된 경우 이동하는 화면
	 * @return
	 */
	@RequestMapping(value="/expiredPage", method=RequestMethod.GET)
	public String sessionTimeout() {
		logger.info("expiredPage called..");
		return "expiredPage";
	}
}

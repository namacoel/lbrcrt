package com.lbrcrt.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/it")
public class ItController {

	private static final Logger logger = LoggerFactory.getLogger(ItController.class);
	String path = "it/";
	
	/** 센터 점검 현황.2016.11.24 */
	@RequestMapping(value="/centerCheck", method=RequestMethod.GET)
	public String checkCenter() {
		logger.info("centerCheck called..");
		return path + "centerCheck";
	}
}

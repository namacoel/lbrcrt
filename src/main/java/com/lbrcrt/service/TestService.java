package com.lbrcrt.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public interface TestService {

	public Map<String, Integer> insertExcelUpload(HttpServletRequest req, String loginId);
}

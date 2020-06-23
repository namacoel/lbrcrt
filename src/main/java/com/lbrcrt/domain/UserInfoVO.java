package com.lbrcrt.domain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UserInfoVO {

	private String userid;
	private String password;
	private String pwdupid;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	public UserInfoVO() {
		
	}

	public String getUserid() {
		return userid;
	}

	public String getPassword() {
		return password;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	@Override
	public String toString() {
		return "UserInfoVO [userid=" + userid + "password=" + password + "]";
	}

	public String getPwdupid() {
		return pwdupid;
	}

	public void setPwdupid(String pwdupid) {
		this.pwdupid = pwdupid;
	}
	public void encodePwd() {
		System.out.println(">>>>>>>>> " + this.password);
		this.password = passwordEncoder.encode(this.password);
	}
}

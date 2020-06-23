package com.lbrcrt.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/employment")
public class EmploymentController {

	private static final Logger logger = LoggerFactory.getLogger(EmploymentController.class);
	String path = "employment/";
	
	@RequestMapping(value="/fillOutForm", method=RequestMethod.GET)
	public String fillOutForm() {
		logger.info("fillOutForm called..");
		return path + "fillOutForm";
	}
	@RequestMapping(value="/fillOutFormPreview", method=RequestMethod.GET)
	public String fillOutFormPreview() {
		logger.info("fillOutForm called..");
		return path + "fillOutFormPreview";
	}
	@RequestMapping(value="/aplcntList", method=RequestMethod.GET)
	public String aplcntList() {
		logger.info("aplcntList called..");
		return path + "aplcntList";
	}
	@RequestMapping(value="/aplcntForm", method=RequestMethod.GET)
	public String aplcntForm() {
		logger.info("aplcntForm called..");
		return path + "aplcntForm";
	}
	@RequestMapping(value="/aplcntInfoPop", method=RequestMethod.GET)
	public String aplcntInfoPop() {
		logger.info("aplcntInfoPop called..");
		return path + "aplcntInfoPop";
	}
	@RequestMapping(value="/photoPopup", method=RequestMethod.GET)
	public String photoPopup() {
		logger.info("photoPopup called..");
		return path + "photoPopup";
	}
	/** 채용현황관리 */
	@RequestMapping(value="/rcrtRqstMng", method=RequestMethod.GET)
	public String rcrtRqstMng() {
		logger.info("rcrtRqstMng called..");
		return path + "rcrtRqstMng";
	}
	/** 통계.채용경로별 지원자 목록 */
	@RequestMapping(value="/statAplcntByRecruitSite", method=RequestMethod.GET)
	public String statAplcntByrecruitSite() {
		logger.info("statAplcntByRecruitSite called..");
		return path + "statAplcntByRecruitSite";
	}	
	/** 통계.지원자 현황.2016.09.05 */
	@RequestMapping(value="/statRcrtStatus", method=RequestMethod.GET)
	public String statRcrtStatus() {
		logger.info("statRcrtStatus called..");
		return path + "statRcrtStatus";
	}	
	/** 통계.지원자 현황(POP).2016.09.20 */
	@RequestMapping(value="/statRcrtStatusPop", method=RequestMethod.GET)
	public String statRcrtStatusPop() {
		logger.info("statRcrtStatusPop called..");
		return path + "statRcrtStatusPop";
	}
		
	/** 통계.지원자 현황(POPUpd).2020.01.14 */
	@RequestMapping(value="/statRcrtStatusPopUpd", method=RequestMethod.GET)
	public String statRcrtStatusPopUpd() {
		logger.info("statRcrtStatusPopUpd called..");
		return path + "statRcrtStatusPopUpd";
	}	
	/** 인원 운영 데이터.2016.12.01 */
	@RequestMapping(value="/employeeStatus", method=RequestMethod.GET)
	public String employeeStatus() {
		logger.info("employeeStatus called..");
		return path + "employeeStatus";
	}	
	/** 인원 운영 데이터.2016.12.01 */
	@RequestMapping(value="/employeeStatusToPopup", method=RequestMethod.GET)
	public String employeeStatusToPopup() {
		logger.info("employeeStatusToPopup called..");
		return path + "employeeStatusToPopup";
	}
	/** 비밀번호 변경 팝업.2017.08.22 */
	@RequestMapping(value="/changePwdPop", method=RequestMethod.GET)
	public String changePwdPop() {
		logger.info("changePwdPop called..");
		return path + "changePwdPop";
	}
	
	/** 지원자 업로드 - 2019.07.23*/
	@RequestMapping(value="/emplUpload", method=RequestMethod.GET)
	public String emplUpload() {
		logger.info("emplUpload called..");
		return path + "emplUpload";
	}
}

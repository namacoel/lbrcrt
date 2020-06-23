package com.lbrcrt.service;

import java.io.File;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.UUID;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.lbrcrt.persistence.TestDaoImpl;
import com.lbrcrt.util.ExcelUtil;

@Service
public class TestServiceImpl implements TestService {

	private static final Logger logger = LoggerFactory.getLogger(TestServiceImpl.class);

	final static String SqlMapName = "com.lbrcrt.mapper.testMapper.";
	
	@Inject
	TestDaoImpl<Map<String, Object>, Map<String, Object>> dao;
	
	/** 화면에서 엑셀 파일을 받아서 서버에 저장한 후  POI를 이용하여 데이터를 읽어서 DB에 저장한다. */
	@Transactional(value="transactionManager-TESTDB", rollbackFor=Exception.class )
	public Map<String, Integer> insertExcelUpload(HttpServletRequest req, String loginId) {

		Map<String, Integer> rsMap = new HashMap<String, Integer>();
		Integer totalCnt = 0;
		
		String uploadPath = req.getSession().getServletContext().getRealPath("")+"upload"+File.separator; // 상대경로 가져오기
		
		MultipartHttpServletRequest mhsr = (MultipartHttpServletRequest) req;
		Iterator<String> it = mhsr.getFileNames(); // 넘어온 파일을 리스트로 저장

		// 중요!! - 이 코드는 화면에서 파일을 1개만 받아오며,  1회만 실행하고 DB 로직을 타야한다.
		while (it.hasNext()) {
			String savedName = ""; // 서버에 저장될 파일 경로 및 이름
			String fieldName = it.next().toString(); // 내용을 가져와서
			MultipartFile mfile = mhsr.getFile(fieldName); // 파일에 대한 정보(파일명, 크기 등)와 메서드 제공(파일저장)

			try {
				savedName = uploadFile(uploadPath, mfile.getOriginalFilename(), mfile.getBytes());
			} catch (Exception e) {
				logger.error("Error in ..." + e);
				e.printStackTrace();
			}
			
			logger.info("savedName : "+ savedName);
			
			dao.deleteExcelUpload(SqlMapName+"deleteExcelUpload"); // truncate 문이다.
			totalCnt = insertDataIntoDB(savedName, loginId); // DB에 저장한다.
			
		}
		
		rsMap.put("cnt", totalCnt);
		
		return rsMap;
	}
	
	/** 서버에 저장된 파일에서 데이터를 읽어솨서 DB에 저장한다. */
	private Integer insertDataIntoDB(String savedName, String loginId) {
		
		int totalCnt = 0;
		
		try {
			Workbook wbs = ExcelUtil.getWorkbook(savedName);
			
			Sheet sheet = (Sheet) wbs.getSheetAt(0); // 지정한 엑셀 시트 가져온다.
			
			// 엑셀 파일 2행부터 데이터를 처리한다.(1행은 헤더로 가정)
			for (int i = sheet.getFirstRowNum() + 1; i <= sheet.getLastRowNum(); i++) {
				Row row = sheet.getRow(i);

				Map<String, Object> map = new HashMap<String, Object>();
				
				// 현재 행의 열 값을 가져와서 map에 넣는다.
				map.put("C1", "" + ExcelUtil.cellValue(row.getCell(0)));
				map.put("C2", "" + ExcelUtil.cellValue(row.getCell(1)));
				map.put("C3", "" + ExcelUtil.cellValue(row.getCell(2)));
				map.put("C4", "" + ExcelUtil.cellValue(row.getCell(3)));
				map.put("C5", "" + ExcelUtil.cellValue(row.getCell(4)));
				map.put("C6", "" + ExcelUtil.cellValue(row.getCell(5)));
				map.put("C7", "" + ExcelUtil.cellValue(row.getCell(6)));
				map.put("C8", "" + ExcelUtil.cellValue(row.getCell(7)));
				map.put("C9", "" + ExcelUtil.cellValue(row.getCell(8)));
				map.put("C10", "" + ExcelUtil.cellValue(row.getCell(9)));
				map.put("INID", loginId);

				dao.insertExcelUpload(SqlMapName+"insertExcelUpload", map);
				totalCnt++;
				
				// 익셉션 테스트
//				if(i==2) { throw new Exception(); }
			}
			
			logger.info("insertDataIntoDB For문 종료");
			
		} catch (Exception e) {
			logger.error("Error in (강제 롤백) ..."+e);
//			e.printStackTrace();
			// 트랜잭션에 의한 강제 롤백 (어노테이션에 rollbackFor=Exception.class 해줘도 rollbakc이 자동으로 안됨. AOP 설정이 필요한가..?)
			totalCnt = 0;
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			
			// 강제 롤백 안될 때 사용하려고 추가해둔건데 잘되나까 필요없네!
//			dao.deleteExcelUpload(SqlMapName+"deleteExcelUpload");
		}

		return totalCnt;
	}
	
	/** 화면에서 받아온 파일을 서버에 저장하고, 파일의 경로와 이름을 반환한다.*/
	public String uploadFile(String uploadPath, String originalName, byte[] fileData) throws Exception {
		
		UUID uid = UUID.randomUUID();
		String savedName = uid.toString() + "_" + originalName;
		File target = new File(uploadPath, savedName);
		
		if (!target.exists()) { target.getParentFile().mkdirs(); } // 폴더 생성		
		FileCopyUtils.copy(fileData,  target); // 파일 복사
		
		return uploadPath+savedName;
	}
}

package com.lbrcrt.util;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExcelUtil {
	public static Workbook getWorkbook(String filePath) {
		FileInputStream fis = null; // 객체 생성
		try {
			// 지정한 경로인 pathname에 있는 파일을 읽어서 byte로 가져온다. 파일이 존재하지 않으면 RuntimeException이 발생한다.
			fis = new FileInputStream(filePath);

		} catch (FileNotFoundException e) {
			throw new RuntimeException(e.getMessage(), e);
		}

		Workbook wb = null;

		// 파일의 확장자를 체크해서 .XLS 라면 HSSFWorkbook에 .XLSX라면 XSSFWorkbook에 각각 초기화 한다.
		if (filePath.toUpperCase().endsWith(".XLS")) {
			try {
				wb = new HSSFWorkbook(fis);
			} catch (IOException e) {
				throw new RuntimeException(e.getMessage(), e);
			}
		} else if (filePath.toUpperCase().endsWith(".XLSX")) {
			try {
				wb = new XSSFWorkbook(fis);
			} catch (IOException e) {
				throw new RuntimeException(e.getMessage(), e);
			}
		}

		return wb;
	}

	// 엑셀 파일에서 데이터를 가져온다.
	public static String cellValue(Cell cell) {

		String value = null;
		if (cell == null)
			value = "";
		else {
			// 기본적으로 엑셀의 셀에 입력된 데이터의 타입을 맞추어서 가져와야 한다.(함수(?), 숫자, 문자 등..)
			switch (cell.getCellType()) {
			case Cell.CELL_TYPE_FORMULA:
				value = cell.getCellFormula();
				break;
			case Cell.CELL_TYPE_NUMERIC:
				if (DateUtil.isCellDateFormatted(cell)) {
					/*
					 * // you should change this to your application date format SimpleDateFormat
					 * objSimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd"); value = "" +
					 * objSimpleDateFormat.format(cell.getDateCellValue());
					 */

					// 날짜타입인경우
					if (DateUtil.isCellDateFormatted(cell)) {
						Date date = cell.getDateCellValue();

						value = new SimpleDateFormat("yyyy-MM-dd").format(date);

					// 일단 그 외는 문자로 읽어오기
					} else {
						cell.setCellType(Cell.CELL_TYPE_STRING);
						value = cell.getStringCellValue();
					}

				} else {
					value = "" + String.format("%.0f", new Double(cell.getNumericCellValue()));
				}
				break;
			case Cell.CELL_TYPE_STRING:
				value = "" + cell.getStringCellValue();
				break;
			case Cell.CELL_TYPE_BLANK:
				// value=""+cell.getBooleanCellValue();
				value = "";
				break;
			case Cell.CELL_TYPE_ERROR:
				value = "" + cell.getErrorCellValue();
				break;
			default:
			}
		}
		return value.trim();
	}
}

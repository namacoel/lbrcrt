package com.lbrcrt.persistence;

public interface TestDao<T, C> {
	
	public void deleteExcelUpload(String statement);
	public Integer insertExcelUpload(String statement, C parameter);
//	public Integer insertExcelUploadList(String statement, C parameter);
//	void commit();

}

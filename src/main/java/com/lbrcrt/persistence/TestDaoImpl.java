package com.lbrcrt.persistence;

import javax.annotation.Resource;
import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class TestDaoImpl<T, C> implements TestDao<T, C> { 
	
	@Inject
	@Resource(name="sqlSession-TESTDB")
	SqlSession sqlSession;

	/** 데이터를 삭제한다. */
	@Override
	public void deleteExcelUpload(String statement) {
		sqlSession.delete(statement);
	}

	/** 데이터를 DB에 저장한다. */
	@Override
	public Integer insertExcelUpload(String statement, C parameter) {
		// insert 결과 건수 만 회신한다. 1만 찍힐테니 앞단에서 합친다.
		return sqlSession.insert(statement, parameter);
	}
	
	/* 필독 : 사용 안됨. 트랜잭션 배치 걸린 상태에서 foreach 사용해봤는데 4건은 정상인데 5000건 해보니 insert 이후 처리가 진행이 안됨 */
	/*
	@Override
	public Integer insertExcelUploadList(String statement, C parameter) {
		return sqlSession.insert(statement, parameter);
	}
	*/
	
	/* 필독 : 사용 안됨. 여기선 이미 트랜잭션이 걸려 별도의 commit을 사용할수 없다. */
	/*
	public void commit() {
		sqlSession.commit();
	}
	*/

}

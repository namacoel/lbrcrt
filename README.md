# 채용 인원 관리

각 사업장/센터별 채용 입사자 현황을 관리하는 사이트 입니다.

## 개발환경

- Spring + Mybatis + jsp/js
- Altibase HDB
- Excel Upload POI

## 브라우저 지원

- Chrome

## 개발 이력

### 2020.06.08 - 개발 - 엑셀 POI 업로드 기능 추가

- poi, poi-ooxml, commons-io 라이브러리 추가

### 2020.06.12 - 설정 - 환경 설정

1. JNDI 설정 추가 (다중 DB 접속 가능한 정보 세팅)

1. 트랜잭션 설정 추가

   - root-context.xml 설정, 어노테이션(@Transactional) 설정

     `org.springframework.jdbc.datasource.DataSourceTransactionManager`

   - **_디테일한 설정은 나중에 하자!!_**

### 2020.06.19 - 에러 - 개발서버에서 십만건 업로드시 발생

1. 확인될 수 있는 오류메시지

   `OutOfMemoryError thrown from the UncaughtExceptionHandler`

   `java.lang.OutOfMemoryError: Java heap space`

1. 원인

   - Heap Memory 부족으로 확인

1. 해결

   - 로컬 환경에서는 메모리 부족 안 나타남 (노트북 메모리 16GB)
   - 개발서버는 (Memory 4GB)
   - 톰캣 실행시 Heap Memory를 512M에서 1024M 로 조정

   `JAVA_OPTS="-Djava.awt.headless=true -Djava.net.preferIPv4Stack=true -server -Xms512m -Xmx1024m"`

1. 엑셀 업로드 테스트 결과

   - 운영에서 10만건 27초, 5만건 15초 정도 소요
   - 서버 스펙 (램4기가, 톰캣 head 2048 지정)

### 2020.06.23 - GitHub 최초 커밋

### 2020.07.20 - 기능 수정(차트 max값 오류, 날짜포맷 함수 수정)

### 2020.07.21 - 지원자 삭제 기능 추가

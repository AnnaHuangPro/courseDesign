package ddd.base.dbmanager.bean;
public class TypeKeeper {
	
	private int sqlType;
	
	private String javaType;
	
	private String oracleType;
	
	private String mysqlType;
	
	private String sqlserverType;

	public TypeKeeper(int sqlType, String javaType, String oracleType,
			String mysqlType,String sqlserverType) {
		this.sqlType = sqlType;
		this.javaType = javaType;
		this.oracleType = oracleType;
		this.mysqlType = mysqlType;
		this.sqlserverType = sqlserverType;
	}

	
	public String getSqlserverType()
	{
		return sqlserverType;
	}

	public void setSqlserverType(String sqlserverType)
	{
		this.sqlserverType = sqlserverType;
	}



	public int getSqlType() {
		return sqlType;
	}

	public void setSqlType(int sqlType) {
		this.sqlType = sqlType;
	}

	public String getJavaType() {
		return javaType;
	}

	public void setJavaType(String javaType) {
		this.javaType = javaType;
	}

	public String getOracleType() {
		return oracleType;
	}

	public void setOracleType(String oracleType) {
		this.oracleType = oracleType;
	}

	public String getMysqlType() {
		return mysqlType;
	}

	public void setMysqlType(String mysqlType) {
		this.mysqlType = mysqlType;
	}
	
	public String toString(){
		return "javaType："+javaType+"mysqlType："+mysqlType+"oracleType："+oracleType+" sqlserverType："+sqlserverType;
	}
	
}

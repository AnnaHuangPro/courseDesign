package ddd.base.dynamicSql.mysql;

import ddd.base.dynamicSql.SqlHandler;

public class MysqlSqlHandler implements SqlHandler {

	@Override
	public String toDate(String dateString) {
		if(dateString.trim().startsWith("?")){
			return dateString;
		}
		return "'"+dateString+"'";
	}

	@Override
	public String limit(String sql,String[] properties, String start, String size) {
		StringBuffer sb = new StringBuffer(sql);
		sb.append(" limit ");
		sb.append(start);
		sb.append(",");
		sb.append(size);
		return sb.toString();
	}
	
	//mysql时间格式化函数
	public String dateFormat(String column,String formatString)
	{
		formatString = formatString.toLowerCase();
		formatString = formatString.replace("yyyy", "%Y");
		formatString = formatString.replace("yy", "%y");
		formatString = formatString.replace("mm", "%m");
		formatString = formatString.replace("dd", "%d");
		formatString = formatString.replace("hh", "%H");
		formatString = formatString.replace("mi", "%i");
		formatString = formatString.replace("ss", "%s");
		return "date_format("+column+"**'"+formatString+"')";
	}

}

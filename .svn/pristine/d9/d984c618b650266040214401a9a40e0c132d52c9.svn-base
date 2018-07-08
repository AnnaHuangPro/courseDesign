package ddd.base.dynamicSql.sqlserver;

import org.apache.commons.lang.StringUtils;

import ddd.base.dynamicSql.SqlHandler;

public class SqlServerSqlHandler implements SqlHandler {

	@Override
	public String toDate(String dateString) {
//		if(dateString.trim().startsWith("?")){
//			return "TO_DATE("+dateString+", 'SYYYY-MM-DD HH24:MI:SS')";
//		}
//		return "TO_DATE('"+dateString+"', 'SYYYY-MM-DD HH24:MI:SS')";
		return null;
	}

	@Override
	public String limit(String sql,String[] properties,String start, String size) {
		StringBuffer sb = new StringBuffer();
		
		
		
		sb.append("select  ");
		for (String p : properties) {
			sb.append(p);
			sb.append(',');
		}
		sb.deleteCharAt(sb.length()-1);
		sb.append(" from ( ");
		sb.append("select row_number() OVER(ORDER BY eid) AS row_number ,* from (");
		sql = sql.toLowerCase();
		sql = StringUtils.replace(sql, "select", "select top 100 percent");
		sb.append(sql+")dt1 )dt2 ");
		sb.append("where row_number >"+start);
		sb.append("and row_number <= "+(Integer.parseInt(start)+Integer.parseInt(size)));
		return sb.toString();
	}
	
	//mysql时间格式化函数
	public String dateFormat(String column,String formatString)
	{
//		http://blog.sina.com.cn/s/blog_95cfa64601018obo.html
		String searchStr = "";
		String replaceStr = "";
		int endIndex= 0;
//		replace(convert(varchar, creattime, 121), '', '-'),0,11)
//
//		replace(convert(varchar, creattime, 121), '', '-'),0,17)
//
//		replace(convert(varchar, creattime, 121), '', '-'),0,20)
//
//		replace(convert(varchar, creattime, 121), '-', '/'),0,11)
		if("YYYY-MM-DD".equals(formatString)){
			endIndex = 11;
		}else if("YYYY-MM-DD HH:MI".equals(formatString)){
			endIndex = 17;
		}else if("YYYY-MM-DD HH:MI:SS".equals(formatString)){
			endIndex = 20;
		}else if("YYYY/MM/DD".equals(formatString)){
			endIndex = 11;
			searchStr = "-";
			replaceStr = "/";
		}else{
			endIndex = 11;
		}
		String result = "SUBSTRING(replace(convert(varchar** "+column+"**121)** '"+searchStr+"'**'"+replaceStr+"')**0**"+endIndex+")";
		return result;
	}

}

package ddd.base.persistence;

import java.io.BufferedReader;
import java.io.Reader;
import java.sql.Clob;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;

import oracle.sql.CLOB;
import ddd.base.exception.DDDException;
import ddd.base.util.SQLUtil;

/**
 * 类名称：ListMapHander 类描述： 实现<code>ResultSetHander</code>
 * 接口,用于将结果集每一行里面的的放入Map<String,Object>中，然后在将这个Map存入LinkedHashSet中。
 */
public class ORMapMapper implements ORMapper<Map<String, Object>>
{
	private String[]	properties;
	
	public ORMapMapper(String sql, String[] properties) throws SQLException
	{
		String temp = sql.toLowerCase().trim();
		if (temp.startsWith("select * from") && (properties == null || properties.length == 0))
		{
			throw new SQLException("sql语句中使用select * ,请将*号指明具体字段名:" + sql);
		}
		if (properties != null && properties.length != 0)
		{
			this.properties = properties;
		} else
		{
			this.properties = SQLUtil.getProperties(sql);
		}
	}
	
	@Override
	public Set<Map<String, Object>> maps(ResultSet rs) throws SQLException
	{
		Set<Map<String, Object>> resultList = new LinkedHashSet<Map<String, Object>>();
		
		Map<String, Object> m = null;
		while (rs.next())
		{
			m = this.map(rs);
			resultList.add(m);
		}
		return resultList;
	}
	
	@Override
	public Map<String, Object> map(ResultSet rs) throws SQLException
	{
		Map<String, Object> m = new HashMap<String, Object>();
		
		//------------------------bug修改，oracle不能读取大文本——周雪，2016.1.23
		
		//把结果集的列名和数据类型存起来
		Map<String,String> colAndType = new HashMap<String,String>();
		ResultSetMetaData rsm =rs.getMetaData(); //获得列集
		int col = rsm.getColumnCount(); //获得列的个数
		for (int i = 1; i <= col; i++) {
			colAndType.put(rsm.getColumnLabel(i), rsm.getColumnTypeName(i));
		}
		for (String string : properties)
		{
			if("CLOB".equals(colAndType.get(string.toUpperCase()))){
				try
				{
					Clob clob = rs.getClob(string);
					if(clob == null){
						continue;
					}
					String reString = "";
					Reader is = clob.getCharacterStream();// 得到流
					BufferedReader br = new BufferedReader(is);
					String s = br.readLine();
					StringBuffer sb = new StringBuffer();
					while (s != null)
					{
						// 执行循环将字符串全部取出付值给StringBuffer由StringBuffer转成STRING
						sb.append(s);
						s = br.readLine();
					}
					reString = sb.toString();
					m.put(string, reString);
				} catch (Exception e)
				{
					throw new  SQLException("获取大文本内容出错，原因是："+e.getMessage());
				}
			}else{
				Object templateObject = rs.getObject(string);
				m.put(string, templateObject);
			}
		}
		return m;
	}
	
}

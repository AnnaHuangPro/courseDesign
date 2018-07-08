/**
* @Title: SqlServerTableHandler.java
* @Package ddd.base.dbmanager.tableHandler.sqlserver
* @Description: TODO(用一句话描述该文件做什么)
* @author matao@cqrainbowsoft.com
* @date 2016年12月15日 下午5:05:08
* @version V1.0
*/
package ddd.base.dbmanager.tableHandler.sqlserver;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import ddd.base.annotation.ColumnInfo;
import ddd.base.dbmanager.bean.TableColumnInfo;
import ddd.base.dbmanager.bean.TableInfo;
import ddd.base.dbmanager.bean.TypeKeeper;
import ddd.base.dbmanager.tableHandler.TableHandler;
import ddd.base.dbmanager.util.TypeGetter;
import ddd.base.persistence.SessionFactory;
import ddd.base.persistence.baseEntity.Entity;
import ddd.base.persistence.baseEntity.EntityClass;

/**
 * 项目名称：DDD3
 * 类名称：SqlServerTableHandler
 * 类描述：   
 * 创建人：AnotherTen
 * 创建时间：2016年12月15日 下午5:05:08
 * 修改人：胡均
 * 修改时间：2016年12月15日 下午5:05:08
 * 修改备注：   
 * @version 1.0
 * Copyright (c) 2016  DDD
 */
public class SqlServerTableHandler implements TableHandler 
{
	private int varcharMaxLength=255;

	private List<String> keyWords = Arrays.asList("textsize");
	@Override
	public Set<String> getDbTables()
	{
		Set<String> dbTables = new HashSet<String>();
		String sql = "SELECT Name FROM SysObjects Where XType='U' ORDER BY Name";
		Connection connection = SessionFactory.getConnection();
		try {
			Statement statement = connection.createStatement();
			ResultSet rs = statement.executeQuery(sql);
			while(rs.next()){
				dbTables.add(rs.getString("Name"));
			}
			rs.close();
			statement.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			SessionFactory.closeConn(connection);
		}
		return dbTables;
	}

	@Override
	public Set<String> getDBFKNames()
	{
		Set<String> dbFKNames = new HashSet<String>();
		String sql = " select "+
				" fk.name AS  constraintName, "+
				" oMain.name  AS  tableName, "+
				" MainCol.name AS columnName, "+
				" '1' as POSITION"+
				" from "+
				" sys.foreign_keys fk  "+
				" JOIN sys.all_objects oSub ON (fk.parent_object_id = oSub.object_id) "+
				" JOIN sys.all_objects oMain ON (fk.referenced_object_id = oMain.object_id) "+
				" JOIN sys.foreign_key_columns fkCols ON (fk.object_id = fkCols.constraint_object_id) "+
				" JOIN sys.columns SubCol ON (oSub.object_id = SubCol.object_id AND fkCols.parent_column_id = SubCol.column_id) "+
				" JOIN sys.columns MainCol ON (oMain.object_id = MainCol.object_id AND fkCols.referenced_column_id = MainCol.column_id)";
		
		Connection connection = SessionFactory.getConnection();
		try {
			Statement statement = connection.createStatement();
			ResultSet rs = statement.executeQuery(sql);
			while(rs.next()){
				String fkName=rs.getString("tableName")+"_"+rs.getString("columnName");
				dbFKNames.add(fkName.toLowerCase());
			}
			rs.close();
			statement.close();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			SessionFactory.closeConn(connection);
		}
		
		return dbFKNames;
	}

	@Override
	public Map<String, TableInfo> getDBTableInfo(List<EntityClass<? extends Entity>> entityClassesToModify)
	{
		Map<String, TableInfo> result = new HashMap<String, TableInfo>();
		Connection connection = SessionFactory.getConnection();
		try {
			Statement statement = connection.createStatement();
			for (EntityClass<? extends Entity> entityClass : entityClassesToModify) {
				TableInfo tableInfo = new TableInfo();
				tableInfo.setEntityClass(entityClass);
				tableInfo.setTableName(entityClass.getEntityInfo().getName());
				String sql = " SELECT "+
						" sc.TABLE_NAME,  "+
						" sc.COLUMN_NAME,  "+
						" sc.DATA_TYPE,  "+
						" l._maxLength AS DATA_LENGTH, "+
						" sc.NUMERIC_PRECISION AS DATA_PRECISION,  "+
						" sc.NUMERIC_SCALE AS DATA_SCALE,  "+
						" sc.IS_NULLABLE AS NULLABLE,  "+
						" l._constraceName AS constraint_name,  "+
						" l._constraint_type AS constraint_type  "+
						" FROM "+
						" information_schema.columns sc "+
						" LEFT JOIN ( "+
						" SELECT "+
						" tab.name AS _tabName, "+
						" idx.name AS _constraceName, "+
						" col.name AS _colName, "+
						" col.max_length AS _maxLength, "+
						" idx.is_unique_constraint AS _constraint_type "+
						" FROM sys.indexes idx "+
						" JOIN sys.index_columns idxCol ON (idx.object_id = idxCol.object_id AND idx.index_id = idxCol.index_id AND idx.is_unique_constraint = 1) "+
						" JOIN sys.tables tab ON (idx.object_id = tab.object_id) "+
						" JOIN sys.columns col ON (idx.object_id = col.object_id AND idxCol.column_id = col.column_id) "+
						" ) l ON l._tabName = sc.TABLE_NAME AND l._colName = sc.COLUMN_NAME "+
						" WHERE	sc.TABLE_NAME = '"+entityClass.getEntityInfo().getName().toUpperCase()+"'";
				ResultSet rs = statement.executeQuery(sql);
				while(rs.next()){
					TableColumnInfo tableColumnInfo = new TableColumnInfo();
					tableColumnInfo.setColumnName(rs.getString("COLUMN_NAME").toLowerCase());
					tableColumnInfo.setType(rs.getString("DATA_TYPE"));
					tableColumnInfo.setLength(rs.getLong("DATA_LENGTH"));
					tableColumnInfo.setPrecision(rs.getInt("DATA_PRECISION"));
					tableColumnInfo.setScale(rs.getInt("DATA_SCALE"));
					if("N".equals(rs.getString("NULLABLE"))){
						tableColumnInfo.setNullable(false);
					}
					tableColumnInfo.setConstraintName(rs.getString("constraint_name"));
					if("U".equals(rs.getString("constraint_type"))){
						tableColumnInfo.setUnique(true);
					}
					tableInfo.addTableColumnInfo(tableColumnInfo);
				}
				rs.close();
				result.put(tableInfo.getTableName(), tableInfo);
			}
			statement.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally{
			SessionFactory.closeConn(connection);
		}
		
		return result;
	}

	/* (非 Javadoc) 
	* <p>Title: createTable</p> 
	* <p>Description: </p> 
	* @param entityClass
	* @return 
	* @see ddd.base.dbmanager.tableHandler.TableHandler#createTable(ddd.base.persistence.baseEntity.EntityClass) 
	*/
	@Override
	public String createTable(EntityClass<? extends Entity> entityClass)
	{
		StringBuffer buffer = new StringBuffer();
		buffer.append("CREATE TABLE " + entityClass.getEntityInfo().getName()+ " (\n");
		
		Map<String, ColumnInfo> columnInfos =  entityClass.getColumnInfos();
		for (ColumnInfo columnInfo : columnInfos.values()) {
			if(columnInfo.getType() == ColumnInfo.COLUMN_TYPE_ONE2MANY){
				continue;
			}
			
			String columnName = columnInfo.getName();
			if(keyWords.contains(columnName.toLowerCase())){
				columnName = "["+columnName+"]";
			}
			TypeKeeper typeKeeper = TypeGetter.getByJavaType(columnInfo.getClazz().getName());
			
			if(columnInfo.isId()){
				buffer.append(columnName + " "+typeKeeper.getSqlserverType()+" NOT NULL,\n");
			}else{
				if (columnInfo.getType() == ColumnInfo.COLUMN_TYPE_ONE2ONE)
				{
					typeKeeper  = TypeGetter.getByJavaType("java.lang.Long");
				}
				buffer.append(columnName);
				if (!columnInfo.getColumnDefinition().equals(""))
				{
					buffer.append(columnInfo.getColumnDefinition()+",\n");
					continue;
				}
				if(columnInfo.getClazz().equals(String.class)&&columnInfo.getLength()>varcharMaxLength){
					buffer.append(" NTEXT");
				}else{
					buffer.append(" "+typeKeeper.getSqlserverType());
				}
				if(columnInfo.getClazz().equals(String.class)&&columnInfo.getLength()<=varcharMaxLength){
					buffer.append("("+columnInfo.getLength()+")");
				}else if(columnInfo.getClazz().equals(BigDecimal.class)){
					buffer.append("("+columnInfo.getPrecision()+","+columnInfo.getScale()+")");
				}
				if(!columnInfo.isNullable()){
					buffer.append(" NOT NULL");
				}
				buffer.append(" ,\n");
			}
			
		}
		buffer.append("PRIMARY KEY (EId)\n");
		buffer.append(")");
		
		return buffer.toString();
	}

	@Override
	public String createMiddleTable(ColumnInfo columnInfo)
	{
		String joinTableName=columnInfo.getJoinTableName();
		String joinTableOneSide=columnInfo.getJoinTableOneSide();
		String joinTableManySide=columnInfo.getJoinTableManySide();
		StringBuffer sb = new StringBuffer();
		TypeKeeper typeKeeper = TypeGetter.getByJavaType("java.lang.Long");
		String type=typeKeeper.getSqlserverType();
		
		sb.append("CREATE TABLE " +joinTableName+ " (\n");
		sb.append(joinTableOneSide +" "+type+",\n");
		sb.append(joinTableManySide +" "+type+",\n");
		sb.append("displayIndex "+type+",\n");
		sb.append("primary key("+joinTableOneSide+","+joinTableManySide+")\n");
		sb.append(")");
		return sb.toString();
	}

	@Override
	public String addNewColumnSql(String tableName, String columnName, String javaType, ColumnInfo columnInfo)
	{
		String sql = null;
		TypeKeeper typeKeeper = TypeGetter.getByJavaType(javaType,columnInfo);
		if (columnInfo.getType() == ColumnInfo.COLUMN_TYPE_ONE2ONE)
		{
			typeKeeper  = TypeGetter.getByJavaType("java.lang.Long");
		}
		
		String type = typeKeeper.getSqlserverType();
		if(type.equalsIgnoreCase("CLOB")){
			sql="alter table "+tableName+" add ("+columnName+" "+type+")";
		}else if(type.equalsIgnoreCase("DATE")){
			sql="alter table "+tableName+" add "+columnName+" "+ type;
		}else if(type.equalsIgnoreCase("NUMBER")){
			sql="alter table "+tableName+" add "+columnName+" "+type;
		}else if(type.equalsIgnoreCase("VARCHAR2")){
			type = type + "("+columnInfo.getLength()+")";
			sql="alter table "+tableName+" add "+columnName+" "+type;
		}else{
			sql="alter table "+tableName+" add "+columnName+" "+type;
		}
		if(!columnInfo.isNullable()){
			sql +=" not null";
		}
		return sql;
	}

	@Override
	public String createFKConstraintSql(String manySideColumnName, String manySideTableName, String oneSideTableName, String contraintName)
	{
		String fkSql=this.removeConstact(manySideTableName, contraintName)+" ;alter table "+manySideTableName+" add constraint "+contraintName+" foreign key("+manySideColumnName+")"+" references "+oneSideTableName+"(EId)";
		return fkSql;
	}

	@Override
	public String createUniqueConstraintSql(String tableName, String columnName, String contraintName)
	{
		String sql ="alter table "+tableName+" add constraint "+contraintName+" unique ("+columnName+")";
		return sql;
	}

	@Override
	public void modify(String tableName, ColumnInfo columnInfo, TableColumnInfo tableColumnInfo, List<String> modifySqls)
	{
		TypeKeeper typeKeeper = TypeGetter.getByJavaType(columnInfo.getClazz().getName());
		if (columnInfo.getType() == ColumnInfo.COLUMN_TYPE_ONE2ONE)
		{
			typeKeeper  = TypeGetter.getByJavaType("java.lang.Long");
		}
		String type = typeKeeper.getSqlserverType();
		if(columnInfo.getClazz().equals(String.class)){
			if(columnInfo.getLength()>varcharMaxLength){
				type = "CLOB";
			}else{
				type = type + "("+columnInfo.getLength()+")";
			}
		}else if(columnInfo.getClazz().equals(BigDecimal.class)){
			type = type + "("+columnInfo.getPrecision()+","+columnInfo.getScale()+")";
		}
		
		String dbType = tableColumnInfo.getType();
		String dbType2 = dbType;
		if(dbType.equals("VARCHAR2")){
			dbType2 = dbType+="("+tableColumnInfo.getLength()+")";
		}else if(dbType.equals("FLOAT")){
			dbType2 = dbType+="("+tableColumnInfo.getPrecision()+")";
		}else if(dbType.equals("NUMBER")){
			if(columnInfo.getClazz().equals(BigDecimal.class)){
				dbType2 = dbType;
				dbType+="("+tableColumnInfo.getPrecision()+","+tableColumnInfo.getScale()+")";
			}else if(tableColumnInfo.getPrecision()!=0){
				dbType2 = dbType+="("+tableColumnInfo.getPrecision()+","+tableColumnInfo.getScale()+")";
			}
		}
		
		if(!type.equalsIgnoreCase(dbType2)){	
			String modifyType = "";
			if(type.equals("CLOB"))
			{
				//this.modifyCloumnType(tableName, columnInfo.getName(), "CLOB",modifySqls);
			}
			else
			{
				modifyType = "alter table "+tableName+"  ALTER COLUMN "+columnInfo.getName()+" "+type;
				if(!columnInfo.isNullable()){
					modifyType +=" not null";
				}
				modifySqls.add(modifyType);
			}
		}else if(columnInfo.isNullable() != tableColumnInfo.isNullable()){
			String modifyNullable = "alter table "+tableName+"  ALTER COLUMN "+columnInfo.getName()+" "+type;
			if(!columnInfo.isNullable()){
				modifyNullable +=" not null";
			}else{
				modifyNullable +=" null";
			}
			modifySqls.add(modifyNullable);
		}
		if(columnInfo.isUnique()!=tableColumnInfo.isUnique() && !columnInfo.isId()){
			String modifyUnique = null;
			if(tableColumnInfo.isUnique()){
				modifyUnique="alter table "+tableName+" drop constraint "+tableColumnInfo.getConstraintName()+" cascade";
			}else{
				String uniqueName = columnInfo.getUniqueName();
				if("".equals(uniqueName)){
					uniqueName = tableName+"_u_"+columnInfo.getName();
				}
				modifyUnique=this.removeConstact(tableName, uniqueName)+" ;  alter table "+tableName+" add constraint "+uniqueName+" unique ("+columnInfo.getName()+")";
			}
			modifySqls.add(modifyUnique);
		}
		
	}

	private String removeConstact(String tabName,String constactName){
		return  "IF EXISTS (SELECT  *  from  INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = '"+constactName+"') ALTER TABLE "+tabName+" DROP CONSTRAINT "+constactName;
	}
	
	@Override
	public String renameTableName(String oldName, String newName)
	{
		// TODO Auto-generated method stub
		return null;
	}

	/* (非 Javadoc) 
	* <p>Title: renameColumnName</p> 
	* <p>Description: </p> 
	* @param tableName
	* @param oldName
	* @param newName
	* @param javaType
	* @param size
	* @return 
	* @see ddd.base.dbmanager.tableHandler.TableHandler#renameColumnName(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.Integer) 
	*/
	@Override
	public String renameColumnName(String tableName, String oldName, String newName, String javaType, Integer size)
	{
		// TODO Auto-generated method stub
		return null;
	}

	/* (非 Javadoc) 
	* <p>Title: addColumn</p> 
	* <p>Description: </p> 
	* @param tableName
	* @param columnName
	* @param javaType
	* @param size
	* @return 
	* @see ddd.base.dbmanager.tableHandler.TableHandler#addColumn(java.lang.String, java.lang.String, java.lang.String, java.lang.Integer) 
	*/
	@Override
	public String addColumn(String tableName, String columnName, String javaType, Integer size)
	{
		// TODO Auto-generated method stub
		return null;
	}

	/* (非 Javadoc) 
	* <p>Title: modifyColumn</p> 
	* <p>Description: </p> 
	* @param tableName
	* @param columnName
	* @param javaType
	* @param size
	* @return 
	* @see ddd.base.dbmanager.tableHandler.TableHandler#modifyColumn(java.lang.String, java.lang.String, java.lang.String, java.lang.Integer) 
	*/
	@Override
	public String modifyColumn(String tableName, String columnName, String javaType, Integer size)
	{
		// TODO Auto-generated method stub
		return null;
	}
	
}

package ddd.simple.dao.model.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import ddd.base.Config;
import ddd.base.persistence.EntitySet;
import ddd.base.persistence.SessionFactory;
import ddd.base.persistence.baseEntity.EntityClass;
import ddd.base.util.DateUtil;
import ddd.simple.dao.base.BaseDao;
import ddd.simple.dao.model.ModelDataDao;
import ddd.simple.entity.model.Model;
import ddd.simple.entity.model.ModelItem;


@Service
public class ModelDataDaoBean extends BaseDao implements ModelDataDao
{
	

	public int saveModelData(Model model,Map<String,Object> map) throws Exception
	{
		handleModelData(model, map);
		return this.save(model.getModelEnglishName(), map);
	}
	
	@Override
	public int updateModelData(Model model,Map<String,Object> map)  throws Exception{
		String where = " EId = "+map.get("EId");
		handleModelData(model, map);
		return this.update(model.getModelEnglishName(), map, where);
	}
	
	@Override
	public int deleteModelData(String tableName,Long modelDataId)  throws Exception{
		return this.delete(tableName, modelDataId);
	}
	
	@Override
	public Set<Map<String, Object>> findModelDataByTableName(String tableName) throws Exception {
		return this.query("eid=(select max(eid) from "+tableName+")",tableName);
	}
	/**
	 * 处理将要保存的modelData    把外键类型的替换为eid，子表类型的维护中间表
	 * @param model
	 * @param modelDataMap
	 * @throws Exception 
	 */
	private void handleModelData(Model model,Map<String,Object> modelDataMap) throws Exception{
		
		EntitySet<ModelItem> modelItems = model.getModelItems();
		List<String> removekey = new ArrayList<String>(); 
		
		//key为字段名
		for (String key : modelDataMap.keySet()) {
			
			ModelItem modelItem = getModelItem(modelItems, key);
			if(modelItem!=null){
				if("foreignKey".equals(modelItem.getDatatype())){
					JSONObject relatedParameters = JSON.parseObject(modelItem.getRelatedParameters());
						Object value = modelDataMap.get(key);
						if(value instanceof JSONObject){
							JSONObject modelItemValue = (JSONObject)value;
							Object eId = modelItemValue.get("EId")!=null?modelItemValue.get("EId"):modelItemValue.get("eId");
							modelDataMap.put(key, eId);
						}
				}else if("subTable".equals(modelItem.getDatatype())){
					
					maintanMiddleTable(modelDataMap, modelItem);
					
					removekey.add(key);
				}else if("select".equals(modelItem.getDatatype())||"checkbox".equals(modelItem.getDatatype())||"radio".equals(modelItem.getDatatype())){
					JSONObject relatedParameters = JSON.parseObject(modelItem.getRelatedParameters());
						modelDataMap.put(key, modelDataMap.get(modelItem.getModelItemEnglishName()).toString());
				}
				else if("datetime".equals(modelItem.getDatatype()))
				{
					String value = modelDataMap.get(key) == null ? "":modelDataMap.get(key).toString();
					modelDataMap.put(key, DateUtil.toDateFormString(value));
				}
			}
		}
		for (String key : removekey) {
			modelDataMap.remove(key);
		}
		
	}
	/**
	 * 维护中间表
	 * @throws Exception 
	 */
	private void maintanMiddleTable(Map<String,Object> modelDataMap,ModelItem subTableModelItem) throws Exception{
		Object EId = modelDataMap.get("EId");
		String joinTable = subTableModelItem.getJoinTableName();
		this.delete(joinTable, " and oneSide="+EId);
		
		Object subModelData = modelDataMap.get(subTableModelItem.getModelItemEnglishName());
		
		if(subModelData instanceof JSONObject){
			JSONArray subModelDatas = ((JSONObject) subModelData).getJSONArray("value");
			Object[][] params = new Object[subModelDatas.size()][3];
			int i=0;
			for (Object object : subModelDatas) {
				JSONObject subTableData = (JSONObject) object;
				params[i][0]=EId;
				params[i][1]=subTableData.get("EId");
				params[i][2]= i++ ;
			}
			if(params.length>=0){
				String sql="insert into "+joinTable+" (oneSide,manySide,displayIndex) values(?,?,?)";
				SessionFactory.getThreadSession().excuteSql(sql, params);
			}
		}
		
	}
	
	public Map<String, Object> findModelDataByContentId(String tableName,
			Long contentId,String[] properties) throws Exception
	{
		String selectSql = "select * from "+tableName+" where eid ="+contentId;
		
		Set<Map<String, Object>> contents = this.query(selectSql, properties);
		if(contents != null && contents.size() > 0)
		{
			for(Map<String, Object> content : contents)
			{
				return content;
			}
		}
		return null;
	}
	public Map<String, Object> findModelDataByWhere(String tableName,Object[] params,String where) throws Exception
	{
		String selectSql = "select * from "+tableName+" where 1=1 "+where;
		
		String[] properties = SessionFactory.getEntityClass(tableName).getProperties();
		
		Set<Map<String, Object>> contents = this.query(selectSql, params, properties);
		if(contents != null && contents.size() > 0)
		{
			for(Map<String, Object> content : contents)
			{
				return content;
			}
		}
		return null;
	}
	/**
	 * 加载   外键数据
	 * @param model
	 * @param modelDataMap
	 * @param modelItemEnglishName 需要加载的模型项英文名
	 * @throws Exception
	 */
	public void loadForeignKey(Model model,Map<String,Object> modelDataMap,String modelItemEnglishName) throws Exception{
		EntitySet<ModelItem> modelItems = model.getModelItems();
		ModelItem modelItem = getModelItem(modelItems, modelItemEnglishName);
		
		loadForeignKeyData(model, modelDataMap, modelItem);
	}
	/**
	 * 加载所有   外键数据
	 * @param model
	 * @param modelDataMap
	 * @throws Exception
	 */
	public void loadForeignKey(Model model,Map<String,Object> modelDataMap) throws Exception{
		EntitySet<ModelItem> modelItems = model.getModelItems();
		for (ModelItem modelItem : modelItems) {
			if("select".equals(modelItem.getDatatype())){
				JSONObject relatedParameters = JSON.parseObject(modelItem.getRelatedParameters());
				if("foreignKey".equals(relatedParameters.getString("type"))){
					loadForeignKeyData(model, modelDataMap, modelItem);
				}
			}
		}
	}
	
	private void loadForeignKeyData(Model model,Map<String,Object> modelDataMap,ModelItem foreignKeyModelItem) throws Exception{
		if("select".equals(foreignKeyModelItem.getDatatype())){
			JSONObject relatedParameters = JSON.parseObject(foreignKeyModelItem.getRelatedParameters());
			if("foreignKey".equals(relatedParameters.getString("type"))){
				String foreignKeyTableName = relatedParameters.getString("tableName");
				Object modelDataforeignKey = modelDataMap.get(foreignKeyModelItem.getModelItemEnglishName());
				
				String where =" and EId =?";
				Object[] params=new Object[]{modelDataforeignKey};
				Map<String, Object> modelDataforeignKeyValue = findModelDataByWhere(foreignKeyTableName,params,where); 
				
				modelDataMap.put(foreignKeyModelItem.getModelItemEnglishName(), modelDataforeignKeyValue);
			}
		}
	}
	
	/**
	 * 加载   子表数据
	 * @param model
	 * @param modelDataMap
	 * @param modelItemEnglishName 需要加载的模型项英文名
	 * @throws Exception 
	 */
	public void loadSubTable(Model model,Map<String,Object> modelDataMap,String modelItemEnglishName) throws Exception{
		EntitySet<ModelItem> modelItems = model.getModelItems();
		ModelItem modelItem = getModelItem(modelItems, modelItemEnglishName);
		
		loadSubTableData(model, modelDataMap, modelItem);
	}
	/**
	 * 加载所有的   子表数据
	 * @param model
	 * @param modelDataMap
	 * @throws Exception
	 */
	public void loadSubTable(Model model,Map<String,Object> modelDataMap) throws Exception{
		EntitySet<ModelItem> modelItems = model.getModelItems();
		for (ModelItem modelItem : modelItems) {
			if("subTable".equals(modelItem.getDatatype())){
				
				loadSubTableData(model, modelDataMap, modelItem);
			}
		}
	}
	private void loadSubTableData(Model model,Map<String,Object> modelDataMap,ModelItem subTableModelItem) throws Exception{
		if(subTableModelItem!=null){
			String subTable = subTableModelItem.getSubModelEnglishName();
			String joinTable = subTableModelItem.getJoinTableName();
			EntityClass<?> entityClass = SessionFactory.getEntityClass(subTable);
			String[] properties = entityClass.getProperties();
			
			StringBuilder sb = new StringBuilder("select s.* from ");
			sb.append(subTable);
			sb.append(" s,");
			sb.append(joinTable);
			sb.append(" j where j.");
			sb.append("oneSide");
			sb.append("=");
			sb.append(modelDataMap.get("EId"));
			sb.append(" and j.");
			sb.append("manySide");
			sb.append("=s.EId");
			
			Set<Map<String,Object>> result = this.query(sb.toString(), properties);
			
			
			JSONObject subTableData = new JSONObject();
			JSONObject relatedParameters = JSON.parseObject(subTableModelItem.getRelatedParameters());
			
			subTableData.put("displayColumns", relatedParameters.get("displayColumns"));
			
			subTableData.put("operationColumns",relatedParameters.get("operationColumns") );
			
			subTableData.put("operationBarButtons", relatedParameters.get("operationBarButtons"));
			
			subTableData.put("subTable", subTable);
			
			subTableData.put("subTableFormKey", subTable+"Template");
			
			subTableData.put("value", result);
			
			modelDataMap.put(subTableModelItem.getModelItemEnglishName(), subTableData);
		}
	}
	
	/**
	* 加载所有复选框数据
	* @param model
	* @param modelDataMap
	* @param modelItemEnglishName
	* @throws Exception 
	 */
	public void loadCheckBox(Model model,Map<String,Object> modelDataMap) throws Exception{
		EntitySet<ModelItem> modelItems = model.getModelItems();
		for (ModelItem modelItem : modelItems) {
			if("choose".equals(modelItem.getDatatype())){
				JSONObject relatedParameters = JSON.parseObject(modelItem.getRelatedParameters());
				String key = modelItem.getModelItemEnglishName();
				if("checkbox".equals(relatedParameters.getString("type")) && modelDataMap.get(key) != null){
					modelDataMap.put(key, JSONObject.parse(modelDataMap.get(key).toString()));
				}
			}
		}
	}
	
	private ModelItem getModelItem(EntitySet<ModelItem> modelItems,String modelItemEnglishName){
		for (ModelItem modelItem : modelItems) {
			if(modelItem.getModelItemEnglishName().equals(modelItemEnglishName)){
				return modelItem;
			}
		}
		return null;
	}
	
	public Map<String,Object> JsonToMap(String data)
	{
		Map<String,Object> callbackMap = new HashMap<String,Object>();
		String jsonStr = data.substring(1, data.length()-1);
		
		// 将json字符串转换成jsonObject
		JSONObject jsonObject = JSONObject.parseObject(jsonStr);
		// 遍历jsonObject数据，添加到Map对象  
		
		for (String key : jsonObject.keySet()) {
			if(!key.equals("EId"))
	        {
	        	callbackMap.put(key, jsonObject.get(key));
	        }
		}
	    return callbackMap;
	}

	@Override
	public Set<Map<String, Object>> getDataByConditions(Model model,Date startDate, Date endDate, int number) throws Exception {
		String tableName = model.getModelEnglishName();
		String andString = "and column_name='checkResult' and column_name='submitTime'";
		if(judgeExist(tableName,andString) > 0){
			StringBuilder selectSql = new StringBuilder();
			selectSql.append("select ");
			for(ModelItem item : model.getModelItems()){
				selectSql.append( "t1." + item.getModelItemEnglishName() + ",");
			}
			selectSql.append("t2.clicks ");
			selectSql.append("from "+tableName+" t1, clickvolume t2  where t1.EId = t2.modelDataEId  and t1.submitTime between '"+DateUtil.formatDateTime(startDate)+"' and '"+DateUtil.formatDateTime(endDate)+"' and t1.checkResult = '通过' order by t2.clicks desc");
			return this.query(selectSql.toString());
		}
		return null;
	}
	
	
	@Override
	public Set<Map<String, Object>> getLatestDataByTNameAndNum(String tableName, int number) throws Exception {
		String andString = "and column_name='checkResult' and column_name='submitTime'";
		if(judgeExist(tableName,andString) > 0){
			String whereSql = "checkResult = '通过' order by submitTime desc limit "+number;
			return this.query(whereSql, tableName);
		}
		return null;
	}
	@Override
	public int getTotalModelData(Date startDate, Date endDate, String tableName) throws Exception {
		String andString = "and column_name='checkResult' and column_name='submitTime'";
		if(judgeExist(tableName,andString) > 0){
			String selectSql = "select count(*) as count from "+ tableName +" where checkResult = '通过' and submitTime between '"+ DateUtil.formatDateTime(startDate) +"' and '"+  DateUtil.formatDateTime(endDate) +"'";
			Set<Map<String,Object>> result =  this.query(selectSql, new String[0]);
			return Integer.parseInt(result.iterator().next().get("count").toString());
		}
		return 0;
	}

	@Override
	public int getAllTotal(String tableName) throws Exception
	{
		String andString = "and column_name='checkResult'";
		if(judgeExist(tableName,andString) > 0){
			String selectSql = "select count(*) as count from "+ tableName +" where checkResult = '通过' ";
			Set<Map<String,Object>> result =  this.query(selectSql, new String[0]);
			return Integer.parseInt(result.iterator().next().get("count").toString());
		}
		return 0;
	}
	private Integer judgeExist(String tableName,String andString) throws Exception{
		String isExsistSql = "select count(*) as count from information_schema.columns where table_name='"+tableName +"' "+ andString;
		Set<Map<String,Object>> isExsistResult =  this.query(isExsistSql, new String[0]);
		return Integer.parseInt(isExsistResult.iterator().next().get("count").toString());
	}
}

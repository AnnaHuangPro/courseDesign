package ddd.simple.service.model;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

import ddd.base.persistence.EntitySet;
import ddd.simple.entity.model.Model;
import ddd.simple.entity.model.ModelItem;

public interface ModelDataService  
{
	public Map<String, Object> saveModelData(String modelName,Map<String,Object> map);
	
	public Map<String,Object> updateModelData(String modelName,Map<String,Object> map) ;
	
	public int deleteModelData(String modelName,Long modelDataId);
	
	public Set<Map<String, Object>> findModelDataByTableName(String tableName) ;
	
	public String submitModelData(String modelName,Map<String,Object> modelData);

	public Map<String, Object> findModelDataByContentId(String modelName, Long contentId);
	
	public Map<String, Object> findSubtableInfo(String tableName);
	
	public Map<String, Object> getProcessVariable(EntitySet<ModelItem> modelItems, Map<String, Object> modelData);

	public Set<Map<String, Object>> getLatestDataByTNameAndNum(String tableName, int number);

	public Set<Map<String, Object>> getDataByConditions(Model model,Date startDate, Date currentDate, int number);
	
	public List<Object> getCurrentDayTotalByModels();

	Set<Map<String, Object>> getCurrentDayDataByModel(Long modelId, int number);

	Set<Map<String, Object>> getCurrentMonthDataByModel(Long modelId, int number);

	Set<Map<String, Object>> getCurrentYearDataByModel(Long modelId, int number);
	
	public int getTotalByModel(Date startDate, Date endDate,Long modelId);
	
	Map<String, Object> getMonthTotalTongjiByModel(int year, int month, Long modelId);
	

	Map<String, Object> getYearTotalTongjiByModel(int year, Long modelId) throws Exception;

}
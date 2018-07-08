package ddd.simple.dao.model;

import java.util.Date;
import java.util.Map;
import java.util.Set;

import ddd.simple.dao.base.BaseDaoInterface;
import ddd.simple.entity.model.Model;

public interface ModelDataDao extends BaseDaoInterface
{
	public int saveModelData(Model model,Map<String,Object> map) throws Exception;
	
	public int updateModelData(Model model,Map<String,Object> map) throws Exception;
	
	public int deleteModelData(String tableName,Long modelDataId) throws Exception;
	
	public Set<Map<String, Object>> findModelDataByTableName(String tableName) throws Exception;

	public Map<String, Object> findModelDataByContentId(String tableName,Long contentId,String[] properties) throws Exception;
	
	/**
	 * 加载   外键数据
	 * @param model
	 * @param modelDataMap
	 * @param modelItemEnglishName 需要加载的模型项英文名
	 * @throws Exception
	 */
	public void loadForeignKey(Model model,Map<String,Object> modelDataMap,String modelItemEnglishName) throws Exception;
	/**
	 * 加载所有   外键数据
	 * @param model
	 * @param modelDataMap
	 * @throws Exception
	 */
	public void loadForeignKey(Model model,Map<String,Object> modelDataMap) throws Exception;
	
	/**
	 * 加载   子表数据
	 * @param model
	 * @param modelDataMap
	 * @param modelItemEnglishName 需要加载的模型项英文名
	 * @throws Exception 
	 */
	public void loadSubTable(Model model,Map<String,Object> modelDataMap,String modelItemEnglishName) throws Exception;
	/**
	 * 加载所有的   子表数据
	 * @param model
	 * @param modelDataMap
	 * @throws Exception
	 */
	public void loadSubTable(Model model,Map<String,Object> modelDataMap) throws Exception;
	/**
	* 加载所有复选框数据
	* @param model
	* @param modelDataMap
	* @param modelItemEnglishName
	* @throws Exception 
	 */
	public void loadCheckBox(Model model,Map<String,Object> modelDataMap) throws Exception;

	/**
	 * 获取一定数量的一定日期的一定表的按一定字段排序的模型数据。
	 * @param model
	 * @param startDate
	 * @param endDate
	 * @param sortFiled
	 * @param number
	 * @return
	 * @throws Exception 
	 */
	public Set<Map<String, Object>> getDataByConditions(Model model,Date startDate, Date endDate, int number) throws Exception;

	/**
	 * 获取一定数量的最新模型数据
	 * @param tableName
	 * @param number
	 * @return
	 * @throws Exception
	 */
	public Set<Map<String, Object>> getLatestDataByTNameAndNum(String tableName, int number) throws Exception;

	/**
	 * 获取规定的时间段内的所有的模型数据的数量
	 * @param startDate
	 * @param endDate
	 * @param tableName
	 * @return
	 * @throws Exception
	 */
	public int getTotalModelData(Date startDate, Date endDate, String tableName) throws Exception;

	int getAllTotal(String tableName) throws Exception;

}

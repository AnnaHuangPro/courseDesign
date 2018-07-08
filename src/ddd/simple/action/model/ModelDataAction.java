package ddd.simple.action.model;

import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.entity.listview.DataSource;
import ddd.simple.entity.model.Model;
import ddd.simple.service.listview.DataSourceService;
import ddd.simple.service.model.ModelDataService;
import ddd.simple.service.model.ModelService;
@Action
@RequestMapping("/ModelData")
@Controller
public class ModelDataAction
{
	@Resource(name="modelDataServiceBean")
	private ModelDataService modelDataService;
	
	@Resource(name="modelServiceBean")
	private ModelService modelService;
	
	@Resource(name = "dataSourceServiceBean")
	private DataSourceService dataSourceService;
	
	public Map<String,Object> saveModelData(String tableName,HashMap modelData)
	{
		try {
			return this.modelDataService.saveModelData(tableName,modelData);
		} catch (DDDException e) {
			
			throw e;
		}
	}
	
	public Map<String,Object> updateModelData(String tableName, Map<String, Object> modelData)
	{
		try {
			return this.modelDataService.updateModelData(tableName,modelData);
		} catch (DDDException e) {
			
			throw e;
		}
	}
	
	public int deleteModelData(String tableName,Long modelDataId){
		
		try {
			
			return this.modelDataService.deleteModelData(tableName,modelDataId);
		} catch (DDDException e) {
			throw e;
		}
		
	}
	
	public Map<String,Object> findModelDataByContentId(String tableName,Long contentId)
	{
		try 
		{
			 return this.modelDataService.findModelDataByContentId(tableName,contentId);
		} 
		catch (DDDException e) {
			throw e;
		}
	}
	
	public Map<String,Object>findSubtableInfo(String tableName)
	{
		try 
		{
			 return this.modelDataService.findSubtableInfo(tableName);
		} 
		catch (DDDException e) {
			throw e;
		}
	}

	public Set<Map<String, Object>> findModelDataByTableName(String tableName){
		try{
			Set<Map<String, Object>> allModelData = this.modelDataService.findModelDataByTableName(tableName);
			if(allModelData == null){
				return new HashSet<Map<String, Object>>();
			}
			return allModelData;
		} catch (DDDException e) {
			throw e;
		}
	}

	public Set<Map<String, Object>> getCurrentDayDataByModel(Long modelId,int number){
		try{
			return this.modelDataService.getCurrentDayDataByModel(modelId, number);
		} catch (DDDException e) {
			throw e;
		}
	}
	public Set<Map<String, Object>> getCurrentMonthDataByModel(Long modelId,int number){
		try{
			return this.modelDataService.getCurrentMonthDataByModel(modelId, number);
		} catch (DDDException e) {
			throw e;
		}
	}
	public Set<Map<String, Object>> getCurrentYearDataByModel(Long modelId,int number){
		try{
			return this.modelDataService.getCurrentYearDataByModel(modelId, number);
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public List<Object> getCurrentDayAllPublishedTotal(){
		try
		{
			return this.modelDataService.getCurrentDayTotalByModels();
		} catch (DDDException e)
		{
			throw e;
		}
	}
	public Set<Map<String, Object>> getLatestDataByTNameAndNum(String tableName, int number)
	{
		try{
			Set<Map<String, Object>> modelData = this.modelDataService.getLatestDataByTNameAndNum(tableName,number);
			if(modelData == null){
				return new HashSet<Map<String, Object>>();
			}
			return modelData;
		} catch (DDDException e) {
			throw e;
		}
	}

	public String submitModelData(String tableName,HashMap modelData,String operate)
	{
		try
		{
			return this.modelDataService.submitModelData(tableName, modelData);
		} 
		catch (DDDException e) 
		{
			throw e;
		}
	}
	public Map<String,Object> getMonthTotalTongjiByModel(int year,int month,Long modelId){
		try
		{
			return this.modelDataService.getMonthTotalTongjiByModel(year,month,modelId);
		} catch (DDDException e)
		{
			throw e;
		}
	}
	public Map<String,Object> getYearTotalTongjiByModel(int year,Long modelId) throws Exception{
		try
		{
			return this.modelDataService.getYearTotalTongjiByModel(year,modelId);
		} catch (Exception e)
		{
			throw e;
		}
	}
	
	public Set<Map<String, Object>> getDataSourceResult(String dataSourceCode, Map<String, Object> params)
	{
		try
		{
			DataSource dataSource = this.dataSourceService.findDataSourceByCode(dataSourceCode);
			if(dataSource == null)
			{
				return null;
			}
			
			return this.dataSourceService.getDataSourceResult(dataSource, params);
		} 
		catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("getDataSourceResult(DataSource dataSource,Map<String, Object> params)", "获取数据源结果失败", e);
		}
	}
	
}
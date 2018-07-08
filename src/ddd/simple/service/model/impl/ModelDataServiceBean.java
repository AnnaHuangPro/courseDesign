package ddd.simple.service.model.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.time.DateUtils;
import org.springframework.stereotype.Service;

import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.base.persistence.SessionFactory;
import ddd.base.persistence.baseEntity.EntityClass;
import ddd.base.util.MD5Util;
import ddd.simple.dao.model.ModelDataDao;
import ddd.simple.entity.billCode.BillCode;
import ddd.simple.entity.model.Model;
import ddd.simple.entity.model.ModelItem;
import ddd.simple.service.billCode.BillCodeService;
import ddd.simple.service.model.ModelDataService;
import ddd.simple.service.model.ModelItemService;
import ddd.simple.service.model.ModelService;
import ddd.simple.service.model.extend.ModelDataExtInterface;

@Service
public class ModelDataServiceBean implements ModelDataService
{
	
	@Resource(name = "modelDataDaoBean")
	private ModelDataDao modelDataDao;
	
	@Resource(name = "modelServiceBean")
	private ModelService modelService;
	
	@Resource(name = "modelItemServiceBean")
	private ModelItemService modelItemService;
	
	@Resource(name = "billCodeServiceBean")
	private BillCodeService billCodeService;
	
	private ModelDataExtInterface modelDataExtend;
	
	public ModelDataExtInterface getModelDataExtend()
	{
		return modelDataExtend;
	}
	
	public void setModelDataExtend(ModelDataExtInterface modelDataExtend)
	{
		this.modelDataExtend = modelDataExtend;
	}
	
	@Override
	public Map<String, Object> saveModelData(String modelName, Map<String, Object> map)
	{
		try
		{
			Model model = modelService.findModelByEnglishName(modelName);
			if (model == null)
			{
				throw new DDDException("不存在模型:" + modelName);
			}
			
			Map<String, Object> publicParams = new HashMap<String, Object>();
			map.put("EId", SessionFactory.getNewPrimarykey(model.getModelEnglishName()));
			if (this.modelDataExtend != null)
			{
				this.modelDataExtend.beforeSaveModelData(model, map, publicParams);
			}
			
			map = this.saveModelDataSelfDo(model, map);
			
			if (this.modelDataExtend != null)
			{
				this.modelDataExtend.afterSaveModelData(model, map, publicParams);
			}
			
			return map;
			
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("saveModelData", e.getMessage(), e);
		}
	}
	
	private Map<String, Object> saveModelDataSelfDo(Model model, Map<String, Object> dataMap) throws Exception
	{
		this.modelDataDao.saveModelData(model, dataMap);
		return this.findModelDataByContentId(model.getModelEnglishName(), Long.parseLong(dataMap.get("EId").toString()));
	}
	
	@Override
	public Map<String, Object> updateModelData(String modelName, Map<String, Object> map)
	{
		try
		{
			Model model = modelService.findModelByEnglishName(modelName);
			if (model == null)
			{
				throw new DDDException("不存在模型:" + modelName);
			}
			
			Map<String, Object> publicParams = new HashMap<String, Object>();
			if (this.modelDataExtend != null)
			{
				this.modelDataExtend.beforeUpdateModelData(model, map, publicParams);
			}
			
			map = this.updateModelDataSelfDo(model, map);
			
			if (this.modelDataExtend != null)
			{
				this.modelDataExtend.afterUpdateModelData(model, map, publicParams);
			}
			
			return map;
			
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("updateModelData", e.getMessage(), e);
		}
	}
	
	private Map<String, Object> updateModelDataSelfDo(Model model, Map<String, Object> dataMap) throws Exception
	{
		this.modelDataDao.updateModelData(model, dataMap);
		return this.findModelDataByContentId(model.getModelEnglishName(), Long.parseLong(dataMap.get("EId").toString()));
	}
	
	@Override
	public int deleteModelData(String modelName, Long modelDataId)
	{
		try
		{
			Map<String, Object> publicParams = new HashMap<String, Object>();
			if (this.modelDataExtend != null)
			{
				this.modelDataExtend.beforeDeleteModelData(modelName, modelDataId, publicParams);
			}
			int num = this.modelDataDao.deleteModelData(modelName, modelDataId);
			if (this.modelDataExtend != null)
			{
				this.modelDataExtend.afterDeleteModelData(modelName, modelDataId, publicParams);
			}
			return num;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("deleteModelData", e.getMessage(), e);
		}
		
	}
	
	@Override
	public Set<Map<String, Object>> findModelDataByTableName(String tableName)
	{
		try
		{
			return this.modelDataDao.findModelDataByTableName(tableName);
		} catch (Exception e)
		{
			e.printStackTrace();
			if (e.getMessage().matches("Table [\\w.']+ doesn\\'t exist"))
			{
				// 表不存在 吞掉
				return null;
			} else
			{
				throw new DDDException("findModelDataByTableName", e.getMessage(), e);
			}
		}
	}
	
	public String submitModelData(String modelName, Map<String, Object> modelData)
	{
		try
		{
			// 通用操作
			Model model = this.modelService.findModelByEnglishName(modelName);
			if (model == null)
			{
				throw new DDDException("不存在模型:" + modelName);
			}
			EntitySet<ModelItem> modelItems = this.modelItemService.findModelItemsByModelId(model.getEId());
			Map<String, Object> publicParams = new HashMap<String, Object>();
			if (modelDataExtend != null)
			{
				modelDataExtend.beforeSubmitModelData(model, modelData, publicParams);
			}
			
			// 生成数据唯一编码
			BillCode billCode = this.billCodeService.findBillCodeByName(modelName);
			if (null != billCode)
			{
				String billCodeVal = this.billCodeService.genNewBillCode(modelName);
				modelData.put(billCode.getColumnName(), billCodeVal);
			}
			if (modelData.containsKey("EId"))
			{
				this.modelDataDao.updateModelData(model, modelData);
			} else
			{
				modelData.put("EId", SessionFactory.getNewPrimarykey(model.getModelEnglishName()));
				this.modelDataDao.saveModelData(model, modelData);
			}
			Map<String, Object> processVar = this.getProcessVariable(modelItems, modelData);
			// 扩展
			if (modelDataExtend != null)
			{
				return modelDataExtend.submitModelData(processVar, model, modelData);
			}
			return "";
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("submitModelData", e.getMessage(), e);
		}
	}
	
	public Map<String, Object> findModelDataByContentId(String modelName, Long contentId)
	{
		try
		{
			String[] properties = null;
			EntityClass clazz = SessionFactory.getEntityClass(modelName);
			if (clazz != null)
			{
				properties = clazz.getProperties();
			}
			Map<String, Object> result = this.modelDataDao.findModelDataByContentId(modelName, contentId, properties);
			Model model = this.modelService.findModelByEnglishName(modelName);
			if (model == null)
			{
				throw new DDDException("不存在模型:" + modelName);
			}
			this.modelDataDao.loadForeignKey(model, result);
			this.modelDataDao.loadSubTable(model, result);
			this.modelDataDao.loadCheckBox(model, result);
			
			return result;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("findModelDataByContentId", e.getMessage(), e);
		}
	}
	
	public Map<String, Object> findSubtableInfo(String tableName)
	{
		try
		{
			Model model = this.modelService.findModelByEnglishName(tableName);
			if (model == null)
			{
				throw new DDDException("不存在模型:" + tableName);
			}
			Map<String, Object> result = new HashMap<String, Object>();
			this.modelDataDao.loadSubTable(model, result);
			return result;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("findSubtableInfo", e.getMessage(), e);
		}
	}
	
	public boolean checkIsChanged(String tableName, Map<String, Object> modelData)
	{
		
		MD5Util md5Util = new MD5Util();
		Map<String, Object> content = this.findModelDataByContentId(tableName, Long.valueOf(modelData.get("EId").toString()));
		
		Set<String> keys = modelData.keySet();
		for (String key : keys)
		{
			String newValue = modelData.get(key).toString();
			String oldValue = content.get(key).toString();
			if (!md5Util.getMD5(newValue).equals(md5Util.getMD5(oldValue)))
			{
				return false;
			}
		}
		return true;
		
	}
	
	public Map<String, Object> getProcessVariable(EntitySet<ModelItem> modelItems, Map<String, Object> modelData)
	{
		try
		{
			Map<String, Object> processVar = new HashMap<String, Object>();
			
			for (ModelItem modelItem : modelItems)
			{
				if (modelItem.getIsProcess() != null && modelItem.getIsProcess().equals("是"))
				{
					String key = modelItem.getModelItemEnglishName();
					processVar.put(key, modelData.get(key));
				}
			}
			return processVar;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("getProcessVariable", e.getMessage(), e);
		}
	}
	
	@Override
	public Set<Map<String, Object>> getDataByConditions(Model model, Date startDate, Date currentDate, int number)
	{
		Set<Map<String, Object>> modelDatas = new HashSet<Map<String, Object>>();
		try
		{
			if (number > 0)
			{
				modelDatas = this.modelDataDao.getDataByConditions(model, startDate, currentDate, number);
			} else
			{
				return null;
			}
		} catch (Exception e)
		{
			e.printStackTrace();
			if (e.getMessage().matches("Table [\\w.']+ doesn\\'t exist"))
			{
				// 表不存在 吞掉
				return null;
			} else
			{
				throw new DDDException("getDataByConditions", e.getMessage(), e);
			}
		}
		return modelDatas;
	}
	
	@Override
	public Set<Map<String, Object>> getLatestDataByTNameAndNum(String tableName, int number)
	{
		Set<Map<String, Object>> modelDatas = new HashSet<Map<String, Object>>();
		try
		{
			if (number > 0)
			{
				modelDatas = this.modelDataDao.getLatestDataByTNameAndNum(tableName, number);
				if (modelDatas != null) {
					for (int i = 0; i < modelDatas.size(); i++)
					{
						modelDatas.iterator().next().put("type", new String(tableName));
					}
				}
			}
		} catch (Exception e)
		{
			e.printStackTrace();
			if (e.getMessage().matches("Table [\\w.']+ doesn\\'t exist"))
			{
				return null;
			} else
			{
				throw new DDDException("getLatestDataByTNameAndNum", e.getMessage(), e);
			}
		}
		return modelDatas;
	}
	
	@Override
	public Set<Map<String, Object>> getCurrentDayDataByModel(Long modelId, int number)
	{
		Model model = this.modelService.findModelById(modelId);
		Date startDate = new Date();
		startDate.setHours(0);
		startDate.setMinutes(0);
		startDate.setSeconds(0);
		Date endDate = new Date();
		
		return this.getDataByConditions(model, startDate, endDate, number);
	}
	
	@Override
	public Set<Map<String, Object>> getCurrentMonthDataByModel(Long modelId, int number)
	{
		Model model = this.modelService.findModelById(modelId);
		Date startDate = new Date();
		startDate.setDate(1);
		startDate.setHours(0);
		startDate.setMinutes(0);
		startDate.setSeconds(0);
		Date endDate = new Date();
		
		return this.getDataByConditions(model, startDate, endDate, number);
	}
	
	@Override
	public Set<Map<String, Object>> getCurrentYearDataByModel(Long modelId, int number)
	{
		Model model = this.modelService.findModelById(modelId);
		Date startDate = new Date();
		startDate.setMonth(0);
		startDate.setDate(1);
		startDate.setHours(0);
		startDate.setMinutes(0);
		startDate.setSeconds(0);
		Date endDate = new Date();
		
		return this.getDataByConditions(model, startDate, endDate, number);
	}
	
	@Override
	public List<Object> getCurrentDayTotalByModels()
	{
		try
		{
			List<Object> modelAndNum = new ArrayList<Object>();
			EntitySet<Model> models = this.modelService.findAllModel();
			Date startDate = new Date();
			startDate.setHours(0);
			startDate.setMinutes(0);
			startDate.setSeconds(0);
			Date endDate = new Date();
			for (Model model : models)
			{
				if (!Model.STATE_SUBMIT.equals(model.getState()))
				{
					continue;
				}
				Map<String, Object> currentModel = new HashMap<String, Object>();
				String tableName = model.getModelEnglishName();
				
				/*//判断模型是否有checkResult和submitTime这两个字段，不然抛错提醒
				ArrayList<ModelItem> temp = new ArrayList<ModelItem>();
				EntitySet<ModelItem> modelItems = this.modelItemService.findModelItemsByModelId(model.getEId());
				for(ModelItem modelItem:modelItems)
				{
					if(modelItem.getModelItemEnglishName().equals("checkResult"))
					{
						temp.add(modelItem);
					}
					if(modelItem.getModelItemEnglishName().equals("submitTime"))
					{
						temp.add(modelItem);
					}
				}
				if(temp.size() == 2)
				{*/
				int totalNum = modelDataDao.getTotalModelData(startDate, endDate, tableName);
				currentModel.put("name", model.getModelName());
				currentModel.put("value", totalNum);
				/*	modelAndNum.add(currentModel);
				}
				else
				{
					throw new DDDException(model.getModelName() + "模型缺少字段checkResult或submitTime,或者英文名创建错误!");
				}*/
			}
			return modelAndNum;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("getTotalByModels", e.getMessage(), e);
		}
	}
	
	@Override
	public int getTotalByModel(Date startDate, Date endDate, Long modelId)
	{
		try
		{
			
			List<Object> modelAndNum = new ArrayList<Object>();
			Model model = modelService.findModelById(modelId);
			if (model != null)
			{
				Map<String, Object> currentModel = new HashMap<String, Object>();
				String tableName = model.getModelEnglishName();
				return modelDataDao.getTotalModelData(startDate, endDate, tableName);
			} else
			{
				return 0;
			}
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("getTotalByModels", e.getMessage(), e);
		}
	}
	
	@Override
	public Map<String, Object> getYearTotalTongjiByModel(int year, Long modelId) throws Exception
	{
		Date currentDate = new Date(), startDate = new Date(), endDate = new Date();
		
		startDate = DateUtils.setYears(startDate, year);
		startDate =DateUtils.setMonths(startDate, 0);
		startDate =DateUtils.setDays(startDate, 1);
		startDate =DateUtils.setMilliseconds(startDate, 0);
		startDate =DateUtils.setHours(startDate, 0);
		startDate =DateUtils.setMinutes(startDate, 0);
		
		if(year == currentDate.getYear()){
			endDate = currentDate;
		}else{
			endDate = DateUtils.setYears(endDate, year + 1);
			endDate =DateUtils.setMonths(endDate, 0);
			endDate =DateUtils.setDays(endDate, 1);
			endDate =DateUtils.setMilliseconds(endDate, 0);
			endDate =DateUtils.setHours(endDate, 0);
			endDate =DateUtils.setMinutes(endDate, 0);
		}
		
		int yearTotal = getTotalByModel(startDate, endDate, modelId);
		Model model = this.modelService.findModelById(modelId);
		int allTotal = this.modelDataDao.getAllTotal(model.getModelEnglishName());
		Map<String,Object> result = new HashMap<String,Object>();
		result.put("yearTotal", yearTotal);
		result.put("allTotal", allTotal);
		return result;
	}
	
	@Override
	public Map<String, Object> getMonthTotalTongjiByModel(int year, int month, Long modelId)
	{
		Date currentDate = new Date(), startDate = new Date(), endDate = new Date();
		
		startDate = DateUtils.setYears(startDate, year);
		startDate = DateUtils.setMonths(startDate, month-1);
		startDate = DateUtils.setDays(startDate, 1);
		startDate = DateUtils.setMilliseconds(startDate, 0);
		startDate = DateUtils.setHours(startDate, 0);
		startDate = DateUtils.setMinutes(startDate, 0);
		
		if (currentDate.getYear() + 1900 == year && currentDate.getMonth()+1 == month)
		{
			endDate = currentDate;
		} else
		{
			endDate = DateUtils.setYears(endDate, year);
			endDate = DateUtils.setMonths(endDate, month-1);
			endDate = DateUtils.setDays(endDate, 1);
			endDate = DateUtils.setMilliseconds(endDate, 0);
			endDate = DateUtils.setHours(endDate, 0);
			endDate = DateUtils.setMinutes(endDate, 0);
			if (month == 12)
			{
				endDate = DateUtils.setYears(endDate, year + 1);
				endDate = DateUtils.setMonths(endDate, 0);
			}
		}
		
		int MonthTotal = getTotalByModel(startDate, endDate, modelId);
		
		startDate = DateUtils.setMonths(startDate, 0);
		
		endDate = DateUtils.setYears(endDate, year + 1);
		endDate = DateUtils.setMonths(endDate, 0);
		endDate = DateUtils.setDays(endDate, 1);
		endDate = DateUtils.setMilliseconds(endDate, 0);
		endDate = DateUtils.setHours(endDate, 0);
		endDate = DateUtils.setMinutes(endDate, 0);
		
		int YearTotal = getTotalByModel(startDate, endDate, modelId);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("monthTotal", MonthTotal);
		result.put("yearTotal", YearTotal);
		return result;
	}
	
}
package ddd.simple.action.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.alibaba.fastjson.JSONArray;

import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import ddd.base.dynamicSql.DynamicService;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.base.util.EntityUtil;
import ddd.simple.entity.listview.DataSource;
import ddd.simple.entity.model.*;
import ddd.simple.service.listview.DataSourceService;
import ddd.simple.service.model.ModelJointUniqueService;
import ddd.simple.service.model.ModelService;

@Action
@RequestMapping("/Model")
@Controller
public class ModelAction
{
	@Resource(name = "modelServiceBean")
	private ModelService modelService;
	
	@Resource(name = "modelJointUniqueServiceBean")
	private ModelJointUniqueService modelJointUniqueService;
	
	public Model saveModel(Model model)
	{
		try
		{
			Model saveModel = this.modelService.saveModel(model);
			EntityUtil.loadLazyProperty(saveModel, "modelItems");
			EntityUtil.loadLazyProperty(saveModel, "parentModel");
			EntityUtil.loadLazyProperty(saveModel, "modelType");
			EntityUtil.loadLazyProperty(saveModel, "modelType.typeName");
			
			for (ModelJointUnique jointUnique : model.getJointUnique())
			{
				jointUnique.setModel(null);
				EntitySet<ModelItem> copyItems = new EntitySet<ModelItem>();
				for(ModelItem item : jointUnique.getModelItems()){
					ModelItem copyItem = new ModelItem();
					copyItem.setEId(item.getEId());
					copyItem.setModelItemEnglishName(item.getModelItemEnglishName());
					copyItem.setModelItemName(item.getModelItemName());
					copyItems.add(copyItem);
				}
				jointUnique.setModelItems(copyItems);
			}
			
			EntitySet<ModelItem> items = model.getModelItems();
			for (ModelItem item : items)
			{
				item.setModel(null);
			}
			return saveModel;
		} catch (DDDException e)
		{
			throw e;
		}
	}
	
	public Model updateModel(Model model)
	{
		try
		{
			Model updateModel = this.modelService.updateModel(model);
			return updateModel;
		} catch (DDDException e)
		{
			throw e;
		}
	}
	
	public void submitModel(Model model)
	{
		try
		{
			this.modelService.submitModel(model);
		} catch (DDDException e)
		{
			throw e;
		}
	}
	
	public int deleteModel(Model model)
	{
		
		try
		{
			return this.modelService.deleteModel(model);
		} catch (DDDException e)
		{
			throw e;
		}
	}
	
	public Map<String, Object> publishModel(Model model)
	{
		Map<String, Object> result = new HashMap<String, Object>();
		try
		{
			boolean isSuccess = (this.modelService.publishModel(model) != null);
			result.put("isSuccess", isSuccess);
			return result;
		} catch (DDDException e)
		{
			throw e;
		}
	}
	
	public Model findModelById(Long modelId)
	{
		try
		{
			Model model = this.modelService.findModelById(modelId);
			if(model == null){
				return null;
			}
			EntityUtil.loadLazyProperty(model, "modelItems");
			EntityUtil.loadLazyProperty(model, "parentModel");
			EntityUtil.loadLazyProperty(model, "modelType");
			EntityUtil.loadLazyProperty(model, "parentModel");
			EntityUtil.loadLazyProperty(model, "parentModel.modelName");
			EntityUtil.loadLazyProperty(model, "modelType.typeName");
			
			for (ModelJointUnique jointUnique : model.getJointUnique())
			{
				jointUnique.setModel(null);
				EntitySet<ModelItem> copyItems = new EntitySet<ModelItem>();
				for(ModelItem item : jointUnique.getModelItems()){
					ModelItem copyItem = new ModelItem();
					copyItem.setEId(item.getEId());
					copyItem.setModelItemEnglishName(item.getModelItemEnglishName());
					copyItem.setModelItemName(item.getModelItemName());
					copyItems.add(copyItem);
				}
				jointUnique.setModelItems(copyItems);
			}
			
			EntitySet<ModelItem> items = model.getModelItems();
			for (ModelItem item : items)
			{
				item.setModel(null);
			}
			return model;
		} catch (DDDException e)
		{
			throw e;
		}
	}
	
	public EntitySet<Model> findAllModel()
	{
		try
		{
			EntitySet<Model> models = this.modelService.findAllModel();
			return models;
		} catch (DDDException e)
		{
			throw e;
		}
	}  
	
	public EntitySet<Model> getSubmitedModel() 
	{
		try
		{
			return this.modelService.getSubmitedModel();
		} catch (DDDException e)
		{
			throw e;
		}
	}
	
	public Model findModelByEnglishName(String englishName)
	{
		try
		{
			Model findModel = this.modelService.findModelByEnglishName(englishName);
			return findModel;
		} catch (DDDException e)
		{
			throw e;
		}
	}
	
	public Model findBaseModel()
	{
		try
		{
			// Model model = this.modelService.findBaseModel();
			// return model;
			return null;
		} catch (DDDException e)
		{
			throw e;
		}
	}
	
	public Map<String, String> previewForm(Model model) throws DDDException
	{
		Map<String, String> map = new HashMap<String, String>();
		map.put("result", this.modelService.previewForm(model));
		return map;
	}
	
	public Set<Map<String, Object>> getWorkflowProcess()
	{
		try
		{
			// return this.modelService.getWorkflowProcess();
			return null;
		} catch (DDDException e)
		{
			throw e;
		}
	}
	
	public Map<String, Object> cancelPublishModel(Model model)
	{
		Map<String, Object> result = new HashMap<String, Object>();
		try
		{
			boolean isSuccess = (this.modelService.cancelPublishModel(model) != null);
			result.put("isSuccess", isSuccess);
			return result;
		} catch (DDDException e)
		{
			throw e;
		}
	}
	
}
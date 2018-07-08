package ddd.simple.service.dynamicForm.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import ddd.base.Config;
import ddd.base.codegenerator.Generator;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.dao.dynamicForm.DynamicFormDao;
import ddd.simple.entity.billCode.BillCode;
import ddd.simple.entity.dynamicForm.DynamicForm;
import ddd.simple.entity.model.Model;
import ddd.simple.entity.model.ModelItem;
import ddd.simple.service.billCode.BillCodeService;
import ddd.simple.service.dynamicForm.DynamicFormService;
import ddd.simple.service.model.ModelService;

@Service
public class DynamicFormServiceBean implements DynamicFormService
{
	
	@Resource(name = "dynamicFormDaoBean")
	private DynamicFormDao	dynamicFormDao;
	
	@Resource(name = "modelServiceBean")
	private ModelService	modelService;
	
	@Resource(name = "billCodeServiceBean")
	private BillCodeService billCodeService;
	
	// 替换模板路径
	private final String path = Config.dynamicFormVMPath == null || "".equals(Config.dynamicFormVMPath) ? (this.getClass().getClassLoader().getResource("/").getPath().replaceFirst("/", "") + "ddd/dynamicFormVM/") :Config.dynamicFormVMPath;
	
	@Override
	public DynamicForm saveDynamicForm(DynamicForm dynamicForm)
	{
		try
		{
			DynamicForm oldDynamicForm = this.dynamicFormDao.findDynamicFormByKey(dynamicForm.getDynamicFormKey());
			if(oldDynamicForm != null)
			{
				throw new DDDException("唯一编码："+dynamicForm.getDynamicFormKey()+"已存在！");
			}
			return this.dynamicFormDao.saveDynamicForm(dynamicForm);
		} catch (Exception e)
		{
			throw new DDDException("saveDynamicForm", e.getMessage(), e);
		}
	}
	
	@Override
	public int deleteDynamicForm(Long dynamicFormId)
	{
		try
		{
			return this.dynamicFormDao.deleteDynamicForm(dynamicFormId);
		} catch (Exception e)
		{
			throw new DDDException("deleteDynamicForm", e.getMessage(), e);
		}
		
	}
	
	@Override
	public DynamicForm updateDynamicForm(DynamicForm dynamicForm)
	{
		try
		{
			DynamicForm oldDynamicForm = this.dynamicFormDao.findDynamicFormByKey(dynamicForm.getDynamicFormKey());
			if(oldDynamicForm != null && !oldDynamicForm.getEId().equals(dynamicForm.getEId()))
			{
				throw new DDDException("唯一编码："+dynamicForm.getDynamicFormKey()+"已存在！");
			}
			return this.dynamicFormDao.updateDynamicForm(dynamicForm);
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("updateDynamicForm", e.getMessage(), e);
		}
	}
	
	public Map<String, Object> preViewForm(List<Map<String, Object>> configs)
	{	
		try
		{
			String newHtml = createNewHtml("", configs);
			
			Map<String,Object> newHtmlMap = new HashMap<String,Object>();
			newHtmlMap.put("newHtml", newHtml);
			String preHtml = Generator.generate(path + "preForm.vm",newHtmlMap);
			
			Map<String, Object> preHtmlMap = new HashMap<String, Object>();
			preHtmlMap.put("preHtml", preHtml);
			
			return preHtmlMap;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("preViewForm", e.getMessage(), e);
		}
	}
	
	public DynamicForm updateDynamicFormById(Long dynamicFormId,List<Map<String, Object>> configs,String dynamicFormHtml)
	{
		try
		{
			DynamicForm dynamicForm = this.findDynamicFormById(dynamicFormId);
			String dynamicFormNewHtml = createNewHtml(dynamicForm.getDynamicFormKey(), configs);
			dynamicForm.setDynamicFormOldHtml(dynamicFormHtml);
			dynamicForm.setDynamicFormNewHtml(dynamicFormNewHtml);
			this.modelService.synchronousModelItem(configs, dynamicForm.getDynamicFormKey());// 同步模型项数据
			return this.dynamicFormDao.updateDynamicForm(dynamicForm);
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("updateDynamicForm", e.getMessage(), e);
		}
	}
	
	@Override
	public DynamicForm findDynamicFormById(Long dynamicFormId)
	{
		try
		{
			DynamicForm dynamicform = this.dynamicFormDao.findDynamicFormById(dynamicFormId);
			return dynamicform;
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("findDynamicFormById", e.getMessage(), e);
		}
	}
	
	/**
	 * 根据模型ID获取它的所有模型项
	 */
	public String findModelItems(Long modelId)
	{
		Model model = this.modelService.findModelById(modelId);
		List<Map<String, Object>> configs = new ArrayList<Map<String, Object>>();
		Map<String, Object> modelItemsMap = new HashMap<String, Object>();
		for (ModelItem modelItem : model.getModelItems())
		{
			Map<String, Object> config = new HashMap<String, Object>();
			Map relatedParameters = JSONObject.parseObject(getRelatedParameters(modelItem));
			if (relatedParameters == null)
				continue;
			config.put("bundle", modelItem.getModelItemEnglishName());
			config.put("label", modelItem.getModelItemName());
			config.put("dataType", modelItem.getDatatype());
			config.putAll(relatedParameters);
			configs.add(config);
		}
		modelItemsMap.put("configs", configs);
		return Generator.generate(path + "createModelHtml.vm", modelItemsMap);
	}
	
	public String getRelatedParameters(ModelItem modelItem)
	{
		if (modelItem.getRelatedParameters() == null)
		{
			System.out.println(modelItem.getModelItemName() + "模型项相关参数字段值为空");
			return "";
		} else
		{
			return modelItem.getRelatedParameters();
		}
	}
	
	@Override
	public EntitySet<DynamicForm> findAllDynamicForm()
	{
		try
		{
			return this.dynamicFormDao.findAllDynamicForm();
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("findAllDynamicForm", e.getMessage(), e);
		}
	}
	
	public DynamicForm findDynamicFormByKey(String dynamicFormKey)
	{
		try
		{
			return this.dynamicFormDao.findDynamicFormByKey(dynamicFormKey);
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("saveDynamicForm", e.getMessage(), e);
		}
	}
	
	/**
	 * 创建用于添加或者编辑内容的表单
	 * 
	 * @param html
	 * @param configs
	 * @param layoutStyle
	 * @param path
	 * @return
	 */
	public String createNewHtml(String formKey, List<Map<String, Object>> configs)
	{
		for (Map<String, Object> config : configs)
		{
			if("".equals(config.get("bundle"))||null==config.get("bundle")){
				String component = config.get("component").toString();
				if("select".equals(component)||"radio".equals(component)||"checkbox".equals(component))
					config.put("bundle", "selectNoBundle");
				else
					config.put("bundle", "noBundle");
			}
			Map<String, Object> dataResource = new HashMap<String, Object>();
			dataResource.put("dataResource", config);
			String itemHtml = Generator.generate(path +config.get("component")+ ".vm", dataResource);
			config.put("itemHtml", itemHtml);
		}
		Map<String, Object> replaceMap = new HashMap<String, Object>();
		replaceMap.put("configs", configs);
		return Generator.generate(path + "createNewHtml.vm", replaceMap);
	}
	
	public void saveOrUpdateBillCode(Map config)
	{
		BillCode billCode = this.billCodeService.findBillCodeByName(config.get("billCodeTypeName").toString());
		if(null==billCode)
		{
			billCode= new BillCode();
		}
		billCode.setBillCodeRule(config.get("billCodeRule").toString());
		billCode.setBillCodeTypeName(config.get("billCodeTypeName").toString());
		billCode.setColumnName(config.get("bundle").toString());
		billCode.setEntityName(config.get("entityName").toString());
		billCode.setFieldName(config.get("bundle").toString());
		billCode.setVariables(config.get("variables").toString());
		billCode.setSeqences(config.get("seqences").toString());
		billCode.setTableName(config.get("entityName").toString());
		
		if(!billCode.isNewEntity())
		{	
			this.billCodeService.updateBillCode(billCode);
		}else
		{
			this.billCodeService.saveBillCode(billCode);

		}
	}
	
	/**
	 * 创建动态表单
	 * 
	 * @param dynamicFormData
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public void creatForm(Map<String, Object> dynamicFormData)
	{
		try
		{
			Map<String, Object> columnInfo = (Map<String, Object>) dynamicFormData.get("columnInfo");
			List<Map<String, Object>> configs = (List<Map<String, Object>>) columnInfo.get("configs");
			
			String oldHtml = this.createOldHtml(configs);// 创建用于设计表单的Html
			String newHtml = this.createNewHtml(configs);// 创建用于添加或编辑的表单
			Map<String, Object> formInfo = (Map<String, Object>) dynamicFormData.get("formInfo");
			
			DynamicForm dynamicForm = dynamicFormDao.findDynamicFormByKey(formInfo.get("dynamicFormKey").toString());
			if (null == dynamicForm)
			{
				dynamicForm = new DynamicForm();
			} 
			dynamicForm.setDynamicFormKey(formInfo.get("dynamicFormKey").toString());
			dynamicForm.setDynamicFormName(formInfo.get("dynamicFormName").toString());
			dynamicForm.setTotalCount((Integer) formInfo.get("totalCount"));
			dynamicForm.setDynamicFormNewHtml(newHtml);
			dynamicForm.setDynamicFormOldHtml(oldHtml);
			if(dynamicForm.isNewEntity())
			{
				this.dynamicFormDao.saveDynamicForm(dynamicForm);
			}
			else
			{
				dynamicFormDao.updateDynamicForm(dynamicForm);
			}
			
			//创建查看表单
			creatDisplayForm(formInfo, configs);
			
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("creatForm", e.getMessage(), e);
		}
	}
	
	public void creatDisplayForm(Map<String, Object> formInfo,List<Map<String, Object>> configs)
	{
		try
		{
			String oldHtml = this.createDisPlayFormOldHtml(configs);
			String displayHtml = this.createDisplayFormNewHtml(configs);// 创建查看表单数据的表单
			String displayFormKey = formInfo.get("dynamicFormKey")+"_display";
			formInfo.put("dynamicFormKey", displayFormKey);
			
			DynamicForm dynamicForm = dynamicFormDao.findDynamicFormByKey(formInfo.get("dynamicFormKey").toString());
			if (null == dynamicForm)
			{
				dynamicForm = new DynamicForm();
			} 
			dynamicForm.setDynamicFormKey(formInfo.get("dynamicFormKey").toString());
			dynamicForm.setDynamicFormName(formInfo.get("dynamicFormName").toString());
			dynamicForm.setTotalCount((Integer) formInfo.get("totalCount"));
			dynamicForm.setDynamicFormNewHtml(displayHtml);
			dynamicForm.setDynamicFormOldHtml(oldHtml);
			if(dynamicForm.isNewEntity())
			{
				this.dynamicFormDao.saveDynamicForm(dynamicForm);
			}
			else
			{
				dynamicFormDao.updateDynamicForm(dynamicForm);
			}

		}catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("creatDisplayForm", e.getMessage(), e);
		}
	}
	
	/**
	 * 创建用于设计表单的Html
	 * 
	 * @param configs
	 * @param path
	 * @return
	 */
	private String createOldHtml(List<Map<String, Object>> configs)
	{
		for (Map<String, Object> config : configs)
		{
			if (config.get("isEdit")==null||config.get("isEdit")=="") {
				config.put("isEdit", "是");
			}
			
		}
		
		Map configMap = new HashMap();
		configMap.put("configs", configs);
		return Generator.generate(path + "creatOldHtml.vm", configMap);
	}
	
	private String createDisPlayFormOldHtml(List<Map<String, Object>> configs)
	{
		for (Map<String, Object> config : configs)
		{
			config.put("isEdit", "否");
		}
		
		Map configMap = new HashMap();
		configMap.put("configs", configs);
		return Generator.generate(path + "creatOldHtml.vm", configMap);
	}
	
	/**
	 * 创建用于添加或编辑的表单
	 * 
	 * @param configs
	 * @param path
	 * @return
	 */
	public String createNewHtml(List<Map<String, Object>> configs)
	{
		try
		{
			for (Map<String, Object> config : configs)
			{
				Map<String, Object> dataResource = new HashMap<String, Object>();
				dataResource.put("dataResource", config);
				String itemHtml = Generator.generate(path + config.get("component") + ".vm", dataResource);
				config.put("itemHtml", itemHtml);
			}
			Map<String, Object> replaceMap = new HashMap<String, Object>();
			replaceMap.put("configs", configs);
			return Generator.generate(path + "createNewHtml.vm", replaceMap);
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("creatForm", e.getMessage(), e);
		}
	}
	
	/**
	 * 创建用于查看数据的表单
	 * 
	 * @param configs
	 * @param path
	 * @return
	 */
	public String createDisplayFormNewHtml(List<Map<String, Object>> configs)
	{
		try
		{
			for (Map<String, Object> config : configs)
			{
				if("否".equals(config.get("isEdit")))
				{
					config.put("isDisplay", "true");
				}
				Map<String, Object> dataResource = new HashMap<String, Object>();
				dataResource.put("dataResource", config);
				String itemHtml = Generator.generate(path + config.get("component") + ".vm", dataResource);
				config.put("itemHtml", itemHtml);
			}
			Map<String, Object> replaceMap = new HashMap<String, Object>();
			replaceMap.put("configs", configs);
			return Generator.generate(path + "createNewHtml.vm", replaceMap);
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("creatForm", e.getMessage(), e);
		}
	}

	@Override
	public int deleteDynamicFormModel(Long modelId)
	{
		try
		{
			return this.dynamicFormDao.deleteDynamicFormModel(modelId);
		}catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("deleteDynamicFormModel", e.getMessage(), e);
		}
	}
	
	public Map<String, Object> designMultiImgHtml(Map<String, Object> imgUrls)
	{
		try
		{
			List<String> imgUrlList = (List<String>)imgUrls.get("imgUrlArray");
			List<Map<String, Object>> imgUrlObjs = new ArrayList<Map<String, Object>>();
			for(int i=0;i<imgUrlList.size();i++)
			{
				String imgUrl = imgUrlList.get(i);
				String imgName = imgUrl.substring(imgUrl.length()-18);
				Map<String, Object> imgUrlObj = new HashMap<String,Object>();
				imgUrlObj.put("imgUrl", imgUrl);
				imgUrlObj.put("imgName", imgName);
				imgUrlObjs.add(imgUrlObj);
			}
			imgUrls.put("imgUrlArray", imgUrlObjs);
			
			String imagesHtml = Generator.generate(path + "createMultiImgHtml.vm", imgUrls);
			Map<String, Object> imagesHtmlMap = new HashMap<String,Object>();
			imagesHtmlMap.put("imagesHtml", imagesHtml);
			return imagesHtmlMap;
		}catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("designMultiImgHtml", e.getMessage(), e);
		}
	}
}

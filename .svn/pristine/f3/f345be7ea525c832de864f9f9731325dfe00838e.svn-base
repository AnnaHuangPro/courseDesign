package ddd.simple.service.model.extend;

import java.util.Map;

import ddd.simple.entity.model.Model;

public interface ModelDataExtInterface
{
	public String submitModelData(Map<String, Object> processVar,Model model,Map<String,Object> modelData);

	public void beforeSaveModelData(Model model,Map<String,Object> dataMap,Map<String,Object> publicParams);
	
	public void afterSaveModelData(Model model,Map<String,Object> dataMap,Map<String,Object> publicParams);
	
	public void beforeUpdateModelData(Model model,Map<String,Object> dataMap,Map<String,Object> publicParams);
	
	public void afterUpdateModelData(Model model,Map<String,Object> dataMap,Map<String,Object> publicParams);
	
	public void beforeSubmitModelData(Model model,Map<String,Object> dataMap,Map<String,Object> publicParams);
	
	public void beforeDeleteModelData(String tabelName,Long contentId,Map<String,Object> publicParams);
	
	public void afterDeleteModelData(String tabelName,Long contentId,Map<String,Object> publicParams);

}

package ddd.simple.service.dynamicForm;

import java.util.List;
import java.util.Map;

import ddd.base.persistence.EntitySet;
import ddd.simple.entity.dynamicForm.DynamicForm;
import ddd.simple.entity.model.Model;

public interface DynamicFormService 
{
	public DynamicForm saveDynamicForm(DynamicForm dynamicForm) ;
	
	public int deleteDynamicForm(Long dynamicFormId) ;
	
	public DynamicForm updateDynamicForm(DynamicForm dynamicForm) ;
	
	public Map<String, Object> preViewForm(List<Map<String, Object>> configs);
	
	public DynamicForm findDynamicFormById(Long dynamicFormId) ;
	
	public EntitySet<DynamicForm> findAllDynamicForm() ;

	public DynamicForm findDynamicFormByKey(String dynamicFormKey);
	
	public String findModelItems(Long modelId);

	public DynamicForm updateDynamicFormById(Long dynamicFormId,List<Map<String, Object>> configs,String dynamicFormHtml);
	
	public void creatForm(Map<String, Object> dynamicFormData);
	
	public String createNewHtml(List<Map<String, Object>> configs);
	
	public int deleteDynamicFormModel(Long modelId);
	
	public Map<String, Object> designMultiImgHtml(Map<String, Object> imgUrls);
 
}
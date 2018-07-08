package ddd.simple.action.dynamicForm;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.entity.dynamicForm.DynamicForm;
import ddd.simple.service.dynamicForm.DynamicFormService;

@Action
@RequestMapping("/DynamicForm")
@Controller
public class DynamicFormAction
{
	@Resource(name="dynamicFormServiceBean")
	private DynamicFormService dynamicFormService;
	
	public DynamicForm saveDynamicForm(DynamicForm dynamicForm)
	{
		try {
			DynamicForm saveDynamicForm = this.dynamicFormService.saveDynamicForm(dynamicForm);
			return saveDynamicForm;
		} catch (DDDException e) {
			throw e;
		}
	}

	public int deleteDynamicForm(Long dynamicFormId){
		
		try {
			return this.dynamicFormService.deleteDynamicForm(dynamicFormId);
		} catch (DDDException e) {
			throw e;
		}
		
	}

	public DynamicForm updateDynamicForm(DynamicForm dynamicForm) {
		try {
			DynamicForm updateDynamicForm = this.dynamicFormService.updateDynamicForm(dynamicForm);
			return updateDynamicForm;
		} catch (DDDException e) {
			throw e;
		}
	}

	public DynamicForm findDynamicFormById(Long dynamicFormId){
		try {
			DynamicForm findDynamicForm = this.dynamicFormService.findDynamicFormById(dynamicFormId);
			return  findDynamicForm;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public EntitySet<DynamicForm> findAllDynamicForm(){
		try{
			EntitySet<DynamicForm> allDynamicForm = this.dynamicFormService.findAllDynamicForm();
			return allDynamicForm;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	/**
	 * 根据key查找动态表单
	 * @param dynamicFormKey
	 * @return
	 */
	public DynamicForm findDynamicFormByKey(String dynamicFormKey)
	{
		try {
			DynamicForm findDynamicForm = this.dynamicFormService.findDynamicFormByKey(dynamicFormKey);
			return  findDynamicForm;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public DynamicForm updateDynamicFormById(Long dynamicFormId,List<Map<String, Object>> configs,String dynamicFormHtml) {
		try {
			DynamicForm updateDynamicForm = this.dynamicFormService.updateDynamicFormById(dynamicFormId,configs,dynamicFormHtml);
			return updateDynamicForm;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public Map<String, Object> preViewForm(List<Map<String, Object>> configs) {
		try {
			Map<String, Object> preViewForm = this.dynamicFormService.preViewForm(configs);
			return preViewForm;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	//根据模型ID获取它的所有模型项
	public String findModelItems(Long modelId){
		return this.dynamicFormService.findModelItems(modelId);
	}
	
	public Map<String, Object> designMultiImgHtml(Map<String, Object> imgUrls) {
		try {
			return this.dynamicFormService.designMultiImgHtml(imgUrls);
		} catch (DDDException e) {
			throw e;
		}
	}

}
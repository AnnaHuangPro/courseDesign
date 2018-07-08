package ddd.simple.service.model;

import java.util.List;
import java.util.Map;
import ddd.base.persistence.EntitySet;
import ddd.simple.entity.model.Model;

public interface ModelService  
{
	public Model saveModel(Model model) ;
	
	public Model updateModel(Model model);
	
	public int deleteModel(Model model) ;

	public int deleteModelTable(Model model);
	
	public Model publishModel(Model model) ;
	
	public Model cancelPublishModel(Model model) ;
	
	public Model findModelById(Long modelId) ;
	
	public EntitySet<Model> findAllModel() ;
	
	public Model findModelByEnglishName(String englishName);
	
	public String[] findPropertiesName(String tableName);
	
	public String previewForm(Model model);
	
	public void synchronousModelItem(List<Map<String, Object>> configs, String dynamicFormKey);
	
	public void submitModel(Model model);

	public EntitySet<Model> getSubmitedModel();
}
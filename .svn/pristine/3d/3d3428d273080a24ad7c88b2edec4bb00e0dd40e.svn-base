package ddd.simple.action.model;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.entity.model.ModelJointUnique;
import ddd.simple.service.model.ModelJointUniqueService;

@Action
@RequestMapping("/ModelJointUnique")
@Controller
public class ModelJointUniqueAction
{
	@Resource(name="modelJointUniqueServiceBean")
	private ModelJointUniqueService modelJointUniqueService;
	
	public ModelJointUnique saveModelJointUnique(ModelJointUnique modelJointUnique)
	{
		try {
			ModelJointUnique saveModelJointUnique = this.modelJointUniqueService.saveModelJointUnique(modelJointUnique);
			return saveModelJointUnique;
		} catch (DDDException e) {
			throw e;
		}
	}

	public int deleteModelJointUnique(Long modelJointUniqueId){
		
		try {
			return this.modelJointUniqueService.deleteModelJointUnique(modelJointUniqueId);
		} catch (DDDException e) {
			throw e;
		}
		
	}

	public ModelJointUnique updateModelJointUnique(ModelJointUnique modelJointUnique) {
		try {
			ModelJointUnique updateModelJointUnique = this.modelJointUniqueService.updateModelJointUnique(modelJointUnique);
			return updateModelJointUnique;
		} catch (DDDException e) {
			throw e;
		}
	}

	public ModelJointUnique findModelJointUniqueById(Long modelJointUniqueId){
		try {
			ModelJointUnique findModelJointUnique = this.modelJointUniqueService.findModelJointUniqueById(modelJointUniqueId);
			return  findModelJointUnique;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public EntitySet<ModelJointUnique> findAllModelJointUnique(){
		try{
			EntitySet<ModelJointUnique> allModelJointUnique = this.modelJointUniqueService.findAllModelJointUnique();
			return allModelJointUnique;
		} catch (DDDException e) {
			throw e;
		}
	}

}
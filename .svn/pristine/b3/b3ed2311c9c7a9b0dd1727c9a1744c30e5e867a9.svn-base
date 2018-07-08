package ddd.simple.service.model.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.dao.model.ModelJointUniqueDao;
import ddd.simple.entity.model.ModelJointUnique;
import ddd.simple.service.base.BaseService;
import ddd.simple.service.model.ModelJointUniqueService;

@Service
public class ModelJointUniqueServiceBean extends BaseService implements ModelJointUniqueService
{

	@Resource(name="modelJointUniqueDaoBean")
	private ModelJointUniqueDao modelJointUniqueDao;
	
	@Override
	public ModelJointUnique saveModelJointUnique(ModelJointUnique modelJointUnique) 
	{
		try {
			return this.modelJointUniqueDao.saveModelJointUnique(modelJointUnique);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveModelJointUnique", e.getMessage(), e);
		}
	}

	@Override
	public int deleteModelJointUnique(Long modelJointUniqueId) {
		try {
			return this.modelJointUniqueDao.deleteModelJointUnique(modelJointUniqueId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteModelJointUnique", e.getMessage(), e);
		}
		
	}

	@Override
	public ModelJointUnique updateModelJointUnique(ModelJointUnique modelJointUnique) {
		try {
			return this.modelJointUniqueDao.updateModelJointUnique(modelJointUnique);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateModelJointUnique", e.getMessage(), e);
		}
	}

	@Override
	public ModelJointUnique findModelJointUniqueById(Long modelJointUniqueId) {
		try {
			return this.modelJointUniqueDao.findModelJointUniqueById(modelJointUniqueId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findModelJointUniqueById", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<ModelJointUnique> findAllModelJointUnique() {
		try{
			return this.modelJointUniqueDao.findAllModelJointUnique();
		}catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllModelJointUnique", e.getMessage(), e);
		}
	}

	@Override
	public EntitySet<ModelJointUnique> findModelJointUniqueByModelId(Long modelId)
	{
		try{
			return this.modelJointUniqueDao.findModelJointUniqueByModelId(modelId);
		}catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllModelJointUnique", e.getMessage(), e);
		}
	}

}

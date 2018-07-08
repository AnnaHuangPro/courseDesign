package ddd.simple.dao.model.impl;

import org.springframework.stereotype.Service;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;
import ddd.simple.dao.model.ModelJointUniqueDao;
import ddd.simple.entity.model.ModelJointUnique;

@Service
public class ModelJointUniqueDaoBean extends BaseDao implements ModelJointUniqueDao
{
	@Override
	public ModelJointUnique saveModelJointUnique(ModelJointUnique modelJointUnique)  throws Exception{
		return this.save(modelJointUnique);
	}

	@Override
	public int deleteModelJointUnique(Long modelJointUniqueId)  throws Exception{
		return this.deleteById(modelJointUniqueId,ModelJointUnique.class);
	}

	@Override
	public ModelJointUnique updateModelJointUnique(ModelJointUnique modelJointUnique)  throws Exception{
		return this.update(modelJointUnique);
	}

	@Override
	public ModelJointUnique findModelJointUniqueById(Long modelJointUniqueId)  throws Exception{
		return this.query(modelJointUniqueId, ModelJointUnique.class);
	}
	
	@Override
	public EntitySet<ModelJointUnique> findAllModelJointUnique() throws Exception {
		return this.query("1=1",ModelJointUnique.class);
	}

	@Override
	public EntitySet<ModelJointUnique> findModelJointUniqueByModelId(Long modelId) throws Exception
	{
		return this.query("modelId = '"+modelId+"'", ModelJointUnique.class);
	}
}

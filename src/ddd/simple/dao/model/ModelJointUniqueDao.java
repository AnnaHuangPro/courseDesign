package ddd.simple.dao.model;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDaoInterface;
import ddd.simple.entity.model.ModelJointUnique;

public interface ModelJointUniqueDao extends BaseDaoInterface {
	public ModelJointUnique saveModelJointUnique(ModelJointUnique modelJointUnique) throws Exception;
	
	public int deleteModelJointUnique(Long modelJointUniqueId) throws Exception;
	
	public ModelJointUnique updateModelJointUnique(ModelJointUnique modelJointUnique) throws Exception;
	
	public ModelJointUnique findModelJointUniqueById(Long modelJointUniqueId) throws Exception;
	
	public EntitySet<ModelJointUnique> findAllModelJointUnique() throws Exception;
	
	public EntitySet<ModelJointUnique> findModelJointUniqueByModelId(Long modelId) throws Exception;
}

package ddd.simple.dao.major_module;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDaoInterface;
import ddd.simple.entity.major_module.Major;

public interface MajorDao extends BaseDaoInterface {
	public Major saveMajor(Major major) throws Exception;
	
	public int deleteMajor(Long majorId) throws Exception;
	
	public Major updateMajor(Major major) throws Exception;
	
	public Major findMajorById(Long majorId) throws Exception;
	
	public EntitySet<Major> findAllMajor() throws Exception;
}

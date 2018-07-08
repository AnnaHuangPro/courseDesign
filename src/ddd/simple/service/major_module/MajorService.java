package ddd.simple.service.major_module;

import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseServiceInterface;
import ddd.simple.entity.major_module.Major;

public interface MajorService extends BaseServiceInterface {
	public Major saveMajor(Major major) ;
	
	public int deleteMajor(Long majorId) ;
	
	public Major updateMajor(Major major) ;
	
	public Major findMajorById(Long majorId) ;
	
	public EntitySet<Major> findAllMajor() ;
 
}
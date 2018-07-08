package ddd.simple.service.systemConfig;

import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseServiceInterface;
import ddd.simple.entity.systemConfig.SystemConfigType;

public interface SystemConfigTypeService extends BaseServiceInterface {
	public SystemConfigType saveSystemConfigType(SystemConfigType systemConfigType) ;
	
	public int deleteSystemConfigType(Long systemConfigTypeId) ;
	
	public SystemConfigType updateSystemConfigType(SystemConfigType systemConfigType) ;
	
	public SystemConfigType findSystemConfigTypeById(Long systemConfigTypeId) ;
	
	public EntitySet<SystemConfigType> findAllSystemConfigType() ;
 
}
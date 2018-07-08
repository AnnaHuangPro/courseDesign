package ddd.simple.service.systemConfig.impl;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseService;
import ddd.simple.entity.systemConfig.SystemConfigType;
import ddd.simple.dao.systemConfig.SystemConfigTypeDao;
import ddd.simple.service.systemConfig.SystemConfigTypeService;

@Service
public class SystemConfigTypeServiceBean extends BaseService implements SystemConfigTypeService {
	@Resource(name="systemConfigTypeDaoBean")
	private SystemConfigTypeDao systemConfigTypeDao;
	
	@Override
	public SystemConfigType saveSystemConfigType(SystemConfigType systemConfigType) {
		try {
			return this.systemConfigTypeDao.saveSystemConfigType(systemConfigType);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveSystemConfigType", e.getMessage(), e);
		}
	}

	@Override
	public int deleteSystemConfigType(Long systemConfigTypeId) {
		try {
			return this.systemConfigTypeDao.deleteSystemConfigType(systemConfigTypeId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteSystemConfigType", e.getMessage(), e);
		}
		
	}

	@Override
	public SystemConfigType updateSystemConfigType(SystemConfigType systemConfigType) {
		try {
			return this.systemConfigTypeDao.updateSystemConfigType(systemConfigType);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateSystemConfigType", e.getMessage(), e);
		}
	}

	@Override
	public SystemConfigType findSystemConfigTypeById(Long systemConfigTypeId) {
		try {
			return this.systemConfigTypeDao.findSystemConfigTypeById(systemConfigTypeId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findSystemConfigTypeById", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<SystemConfigType> findAllSystemConfigType() {
		try {
			return this.systemConfigTypeDao.findAllSystemConfigType();
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllSystemConfigType", e.getMessage(), e);
		}
	}

}

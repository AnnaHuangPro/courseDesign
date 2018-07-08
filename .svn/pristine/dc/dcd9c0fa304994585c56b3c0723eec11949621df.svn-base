package ddd.simple.dao.systemConfig.impl;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;
import org.springframework.stereotype.Service;
import ddd.simple.entity.systemConfig.SystemConfigType;
import ddd.simple.dao.systemConfig.SystemConfigTypeDao;

@Service
public class SystemConfigTypeDaoBean extends BaseDao implements SystemConfigTypeDao {
	@Override
	public SystemConfigType saveSystemConfigType(SystemConfigType systemConfigType)  throws Exception {
		return this.save(systemConfigType);
	}

	@Override
	public int deleteSystemConfigType(Long systemConfigTypeId)  throws Exception {
		return this.deleteById(systemConfigTypeId,SystemConfigType.class);
	}

	@Override
	public SystemConfigType updateSystemConfigType(SystemConfigType systemConfigType)  throws Exception {
		return this.update(systemConfigType);
	}

	@Override
	public SystemConfigType findSystemConfigTypeById(Long systemConfigTypeId)  throws Exception {
		return this.query(systemConfigTypeId, SystemConfigType.class);
	}
	
	@Override
	public EntitySet<SystemConfigType> findAllSystemConfigType() throws Exception {
		return this.query("1=1",SystemConfigType.class);
	}
}

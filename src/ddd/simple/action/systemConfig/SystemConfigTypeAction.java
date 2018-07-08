package ddd.simple.action.systemConfig;

import javax.annotation.Resource;
import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.entity.systemConfig.SystemConfigType;
import ddd.simple.service.systemConfig.SystemConfigTypeService;

@Action
@RequestMapping("/DD/SystemConfigType")
@Controller
public class SystemConfigTypeAction {
	@Resource(name="systemConfigTypeServiceBean")
	private SystemConfigTypeService systemConfigTypeService;
	
	public SystemConfigType saveSystemConfigType(SystemConfigType systemConfigType) {
		try {
			SystemConfigType saveSystemConfigType = this.systemConfigTypeService.saveSystemConfigType(systemConfigType);
			return saveSystemConfigType;
		} catch (DDDException e) {
			throw e;
		}
	}

	public int deleteSystemConfigType(Long systemConfigTypeId) {
		
		try {
			return this.systemConfigTypeService.deleteSystemConfigType(systemConfigTypeId);
		} catch (DDDException e) {
			throw e;
		}
		
	}

	public SystemConfigType updateSystemConfigType(SystemConfigType systemConfigType) {
		try {
			SystemConfigType updateSystemConfigType = this.systemConfigTypeService.updateSystemConfigType(systemConfigType);
			return updateSystemConfigType;
		} catch (DDDException e) {
			throw e;
		}
	}

	public SystemConfigType findSystemConfigTypeById(Long systemConfigTypeId) {
		try {
			SystemConfigType findSystemConfigType = this.systemConfigTypeService.findSystemConfigTypeById(systemConfigTypeId);
			return  findSystemConfigType;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public EntitySet<SystemConfigType > findAllSystemConfigType() {
		try {
			EntitySet<SystemConfigType > allSystemConfigType = this.systemConfigTypeService.findAllSystemConfigType();
			return allSystemConfigType;
		} catch (DDDException e) {
			throw e;
		}
	}

}
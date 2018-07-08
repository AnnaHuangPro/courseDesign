package ddd.simple.entity.systemConfig;

import java.io.Serializable;

import ddd.base.annotation.Column; 
import ddd.base.persistence.baseEntity.Entity;

@ddd.base.annotation.Entity(name="systemConfig",label="系统参数")
public class SystemConfig extends Entity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Column(name="systemConfigKey",label="键")
	private String systemConfigKey;

	@Column(length = 8000, name="systemConfigValue",label="值")
	private String systemConfigValue;

	@Column(name="systemConfigTypeId",label="类型" ,composition=true,FKName="sysConfig_FK_sType")
	private SystemConfigType systemConfigType;

	public String getSystemConfigKey() {
		lazyLoad();
		return systemConfigKey;
	}

	public void setSystemConfigKey(String systemConfigKey) {
		this.systemConfigKey = systemConfigKey;
	}

	public String getSystemConfigValue() {
		lazyLoad();
		return systemConfigValue;
	}

	public SystemConfigType getSystemConfigType() {
		lazyLoad();
		return systemConfigType;
	}

	public void setSystemConfigType(SystemConfigType systemConfigType) {
		this.systemConfigType = systemConfigType;
	}

	public void setSystemConfigValue(String systemConfigValue) {
		this.systemConfigValue = systemConfigValue;
	}

}
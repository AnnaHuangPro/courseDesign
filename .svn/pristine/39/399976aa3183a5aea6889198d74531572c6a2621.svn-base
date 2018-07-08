package ddd.simple.entity.systemConfig;

import ddd.base.annotation.Column;
import ddd.base.persistence.baseEntity.Entity;

import ddd.base.persistence.EntitySet;
import ddd.simple.entity.systemConfig.SystemConfig;

@ddd.base.annotation.Entity(label="系统参数类型",name="DD_systemConfigType")
public class SystemConfigType extends Entity {
	private static final long serialVersionUID = 1L;
	
	@Column(label="参数类型名",name="systemConfigTypeName",length=20,nullable=false,unique=false,comment="参数类型名")
	private String systemConfigTypeName;

	@Column(label="参数类型编码",name="systemConfigTypeCode",uniqueName="unique_systemConfigTypeCode",length=18,nullable=false,unique=true,comment="参数类型编码")
	private String systemConfigTypeCode;

	@Column(label="参数集合",joinColumn="systemConfigTypeId",composition=true,nullable=true,unique=false,comment="参数集合")
	private EntitySet<SystemConfig> systemConfig;


	public String getSystemConfigTypeName() {
		lazyLoad();
		return this.systemConfigTypeName;
	}

	public void setSystemConfigTypeName(String systemConfigTypeName) {
		this.systemConfigTypeName = systemConfigTypeName;
	}

	public String getSystemConfigTypeCode() {
		lazyLoad();
		return this.systemConfigTypeCode;
	}

	public void setSystemConfigTypeCode(String systemConfigTypeCode) {
		this.systemConfigTypeCode = systemConfigTypeCode;
	}

	public EntitySet<SystemConfig> getSystemConfig() {
		lazyLoad("systemConfig");
		return this.systemConfig;
	}

	public void setSystemConfig(EntitySet<SystemConfig> systemConfig) {
		super.LazyFieidsLoaded.put("systemConfig", true);
		this.systemConfig = systemConfig;
	}


	
}
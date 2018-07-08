package ddd.simple.entity.major_module;

import ddd.base.annotation.Column;
import ddd.base.persistence.baseEntity.Entity;


@ddd.base.annotation.Entity(label="专业信息实体",name="DD_major")
public class Major extends Entity {
	private static final long serialVersionUID = 1L;

	@Column(label="专业名字",name="majorName",length=250,nullable=false,unique=false,comment="学生登录账号")
	private String majorName;

	public String getMajorName() {
		lazyLoad();
		return this.majorName;
	}

	public void setMajorName(String majorName) {
		this.majorName = majorName;
	}


	
}
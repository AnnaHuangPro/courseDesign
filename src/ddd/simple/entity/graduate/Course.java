package ddd.simple.entity.graduate;

import ddd.base.annotation.Column;
import ddd.base.persistence.baseEntity.Entity;


@ddd.base.annotation.Entity(label="课程",name="AA_course")
public class Course extends Entity {
	private static final long serialVersionUID = 1L;
	
	@Column(label="课程名",name="className",length=250,nullable=false,unique=false,comment="课程名")
	private String className;


	public String getClassName() {
		lazyLoad();
		return this.className;
	}

	public void setClassName(String className) {
		this.className = className;
	}


	
}
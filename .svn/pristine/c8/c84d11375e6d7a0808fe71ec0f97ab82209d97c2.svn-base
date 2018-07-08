package ddd.simple.entity.headPortrait;

import ddd.base.annotation.Column;
import ddd.base.persistence.baseEntity.Entity;
import ddd.simple.entity.organization.Employee;


@ddd.base.annotation.Entity(label="头像管理",name="headPortrait")
public class HeadPortrait extends Entity {
	private static final long serialVersionUID = 1L;
	
	@Column(label="职员",name="employeeId",comment="外键",FKName="headPor_FK_employee")
	private Employee employee;

	@Column(label="头像路径",name="logoUrl",length=250,nullable=true,unique=false,comment="头像路径")
	private String logoUrl;

	public Employee getEmployee() {
		lazyLoad();
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public String getLogoUrl() {
		lazyLoad();
		return this.logoUrl;
	}

	public void setLogoUrl(String logoUrl) {
		this.logoUrl = logoUrl;
	}


	
}
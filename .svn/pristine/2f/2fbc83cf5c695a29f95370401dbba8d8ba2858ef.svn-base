package ddd.simple.entity.message;

import ddd.base.annotation.Column;
import ddd.base.persistence.baseEntity.Entity;

import java.util.Date;
import ddd.simple.entity.organization.Employee;


@ddd.base.annotation.Entity(label="消息",name="IN_message")
public class Message extends Entity {
	private static final long serialVersionUID = 1L;
	
	@Column(label="人员",name="employeeId",nullable=false,unique=false,comment="人员",FKName="m_fk_e")
	private Employee employee;

	@Column(label="类型",name="typeOfMessage",length=250,nullable=true,unique=false,comment="类型")
	private String typeOfMessage;

	@Column(label="内容",name="content",length=250,nullable=true,unique=false,comment="内容")
	private String content;
	
	@Column(label="子内容",name="subContent",length=4000,nullable=true,unique=false,comment="子内容")
	private String subContent;

	@Column(label="状态",name="state",length=250,nullable=true,unique=false,comment="状态")
	private String state;

	@Column(label="时间",name="dateOfMessage",length=250,nullable=true,unique=false,comment="时间")
	private Date dateOfMessage;
	
	

	

	public String getSubContent()
	{
		lazyLoad();
		return subContent;
	}

	public void setSubContent(String subContent)
	{
		this.subContent = subContent;
	}

	public Employee getEmployee() {
		lazyLoad();
		return this.employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public String getTypeOfMessage() {
		lazyLoad();
		return this.typeOfMessage;
	}

	public void setTypeOfMessage(String typeOfMessage) {
		this.typeOfMessage = typeOfMessage;
	}

	public String getContent() {
		lazyLoad();
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getState() {
		lazyLoad();
		return this.state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public Date getDateOfMessage() {
		lazyLoad();
		return this.dateOfMessage;
	}

	public void setDateOfMessage(Date dateOfMessage) {
		this.dateOfMessage = dateOfMessage;
	}


	
}
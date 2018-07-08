package ddd.simple.entity.student_module;

import ddd.base.annotation.Column;
import ddd.base.persistence.baseEntity.Entity;
import ddd.simple.entity.organization.Organization;

import java.util.Date;

@ddd.base.annotation.Entity(label="学生实体",name="DD_student")
public class Student extends Entity {
	private static final long serialVersionUID = 1L;

	@Column(label="学生登录账号",name="stuName",length=250,nullable=false,unique=false,comment="学生登录账号")
	private String stuName;

	@Column(label="真实姓名",name="stuRealName",length=250,nullable=true,unique=false,comment="真实姓名")
	private String stuRealName;

	@Column(label="学生性别",name="stuGender",length=250,nullable=true,unique=false,comment="学生性别")
	private String stuGender;

	@Column(label="学生年龄",name="stuAge",length=250,nullable=true,unique=false,comment="学生年龄")
	private Integer stuAge;

	@Column(label="民族",name="nation",length=250,nullable=true,unique=false,comment="民族")
	private String nation;

	@Column(label="出生日期",name="birthDate",length=250,nullable=true,unique=false,comment="出生日期")
	private Date birthDate;

	@Column(label="学生联系方式",name="stuPhone",length=250,nullable=true,unique=false,comment="学生联系方式")
	private String stuPhone;

	@Column(label="学生邮件地址",name="stuEmail",length=250,nullable=true,unique=false,comment="学生邮件地址")
	private String stuEmail;

	@Column(label="专业信息",name="stuMajor",length=250,nullable=true,unique=false,comment="专业信息")
	private Integer stuMajor;

	@Column(label="创建时间",name="creatTime",length=250,nullable=false,unique=false,comment="创建时间")
	private Date creatTime;

	@Column(label="更新时间",name="updateTime",length=250,nullable=false,unique=false,comment="更新时间")
	private Date updateTime;

	@Column(label="学生账号状态",name="state",length=250,nullable=false,unique=false,comment="学生账号状态")
	private String state;
	
	@Column(label="所选课题",name="taskId",length=250,nullable=false,unique=false,comment="所选课题")
	private Long taskId;
	
	@Column(label="当前学期",name="currentSemester",length=250,nullable=false,unique=false,comment="当前学期")
	private String currentSemester;

	@Column(label="学生所属学校",name="Organization",length=250,nullable=false,unique=false,comment="学生所属学校")
	private Organization organization;

	
	public String getCurrentSemester() {
		return currentSemester;
	}

	public void setCurrentSemester(String currentSemester) {
		this.currentSemester = currentSemester;
	}

	public Long getTaskId() {
		return taskId;
	}

	public void setTaskId(Long taskId) {
		this.taskId = taskId;
	}

	public String getNation() {
		return nation;
	}

	public void setNation(String nation) {
		this.nation = nation;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}
	
	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
	}

	@Column(name="operatorId",label="相应操作员编码")
	private Long operatorId;

	public Long getOperatorId() {
		return operatorId;
	}

	public void setOperatorId(Long operatorId) {
		this.operatorId = operatorId;
	}

	public String getStuName() {
		lazyLoad();
		return this.stuName;
	}

	public void setStuName(String stuName) {
		this.stuName = stuName;
	}

	public String getStuRealName() {
		lazyLoad();
		return this.stuRealName;
	}

	public void setStuRealName(String stuRealName) {
		this.stuRealName = stuRealName;
	}

	public String getStuGender() {
		lazyLoad();
		return this.stuGender;
	}

	public void setStuGender(String stuGender) {
		this.stuGender = stuGender;
	}

	public Integer getStuAge() {
		lazyLoad();
		return this.stuAge;
	}

	public void setStuAge(Integer stuAge) {
		this.stuAge = stuAge;
	}

	public String getStuPhone() {
		lazyLoad();
		return this.stuPhone;
	}

	public void setStuPhone(String stuPhone) {
		this.stuPhone = stuPhone;
	}

	public String getStuEmail() {
		lazyLoad();
		return this.stuEmail;
	}

	public void setStuEmail(String stuEmail) {
		this.stuEmail = stuEmail;
	}

	public Integer getStuMajor() {
		lazyLoad();
		return this.stuMajor;
	}

	public void setStuMajor(Integer stuMajor) {
		this.stuMajor = stuMajor;
	}

	public Date getCreatTime() {
		lazyLoad();
		return this.creatTime;
	}

	public void setCreatTime(Date creatTime) {
		this.creatTime = creatTime;
	}

	public Date getUpdateTime() {
		lazyLoad();
		return this.updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public String getState() {
		lazyLoad();
		return this.state;
	}

	public void setState(String state) {
		this.state = state;
	}


	
}
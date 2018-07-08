package ddd.simple.entity.teacher_module;

import ddd.base.annotation.Column;
import ddd.base.persistence.baseEntity.Entity;
import ddd.simple.entity.organization.Organization;
import ddd.simple.entity.permission.Operator;

import java.util.Date;

@ddd.base.annotation.Entity(label="教师实体",name="DD_teacher")
public class Teacher extends Entity {
	private static final long serialVersionUID = 1L;

	@Column(label="教师登陆账号",name="teaName",length=250,nullable=false,unique=false,comment="教师登陆账号")
	private String teaName;

	@Column(label="教师真实姓名",name="teaRealName",length=250,nullable=true,unique=false,comment="教师真实姓名")
	private String teaRealName;

	@Column(label="教师性别",name="teaGender",length=250,nullable=true,unique=false,comment="教师性别")
	private String teaGender;

	@Column(label="民族",name="nation",length=250,nullable=true,unique=false,comment="民族")
	private String nation;

	@Column(label="学历",name="lastedEducationBackground",length=250,nullable=true,unique=false,comment="学历")
	private String lastedEducationBackground;

	@Column(label="出生日期",name="birthDate",length=250,nullable=true,unique=false,comment="出生日期")
	private Date birthDate;

	@Column(label="教师研究方向",name="teaStudy",length=250,nullable=true,unique=false,comment="教师研究方向")
	private String teaStudy;

	@Column(label="联系方式",name="teaPhone",length=250,nullable=true,unique=false,comment="联系方式")
	private String teaPhone;

	@Column(label="办公地址",name="teaAddress",length=250,nullable=true,unique=false,comment="办公地址")
	private String teaAddress;

	@Column(label="邮件地址",name="teaEmail",length=250,nullable=true,unique=false,comment="邮件地址")
	private String teaEmail;

	@Column(label="是否显示信息",name="showState",length=250,nullable=true,unique=false,comment="是否显示信息")
	private Boolean showState;

	@Column(label="创建时间",name="createTime",length=250,nullable=true,unique=false,comment="创建时间")
	private Date createTime;

	@Column(label="更新时间",name="updateTime",length=250,nullable=true,unique=false,comment="更新时间")
	private Date updateTime;

	@Column(label="教师账号状态",name="teaState",length=250,nullable=true,unique=false,comment="教师账号状态")
	private String teaState;

	@Column(label="教师所属单位",name="teaOrganization",length=250,nullable=false,unique=false,comment="教师所属单位")
	private Organization teaOrganization;

	@Column(name="operatorId",label="相应操作员编码")
	private Long operatorId;

	public String getNation() {
		return nation;
	}

	public void setNation(String nation) {
		this.nation = nation;
	}

	public String getLastedEducationBackground() {
		return lastedEducationBackground;
	}

	public void setLastedEducationBackground(String lastedEducationBackground) {
		this.lastedEducationBackground = lastedEducationBackground;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public Long getOperatorId() {
		return operatorId;
	}

	public void setOperatorId(Long operatorId) {
		this.operatorId = operatorId;
	}

	public void setTeaOrganization(Organization teaOrganization) {
		this.teaOrganization = teaOrganization;
	}

	public Organization getTeaOrganization() {
		lazyLoad();
		return teaOrganization;
	}

	public String getTeaName() {
		lazyLoad();
		return this.teaName;
	}

	public void setTeaName(String teaName) {
		this.teaName = teaName;
	}

	public String getTeaRealName() {
		lazyLoad();
		return this.teaRealName;
	}

	public void setTeaRealName(String teaRealName) {
		this.teaRealName = teaRealName;
	}

	public String getTeaGender() {
		lazyLoad();
		return this.teaGender;
	}

	public void setTeaGender(String teaGender) {
		this.teaGender = teaGender;
	}

	public String getTeaStudy() {
		lazyLoad();
		return this.teaStudy;
	}

	public void setTeaStudy(String teaStudy) {
		this.teaStudy = teaStudy;
	}

	public String getTeaPhone() {
		lazyLoad();
		return this.teaPhone;
	}

	public void setTeaPhone(String teaPhone) {
		this.teaPhone = teaPhone;
	}

	public String getTeaAddress() {
		lazyLoad();
		return this.teaAddress;
	}

	public void setTeaAddress(String teaAddress) {
		this.teaAddress = teaAddress;
	}

	public String getTeaEmail() {
		lazyLoad();
		return this.teaEmail;
	}

	public void setTeaEmail(String teaEmail) {
		this.teaEmail = teaEmail;
	}

	public Boolean getShowState() {
		lazyLoad();
		return this.showState;
	}

	public void setShowState(Boolean showState) {
		this.showState = showState;
	}

	public Date getCreateTime() {
		lazyLoad();
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		lazyLoad();
		return this.updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public String getTeaState() {
		lazyLoad();
		return this.teaState;
	}

	public void setTeaState(String teaState) {
		this.teaState = teaState;
	}


	
}
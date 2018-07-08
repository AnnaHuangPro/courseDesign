package ddd.simple.entity.member;

import ddd.base.annotation.Column;
import ddd.base.persistence.baseEntity.Entity;

@ddd.base.annotation.Entity(label = "会员", name = "member")
public class Member extends Entity {
	private static final long serialVersionUID = 1L;

	@Column(label="唯一编码",name="onlyCode",length=250,nullable=false,unique=true,comment="唯一编码")
	private String onlyCode;

	//校内、校外
	@Column(label="校内外",name="typeCode",length=250,nullable=true,unique=false,comment="状态码")
	private String typeCode;
	
	@Column(label = "用户名", nullable = false, comment = "")
	private String name;

	@Column(label = "密码", comment = "")
	private String password;

	@Column(label = "性别", comment = "")
	private String sex;

	@Column(label = "生日", comment = "")
	private String birthday;

	@Column(label = "电子邮件", comment = "")
	private String email;

	@Column(label = "联系电话", comment = "")
	private String phone;

	@Column(label = "教育程度", comment = "")
	private String eduStatus;

	@Column(label = "当前职业", comment = "")
	private String currentCareer;

	@Column(label = "血型", comment = "")
	private String bloodType;

	@Column(label = "婚姻状况", comment = "")
	private String maritalStatus;

	@Column(label = "地址", comment = "")
	private String address;

	@Column(label = "个人简介", comment = "")
	private String introduce;

	@Column(label = "喜欢的书籍", comment = "")
	private String likeBooks;

	@Column(label = "头像", comment = "")
	private String avatarUrl;

	@Column(label="部门\\学院代码",name="deptid",length=250,nullable=true,unique=false,comment="部门/学院 代码 ")
	private String deptid;
	
	public String getDeptid() {
		lazyLoad();
		return this.deptid;
	}

	public void setDeptid(String deptid) {
		this.deptid = deptid;
	}
	
	public String getAvatarUrl() {
		lazyLoad();
		return avatarUrl;
	}

	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
	}

	public String getName() {
		lazyLoad();
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		lazyLoad();
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSex() {
		lazyLoad();
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getBirthday() {
		lazyLoad();
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public String getEmail() {
		lazyLoad();
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		lazyLoad();
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEduStatus() {
		lazyLoad();
		return eduStatus;
	}

	public void setEduStatus(String eduStatus) {
		this.eduStatus = eduStatus;
	}

	public String getCurrentCareer() {
		lazyLoad();
		return currentCareer;
	}

	public void setCurrentCareer(String currentCareer) {
		this.currentCareer = currentCareer;
	}

	public String getMaritalStatus() {
		lazyLoad();
		return maritalStatus;
	}

	public void setMaritalStatus(String maritalStatus) {
		this.maritalStatus = maritalStatus;
	}

	public String getAddress() {
		lazyLoad();
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getIntroduce() {
		lazyLoad();
		return introduce;
	}

	public void setIntroduce(String introduce) {
		this.introduce = introduce;
	}

	public String getLikeBooks() {
		lazyLoad();
		return likeBooks;
	}

	public void setLikeBooks(String likeBooks) {
		this.likeBooks = likeBooks;
	}

	public String getOnlyCode() {
		lazyLoad();
		return onlyCode;
	}

	public void setOnlyCode(String onlyCode) {
		this.onlyCode = onlyCode;
	}

	public String getBloodType() {
		lazyLoad();
		return bloodType;
	}

	public void setBloodType(String bloodType) {
		this.bloodType = bloodType;
	}
	public String getTypeCode() {
		lazyLoad();
		return typeCode;
	}

	public void setTypeCode(String typeCode) {
		this.typeCode = typeCode;
	}

}
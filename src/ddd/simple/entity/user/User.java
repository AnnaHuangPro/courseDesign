package ddd.simple.entity.user;

import ddd.base.annotation.Column;
import ddd.base.persistence.baseEntity.Entity;

import java.util.Date;

@ddd.base.annotation.Entity(label="用户",name="DD_user")
public class User extends Entity {
	private static final long serialVersionUID = 1L;
	
	@Column(label="用户名",name="userName",length=250,nullable=false,unique=false,comment="用户名")
	private String userName;

	@Column(label="密码",name="passWord",length=250,nullable=false,unique=false,comment="密码")
	private String passWord;

	@Column(label="联系方式",name="phone",length=250,nullable=false,unique=false,comment="联系方式")
	private Long phone;

	@Column(label="邮箱",name="email",length=250,nullable=false,unique=false,comment="邮箱")
	private String email;

	@Column(label="性别",name="gender",length=250,nullable=true,unique=false,comment="性别")
	private String gender;

	@Column(label="出生日期",name="birthdate",length=250,nullable=true,unique=false,comment="出生日期")
	private Date birthdate;

	@Column(label="地址",name="address",length=250,nullable=true,unique=false,comment="地址")
	private String address;


	public String getUserName() {
		lazyLoad();
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassWord() {
		lazyLoad();
		return this.passWord;
	}

	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}

	public Long getPhone() {
		lazyLoad();
		return this.phone;
	}

	public void setPhone(Long phone) {
		this.phone = phone;
	}

	public String getEmail() {
		lazyLoad();
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getGender() {
		lazyLoad();
		return this.gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Date getBirthdate() {
		lazyLoad();
		return this.birthdate;
	}

	public void setBirthdate(Date birthdate) {
		this.birthdate = birthdate;
	}

	public String getAddress() {
		lazyLoad();
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}


	
}
package ddd.simple.entity.organization;


import java.io.Serializable;
import java.util.Date;
import ddd.base.annotation.Column; import java.util.Date;
import ddd.base.persistence.baseEntity.Entity;

/**
 * 职员
 * 
 */
@ddd.base.annotation.Entity(name="employee",label="职员")
public class Employee extends Entity implements Serializable{
	
	
	private static final long serialVersionUID = 1L;
	
	@Column(label="key",unique=true,comment="用于单点登录")
	private String userKey;
	
	/**职员编码*/
	@Column(label="职员编码",nullable=false,unique=true)
	private String code;
		
	/**姓名*/
	@Column(label="姓名")	
	private String name;
	
	/**联系电话*/
	@Column(label="联系电话")	
	private String linkTel;

	/**邮箱*/
	@Column(label="邮箱")
	private String email;
    
	/**备注*/
	@Column(label="备注")    
	private String description;
	
	/**所属单位*/
	@Column(label="所属单位",name="organizationId")
	private Organization organization;
	
	/**所属部门*/
	@Column(label="所属部门",name="departmentId")
	private Department department;

	/**民族 **/
	@Column(label="民族",name="nation")
	private String nation;

	/**学历 **/
	@Column(label="学历",name="lastedEducationBackground")
	private String lastedEducationBackground;

	/**毕业学校 **/
	@Column(label="毕业学校",name="graduateSchool")
	private String graduateSchool;

	/**政治面貌 **/
	@Column(label="政治面貌",name="politicStatus")
	private String politicStatus;

	/**性别	 **/
	@Column(label = "性别")
	private String sex;

	/**出生日期	 **/
	@Column(label="出生日期")
	private Date birthDate;

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

	public String getGraduateSchool() {
		return graduateSchool;
	}

	public void setGraduateSchool(String graduateSchool) {
		this.graduateSchool = graduateSchool;
	}

	public String getPoliticStatus() {
		return politicStatus;
	}

	public void setPoliticStatus(String politicStatus) {
		this.politicStatus = politicStatus;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCode() {
		lazyLoad();
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		lazyLoad();
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLinkTel() {
		lazyLoad();
		return linkTel;
	}

	public void setLinkTel(String linkTel) {
		this.linkTel = linkTel;
	}

	public String getDescription() {
		lazyLoad();
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Organization getOrganization() {
		lazyLoad();
		return this.organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
	}

	public Department getDepartment() {
		lazyLoad();
		return this.department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	public String getSex() {
		lazyLoad();
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public Date getBirthDate() {
		lazyLoad();
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getUserKey() {
		lazyLoad();
		return userKey;
	}

	public void setUserKey(String userKey) {
		this.userKey = userKey;
	}
}

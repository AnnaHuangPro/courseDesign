package ddd.simple.entity.organization;


import java.io.Serializable;
import java.util.Date;

import ddd.base.annotation.Column;
import ddd.base.persistence.EntitySet;
import ddd.base.persistence.baseEntity.Entity;



/**
 * 单位 
 * @author 龚翔
 */
@ddd.base.annotation.Entity(name="organization",label="单位")
public class Organization extends Entity implements Serializable{
 

	private static final long serialVersionUID = 1L;
	

	/**单位编码*/
	@Column(label="单位编码",name="code",length=250,nullable=false,unique=true,comment="唯一编码")
	private String code;
 
	/**单位名称*/
	@Column(label="单位名称")
	private String name;

	/**联系电话*/
	@Column(label="联系电话")	
    private String linkTel;
 
	/**备注*/
	@Column(label="备注")	
    private String description;

	/**创建时间*/
	@Column(label="创建时间")
    private Date creatTime;
	
	/**单位地址*/
	@Column(label="单位地址",length=4000)
    private String address;
 
	/**修改时间*/
	@Column(label="修改时间")	
    private Date modifyTime;  

	/**上级单位*/
	@Column(label="上级单位",name="organizationParentId")
	private Organization parent;

	/**下级单位*/
	@Column(label="下级单位",joinColumn="organizationParentId",composition=true)
	private EntitySet<Organization> children;

	@Column(label = "流程实例Id")
	private Long processInstanceId;
	
	@Column(label = "审批结果",nullable=true)
	private String checkResult;
	
	@Column(label = "审批状态",nullable=true)
	private String auditState;

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
	
	public String getAddress() {
		lazyLoad();
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getCreatTime() {
		lazyLoad();
		return creatTime;
	}

	public void setCreatTime(Date creatTime) {
		this.creatTime = creatTime;
	}

	public Date getModifyTime() {
		lazyLoad();
		return modifyTime;
	}

	public void setModifyTime(Date modifyTime) {
		this.modifyTime = modifyTime;
	}

	public Organization getParent() {
		lazyLoad();
		return parent;
	}

	public void setParent(Organization parent) {
		this.parent = parent;
	}

	public EntitySet<Organization> getChildren() {
		lazyLoad("children");
		return children;
	}

	public void setChildren(EntitySet<Organization> children) {
		this.children = children;
	}

	public Long getProcessInstanceId() {
		lazyLoad();
		return processInstanceId;
	}

	public void setProcessInstanceId(Long processInstanceId) {
		this.processInstanceId = processInstanceId;
	}

	public String getCheckResult() {
		lazyLoad();
		return checkResult;
	}

	public void setCheckResult(String checkResult) {
		this.checkResult = checkResult;
	}

	public String getAuditState() {
		lazyLoad();
		return auditState;
	}

	public void setAuditState(String auditState) {
		this.auditState = auditState;
	}
}

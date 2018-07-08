package ddd.simple.entity.attachmentGroup;

import ddd.base.annotation.Column;
import ddd.base.persistence.baseEntity.Entity;


@ddd.base.annotation.Entity(label="文档(中间表)",name="attachmentGroup")
public class AttachmentGroup extends Entity
{
	private static final long serialVersionUID = 1L;
	
	@Column(label="名称",comment="")
	private String name;

	@Column(label="编码",comment="")
	private String groupCode;
	
	@Column(label="级次",comment="word标题的级次")
	private Integer titleLevel;
	
	@Column(label="是否允许上传附件",comment="")
	private Boolean enable;
	
	@Column(label="文档项Id",comment="")
	private Long attachmentGroupItemId;

	@Column(label="关联表单Id")
	private Long associateFormId;
	
	@Column(label="关联表单名称")
	private String associateFormName;
	
	@Column(label="最小上传的文档数量",comment="0不限制")
	private Integer minFiles;
	
	@Column(label="最大上传的文档数量",comment="0不限制")
	private Integer maxFiles;

	public String getName() {
		lazyLoad();
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getAttachmentGroupItemId() {
		lazyLoad();
		return attachmentGroupItemId;
	}

	public void setAttachmentGroupItemId(Long attachmentGroupItemId) {
		this.attachmentGroupItemId = attachmentGroupItemId;
	}

	public Long getAssociateFormId() {
		lazyLoad();
		return associateFormId;
	}

	public void setAssociateFormId(Long associateFormId) {
		this.associateFormId = associateFormId;
	}

	public String getAssociateFormName() {
		lazyLoad();
		return associateFormName;
	}

	public void setAssociateFormName(String associateFormName) {
		this.associateFormName = associateFormName;
	}

	public Integer getMinFiles() {
		lazyLoad();
		return minFiles;
	}

	public void setMinFiles(Integer minFiles) {
		this.minFiles = minFiles;
	}

	public Integer getMaxFiles() {
		lazyLoad();
		return maxFiles;
	}

	public void setMaxFiles(Integer maxFiles) {
		this.maxFiles = maxFiles;
	}

	public String getGroupCode() {
		return groupCode;
	}

	public void setGroupCode(String groupCode) {
		this.groupCode = groupCode;
	}

	public Integer getTitleLevel() {
		lazyLoad();
		return titleLevel;
	}

	public void setTitleLevel(Integer titleLevel) {
		this.titleLevel = titleLevel;
	}

	public Boolean getEnable() {
		lazyLoad();
		return enable;
	}

	public void setEnable(Boolean enable) {
		this.enable = enable;
	}
}
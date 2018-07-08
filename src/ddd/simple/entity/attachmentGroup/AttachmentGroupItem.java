package ddd.simple.entity.attachmentGroup;

import ddd.base.annotation.Column;
import ddd.base.persistence.EntitySet;
import ddd.base.persistence.baseEntity.Entity;

@ddd.base.annotation.Entity(label = "文档项", name = "attachmentGroupItem")
public class AttachmentGroupItem extends Entity {
	private static final long serialVersionUID = 1L;

	@Column(label = "标题", comment = "")
	private String name;
	
	@Column(label="标题级次",comment="一级标题，二级标题")
	private Integer titleLevel;

	@Column(label = "编码", comment = "")
	private String groupItemCode;

	@Column(label="是否允许上传附件",comment="")
	private Boolean enable;
	
	@Column(label = "最小上传的文档数量", comment = "0不限制")
	private Integer minFiles;

	@Column(label = "最大上传的文档数量", comment = "0不限制")
	private Integer maxFiles;

	@Column(label = "上传的文档类型", comment = "png,jpg..")
	private String fileType;

	@Column(label = "显示顺序", comment = "")
	private Integer displayIndex;

	@Column(label = "文档组", name = "attachementTemplateId", FKName = "group_fk_item", comment = "")
	private AttachmentGroupTemplate attachementGroupTemplate;
	
	public String getName() {
		lazyLoad();
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGroupItemCode() {
		lazyLoad();
		return groupItemCode;
	}

	public void setGroupItemCode(String groupItemCode) {
		this.groupItemCode = groupItemCode;
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

	public String getFileType() {
		lazyLoad();
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public AttachmentGroupTemplate getAttachementGroupTemplate() {
		lazyLoad();
		return attachementGroupTemplate;
	}

	public void setAttachementGroupTemplate(AttachmentGroupTemplate attachementGroupTemplate) {
		this.attachementGroupTemplate = attachementGroupTemplate;
	}

	public Integer getDisplayIndex() {
		lazyLoad();
		return displayIndex;
	}

	public void setDisplayIndex(Integer displayIndex) {
		this.displayIndex = displayIndex;
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
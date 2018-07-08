package ddd.simple.entity.modelFile;

import ddd.base.annotation.Column; import java.util.Date;
import ddd.base.persistence.baseEntity.Entity;


@ddd.base.annotation.Entity(label="模板文件",name="modelFile")
public class ModelFile extends Entity
{
	private static final long serialVersionUID = 1L;
	
	@Column(label="唯一标识",comment="")
	private String modelKey;

	@Column(label="类型",comment="")
	private String type;

	@Column(label="类别",comment="")
	private String category;

	@Column(label="名称",comment="")
	private String name;
	
	@Column(label="动态表单",comment="")
	private String dynamicKey;
	
	@Column(label="展示类型",comment="")
	private Integer withChart;
	
	@Column(label="权限点",comment="")
	private String permission;
	
	@Column(label="是否默认导出名字",comment="")//如果为false，那么在导出时必须传递expName_作为导出文件名字
	private String isDefaultExpName;
	
	@Column(label="报表是否分页",comment="")
	private String isPagenation;
	
	@Column(label="报表初始参数",comment="")
	private String initParam;
	
	
	
	public String getInitParam()
	{
		lazyLoad();
		return initParam;
	}

	public void setInitParam(String initParam)
	{
		this.initParam = initParam;
	}

	public String getIsPagenation()
	{
		lazyLoad();
		return isPagenation;
	}

	public void setIsPagenation(String isPagenation)
	{
		this.isPagenation = isPagenation;
	}

	public String getIsDefaultExpName()
	{
		lazyLoad();
		return isDefaultExpName;
	}

	public void setIsDefaultExpName(String isDefaultExpName)
	{
		this.isDefaultExpName = isDefaultExpName;
	}

	public Integer getWithChart()
	{
		return withChart;
	}

	public void setWithChart(Integer withChart)
	{
		this.withChart = withChart;
	}

	public String getPermission()
	{
		return permission;
	}

	public void setPermission(String permission)
	{
		this.permission = permission;
	}

	public String getName()
	{
		lazyLoad();
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public String getModelKey() {
		lazyLoad();
		return this.modelKey;
	}

	public void setModelKey(String modelKey) {
		this.modelKey = modelKey;
	}

	public String getType() {
		lazyLoad();
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getCategory() {
		lazyLoad();
		return this.category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getDynamicKey() {
		lazyLoad();
		return dynamicKey;
	}

	public void setDynamicKey(String dynamicKey) {
		this.dynamicKey = dynamicKey;
	}


	
}
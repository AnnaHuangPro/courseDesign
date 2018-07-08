package ddd.simple.entity.listview;

import ddd.base.annotation.Column;
import ddd.base.persistence.EntitySet;
import ddd.base.persistence.baseEntity.Entity;

/**
 * @author 林园
 *
 */
@ddd.base.annotation.Entity(label="数据源类型",name="DD_dataSourceType")
public class DataSourceType extends Entity {
	private static final long serialVersionUID = 1L;
	
	@Column(label="数据源类型名称",name="dataSourceTypeName",length=250,nullable=true,unique=false,comment="数据源类型名称")
	private String dataSourceTypeName;

	@Column(label="数据源类型编码",name="dataSourceTypeCode",length=250,nullable=false,unique=true,uniqueName="unique_dataSourceTypeCode",comment="数据源类型编码")
	private String dataSourceTypeCode;

	public String getDataSourceTypeName() {
		lazyLoad();
		return this.dataSourceTypeName;
	}

	public void setDataSourceTypeName(String dataSourceTypeName) {
		this.dataSourceTypeName = dataSourceTypeName;
	}

	public String getDataSourceTypeCode() {
		lazyLoad();
		return this.dataSourceTypeCode;
	}

	public void setDataSourceTypeCode(String dataSourceTypeCode) {
		this.dataSourceTypeCode = dataSourceTypeCode;
	}
}
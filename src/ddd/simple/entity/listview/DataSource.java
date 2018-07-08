package ddd.simple.entity.listview;

import java.io.Serializable;
import ddd.base.annotation.Column; import java.util.Date;
import ddd.base.persistence.EntitySet;
import ddd.base.persistence.baseEntity.Entity;
import ddd.simple.entity.codeTable.CodeType;

@ddd.base.annotation.Entity(name="datasource",label="数据源")
public class DataSource extends Entity implements Serializable
{
	private static final long serialVersionUID = 11L;
	
	@Column(name="dataSourceName",label="dataSourceName")
	private String dataSourceName;

	@Column(name="dataSourceCode",label="dataSourceCode",nullable=false,unique=true,comment="唯一编码")
	private String dataSourceCode;
	
	@Column(joinColumn="dataSourceId",composition=true)
	private EntitySet<ColumnMetaData> htmlColumns;
	
	@Column(name="reportSql",label="reportSql",length=8000)
	private String reportSql;

	@Column(name="dataSourceDesc",label="dataSourceDesc")
	private String dataSourceDesc;
	
	@Column(label = "数据源类型",name="dataSourceType")
	private String dataSourceType;
	
	@Column(label = "外部数据源地址",name="outDataSourceURL")
	private String outDataSourceURL;
	
	
	
	public String getOutDataSourceURL() {
		lazyLoad();
		return outDataSourceURL;
	}

	public void setOutDataSourceURL(String outDataSourceURL) {
		this.outDataSourceURL = outDataSourceURL;
	}

	public String getDataSourceType() {
		lazyLoad();
		return dataSourceType;
	}

	public void setDataSourceType(String dataSourceType) {
		this.dataSourceType = dataSourceType;
	}

	public String getDataSourceCode() {
		lazyLoad();
		return this.dataSourceCode;
	}

	public void setDataSourceCode(String dataSourceCode) {
		this.dataSourceCode = dataSourceCode;
	}

	public EntitySet<ColumnMetaData> getHtmlColumns() {
		lazyLoad("htmlColumns");
		return this.htmlColumns;
	}

	public void setHtmlColumns(EntitySet<ColumnMetaData> htmlColumns) {
		super.LazyFieidsLoaded.put("htmlColumns", true);
		this.htmlColumns = htmlColumns;
	}

	public String getDataSourceName() {
		lazyLoad();
		return this.dataSourceName;
	}

	public void setDataSourceName(String dataSourceName) {
		this.dataSourceName = dataSourceName;
	}

	public String getReportSql() {
		lazyLoad();
		return this.reportSql;
	}

	public void setReportSql(String reportSql) {
		this.reportSql = reportSql;
	}

	public String getDataSourceDesc() {
		lazyLoad();
		return this.dataSourceDesc;
	}

	public void setDataSourceDesc(String moduleDesc) {
		this.dataSourceDesc = moduleDesc;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
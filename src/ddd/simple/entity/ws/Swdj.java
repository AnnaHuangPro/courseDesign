package ddd.simple.entity.ws;

import ddd.base.annotation.Column;
import ddd.base.persistence.baseEntity.Entity;

import java.util.Date;

@ddd.base.annotation.Entity(label="失物登记",name="DD_swdj")
public class Swdj extends Entity {
	private static final long serialVersionUID = 1L;
	
	@Column(label="登记编码",name="swdj_code",length=250,nullable=false,unique=false,comment="登记编码")
	private String swdj_code;

	@Column(label="登记日期",name="swdj_time",length=250,nullable=true,unique=false,comment="登记日期")
	private Date swdj_time;

	@Column(label="登记人",name="swdj_name",length=250,nullable=true,unique=false,comment="登记人")
	private String swdj_name;

	@Column(label="丢失时间",name="swdj_detime",length=250,nullable=true,unique=false,comment="丢失时间")
	private Date swdj_detime;

	@Column(label="丢失地点",name="swdj_where",length=250,nullable=true,unique=false,comment="丢失地点")
	private String swdj_where;

	@Column(label="物品",name="swdj_detail",length=250,nullable=true,unique=false,comment="物品")
	private String swdj_detail;


	public String getSwdj_code() {
		lazyLoad();
		return this.swdj_code;
	}

	public void setSwdj_code(String swdj_code) {
		this.swdj_code = swdj_code;
	}

	public Date getSwdj_time() {
		lazyLoad();
		return this.swdj_time;
	}

	public void setSwdj_time(Date swdj_time) {
		this.swdj_time = swdj_time;
	}

	public String getSwdj_name() {
		lazyLoad();
		return this.swdj_name;
	}

	public void setSwdj_name(String swdj_name) {
		this.swdj_name = swdj_name;
	}

	public Date getSwdj_detime() {
		lazyLoad();
		return this.swdj_detime;
	}

	public void setSwdj_detime(Date swdj_detime) {
		this.swdj_detime = swdj_detime;
	}

	public String getSwdj_where() {
		lazyLoad();
		return this.swdj_where;
	}

	public void setSwdj_where(String swdj_where) {
		this.swdj_where = swdj_where;
	}

	public String getSwdj_detail() {
		lazyLoad();
		return this.swdj_detail;
	}

	public void setSwdj_detail(String swdj_detail) {
		this.swdj_detail = swdj_detail;
	}


	
}
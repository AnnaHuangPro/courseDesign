package ddd.simple.entity.ws;

import ddd.base.annotation.Column;
import ddd.base.persistence.baseEntity.Entity;

import java.util.Date;

@ddd.base.annotation.Entity(label="招领登记",name="DD_zldj")
public class Zldj extends Entity {
	private static final long serialVersionUID = 1L;
	
	@Column(label="招领登记编码",name="zldj_code",length=250,nullable=false,unique=false,comment="招领登记编码")
	private String zldj_code;

	@Column(label="拾主姓名",name="zldj_owner",length=250,nullable=true,unique=false,comment="拾主姓名")
	private String zldj_owner;

	@Column(label="登记时间",name="zldj_time",length=250,nullable=true,unique=false,comment="登记时间")
	private Date zldj_time;

	@Column(label="拾到物品时间",name="zldj_detime",length=250,nullable=true,unique=false,comment="拾到物品时间")
	private Date zldj_detime;

	@Column(label="拾物地点",name="zldj_where",length=250,nullable=true,unique=false,comment="拾物地点")
	private String zldj_where;

	@Column(label="物品摘要",name="zldj_detail",length=250,nullable=true,unique=false,comment="物品摘要")
	private String zldj_detail;


	public String getZldj_code() {
		lazyLoad();
		return this.zldj_code;
	}

	public void setZldj_code(String zldj_code) {
		this.zldj_code = zldj_code;
	}

	public String getZldj_owner() {
		lazyLoad();
		return this.zldj_owner;
	}

	public void setZldj_owner(String zldj_owner) {
		this.zldj_owner = zldj_owner;
	}

	public Date getZldj_time() {
		lazyLoad();
		return this.zldj_time;
	}

	public void setZldj_time(Date zldj_time) {
		this.zldj_time = zldj_time;
	}

	public Date getZldj_detime() {
		lazyLoad();
		return this.zldj_detime;
	}

	public void setZldj_detime(Date zldj_detime) {
		this.zldj_detime = zldj_detime;
	}

	public String getZldj_where() {
		lazyLoad();
		return this.zldj_where;
	}

	public void setZldj_where(String zldj_where) {
		this.zldj_where = zldj_where;
	}

	public String getZldj_detail() {
		lazyLoad();
		return this.zldj_detail;
	}

	public void setZldj_detail(String zldj_detail) {
		this.zldj_detail = zldj_detail;
	}


	
}
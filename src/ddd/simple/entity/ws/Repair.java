package ddd.simple.entity.ws;

import ddd.base.annotation.Column;
import ddd.base.persistence.baseEntity.Entity;

import java.util.Date;

@ddd.base.annotation.Entity(label="报修",name="DD_repair")
public class Repair extends Entity {
	private static final long serialVersionUID = 1L;
	
	@Column(label="报修单号",name="repa_code",length=250,nullable=false,unique=false,comment="报修单号")
	private String repa_code;

	@Column(label="报修日期",name="repa_date",length=250,nullable=true,unique=false,comment="报修日期")
	private Date repa_date;

	@Column(label="寝室号",name="repa_dorm",length=250,nullable=true,unique=false,comment="寝室号")
	private String repa_dorm;

	@Column(label="报修项目",name="repa_item",length=250,nullable=true,unique=false,comment="报修项目")
	private String repa_item;

	@Column(label="报修人姓名",name="repa_name",length=250,nullable=true,unique=false,comment="报修人姓名")
	private String repa_name;


	public String getRepa_code() {
		lazyLoad();
		return this.repa_code;
	}

	public void setRepa_code(String repa_code) {
		this.repa_code = repa_code;
	}

	public Date getRepa_date() {
		lazyLoad();
		return this.repa_date;
	}

	public void setRepa_date(Date repa_date) {
		this.repa_date = repa_date;
	}

	public String getRepa_dorm() {
		lazyLoad();
		return this.repa_dorm;
	}

	public void setRepa_dorm(String repa_dorm) {
		this.repa_dorm = repa_dorm;
	}

	public String getRepa_item() {
		lazyLoad();
		return this.repa_item;
	}

	public void setRepa_item(String repa_item) {
		this.repa_item = repa_item;
	}

	public String getRepa_name() {
		lazyLoad();
		return this.repa_name;
	}

	public void setRepa_name(String repa_name) {
		this.repa_name = repa_name;
	}


	
}
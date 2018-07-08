package ddd.simple.entity.task_module;

import ddd.base.annotation.Column;
import ddd.base.persistence.baseEntity.Entity;

import java.util.Date;

@ddd.base.annotation.Entity(label="课题实体",name="DD_task")
public class Task extends Entity {
	private static final long serialVersionUID = 1L;

	@Column(label="课题标题",name="taskTitle",length=250,nullable=false,unique=false,comment="课题标题")
	private String taskTitle;

	@Column(label="课题内容",name="taskContent",length=250,nullable=false,unique=false,comment="课题内容")
	private String taskContent;

	@Column(label="课题目的",name="taskAim",length=250,nullable=false,unique=false,comment="课题目的")
	private String taskAim;

	@Column(label="课题要求",name="taskRequest",length=250,nullable=false,unique=false,comment="课题要求")
	private String taskRequest;

	@Column(label="课题必备知识",name="taskKnowledge",length=250,nullable=true,unique=false,comment="课题必备知识")
	private String taskKnowledge;

	@Column(label="提交形式",name="taskFormal",length=250,nullable=false,unique=false,comment="提交形式")
	private String taskFormal;

	@Column(label="其他",name="taskOther",length=250,nullable=true,unique=false,comment="其他")
	private String taskOther;

	@Column(label="创建时间",name="creatTime",length=250,nullable=false,unique=false,comment="创建时间")
	private Date creatTime;

	@Column(label="更新时间",name="updateTime",length=250,nullable=false,unique=false,comment="更新时间")
	private Date updateTime;

	@Column(label="课题状态",name="state",length=250,nullable=false,unique=false,comment="课题状态")
	private Integer state;
	
	@Column(label="出题老师",name="teaId",length=250,nullable=false,unique=false,comment="出题老师状态")
	private Long teaId;
	
	@Column(label="所属课程设计",name="courseId",length=250,nullable=false,unique=false,comment="所属课程设计")
	private Long courseId;

	public Long getTeaId() {
		return teaId;
	}

	public void setTeaId(Long teaId) {
		this.teaId = teaId;
	}

	public Long getCourseId() {
		return courseId;
	}

	public void setCourseId(Long courseId) {
		this.courseId = courseId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getTaskTitle() {
		lazyLoad();
		return this.taskTitle;
	}

	public void setTaskTitle(String taskTitle) {
		this.taskTitle = taskTitle;
	}

	public String getTaskContent() {
		lazyLoad();
		return this.taskContent;
	}

	public void setTaskContent(String taskContent) {
		this.taskContent = taskContent;
	}

	public String getTaskAim() {
		lazyLoad();
		return this.taskAim;
	}

	public void setTaskAim(String taskAim) {
		this.taskAim = taskAim;
	}

	public String getTaskRequest() {
		lazyLoad();
		return this.taskRequest;
	}

	public void setTaskRequest(String taskRequest) {
		this.taskRequest = taskRequest;
	}

	public String getTaskKnowledge() {
		lazyLoad();
		return this.taskKnowledge;
	}

	public void setTaskKnowledge(String taskKnowledge) {
		this.taskKnowledge = taskKnowledge;
	}

	public String getTaskFormal() {
		lazyLoad();
		return this.taskFormal;
	}

	public void setTaskFormal(String taskFormal) {
		this.taskFormal = taskFormal;
	}

	public String getTaskOther() {
		lazyLoad();
		return this.taskOther;
	}

	public void setTaskOther(String taskOther) {
		this.taskOther = taskOther;
	}

	public Date getCreatTime() {
		lazyLoad();
		return this.creatTime;
	}

	public void setCreatTime(Date creatTime) {
		this.creatTime = creatTime;
	}

	public Date getUpdateTime() {
		lazyLoad();
		return this.updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}


}
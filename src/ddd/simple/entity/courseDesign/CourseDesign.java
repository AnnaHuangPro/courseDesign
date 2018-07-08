package ddd.simple.entity.courseDesign;

import ddd.base.annotation.Column;
import ddd.base.persistence.baseEntity.Entity;

import java.util.Date;

@ddd.base.annotation.Entity(label="课程设计",name="DD_courseDesign")
public class CourseDesign extends Entity {
	private static final long serialVersionUID = 1L;
	
	@Column(label="课程设计名称",name="name",length=250,nullable=false,unique=false,comment="课程设计名称")
	private String name;

	@Column(label="课程设计开始时间",name="startTime",length=250,nullable=false,unique=false,comment="课程设计开始时间")
	private Date startTime;

	@Column(label="课程设计结束时间",name="endTime",length=250,nullable=false,unique=false,comment="课程设计结束时间")
	private Date endTime;

	@Column(label="老师编号",name="teaId",length=250,nullable=false,unique=false,comment="老师编号")
	private Long teaId;

	@Column(label="专业编号",name="majorId",length=250,nullable=false,unique=false,comment="专业编号")
	private Long majorId;
	
	@Column(label="当前学期",name="currentSemester",length=250,nullable=false,unique=false,comment="当前学期")
	private String currentSemester;

	
	public String getCurrentSemester() {
		return currentSemester;
	}

	public void setCurrentSemester(String currentSemester) {
		this.currentSemester = currentSemester;
	}

	public Long getMajorId() {
		return majorId;
	}

	public void setMajorId(Long majorId) {
		this.majorId = majorId;
	}

	public String getName() {
		lazyLoad();
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getStartTime() {
		lazyLoad();
		return this.startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		lazyLoad();
		return this.endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public Long getTeaId() {
		lazyLoad();
		return this.teaId;
	}

	public void setTeaId(Long teaId) {
		this.teaId = teaId;
	}


	
}
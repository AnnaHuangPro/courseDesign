package ddd.simple.entity.courseDesign;

import ddd.base.annotation.Column;
import ddd.base.persistence.baseEntity.Entity;


@ddd.base.annotation.Entity(label="课程设计进度表",name="DD_courseDesignProgress")
public class CourseDesignProgress extends Entity {
	private static final long serialVersionUID = 1L;
	
	@Column(label="课程设计编号",name="courseId",length=250,nullable=false,unique=false,comment="课程设计编号")
	private Long courseId;
	
	@Column(label="课程设计老师",name="teaId",length=250,nullable=false,unique=false,comment="课程设计老师")
	private Long teaId;

	@Column(label="进度阶段",name="progressStage",length=250,nullable=false,unique=false,comment="进度阶段")
	private Integer progressStage;

	@Column(label="进度名称",name="stageName",length=250,nullable=false,unique=false,comment="进度名称")
	private String stageName;

	@Column(label="进度描述",name="stageDescription",length=250,nullable=true,unique=false,comment="进度描述")
	private String stageDescription;
	
	public Long getTeaId() {
		return teaId;
	}

	public void setTeaId(Long teaId) {
		this.teaId = teaId;
	}

	public Long getCourseId() {
		lazyLoad();
		return this.courseId;
	}

	public void setCourseId(Long courseId) {
		this.courseId = courseId;
	}

	public Integer getProgressStage() {
		lazyLoad();
		return this.progressStage;
	}

	public void setProgressStage(Integer progressStage) {
		this.progressStage = progressStage;
	}

	public String getStageName() {
		lazyLoad();
		return this.stageName;
	}

	public void setStageName(String stageName) {
		this.stageName = stageName;
	}

	public String getStageDescription() {
		lazyLoad();
		return this.stageDescription;
	}

	public void setStageDescription(String stageDescription) {
		this.stageDescription = stageDescription;
	}
}
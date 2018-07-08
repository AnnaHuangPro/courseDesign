package ddd.simple.entity.courseDesign;

import ddd.base.annotation.Column;
import ddd.base.persistence.baseEntity.Entity;


@ddd.base.annotation.Entity(label="学生课程设计进度表",name="DD_stuCourseProgress")
public class StuCourseProgress extends Entity {
	private static final long serialVersionUID = 1L;
	
	@Column(label="课程设计名称",name="courseDesignName",length=250,nullable=false,unique=false,comment="课程设计名称")
	private String courseDesignName;

	@Column(label="课程设计题目",name="courseDesignTask",length=250,nullable=false,unique=false,comment="课程设计题目")
	private Long courseDesignTask;

	@Column(label="目前进度阶段",name="progressStage",length=250,nullable=false,unique=false,comment="目前进度阶段")
	private Integer progressStage;

	@Column(label="学生编号",name="stuId",length=250,nullable=false,unique=false,comment="学生编号")
	private Long stuId;

	public Long getCourseDesignTask() {
		return courseDesignTask;
	}

	public void setCourseDesignTask(Long courseDesignTask) {
		this.courseDesignTask = courseDesignTask;
	}

	public String getCourseDesignName() {
		lazyLoad();
		return this.courseDesignName;
	}

	public void setCourseDesignName(String courseDesignName) {
		this.courseDesignName = courseDesignName;
	}

	public Integer getProgressStage() {
		lazyLoad();
		return this.progressStage;
	}

	public void setProgressStage(Integer progressStage) {
		this.progressStage = progressStage;
	}

	public Long getStuId() {
		lazyLoad();
		return this.stuId;
	}

	public void setStuId(Long stuId) {
		this.stuId = stuId;
	}


	
}
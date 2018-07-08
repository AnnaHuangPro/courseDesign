package ddd.simple.entity.graduate;

import ddd.base.annotation.Column;
import ddd.base.persistence.baseEntity.Entity;

import ddd.base.persistence.EntitySet;


@ddd.base.annotation.Entity(label="学生",name="AA_student")
public class Student extends Entity {
	private static final long serialVersionUID = 1L;
	
	@Column(label="姓名",name="name",length=20,nullable=false,unique=false,comment="姓名")
	private String name;

	@Column(label="性别",codeTable="Gender",nullable=true,unique=false,comment="性别")
	private String gender;

	@Column(label="身份证号",name="idCard",length=250,nullable=true,unique=true,comment="身份证号")
	private String idCard;

	@Column(label="选修课程",joinColumn="studentId",joinTableName="AA_TEMP",
			composition=false,nullable=true,unique=false,comment="选修课程")
	private EntitySet<Course> courses;

	@Column(label="课程成绩",joinColumn="studentId",composition=true,
			nullable=true,unique=false,comment="课程成绩")
	private EntitySet<Score> scores;


	public String getName() {
		lazyLoad();
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGender() {
		lazyLoad();
		return this.gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getIdCard() {
		lazyLoad();
		return this.idCard;
	}

	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}

	public EntitySet<Course> getCourses() {
		lazyLoad("courses");
		return this.courses;
	}

	public void setCourses(EntitySet<Course> courses) {
		super.LazyFieidsLoaded.put("courses", true);
		this.courses = courses;
	}

	public EntitySet<Score> getScores() {
		lazyLoad("scores");
		return this.scores;
	}

	public void setScores(EntitySet<Score> scores) {
		super.LazyFieidsLoaded.put("scores", true);
		this.scores = scores;
	}


	
}
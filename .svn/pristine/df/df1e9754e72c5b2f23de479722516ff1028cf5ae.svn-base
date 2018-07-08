package ddd.simple.entity.graduate;

import ddd.base.annotation.Column;
import ddd.base.persistence.baseEntity.Entity;

import ddd.simple.entity.graduate.Course;
import ddd.simple.entity.graduate.Student;

@ddd.base.annotation.Entity(label="成绩",name="AA_score")
public class Score extends Entity {
	private static final long serialVersionUID = 1L;
	
	@Column(label="学生",name="studentId",nullable=true,unique=false,comment="学生")
	private Student student;

	@Column(label="课程",name="courseId",nullable=true,unique=false,comment="课程")
	private Course course;

	@Column(label="成绩",name="score",length=250,nullable=true,unique=false,comment="成绩")
	private String Score;


	public Student getStudent() {
		lazyLoad();
		return this.student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public Course getCourse() {
		lazyLoad();
		return this.course;
	}

	public void setCourse(Course course) {
		this.course = course;
	}

	public String getScore() {
		lazyLoad();
		return this.Score;
	}

	public void setScore(String Score) {
		this.Score = Score;
	}


	
}
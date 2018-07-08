package ddd.simple.service.teacher_module;

import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseServiceInterface;
import ddd.simple.entity.teacher_module.Teacher;

public interface TeacherService extends BaseServiceInterface {
	public Teacher saveTeacher(Teacher teacher) ;
	
	public int deleteTeacher(Long teacherId) ;
	
	public Teacher updateTeacher(Teacher teacher) ;
	
	public Teacher findTeacherById(Long teacherId) ;
	
	public Teacher findTeacherByOperator(Long operatorId);
	
	public EntitySet<Teacher> findAllTeacher() ;
 
}
package ddd.simple.dao.teacher_module;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDaoInterface;
import ddd.simple.entity.teacher_module.Teacher;

public interface TeacherDao extends BaseDaoInterface {
	public Teacher saveTeacher(Teacher teacher) throws Exception;
	
	public int deleteTeacher(Long teacherId) throws Exception;
	
	public Teacher updateTeacher(Teacher teacher) throws Exception;

	public Teacher findTeacherByOperator(Long operatorId) throws Exception;

	public Teacher findTeacherById(Long teacherId) throws Exception;
	
	public EntitySet<Teacher> findAllTeacher() throws Exception;
}

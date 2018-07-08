package ddd.simple.dao.teacher_module.impl;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;
import org.springframework.stereotype.Service;
import ddd.simple.entity.teacher_module.Teacher;
import ddd.simple.dao.teacher_module.TeacherDao;

@Service
public class TeacherDaoBean extends BaseDao implements TeacherDao {
	@Override
	public Teacher saveTeacher(Teacher teacher)  throws Exception {
		return this.save(teacher);
	}

	@Override
	public int deleteTeacher(Long teacherId)  throws Exception {
		return this.deleteById(teacherId,Teacher.class);
	}

	@Override
	public Teacher updateTeacher(Teacher teacher)  throws Exception {
		return this.update(teacher);
	}

	@Override
	public Teacher findTeacherById(Long teacherId)  throws Exception {
		return this.query(teacherId, Teacher.class);
	}

	@Override
	public Teacher findTeacherByOperator(Long operatorId)  throws Exception {
		System.out.println("------------------------------------------------------   "+ operatorId);
		Teacher teacher = this.queryOne("operatorId = "+operatorId, Teacher.class);
		return teacher;
	}
	
	@Override
	public EntitySet<Teacher> findAllTeacher() throws Exception {
		return this.query("1=1",Teacher.class);
	}
}

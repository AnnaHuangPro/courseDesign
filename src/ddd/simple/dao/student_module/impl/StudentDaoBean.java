package ddd.simple.dao.student_module.impl;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;
import org.springframework.stereotype.Service;
import ddd.simple.entity.student_module.Student;
import ddd.simple.dao.student_module.StudentDao;

@Service
public class StudentDaoBean extends BaseDao implements StudentDao {
	@Override
	public Student saveStudent(Student student)  throws Exception {
		return this.save(student);
	}

	@Override
	public int deleteStudent(Long studentId)  throws Exception {
		return this.deleteById(studentId,Student.class);
	}

	@Override
	public Student updateStudent(Student student)  throws Exception {
		return this.update(student);
	}

	@Override
	public Student findStudentByOperator(Long operatorId)  throws Exception {
		return this.queryOne("operatorId = "+operatorId, Student.class);
	}

	@Override
	public Student findStudentById(Long studentId)  throws Exception {
		return this.query(studentId, Student.class);
	}
	
	@Override
	public EntitySet<Student> findAllStudent() throws Exception {
		return this.query("1=1",Student.class);
	}
}

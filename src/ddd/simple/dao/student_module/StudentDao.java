package ddd.simple.dao.student_module;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDaoInterface;
import ddd.simple.entity.student_module.Student;

public interface StudentDao extends BaseDaoInterface {
	public Student saveStudent(Student student) throws Exception;
	
	public int deleteStudent(Long studentId) throws Exception;
	
	public Student updateStudent(Student student) throws Exception;

	public Student findStudentByOperator(Long operatorId)  throws Exception;

	public Student findStudentById(Long studentId) throws Exception;
	
	public EntitySet<Student> findAllStudent() throws Exception;
}

package ddd.simple.service.student_module;

import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseServiceInterface;
import ddd.simple.entity.student_module.Student;

public interface StudentService extends BaseServiceInterface {
	public Student saveStudent(Student student) ;
	
	public int deleteStudent(Long studentId) ;
	
	public int chooseTask(Long taskId , Long stuId);
	
	public Student updateStudent(Student student) ;
	
	public Student findStudentById(Long studentId) ;
	
	public Student findStudentByOperator(Long operatorId);
	
	public EntitySet<Student> findAllStudent() ;
 
}
package ddd.simple.action.student_module;

import javax.annotation.Resource;
import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.entity.student_module.Student;
import ddd.simple.service.student_module.StudentService;

@Action
@RequestMapping("/DD/Student")
@Controller
public class StudentAction {
	@Resource(name="studentServiceBean")
	private StudentService studentService;
	
	public Student saveStudent(Student student) {
		try {
			Student saveStudent = this.studentService.saveStudent(student);
			return saveStudent;
		} catch (DDDException e) {
			throw e;
		}
	}

	public int deleteStudent(Long studentId) {
		
		try {
			return this.studentService.deleteStudent(studentId);
		} catch (DDDException e) {
			throw e;
		}
		
	}

	public Student updateStudent(Student student) {
		try {
			Student updateStudent = this.studentService.updateStudent(student);
			return updateStudent;
		} catch (DDDException e) {
			throw e;
		}
	}

	public Student findStudentById(Long studentId) {
		try {
			Student findStudent = this.studentService.findStudentById(studentId);
			return  findStudent;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public int chooseTask(Long taskId , Long stuId) {
		try {
			return  this.studentService.chooseTask(taskId,stuId);
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public EntitySet<Student > findAllStudent() {
		try {
			EntitySet<Student > allStudent = this.studentService.findAllStudent();
			return allStudent;
		} catch (DDDException e) {
			throw e;
		}
	}

}
package ddd.simple.action.teacher_module;

import javax.annotation.Resource;
import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.entity.teacher_module.Teacher;
import ddd.simple.service.teacher_module.TeacherService;

@Action
@RequestMapping("/DD/Teacher")
@Controller
public class TeacherAction {
	@Resource(name="teacherServiceBean")
	private TeacherService teacherService;
	
	public Teacher saveTeacher(Teacher teacher) {
		try {
			Teacher saveTeacher = this.teacherService.saveTeacher(teacher);
			return saveTeacher;
		} catch (DDDException e) {
			throw e;
		}
	}

	public int deleteTeacher(Long teacherId) {
		
		try {
			return this.teacherService.deleteTeacher(teacherId);
		} catch (DDDException e) {
			throw e;
		}
		
	}

	public Teacher updateTeacher(Teacher teacher) {
		try {
			Teacher updateTeacher = this.teacherService.updateTeacher(teacher);
			return updateTeacher;
		} catch (DDDException e) {
			throw e;
		}
	}

	public Teacher findTeacherById(Long teacherId) {
		try {
			Teacher findTeacher = this.teacherService.findTeacherById(teacherId);
			return  findTeacher;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public EntitySet<Teacher > findAllTeacher() {
		try {
			EntitySet<Teacher > allTeacher = this.teacherService.findAllTeacher();
			return allTeacher;
		} catch (DDDException e) {
			throw e;
		}
	}

}
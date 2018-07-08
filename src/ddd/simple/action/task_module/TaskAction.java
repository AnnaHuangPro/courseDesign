package ddd.simple.action.task_module;

import javax.annotation.Resource;
import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.entity.task_module.Task;
import ddd.simple.service.task_module.TaskService;

@Action
@RequestMapping("/DD/Task")
@Controller
public class TaskAction {
	@Resource(name="taskServiceBean")
	private TaskService taskService;
	
	public Task saveTask(Task task) {
		try {
			Task saveTask = this.taskService.saveTask(task);
			return saveTask;
		} catch (DDDException e) {
			throw e;
		}
	}

	public int deleteTask(Long taskId) {
		
		try {
			return this.taskService.deleteTask(taskId);
		} catch (DDDException e) {
			throw e;
		}
		
	}

	public Task updateTask(Task task) {
		try {
			Task updateTask = this.taskService.updateTask(task);
			return updateTask;
		} catch (DDDException e) {
			throw e;
		}
	}

	public Task findTaskById(Long taskId) {
		try {
			Task findTask = this.taskService.findTaskById(taskId);
			return  findTask;
		} catch (DDDException e) {
			throw e;
		}
	}
	public EntitySet<Task> findAllByTeacherId(Long teacherId,Long courseId){
		return this.taskService.findAllByTeacherId(teacherId,courseId);
	}
	
	public EntitySet<Task> findAllTask() {
		try {
			EntitySet<Task > allTask = this.taskService.findAllTask();
			return allTask;
		} catch (DDDException e) {
			throw e;
		}
	}

}
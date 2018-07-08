package ddd.simple.service.task_module;

import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseServiceInterface;
import ddd.simple.entity.task_module.Task;

public interface TaskService extends BaseServiceInterface {
	public Task saveTask(Task task) ;
	
	public int deleteTask(Long taskId) ;
	
	public Task updateTask(Task task) ;
	
	public Task findTaskById(Long taskId) ;
	
	public EntitySet<Task> findAllByTeacherId(Long teacherId,Long courseId);
		
	public EntitySet<Task> findAllTask() ;
 
}
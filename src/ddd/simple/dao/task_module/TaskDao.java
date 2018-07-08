package ddd.simple.dao.task_module;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDaoInterface;
import ddd.simple.entity.task_module.Task;

public interface TaskDao extends BaseDaoInterface {
	public Task saveTask(Task task) throws Exception;
	
	public int deleteTask(Long taskId) throws Exception;
	
	public Task updateTask(Task task) throws Exception;
	
	public Task findTaskById(Long taskId) throws Exception;
	
	public EntitySet<Task> findAllByTeacherId(Long teacherId,Long courseId) throws Exception;
	
	public EntitySet<Task> findAllTask() throws Exception;
}

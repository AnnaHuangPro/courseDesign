package ddd.simple.dao.task_module.impl;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;
import org.springframework.stereotype.Service;
import ddd.simple.entity.task_module.Task;
import ddd.simple.dao.task_module.TaskDao;

@Service
public class TaskDaoBean extends BaseDao implements TaskDao {
	@Override
	public Task saveTask(Task task)  throws Exception {
		return this.save(task);
	}

	@Override
	public int deleteTask(Long taskId)  throws Exception {
		return this.deleteById(taskId,Task.class);
	}

	@Override
	public Task updateTask(Task task)  throws Exception {
		return this.update(task);
	}

	@Override
	public Task findTaskById(Long taskId)  throws Exception {
		return this.query(taskId, Task.class);
	}
	
	@Override
	public EntitySet<Task> findAllByTeacherId(Long teacherId,Long courseId) throws Exception{
		return this.query("teaId="+teacherId+" and courseId="+courseId,Task.class);
	}
	
	@Override
	public EntitySet<Task> findAllTask() throws Exception {
		return this.query("1 = 1",Task.class);
	}
}

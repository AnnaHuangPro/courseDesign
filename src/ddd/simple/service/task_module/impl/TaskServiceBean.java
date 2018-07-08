package ddd.simple.service.task_module.impl;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseService;
import ddd.simple.entity.task_module.Task;
import ddd.simple.dao.task_module.TaskDao;
import ddd.simple.service.task_module.TaskService;

import java.util.Date;

@Service
public class TaskServiceBean extends BaseService implements TaskService {
	@Resource(name="taskDaoBean")
	private TaskDao taskDao;
	
	@Override
	public Task saveTask(Task task) {
		try {
			task.setCreatTime(new Date());
			task.setUpdateTime(new Date());
			task.setState("待选");
			return this.taskDao.saveTask(task);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveTask", e.getMessage(), e);
		}
	}

	@Override
	public int deleteTask(Long taskId) {
		try {
			return this.taskDao.deleteTask(taskId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteTask", e.getMessage(), e);
		}
		
	}

	@Override
	public Task updateTask(Task task) {
		try {
			return this.taskDao.updateTask(task);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateTask", e.getMessage(), e);
		}
	}

	@Override
	public Task findTaskById(Long taskId) {
		try {
			return this.taskDao.findTaskById(taskId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findTaskById", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<Task> findAllByTeacherId(Long teacherId,Long courseId){
		try {
			return this.taskDao.findAllByTeacherId(teacherId,courseId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllByTeacherId", e.getMessage(), e);
		}
		
	}
	@Override
	public EntitySet<Task> findAllTask() {
		try {
			return this.taskDao.findAllTask();
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllTask", e.getMessage(), e);
		}
	}

}

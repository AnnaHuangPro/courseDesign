package ddd.simple.service.student_module.impl;

import java.util.Date;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.dao.organization.EmployeeDao;
import ddd.simple.dao.permission.OperatorAndRoleDao;
import ddd.simple.dao.permission.OperatorDao;
import ddd.simple.dao.permission.RoleDao;
import ddd.simple.dao.student_module.StudentDao;
import ddd.simple.dao.task_module.TaskDao;
import ddd.simple.entity.organization.Employee;
import ddd.simple.entity.permission.Operator;
import ddd.simple.entity.permission.OperatorAndRole;
import ddd.simple.entity.permission.Role;
import ddd.simple.entity.student_module.Student;
import ddd.simple.entity.task_module.Task;
import ddd.simple.service.base.BaseService;
import ddd.simple.service.student_module.StudentService;

@Service
public class StudentServiceBean extends BaseService implements StudentService {
	@Resource(name="studentDaoBean")
	private StudentDao studentDao;

	@Resource(name="employeeDaoBean")
	private EmployeeDao employeeDao;

	@Resource(name="operatorDaoBean")
	private OperatorDao operatorDao;

	@Resource(name="roleDaoBean")
	private RoleDao roleDao;
	
	@Resource(name="taskDaoBean")
	private TaskDao taskdao;

	@Resource(name="operatorAndRoleDaoBean")
	private OperatorAndRoleDao operatorAndRoleDao;

	@Override
	public Student saveStudent(Student student) {
		try {
			student.setCreatTime(new Date());
			student.setUpdateTime(new Date());
			student.setState("正常");
			return student = assignationOperatorRoleEmploee(student);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveStudent", e.getMessage(), e);
		}
	}

	public Student assignationOperatorRoleEmploee(Student student) throws Exception {

		Employee employee = new Employee();
		employee.setName(student.getStuRealName());
		employee.setCode(student.getStuName());
		employee.setRemark("student");
		this.employeeDao.saveEmployee(employee);

		Operator operator = new Operator();
		operator.setEmployee(employee);
		operator.setName(student.getStuRealName());
		operator.setCode(student.getStuName());
		operator.setPassWord("e10adc3949ba59abbe56e057f20f883e");
		this.operatorDao.saveOperator(operator);

		OperatorAndRole operatorAndRole = new OperatorAndRole();
		EntitySet<OperatorAndRole> operatorAndRoles = new EntitySet<OperatorAndRole>();
		Role role = roleDao.findRoleByCode("student");
		operatorAndRole.setOperator(operator);
		operatorAndRole.setOrganization(student.getOrganization());
		operatorAndRole.setRole(role);
		operatorAndRoles.add(operatorAndRole);
		this.operatorAndRoleDao.saveOperatorAndRole(operatorAndRoles);

		student.setOperatorId(operator.getEId());
		studentDao.saveStudent(student);

		return student;
	}

	@Override
	public int deleteStudent(Long studentId) {
		try {
			releaseOperatorRoleEmploee(studentId);
			return this.studentDao.deleteStudent(studentId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteStudent", e.getMessage(), e);
		}
	}

	public void releaseOperatorRoleEmploee(Long studentId) throws Exception {
		Student student = studentDao.findStudentById(studentId);
		Long operatorId = student.getOperatorId();
		Operator operator = operatorDao.findOperatorById(operatorId);
		operatorDao.deleteOperator(operatorId);
		Employee employee = operator.getEmployee();
		employeeDao.deleteEmployee(employee.getEId());
	}

	@Override
	public Student updateStudent(Student student) {
		try {
			return this.studentDao.updateStudent(student);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateStudent", e.getMessage(), e);
		}
	}
	
	@Override
	public int chooseTask(Long taskId , Long stuId){
		try {
				Student student = findStudentById(stuId);
				student.setTaskId(taskId);
				student = updateStudent(student);
				Task task = taskdao.findTaskById(taskId);
				int state = task.getState();
				state = state+1;
				task.setState(state);
				task = taskdao.updateTask(task);
			if(student != null && task != null){
				return 1;
			}else{
				return 0;
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("chooseTask", e.getMessage(), e);
		}
	}

	@Override
	public Student findStudentById(Long studentId) {
		try {
			return this.studentDao.findStudentById(studentId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findStudentById", e.getMessage(), e);
		}
	}
	
	public Student findStudentByOperator(Long operatorId) {
		try {
			return this.studentDao.findStudentByOperator(operatorId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findStudentById", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<Student> findAllStudent() {
		try {
			return this.studentDao.findAllStudent();
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllStudent", e.getMessage(), e);
		}
	}

}

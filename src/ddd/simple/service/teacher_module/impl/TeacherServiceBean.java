package ddd.simple.service.teacher_module.impl;

import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.dao.organization.EmployeeDao;
import ddd.simple.dao.organization.OrganizationDao;
import ddd.simple.dao.permission.OperatorAndRoleDao;
import ddd.simple.dao.permission.OperatorDao;
import ddd.simple.dao.teacher_module.TeacherDao;
import ddd.simple.entity.organization.Employee;
import ddd.simple.entity.permission.Operator;
import ddd.simple.entity.permission.OperatorAndRole;
import ddd.simple.entity.permission.Role;
import ddd.simple.entity.teacher_module.Teacher;
import ddd.simple.service.base.BaseService;
import ddd.simple.service.permission.impl.RoleServiceBean;
import ddd.simple.service.teacher_module.TeacherService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class TeacherServiceBean extends BaseService implements TeacherService {
	@Resource(name="teacherDaoBean")
	private TeacherDao teacherDao;

	@Resource(name="employeeDaoBean")
	private EmployeeDao employeeDao;

	@Resource(name = "operatorDaoBean")
	private OperatorDao operatorDao;

	@Resource(name = "roleServiceBean")
	private RoleServiceBean roleServiceBean;

	@Resource(name = "operatorAndRoleDaoBean")
	private OperatorAndRoleDao operatorAndRoleDao;

	@Resource(name="organizationDaoBean")
	private OrganizationDao organizationDao;

	@Override
	public Teacher saveTeacher(Teacher teacher) {
		try {
			return teacher = assignationOperatorRoleEmploee(teacher);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveTeacher", e.getMessage(), e);
		}
	}

	public Teacher assignationOperatorRoleEmploee(Teacher teacher) throws Exception {

		Employee employee = new Employee();
		employee.setName(teacher.getTeaRealName());
		employee.setCode(teacher.getTeaName());
		employee.setRemark("teacher");
		this.employeeDao.saveEmployee(employee);

		Operator operator = new Operator();
		operator.setEmployee(employee);
		operator.setName(teacher.getTeaRealName());
		operator.setCode(teacher.getTeaName());
		operator.setPassWord("e10adc3949ba59abbe56e057f20f883e");
		this.operatorDao.saveOperator(operator);

		OperatorAndRole operatorAndRole = new OperatorAndRole();
		EntitySet<OperatorAndRole> operatorAndRoles = new EntitySet<OperatorAndRole>();
		Role role = roleServiceBean.findRoleByCode("teacher");
		operatorAndRole.setOperator(operator);
		operatorAndRole.setOrganization(teacher.getTeaOrganization());
		operatorAndRole.setRole(role);
		operatorAndRoles.add(operatorAndRole);
		this.operatorAndRoleDao.saveOperatorAndRole(operatorAndRoles);

		teacher.setOperatorId(operator.getEId());
		teacherDao.saveTeacher(teacher);
		return teacher;
	}

	@Override
	public int deleteTeacher(Long teacherId) {
		try {
			releaseOperatorRoleEmploee(teacherId);
			return this.teacherDao.deleteTeacher(teacherId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteTeacher", e.getMessage(), e);
		}

	}

	public void releaseOperatorRoleEmploee(Long teacherId) throws Exception {
		Teacher teacher = teacherDao.findTeacherById(teacherId);
		Long operatorId = teacher.getOperatorId();
		Operator operator = operatorDao.findOperatorById(operatorId);
		operatorDao.deleteOperator(operatorId);
		Employee employee = operator.getEmployee();
		employeeDao.deleteEmployee(employee.getEId());
	}

	@Override
	public Teacher updateTeacher(Teacher teacher) {
		try {
			return this.teacherDao.updateTeacher(teacher);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateTeacher", e.getMessage(), e);
		}
	}

	@Override
	public Teacher findTeacherById(Long teacherId) {
		try {
			return this.teacherDao.findTeacherById(teacherId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findTeacherById", e.getMessage(), e);
		}
	}
	
	@Override
	public Teacher findTeacherByOperator(Long operatorId){
		try {
			return this.teacherDao.findTeacherByOperator(operatorId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findTeacherByOperator", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<Teacher> findAllTeacher() {
		try {
			return this.teacherDao.findAllTeacher();
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllTeacher", e.getMessage(), e);
		}
	}

}

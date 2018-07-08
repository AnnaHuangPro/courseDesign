package ddd.simple.service.organization.impl;

import javax.annotation.Resource;

import ddd.base.persistence.baseEntity.Entity;
import ddd.simple.dao.permission.OperatorDao;
import ddd.simple.dao.student_module.StudentDao;
import ddd.simple.dao.teacher_module.TeacherDao;
import ddd.simple.entity.permission.Operator;
import ddd.simple.entity.student_module.Student;
import ddd.simple.entity.teacher_module.Teacher;
import org.springframework.stereotype.Service;

import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseService;
import ddd.simple.entity.member.Member;
import ddd.simple.entity.organization.Employee;
import ddd.simple.entity.organization.Organization;
import ddd.simple.dao.organization.EmployeeDao;
import ddd.simple.service.organization.EmployeeService;

@Service
public class EmployeeServiceBean extends BaseService implements EmployeeService
{

	@Resource(name="employeeDaoBean")
	private EmployeeDao employeeDao;
	
	@Resource(name="organizationServiceBean")
	private OrganizationServiceBean organizationService;

	@Resource(name = "operatorDaoBean")
	private OperatorDao operatorDao;

	@Resource(name="teacherDaoBean")
	private TeacherDao teacherDao;

	@Resource(name="studentDaoBean")
	private StudentDao studentDao;

	@Override
	public Employee saveEmployee(Employee employee) 
	{
		try {
			this.doLog(Employee.class, "编码："+employee.getCode()+";姓名"+employee.getName(), "新增");
			return this.employeeDao.saveEmployee(employee);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveEmployee", e.getMessage(), e);
		}
	}

	@Override
	public int deleteEmployee(Long employeeId) {
		try {
			Employee employee=this.employeeDao.findEmployeeById(employeeId);
			this.doLog(Employee.class, "编码："+employee.getCode()+";姓名"+employee.getName(), "删除");
			return this.employeeDao.deleteEmployee(employeeId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteEmployee", e.getMessage(), e);
		}
		
	}

	@Override
	public Employee updateEmployee(Employee employee) {
		try {
			this.doLog(Employee.class, "编码："+employee.getCode()+";姓名"+employee.getName(), "修改");
			return this.employeeDao.updateEmployee(employee);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateEmployee", e.getMessage(), e);
		}
	}

	@Override
	public Entity findPersonalMessageByEidAndRole(Long employeeId, String remark){
		try {
			Operator operator = operatorDao.findOperatorByEmployeeId(employeeId);
			Entity object = null;
			if(remark == null){
				object = findEmployeeById(employeeId);
			}else if(remark.equalsIgnoreCase("teacher")){
				object = findTeacherMessageByEidAndRole(operator);
			}else if(remark.equalsIgnoreCase("student")){
				object = findStudentMessageByEidAndRole(operator);
			}
			return object;
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findPersonalMessageByEidAndRole", e.getMessage(), e);
		}
	}

	public Teacher findTeacherMessageByEidAndRole(Operator operator){
		try {
			Teacher teacher = teacherDao.findTeacherByOperator(operator.getEId());
			teacher.setRemark("teacher");
			return teacher;
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findTeacherMessageByEidAndRole", e.getMessage(), e);
		}
	}

	public Student findStudentMessageByEidAndRole(Operator operator){
		try {
			Student student = studentDao.findStudentByOperator(operator.getEId());
			student.setRemark("student");
			return student;
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findStudentMessageByEidAndRole", e.getMessage(), e);
		}
	}

	@Override
	public Employee findEmployeeById(Long employeeId) {
		try {
			Employee employee = this.employeeDao.findEmployeeById(employeeId);
			if(employee!=null){
				return this.addEmployeeReference(employee);
			}
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findEmployeeById", e.getMessage(), e);
		}
	}
	
	private Employee addEmployeeReference(Employee employee) {
		if(employee.getDepartment()!=null)
		{
			employee.getDepartment().getName();
		}
		if(employee.getOrganization() !=null)
		{
			employee.getOrganization().getName();
			if(employee.getDepartment() != null){
				employee.getDepartment().setOrganization(null);	
			}else{
				//不处理
			}
			
		}
		return employee;
	}

	@Override
	public EntitySet<Employee> findAllEmployee() {
		try{
			return this.employeeDao.findAllEmployee();
		}catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllEmployee", e.getMessage(), e);
		}
	}
	
	/**
	 *member表同步到employee表 
	*/
	@Override
	public Employee memberToEmployee(Member member) {
		Employee employee = new Employee();
		// 先只转换部分字段（member 与 employee 的字段应该一样）
		employee.setCode(member.getOnlyCode());
		employee.setName(member.getName());
		if (member.getDeptid() != null) {
			Organization organization = this.organizationService
					.findOrganizationByCode(member.getDeptid());
			employee.setOrganization(organization);
		}
		employee.setSex(member.getSex());
		return employee;
	}

	@Override
	public Employee memberToEmployeeSave(Member member) {
		Employee employee = this.memberToEmployee(member);
		
		return this.updateEmployee(employee);
	}

	@Override
	public Employee findEmployeeByCode(String code)
	{
		try
		{
			return this.employeeDao.findEmployeeByCode(code);
		} catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException(e.getMessage());
		}
	}
	@Override
	public EntitySet<Employee> findEmployeeByDepartment(Long departmentId){
		try{
			//Long orgId=this.getLoginUser().findCurrentEmployee().getOrganization().getEId();
			return this.employeeDao.findEmployeeByLoginOrg(departmentId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException(e.getMessage());
		}
	}

}

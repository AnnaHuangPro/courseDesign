package ddd.simple.service.organization;

import ddd.base.persistence.EntitySet;
import ddd.base.persistence.baseEntity.Entity;
import ddd.simple.service.base.BaseServiceInterface;
import ddd.simple.entity.member.Member;
import ddd.simple.entity.organization.Department;
import ddd.simple.entity.teacher_module.Teacher;
import ddd.simple.entity.organization.Employee;

public interface EmployeeService extends BaseServiceInterface
{
	public Employee saveEmployee(Employee employee) ;
	
	public int deleteEmployee(Long employeeId) ;
	
	public Employee updateEmployee(Employee employee) ;
	
	public Employee findEmployeeById(Long employeeId) ;

	public Entity findPersonalMessageByEidAndRole(Long employeeId, String career);
	
	public EntitySet<Employee> findAllEmployee() ;
	
	public Employee memberToEmployee(Member member);

	public Employee memberToEmployeeSave(Member member);
	
	public Employee findEmployeeByCode(String code);
	
	public EntitySet<Employee> findEmployeeByDepartment(Long departmentId);
}
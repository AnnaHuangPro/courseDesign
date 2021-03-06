package ddd.simple.action.organization;

import javax.annotation.Resource;

import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;

import ddd.base.persistence.baseEntity.Entity;
import ddd.simple.entity.teacher_module.Teacher;
import org.springframework.stereotype.Controller;

import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.entity.member.Member;
import ddd.simple.entity.organization.Department;
import ddd.simple.entity.organization.Employee;
import ddd.simple.service.organization.EmployeeService;

@Action
@RequestMapping("/Employee")
@Controller
public class EmployeeAction
{
	@Resource(name="employeeServiceBean")
	private EmployeeService employeeService;
	
	public Employee saveEmployee(Employee employee)
	{
		try {
			Employee saveEmployee = this.employeeService.saveEmployee(employee);
			return saveEmployee;
		} catch (DDDException e) {
			throw e;
		}
	}

	public int deleteEmployee(Long employeeId){
		
		try {
			return this.employeeService.deleteEmployee(employeeId);
		} catch (DDDException e) {
			throw e;
		}
		
	}

	public Employee updateEmployee(Employee employee) {
		try {
			Employee updateEmployee = this.employeeService.updateEmployee(employee);
			return updateEmployee;
		} catch (DDDException e) {
			throw e;
		}
	}

	public Employee findEmployeeById(Long employeeId){
		try {
			Employee findEmployee = this.employeeService.findEmployeeById(employeeId);
			return  findEmployee;
		} catch (DDDException e) {
			throw e;
		}
	}

	public Entity findPersonalMessageByEidAndRole(Long employeeId, String career){
		try {
			Entity object = this.employeeService.findPersonalMessageByEidAndRole(employeeId,career);
			return  object;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public EntitySet<Employee> findAllEmployee(){
		try{
			EntitySet<Employee> allEmployee = this.employeeService.findAllEmployee();
			return allEmployee;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public Employee memberToEmployee(Member member) {
		return this.employeeService.memberToEmployee(member);
	}
	
	public Employee memberToEmployeeSave(Member member) {
		try {
			Employee updateEmployee = this.employeeService.memberToEmployeeSave(member);
			return updateEmployee;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public EntitySet<Employee> findEmployeeByDepartment(String departmentId){
		try{
			Long newdepartmentId = Long.parseLong(departmentId);
			EntitySet<Employee> allEmployee = this.employeeService.findEmployeeByDepartment(newdepartmentId);
			return allEmployee;
		} catch (DDDException e) {
			throw e;
		}
	}
}
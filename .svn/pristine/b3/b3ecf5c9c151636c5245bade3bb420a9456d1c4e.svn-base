/**
* @Title: OrgDataInit.java
* @Package ddd.base.dataInit.imp
* @Description: TODO(用一句话描述该文件做什么)
* @author matao@cqrainbowsoft.com
* @date 2016年12月13日 下午2:51:56
* @version V1.0
*/
package ddd.base.dataInit.imp;

import java.io.File;

import org.apache.commons.io.FileUtils;
import org.aspectj.util.FileUtil;
import org.springframework.web.context.ContextLoaderListener;

import com.alibaba.fastjson.JSONObject;

import ddd.base.codegenerator.generator.GenerationParameter;
import ddd.base.dataInit.DataInit;
import ddd.base.exception.DDDException;
import ddd.simple.entity.organization.Department;
import ddd.simple.entity.organization.Employee;
import ddd.simple.entity.organization.Organization;
import ddd.simple.entity.permission.Role;
import ddd.simple.service.organization.DepartmentService;
import ddd.simple.service.organization.EmployeeService;
import ddd.simple.service.organization.OrganizationService;

/**
 * 项目名称：DDD3
 * 类名称：OrgDataInit
 * 类描述：   
 * 创建人：AnotherTen
 * 创建时间：2016年12月13日 下午2:51:56
 * 修改人：胡均
 * 修改时间：2016年12月13日 下午2:51:56
 * 修改备注：   
 * @version 1.0
 * Copyright (c) 2016  DDD
 */
public class OrgDataInit implements DataInit
{

	private String sourcePath = GenerationParameter.DATAINITSOUCE_PATH+"OrgDataInit.json";
	private OrganizationService organizationService = (OrganizationService) ContextLoaderListener.getCurrentWebApplicationContext().getBean("organizationServiceBean");
	private DepartmentService departmentService = (DepartmentService) ContextLoaderListener.getCurrentWebApplicationContext().getBean("departmentServiceBean");
	private EmployeeService employeeService = (EmployeeService) ContextLoaderListener.getCurrentWebApplicationContext().getBean("employeeServiceBean");
	
	private Organization organization;
	private Department department;
	private Employee employee ;
	@Override
	public void init()
	{
	
		// TODO Auto-generated method stub
		try
		{
			
			//String fileContent = FileUtil.readAsString(new File(sourcePath));
			String fileContent = FileUtils.readFileToString(new File(sourcePath), "utf-8");
			if(fileContent == null || "".equals(fileContent)){
				throw new DDDException("初始化组织机构数据错误:"+fileContent+" 文件内容为空");
			}
			JSONObject json = JSONObject.parseObject(fileContent);
			
			organization = JSONObject.parseObject(String.valueOf(json.get("organization")),Organization.class);
			department = JSONObject.parseObject(String.valueOf(json.get("department")),Department.class);
			employee =  JSONObject.parseObject(String.valueOf(json.get("employee")),Employee.class);
			if(organization != null && department != null && employee != null){
				organization = this.organizationService.saveOrganization(organization);
				
				department.setOrganization(organization);
				department = this.departmentService.saveDepartment(department);
				
				employee.setDepartment(department);
				employee.setOrganization(organization);
				employee = this.employeeService.saveEmployee(employee);
			}else{
				//
			}
			
		} catch (Exception e)
		{
			e.printStackTrace();
			System.out.println("初始化组织机构数据错误");
		}
	
	}
	@Override
	public void initParam(Organization organization, Role role,Employee employee)
	{
		//
	}
	@Override
	public Role getRole()
	{
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public Organization getOrganization()
	{
		return this.organization;
	}
	@Override
	public Employee getEmployee()
	{
		return this.employee;
	}
	
}

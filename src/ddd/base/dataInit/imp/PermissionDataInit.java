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
import ddd.base.persistence.EntitySet;
import ddd.simple.entity.organization.Employee;
import ddd.simple.entity.organization.Organization;
import ddd.simple.entity.permission.Operator;
import ddd.simple.entity.permission.Role;
import ddd.simple.service.permission.OperatorService;
import ddd.simple.service.permission.RoleService;

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
public class PermissionDataInit implements DataInit
{

	private String sourcePath = GenerationParameter.DATAINITSOUCE_PATH+"PermissionDataInit.json";
	private RoleService roleService = (RoleService) ContextLoaderListener.getCurrentWebApplicationContext().getBean("roleServiceBean");
	private OperatorService operatorService = (OperatorService) ContextLoaderListener.getCurrentWebApplicationContext().getBean("operatorServiceBean");

	
	private Role role;
	private Operator operator;
	private Organization organization ;//操作员分配角色的单位
	private Employee employee;//操作员对应职员
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
			
			operator = JSONObject.parseObject(String.valueOf(json.get("operator")),Operator.class);
			role = JSONObject.parseObject(String.valueOf(json.get("role")),Role.class);
			if(operator != null && role != null){
				role = this.roleService.saveRole(role);
				
				operator.setEmployee(employee);
				operator = this.operatorService.saveOperator(operator);
				
				EntitySet<Role> roles = new EntitySet<Role>();
				roles.add(role);
				this.operatorService.distributionRole(operator.getEId(), roles, organization.getEId());
				
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
		this.organization = organization;
		this.employee = employee;
	}
	@Override
	public Role getRole()
	{
		return this.role;
	}
	@Override
	public Organization getOrganization()
	{
		return null;
	}
	@Override
	public Employee getEmployee()
	{
		return null;
	}
	
}

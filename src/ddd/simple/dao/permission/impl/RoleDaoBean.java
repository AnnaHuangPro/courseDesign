
package ddd.simple.dao.permission.impl;

import org.springframework.stereotype.Service;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;
import ddd.simple.dao.permission.RoleDao;
import ddd.simple.entity.permission.Permission;
import ddd.simple.entity.permission.Role;

@Service
public class RoleDaoBean extends BaseDao implements RoleDao
{
	
	public Role saveRole(Role role) throws Exception
	{
		return this.save(role);
	}
	
	public int deleteRole(Long roleId) throws Exception
	{
		return this.deleteById(roleId, Role.class);
	}
	
	public Role updateRole(Role role) throws Exception
	{
		return this.update(role);
	}
	
	public Role findRoleById(Long roleId) throws Exception
	{
		return this.query(roleId, Role.class);
	}
	
	public EntitySet<Role> findAllRoles() throws Exception
	{
		return (EntitySet<Role>) this.query("1=1", Role.class);
	}
	
	public EntitySet<Permission> findPermissionByModule(Long moduleId) throws Exception
	{
		String findSql = "moduleId=" + moduleId;
		return (EntitySet<Permission>) this.query(findSql, Permission.class);
	}
	
	public EntitySet<Role> finRoleByEmployeeId(Long employeeId) throws Exception
	{
		String sql = "select * from role r where r.eid in "
				+ "(select distinct oar.roleid from OperatorAndRole oar where oar.operatorid in "
				+ "(select o.eid from operator o left join employee e on o.employeeId = e.eid where e.eid =" + employeeId + "))";
		return this.queryBySql(sql, Role.class);
	}
	
	@Override
	public Role findRoleByCode(String code) throws Exception
	{
		String where = "code = '" + code + "'";
		EntitySet<Role> roles = this.query(where, Role.class);
		if (!roles.isEmpty())
		{
			return roles.iterator().next();
		} else
		{
			return null;
		}
	}

	@Override
	public EntitySet<Role> findRolesByRoleType(String roleType) throws Exception {
		String sql = "select * from role r where r.roleType = '" + roleType + "'";
		return this.queryBySql(sql, Role.class);
	}

	@Override
	public EntitySet<Role> findRoleByOperatorId(Long operatorId) throws Exception {
		String sql = "select * from role r where r.eid in "
				+ "(select distinct oar.roleid from OperatorAndRole oar where oar.operatorid ='" + operatorId +"')";
		return this.queryBySql(sql, Role.class);
	}
}

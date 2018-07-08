package ddd.simple.dao.organization.impl;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;

import org.springframework.stereotype.Service;

import ddd.simple.entity.memberProjection.MemberProjection;
import ddd.simple.entity.organization.Organization;
import ddd.simple.dao.organization.OrganizationDao;

@Service
public class OrganizationDaoBean extends BaseDao implements OrganizationDao
{
	@Override
	public Organization saveOrganization(Organization organization)  throws Exception{
		return this.save(organization);
	}

	@Override
	public int deleteOrganization(Long organizationId)  throws Exception{
		return this.deleteById(organizationId,Organization.class);
	}

	@Override
	public Organization updateOrganization(Organization organization)  throws Exception{
		return this.update(organization);
	}

	@Override
	public Organization findOrganizationById(Long organizationId)  throws Exception{
		return this.query(organizationId, Organization.class);
	}
	
	@Override
	public EntitySet<Organization> findAllOrganization() throws Exception {
		return this.query("",Organization.class);
	}

	@Override
	public EntitySet<Organization> findOrganizationByCode(String code) throws Exception {
		String where = "code = '"+code+"'";
		return this.query(where,Organization.class);
	}

	@Override
	public Organization findOrganizationByUserKey(String userKey) throws Exception {
		String sql="select * from organization org "
				+ "left join employee emp  on  emp.organizationId=org.EId "
				+ "where emp.userKey='"+userKey+"'";
		EntitySet<Organization> organizations=this.queryBySql(sql, Organization.class);
		
		if(organizations.size() > 0){
			return (Organization) organizations.toArray()[0];
		}
		return null;
	}

	@Override
	public Organization findOrganizationByName(String organizationName)
			throws Exception {
		String where = "name='" + organizationName + "'";
		return this.queryOne(where, Organization.class);
	}
}

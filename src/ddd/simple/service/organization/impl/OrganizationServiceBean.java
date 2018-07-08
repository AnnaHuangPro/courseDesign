package ddd.simple.service.organization.impl;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.base.persistence.SessionFactory;
import ddd.simple.dao.organization.OrganizationDao;
import ddd.simple.entity.organization.Organization;
import ddd.simple.service.base.BaseService;
import ddd.simple.service.organization.OrganizationService;
import ddd.simple.service.workflow.WorkFlowEngineService;

@Service
public class OrganizationServiceBean extends BaseService implements OrganizationService
{

	@Resource(name="organizationDaoBean")
	private OrganizationDao organizationDao;
	
	
	@Override
	public Organization saveOrganization(Organization organization) 
	{
		try {
			this.doLog(Organization.class, "编码："+organization.getCode()+";单位名称："+organization.getName(), "新增");
			return this.organizationDao.saveOrganization(organization);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveOrganization", e.getMessage(), e);
		}
	}

	@Override
	public int deleteOrganization(Long organizationId) {
		try {
			Organization organization=this.organizationDao.findOrganizationById(organizationId);
			this.doLog(Organization.class, "编码："+organization.getCode()+";单位名称："+organization.getName(), "删除");
			return this.organizationDao.deleteOrganization(organizationId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteOrganization", e.getMessage(), e);
		}
		
	}

	@Override
	public Organization updateOrganization(Organization organization) {
		try {
			this.doLog(Organization.class, "编码："+organization.getCode()+";单位名称："+organization.getName(), "修改");
			return this.organizationDao.updateOrganization(organization);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateOrganization", e.getMessage(), e);
		}
	}

	@Override
	public Organization findOrganizationById(Long organizationId) {
		try {
			return this.organizationDao.findOrganizationById(organizationId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findOrganizationById", e.getMessage(), e);
		}
	}
	
	@Override
	public Organization findOrganizationByName(String organizationName) {
		try {
			return this.organizationDao.findOrganizationByName(organizationName);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findOrganizationByName", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<Organization> findAllOrganization() {
		try{
			return this.organizationDao.findAllOrganization();
		}catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllOrganization", e.getMessage(), e);
		}
	}
	

	@Override
	public Organization findOrganizationByCode(String code) {
		try {
			EntitySet<Organization> oraganizations = this.organizationDao.findOrganizationByCode(code);
			for (Organization oraganization:oraganizations) {
				if (oraganization!=null) {
					return oraganization;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findOrganizationByCode", e.getMessage(), e);
		}
		return null;
	}

}

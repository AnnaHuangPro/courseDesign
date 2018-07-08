package ddd.simple.service.organization.impl;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseService;
import ddd.simple.entity.organization.Department;
import ddd.simple.dao.organization.DepartmentDao;
import ddd.simple.service.organization.DepartmentService;

@Service
public class DepartmentServiceBean extends BaseService implements DepartmentService
{

	@Resource(name="departmentDaoBean")
	private DepartmentDao departmentDao;
	
	@Override
	public Department saveDepartment(Department department) 
	{
		try {
			this.doLog(Department.class, "编码："+department.getCode()+";名称："+department.getName(), "新增");
			return this.departmentDao.saveDepartment(department);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveDepartment", e.getMessage(), e);
		}
	}

	@Override
	public int deleteDepartment(Long departmentId) {
		try {
			Department department=this.departmentDao.findDepartmentById(departmentId);
			this.doLog(Department.class, "编码："+department.getCode()+";名称："+department.getName(), "删除");
			return this.departmentDao.deleteDepartment(departmentId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteDepartment", e.getMessage(), e);
		}
		
	}

	@Override
	public Department updateDepartment(Department department) {
		try {
			this.doLog(Department.class, "编码："+department.getCode()+";名称："+department.getName(), "修改");
			return this.departmentDao.updateDepartment(department);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateDepartment", e.getMessage(), e);
		}
	}

	@Override
	public Department findDepartmentById(Long departmentId) {
		try {
			return this.departmentDao.findDepartmentById(departmentId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findDepartmentById", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<Department> findAllDepartment() {
		try{
			return this.departmentDao.findAllDepartment();
		}catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllDepartment", e.getMessage(), e);
		}
	}

	@Override
	public EntitySet<Department> findDepartmentByLoginOrg() {
		try{
			Long orgId=this.getLoginUser().findCurrentEmployee().getOrganization().getEId();
			return this.departmentDao.findDepartmentByLoginOrg(orgId);
		}catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findDepartmentByLoginOrg", e.getMessage(), e);
		}
	}

}

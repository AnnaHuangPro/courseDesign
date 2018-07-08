package ddd.simple.service.workflow.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ddd.base.exception.DDDException;
import ddd.simple.dao.workflow.CommonFindTaskAssigneeDao;
import ddd.simple.entity.organization.Organization;
import ddd.simple.service.base.BaseService;
import ddd.simple.service.organization.OrganizationService;
import ddd.simple.service.workflow.ICommonFindTaskAssigneeService;

@Service
@Transactional
public class CommonFindTaskAssigneeServiceBean extends BaseService implements ICommonFindTaskAssigneeService {

	@Resource(name = "commonFindTaskAssigneeDaoBean")
	private CommonFindTaskAssigneeDao commonFindTaskAssigneeDao;

	@Resource(name = "organizationServiceBean")
	private OrganizationService organizationService;

	@Override
	public Collection<String> 根据权限点和所属机构查找(String 权限点名称, String 机构名称) {
		Collection<String> operators = this.commonFindTaskAssigneeDao.根据权限点和所属机构查找(权限点名称, 机构名称);
		if (operators == null || operators.size() == 0) {
			throw new DDDException("没有找到机构名称为 " + 机构名称 + " 的机构中有权限点为 " + 权限点名称 + "的人员");
		}
		return operators;
	}

	@Override
	public Collection<String> 根据权限点查找(String 权限点名称) {
		Collection<String> operators = this.commonFindTaskAssigneeDao.根据权限点查找(权限点名称);
		if (operators == null || operators.size() == 0) {
			throw new DDDException("没有有权限点为 " + 权限点名称 + "的人员");
		}
		return operators;
	}

	// 后台查询
	@Override
	public Collection<String> 根据角色和所属机构查找(String 角色名称, Long 机构Id) {
		Collection<String> operators = this.commonFindTaskAssigneeDao.根据角色和所属机构查找(角色名称, 机构Id);

		if (operators == null || operators.size() == 0) {
			throw new DDDException("审批单位未分配【" + 角色名称 + "】");
		}
		return operators;
	}

	@Override
	public Collection<String> 根据角色和所属机构名称查找(String 角色名称, String 机构名称) {
		Collection<String> operators = this.commonFindTaskAssigneeDao.根据角色和所属机构名称查找(角色名称, 机构名称);
		if (operators == null || operators.size() == 0) {
			throw new DDDException("审批单位未分配【" + 角色名称 + "】");
		}
		return operators;
	}

/*	//前台查询
	@Override
	public Collection<String> 根据会员组名称和所属机构查找(String 会员组名称,Long 机构Id)
	{
		Collection<String> members = this.commonFindTaskAssigneeDao.根据会员组名称和所属机构查找(会员组名称, 机构Id);

		if(members == null || members.size() == 0)
		{
			throw new DDDException("审批单位没有【"+ 会员组名称 +"】");
		}
		return members;
	}
	
	@Override
	public Collection<String> 根据会员组名称和所属机构编码查找(String 会员组名称,String 机构Code)
	{
		Collection<String> members = this.commonFindTaskAssigneeDao.根据会员组名称和所属机构编码查找(会员组名称, 机构Code);

		if(members == null || members.size() == 0)
		{
			throw new DDDException("审批单位没有【"+ 会员组名称 +"】");
		}
		return members;
	}*/
	
/*	@Override
	public Collection<String> 根据会员组Id查找(String 会员组Id)
	{
		Collection<String> members = this.commonFindTaskAssigneeDao.根据会员组Id查找(会员组Id);



		if(members == null || members.size() == 0)
		{
			throw new DDDException("Id为" + 会员组Id + "的会员组没有分配人员!");

		}
		return members;
	}*/

	@Override
	public List<String> 根据角色查找(String 角色名称) {
		List<String> operators = this.commonFindTaskAssigneeDao.根据角色查找(角色名称);
		if (operators == null || operators.size() == 0) {
			throw new DDDException("没有找到在角色名称为" + 角色名称 + "的人");
		}
		return operators;
	}

	@SuppressWarnings("null")
	@Override
	public List<String> 根据角色查找(String 角色名称,String 需删除的Code) {
		List<String> operators = new ArrayList<String>();
		//系统参数
		List<String> admin = this.commonFindTaskAssigneeDao.根据角色查找("管理员");
		List<String> editor = this.commonFindTaskAssigneeDao.根据角色查找("编辑员");
		List<String> currentEidtor = this.commonFindTaskAssigneeDao.根据角色查找("值班编辑");
		List<String> superAdmin = this.commonFindTaskAssigneeDao.根据角色查找("超级管理员");
		if (admin != null) {
			operators.addAll(admin);
		}
		if (editor != null) {
			
			operators.addAll(editor);
		}
		if (currentEidtor != null) {
			operators.addAll(currentEidtor);
		}
		if (superAdmin != null) {
			operators.addAll(superAdmin);
		}

		if (operators == null || operators.size() == 0) {
			throw new DDDException("没有找到在角色名称为" + 角色名称 + "的人");
		}
		
		if ((角色名称.indexOf("管理员") < 0 || 角色名称.indexOf("超级管理员") < 0 ) && (角色名称.indexOf("编辑员") >= 0 || 角色名称.indexOf("值班编辑") >= 0)) {//编辑员和值班编辑不能审自己发的稿件
			if (operators.contains(需删除的Code)) {
				operators.remove(需删除的Code);
			}
		}
		return operators;
	}
	
	@Override
	public Collection<String> 根据部门和所属机构查找(String 部门名称, String 机构名称) {
		Collection<String> operators = this.commonFindTaskAssigneeDao.根据部门和所属机构查找(部门名称, 机构名称);
		if (operators == null || operators.size() == 0) {
			throw new DDDException("没有找到在机构" + 机构名称 + "中部门" + 部门名称 + "的人");
		}
		return operators;
	}

	@Override
	public Collection<String> 根据部门查找(String 部门名称) {
		Collection<String> operators = this.commonFindTaskAssigneeDao.根据部门查找(部门名称);
		if (operators == null || operators.size() == 0) {
			throw new DDDException("没有找到部门" + 部门名称 + "下面的人");
		}
		return operators;
	}

	public Collection<String> 根据人员查找(String 人员Id) {
		Collection<String> operators = this.commonFindTaskAssigneeDao.根据人员查找(人员Id);
		if (operators == null || operators.size() == 0) {
			throw new DDDException("没有找到人员ID:" + 人员Id + "的人");
		}
		return operators;
	}

	@Override
	public Collection<String> 根据角色名和组Id及权限点查找(String 角色名, Long 组ID, String 权限点名称) {
		// 前台 根据组id和权限点查找
		List<String> op = new ArrayList<String>();
		
		List<String> members = this.根据组Id及权限点查找(组ID, 权限点名称);
		if (members.size() > 0) {
			op.addAll(members);
		}
		// 后台根据单位名称和权限点查找
		List<String> operators = this.根据角色查找(角色名);
		if (operators.size() > 0) {
			op.addAll(operators);
		}
		if (op.isEmpty()) {
			throw new DDDException("没有找到相应的人");
		}
		return op;
	}

	@Override
	public List<String> 根据组Id及权限点查找(Long 组ID, String 权限点名称) {
		
		List<String> members = this.commonFindTaskAssigneeDao.根据组Id及权限点查找(组ID, 权限点名称);
		if (members == null || members.size() == 0) {
			throw new DDDException("审批单位未分配【" + 权限点名称 + "】");
		}

		return members;
	}
	
	@Override
	public Collection<String> 根据组Id查找(Long 组Id) {
		
		Collection<String> members = this.commonFindTaskAssigneeDao.根据组Id查找(组Id);
		if (members == null || members.size() == 0) {
			throw new DDDException("审批单位未分配【" + 组Id + "】");
		}

		return members;
	}

	/** 
	* @author 林园
	* @date 2016年7月29日 上午11:32:58 
	* @Title: 根据单位Id和组名查找、根据单位名称和组名查找、根据单位Id和角色名查找、
	* 		     根据组Id和角色名查找、根据单位Id和会员类型名查找、根据组Id和会员类型名查找
	* @Description: 这些方法用来前台查询人员
	* @param @param
	* @param @param
	* @param @return    设定文件 
	* @throws 
	*/
	@Override
	public Collection<String> 根据单位Id和组名查找(Long 单位Id, String 组名) {
		
		Collection<String> members = this.commonFindTaskAssigneeDao.根据单位Id和组名查找(单位Id, 组名);
		
		if (members == null || members.size() == 0) {
			throw new DDDException("单位Id或组名不存在！");
		}

		return members;
	}

	@Override
	public Collection<String> 根据单位名称和组名查找(String 单位名称, String 组名) {
		Collection<String> members = this.commonFindTaskAssigneeDao.根据单位名称和组名查找(单位名称, 组名);
		
		if (members == null || members.size() == 0) {
			throw new DDDException("单位名称或组名不存在！");
		}

		return members;
	}

	@Override
	public Collection<String> 根据单位Id和角色名查找(Long 单位Id, String 角色名) {
		
		Collection<String> members = this.commonFindTaskAssigneeDao.根据单位Id和角色名查找(单位Id, 角色名);
		
		if (members == null || members.size() == 0) {
			throw new DDDException("审批单位未分配【" + 单位Id + "】");
		}

		return members;
	}

	@Override
	public Collection<String> 根据组Id和角色名查找(Long 组Id, String 角色名) {
		
		Collection<String> members = this.commonFindTaskAssigneeDao.根据组Id和角色名查找(组Id, 角色名);
		
		if (members == null || members.size() == 0) {
			throw new DDDException("组Id或角色名不存在！");
		}

		return members;
	}

	@Override
	public Collection<String> 根据单位Id和会员类型名查找(Long 单位Id, String 会员类型名) {

		Collection<String> members = this.commonFindTaskAssigneeDao.根据单位Id和会员类型名查找(单位Id, 会员类型名);
		
		if (members == null || members.size() == 0) {
			throw new DDDException("单位Id或会员类型名不存在！");
		}

		return members;
	}

	@Override
	public Collection<String> 根据组Id和会员类型名查找(Long 组Id, String 会员类型名) {

		Collection<String> members = this.commonFindTaskAssigneeDao.根据组Id和会员类型名查找(组Id, 会员类型名);
		
		if (members == null || members.size() == 0) {
			throw new DDDException("组Id或会员类型名不存在！");
		}

		return members;
	}
}

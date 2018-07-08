package ddd.simple.dao.workflow.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.stereotype.Service;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;
import ddd.simple.dao.workflow.CommonFindTaskAssigneeDao;
import ddd.simple.entity.member.Member;
import ddd.simple.entity.permission.Operator;

@Service
public class CommonFindTaskAssigneeDaoBean extends BaseDao implements CommonFindTaskAssigneeDao {

	public Collection<String> 根据权限点和所属机构查找(String 权限点名称, String 机构名称) {
		String sql = "EId in(" + "select oandr.operatorId from operatorAndRole oandr where oandr.roleId in("
				+ "select r.roleEId from permission p left join role_permissions r on p.EId = r.permissionEId "
				+ "where p.name='" + 权限点名称 + "')" + "and oandr.organizationId in("
				+ "select org.EId from organization org where org.name='" + 机构名称 + "'))";

		List<String> operatorCodes = this.getOperatorCodesBySql(sql);
		return operatorCodes;
	}

	public Collection<String> 根据权限点查找(String 权限点名称) {
		String sql = "EId in(" + "select oandr.operatorId from OperatorAndRole oandr where oandr.roleId in("
				+ "select r.roleEId from permission p left join role_permissions r on p.EId = r.permissionEId "
				+ "where p.name='" + 权限点名称 + "'))";

		List<String> operatorCodes = this.getOperatorCodesBySql(sql);
		return operatorCodes;
	}

	public Collection<String> 根据角色和所属机构查找(String 角色名称, Long 机构Id) {
		String sql = "EId in" + "(select oandr.operatorId from operatorAndRole oandr where oandr.roleId in"
				+ "(select r.EId from role r where r.name='" + 角色名称 + "') and oandr.organizationId in"
				+ "(select org.EId from organization org where org.EId='" + 机构Id + "')" + ")";

		List<String> operatorCodes = this.getOperatorCodesBySql(sql);
		return operatorCodes;
	}

	public Collection<String> 根据角色和所属机构编码查找(String 角色名称, String 单位code) {
		String sql = "EId in" + "(select oandr.operatorId from operatorAndRole oandr where oandr.roleId in"
				+ "(select r.EId from role r where r.name='" + 角色名称 + "') and oandr.organizationId in"
				+ "(select org.EId from organization org where org.code='" + 单位code + "')" + ")";

		List<String> operatorCodes = this.getOperatorCodesBySql(sql);
		return operatorCodes;
	}

	public Collection<String> 根据角色和所属机构名称查找(String 角色名称, String 机构名称) {
		String sql = "EId in(" + "select oandr.operatorId from operatorAndRole oandr where oandr.roleId in("
				+ "select r.EId from role r where r.name='" + 角色名称 + "') and oandr.organizationId in("
				+ "select org.EId from organization org where org.name='" + 机构名称 + "'))";

		List<String> operatorCodes = this.getOperatorCodesBySql(sql);
		return operatorCodes;
	}

	public List<String> 根据角色查找(String 角色名称) {

		String sql = "EId in(" + "select oandr.operatorId from operatorAndRole oandr where oandr.roleId in("
				+ "select r.EId from role r where r.name='" + 角色名称 + "'))";

		List<String> operatorCodes = this.getOperatorCodesBySql(sql);
		return operatorCodes;
	}

	public Collection<String> 根据角色查找会员(String 角色名称) {
		String sql = "EId in(" + "select memberId from memberprojection where memberprojection.memberTypeId in("
				+ "select EId from membertype where roleId in(" + "select EId from role r where r.name='" + 角色名称
				+ "')))";

		List<String> memberCodes = this.getMemberCodesBySql(sql);
		return memberCodes;
	}

	/**
	 * 查询单位下面的所有会员组，是否有该角色
	 */
	@Override
	public Collection<String> 根据角色和所属单位查找会员(String 角色名称, Long 单位Id) {
		String sql = "EId in " + "(select memberprojection.memberId from memberprojection where memberTypeId in "
				+ "(select membertype.EId FROM membertype where typeName = '" + 角色名称 + "')" + "and memberGroupId in"
				+ "(select EId from membergroup where organizationId in" + "(select EId from organization where EId='"
				+ 单位Id + "')" + ")" + ")";

		List<String> memberCodes = this.getMemberCodesBySql(sql);
		return memberCodes;
	}

	@Override
	public Collection<String> 根据角色和所属单位编码查找会员(String 角色名称, String 单位code) {
		String sql = "EId in " + "(select memberprojection.memberId from memberprojection where memberTypeId in "
				+ "(select membertype.EId FROM membertype where typeName = '" + 角色名称 + "')" + "and memberGroupId in"
				+ "(select EId from membergroup where organizationId in" + "(select EId from organization where code='"
				+ 单位code + "')" + ")" + ")";

		List<String> memberCodes = this.getMemberCodesBySql(sql);
		return memberCodes;
	}

	@Override
	public Collection<String> 根据角色和会员组查找会员(String 角色名称, Long 组Id) {
		String sql = "EId in (" + "select memberprojection.memberId from memberprojection where memberTypeId in "
				+ "(select membertype.EId FROM membertype where typeName='" + 角色名称 + "' and memberGroupId in"
				+ "(select EId from membergroup where EId = '" + 组Id + "'" + ")" + ")" + ")";

		List<String> memberCodes = this.getMemberCodesBySql(sql);
		return memberCodes;
	}

	public Collection<String> 根据部门和所属机构查找(String 部门名称, String 机构名称) {
		String sql = "employeeId in(" + "select e.EId from employee e where e.departmentId in("
				+ "select d.EId from department d where d.name='" + 部门名称 + "') and e.organizationId in("
				+ "select org.EId from organization org where org.name='" + 机构名称 + "'))";

		List<String> operatorCodes = this.getOperatorCodesBySql(sql);
		return operatorCodes;
	}

	public Collection<String> 根据部门查找(String 部门名称) {
		String sql = "employeeId in(" + "select e.EId from employee e where e.departmentId in("
				+ "select d.EId from department d where d.name='" + 部门名称 + "'))";

		List<String> operatorCodes = this.getOperatorCodesBySql(sql);
		return operatorCodes;
	}

	@Override
	public Collection<String> 根据人员查找(String 人员Id) {
		String sql = "EId in(" + " select o.eid from OPERATOR o " + " LEFT JOIN EMPLOYEE e on o.EMPLOYEEID=e.EID"
				+ " where e.EID =" + 人员Id + "" + ")";
		List<String> operatorCodes = this.getOperatorCodesBySql(sql);
		return operatorCodes;
	}

	/**
	 * @author 林园 @date 2016年7月24日
	 *         上午10:41:24 @Title:根据是否拥有权限和会员类型及单位ID判断流程走向 @Description:
	 *         比如：判断是否能二审时 ，需要现在业务逻辑中去判断拥有一个是否能二审的权限点,
	 *         一个可行的方法是通过memberType遍历所有的role，再根据role去遍历role下的所有权限点 @param @param
	 *         是否拥有权限 @param @param 会员类型名称 @param @param 单位Id @param @return
	 *         设定文件 @throws
	 */
	@Override
	public Boolean 根据是否拥有权限和会员类型及组Id判断流程走向(String 权限点名称, String 会员类型名称, Long 组Id) {
		if (!this.是否拥有权限(权限点名称, 会员类型名称, 组Id)) {
			return false;
		} else {
			String sql = "EId in (" + "select memberprojection.memberId from memberprojection where memberTypeId in "
					+ "(select m.EId FROM membertype m where m.typeName='" + 会员类型名称 + "' and orgId in"
					+ "(select EId from organization where EId = '" + 组Id + "'" + ")" + ")" + ")";

			List<String> memberCodes = this.getMemberCodesBySql(sql);

			return memberCodes.isEmpty() ? false : true;
		}
	}

	private Boolean 是否拥有权限(String 权限点名称, String 会员类型名称, Long 组Id) {
		String sql = "EId in (" + "SELECT mem.memberId FROM memberprojection mem " + "WHERE mem.memberGroupId = '" + 组Id
				+ "' AND mem.memberTypeId =" + "(SELECT mr.memberTypeEId FROM membertype_roles mr "
				+ "LEFT JOIN membertype m ON m.EId = mr.memberTypeEId " + "WHERE m.typeName = '" + 会员类型名称
				+ "' AND mr.roleEId in" + "(SELECT rop.roleEId FROM role_permissions rop "
				+ "LEFT JOIN permission p ON rop.permissionEId = p.eid" + "WHERE p.name = '" + 权限点名称 + "'" + ")" + ")"
				+ ")";

		List<String> memberCodes = this.getMemberCodesBySql(sql);

		return memberCodes.isEmpty() ? false : true;

	}

	@Override
	public List<String> 根据组Id及权限点查找(Long 组Id, String 权限点名称) {
		String sql = "EId in (" + "SELECT mem.memberId FROM memberprojection mem " + "WHERE mem.memberGroupId = '" + 组Id
				+ "' AND mem.memberTypeId in (SELECT mr.memberTypeEId FROM membertype_roles mr "
				+ " where mr.roleEId in" + "(SELECT rop.roleEId FROM role_permissions rop "
				+ "LEFT JOIN permission p ON rop.permissionEId = p.eid WHERE p.name = '" + 权限点名称 + "'" + ")" + ")"
				+ ")";

		List<String> memberCodes = this.getMemberCodesBySql(sql);

		return memberCodes;
	}

	@Override
	public List<String> 根据组Id查找(Long 组Id) {
		String sql = "EId in (" + "SELECT mem.memberId FROM memberprojection mem " + "WHERE mem.memberGroupId = '" + 组Id
				+ "' AND mem.memberTypeId in" + "(SELECT mr.memberTypeEId FROM membertype_roles mr "
				+ " where mr.roleEId in" + "(SELECT rop.roleEId FROM role_permissions rop " + ")" + ")" + ")";

		List<String> memberCodes = this.getMemberCodesBySql(sql);

		return memberCodes;
	}

	private List<String> getOperatorCodesBySql(String sql) {
		List<String> operatorCodes = null;
		try {
			EntitySet<Operator> operators = this.query(sql, Operator.class);
			operatorCodes = new ArrayList<String>();
			for (Operator operator : operators) {
				operatorCodes.add(operator.getCode());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return operatorCodes;
	}

	private List<String> getMemberCodesBySql(String sql) {
		List<String> memberCodes = null;
		try {
			EntitySet<Member> members = this.query(sql, Member.class);
			memberCodes = new ArrayList<String>();
			for (Member member : members) {
				memberCodes.add(member.getInputCode());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return memberCodes;
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
		String sql = "EId in (" + "SELECT mem.memberId FROM memberprojection mem "
				+ "LEFT JOIN memberGroup mg ON mem.membergroupId = mg.eid where mg.organizationId = '"+单位Id+"' "
				+ "AND mg.name = '" + 组名 +"'" +")";

		List<String> memberCodes = this.getMemberCodesBySql(sql);

		return memberCodes;
	}

	@Override
	public Collection<String> 根据单位名称和组名查找(String 单位名称, String 组名) {
		String sql = "EId in (" + "SELECT mem.memberId FROM memberprojection mem "
				+ "LEFT JOIN memberGroup mg ON mem.membergroupId = mg.eid where mg.organizationId in ("
				+ "SELECT o.eid from organization o where o.name = '" + 单位名称 + "') "
				+ "AND mg.name = '" + 组名 +"'" +")";

		List<String> memberCodes = this.getMemberCodesBySql(sql);

		return memberCodes;
	}

	@Override
	public Collection<String> 根据单位Id和角色名查找(Long 单位Id, String 角色名) {
		String sql = "EId in (" + "SELECT mem.memberId FROM memberprojection mem "
				+ "LEFT JOIN memberGroup mg ON mem.membergroupId = mg.eid where mg.organizationId = '"+单位Id+"'"
				+ " AND mem.memberTypeId in (SELECT mr.memberTypeEId FROM membertype_roles mr "
				+ " where mr.roleEId in" + "(SELECT r.eid FROM role r WHERE r.name = '" + 角色名 + "'" + ")" + ")"
				+ ")";

		List<String> memberCodes = this.getMemberCodesBySql(sql);

		return memberCodes;
	}

	@Override
	public Collection<String> 根据组Id和角色名查找(Long 组Id, String 角色名) {
		String sql = "EId in (" + "SELECT mem.memberId FROM memberprojection mem "
				+ "where mem.memberGroupId = '"+组Id+"' "
				+ " AND mem.memberTypeId in (SELECT mr.memberTypeEId FROM membertype_roles mr "
				+ " where mr.roleEId in" + "(SELECT r.eid FROM role r WHERE r.name = '" + 角色名 + "'" + ")" + ")"
				+ ")";

		List<String> memberCodes = this.getMemberCodesBySql(sql);

		return memberCodes;
	}

	@Override
	public Collection<String> 根据单位Id和会员类型名查找(Long 单位Id, String 会员类型名) {
		String sql = "EId in (" + "SELECT mem.memberId FROM memberprojection mem "
				+ "LEFT JOIN memberGroup mg ON mem.membergroupId = mg.eid where mg.organizationId = '"+单位Id+"'"
				+ " AND mem.memberTypeId in (SELECT mt.eid FROM membertype mt "
				+ "WHERE mt.typeName = '" + 会员类型名 + "'"
				+ ")" + ")";

		List<String> memberCodes = this.getMemberCodesBySql(sql);

		return memberCodes;
	}

	@Override
	public Collection<String> 根据组Id和会员类型名查找(Long 组Id, String 会员类型名) {
		String sql = "EId in (" + "SELECT mem.memberId FROM memberprojection mem "
				+ "WHERE mem.memberGroupId = '" + 组Id + "' "
				+ "AND mem.memberTypeId in (SELECT mt.eid FROM membertype mt "
				+ "WHERE mt.typeName = '" + 会员类型名 + "'"
				+ ")" + ")";

		List<String> memberCodes = this.getMemberCodesBySql(sql);

		return memberCodes;
	}

}

package ddd.simple.service.model.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.base.persistence.SessionFactory;
import ddd.simple.dao.model.ModelExpressionDao;
import ddd.simple.entity.member.Member;
import ddd.simple.entity.member.MemberType;
import ddd.simple.entity.memberGroup.MemberGroup;
import ddd.simple.entity.organization.Employee;
import ddd.simple.entity.organization.Organization;
import ddd.simple.entity.permission.LoginUser;
import ddd.simple.entity.permission.Operator;
import ddd.simple.entity.permission.Role;
import ddd.simple.service.base.BaseService;
import ddd.simple.service.member.MemberTypeService;
import ddd.simple.service.model.ModelExpressionService;
import ddd.simple.service.permission.OperatorService;
import ddd.simple.service.permission.RoleService;

@Service
public class ModelExpressionServiceBean extends BaseService implements ModelExpressionService {
	@Resource(name = "roleServiceBean")
	private RoleService roleService;

	@Resource(name = "memberTypeServiceBean")
	private MemberTypeService memberTypeService;

	@Resource(name = "modelExpressionDaoBean")
	private ModelExpressionDao modelExpressionDao;

	@Override
	public Object execute() {
		return null;
	}

	public Object 获取当前用户名(String identity) {
		if ("back".equals(this.checkCurrentUser())) {
			return this.getOperator().getName();
		} else if ("fore".equals(checkCurrentUser())) {
			return this.getMember().getName();
		} else {
			throw new DDDException("登录无权限，请重新登录!");
		}
	}

	public String 获取当前会员姓名(String ddd) throws Exception {
		if (this.getMember() != null) {
			return this.getMember().getName();
		} else if (this.getOperator() != null) {
			return this.getOperator().getName();
		} else {
			return null;
		}
	}

	public String 获取当前会员code(String ddd) throws Exception {
		if (this.getMember() != null) {
			return this.getMember().getInputCode();
		} else if (this.getOperator() != null) {
			return this.getOperator().getCode();
		} else {
			return null;
		}
	}
	
	public Long 获取当前会员Id(String ddd) throws Exception {
		if (this.getMember() != null) {
			return this.getMember().getEId();
		} else if (this.getOperator() != null) {
			Operator currentOperator = this.getOperator();
			Employee currentEmployee = currentOperator.getEmployee();
			String sql = "select EId from member where employeeId = " + currentEmployee.getEId();
			Set<Map<String, Object>> data = SessionFactory.getThreadSession().get(sql);

			if (data != null && !data.isEmpty()) {
				return Long.parseLong(data.iterator().next().get("EId").toString());
			} else {
				return null;
			}
		} else {
			return null;
		}
	}

	// 获取会员组Id
	public Long 获取会员组标识(String mg) {
		if (this.getLoginUser().getCurrentGroup() != null) {
			return this.getLoginUser().getCurrentGroup().getEId();
		}

		return 0L;
	}

	public Long 获取上级会员组标识(String mg) {
		try {
			Long orgid = this.获取会员单位Id(mg);
			// Long memid = this.获取当前会员Id(mg);
			MemberGroup memberGroup = this.modelExpressionDao.findMemberGroupIdByOrgAndGroupName(orgid, mg);

			return memberGroup.getEId();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0L;
	}

	public Long 获取会员单位Id(String mg) {
		return this.获取用户单位标识(mg);
	}

	// 获取所属单位Id
	public Long 获取用户单位标识(String userOrgId) {
		if (this.getOrganization() != null) {
			return this.getOrganization().getEId();
		}
		return 0L;
	}

	public Long 获取单位Id(String userOrgId) {
		return 获取用户单位标识(userOrgId);
	}

	public String 获取用户单位名称(String userOrgId) {
		if (this.getOrganization() != null) {
			return this.getOrganization().getName();
		}
		return "";
	}

	// 获取用户角色名
	/**
	 * @author 林园 
	 * @date 2016年7月21日 下午3:58:48 
	 * @Title: 获取用户角色名 
	 * @Description:
	 * TODO(用于模型表达式解析，给模型项赋值) 
	 * @param @param ddd 默认的参数解析需要 无实际作用 
	 * @param @return 返回当前模型的角色 如：信息员，管理员，编辑员 
	 * @return String 返回类型
	 * @throws
	 */
	public String 获取用户角色名(String ddd) {
		String roleName = "";
		EntitySet<Role> roles = null;
		EntitySet<MemberType> memberTypes = null;

		// 这里需要分前后台来获取角色名
		if ("back".equals(this.checkCurrentUser())) {
			try {
				roles = this.roleService.findRoleByOperatorId(this.getOperator().getEId());
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else if ("fore".equals(checkCurrentUser())) {
			try {
				memberTypes = this.memberTypeService.findMemberTypeByMemberId(this.getMember().getEId(),
						this.getMember().getDeptid());
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			throw new DDDException("登录无权限，请重新登录!");
		}

		if (roles != null) {
			for (Role role : roles) {
				if (role != null) {
					if ("".equals(roleName)) {
						roleName += role.getName();
					}else {
						roleName += "," + role.getName();
					}
				}
			}
		}

		if (memberTypes != null) {
			for (MemberType memberType : memberTypes) {
				if (memberType != null) {
					if ("".equals(roleName)) {
						roleName += memberType.getTypeName();
					}else {
						roleName += "," + memberType.getTypeName();
					}
				}
			}
		}
		return roleName;
	}
	
	
	public String 获取用户单位编码(String code) {
		if (this.getOrganization() != null) {
			return this.getOrganization().getCode();
		}
		return "";
	}

	public String 获取系统当前时间(String format) {
		if ("yyyy-mm-dd HH:ii:ss".equals(format)) {
			format = "yyyy-MM-dd HH:mm:ss";
		}
		SimpleDateFormat df = new SimpleDateFormat(format);// 设置日期格式
		return df.format(new Date());// new Date()为获取当前系统时间;
	}

	public String checkCurrentUser() {
		return this.getOperator() == null ? "fore" : "back";
	}

	public Operator getOperator() {
		return this.getLoginUser().getLoginOperator();
	}

	public Member getMember() {
		return this.getLoginUser().getLoginVip();
	}
}

package ddd.simple.service.member.impl;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import ddd.base.Config;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.dao.member.MemberDao;
import ddd.simple.dao.memberGroup.MemberGroupDao;
import ddd.simple.dao.memberProjection.MemberProjectionDao;
import ddd.simple.dao.organization.EmployeeDao;
import ddd.simple.dao.permission.OperatorDao;
import ddd.simple.entity.member.Member;
import ddd.simple.entity.member.MemberType;
import ddd.simple.entity.memberGroup.MemberGroup;
import ddd.simple.entity.memberProjection.MemberProjection;
import ddd.simple.entity.organization.Employee;
import ddd.simple.entity.organization.Organization;
import ddd.simple.entity.permission.LoginUser;
import ddd.simple.entity.permission.Operator;
import ddd.simple.entity.permission.Permission;
import ddd.simple.entity.permission.Role;
import ddd.simple.service.base.BaseService;
import ddd.simple.service.member.MemberService;
import ddd.simple.service.member.MemberTypeService;
import ddd.simple.service.memberGroup.MemberGroupService;
import ddd.simple.service.organization.OrganizationService;
import ddd.simple.service.systemConfig.SystemConfigService;

@Service
public class MemberServiceBean extends BaseService implements MemberService {

	@Resource(name = "memberDaoBean")
	private MemberDao memberDao;

	@Resource(name = "memberGroupDaoBean")
	private MemberGroupDao memberGroupDao;

	@Resource(name = "operatorDaoBean")
	private OperatorDao operatorDao;

	@Resource(name = "employeeDaoBean")
	private EmployeeDao employeeDao;

	@Resource(name = "memberProjectionDaoBean")
	private MemberProjectionDao memberProjectionDao;

	@Resource(name = "memberTypeServiceBean")
	private MemberTypeService memberTypeService;

	@Resource(name = "memberGroupServiceBean")
	private MemberGroupService memberGroupService;

	@Resource(name = "systemConfigServiceBean")
	private SystemConfigService systemConfigService;

	@Resource(name = "organizationServiceBean")
	private OrganizationService organizationService;

	// 获取默认会员类别
	private MemberType getMemberType() {
		try {
			Long defultMemberTypeId = Long.parseLong(Config.get("defaultMemberTypeId"));
			return this.memberTypeService.findMemberTypeById(defultMemberTypeId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("getMemberType", e.getMessage(), e);
		}
	}

	@Override
	public Member saveMember(Member member) {
		try {
			member.setOperateDate(new Date());

			String password = member.getPassword();
			if (password != null && password.length() < 32) {
				member.setPassword(Md5(password));
			}

			Long eid = member.getEId();
			if (eid != null && this.memberDao.findMemberById(eid) != null) {
				return this.memberDao.updateMember(member);
			}

			/* 第一次保存 */
			member = this.memberDao.saveMember(member);
			return member;
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveMember", e.getMessage(), e);
		}
	}

	public EntitySet<MemberProjection> distributionDefault(Member member) throws Exception {

		/* 默认角色 */
		MemberType defulatType;
		if (StringUtils.isBlank(member.getPassword())) {
			defulatType = this.getDefaultMemberTypeInSchool();
		} else {
			defulatType = this.getDefaultMemberTypeOutSchool();
		}

		/* 默认组 */
		MemberGroup defaultGroup;
		if ("".equals(member.getDeptid()) || organizationService.findOrganizationByCode(member.getDeptid()) == null) {
			defaultGroup = this.getDefaultMemberGroup();
		} else {
			/* 有单位 */
			Organization organizatin = organizationService.findOrganizationByCode(member.getDeptid());
			EntitySet<MemberGroup> memberGroups = memberGroupService.findMemberGroupByOrg(organizatin);
			if (memberGroups == null || memberGroups.isEmpty()) {
				/* 单位未建立会员组 */
				MemberGroup newGroup = new MemberGroup();
				newGroup.setName(organizatin.getName() + "默认会员组");
				newGroup.setOrganization(organizatin);
				newGroup.setOperateDate(new Date());
				defaultGroup = this.memberGroupService.saveMemberGroup(newGroup);
			} else {
				defaultGroup = memberGroups.iterator().next();
			}
		}

		EntitySet<MemberType> memberTypes = new EntitySet<MemberType>();
		memberTypes.add(defulatType);
		memberGroupService.saveMemberProjection(member, defaultGroup, memberTypes);
		return this.memberProjectionDao.findProjectionByMember(member.getEId());
	}

	public MemberGroup getDefaultMemberGroup() throws DDDException {
		String code = systemConfigService.findSystemConfigValueBykey("默认会员组编码");
		if (code == null || "".equals(code)) {
			throw new DDDException("未配置系统参数【默认会员组编码】");
		}
		return this.memberGroupService.findMemberGroupByCode(code);
	}

	public MemberType getDefaultMemberTypeInSchool() throws DDDException {
		String code = systemConfigService.findSystemConfigValueBykey("默认校内会员角色编码");
		if (code == null || "".equals(code)) {
			throw new DDDException("未配置系统参数【默认校内会员角色编码】");
		}
		return this.memberTypeService.findMemberTypeByCode(code);
	}

	public MemberType getDefaultMemberTypeOutSchool() throws DDDException {
		String code = systemConfigService.findSystemConfigValueBykey("默认校外会员角色编码");
		if (code == null || "".equals(code)) {
			throw new DDDException("未配置系统参数【默认校外会员角色编码】");
		}
		return this.memberTypeService.findMemberTypeByCode(code);
	}

	@Override
	public int deleteMember(Member member) {
		try {
			this.memberProjectionDao.deleteMemberProjectionByMember(member.getEId());
			this.memberDao.delete(member);
			Employee employee = this.employeeDao.findEmployeeByCode(member.getOnlyCode());
			Operator operator = this.operatorDao.findOperatorByCode(member.getOnlyCode());
			if (operator != null) {
				this.operatorDao.deleteOperator(operator.getEId());
			}
			if (employee != null) {
				this.employeeDao.deleteEmployee(employee.getEId());
			}
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteMember", e.getMessage(), e);
		}

	}

	@Override
	public Member updateMember(Member member) {
		try {
			Date operateDate = new Date();
			member.setOperateDate(operateDate);
			return this.memberDao.updateMember(member);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateMember", e.getMessage(), e);
		}
	}

	@Override
	public Member findMemberById(Long memberId) {
		try {
			return this.memberDao.findMemberById(memberId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findMemberById", e.getMessage(), e);
		}
	}

	@Override
	public EntitySet<Member> findAllMember() {
		try {
			return this.memberDao.findAllMember();
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllMember", e.getMessage(), e);
		}
	}

	/*
	 * 安全性 后台session保存会员账号名，是否登陆
	 */
	@Override
	public Member findMemberByOnlyCodeAndPassword(String onlycode, String password) {
		try {
			return this.memberDao.findMemberByOnlyCodeAndPassword(onlycode, password);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findMemberByNameAndPassword", e.getMessage(), e);
		}
	}

	@Override
	public Map<String, Object> checkOrganization(String onlycode, String password, MemberGroup currentGroup) {
		try {
			Member member = this.memberDao.findMemberByOnlyCodeAndPassword(onlycode, password);
			return loginByOneGroup(member, currentGroup);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("checkOrganizationError!", e.getMessage(), e);
		}
	}

	@Override
	public Map<String, Object> getCurrentLoginUser() {

		try {
			Map<String, Object> data = new HashMap<String, Object>();

			if (this.getLoginUser() != null) {
				LoginUser loginUser = this.getLoginUser();
				Member currentMember = loginUser.getLoginVip();
				if (currentMember == null) {
					throw new DDDException("未登录");
				}
				// 获取最新的memer信息 并同步session
				Member member = memberDao.findMemberById(currentMember.getEId());
				loginUser.setLoginVip(member);
				super.setLoginUser(loginUser);

				data.put("isSuccess", true);
				data.put("loginUser", loginUser);
			} else {
				data.put("isSuccess", false);
			}
			return data;
		} catch (DDDException e) {
			throw e;
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("getCurrentMember", e.getMessage(), e);
		}
	}

	@Override
	public Map<String, Object> checkOrganization(String onlycode, MemberGroup currentGroup) {
		try {
			Member member = this.memberDao.findMemberByOnlyCode(onlycode);
			return loginByOneGroup(member, currentGroup);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("checkOrganizationError!", e.getMessage(), e);
		}
	}

	@Override
	public LoginUser ChangeGroup(MemberGroup currentGroup) {
		Member member = this.getLoginUser().getLoginVip();
		this.loginByOneGroup(member, currentGroup);
		return this.getLoginUser();
	}

	private Map<String, Object> loginByOneGroup(Member member, MemberGroup currentGroup) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("isSuccess", false);
		if (member != null && currentGroup != null) {
			EntitySet<MemberGroup> groups = this.searchGroup(member.getOnlyCode());
			LoginUser loginUser = new LoginUser();
			if (groups.contains(currentGroup)) {
				try {
					loginUser = this.turnToLoginUser(member, currentGroup);
				} catch (Exception e) {
					e.printStackTrace();
					throw new DDDException("getCheckOrganizationResult!", e.getMessage(), e);
				}
				result.put("isSuccess", true);// 在前台 存入sessionStorage

				result.put("loginUser", loginUser);// 在后台 存入session
				super.setLoginUser(loginUser);
			} else {
				throw new DDDException("单位选择异常!");
			}
		}
		return result;
	}

	public LoginUser turnToLoginUser(Member member, MemberGroup currentGroup) throws Exception {
		if (currentGroup == null || member == null)
			return null;
		LoginUser loginUser = new LoginUser();

		// 设置当前单位
		loginUser.setCurrentOrganization(currentGroup.getOrganization());
		System.out.println("切换后单位id:" + currentGroup.getOrganization().getEId());

		// 设置当前会员组
		loginUser.setCurrentGroup(currentGroup);

		EntitySet<MemberProjection> memberProjections = memberProjectionDao.findProjectionByMember(member.getEId());
		EntitySet<MemberGroup> groups = new EntitySet<MemberGroup>();
		Set<String> permissionCodes = new HashSet<String>();
		//EntitySet<Role> roles = new EntitySet<Role>();
		MemberType currentType = new MemberType();

		Map<Long, MemberType> appearedMembertype = new HashMap<Long, MemberType>();

		for (MemberProjection projection : memberProjections) {
			// bug：当相同的实体出现在结果集中时，以后不会被查询出来
			// 解决：将第一次查询出来的结果缓存
			MemberType memberType = projection.getMemberType();
			if (!appearedMembertype.containsKey(memberType.getEId())) {
				if (memberType.getRoles() == null) {
					throw new DDDException("会员类型" + memberType.getTypeName() + "未分配角色!");
				}
				appearedMembertype.put(memberType.getEId(), memberType);
			} else {
				memberType = appearedMembertype.get(memberType.getEId());
			}

			if (projection.getMemberGroup() != null) {
				if (projection.getMemberGroup().getEId().equals(currentGroup.getEId())) {
					/*Collection<Permission> permissions = memberType.getRole().getPermissions();
					for (Permission permission : permissions) {
						permissionCodes.add(permission.getCode());
					}*/
					
					for(Role role:memberType.getRoles()) {
						for(Permission permission: role.getPermissions()) {
							permissionCodes.add(permission.getCode());
						}
					}
					// 添加当前登录会员组的会员角色
					currentType = projection.getMemberType();
				}
				groups.add(projection.getMemberGroup());
			}
			/*if (projection.getMemberType() != null) {
				//roles = projection.getMemberType().getRoles();
				for(Role role: projection.getMemberType().getRoles()) {
					roles.add(role);
				}
			}*/

		}

		loginUser.setMemberType(currentType); // 设置当前登录人角色
		loginUser.setGroups(groups);
		loginUser.setCurrentOrganization(currentGroup.getOrganization());
		loginUser.setUserName(member.getName());
		loginUser.setEId(member.getEId());
		loginUser.setOnlyCode(member.getOnlyCode());
		loginUser.setLoginVip(member);
		loginUser.setUserPermissionsCode(permissionCodes);
		return loginUser;
	}

	@Override
	public Member findMemberInfo(Long memberId) {
		Member findMember = this.findMemberById(memberId);
		findMember.setPassword(null);
		return findMember;
	}

	@Override
	public Member updateMemberInfo(Member member) {
		try {
			String password = findMemberById(member.getEId()).getPassword();
			member.setPassword(password);
			return this.memberDao.updateMember(member);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateMemberInfo", e.getMessage(), e);
		}
	}

	@Override
	public Map<String, Object> editPassword(String oldPassword, String newPassword) {
		Long memberId = this.getLoginUser().getEId();
		boolean ifEditSuccess = false;
		Map<String, Object> result = new HashMap<String, Object>();
		Member member = this.memberDao.editPassword(memberId, oldPassword, newPassword);
		if (member != null) {
			if (member.getEId() != null) {
				ifEditSuccess = true;
			}
		}
		result.put("editPasswordSuccess", ifEditSuccess);
		return result;
	}

	public EntitySet<MemberGroup> searchGroup(String onlyCode) throws DDDException {

		if (onlyCode == null || onlyCode.equals(""))
			return null;
		Member member = null;
		try {
			member = memberDao.findMemberByOnlyCode(onlyCode);
			if (member == null) {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("查询用户失败!");
		}

		try {
			EntitySet<MemberProjection> projections = memberProjectionDao.findProjectionByMember(member.getEId());
			if (projections == null || projections.isEmpty())
				return null;
			EntitySet<MemberGroup> groups = new EntitySet<MemberGroup>();
			for (MemberProjection projection : projections) {
				MemberGroup group = projection.getMemberGroup();
				group.getName();
				group.getEId();
				group.getOrganization(); // EId
				groups.add(group);
			}
			return groups;
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("搜索组失败!");
		}
	}

	@Override
	public boolean isDistribution(Member member) throws Exception {
		EntitySet<MemberProjection> memberProjections = this.memberProjectionDao
				.findProjectionByMember(member.getEId());
		return !(memberProjections == null || memberProjections.isEmpty());
	}

	private static String Md5(String strSrc) {
		try {
			MessageDigest bmd5 = MessageDigest.getInstance("MD5");
			bmd5.update(strSrc.getBytes());
			int i;
			StringBuffer buf = new StringBuffer();
			byte[] b = bmd5.digest();
			for (int offset = 0; offset < b.length; offset++) {
				i = b[offset];
				if (i < 0)
					i += 256;
				if (i < 16)
					buf.append("0");
				buf.append(Integer.toHexString(i));
			}
			return buf.toString();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return "";
	}

	@Override
	public Member getMemberByOnlyCode(String onlyCode) {
		try {
			return memberDao.findMemberByOnlyCode(onlyCode);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("getMemberByOnlyCode", e.getMessage(), e);
		}
	}

	@Override
	public Member findMemberByEmailAndPassword(String email, String password) {
		try {
			return this.memberDao.findMemberByEmailAndPassword(email, password);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findMemberByEmailAndPassword", e.getMessage(), e);
		}
	}

	@Override
	public Member findMemberByCkeyAndPassword(String ckey, String password) {
		try {
			return this.memberDao.findMemberByCkeyAndPassword(ckey, password);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findMemberByCkeyAndPassword", e.getMessage(), e);
		}
	}

	@Override
	public Member findMemberByNameAndPassword(String name, String password) {
		try {
			return this.memberDao.findMemberByNameAndPassword(name, password);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findMemberByNameAndPassword", e.getMessage(), e);
		}
	}

	@Override
	public Member addMember(Member member, EntitySet<MemberProjection> projections) {
		try {

			String password = member.getPassword();
			if (password != null && password.length() < 32) {
				member.setPassword(Md5(password));
			}
			member = this.memberDao.saveMember(member);
			for (MemberProjection projection : projections) {
				projection.setMember(member);
			}
			this.memberProjectionDao.save(projections);
			return member;
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("addMember", e.getMessage(), e);
		}
	}

	@Override
	public Member updateMember(Member member, EntitySet<MemberProjection> projections) {
		try {

			String password = member.getPassword();
			if (password != null && password.length() < 32) {
				member.setPassword(Md5(password));
			}
			member = this.memberDao.updateMember(member);
			this.memberProjectionDao.deleteMemberProjectionByMember(member.getEId());
			for (MemberProjection projection : projections) {
				projection.setMember(member);
			}
			this.memberProjectionDao.save(projections);
			return member;
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("addMember", e.getMessage(), e);
		}
	}

	@Override
	public EntitySet<MemberProjection> findProjectionByMemberId(Long memberId) {
		try {
			return this.memberProjectionDao.findProjectionByMember(memberId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findProjectionByMemberId", e.getMessage(), e);
		}
	}

}

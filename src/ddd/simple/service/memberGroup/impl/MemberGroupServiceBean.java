package ddd.simple.service.memberGroup.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.base.util.EntityUtil;
import ddd.simple.service.base.BaseService;
import ddd.simple.entity.member.Member;
import ddd.simple.entity.member.MemberType;
import ddd.simple.entity.memberGroup.MemberGroup;
import ddd.simple.entity.memberProjection.MemberProjection;
import ddd.simple.entity.organization.Organization;
import ddd.simple.entity.permission.LoginUser;
import ddd.simple.entity.permission.Permission;
import ddd.simple.entity.permission.Role;
import ddd.simple.dao.member.MemberDao;
import ddd.simple.dao.member.MemberTypeDao;
import ddd.simple.dao.memberGroup.MemberGroupDao;
import ddd.simple.dao.memberProjection.MemberProjectionDao;
import ddd.simple.service.memberGroup.MemberGroupService;

@Service
public class MemberGroupServiceBean extends BaseService implements MemberGroupService {

	@Resource(name = "memberGroupDaoBean")
	private MemberGroupDao memberGroupDao;

	@Resource(name = "memberDaoBean")
	private MemberDao memberDao;

	@Resource(name = "memberProjectionDaoBean")
	private MemberProjectionDao memberProjectionDao;
	
	@Resource(name="memberTypeDaoBean")
	private MemberTypeDao memberTypeDao;

	@Override
	public MemberGroup saveMemberGroup(MemberGroup memberGroup) {
		try {
			Date operateDate = new Date();
			memberGroup.setOperateDate(operateDate);
			Long eid = memberGroup.getEId();
			if (eid != null && this.memberGroupDao.findMemberGroupById(eid) != null) {
				memberGroup = this.memberGroupDao.updateMemberGroup(memberGroup);
			} else {
				memberGroup = this.memberGroupDao.saveMemberGroup(memberGroup);
				
				//添加默认会员类型， 类型名称以(会员组名称 + "会员类型")组成
				MemberType memberType = new MemberType();
				memberType.setTypeName(memberGroup.getName()+"会员类型");
				memberType.setMemberGroup(memberGroup);
				memberType = this.memberTypeDao.saveMemberType(memberType);
				EntityUtil.loadLazyProperty(memberType, "memberGroup");
				EntityUtil.loadLazyProperty(memberType, "memberGroup.name");
			}

			return memberGroup;
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveMemberGroup", e.getMessage(), e);
		}
	}

	@Override
	public int deleteMemberGroup(MemberGroup memberGroup) {
		try {
			return this.memberGroupDao.deleteMemberGroup(memberGroup);
		} catch (DDDException e) {
			throw e;
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteMemberGroup", e.getMessage(), e);
		}
	}

	@Override
	public MemberGroup updateMemberGroup(MemberGroup memberGroup) {
		try {
			Date operateDate = new Date();
			memberGroup.setOperateDate(operateDate);
			return this.memberGroupDao.updateMemberGroup(memberGroup);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateMemberGroup", e.getMessage(), e);
		}
	}

	@Override
	public MemberGroup findMemberGroupById(Long memberGroupId) {
		try {
			MemberGroup memberGroup = this.memberGroupDao.findMemberGroupById(memberGroupId);
			if (memberGroup.getOrganization() != null) {
				memberGroup.getOrganization().getName();
			}
			return memberGroup;
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findMemberGroupById", e.getMessage(), e);
		}
	}

	@Override
	public EntitySet<MemberGroup> findAllMemberGroup() {
		try {
			return this.memberGroupDao.findAllMemberGroup();
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllMemberGroup", e.getMessage(), e);
		}
	}

	public MemberProjection addMemberProjection(Member member, MemberGroup memberGroup, MemberType memberType) {
		try {
			MemberProjection memberProjection = new MemberProjection();
			memberProjection.setMember(member);
			memberProjection.setMemberGroup(memberGroup);
			memberProjection.setMemberType(memberType);
			Date operateDate = new Date();
			memberProjection.setOperateDate(operateDate);
			return this.memberProjectionDao.saveMemberProjection(memberProjection);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("addMemberProjection", e.getMessage(), e);
		}
	}

	public Boolean judeIsExsist(Member member, MemberGroup memberGroup, MemberType memberType) {
		Long memberId = null;
		Long memberGroupId = null;
		Long memberTypeId = null;
		if (member != null) {
			memberId = member.getEId();
		}
		if (memberGroup != null) {
			memberGroupId = memberGroup.getEId();
		}
		if (memberType != null) {
			memberTypeId = memberType.getEId();
		}
		Boolean isExsist = false;
		try {
			EntitySet<MemberProjection> allMemberProjection = memberProjectionDao.getMemberProjectIdByIds(memberId,
					memberGroupId, memberTypeId);
			if (allMemberProjection.size() <= 0) {
				isExsist = false;
			} else {
				isExsist = true;
			}
			return isExsist;
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("judeIsExsist", e.getMessage(), e);
		}
	}

	@Override
	public EntitySet<Member> getGroupMembersById(Long memberGroupId) {
		List<Long> memberIdList = new ArrayList<Long>();
		EntitySet<Member> members = new EntitySet<Member>();
		try {
			EntitySet<MemberProjection> memberProjections = this.memberProjectionDao
					.findMemberProsByGroupId(memberGroupId);
			if (memberProjections.size() > 0) {
				memberIdList = getAllMemberIdList(memberProjections);
				members = getAllMemberByIds(memberIdList);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("getGroupMembersById", e.getMessage(), e);
		}
		return members;
	}

	private EntitySet<Member> getAllMemberByIds(List<Long> memberIdList) {
		EntitySet<Member> members = new EntitySet<Member>();
		for (int i = 0; i < memberIdList.size(); i++) {
			Long MemberId = Long.parseLong(memberIdList.get(i).toString());
			Member member = new Member();
			try {
				member = memberDao.findMemberById(MemberId);
				members.add(member);
			} catch (Exception e) {
				e.printStackTrace();
				throw new DDDException("getAllMemberByIds", e.getMessage(), e);
			}
		}
		return members;
	}

	private List<Long> getAllMemberIdList(EntitySet<MemberProjection> memberProjections) {
		List<Long> memberIdlist = new ArrayList<Long>();
		for (MemberProjection memberProjection : memberProjections) {
			if (memberProjection.getMember() != null)
				memberIdlist.add(memberProjection.getMember().getEId());
		}
		return memberIdlist;
	}

	@Override
	public int deleteMemberProjection(Long memberId, Long memberGroupId) {
		try {
			return this.memberProjectionDao.deleteMemberProjectionByIds(memberId, memberGroupId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteMemberProjection", e.getMessage(), e);
		}
	}

	@Override
	public MemberProjection findMemberProjectionById(Long memberProjectionId) {
		try {
			return this.memberProjectionDao.findMemberProjectionById(memberProjectionId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findMemberProjectionById", e.getMessage(), e);
		}
	}

	@Override
	public EntitySet<MemberProjection> getMemberProjectByIds(Long memberId, Long memberGroupId) {
		try {
			EntitySet<MemberProjection> memberProjections = this.memberProjectionDao.getMemberProjectIdByIds(memberId,
					memberGroupId);
			EntitySet<MemberProjection> getMemberProjections = new EntitySet<MemberProjection>();
			if (memberProjections != null) {
				for (MemberProjection memberProjection : memberProjections) {
					getMemberProjections.add(this.addMemberProjectionReference(memberProjection));
				}
			}
			return getMemberProjections;

		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("getMemberProjectIdByIds", e.getMessage(), e);
		}
	}

	private MemberProjection addMemberProjectionReference(MemberProjection memberProjection) {
		if (memberProjection.getMember() != null) {
			memberProjection.getMember().getName();
		}
		if (memberProjection.getMemberGroup() != null) {
			memberProjection.getMemberGroup().getName();
		}
		if (memberProjection.getMemberType() != null) {
			memberProjection.getMemberType().getTypeName();
		}
		return memberProjection;
	}

	@Override
	public boolean saveMemberProjection(Member member, MemberGroup memberGroup, EntitySet<MemberType> memberTypes) {
		try {
			if (member == null || memberGroup == null || memberTypes == null) {
				return false;
			}
			for (MemberType memberType : memberTypes) {
				Boolean isExsist = judeIsExsist(member, memberGroup, memberType);
				if (!isExsist) {
					MemberProjection saveMemberPro = this.addMemberProjection(member, memberGroup, memberType);
					if (saveMemberPro == null)
						return false;
				} else {
					this.deleteMemberProjection(member.getEId(), memberGroup.getEId());
					MemberProjection saveMemberPro = this.addMemberProjection(member, memberGroup, memberType);
					if (saveMemberPro == null)
						return false;
				}
			}
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveMemberProjection", e.getMessage(), e);
		}
	}

	@Override
	public LoginUser changeGroupProjection(Long memberGroupEId) {
		try {
			MemberGroup memberGroup = this.findMemberGroupById(memberGroupEId);
			LoginUser loginUser = this.getLoginUser();

			// 设置当前组
			loginUser.setCurrentGroup(memberGroup);

			// 设置当前角色（前台）
			MemberProjection projection = this.memberProjectionDao
					.findProjectionByMemberAndGroup(loginUser.getLoginVip().getEId(), memberGroup);
			MemberType currentType = projection.getMemberType();
			
			// 处理权限点
			Set<String> permissionsCode = new HashSet<String>();
			loginUser.setUserPermissionsCode(permissionsCode);
			EntitySet<Role> roles = currentType.getRoles();
			for(Role role: roles) {
				for (Permission permission : role.getPermissions()) {
					permissionsCode.add(permission.getCode());
				}
			}
			
			
			// 设置当前角色类型
			loginUser.setMemberType(currentType);

			this.removeLoginUser();
			this.setLoginUser(loginUser);
			return loginUser;
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("changeGroupProjection", e.getMessage(), e);
		}

	}

	@Override
	public EntitySet<MemberGroup> findMemberGroupByOrg(Organization organization) {
		try {
			return memberProjectionDao.findMemberGroupByOrg(organization.getEId());
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findMemberGroupByOrg", e.getMessage(), e);
		}
	}
	
	@Override
	public MemberGroup findGroupByOrgIdAndGroupName(Long organizationId,String memberGroupName) {
		try {
			return this.memberGroupDao.findGroupByOrgIdAndGroupName(organizationId,memberGroupName);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findGroupByOrgIdAndGroupName", e.getMessage(), e);
		}
	}
	
	@Override
	public MemberGroup findMemberGroupByCode(String code) {
		try {
			return this.memberGroupDao.findMemberGroupByCode(code);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findMemberGroupByCode", e.getMessage(), e);
		}
	}
}

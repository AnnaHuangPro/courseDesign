package ddd.simple.service.member.impl;

import java.util.Date;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.base.util.EntityUtil;
import ddd.simple.service.base.BaseService;
import ddd.simple.entity.member.MemberType;
import ddd.simple.entity.memberGroup.MemberGroup;
import ddd.simple.entity.memberProjection.MemberProjection;
import ddd.simple.entity.permission.Role;
import ddd.simple.dao.member.MemberTypeDao;
import ddd.simple.dao.memberProjection.MemberProjectionDao;
import ddd.simple.service.member.MemberTypeService;
import ddd.simple.service.memberGroup.MemberGroupService;

@Service
public class MemberTypeServiceBean extends BaseService implements MemberTypeService
{

	@Resource(name="memberTypeDaoBean")
	private MemberTypeDao memberTypeDao;
	
	@Resource(name = "memberProjectionDaoBean")
	private MemberProjectionDao memberProjectionDao;
	
	@Resource(name = "memberGroupServiceBean")
	private MemberGroupService memberGroupService;
	
	@Override
	public MemberType saveMemberType(MemberType memberType) 
	{
		try {
			Date operateDate = new Date();
			memberType.setOperateDate(operateDate);
			Long eid = memberType.getEId();
			if(eid != null && this.memberTypeDao.findMemberTypeById(eid) != null){
				memberType = this.memberTypeDao.updateMemberType(memberType);
			}
			else{
				memberType = this.memberTypeDao.saveMemberType(memberType);
			}
			return memberType;
		}catch(DDDException e){
			throw e;
		}catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveMemberType", e.getMessage(), e);
		}
	}

	@Override
	public int deleteMemberType(MemberType memberType) {
		try {
//			if(memberType==null)
//				return -1;
//			Long defaultMemberTypeId = Long.parseLong(Config.get("defaultMemberTypeId"));
//			int result = 0;
//			if(defaultMemberTypeId!=null){
//				EntitySet<MemberProjection> memberProjections = memberProjectionDao.findMemberProsByTypeId(memberType.getEId());
//				MemberType defalutMemberType = memberTypeDao.findMemberTypeById(defaultMemberTypeId);
//				this.reValueMemberProjection(memberProjections,defalutMemberType);
//				result = this.memberTypeDao.deleteMemberType(memberType);
//			}
//			return result;
			return this.memberTypeDao.deleteMemberType(memberType);
			
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteMemberType", e.getMessage(), e);
		}
	}

	private void reValueMemberProjection(EntitySet<MemberProjection> memberProjections,MemberType defalutMemberType) {
		if(memberProjections.size()<=0)
			return;
		for (MemberProjection memberProjection:memberProjections) {
			memberProjection.setMemberType(defalutMemberType);
			try {
				memberProjectionDao.updateMemberProjection(memberProjection);
			} catch (Exception e) {
				e.printStackTrace();
				throw new DDDException("reValueMemberProjection", e.getMessage(), e);
			}
		}
	}

	@Override
	public MemberType updateMemberType(MemberType memberType) {
		try {
			Date operateDate = new Date();
			memberType.setOperateDate(operateDate);
			return this.memberTypeDao.updateMemberType(memberType);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateMemberType", e.getMessage(), e);
		}
	}

	@Override
	public MemberType findMemberTypeById(Long memberTypeId) {
		try {
			MemberType memberType = this.memberTypeDao.findMemberTypeById(memberTypeId);
			if(memberType.getRoles()!= null)
			{
				//触发懒加载
				for(Role role: memberType.getRoles()) {
					role.getName();
				}
			}
			return memberType;
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findMemberTypeById", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<MemberType> findAllMemberType() {
		try{
			return this.memberTypeDao.findAllMemberType();
		}catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllMemberType", e.getMessage(), e);
		}
	}

	@Override
	public MemberType findMemberTypeByCode(String code)
	{
		try{
			return this.memberTypeDao.findMemberTypeByCode(code);
		}catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findMemberTypeByCode", e.getMessage(), e);
		}
	}
	@Override
	public EntitySet<MemberType> findMemberTypeByRoleId(Long roleId) throws Exception{
		return this.memberTypeDao.findMemberTypeByRoleId(roleId);
	}
		
	
	@Override
	public int deleteMemberTypeByRoleId(Long roleId) throws Exception{
		for(MemberType memberType : this.findMemberTypeByRoleId(roleId)){
			this.memberProjectionDao.deleteByMemberTypeId(memberType.getEId());
		}
		return this.memberTypeDao.deleteByRoleId(roleId);
	}

	@Override
	public MemberType findMemberTypeByGroupId(Long memberGroupId) throws Exception {
		MemberType memberType = this.memberTypeDao.findMemberTypeByGroupId(memberGroupId);
		
		//如果当前会员组的默认会员类型为空，则为其新建默认会员类型
		if(memberType == null) {
			MemberGroup memberGroup = this.memberGroupService.findMemberGroupById(memberGroupId);
			memberType = new MemberType();
			memberType.setTypeName(memberGroup.getName()+"会员类型");
			memberType.setMemberGroup(memberGroup);
			memberType = this.saveMemberType(memberType);
			EntityUtil.loadLazyProperty(memberType, "memberGroup");
			EntityUtil.loadLazyProperty(memberType, "memberGroup.name");
		}
		memberType.getRoles();
		return memberType;
	}

	@Override
	public int deleteMemberTypeByGroupId(Long memberGroupId) throws Exception {
		return this.memberTypeDao.deleteByRoleId(memberGroupId);
	}
	
	@Override
	public EntitySet<MemberType> findMemberTypeByMemberId(Long memberId,String deptCode) throws Exception{
		try {
			return this.memberTypeDao.findMemberTypeByMemberId(memberId,deptCode);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findMemberTypeByMemberId", e.getMessage(), e);
		}
	}
}

package ddd.simple.service.member;

import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseServiceInterface;
import ddd.simple.entity.member.MemberType;

public interface MemberTypeService extends BaseServiceInterface
{
	public MemberType saveMemberType(MemberType memberType) ;
	
	public int deleteMemberType(MemberType memberType) ;
	
	public MemberType updateMemberType(MemberType memberType) ;
	
	public MemberType findMemberTypeById(Long memberTypeId) ;
	
	public EntitySet<MemberType> findAllMemberType() ;
	
	public MemberType findMemberTypeByCode(String code);

	public EntitySet<MemberType> findMemberTypeByRoleId(Long roleId) throws Exception;

	public int deleteMemberTypeByRoleId(Long roleId) throws Exception;
	
	public MemberType findMemberTypeByGroupId(Long memberGroupId) throws Exception;
	
	public int deleteMemberTypeByGroupId(Long memberGroupId) throws Exception;

	public EntitySet<MemberType> findMemberTypeByMemberId(Long memberId, String deptCode) throws Exception;

}
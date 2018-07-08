package ddd.simple.dao.memberGroup;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDaoInterface;
import ddd.simple.entity.memberGroup.MemberGroup;

public interface MemberGroupDao extends BaseDaoInterface
{
	public MemberGroup saveMemberGroup(MemberGroup memberGroup) throws Exception;
	
	public int deleteMemberGroup(MemberGroup memberGroup) throws Exception;
	
	public MemberGroup updateMemberGroup(MemberGroup memberGroup) throws Exception;
	
	public MemberGroup findMemberGroupById(Long memberGroupId) throws Exception;
	
	public EntitySet<MemberGroup> findAllMemberGroup() throws Exception;
	
	public MemberGroup findMemberGroupByCode(String code) throws Exception;

	public MemberGroup findGroupByOrgIdAndGroupName(Long organizationId, String memberGroupName) throws Exception;

}

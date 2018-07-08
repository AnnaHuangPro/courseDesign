package ddd.simple.dao.memberGroup.impl;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;
import org.springframework.stereotype.Service;
import ddd.simple.entity.memberGroup.MemberGroup;
import ddd.simple.dao.memberGroup.MemberGroupDao;

@Service
public class MemberGroupDaoBean extends BaseDao implements MemberGroupDao
{
	@Override
	public MemberGroup saveMemberGroup(MemberGroup memberGroup)  throws Exception{
		return this.save(memberGroup);
	}

	@Override
	public int deleteMemberGroup(MemberGroup memberGroup)  throws Exception{
		return this.delete(memberGroup);
	}

	@Override
	public MemberGroup updateMemberGroup(MemberGroup memberGroup)  throws Exception{
		return this.update(memberGroup);
	}

	@Override
	public MemberGroup findMemberGroupById(Long memberGroupId)  throws Exception{
		return this.query(memberGroupId, MemberGroup.class);
	}
	
	@Override
	public EntitySet<MemberGroup> findAllMemberGroup() throws Exception {
		return this.query("1=1",MemberGroup.class);
	}

	@Override
	public MemberGroup findGroupByOrgIdAndGroupName(Long organizationId, String memberGroupName) throws Exception{
		return this.queryOne("organizationId = "+organizationId+" and name = '"+memberGroupName+"'", MemberGroup.class);
	}

	@Override
	public MemberGroup findMemberGroupByCode(String code) throws Exception
	{
		return this.queryOne("inputCode = '"+code+"'",MemberGroup.class);
	}
}

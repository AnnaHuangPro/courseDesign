package ddd.simple.dao.memberProjection.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;
import ddd.simple.dao.memberProjection.MemberProjectionDao;
import ddd.simple.entity.member.Member;
import ddd.simple.entity.memberGroup.MemberGroup;
import ddd.simple.entity.memberProjection.MemberProjection;

@Service
public class MemberProjectionDaoBean extends BaseDao implements MemberProjectionDao
{
	@Override
	public MemberProjection saveMemberProjection(MemberProjection memberProjection) throws Exception
	{
		return this.save(memberProjection);
	}
	
	@Override
	public int deleteMemberProjection(Long memberProjectionId) throws Exception
	{
		return this.deleteById(memberProjectionId, MemberProjection.class);
	}
	
	@Override
	public MemberProjection updateMemberProjection(MemberProjection memberProjection) throws Exception
	{
		return this.update(memberProjection);
	}
	
	@Override
	public MemberProjection findMemberProjectionById(Long memberProjectionId) throws Exception
	{
		return this.query(memberProjectionId, MemberProjection.class);
	}
	
	@Override
	public EntitySet<MemberProjection> findAllMemberProjection() throws Exception
	{
		return this.query("1=1", MemberProjection.class);
	}
	
	@Override
	public EntitySet<MemberProjection> findProjectionByMember(Long memberId) throws Exception
	{
		if (memberId == null || memberId.equals("0"))
		{
			return null;
		}
		String sql = "1 != 1 or memberId = '" + memberId + "'";
		return this.query(sql, MemberProjection.class);
	}
	
	@Override
	public EntitySet<MemberProjection> findMemberProsByGroupId(Long memberGroupId) throws Exception
	{
		String sqlCheck = "memberGroupId = " + memberGroupId + "";
		return this.query(sqlCheck, MemberProjection.class);
	}
	
	@Override
	public EntitySet<MemberProjection> findMemberProsByTypeId(Long memberTypeId) throws Exception
	{
		String sqlCheck = "memberTypeId = " + memberTypeId + "";
		return this.query(sqlCheck, MemberProjection.class);
	}
	
	@Override
	public int deleteMemberProjectionByIds(Long memberId, Long memberGroupId) throws Exception
	{
		String where = "memberId = " + memberId + " and memberGroupId = " + memberGroupId + "";
		return this.deleteByWhere(where, MemberProjection.class);
	}
	
	@Override
	public int deleteMemberProjectionByMember(Long memberId) throws Exception
	{
		if (memberId == null || memberId.equals("0"))
		{
			return 0;
		}
		String where = "memberId = ( select m.EId from member m where 1 != 1 or EId = '" + memberId + "'";
		return this.deleteByWhere(where + ")", MemberProjection.class);
	}
	
	@Override
	public EntitySet<MemberProjection> getMemberProjectIdByIds(Long memberId, Long memberGroupId) throws Exception
	{
		String where = "memberId = " + memberId + " and memberGroupId = " + memberGroupId + "";
		return this.query(where, MemberProjection.class);
	}
	
	@Override
	public EntitySet<MemberGroup> findMemberGroupByOrg(Long organizationId) throws Exception
	{
		String where = "organizationId = " + organizationId;
		return this.query(where, MemberGroup.class);
	}
	
	@Override
	public EntitySet<MemberProjection> getMemberProjectIdByIds(Long memberId, Long memberGroupId, Long memberTypeId) throws Exception
	{
		String where = "memberId = " + memberId + " and memberGroupId = " + memberGroupId + " and memberTypeId = " + memberTypeId + "";
		return this.query(where, MemberProjection.class);
	}
	
	@Override
	public EntitySet<MemberProjection> findProjectionsByMemberAndGroup(Long memberId, EntitySet<MemberGroup> groups) throws Exception
	{
		if (groups.isEmpty())
			return null;
		String where = "memberId='" + memberId + "' and memberGroupId in (";
		for (MemberGroup group : groups)
		{
			where += group.getEId() + ",";
		}
		where = StringUtils.removeEnd(where, ",");
		where += ")";
		return this.query(where, MemberProjection.class);
	}

	@Override
	public int deleteByMemberTypeId(Long memberTypeId) throws Exception
	{
		String where = "memberTypeId = " + memberTypeId;
		return this.deleteByWhere(where, MemberProjection.class);
	}

	@Override
	public MemberProjection findProjectionByMemberAndGroup(Long memberId, MemberGroup group) throws Exception {
		if (group == null || memberId == null)
			return null;
		String where = "memberId='" + memberId + "' and memberGroupId = " + group.getEId();
		
		return this.queryOne(where, MemberProjection.class);
	}
}

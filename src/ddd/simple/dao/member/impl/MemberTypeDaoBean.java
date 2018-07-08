package ddd.simple.dao.member.impl;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;
import org.springframework.stereotype.Service;
import ddd.simple.entity.member.MemberType;
import ddd.simple.entity.permission.Role;
import ddd.simple.dao.member.MemberTypeDao;

@Service
public class MemberTypeDaoBean extends BaseDao implements MemberTypeDao {

	@Override
	public MemberType saveMemberType(MemberType memberType) throws Exception {
		return this.save(memberType);
	}

	@Override
	public int deleteMemberType(MemberType memberType) throws Exception {
		return this.delete(memberType);
	}

	@Override
	public MemberType updateMemberType(MemberType memberType) throws Exception {
		return this.update(memberType);
	}

	@Override
	public MemberType findMemberTypeById(Long memberTypeId) throws Exception {
		return this.query(memberTypeId, MemberType.class);
	}

	@Override
	public EntitySet<MemberType> findAllMemberType() throws Exception {
		return this.query("1=1", MemberType.class);
	}

	@Override
	public MemberType findMemberTypeByCode(String code) throws Exception {
		return this.queryOne("inputCode = '" + code + "'", MemberType.class);
	}

	@Override
	public EntitySet<MemberType> findMemberTypeByRoleId(Long roleId) throws Exception {
		return this.query("roleId = " + roleId, MemberType.class);
	}

	@Override
	public int deleteByRoleId(Long roleId) throws Exception {
		String where = "roleId = " + roleId;
		return this.deleteByWhere(where, MemberType.class);
	}

	@Override
	public MemberType findMemberTypeByGroupId(Long memberGroupId) throws Exception {
		return this.queryOne("memberGroupId = '" + memberGroupId + "'", MemberType.class);
	}

	@Override
	public int deleteMemberTypeByGroupId(Long memberGroupId) throws Exception {
		String where = "memberGroupId = " + memberGroupId;
		return this.deleteByWhere(where, MemberType.class);
	}

	/**
	 * @author 林园 @date 2016年7月27日 下午9:13:46 @Title:
	 *         findMemberTypeByMemberId @Description:
	 *         TODO(这里用一句话描述这个方法的作用) @param @param memberId @param @param
	 *         deptCode @param @return @param @throws Exception 设定文件 @throws
	 */
	@Override
	public EntitySet<MemberType> findMemberTypeByMemberId(Long memberId, String deptCode) throws Exception {
		String sql = "select * from MemberType m where m.eid in "
				+ "(select distinct mp.memberTypeId from Memberprojection mp where mp.memberId ='" + memberId + "' and "
				+ " mp.memberGroupId in (select mg.EId from membergroup mg where mg.organizationId in ( "
				+ " select o.eid from organization o where o.code = '" + deptCode + "'" + ")" + ")" + ")";
		return this.queryBySql(sql, MemberType.class);
	}
}

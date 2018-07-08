package  ddd.simple.dao.member;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDaoInterface;
import ddd.simple.entity.member.Member;

public interface MemberDao extends BaseDaoInterface
{
	public Member saveMember(Member member) throws Exception;
	
	public int deleteMember(Long memberId) throws Exception;
	
	public Member updateMember(Member member) throws Exception;
	
	public Member findMemberById(Long memberId) throws Exception;
	
	public EntitySet<Member> findAllMember() throws Exception;
	
	public Member findMemberByOnlyCodeAndPassword(String onlyCode,String password) throws Exception;
	
	public Member checkOrganization(String onlyCode,String password) throws Exception;

	public Member editPassword(Long memberId, String oldPassword, String newPassword);

	public Member findMemberByOnlyCode(String onlyCode) throws Exception;

	public Member findMemberByCkeyAndPassword(String ckey, String password) throws Exception;

	public Member findMemberByEmailAndPassword(String email, String password) throws Exception;

	public Member findMemberByNameAndPassword(String name, String password) throws Exception;
}

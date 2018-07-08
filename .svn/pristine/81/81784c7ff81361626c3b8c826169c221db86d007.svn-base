package  ddd.simple.service.member;

import java.util.Map;

import org.springframework.expression.spel.ast.Projection;

import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseServiceInterface;
import ddd.simple.entity.member.Member;
import ddd.simple.entity.member.MemberType;
import ddd.simple.entity.memberGroup.MemberGroup;
import ddd.simple.entity.memberProjection.MemberProjection;
import ddd.simple.entity.permission.LoginUser;

public interface MemberService extends BaseServiceInterface
{
	public Member saveMember(Member member) throws Exception ;
	
	public int deleteMember(Member member) throws Exception;
	
	public Member updateMember(Member member) throws Exception;
	
	public Member findMemberById(Long memberId) throws Exception;
	
	public EntitySet<Member> findAllMember() throws Exception ;
	
	public Member findMemberByOnlyCodeAndPassword(String OnlyCode, String password) throws Exception;
	
	public Map<String, Object> checkOrganization(String OnlyCode, String password,MemberGroup group) throws Exception;

	public Member findMemberInfo(Long memberId) throws Exception;
 
	public Member updateMemberInfo(Member member) throws Exception ;

	public Map<String, Object> editPassword(String oldPassword,String newPassword) throws Exception;

	public EntitySet<MemberGroup> searchGroup(String OnlyCode) throws Exception;

	public boolean isDistribution(Member member) throws Exception;

	Map<String, Object> checkOrganization(String onlycode,MemberGroup currentGroup);

	public Map<String, Object> getCurrentLoginUser() throws Exception;
	
	public LoginUser turnToLoginUser(Member member, MemberGroup currentGroup) throws Exception;
	
	public Member getMemberByOnlyCode(String onlyCode) throws Exception;
	
	public EntitySet<MemberProjection> distributionDefault(Member member) throws Exception;

	public Member findMemberByEmailAndPassword(String email, String password);

	public Member findMemberByCkeyAndPassword(String ckey, String password);

	public Member findMemberByNameAndPassword(String name, String password);

	public MemberType getDefaultMemberTypeInSchool();
	
	public Member addMember(Member member,EntitySet<MemberProjection> projections);
	
	public EntitySet<MemberProjection> findProjectionByMemberId(Long memberId);

	public Member updateMember(Member member, EntitySet<MemberProjection> projections);

	public LoginUser ChangeGroup(MemberGroup currentGroup);

		
}
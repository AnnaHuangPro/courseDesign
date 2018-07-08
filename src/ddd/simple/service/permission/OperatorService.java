package ddd.simple.service.permission;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import ddd.base.helper.RedirectPage;
import ddd.base.persistence.EntitySet;
import ddd.simple.entity.member.Member;
import ddd.simple.entity.organization.Organization;
import ddd.simple.entity.permission.Operator;
import ddd.simple.entity.permission.Role;
import ddd.simple.service.base.BaseServiceInterface;


public interface OperatorService extends BaseServiceInterface{

	public Operator saveOperator(Operator operator)throws Exception;

	public int deleteOperator(Long operatorId)throws Exception;

	public Operator updateOperator(Operator operator)throws Exception;

	public Operator findOperatorById(Long operatorId)throws Exception;

	public EntitySet<Operator> findAllOperators()throws Exception;
	
	public Operator findOperatorByCode(String operatorCode)throws Exception;
	
	public ArrayList<Organization> searchOrganization(String operatorCode)throws Exception;

	public Map<String, Object> checkLoginUser(String operatorCode,String operatorPassword,Organization organization) throws Exception;
	
	public boolean checkOperator(String operatorCode,String operatorPassword)throws Exception;
	
	public Integer distributionRole(Long operatorId,EntitySet<Role> roles,Long organizationId) throws Exception;

	public Integer copyOperator(List<Long> sourceEIds, List<Long> targetEIds) throws Exception;

	public Integer changePasswd(Long operatorId, String newPasw, String oldPasw) throws Exception;

	public Operator memberToOperator(Member member);
	
	public RedirectPage SSO(String userKey);
	
	public Map<String, Object> checkSSO(Long operatorId);
	
	public Operator findOperatorByEmployeeId(Long employeeId);
}

package ddd.simple.action.permission;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;

import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.base.util.SpringContextUtil;
import ddd.simple.entity.member.Member;
import ddd.simple.entity.memberGroup.MemberGroup;
import ddd.simple.entity.permission.Operator;
import ddd.simple.service.member.MemberService;
import ddd.simple.service.permission.OperatorService;
import ddd.simple.util.CommonTools;

@Action
@RequestMapping("/VipLogin")
@Controller
public class VipLoginAction
{
	private CommonTools commonTools;
	@Resource(name = "memberServiceBean")
	private MemberService memberService;
	@Resource(name = "operatorServiceBean")
	private OperatorService operatorService;
	
	public Map<String, Object> vipLogin(String onlyCode, String password) throws Exception
	{
		try
		{
			commonTools = (CommonTools)SpringContextUtil.getBean("commonTools");
			Map<String, Object> result = new HashMap<String, Object>();
			result.put("isSuccess", false);
			//采用md5加密
			if (password.length() != 32) {
				return new HashMap<String, Object>();
			}
			Member member = null;
			if (commonTools.checkEmail(onlyCode)) {
				member = this.memberService.findMemberByEmailAndPassword(onlyCode, password);
			}else if(commonTools.isCard(onlyCode)){
				member = this.memberService.findMemberByCkeyAndPassword(onlyCode, password);
			}else{
				member =  this.memberService.findMemberByOnlyCodeAndPassword(onlyCode, password);			
			}
			if (member == null){
				member =  this.memberService.findMemberByNameAndPassword(onlyCode, password);			
			}
			if (member != null)
			{
				result.put("isSuccess", true);
				result.put("onlyCode", member.getOnlyCode());
				result.put("groups", this.memberService.searchGroup(member.getOnlyCode()));
			}
			return result;
		} catch (DDDException e)
		{
			throw new DDDException("会员登录失败");
		}
	}
	
	public Map<String, Object> checkOrganization(String onlyCode, String password, MemberGroup group) throws Exception
	{
		return this.memberService.checkOrganization(onlyCode, password, group);
	}
	
	public EntitySet<MemberGroup> searchGroup(String onlyCode) throws Exception
	{
		try
		{
			return this.memberService.searchGroup(onlyCode);
		} catch (DDDException e)
		{
			throw e;
		}
	}
	
	public Operator getAdminPermisson(String onlyCode) throws Exception
	{
		try
		{
			return this.operatorService.findOperatorByCode(onlyCode);
		} catch (DDDException e)
		{
			throw e;
		}
	}
	
	public void vipLoginOut(HttpServletRequest request) throws Exception
	{
		this.memberService.removeLoginUser();
	}
}

package ddd.simple.action.permission;

import java.util.ArrayList;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import ddd.base.annotation.Action;
import ddd.base.annotation.RequestMapping;
import ddd.base.exception.DDDException;
import ddd.base.helper.RedirectPage;
import ddd.simple.entity.organization.Organization;
import ddd.simple.service.permission.OperatorService;
import ddd.simple.service.taskManageModel.TaskManageService;


@Action
@RequestMapping("/Login")
@Controller
public class LoginAction {
	
	@Autowired 
	private HttpServletRequest request;
	
	@Resource(name="operatorServiceBean")
	private OperatorService operatorService;
	
	@Resource(name="taskManageServiceBean")
	private TaskManageService taskManageService;
	
	public Map<String, Object> checkLoginUser(String operatorCode,String operatorPassword,Organization organization)throws Exception
	{
		try {
				Map<String, Object> loginMap = this.operatorService.checkLoginUser(operatorCode, operatorPassword,organization);
				return loginMap;
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public boolean checkOperator(String operatorCode,String operatorPassword) throws Exception{
		if(operatorCode == null || "".equals(operatorCode) || operatorPassword.length() != 32 || operatorPassword == null || "".equals(operatorPassword)){
			return false;
		}else{
			return this.operatorService.checkOperator(operatorCode, operatorPassword);
		}
	}
	
	public ArrayList<Organization> searchOrganization(String operatorCode) throws Exception{
		try {
			return this.operatorService.searchOrganization(operatorCode);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	public RedirectPage SSO(String userKey){                      
		try {
			return this.operatorService.SSO(userKey);
		} catch (DDDException e) {
			throw e;
		}
	}
	public Map<String, Object> checkSSO(Long operatorId){                      
		try {
			return this.operatorService.checkSSO(operatorId);
		} catch (DDDException e) {
			throw e;
		}
	}
	
	public void loginOut(HttpServletRequest request)
	{
		try {
			request.getSession().removeAttribute("loginUser");
		} catch (DDDException e) {
			throw e;
		}
	}
	
}

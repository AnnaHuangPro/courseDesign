package ddd.simple.service.base;

import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ddd.base.persistence.EntitySet;
import ddd.base.persistence.SessionFactory;
import ddd.base.persistence.baseEntity.Entity;
import ddd.simple.entity.log.Log;
import ddd.simple.entity.organization.Department;
import ddd.simple.entity.organization.Organization;
import ddd.simple.entity.permission.LoginUser;
import ddd.simple.entity.permission.Operator;
import ddd.simple.entity.permission.Role;
import ddd.simple.entity.student_module.Student;
import ddd.simple.entity.teacher_module.Teacher;
import ddd.simple.service.log.LogService;
import ddd.simple.service.student_module.StudentService;
import ddd.simple.service.teacher_module.TeacherService;

/**
 * @author Administrator
 *
 */
@Service
public class BaseService implements BaseServiceInterface{
	@Autowired 
	private HttpServletRequest request;
	@Resource(name="logServiceBean")
	private LogService logService;
	@Resource(name="teacherServiceBean")
	private TeacherService teacherService;
	
	@Resource(name="studentServiceBean")
	private StudentService studentService;
	
	
	public boolean setSessionItem(String key,Object value){
		if (request != null && request.getSession() != null) {
			 request.getSession().setAttribute(key, value);
			 return true;
		}
		return false;
	}
	public Object getSessionItem(String key){
		if (request != null && request.getSession() != null) {
			return request.getSession().getAttribute(key);
		}
		return null;
	}
	public boolean removeSessionItem(String key){
		if (request != null && request.getSession() != null) {
			 request.getSession().removeAttribute(key);
		}
		return true;
	}
	/**
	 * 获取登录用户
	 */
	public LoginUser getLoginUser(){
		
		try
		{	
			Object loginUser = this.getSessionItem("loginUser");
			return loginUser == null ? null : (LoginUser)loginUser;
		}catch(IllegalStateException e)
		{
			//如果此方法不是由前台请求，而是在启动时，或者定时服务，就没有登陆信息
			return null; 
		}
	}
	/**
	 * 获取登录用户的单位
	 */
	public Organization getOrganization(){
		LoginUser loginUser = this.getLoginUser();
		if(loginUser != null )
		{
			return loginUser.getCurrentOrganization();
		}
		return null;
	}
	/**
	 * 获取登录用户的部门
	 */
	public Department getDepartment(){
		LoginUser loginUser =  this.getLoginUser();
		if(loginUser != null){
			Operator operator = loginUser.getLoginOperator();
			return operator == null ? null : operator.getEmployee().getDepartment();
		}
		return null;
	}

	/*public Boolean setLoginUser(LoginUser loginUser) {
		request.getSession().setAttribute("loginUser", loginUser);
		String userIp =request.getRemoteAddr();
		request.getSession().setAttribute("userIp", userIp);
	}*/
	
	/**
	 * 获取登录用户的IP
	 */
	public String getLoginUserIp(){
		return this.getIpAddr(request);
	}
	
	public String getIpAddr(HttpServletRequest request) { 
		 String ip = request.getHeader("x-forwarded-for");
	       if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
	           ip = request.getHeader("Proxy-Client-IP");
	       }
	       if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
	           ip = request.getHeader("WL-Proxy-Client-IP");
	       }
	       if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
	           ip = request.getRemoteAddr();
	       }
	       return ip;
	}
	
	/**
	 * 获取登录用户的角色Id
	 */
	public Long getTeacherIdLogin(){
		try
		{	
			Object teacher = this.getSessionItem("teaId");
			return teacher == null ? null : (Long)teacher;
		}catch(IllegalStateException e)
		{
			//如果此方法不是由前台请求，而是在启动时，或者定时服务，就没有登陆信息
			return null; 
		}
	}
	
	//添加当前操作人员登录人的ID（如teacher的teaId）
	public void setTeacherId(LoginUser loginUser){
		Long operatorEId = loginUser.getEId();
		Teacher teacher = teacherService.findTeacherByOperator(operatorEId);
		Long teaId = teacher.getEId();
		this.setSessionItem("teaId", teaId);
	}
	

	/**
	 * 获取登录用户的角色Id
	 */
	public Long getStudentIdLogin(){
		try
		{	
			Object stuId = this.getSessionItem("stuId");
			return stuId == null ? null : (Long)stuId;
		}catch(IllegalStateException e)
		{
			//如果此方法不是由前台请求，而是在启动时，或者定时服务，就没有登陆信息
			return null; 
		}
	}

	
	/**
	 * 设置登录用户
	 */
	public void setLoginUser(LoginUser loginUser){
		//添加当前操作人员登录人的ID（如teacher的teaId）
		Long operatorEId = loginUser.getEId();
		EntitySet<Role> roles = loginUser.getUserRoles();
		String loginRoleCodes = "";
		for(Role role : roles)
		{
			loginRoleCodes += "[" + role.getCode()+"]," ;
		}
		//添加当前操作人员登录人的ID（如teacher的teaId）
		if(loginRoleCodes.indexOf("teacher") > 0){
			Teacher teacher = teacherService.findTeacherByOperator(operatorEId);
			Long teaId = teacher.getEId();
			this.setSessionItem("teaId", teaId);
		}
		if(loginRoleCodes.indexOf("student") > 0){
			Student student = studentService.findStudentByOperator(operatorEId);
			Long stuId = student.getEId();
			this.setSessionItem("stuId", stuId);
		}
		this.setSessionItem("loginUser", loginUser);
	}
	/**
	 * 设置登录会员
	 */
	public void setVipLogin(Object vipLogin){
		this.setSessionItem("vipLogin", vipLogin);
	}
	/**
	 * 写日志
	 */
	public void doLog(Log log){
		 logService.saveLog(log);
	}
	/**
	 * @param logType 日志类型
	 * @param operationName 操作名称
	 * @param entityClasses 操作中用到的实体
	 * @param operationContent 操作内容
	 * @param remark 操作备注
	 * @return 保存后的日志记录
	 */
	public void doLog(String logType,String operationName,
			Class[] clazzs,String operationContent,String remark){
		Log log = new Log();
		log.setLogDate(new Date());
		LoginUser loginUser = (LoginUser) this.getLoginUser();
		
		if(loginUser != null && loginUser.getLoginOperator() != null)
		{
			log.setOperator(loginUser.getLoginOperator().getName());
			log.setOperatorCode(loginUser.getLoginOperator().getCode());
			log.setIpAddress(this.getLoginUserIp());
		}
		
		log.setLogType(logType);
		log.setOperationName(operationName);
		StringBuffer entityClassNames = new StringBuffer();
		
		for (Class clazz : clazzs) {
			entityClassNames.append(clazz.getName());
			entityClassNames.append("  ");
		}
		log.setEntityClassName(entityClassNames.toString());
		log.setOperationContent(operationContent);
		log.setRemark(remark);
		log.setOperateDate(new Date());
		this.logService.saveLog(log);
	}
	
	/**
	 * @param logType 日志类型
	 * @param operationName 操作名称
	 * @param entityClass 操作中用到的实体
	 * @param operationContent 操作内容
	 * @param remark 操作备注
	 * @return 保存后的日志记录
	 */
	public void doLog(String logType,String operationName,Class entityClass,String operationContent,String remark){
		this.doLog(logType, operationName, new Class[]{entityClass}, operationContent, remark);
	}
	
	public void doLog(Class clazz,String operationContent,String operationName){
		String entityName=SessionFactory.getEntityClass(clazz).getEntityInfo().getLabel();
		this.doLog("用户日志", operationName, new Class[]{clazz}, operationContent+entityName, "");
	}
	
	/**
	 * 设置当前操作的人员和日期
	 */
	public void initEntity(Entity entity){
		if(entity.getOperatorCode()==null){
			entity.setOperateDate(new Date());
			if(this.getOrganization() != null){
				entity.setOrgId(this.getOrganization().getEId());
				if(getLoginUser() != null  && getLoginUser().getLoginOperator() != null){
					entity.setOperatorCode(getLoginUser().getLoginOperator().getCode());
				}
			}
		}
	}
 
	/* (非 Javadoc) 
	* <p>Title: setCurrentOperateInfo</p> 
	* <p>Description: </p> 
	* @param entity 
	* @see ddd.simple.service.base.BaseServiceInterface#setCurrentOperateInfo(ddd.base.persistence.baseEntity.Entity) 
	*/
	@Override
	public void setCurrentOperateInfo(Entity entity)
	{
		// TODO Auto-generated method stub
		
	}
	/* (非 Javadoc) 
	* <p>Title: removeLoginUser</p> 
	* <p>Description: </p>  
	* @see ddd.simple.service.base.BaseServiceInterface#removeLoginUser() 
	*/
	@Override
	public void removeLoginUser()
	{
		// TODO Auto-generated method stub
		this.removeSessionItem("loginUser");
	}

}
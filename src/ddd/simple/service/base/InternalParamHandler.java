/**
* @Title: InternalParamHandler.java
* @Package ddd.simple.service.base
* @Description: TODO(用一句话描述该文件做什么)
* @author matao@cqrainbowsoft.com
* @date 2015年9月21日 上午11:50:06
* @version V1.0
*/
package ddd.simple.service.base;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ddd.base.persistence.EntitySet;
import ddd.base.util.SpringContextUtil;
import ddd.simple.entity.member.Member;
import ddd.simple.entity.organization.Employee;
import ddd.simple.entity.permission.Role;
import ddd.simple.entity.teacher_module.Teacher;
import ddd.simple.service.student_module.StudentService;
import ddd.simple.service.student_module.impl.StudentServiceBean;
import ddd.simple.service.teacher_module.TeacherService;
import ddd.simple.service.teacher_module.impl.TeacherServiceBean;

/**
 * 项目名称：DDD3
 * 类名称：InternalParamHandler
 * 类描述：   
 * 创建人：AnotherTen
 * 创建时间：2015年9月21日 上午11:50:06
 * 修改人：胡均
 * 修改时间：2015年9月21日 上午11:50:06
 * 修改备注：   
 * @version 1.0
 * Copyright (c) 2015  DDD
 */
@Service
public class InternalParamHandler implements InternalParamHandlerInterface
{
	

	@Override
	public Map<String, Object> addInternalParam(Map<String, Object> map) throws Exception
	{
		if(map == null )
		{
			map = new HashMap<String, Object>();
		}
		map = this.addDateParams(map);
		map = this.addLoginParams(map);
		return map;
	}
	
	public Map<String, Object> addLoginParams(Map<String, Object> map) throws Exception
	{
		BaseService bs =(BaseService)SpringContextUtil.getBean("baseService");
		if(bs.getLoginUser() == null || bs.getOrganization() == null) 
		{
			return map;
		}
		
		//添加当前登录单位Id
		Long orgId = bs.getOrganization().getEId();
		String orgCode =  bs.getOrganization().getCode();
		String orgName =  bs.getOrganization().getName();
		
		//添加当前登录职员
		Long loginMemberId,loginEmpId;
		if(bs.getLoginUser().getLoginVip() != null){
			Member member = bs.getLoginUser().getLoginVip();
			loginMemberId = member.getEId();
			map.put("loginMemberId", loginMemberId);
			map.put("loginMemberName",member.getName());
		}
		else{
			loginEmpId = bs.getLoginUser().getLoginOperator().getEmployee().getEId();
			String loginEmpCode = bs.getLoginUser().getLoginOperator().getEmployee().getCode();
			String loginEmpName = bs.getLoginUser().getLoginOperator().getEmployee().getName();
			
			map.put("loginEmpId", loginEmpId);
			map.put("loginEmpCode", loginEmpCode);
			map.put("loginEmpName", loginEmpName);
			
			//添加当前操作人员
			Long loginOperatorId = bs.getLoginUser().getLoginOperator().getEId();
			String loginOperatorCode = bs.getLoginUser().getLoginOperator().getCode();
			String loginOperatorName = bs.getLoginUser().getLoginOperator().getName();
			
			map.put("loginOpeId", loginOperatorId);
			map.put("loginOpeCode", loginOperatorCode);
			map.put("loginOpeName", loginOperatorName);
			
			map.put("loginOpeId", loginOperatorId);
			map.put("loginOpeCode", loginOperatorCode);
			map.put("loginOpeName", loginOperatorName);
			
			//获取当前登录人员角色
			EntitySet<Role> roles = bs.getLoginUser().getUserRoles();
			String loginRoleNames = "";
			String loginRoleCodes = "";
			for(Role role : roles)
			{
				loginRoleNames += "[" + role.getName()+"]," ;
				loginRoleCodes += "[" + role.getCode()+"]," ;
			}
			map.put("loginRoleNames", loginRoleNames);
			map.put("loginRoleCodes", loginRoleCodes);
			
			//添加当前操作人员登录人的ID（如teacher的teaId）
			if(loginRoleCodes.indexOf("teacher") > 0){
				Long teaId = bs.getTeacherIdLogin();
				map.put("teaId", teaId);
			}
			if(loginRoleCodes.indexOf("student") > 0){
				Long stuId = bs.getStudentIdLogin();
				map.put("stuId", stuId);
			}
			
			//添加当前登录人员部门信息
			Employee loginEmployee = bs.getLoginUser().getLoginOperator().getEmployee();
			if( loginEmployee != null && loginEmployee.getDepartment() != null){
				map.put("loginDepId", loginEmployee.getDepartment().getEId());
				map.put("loginDepName", loginEmployee.getDepartment().getName());
				map.put("loginDepCode", loginEmployee.getDepartment().getCode());
			}
		}
		
		map.put("loginOrgId", orgId);
		map.put("loginOrgCode", orgCode);
		map.put("loginOrgName", orgName);
		
		return map;
	}	
	
	private Map<String, Object> addDateParams(Map<String, Object> map)
	{
		
		Calendar calendar = Calendar.getInstance();
		map.put("当前年", calendar.get(Calendar.YEAR));
		String currentYear = calendar.get(Calendar.YEAR) + "";
		currentYear = currentYear.substring(2);
		map.put("当前年两位", currentYear);
		map.put("当前周", calendar.get(Calendar.WEEK_OF_MONTH));
		map.put("当前月", calendar.get(Calendar.MONTH)+1);
		map.put("当前日", calendar.get(Calendar.DAY_OF_MONTH));
		map.put("当前星期", calendar.get(Calendar.DAY_OF_WEEK)); //星期几，星期日=1，星期六=7
		map.put("当前年天数", calendar.get(Calendar.DAY_OF_YEAR)); //从1月1日开始到当前的天数
		map.put("当前小时", calendar.get(Calendar.HOUR_OF_DAY)); 
		map.put("当前分", calendar.get(Calendar.MINUTE));
		map.put("当前秒", calendar.get(Calendar.SECOND));
		map.put("当前毫秒", calendar.get(Calendar.MILLISECOND));
		map.put("当前相对时间", calendar.getTime()); //相对 1970年1月1日 的毫秒数
		
		map.put("currentYear", calendar.get(Calendar.YEAR));
		String currentYear2 = calendar.get(Calendar.YEAR) + "";
		currentYear2 = currentYear.substring(2);
		map.put("currentYear_short", currentYear2);
		map.put("currentMonth", calendar.get(Calendar.MONTH)+1);
		map.put("currentDayOfMonth", calendar.get(Calendar.DAY_OF_MONTH));
		map.put("currentDayOfWeek", calendar.get(Calendar.DAY_OF_WEEK)); //星期几，星期日=1，星期六=7
		map.put("currentDayOfYear", calendar.get(Calendar.DAY_OF_YEAR)); //从1月1日开始到当前的天数
		map.put("currentHourOfDay", calendar.get(Calendar.HOUR_OF_DAY)); 
		map.put("currentMinute", calendar.get(Calendar.MINUTE));
		map.put("currentSecond", calendar.get(Calendar.SECOND));
		map.put("currentMillSecond", calendar.get(Calendar.MILLISECOND));
		map.put("currentTime", calendar.getTime()); //相对 1970年1月1日 的毫秒数
		SimpleDateFormat formate = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		map.put("searchDate", formate.format(date));
		return map;
	}
}

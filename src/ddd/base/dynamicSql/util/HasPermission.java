
package ddd.base.dynamicSql.util;

import java.util.Set;

import ddd.base.util.SpringContextUtil;
import ddd.simple.service.base.BaseServiceInterface;

/** 
 * @author  Cao JianLin 
 * @date 创建时间：2015年7月29日 下午5:47:37 
 * @version 1.0 
 * @parameter  
 * @since  
 * @return  
 */

public class HasPermission {
	
	private static BaseServiceInterface baseService = (BaseServiceInterface) SpringContextUtil.getBean("baseService");
	
	public static boolean hasPermission(Object o){
		Set<String> permissions = baseService.getLoginUser().getUserPermissionsCode();
		if(permissions.contains((String)o)){
			return true;
		}
		return false;
	}
}

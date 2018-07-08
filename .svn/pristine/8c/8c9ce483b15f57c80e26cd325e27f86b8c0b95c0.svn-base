/**
* @Title: ModuleComparator.java
* @Package ddd.simple.service.permission.impl
* @Description: TODO(用一句话描述该文件做什么)
* @author matao@cqrainbowsoft.com
* @date 2016年4月2日 下午4:14:48
* @version V1.0
*/
package ddd.simple.service.permission.impl;

import java.util.Comparator;

import ddd.simple.entity.permission.Module;

/**
 * 项目名称：INVITE
 * 类名称：ModuleComparator
 * 类描述：   
 * 创建人：AnotherTen
 * 创建时间：2016年4月2日 下午4:14:48
 * 修改人：胡均
 * 修改时间：2016年4月2日 下午4:14:48
 * 修改备注：   
 * @version 1.0
 * Copyright (c) 2016  DDD
 */
public class ModuleComparator implements Comparator<Module>
{

	@Override
	public int compare(Module module1, Module module2)
	{
		// TODO Auto-generated method stub
		Long index1 = module1.getDisplayIndex();
		Long index2 = module2.getDisplayIndex();
		if( index1 == null){
			return 1;
		}
		if(index2 == null){
			return -1;
		}
		if(index1 > index2){
			return -1;
		}else{
			return 1;
		}
	}
	
}

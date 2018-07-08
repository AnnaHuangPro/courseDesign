/**
* @Title: DealDataService.java
* @Package ddd.simple.service.reportForm
* @Description: TODO(用一句话描述该文件做什么)
* @author matao@cqrainbowsoft.com
* @date 2016年11月12日 下午12:45:38
* @version V1.0
*/
package ddd.simple.service.reportForm;

import java.util.Map;

/**
 * 项目名称：DDD3
 * 类名称：DealDataService
 * 类描述：   
 * 创建人：AnotherTen
 * 创建时间：2016年11月12日 下午12:45:38
 * 修改人：胡均
 * 修改时间：2016年11月12日 下午12:45:38
 * 修改备注：   
 * @version 1.0
 * Copyright (c) 2016  DDD
 */
public interface DealDataService
{
	public void dealData(Map<String,Object> param);
}

/**
* @Title: ReportFormOutInterFace.java
* @Package ddd.simple.service.reportForm
* @Description: TODO(用一句话描述该文件做什么)
* @author matao@cqrainbowsoft.com
* @date 2016年8月18日 下午4:17:47
* @version V1.0
*/
package ddd.simple.service.reportForm;

import java.util.Map;

/**
 * 项目名称：DDD3
 * 类名称：ReportFormOutInterFace
 * 类描述：   
 * 创建人：AnotherTen
 * 创建时间：2016年8月18日 下午4:17:47
 * 修改人：胡均
 * 修改时间：2016年8月18日 下午4:17:47
 * 修改备注：   
 * @version 1.0
 * Copyright (c) 2016  DDD
 */
public interface ReportFormOutInterFace
{
	public void beforeExport(Map<String, Object> params, String modelFileKey);
	public void afterExport(Map<String, Object> params, String modelFileKey);
}

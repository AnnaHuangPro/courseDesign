/**   
* @Title: ModelExpressionDao.java 
* @Package ddd.simple.dao.model.impl 
* @Description: TODO(用一句话描述该文件做什么) 
* @author 林园
* @date 2016年7月28日 下午2:58:02 
* @version V1.0   
*/

package ddd.simple.dao.model.impl;

import org.springframework.stereotype.Service;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDao;
import ddd.simple.dao.model.ModelExpressionDao;
import ddd.simple.entity.memberGroup.MemberGroup;

/** 
* @author 作者 E-mail: 
* @version 创建时间：2016年7月28日 下午2:58:02 
* 类说明 
*/
/**
 * @author 林园
 *
 */
@Service
public class ModelExpressionDaoBean extends BaseDao implements ModelExpressionDao {

	/**
	 * @author 林园 @date 2016年7月28日 下午3:03:23 @Title:
	 * findMemberGroupIdByOrgAndGroupName @Description:
	 * TODO(这里用一句话描述这个方法的作用) @param @param orgId @param @param
	 * groupName @param @return 设定文件 @throws
	 */
	@Override
	public MemberGroup findMemberGroupIdByOrgAndGroupName(Long orgId, String groupName) {
		try {
			String sql = "Eid in ("+"SELECT mp.eid FROM membergroup mp WHERE mp.organizationId = '" + orgId + "' AND mp.name = '"
				+ groupName + "'" + ")";
			return this.queryOne(sql, MemberGroup.class);
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return null;
	}

}

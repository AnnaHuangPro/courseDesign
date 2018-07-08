package ddd.simple.dao.workflow;

import java.util.Collection;
import java.util.List;

import ddd.simple.dao.base.BaseDaoInterface;

public interface CommonFindTaskAssigneeDao extends BaseDaoInterface {
	//待商榷
	public Collection<String> 根据角色查找会员(String 角色名称);
	public Collection<String> 根据角色和所属机构编码查找(String 角色名称,String 单位code);
//	public Collection<String> 根据会员组名称和所属机构查找(String 会员组名称,Long 机构Id);
//	public Collection<String> 根据会员组名称和所属机构编码查找(String 会员组名称,String 机构Code);
//	public Collection<String> 根据会员组Id查找(String 会员组Id);
	public Collection<String> 根据角色和所属单位编码查找会员(String 角色名称,String 单位code);
	public Collection<String> 根据角色和会员组查找会员(String 角色名称,Long 组Id);
	public Boolean 根据是否拥有权限和会员类型及组Id判断流程走向(String 权限点名称,String 会员类型名称,Long 组Id);
	public Collection<String> 根据角色和所属单位查找会员(String 角色名称, Long 单位Id);
	
	
	
	//后台查找
	public List<String> 根据角色查找(String 角色名称);
	public Collection<String> 根据权限点查找(String 权限点名称);
	public Collection<String> 根据角色和所属机构查找(String 角色名称,Long 机构Id);
	public Collection<String> 根据权限点和所属机构查找(String 权限点名称,String 机构名称);//待商榷，单位名称
	public Collection<String> 根据角色和所属机构名称查找(String 角色名称,String 机构名称);//待商榷，单位名称

	//待商榷
	public Collection<String> 根据部门查找(String 部门名称);
	public Collection<String> 根据人员查找(String 人员Id);
	//public Collection<String> 根据会员组名称和所属机构查找(String 会员组名称,Long 机构Id);
	//public Collection<String> 根据会员组Id查找(String 会员组Id);
	//public Collection<String> 根据会员组名称和所属机构编码查找(String 会员组名称,String 机构Code);
	//public Collection<String> 根据角色和所属单位查找(String 角色名称,Long 单位Id);
	public Collection<String> 根据部门和所属机构查找(String 部门名称,String 机构名称);

	//前台查找
	public Collection<String> 根据组Id查找(Long 组Id);//一个组Id只对应一个单位，组确定，单位确定
	public List<String> 根据组Id及权限点查找(Long 组id,String 权限点名称);
	public Collection<String> 根据单位Id和组名查找(Long 单位Id,String 组名);
	public Collection<String> 根据单位名称和组名查找(String 单位名称,String 组名);//待商榷，单位名称
	public Collection<String> 根据单位Id和角色名查找(Long 单位Id,String 角色名);
	public Collection<String> 根据组Id和角色名查找(Long 组Id,String 角色名);
	public Collection<String> 根据单位Id和会员类型名查找(Long 单位Id,String 会员类型名);//memberTypeName
	public Collection<String> 根据组Id和会员类型名查找(Long 组Id,String 会员类型名);//memberTypeName

}

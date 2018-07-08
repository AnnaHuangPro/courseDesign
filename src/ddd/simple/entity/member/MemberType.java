package ddd.simple.entity.member;

import ddd.base.annotation.Column;
import ddd.base.persistence.EntitySet;
import ddd.base.persistence.baseEntity.Entity;
import ddd.simple.entity.memberGroup.MemberGroup;
import ddd.simple.entity.permission.Role;

@ddd.base.annotation.Entity(label="会员类别",name="memberType")
public class MemberType extends Entity
{
	private static final long serialVersionUID = 1L;
	
	@Column(label="类别名称",nullable=false,comment="")
	private String typeName;

	@Column(name="roles",composition = false,label="角色")
	private EntitySet<Role> roles;
	
	@Column(name="memberGroupId",label="会员组",nullable=false,FKName="MT_FK_MG")
	private MemberGroup memberGroup;
	
	public MemberGroup getMemberGroup() {
		lazyLoad();
		return memberGroup;
	}

	public void setMemberGroup(MemberGroup memberGroup) {
		this.memberGroup = memberGroup;
	}

	@Column(name="icon",label="角色图标")
	private String icon;
	
	public String getIcon()
	{
		lazyLoad();
		return icon;
	}

	public void setIcon(String icon)
	{
		this.icon = icon;
	}

	public String getTypeName() {
		lazyLoad();
		return this.typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public EntitySet<Role> getRoles() {
		lazyLoad("roles");
		return roles;
	}

	public void setRoles(EntitySet<Role> roles) {
		super.LazyFieidsLoaded.put("roles", true);
		this.roles = roles;
	}
   
}
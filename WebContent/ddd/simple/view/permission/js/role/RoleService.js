define(['app'], function (app) 
{
	app.factory('RoleService',['$resource', function($resource) 
	{
		var roleService = $resource('../Role/:action', {});
		roleService.saveRole=function(role,sucesscb,errorcb)
		{
			roleService.save({action:"saveRole"},{role:role},sucesscb,errorcb);
		};
		
		roleService.deleteRole=function(roleId,sucesscb,errorcb)
		{
			roleService.save({action:"deleteRole"},{roleId:roleId},sucesscb,errorcb);
		};
		
		roleService.updateRole=function(role,sucesscb,errorcb)
		{
			roleService.save({action:"updateRole"},{role:role},sucesscb,errorcb);
		};
		 
		roleService.findRoleById=function(roleId,sucesscb,errorcb)
		{
			roleService.save({action:"findRoleById"},{roleId:roleId},sucesscb,errorcb);
		};
		
		roleService.findRoles=function(sucesscb,errorcb)
		{
			roleService.query({action:"findRoles"},sucesscb,errorcb);
		};
		
		roleService.findShowRoles=function(operatorId,organizationId,sucesscb,errorcb)
		{
			roleService.query({action:"findShowRoles",operatorId:operatorId,organizationId:organizationId},sucesscb,errorcb);
		}
	
		return roleService;
}])
});
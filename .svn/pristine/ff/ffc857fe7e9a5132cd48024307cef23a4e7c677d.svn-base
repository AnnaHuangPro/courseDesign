angular.module('permissionModule', [])
.factory('PermissionService',['$resource', function($resource) 
{
	var permissionService = $resource('../Permission/:action', {});
	permissionService.savePermission=function(permission,sucesscb,errorcb)
	{
		permissionService.save({action:"savePermission"},{permission:permission},sucesscb,errorcb);
	};
	
	permissionService.deletePermission=function(permissionId,sucesscb,errorcb)
	{
		permissionService.save({action:"deletePermission",permissionId:permissionId},{},sucesscb,errorcb);
	};
	
	permissionService.updatePermission=function(permission,sucesscb,errorcb)
	{
		permissionService.save({action:"updatePermission"},{permission:permission},sucesscb,errorcb);
	};
	 
	permissionService.findPermissionById=function(permissionId,sucesscb,errorcb)
	{
		permissionService.get({action:"findPermissionById",permissionId:permissionId},sucesscb,errorcb);
	};
	
	permissionService.findPermissions=function(sucesscb,errorcb)
	{
		permissionService.query({action:"findPermissions"},sucesscb,errorcb);
	};
	
	permissionService.findPermissionByModule=function(moduleId,sucesscb,errorcb)
	{
		permissionService.query({action:"findPermissionByModule",moduleId:moduleId},sucesscb,errorcb);
	};
	
	permissionService.findPermissionByRole=function(roleId,sucesscb,errorcb)
	{
		permissionService.query({action:"findPermissionByRole",roleId:roleId},sucesscb,errorcb);
	};
	
	permissionService.findShowPermissions=function(roleId,moduleId,sucesscb,errorcb)
	{
		permissionService.query({action:"findShowPermissions",roleId:roleId,moduleId:moduleId},sucesscb,errorcb);
	};
	
	permissionService.savePermissionsByRole=function(roleId,moduleId,permissions,sucesscb,errorcb)
	{
		permissionService.save({action:"savePermissionsByRole",roleId:roleId,moduleId:moduleId},{permissions:permissions},sucesscb,errorcb);
	};
	
	return permissionService;
}]);
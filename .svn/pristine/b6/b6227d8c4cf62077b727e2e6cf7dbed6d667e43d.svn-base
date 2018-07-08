
define(['app'], function (app) 
{
	app.factory('DepartmentService', function($resource) 
	{
		var departmentService = $resource('../Department/:action', {});
		departmentService.saveDepartment=function(department,sucesscb,errorcb)
		{
			departmentService.save({action:"saveDepartment"},department,sucesscb,errorcb);
		};
		
		departmentService.deleteDepartment=function(departmentId,sucesscb,errorcb)
		{
			departmentService.save({action:"deleteDepartment"},departmentId,sucesscb,errorcb);
		};
		
		departmentService.updateDepartment=function(department,sucesscb,errorcb)
		{
			departmentService.save({action:"updateDepartment"},department,sucesscb,errorcb);
		};
		 
		departmentService.findDepartmentById=function(departmentId,sucesscb,errorcb)
		{
			departmentService.get({action:"findDepartmentById",departmentId:departmentId},sucesscb,errorcb);
		};
		
		departmentService.findAllDepartment=function(sucesscb,errorcb)
		{
			departmentService.query({action:"findAllDepartment"},sucesscb,errorcb);
		}
		return departmentService;
})});

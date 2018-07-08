angular.module("moduleModule",[])

.factory('ModuleService',['$resource','angularPermission',function($resource,angularPermission) 
{
	/* 会员前台和后台的相对路径不一致，只有写绝对路径 */
	var moduleService = $resource('../Module/:action', {});
	moduleService.saveModule=function(module,sucesscb,errorcb)
	{
		//保存之前先移除缓存
		angularPermission.removeCacheByType("systemChildModule");
		moduleService.save({action:"saveModule"},{module:module},sucesscb,errorcb);
	};
	
	moduleService.deleteModule=function(moduleId,sucesscb,errorcb)
	{
		//删除之前先移除缓存
		angularPermission.removeCacheByType("systemChildModule");
		moduleService.save({action:"deleteModule",moduleId:moduleId},{},sucesscb,errorcb);
	};
	
	moduleService.updateModule=function(module,sucesscb,errorcb)
	{
		//更新之前先移除缓存
		angularPermission.removeCacheByType("systemChildModule");
		moduleService.save({action:"updateModule"},{module:module},sucesscb,errorcb);
	};
	 
	moduleService.findModuleById=function(moduleId,sucesscb,errorcb)
	{
		moduleService.get({action:"findModuleById",moduleId:moduleId},sucesscb,errorcb);
	};
	
	moduleService.findModules=function(sucesscb,errorcb)
	{
		moduleService.query({action:"findModules"},sucesscb,errorcb);
	};
	
	moduleService.findModulesByParentCode=function(moduleCode,sucesscb,errorcb)
	{
		moduleService.query({action:"findModulesByParentCode",moduleCode:moduleCode},sucesscb,errorcb);
	}
	
	moduleService.findModulesByOperator=function(operatorId,sucesscb,errorcb)
	{
		moduleService.query({action:"findModulesByOperator",operatorId:operatorId},sucesscb,errorcb);
	}
	
	moduleService.findSystemModulesByOperator=function(operatorId,sucesscb,errorcb)
	{
		moduleService.query({action:"findSystemModulesByOperator",operatorId:operatorId},sucesscb,errorcb)
	}
	
	moduleService.findSystemChildModules=function(operatorId,systemModuleId,sucesscb,errorcb)
	{
		moduleService.query({action:"findSystemChildModules",operatorId:operatorId,systemModuleId:systemModuleId},sucesscb,errorcb);
	}
	
	
	moduleService.findSystemChildModulesNew1=function(systemModuleId,sucesscb,errorcb)
	{
		var operatorId = angularPermission.getLoginUser().eId;
		moduleService.query({action:"findSystemChildModulesNew",operatorId:operatorId,systemModuleId:systemModuleId},sucesscb,errorcb);
	}
	
	moduleService.findSystemChildModulesNew=function(operatorId,systemModuleId,sucesscb,errorcb)
	{
		moduleService.query({action:"findSystemChildModulesNew",operatorId:operatorId,systemModuleId:systemModuleId},sucesscb,errorcb);
	}
	
	moduleService.constructNewTree=function(operatorId,sucesscb,errorcb)
	{
		moduleService.query({action:"constructNewTree",operatorId:operatorId},sucesscb,errorcb);
	}
	
	moduleService.findMemberModules=function(sucesscb,errorcb)
	{
		moduleService.save({action:"findMemberModules"},{},sucesscb,errorcb);
	}
		return moduleService;
}]);

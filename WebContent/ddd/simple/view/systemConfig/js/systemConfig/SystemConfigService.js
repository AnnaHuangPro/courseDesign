
define(['app'], function (app) 
{
	app.factory('SystemConfigService', function($resource) 
	{
		var systemConfigService = $resource('../SystemConfig/:action', {});
		systemConfigService.saveSystemConfig=function(systemConfig,sucesscb,errorcb)
		{
			systemConfigService.save({action:"saveSystemConfig"},systemConfig,sucesscb,errorcb);
		};
		
		systemConfigService.deleteSystemConfig=function(systemConfigId,sucesscb,errorcb)
		{
			systemConfigService.save({action:"deleteSystemConfig"},systemConfigId,sucesscb,errorcb);
		};
		
		systemConfigService.updateSystemConfig=function(systemConfig,sucesscb,errorcb)
		{
			systemConfigService.save({action:"updateSystemConfig"},systemConfig,sucesscb,errorcb);
		};
		 
		systemConfigService.findSystemConfigById=function(systemConfigId,sucesscb,errorcb)
		{
			systemConfigService.get({action:"findSystemConfigById",systemConfigId:systemConfigId},sucesscb,errorcb);
		};
		
		systemConfigService.findAllSystemConfig=function(sucesscb,errorcb)
		{
			systemConfigService.query({action:"findAllSystemConfig"},sucesscb,errorcb);
		}
		return systemConfigService;
})});

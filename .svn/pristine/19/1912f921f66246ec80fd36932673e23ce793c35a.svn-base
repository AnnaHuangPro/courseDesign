
define(["app"], function (app) 
{
	app.factory("ImportConfigsService", function($resource) 
	{
		var importConfigsService = $resource("../ImportConfigs/:action", {});
		importConfigsService.saveImportConfigs=function(importConfigs,sucesscb,errorcb)
		{
			importConfigsService.save({action:"saveImportConfigs"},importConfigs,sucesscb,errorcb);
		};
		
		importConfigsService.deleteImportConfigs=function(importConfigsId,sucesscb,errorcb)
		{
			importConfigsService.save({action:"deleteImportConfigs"},importConfigsId,sucesscb,errorcb);
		};
		
		importConfigsService.updateImportConfigs=function(importConfigs,sucesscb,errorcb)
		{
			importConfigsService.save({action:"updateImportConfigs"},importConfigs,sucesscb,errorcb);
		};
		 
		importConfigsService.findImportConfigsById=function(importConfigsId,sucesscb,errorcb)
		{
			importConfigsService.get({action:"findImportConfigsById",importConfigsId:importConfigsId},sucesscb,errorcb);
		};
		
		importConfigsService.findAllImportConfigs=function(sucesscb,errorcb)
		{
			importConfigsService.query({action:"findAllImportConfigs"},sucesscb,errorcb);
		}
		importConfigsService.findImportConfigByKey=function(importConfigKey,sucesscb,errorcb)
		{
			importConfigsService.query({action:"findImportConfigByKey",importConfigKey:importConfigKey},sucesscb,errorcb);
		}
		
		importConfigsService.createConfig=function(packageName,sucesscb,errorcb)
		{
			importConfigsService.get({action:"createConfig",packageName:packageName},sucesscb,errorcb);
		}
		importConfigsService.createTemplate=function(packageName,sucesscb,errorcb)
		{
			importConfigsService.get({action:"createTemplate",packageName:packageName},sucesscb,errorcb);
		}
		importConfigsService.getAllField=function(entityName,sucesscb,errorcb)
		{
			importConfigsService.query({action:"getAllField",entityName:entityName},sucesscb,errorcb);
		}
		importConfigsService.createExcelTemplate=function(importConfigs,sucesscb,errorcb)
		{
			importConfigsService.save({action:"createExcelTemplate"},{importConfigs:importConfigs},sucesscb,errorcb);
		}
		return importConfigsService;
})});

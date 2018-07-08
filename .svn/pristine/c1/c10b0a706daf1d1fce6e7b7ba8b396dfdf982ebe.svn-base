
define(["app"], function (app) 
{
	app.factory("OutInterfaceConfigService", function($resource) 
	{
		var outInterfaceConfigService = $resource("../OutInterfaceConfig/:action", {});
		outInterfaceConfigService.saveOutInterfaceConfig=function(outInterfaceConfig,sucesscb,errorcb)
		{
			outInterfaceConfigService.save({action:"saveOutInterfaceConfig"},outInterfaceConfig,sucesscb,errorcb);
		};
		
		outInterfaceConfigService.deleteOutInterfaceConfig=function(outInterfaceConfigId,sucesscb,errorcb)
		{
			outInterfaceConfigService.save({action:"deleteOutInterfaceConfig"},outInterfaceConfigId,sucesscb,errorcb);
		};
		
		outInterfaceConfigService.updateOutInterfaceConfig=function(outInterfaceConfig,sucesscb,errorcb)
		{
			outInterfaceConfigService.save({action:"updateOutInterfaceConfig"},outInterfaceConfig,sucesscb,errorcb);
		};
		 
		outInterfaceConfigService.findOutInterfaceConfigById=function(outInterfaceConfigId,sucesscb,errorcb)
		{
			outInterfaceConfigService.get({action:"findOutInterfaceConfigById",outInterfaceConfigId:outInterfaceConfigId},sucesscb,errorcb);
		};
		
		outInterfaceConfigService.findAllOutInterfaceConfig=function(sucesscb,errorcb)
		{
			outInterfaceConfigService.query({action:"findAllOutInterfaceConfig"},sucesscb,errorcb);
		}
		return outInterfaceConfigService;
})});


define(["app"], function (app) 
{
	app.factory("ExternalInterfaceService", function($resource) 
	{
		
		var externalInterfaceService = $resource("../DD/ExternalInterface/:action", {});
		externalInterfaceService.saveExternalInterface=function(externalInterface,sucesscb,errorcb)
		{
			externalInterfaceService.save({action:"saveExternalInterface"},{externalInterface:externalInterface},sucesscb,errorcb);
		};
		
		externalInterfaceService.deleteExternalInterface=function(externalInterfaceId,sucesscb,errorcb)
		{
			externalInterfaceService.save({action:"deleteExternalInterface"},{externalInterfaceId:externalInterfaceId},sucesscb,errorcb);
		};
		
		externalInterfaceService.updateExternalInterface=function(externalInterface,sucesscb,errorcb)
		{
			externalInterfaceService.save({action:"updateExternalInterface"},{externalInterface:externalInterface},sucesscb,errorcb);
		};
		 
		externalInterfaceService.findExternalInterfaceById=function(externalInterfaceId,sucesscb,errorcb)
		{
			externalInterfaceService.get({action:"findExternalInterfaceById",externalInterfaceId:externalInterfaceId},sucesscb,errorcb);
		};
		
		externalInterfaceService.findAllExternalInterface=function(sucesscb,errorcb)
		{
			externalInterfaceService.query({action:"findAllExternalInterface"},sucesscb,errorcb);
		}
	
		externalInterfaceService.executeExternalInterface=function(externalInterface,sucesscb,errorcb)
		{
			externalInterfaceService.save({action:"executeExternalInterface"},{externalInterface:externalInterface},sucesscb,errorcb);
		}
		
		
		return externalInterfaceService;
})});

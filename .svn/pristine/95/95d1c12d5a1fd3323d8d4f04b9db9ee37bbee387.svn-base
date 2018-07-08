
define(["app"], function (app) 
{
	app.factory("Ddd3TestService", function($resource) 
	{
		
		var ddd3TestService = $resource("../DD/Ddd3Test/:action", {});
		ddd3TestService.saveDdd3Test=function(ddd3Test,sucessCB,errorCB)
		{
			return ddd3TestService.save({action:"saveDdd3Test"},{ddd3Test:ddd3Test},sucessCB,errorCB);
		};
		
		ddd3TestService.deleteDdd3Test=function(ddd3TestId,sucessCB,errorCB)
		{
			ddd3TestService.save({action:"deleteDdd3Test"},{ddd3TestId:ddd3TestId},sucessCB,errorCB);
		};
		
		ddd3TestService.updateDdd3Test=function(ddd3Test,sucessCB,errorCB)
		{
			ddd3TestService.save({action:"updateDdd3Test"},{ddd3Test:ddd3Test},sucessCB,errorCB);
		};
		 
		ddd3TestService.findDdd3TestById=function(ddd3TestId,sucessCB,errorCB)
		{
			ddd3TestService.save({action:"findDdd3TestById"},{ddd3TestId:ddd3TestId},sucessCB,errorCB);
		};
		
		ddd3TestService.findAllDdd3Test=function(sucessCB,errorCB)
		{
			ddd3TestService.save({action:"findAllDdd3Test"},sucessCB,errorCB);
		}
		return ddd3TestService;
})});

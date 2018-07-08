
define(["app"], function (app) 
{
	app.factory("LogService", function($resource) 
	{
		var logService = $resource("../Log/:action", {});
		logService.saveLog=function(log,sucesscb,errorcb)
		{
			logService.save({action:"saveLog"},log,sucesscb,errorcb);
		};
		
		logService.deleteLog=function(logId,sucesscb,errorcb)
		{
			logService.save({action:"deleteLog"},logId,sucesscb,errorcb);
		};
		
		logService.updateLog=function(log,sucesscb,errorcb)
		{
			logService.save({action:"updateLog"},log,sucesscb,errorcb);
		};
		 
		logService.findLogById=function(logId,sucesscb,errorcb)
		{
			logService.get({action:"findLogById",logId:logId},sucesscb,errorcb);
		};
		
		logService.findAllLog=function(sucesscb,errorcb)
		{
			logService.query({action:"findAllLog"},sucesscb,errorcb);
		}
		return logService;
})});


define(["app"], function (app) {
	app.factory("SystemConfigTypeService", function($resource) {
		
		var systemConfigTypeService = $resource("../DD/SystemConfigType/:action", {});
		systemConfigTypeService.saveSystemConfigType=function(systemConfigType,sucesscb,errorcb)	{
			systemConfigTypeService.save({action:"saveSystemConfigType"},{systemConfigType:systemConfigType},sucesscb,errorcb);
		};
		
		systemConfigTypeService.deleteSystemConfigType=function(systemConfigTypeId,sucesscb,errorcb)	{
			systemConfigTypeService.save({action:"deleteSystemConfigType"},{systemConfigTypeId:systemConfigTypeId},sucesscb,errorcb);
		};
		
		systemConfigTypeService.updateSystemConfigType=function(systemConfigType,sucesscb,errorcb) {
			systemConfigTypeService.save({action:"updateSystemConfigType"},{systemConfigType:systemConfigType},sucesscb,errorcb);
		};
		 
		systemConfigTypeService.findSystemConfigTypeById=function(systemConfigTypeId,sucesscb,errorcb) {
			systemConfigTypeService.get({action:"findSystemConfigTypeById",systemConfigTypeId:systemConfigTypeId},sucesscb,errorcb);
		};
		
		systemConfigTypeService.findAllSystemConfigType=function(sucesscb,errorcb) {
			systemConfigTypeService.query({action:"findAllSystemConfigType"},sucesscb,errorcb);
		}
		return systemConfigTypeService;
})});


define(["app"], function (app) {
	app.factory("DataSourceTypeService", function($resource) {
		
		var dataSourceTypeService = $resource("../DD/DataSourceType/:action", {});
		dataSourceTypeService.saveDataSourceType=function(dataSourceType,sucesscb,errorcb)	{
			dataSourceTypeService.save({action:"saveDataSourceType"},{dataSourceType:dataSourceType},sucesscb,errorcb);
		};
		
		dataSourceTypeService.deleteDataSourceType=function(dataSourceTypeId,sucesscb,errorcb)	{
			dataSourceTypeService.save({action:"deleteDataSourceType"},dataSourceTypeId,sucesscb,errorcb);
		};
		
		dataSourceTypeService.updateDataSourceType=function(dataSourceType,sucesscb,errorcb) {
			dataSourceTypeService.save({action:"updateDataSourceType"},{dataSourceType:dataSourceType},sucesscb,errorcb);
		};
		 
		dataSourceTypeService.findDataSourceTypeById=function(dataSourceTypeId,sucesscb,errorcb) {
			dataSourceTypeService.get({action:"findDataSourceTypeById",dataSourceTypeId:dataSourceTypeId},sucesscb,errorcb);
		};
		
		dataSourceTypeService.findAllDataSourceType=function(sucesscb,errorcb) {
			dataSourceTypeService.query({action:"findAllDataSourceType"},sucesscb,errorcb);
		}
		return dataSourceTypeService;
})});

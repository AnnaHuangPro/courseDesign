
define(["app"], function (app) 
{
	app.factory("ExporterConfigService", function($resource) 
	{
		var exporterConfigService = $resource("../ExporterConfig/:action", {});
		exporterConfigService.saveExporterConfig=function(exporterConfig,sucesscb,errorcb)
		{
			exporterConfigService.save({action:"saveExporterConfig"},exporterConfig,sucesscb,errorcb);
		};
		
		exporterConfigService.deleteExporterConfig=function(exporterConfigId,sucesscb,errorcb)
		{
			exporterConfigService.save({action:"deleteExporterConfig"},exporterConfigId,sucesscb,errorcb);
		};
		
		exporterConfigService.updateExporterConfig=function(exporterConfig,sucesscb,errorcb)
		{
			exporterConfigService.save({action:"updateExporterConfig"},exporterConfig,sucesscb,errorcb);
		};
		 
		exporterConfigService.findExporterConfigById=function(exporterConfigId,sucesscb,errorcb)
		{
			exporterConfigService.get({action:"findExporterConfigById",exporterConfigId:exporterConfigId},sucesscb,errorcb);
		};
		
		exporterConfigService.findAllExporterConfig=function(sucesscb,errorcb)
		{
			exporterConfigService.query({action:"findAllExporterConfig"},sucesscb,errorcb);
		}
		return exporterConfigService;
})});

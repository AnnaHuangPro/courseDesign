define(['app'], function(app) {
	app.factory('ExportAndImportService', function($resource) {
		var exportAndImportService = $resource("../ExportAndImport/:action",
				{});
		exportAndImportService.importDataFromFile = function(importConfigKey,sucesscb, errorcb) {
			exportAndImportService.save({action : "importEntityByImportConfig"}, {importConfigKey:importConfigKey}, sucesscb, errorcb);
		};
		exportAndImportService.importDataFile = function(importConfigKey,formId,sucesscb, errorcb) {
			exportAndImportService.save({action : "importDataFile"},{importConfigKey:importConfigKey,formId:formId},sucesscb, errorcb);
		};
		return exportAndImportService;
	})
});
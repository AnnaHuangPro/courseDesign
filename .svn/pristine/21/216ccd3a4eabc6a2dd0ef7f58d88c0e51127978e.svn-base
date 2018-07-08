define(['app'], function (app) 
{
	app.factory('ddd3utilService', function($resource) 
	{
		var codeGeneratorService = $resource('../Ddd3util/:action', {});
		codeGeneratorService.generator = function(tabs,sucesscb,errorcb)
		{
			codeGeneratorService.save({action:"generatorFileds"},{tabs:tabs},sucesscb,errorcb);
		};
		return codeGeneratorService;
})});
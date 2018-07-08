
define(['app'], function (app) 
{
	app.factory('CodeGeneratorService', function($resource) 
	{
		var codeGeneratorService = $resource('../CodeGenerator/:action', {});
		codeGeneratorService.generatorBaseCode = function(className,sucesscb,errorcb)
		{
			codeGeneratorService.save({action:"generatorBaseCode"},className,sucesscb,errorcb);
		};
		codeGeneratorService.mergeRoute=function(sucesscb,errorcb)
		{
			codeGeneratorService.get({action:"mergeRoute"},sucesscb,errorcb);
		};
		codeGeneratorService.generatorEntity=function(classInfo,sucesscb,errorcb)
		{
			codeGeneratorService.save({action:"generatorEntity"},classInfo,sucesscb,errorcb);
		};
		codeGeneratorService.importEntity=function(sucesscb,errorcb)
		{
			codeGeneratorService.get({action:"importEntities"},sucesscb,errorcb);
		};
		return codeGeneratorService;
})});
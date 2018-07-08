
define(['app'], function (app) 
{
	app.factory('ModelTypeService', function($resource) 
	{
		var modelTypeService = $resource('../ModelType/:action', {});
		modelTypeService.saveModelType=function(modelType,sucesscb,errorcb)
		{
			return modelTypeService.save({action:"saveModelType"},{modelType:modelType},sucesscb,errorcb);
		};
		
		modelTypeService.deleteModelType=function(modelTypeId,sucesscb,errorcb)
		{
			modelTypeService.save({action:"deleteModelType"},modelTypeId,sucesscb,errorcb);
		};
		
		modelTypeService.updateModelType=function(modelType,sucesscb,errorcb)
		{
			modelTypeService.save({action:"updateModelType"},{modelType:modelType},sucesscb,errorcb);
		};
		 
		modelTypeService.findModelTypeById=function(modelTypeId,sucesscb,errorcb)
		{
			modelTypeService.get({action:"findModelTypeById",modelTypeId:modelTypeId},sucesscb,errorcb);
		};
		
		modelTypeService.findAllModelType=function(sucesscb,errorcb)
		{
			modelTypeService.query({action:"findAllModelType"},sucesscb,errorcb);
		}
		return modelTypeService;
})});

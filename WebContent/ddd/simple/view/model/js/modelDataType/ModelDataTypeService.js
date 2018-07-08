
define(["app"], function (app) 
{
	app.factory("ModelDataTypeService", function($resource) 
	{
		var modelDataTypeService = $resource("../ModelDataType/:action", {});
		modelDataTypeService.saveModelDataType=function(modelDataType,sucesscb,errorcb)
		{
			modelDataTypeService.save({action:"saveModelDataType"},modelDataType,sucesscb,errorcb);
		};
		
		modelDataTypeService.deleteModelDataType=function(modelDataTypeId,sucesscb,errorcb)
		{
			modelDataTypeService.save({action:"deleteModelDataType"},modelDataTypeId,sucesscb,errorcb);
		};
		
		modelDataTypeService.updateModelDataType=function(modelDataType,sucesscb,errorcb)
		{
			modelDataTypeService.save({action:"updateModelDataType"},modelDataType,sucesscb,errorcb);
		};
		 
		modelDataTypeService.findModelDataTypeById=function(modelDataTypeId,sucesscb,errorcb)
		{
			modelDataTypeService.get({action:"findModelDataTypeById",modelDataTypeId:modelDataTypeId},sucesscb,errorcb);
		};
		
		modelDataTypeService.findAllModelDataType=function(sucesscb,errorcb)
		{
			modelDataTypeService.query({action:"findAllModelDataType"},sucesscb,errorcb);
		}
		return modelDataTypeService;
})});

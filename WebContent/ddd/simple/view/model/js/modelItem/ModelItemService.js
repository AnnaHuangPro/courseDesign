angular.module('modelItemApp', [])
	.factory('ModelItemService',  ['$resource',function($resource) 
	{
		var modelItemService = $resource('../ModelItem/:action', {});
		modelItemService.saveModelItem=function(modelItem,sucesscb,errorcb)
		{
			modelItemService.save({action:"saveModelItem"},modelItem,sucesscb,errorcb);
		};
		
		modelItemService.deleteModelItem=function(modelItemId,sucesscb,errorcb)
		{
			modelItemService.save({action:"deleteModelItem"},modelItemId,sucesscb,errorcb);
		};
		
		modelItemService.updateModelItem=function(modelItem,sucesscb,errorcb)
		{
			modelItemService.save({action:"updateModelItem"},modelItem,sucesscb,errorcb);
		};
		 
		modelItemService.findModelItemById=function(modelItemId,sucesscb,errorcb)
		{
			modelItemService.get({action:"findModelItemById",modelItemId:modelItemId},sucesscb,errorcb);
		};
		
		modelItemService.findAllModelItem=function(sucesscb,errorcb)
		{
			modelItemService.query({action:"findAllModelItem"},sucesscb,errorcb);
		}
		
		modelItemService.findModelItemByModelId=function(modelId,sucesscb,errorcb)
		{
			modelItemService.query({action:"findModelItemsByModelId",modelId:modelId},sucesscb,errorcb);
		};
		return modelItemService;
	}]);

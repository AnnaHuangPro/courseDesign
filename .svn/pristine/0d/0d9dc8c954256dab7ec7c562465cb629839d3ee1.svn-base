
angular.module('modelApp',[])
	.factory('ModelService',  ['$resource',function($resource) 
	{
		var modelService = $resource('../Model/:action', {});
		modelService.saveModel=function(model,sucesscb,errorcb)
		{
			modelService.save({action:"saveModel"},model,sucesscb,errorcb);
		};

		modelService.publishModel=function(model,sucesscb,errorcb)
		{
			modelService.save({action:"publishModel"},{model:model},sucesscb,errorcb);
		};
		
		modelService.submitModel=function(model,ensureUnion,sucesscb,errorcb)
		{
			modelService.save({action:"submitModel",},{model:model,ensureUnion:{ensureUnion:ensureUnion}},sucesscb,errorcb);
		};
		
		modelService.deleteModel=function(model,sucesscb,errorcb)
		{
			modelService.save({action:"deleteModel"},model,sucesscb,errorcb);
		};
		
		modelService.updateModel=function(model,sucesscb,errorcb)
		{
			modelService.save({action:"updateModel"},{model:model},sucesscb,errorcb);
		};
		 
		modelService.findModelById=function(modelId,sucesscb,errorcb)
		{
			modelService.get({action:"findModelById",modelId:modelId},sucesscb,errorcb);
		};
		
		modelService.findAllModel=function(sucesscb,errorcb)
		{
			modelService.query({action:"findAllModel"},sucesscb,errorcb);
		}
		
		modelService.findModelsByModelTypeId=function(modelTypeId,sucesscb,errorcb)
		{
			modelService.query({action:"findModelsByModelTypeId",modelTypeId:modelTypeId},sucesscb,errorcb);
		}
		
		modelService.findModelByEnglishName=function(englishName,sucesscb,errorcb)
		{
			modelService.get({action:"findModelByEnglishName",englishName:englishName},sucesscb,errorcb);
		}
		
		modelService.findBaseModel=function(successcb,errorcb)
		{
			modelService.get({action:"findBaseModel"},successcb,errorcb);
		}
		
		modelService.previewForm=function(model,successcb,errorcb)
		{
			modelService.save({action:"previewForm"},model,successcb,errorcb);
		}
		
		modelService.getWorkflowProcess=function(sucesscb,errorcb)
		{
			modelService.query({action:"getWorkflowProcess"},sucesscb,errorcb);
		}
		
		modelService.cancelPublishModel=function(model,sucesscb,errorcb)
		{
			modelService.save({action:"cancelPublishModel"},{model:model},sucesscb,errorcb);
		};
		
		modelService.getSubmitedModel=function(sucesscb,errorcb)
		{
			modelService.query({action:"getSubmitedModel"},sucesscb,errorcb);
		};
		
		return modelService;
	}]);
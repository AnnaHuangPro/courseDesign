angular.module('dynamicFormApp',[])
	.factory('DynamicFormService', ['$resource',function($resource) 
	{
		var dynamicFormService = $resource('../DynamicForm/:action', {});
		dynamicFormService.saveDynamicForm=function(dynamicForm,sucesscb,errorcb)
		{
			dynamicFormService.save({action:"saveDynamicForm"},dynamicForm,sucesscb,errorcb);
		};
		
		dynamicFormService.deleteDynamicForm=function(dynamicFormId,sucesscb,errorcb)
		{
			dynamicFormService.save({action:"deleteDynamicForm"},dynamicFormId,sucesscb,errorcb);
		};
		
		dynamicFormService.updateDynamicForm=function(dynamicForm,sucesscb,errorcb)
		{
			dynamicFormService.save({action:"updateDynamicForm"},dynamicForm,sucesscb,errorcb);
		};
		
		dynamicFormService.updateDynamicFormById=function(dynamicform,sucesscb,errorcb)
		{
			dynamicFormService.save({action:"updateDynamicFormById"},dynamicform,sucesscb,errorcb);
		};
		 
		dynamicFormService.findDynamicFormById=function(dynamicFormId,sucesscb,errorcb)
		{
			dynamicFormService.get({action:"findDynamicFormById",dynamicFormId:dynamicFormId},sucesscb,errorcb);
		};
		
		dynamicFormService.findAllDynamicForm=function(sucesscb,errorcb)
		{
			dynamicFormService.query({action:"findAllDynamicForm"},sucesscb,errorcb);
		}
		
		dynamicFormService.findDynamicFormByKey=function(dynamicFormKey,sucesscb,errorcb)
		{
			dynamicFormService.get({action:"findDynamicFormByKey",dynamicFormKey:dynamicFormKey},sucesscb,errorcb);
		};

		dynamicFormService.designMultiImgHtml=function(imgUrls,sucesscb,errorcb)
		{
			dynamicFormService.save({action:"designMultiImgHtml"},imgUrls,sucesscb,errorcb);
		};
		
		dynamicFormService.preViewForm=function(configs,sucesscb,errorcb)
		{
			dynamicFormService.save({action:"preViewForm"},configs,sucesscb,errorcb);
		};
		
		return dynamicFormService;
	}]);

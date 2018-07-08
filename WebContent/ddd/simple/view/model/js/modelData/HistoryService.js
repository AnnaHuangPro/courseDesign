angular.module('modelDataHistoryModule',[])
	.factory('HistoryService',  ['$resource',function($resource) 
	{
		var historyService = $resource('../History/:action', {});
		historyService.getModelData = function(historyVersionId,successcb,errorcb)
		{
			historyService.query({action:"getModelData",historyVersionId:historyVersionId},successcb,errorcb);
		}
		
		return historyService;
	}]);
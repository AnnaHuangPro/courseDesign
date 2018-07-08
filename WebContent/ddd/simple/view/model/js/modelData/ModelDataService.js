
angular.module('modelDataApp',[])
	.factory('ModelDataService',  ['$filter','$resource',function($filter,$resource) 
	{
		var modelDataService = $resource('../ModelData/:action', {});
		modelDataService.saveModelData=function(tableName,modelData,sucesscb,errorcb)
		{
			modelDataService.save({action:"saveModelData",tableName:tableName},{modelData:modelData},sucesscb,errorcb);
		};
		
		modelDataService.deleteModelData=function(tableName,modelDataId,sucesscb,errorcb)
		{
			modelDataService.save({action:"deleteModelData",tableName:tableName},modelDataId,sucesscb,errorcb);
		};
		
		modelDataService.updateModelData=function(tableName,modelData,sucesscb,errorcb)
		{
			modelDataService.save({action:"updateModelData",tableName:tableName},{modelData:modelData},sucesscb,errorcb);
		};
		 
		modelDataService.findModelDataById=function(modelDataId,sucesscb,errorcb)
		{
			modelDataService.get({action:"findModelDataById",modelDataId:modelDataId},sucesscb,errorcb);
		};
		
		modelDataService.submitModelData=function(tableName,modelData,operate,sucesscb,errorcb)
		{
			modelDataService.save({action:"submitModelData",tableName:tableName,operate:operate},{modelData:modelData},sucesscb,errorcb);
		};
		
		modelDataService.findModelDataByModelDataId=function(tableName,contentId,sucesscb,errorcb)
		{
			modelDataService.get({action:"findModelDataByContentId",tableName:tableName,contentId:contentId},sucesscb,errorcb);
		};
		
		modelDataService.findModelDataByTableNameAndIds=function(tableName,modelDataIds,sucesscb,errorcb)
		{
			modelDataService.save({action:"findModelDataByTableNameAndIds"},{tableName:tableName,modelDataIds:modelDataIds},sucesscb,errorcb);
		}
		
		modelDataService.findSubtableInfo = function(tableName,sucesscb,errorcb)
		{
			modelDataService.get({action:"findSubtableInfo",tableName:tableName},sucesscb,errorcb);
		};
		
		modelDataService.updataModelDataAndHistory=function(modelData,tableName,sucesscb,errorcb)
		{
			modelDataService.save({action:"updataModelDataAndHistory",tableName:tableName},{modelData:modelData},sucesscb,errorcb);
		};
		
		modelDataService.findHistoryByModelDataId = function(tableName,modelDataId,sucesscb,errorcb)
		{
			modelDataService.query({action:"findHistoryByModelDataId",tableName:tableName,modelDataId:modelDataId},sucesscb,errorcb);
		}
		modelDataService.findHistoryDetailByModelDataId=function(modelDataId,sucesscb,errorcb)
		{
			modelDataService.get({action:"findHistoryDetailByModelDataId",modelDataId:modelDataId},sucesscb,errorcb);
		};
		modelDataService.getLatestDataByTNameAndNum = function(tableName,number,sucesscb,errorcb)
		{
			modelDataService.query({action:"getLatestDataByTNameAndNum",tableName:tableName,number:number},sucesscb,errorcb);
		}
		modelDataService.findModelDataByTableName = function(tableName,sucesscb,errorcb)
		{
			modelDataService.query({action:"findModelDataByTableName",tableName:tableName},sucesscb,errorcb);
		}
		modelDataService.getCurrentDayDataByModel = function(modelId,number,sucesscb,errorcb)
		{
			modelDataService.save({action:"getCurrentDayDataByModel"},{modelId:modelId,number:number},sucesscb,errorcb);
		}
		modelDataService.getCurrentMonthDataByModel = function(modelId,number,sucesscb,errorcb)
		{
			modelDataService.save({action:"getCurrentMonthDataByModel"},{modelId:modelId,number:number},sucesscb,errorcb);
		}		
		modelDataService.getCurrentYearDataByModel = function(modelId,number,sucesscb,errorcb)
		{
			modelDataService.save({action:"getCurrentYearDataByModel"},{modelId:modelId,number:number},sucesscb,errorcb);
		}

		modelDataService.getCurrentDayAllPublishedTotal = function(sucesscb,errorcb)
		{
			modelDataService.save({action:"getCurrentDayAllPublishedTotal"},{},sucesscb,errorcb);
		}
		modelDataService.getMonthTotalTongjiByModel = function(year,month,modelId,sucesscb,errorcb)
		{
			modelDataService.save({action:"getMonthTotalTongjiByModel"},{year:year,month:month,modelId:modelId},sucesscb,errorcb);
		}
		modelDataService.getYearTotalTongjiByModel = function(year,modelId,sucesscb,errorcb)
		{
			modelDataService.save({action:"getYearTotalTongjiByModel"},{year:year,modelId:modelId},sucesscb,errorcb);
		}
		return modelDataService;
	}]);

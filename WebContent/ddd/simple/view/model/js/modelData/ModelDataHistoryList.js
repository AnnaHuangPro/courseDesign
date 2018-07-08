angular.module('modelDataModule', [])
.controller("modelDataHistoryListController",['$rootScope','$scope','$state',
                                          '$stateParams','ModelDataService','ModelService',
                                          function($rootScope,$scope,$state,$stateParams, ModelDataService,ModelService){

	$scope.modelEnglishName = $stateParams.modelEnglishName;
	$scope.modelId = $stateParams.modelId;
	$scope.dataId = $stateParams.dataId;
	$scope.params = {
			modelId : $scope.modelId,
			dataId : $scope.dataId
	};
	$scope.displayHistory = function(history)
	{
		$state.go("main.list.modelData.historyVersionDisplay",{historyVersionId:history.EId});
	}
	$scope.operationColumns=[];
	
	var diaplayColumn={};
	diaplayColumn.click= $scope.displayHistory;
	diaplayColumn.label='查看';
	diaplayColumn.icon = "glyphicon glyphicon-edit";
	diaplayColumn.permission = $scope.modelEnglishName + '_history_display';
	$scope.operationColumns.push(diaplayColumn);
	
}]);
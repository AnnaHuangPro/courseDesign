angular.module('modelDataModule', [])
.controller("modelDataHistoryDisplayController",['$rootScope','$scope','$state',
                                          '$stateParams','HistoryService','ModelService',
                                          function($rootScope,$scope,$state,$stateParams, HistoryService,ModelService){

	$scope.historyVersionId = $stateParams.historyVersionId;
	$scope.modelDataHistory = {};
	$scope.dynamicFormKey = "";
	$scope.modelName = "";
	$scope.initData = function(){
		HistoryService.getModelData($scope.historyVersionId,successFn,errorFn);
		
		function successFn(data){
			$scope.modelDataHistory.modelData = angular.fromJson(data.history.content);
			$scope.modelDataHistory.dynamicFormKey = data.formKey;
			$scope.modelDataHistory.modelName = data.history.model.modelName;
		}
		function errorFn(error){
			alert(error);
		}
	}
	
}]);
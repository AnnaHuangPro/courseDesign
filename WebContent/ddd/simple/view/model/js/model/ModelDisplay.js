angular.module('modelModule', [])
.controller("modelDisplayController",['$scope','$stateParams','$state','ModelService',
function($scope,$stateParams,$state,ModelService)
{
	$scope.getDisplayInitData = function()
	{
		ModelService.findModelById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.model = data;
	}
	
	$scope.getDisplayInitDataFail = function()
	{
		alert('加载失败');
	}
	
	$scope.cancelOperate = function()
	{
		$state.go("main.list.model.modellist"); 
	}
}]);
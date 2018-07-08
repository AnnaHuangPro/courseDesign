angular.module('modelTypeModule', [])
.controller("modelTypeDisplayController",['$scope','$stateParams','$state','ModelTypeService',
function($scope,$stateParams,$state,ModelTypeService)
{
	$scope.getDisplayInitData = function()
	{
		ModelTypeService.findModelTypeById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.modelType = data;
	}
	
	$scope.getDisplayInitDataFail = function()
	{
		alert('加载失败');
	}
	
	$scope.cancelOperate = function()
	{
		$state.go("main.list.modelType.modelTypeList"); 
	}
}]);
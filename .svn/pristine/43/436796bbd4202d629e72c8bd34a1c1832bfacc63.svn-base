angular.module('dynamicFormModule', [])
.controller("dynamicFormDisplayController",['$scope','$stateParams','DynamicFormService',
function($scope,$stateParams,DynamicFormService)
{
	$scope.getDisplayInitData = function()
	{
		DynamicFormService.findDynamicFormById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.dynamicForm = data;
	}
	
	$scope.getDisplayInitDataFail = function()
	{
		alert('加载失败');
	}
}]);
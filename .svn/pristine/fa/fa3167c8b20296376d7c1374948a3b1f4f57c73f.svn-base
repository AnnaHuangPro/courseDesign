angular.module('departmentModule', [])
.controller("departmentDisplayController",['$rootScope','$scope','$stateParams','DepartmentService','$state',
function($rootScope,$scope,$stateParams,DepartmentService,$state)
{
	$scope.getDisplayInitData = function()
	{
		DepartmentService.findDepartmentById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.department = data;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
	$scope.cancelOperate = function() {
		$rootScope.closeOperateTab();
	}
}]);
angular.module('employeeModule', [])
.controller("employeeDisplayController",['$rootScope','$scope','$stateParams','EmployeeService',
function($rootScope,$scope,$stateParams,EmployeeService)
{
	$scope.getDisplayInitData = function()
	{
		EmployeeService.findEmployeeById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.employee = data;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
	$scope.cancelOperate = function(){
		$rootScope.closeOperateTab();
	}
}]);
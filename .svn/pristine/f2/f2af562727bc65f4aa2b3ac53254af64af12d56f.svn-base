angular.module('permissionModule', [])

.controller('permissionDisplayController',['$rootScope','$scope','$stateParams','PermissionService',
function($rootScope,$scope,$stateParams,PermissionService)
{
	$scope.getDisplayInitData = function()
	{
		PermissionService.findPermissionById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.permission = data;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
}]);
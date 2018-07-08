angular.module('taskManageModule', [])
.controller('taskManageDisplayController',['$scope','$stateParams','TaskManageService',
function($scope,$stateParams,TaskManageService)
{
	$scope.getDisplayInitData = function()
	{
		TaskManageService.findTaskManageById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.taskManage = data;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
}]);
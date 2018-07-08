angular.module('scheduleTaskModule', [])
.controller('scheduleTaskDisplayController',['$rootScope','$scope','$stateParams','ScheduleTaskService',
function($rootScope,$scope,$stateParams,ScheduleTaskService)
{
	$scope.getDisplayInitData = function()
	{
		ScheduleTaskService.findScheduleTaskById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.scheduleTask = data;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
	$scope.cancelOperate = function() {
		$rootScope.closeOperateTab();
		$state.go('main.list.scheduleTask.scheduleTaskList'); 
	}
}]);
angular.module('taskModule', [])
.controller('taskDisplayController',['$rootScope','$scope','$stateParams','TaskService','$state',
function($rootScope,$scope,$stateParams,TaskService,$state) {
	$scope.init = function() {
		function successCB(data) {
			$scope.task = data;
		}
		
		function errorCB(error)	{
			$rootScope.openErrorDialog(error);
		}
		TaskService.findTaskById($stateParams.id,successCB,errorCB);
	}
	
	$scope.cancelOperate = function() {
		$rootScope.closeOperateTab();
	}
}]);
angular.module('userModule', [])
.controller('userDisplayController',['$rootScope','$scope','$stateParams','UserService','$state',
function($rootScope,$scope,$stateParams,UserService,$state) {
	$scope.init = function() {
		function successCB(data) {
			$scope.user = data;
		}
		
		function errorCB(error)	{
			$rootScope.openErrorDialog(error);
		}
		UserService.findUserById($stateParams.id,successCB,errorCB);
	}
	
	$scope.cancelOperate = function() {
		$rootScope.closeOperateTab();
	}
}]);
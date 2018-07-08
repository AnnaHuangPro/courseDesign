angular.module('orderModule', [])
.controller('orderDisplayController',['$rootScope','$scope','$stateParams','OrderService','$state',
function($rootScope,$scope,$stateParams,OrderService,$state) {
	$scope.init = function() {
		function successCB(data) {
			$scope.order = data;
		}
		
		function errorCB(error)	{
			$rootScope.openErrorDialog(error);
		}
		OrderService.findOrderById($stateParams.id,successCB,errorCB);
	}
	
	$scope.cancelOperate = function() {
		$rootScope.closeOperateTab();
	}
}]);
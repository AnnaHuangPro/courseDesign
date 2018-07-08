angular.module('orderItemModule', [])
.controller('orderItemDisplayController',['$rootScope','$scope','$stateParams','OrderItemService','$state',
function($rootScope,$scope,$stateParams,OrderItemService,$state) {
	$scope.init = function() {
		function successCB(data) {
			$scope.orderItem = data;
		}
		
		function errorCB(error)	{
			$rootScope.openErrorDialog(error);
		}
		OrderItemService.findOrderItemById($stateParams.id,successCB,errorCB);
	}
	
	$scope.cancelOperate = function() {
		$rootScope.closeOperateTab();
	}
}]);
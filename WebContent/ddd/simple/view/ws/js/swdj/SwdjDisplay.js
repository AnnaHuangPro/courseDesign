angular.module('swdjModule', [])
.controller('swdjDisplayController',['$rootScope','$scope','$stateParams','SwdjService','$state',
function($rootScope,$scope,$stateParams,SwdjService,$state) {
	$scope.init = function() {
		function successCB(data) {
			$scope.swdj = data;
		}
		
		function errorCB(error)	{
			$rootScope.openErrorDialog(error);
		}
		SwdjService.findSwdjById($stateParams.id,successCB,errorCB);
	}
	
	$scope.cancelOperate = function() {
		$rootScope.closeOperateTab();
	}
}]);
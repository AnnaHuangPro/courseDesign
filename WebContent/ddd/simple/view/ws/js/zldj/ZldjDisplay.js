angular.module('zldjModule', [])
.controller('zldjDisplayController',['$rootScope','$scope','$stateParams','ZldjService','$state',
function($rootScope,$scope,$stateParams,ZldjService,$state) {
	$scope.init = function() {
		function successCB(data) {
			$scope.zldj = data;
		}
		
		function errorCB(error)	{
			$rootScope.openErrorDialog(error);
		}
		ZldjService.findZldjById($stateParams.id,successCB,errorCB);
	}
	
	$scope.cancelOperate = function() {
		$rootScope.closeOperateTab();
	}
}]);
angular.module('repairModule', [])
.controller('repairDisplayController',['$rootScope','$scope','$stateParams','RepairService','$state',
function($rootScope,$scope,$stateParams,RepairService,$state) {
	$scope.init = function() {
		function successCB(data) {
			$scope.repair = data;
		}
		
		function errorCB(error)	{
			$rootScope.openErrorDialog(error);
		}
		RepairService.findRepairById($stateParams.id,successCB,errorCB);
	}
	
	$scope.cancelOperate = function() {
		$rootScope.closeOperateTab();
	}
}]);
angular.module('systemConfigTypeModule', [])
.controller('systemConfigTypeDisplayController',['$rootScope','$scope','$stateParams','SystemConfigTypeService','$state',
function($rootScope,$scope,$stateParams,SystemConfigTypeService,$state) {
	$scope.init = function() {
		function successCB(data) {
			$scope.systemConfigType = data;
		}
		
		function errorCB(error)	{
			$rootScope.openErrorDialog(error);
		}
		SystemConfigTypeService.findSystemConfigTypeById($stateParams.id,successCB,errorCB);
	}
	
	$scope.cancelOperate = function() {
		$rootScope.closeOperateTab();
	}
}]);
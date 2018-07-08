angular.module('dataSourceTypeModule', [])
.controller('dataSourceTypeDisplayController',['$rootScope','$scope','$stateParams','DataSourceTypeService','$state',
function($rootScope,$scope,$stateParams,DataSourceTypeService,$state) {
	$scope.init = function() {
		function successCB(data) {
			$scope.dataSourceType = data;
		}
		
		function errorCB(error)	{
			$rootScope.openErrorDialog(error);
		}
		DataSourceTypeService.findDataSourceTypeById($stateParams.id,successCB,errorCB);
	}
	
	$scope.cancelOperate = function() {
		$rootScope.closeOperateTab();
	}
}]);
/**
 * 
 */
angular.module('dataSourceModule', [])

.controller('dataSourceDisplayController',['$rootScope','$scope','$state','$stateParams','DataSourceService',function($rootScope,$scope,$state,$stateParams,DataSourceService){
	$scope.getDisplayInitData = function()
	{
		DataSourceService.findDataSourceById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.dataSource = data;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
}]);
angular.module('systemConfigModule', [])
.controller('systemConfigDisplayController',['$scope','$stateParams','SystemConfigService',
function($scope,$stateParams,SystemConfigService)
{
	$scope.getDisplayInitData = function()
	{
		SystemConfigService.findSystemConfigById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.systemConfig = data;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
}]);
angular.module('outInterfaceConfigModule', [])
.controller('outInterfaceConfigDisplayController',['$scope','$stateParams','OutInterfaceConfigService',
function($scope,$stateParams,OutInterfaceConfigService)
{
	$scope.getDisplayInitData = function()
	{
		OutInterfaceConfigService.findOutInterfaceConfigById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.outInterfaceConfig = data;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
}]);
angular.module('entityPropertyModule', [])
.controller("entityPropertyDisplayController",['$scope','$stateParams','EntityPropertyService',
function($scope,$stateParams,EntityPropertyService)
{
	$scope.getDisplayInitData = function()
	{
		EntityPropertyService.findEntityPropertyById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.entityProperty = data;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
}]);
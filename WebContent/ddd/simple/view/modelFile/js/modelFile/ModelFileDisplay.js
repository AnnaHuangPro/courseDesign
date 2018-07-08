angular.module('modelFileModule', [])
.controller('modelFileDisplayController',['$scope','$stateParams','ModelFileService',
function($scope,$stateParams,ModelFileService)
{
	$scope.getDisplayInitData = function()
	{
		ModelFileService.findModelFileById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.modelFile = data;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
}]);
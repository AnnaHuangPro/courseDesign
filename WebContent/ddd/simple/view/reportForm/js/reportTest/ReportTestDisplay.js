angular.module('reportTestModule', [])
.controller('reportTestDisplayController',['$scope','$stateParams','ReportTestService',
function($scope,$stateParams,ReportTestService)
{
	$scope.getDisplayInitData = function()
	{
		ReportTestService.findReportTestById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.reportTest = data;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
}]);
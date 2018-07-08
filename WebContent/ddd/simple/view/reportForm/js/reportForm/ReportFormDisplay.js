angular.module('reportFormModule', [])
.controller("reportFormDisplayController",['$scope','$stateParams','ReportFormService',
function($scope,$stateParams,ReportFormService)
{
	$scope.getDisplayInitData = function()
	{
		ReportFormService.findReportFormById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.reportForm = data;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
}]);
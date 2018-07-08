/**
 * 
 */
angular.module('reportViewModule', [])
.controller('reportViewDisplayController',['$rootScope','$scope','$stateParams','ReportviewService',
function($rootScope,$scope,$stateParams,ReportviewService)
{
	$scope.getDisplayInitData = function()
	{
		ReportviewService.findReportViewById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.displayListViewKey = data.reportView.reportViewKey;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
}]);
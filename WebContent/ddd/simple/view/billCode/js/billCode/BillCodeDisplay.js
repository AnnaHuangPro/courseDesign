angular.module('billCodeModule', [])
.controller('billCodeDisplayController',['$scope','$stateParams','BillCodeService',
function($scope,$stateParams,BillCodeService)
{
	$scope.getDisplayInitData = function()
	{
		BillCodeService.findBillCodeById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.billCode = data;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
}]);
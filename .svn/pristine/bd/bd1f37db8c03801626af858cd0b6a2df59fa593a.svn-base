angular.module('operatorModule', [])

.controller('operatorDisplayController',['$rootScope','$scope','$stateParams','OperatorService','$state',
function($rootScope,$scope,$stateParams,OperatorService,$state)
{
	$scope.getDisplayInitData = function()
	{
		OperatorService.findOperatorById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.operator = data;
	}
	
	$scope.cancelOperate = function(){
		$rootScope.closeOperateTab();
		$state.go('main.list.operator.operatorList'); 
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
}]);
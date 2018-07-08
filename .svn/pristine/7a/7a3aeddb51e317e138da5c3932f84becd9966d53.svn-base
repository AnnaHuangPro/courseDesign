angular.module('entityPropertyDefineModule', [])
.controller("entityPropertyDefineDisplayController",['$rootScope','$scope','$state','$stateParams','EntityPropertyDefineService',
function($rootScope,$scope,$state,$stateParams,EntityPropertyDefineService)
{
	$scope.getDisplayInitData = function()
	{
		EntityPropertyDefineService.findEntityPropertyDefineById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.entityPropertyDefine = data;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
	$scope.cancelOperate = function(){
		$rootScope.closeOperateTab();
		$state.go("main.list.entityPropertyDefine.entityPropertyDefineList"); 
		$scope.refreshGrid();
	}
	
}]);
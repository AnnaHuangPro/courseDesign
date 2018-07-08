angular.module('moduleModule', [])

.controller('moduleDisplayController',['$rootScope','$scope','$stateParams','ModuleService','$state',
function($rootScope,$scope,$stateParams,ModuleService,$state)
{
	$scope.getDisplayInitData = function()
	{
		ModuleService.findModuleById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.module = data;
	}
	$scope.cancelOperate = function(){
		$rootScope.closeOperateTab();
		$state.go('main.list.module.moduleList'); 
	}
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
}]);
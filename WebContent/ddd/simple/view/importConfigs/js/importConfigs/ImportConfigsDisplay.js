angular.module('importConfigsModule', [])
.controller('importConfigsDisplayController',['$rootScope','$scope','$stateParams','ImportConfigsService',
function($rootScope,$scope,$stateParams,ImportConfigsService)
{
	$scope.getDisplayInitData = function()
	{
		ImportConfigsService.findImportConfigsById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.importConfigs = data;
	}
	
	$scope.getDisplayInitDataFail = function()
	{
		alert('加载失败');
	}
	$scope.cancelOperate = function(){
		$rootScope.closeOperateTab();
	}
}]);
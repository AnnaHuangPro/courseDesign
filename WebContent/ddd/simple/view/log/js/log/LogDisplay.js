angular.module('logModule', [])
.controller('logDisplayController',['$rootScope','$scope','$stateParams','LogService','$state',
function($rootScope,$scope,$stateParams,LogService,$state)
{
	$scope.getDisplayInitData = function()
	{
		LogService.findLogById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.log = data;
	}
	
	$scope.getDisplayInitDataFail = function()
	{
		alert('加载失败');
	}
	
	$scope.cancelOperate = function(){
		$rootScope.closeOperateTab();
	}
}]);
angular.module('entityTipsModule', [])
.controller('entityTipsDisplayController',['$scope','$stateParams','EntityTipsService',
function($scope,$stateParams,EntityTipsService)
{
	$scope.getDisplayInitData = function()
	{
		EntityTipsService.findEntityTipsById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.entityTips = data;
	}
	
	$scope.getDisplayInitDataFail = function()
	{
		alert('加载失败');
	}
}]);
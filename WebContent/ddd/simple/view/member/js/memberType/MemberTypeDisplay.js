angular.module('memberTypeModule', [])
.controller('memberTypeDisplayController',['$rootScope','$scope','$state','$stateParams','MemberTypeService',
function($rootScope,$scope,$state,$stateParams,MemberTypeService)
{
	$scope.getDisplayInitData = function()
	{
		MemberTypeService.findMemberTypeById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.memberType = data;
	}
	
	$scope.getDisplayInitDataFail = function()
	{
		alert('加载失败');
	}
	$scope.cancelOperate = function()
	{
		$rootScope.closeOperateTab();
		$state.go("main.list.memberType.memberTypeList");
	}
}]);
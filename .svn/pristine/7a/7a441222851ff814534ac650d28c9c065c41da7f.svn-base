angular.module('memberGroupModule', [])
.controller('memberGroupDisplayController',['$scope','$stateParams','MemberGroupService',
function($scope,$stateParams,MemberGroupService)
{
	$scope.getDisplayInitData = function()
	{
		MemberGroupService.findMemberGroupById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.memberGroup = data;
	}
	
	$scope.getDisplayInitDataFail = function()
	{
		alert('加载失败');
	}
}]);
angular.module('roleModule', [])

.controller('roleDisplayController',['$rootScope','$state','$scope','$stateParams','RoleService',
function($rootScope,$state,$scope,$stateParams,RoleService)
{
	$scope.getDisplayInitData = function()
	{
		RoleService.findRoleById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	$scope.cancelOperate = function(){
		$rootScope.closeOperateTab();
		$state.go('main.list.role.roleList'); 
	}
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.role = data;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
}]);
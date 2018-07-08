angular.module('attachementGroupModule', [])
.controller('attachementGroupDisplayController',['$scope','$stateParams','AttachementGroupService',
function($scope,$stateParams,AttachementGroupService)
{
	$scope.getDisplayInitData = function()
	{
		AttachementGroupService.findAttachementGroupById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.attachementGroup = data;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
}]);
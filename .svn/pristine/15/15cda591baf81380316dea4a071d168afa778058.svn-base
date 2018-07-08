angular.module('attachmentGroupCategoryModule', [])
.controller('attachmentGroupCategoryDisplayController',['$scope','$stateParams','AttachmentGroupCategoryService',
function($scope,$stateParams,AttachmentGroupCategoryService)
{
	$scope.getDisplayInitData = function()
	{
		AttachmentGroupCategoryService.findAttachmentGroupCategoryById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.attachmentGroupCategory = data;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
}]);
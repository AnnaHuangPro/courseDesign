angular.module('attachmentGroupItemModule', [])
.controller('attachmentGroupItemDisplayController',['$scope','$stateParams','AttachmentGroupItemService',
function($scope,$stateParams,AttachmentGroupItemService)
{
	$scope.getDisplayInitData = function()
	{
		AttachmentGroupItemService.findAttachmentGroupItemById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.attachmentGroupItem = data;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
}]);
angular.module('attachmentGroupTemplateModule', [])
.controller('attachmentGroupTemplateDisplayController',['$scope','$stateParams','AttachmentGroupTemplateService',
function($scope,$stateParams,AttachmentGroupTemplateService)
{
	$scope.getDisplayInitData = function()
	{
		AttachmentGroupTemplateService.findAttachmentGroupTemplateById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.attachmentGroupTemplate = data;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
}]);
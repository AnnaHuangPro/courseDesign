angular.module('organizationModule', [])
.controller("organizationDisplayController",['$rootScope','$scope',"$state",'$stateParams','OrganizationService',
function($rootScope,$scope,$state,$stateParams,OrganizationService)
{
	$scope.propertiesLoad = false;
	$scope.propertiesValueLoad = false;
	
	$scope.hasAdditionField = false;
	
	$scope.init = function()
	{
		OrganizationService.findOrganizationById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	
	$scope.cancelOperate = function(){
		$rootScope.closeOperateTab();
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.organization = data;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
}]);
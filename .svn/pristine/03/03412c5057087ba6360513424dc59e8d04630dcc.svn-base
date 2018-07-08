angular.module('codeTypeModule', [])
.controller("codeTypeDisplayController",['$scope','$stateParams','CodeTypeService','$state',
function($scope,$stateParams,CodeTypeService,$state)
{
	$scope.getDisplayInitData = function()
	{
		CodeTypeService.findCodeTypeById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	$scope.cancelOperate = function() {
		$scope.closeOperateTab();
		$state.go('main.list.codeType.codeTypeList');
	}
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.codeType = data;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}	
	
}]);
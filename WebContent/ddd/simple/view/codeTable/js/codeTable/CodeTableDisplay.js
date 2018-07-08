angular.module('codeTableModule', [])
.controller("codeTableDisplayController",['$rootScope','$scope','$stateParams','CodeTableService','$state',
function($rootScope,$scope,$stateParams,CodeTableService,$state)
{
	$scope.getDisplayInitData = function()
	{
		CodeTableService.findCodeTableById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}

	$scope.cancelOperate = function(){	
 		$scope.closeOperateTab();
		$state.go('main.list.codeTable.codeTableList');
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.codeTable = data;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
}]);
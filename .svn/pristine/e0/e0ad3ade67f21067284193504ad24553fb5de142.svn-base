angular.module('modelDataTypeModule', [])
.controller('modelDataTypeDisplayController',['$scope','$stateParams','ModelDataTypeService',
function($scope,$stateParams,ModelDataTypeService)
{
	$scope.getDisplayInitData = function()
	{
		ModelDataTypeService.findModelDataTypeById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.modelDataType = data;
	}
	
	$scope.getDisplayInitDataFail = function()
	{
		alert('加载失败');
	}
}]);
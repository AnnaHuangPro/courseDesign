angular.module('exporterConfigModule', [])
.controller('exporterConfigDisplayController',['$scope','$stateParams','ExporterConfigService',
function($scope,$stateParams,ExporterConfigService)
{
	$scope.getDisplayInitData = function()
	{
		ExporterConfigService.findExporterConfigById($stateParams.id,$scope.getDisplayInitDataSuccess,$scope.getDisplayInitDataFail);
	}
	
	$scope.getDisplayInitDataSuccess = function(data)
	{
		$scope.exporterConfig = data;
	}
	
	$scope.getDisplayInitDataFail = function(error)
	{
		$rootScope.openErrorDialog(error);
	}
	$scope.cancelOperate = function() {
		$scope.closeOperateTab();
		$state.go('main.list.exporterConfig.exporterConfigList');
	}
}]);
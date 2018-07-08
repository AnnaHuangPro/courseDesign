angular.module('exporterConfigModule', [])
.controller('exporterConfigFormController',['$rootScope','$scope','ExporterConfigService','$state','angularPermission','$stateParams',
function($rootScope,$scope,ExporterConfigService,$state,angularPermission,$stateParams){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;

	$scope.getInitExporterConfigData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getExporterConfigDetail();
		}
	}
	
	$scope.getExporterConfigDetail = function()
	{
		ExporterConfigService.findExporterConfigById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.exporterConfig = data;
		};

		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		};
	};
	
	$scope.saveExporterConfig = function(exporterConfig)
	{
		if($scope.operate=='add')
		{
			$scope.addExporterConfig(exporterConfig,true);
		}
		else if($scope.operate=='edit')
		{
			$scope.updateExporterConfig(exporterConfig);
		}
	}
	
	$scope.saveAndAddExporterConfig = function(exporterConfig)
	{
		$scope.addExporterConfig(exporterConfig,false);
	}	
	$scope.addExporterConfig = function(exporterConfig,needColseTab)
	{   
		ExporterConfigService.saveExporterConfig({exporterConfig:exporterConfig},sucesscb,errorcb);

		function sucesscb()
		{
			if(needColseTab){
				refreshGrid();
				$scope.back();
			}
			else
				$scope.exporterConfig={};			
		}
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateExporterConfig = function(exporterConfig)
	{
		ExporterConfigService.updateExporterConfig({exporterConfig:exporterConfig},sucesscb,errorcb);
	
		function sucesscb()
		{
			refreshGrid();
			$scope.back();
		}
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		}
	};
//	$scope.closeOperate = function() {
//		$scope.closeOperateTab();
//	}
//	$scope.refreshGrid = function(){
//		var controller = $rootScope.getController('exporterConfigListGrid' , 'ddatagrid');
//		if(controller){
//			controller.refreshCurrent();
//		}
//	}
	function refreshGrid(){
		$scope.refreshGrid("exporterConfigListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"exporterConfigList","main.list.exporterConfig.exporterConfigList")
	}
}]);
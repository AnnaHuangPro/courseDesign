angular.module('systemConfigModule', [])
.controller('systemConfigFormController',['$rootScope','$scope','SystemConfigService','$state','angularPermission','$stateParams',
function($rootScope,$scope,SystemConfigService,$state,angularPermission,$stateParams){
	$scope.showSaveAndAddButton = $scope.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;

	$scope.getInitSystemConfigData = function()
	{
		if($scope.operate=='edit' || $scope.operate=='view')
		{
			$scope.getSystemConfigDetail();
		}
	}
	$scope.getSystemConfigDetail = function()
	{
		SystemConfigService.findSystemConfigById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.systemConfig = data;
		};

		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		};
	};
	
	$scope.saveSystemConfig = function(systemConfig)
	{
		if($scope.operate=='add')
		{
			$scope.addSystemConfig(systemConfig,true);
		}
		else if($scope.operate=='edit')
		{
			$scope.updateSystemConfig(systemConfig);
		}
	}
	
	$scope.saveAndAddSystemConfig = function(systemConfig)
	{
		$scope.addSystemConfig(systemConfig,false);
	}
	
	$scope.addSystemConfig = function(systemConfig,needColseTab)
	{   
		SystemConfigService.saveSystemConfig({systemConfig:systemConfig},sucesscb,errorcb);

		function sucesscb()
		{
			if(needColseTab){
				refreshGrid();
				$scope.back();	
			}
			else
				$scope.systemConfig=null;
		}
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateSystemConfig = function(systemConfig)
	{
		SystemConfigService.updateSystemConfig({systemConfig:systemConfig},sucesscb,errorcb);
	
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
	
//	$scope.refreshGrid = function(){
//		var controller = $rootScope.getController('systemConfigListGrid' , 'ddatagrid');
//		if(controller){
//			controller.refreshCurrent();
//		}
//	}
	function refreshGrid(){
		$scope.refreshGrid("systemConfigListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"systemConfigList","main.list.systemConfig.systemConfigList")
	}
}]);
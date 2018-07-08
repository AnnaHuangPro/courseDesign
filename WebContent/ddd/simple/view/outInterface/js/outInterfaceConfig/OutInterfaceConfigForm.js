angular.module('outInterfaceConfigModule', [])
.controller('outInterfaceConfigFormController',['$rootScope','$scope','OutInterfaceConfigService','$state','angularPermission','$stateParams',
function($rootScope,$scope,OutInterfaceConfigService,$state,angularPermission,$stateParams){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;

	$scope.getInitOutInterfaceConfigData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getOutInterfaceConfigDetail();
		}
	}
	
	$scope.getOutInterfaceConfigDetail = function()
	{
		OutInterfaceConfigService.findOutInterfaceConfigById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.outInterfaceConfig = data;
		};

		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		};
	};
	
	$scope.saveOutInterfaceConfig = function(outInterfaceConfig)
	{
		if($scope.operate=='add')
		{
			$scope.addOutInterfaceConfig(outInterfaceConfig,true);
		}
		else if($scope.operate=='edit')
		{
			$scope.updateOutInterfaceConfig(outInterfaceConfig);
		}
	}
	
	$scope.saveAndAddOutInterfaceConfig = function(outInterfaceConfig)
	{
		$scope.addOutInterfaceConfig(outInterfaceConfig,false);
	}	
	$scope.addOutInterfaceConfig = function(outInterfaceConfig,needColseTab)
	{   
		OutInterfaceConfigService.saveOutInterfaceConfig({outInterfaceConfig:outInterfaceConfig},sucesscb,errorcb);

		function sucesscb()
		{
			if(needColseTab){
				refreshGrid();
				$scope.back();	
			}
			else
				$scope.outInterfaceConfig=null;
		}
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateOutInterfaceConfig = function(outInterfaceConfig)
	{
		OutInterfaceConfigService.updateOutInterfaceConfig({outInterfaceConfig:outInterfaceConfig},sucesscb,errorcb);
	
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
//		var controller = $rootScope.getController('outInterfaceConfigListGrid' , 'ddatagrid');
//		if(controller){
//			controller.refreshCurrent();
//		}
//	}
	function refreshGrid(){
		$scope.refreshGrid("outInterfaceConfigListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"outInterfaceConfigList","main.list.outInterfaceConfig.outInterfaceConfigList")
	}
}]);
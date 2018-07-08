angular.module('moduleModule',[])

.controller('moduleFormController',['$rootScope','$stateParams','$scope','ModuleService','$state',
                                    function($rootScope,$stateParams,$scope,ModuleService,$state){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ? true : false;
	$scope.operate = $stateParams.operate;
	$scope.chooses = ["电脑模块","手机模块"];
	$scope.initModuleData = function()
	{
		if($stateParams.operate != 'add')
		{
			ModuleService.findModuleById($stateParams.id,successCB,errorCB);
			function successCB(data)
			{	
				$scope.module = data;
			}
			function errorCB(error)
			{
				$rootScope.openErrorDialog(error);
			}
		}
		else
		{
			$scope.module={};
			$scope.module.displayIndex =999;
			$scope.module.moduleType = "是";
		}
	}
	$scope.saveModule = function(module)
	{
		if($stateParams.operate == 'add') {
			$scope.addModule(module, true);
		}
		else if($stateParams.operate == 'edit') {
			$scope.updateModule(module);
		}
	}	
	$scope.cancelOperate = function() {
		$scope.closeOperateTab();
		$state.go('main.list.module.moduleList');
	}
	$scope.saveAndAddModule = function(module) {
		$scope.addModule(module,false);
	}
	$scope.addModule = function(module,needColseTab) {
		ModuleService.saveModule(module,successCB,errorCB);
		function successCB(data) {		
			// 新增界面，实体保存成功之后调用附加字段指令的保存附加字段的值
			if ($rootScope.getController('moduleId','dentityproperties'))
				$rootScope.getController('moduleId','dentityproperties').saveEntityProperties(data.eId);
			if (needColseTab) {
				$scope.refreshGrid();
				$rootScope.closeOperateTab();
				$state.go('main.list.module.moduleList');
			}
			else{
				// 保存并新增
				$scope.module={};
			}			
		}
		function errorCB(error) {
			$rootScope.openErrorDialog(error);
		}		
	}
	/*$scope.saveModule = function(module)
	{
		ModuleService.saveModule(module,sucessCB,errorCB);
		function sucessCB()
		{
			$scope.refreshGrid();
			$rootScope.closeOperateTab();
			$state.go('main.list.module.moduleList');	
		}
		function errorCB(error)
		{
			$rootScope.openErrorDialog(error);
		}
	}*/
	$scope.updateModule = function(module){
		ModuleService.updateModule(module,successCB,errorCB);
		function successCB(data)
		{
			$scope.refreshGrid();
			$rootScope.closeOperateTab();
			$state.go('main.list.module.moduleList');					
		}
		function errorCB(error)
		{
			$rootScope.openErrorDialog(error);
		}
	}	
	$scope.refreshGrid = function() {
		var controller = $rootScope.getController('moduleListGrid', 'ddatagrid');
		if (controller) {
			controller.refreshCurrent();
		}
	}
}]);

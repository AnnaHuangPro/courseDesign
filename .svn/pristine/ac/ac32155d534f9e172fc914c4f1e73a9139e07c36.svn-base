angular.module('systemConfigTypeModule', [])
.controller('systemConfigTypeFormController',['$rootScope','$scope','SystemConfigTypeService','$state','angularPermission','$stateParams','dialogs',
function($rootScope,$scope,SystemConfigTypeService,$state,angularPermission,$stateParams,dialogs) {
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	
	$scope.create = function() {
		$scope.systemConfigType = {};
		//设置默认值
	}
	
	$scope.init = function() {
		if($stateParams.operate=='edit') {
			$scope.findSystemConfigType();
		}
		else if($stateParams.operate=='add') {
			$scope.create(); 
		}
		else {
			dialogs.error("错误","操作类型 "+$scope.operate+" 在当前请求中无效");
		}
	}
	
	$scope.findSystemConfigType = function() {
		$rootScope.app.asynchroMask.mask("加载中。。。。。");
		SystemConfigTypeService.findSystemConfigTypeById($scope.id,sucessCB,errorCB);

		function sucessCB(data)	{
			$rootScope.app.asynchroMask.unmask();
			$scope.systemConfigType = data;
		};

		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.saveSystemConfigType = function(isNeedNew) {
		if($scope.operate=='add') {
			$scope.addSystemConfigType($scope.systemConfigType,isNeedNew);
		}
		else if($scope.operate=='edit')	{
			$scope.updateSystemConfigType($scope.systemConfigType,isNeedNew);
		}
	}
	
	
	$scope.addSystemConfigType = function(systemConfigType,isNeedNew) {   
		
		if(angularPermission.hasPermission('systemConfigType_add')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			SystemConfigTypeService.saveSystemConfigType(systemConfigType,sucessCB,errorCB);
		}
		else {
			dialogs.error("错误","操作: 新增  未被授权，请联系管理人员");
		}
		function sucessCB()	{
			$rootScope.app.asynchroMask.unmask();
			if(isNeedNew){
				$scope.operate='add';
				$scope.create();
			}
			else {
				$scope.refreshGrid();
				$rootScope.closeOperateTab();
				$state.go('main.list.systemConfigType.systemConfigTypeList');
			}
			
		}
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateSystemConfigType = function(systemConfigType,isNeedNew) {
		
		if(angularPermission.hasPermission('systemConfigType_edit')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			SystemConfigTypeService.updateSystemConfigType(systemConfigType,sucessCB,errorCB);
		}
		else {
			dialogs.error("错误","操作: 编辑  未被授权，请联系管理人员");
		}
		function sucessCB()	{
			$rootScope.app.asynchroMask.unmask();			
			if(isNeedNew) {
				$scope.operate='add';
				$scope.create();
			}
			//处理一些默认值
			else {
				$scope.refreshGrid();
				$rootScope.closeOperateTab();
				$state.go('main.list.systemConfigType.systemConfigTypeList');
			}			
		}
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.cancel = function() {
		$scope.refreshGrid();
		$rootScope.closeOperateTab();
		$state.go('main.list.systemConfigType.systemConfigTypeList');
	}
	
	$scope.refreshGrid = function() {
		var controller = $rootScope.getController('systemConfigTypeListGrid' , 'ddatagrid');
		if(controller) {
			controller.refreshCurrent();
		}
	}
}]);
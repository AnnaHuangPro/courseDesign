angular.module('repairModule', [])
.controller('repairFormController',['$rootScope','$scope','RepairService','$state','angularPermission','$stateParams','dialogs',
function($rootScope,$scope,RepairService,$state,angularPermission,$stateParams,dialogs) {
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	
	$scope.create = function() {
		$scope.repair = {};
		//设置默认值
	}
	
	$scope.init = function() {
		if($stateParams.operate=='edit') {
			$scope.findRepair();
		}
		else if($stateParams.operate=='add') {
			$scope.create(); 
		}
		else {
			dialogs.error("错误","操作类型 "+$scope.operate+" 在当前请求中无效");
		}
	}
	
	$scope.findRepair = function() {
		$rootScope.app.asynchroMask.mask("加载中。。。。。");
		RepairService.findRepairById($scope.id,sucessCB,errorCB);

		function sucessCB(data)	{
			$rootScope.app.asynchroMask.unmask();
			$scope.repair = data;
		};

		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.saveRepair = function(isNeedNew) {
		if($scope.operate=='add') {
			$scope.addRepair($scope.repair,isNeedNew);
		}
		else if($scope.operate=='edit')	{
			$scope.updateRepair($scope.repair,isNeedNew);
		}
	}
	
	
	$scope.addRepair = function(repair,isNeedNew) {   
		
		if(angularPermission.hasPermission('repair_add')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			RepairService.saveRepair(repair,sucessCB,errorCB);
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
				$state.go('main.list.repair.repairList');
			}
			
		}
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateRepair = function(repair,isNeedNew) {
		
		if(angularPermission.hasPermission('repair_edit')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			RepairService.updateRepair(repair,sucessCB,errorCB);
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
				$state.go('main.list.repair.repairList');
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
		$state.go('main.list.repair.repairList');
	}
	
	$scope.refreshGrid = function() {
		var controller = $rootScope.getController('repairListGrid' , 'ddatagrid');
		if(controller) {
			controller.refreshCurrent();
		}
	}
}]);
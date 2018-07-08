angular.module('orderItemModule', [])
.controller('orderItemFormController',['$rootScope','$scope','OrderItemService','$state','angularPermission','$stateParams','dialogs',
function($rootScope,$scope,OrderItemService,$state,angularPermission,$stateParams,dialogs) {
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	
	$scope.create = function() {
		$scope.orderItem = {};
		//设置默认值
	}
	
	$scope.init = function() {
		if($stateParams.operate=='edit') {
			$scope.findOrderItem();
		}
		else if($stateParams.operate=='add') {
			$scope.create(); 
		}
		else {
			dialogs.error("错误","操作类型 "+$scope.operate+" 在当前请求中无效");
		}
	}
	
	$scope.findOrderItem = function() {
		$rootScope.app.asynchroMask.mask("加载中。。。。。");
		OrderItemService.findOrderItemById($scope.id,sucessCB,errorCB);

		function sucessCB(data)	{
			$rootScope.app.asynchroMask.unmask();
			$scope.orderItem = data;
		};

		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.saveOrderItem = function(isNeedNew) {
		if($scope.operate=='add') {
			$scope.addOrderItem($scope.orderItem,isNeedNew);
		}
		else if($scope.operate=='edit')	{
			$scope.updateOrderItem($scope.orderItem,isNeedNew);
		}
	}
	
	
	$scope.addOrderItem = function(orderItem,isNeedNew) {   
		
		if(angularPermission.hasPermission('orderItem_add')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			OrderItemService.saveOrderItem(orderItem,sucessCB,errorCB);
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
				$state.go('main.list.orderItem.orderItemList');
			}
			
		}
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateOrderItem = function(orderItem,isNeedNew) {
		
		if(angularPermission.hasPermission('orderItem_edit')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			OrderItemService.updateOrderItem(orderItem,sucessCB,errorCB);
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
				$state.go('main.list.orderItem.orderItemList');
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
		$state.go('main.list.orderItem.orderItemList');
	}
	
	$scope.refreshGrid = function() {
		var controller = $rootScope.getController('orderItemListGrid' , 'ddatagrid');
		if(controller) {
			controller.refreshCurrent();
		}
	}
}]);
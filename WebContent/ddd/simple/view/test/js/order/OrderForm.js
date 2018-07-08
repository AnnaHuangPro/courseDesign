angular.module('orderModule', [])
.controller('orderFormController',['$rootScope','$scope','OrderService','$state','angularPermission','$stateParams','dialogs',
function($rootScope,$scope,OrderService,$state,angularPermission,$stateParams,dialogs) {
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	
	$scope.create = function() {
		$scope.order = {};
		//设置默认值
	}
	
	$scope.init = function() {
		if($stateParams.operate=='edit') {
			$scope.findOrder();
		}
		else if($stateParams.operate=='add') {
			$scope.create(); 
		}
		else {
			dialogs.error("错误","操作类型 "+$scope.operate+" 在当前请求中无效");
		}
	}
	
	$scope.findOrder = function() {
		$rootScope.app.asynchroMask.mask("加载中。。。。。");
		OrderService.findOrderById($scope.id,sucessCB,errorCB);

		function sucessCB(data)	{
			$rootScope.app.asynchroMask.unmask();
			$scope.order = data;
		};

		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.saveOrder = function(isNeedNew) {
		if($scope.operate=='add') {
			$scope.addOrder($scope.order,isNeedNew);
		}
		else if($scope.operate=='edit')	{
			$scope.updateOrder($scope.order,isNeedNew);
		}
	}
	
	
	$scope.addOrder = function(order,isNeedNew) {   
		
		if(angularPermission.hasPermission('order_add')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			OrderService.saveOrder(order,sucessCB,errorCB);
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
				$state.go('main.list.order.orderList');
			}
			
		}
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateOrder = function(order,isNeedNew) {
		
		if(angularPermission.hasPermission('order_edit')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			OrderService.updateOrder(order,sucessCB,errorCB);
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
				$state.go('main.list.order.orderList');
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
		$state.go('main.list.order.orderList');
	}
	
	$scope.refreshGrid = function() {
		var controller = $rootScope.getController('orderListGrid' , 'ddatagrid');
		if(controller) {
			controller.refreshCurrent();
		}
	}
}]);
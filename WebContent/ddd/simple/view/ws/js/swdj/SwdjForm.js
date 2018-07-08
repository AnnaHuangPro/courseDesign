angular.module('swdjModule', [])
.controller('swdjFormController',['$rootScope','$scope','SwdjService','$state','angularPermission','$stateParams','dialogs',
function($rootScope,$scope,SwdjService,$state,angularPermission,$stateParams,dialogs) {
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	
	$scope.create = function() {
		$scope.swdj = {};
		//设置默认值
	}
	
	$scope.init = function() {
		if($stateParams.operate=='edit') {
			$scope.findSwdj();
		}
		else if($stateParams.operate=='add') {
			$scope.create(); 
		}
		else {
			dialogs.error("错误","操作类型 "+$scope.operate+" 在当前请求中无效");
		}
	}
	
	$scope.findSwdj = function() {
		$rootScope.app.asynchroMask.mask("加载中。。。。。");
		SwdjService.findSwdjById($scope.id,sucessCB,errorCB);

		function sucessCB(data)	{
			$rootScope.app.asynchroMask.unmask();
			$scope.swdj = data;
		};

		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.saveSwdj = function(isNeedNew) {
		if($scope.operate=='add') {
			$scope.addSwdj($scope.swdj,isNeedNew);
		}
		else if($scope.operate=='edit')	{
			$scope.updateSwdj($scope.swdj,isNeedNew);
		}
	}
	
	
	$scope.addSwdj = function(swdj,isNeedNew) {   
		
		if(angularPermission.hasPermission('swdj_add')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			SwdjService.saveSwdj(swdj,sucessCB,errorCB);
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
				$state.go('main.list.swdj.swdjList');
			}
			
		}
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateSwdj = function(swdj,isNeedNew) {
		
		if(angularPermission.hasPermission('swdj_edit')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			SwdjService.updateSwdj(swdj,sucessCB,errorCB);
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
				$state.go('main.list.swdj.swdjList');
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
		$state.go('main.list.swdj.swdjList');
	}
	
	$scope.refreshGrid = function() {
		var controller = $rootScope.getController('swdjListGrid' , 'ddatagrid');
		if(controller) {
			controller.refreshCurrent();
		}
	}
}]);
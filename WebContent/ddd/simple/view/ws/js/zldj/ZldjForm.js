angular.module('zldjModule', [])
.controller('zldjFormController',['$rootScope','$scope','ZldjService','$state','angularPermission','$stateParams','dialogs',
function($rootScope,$scope,ZldjService,$state,angularPermission,$stateParams,dialogs) {
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	
	$scope.create = function() {
		$scope.zldj = {};
		//设置默认值
	}
	
	$scope.init = function() {
		if($stateParams.operate=='edit') {
			$scope.findZldj();
		}
		else if($stateParams.operate=='add') {
			$scope.create(); 
		}
		else {
			dialogs.error("错误","操作类型 "+$scope.operate+" 在当前请求中无效");
		}
	}
	
	$scope.findZldj = function() {
		$rootScope.app.asynchroMask.mask("加载中。。。。。");
		ZldjService.findZldjById($scope.id,sucessCB,errorCB);

		function sucessCB(data)	{
			$rootScope.app.asynchroMask.unmask();
			$scope.zldj = data;
		};

		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.saveZldj = function(isNeedNew) {
		if($scope.operate=='add') {
			$scope.addZldj($scope.zldj,isNeedNew);
		}
		else if($scope.operate=='edit')	{
			$scope.updateZldj($scope.zldj,isNeedNew);
		}
	}
	
	
	$scope.addZldj = function(zldj,isNeedNew) {   
		
		if(angularPermission.hasPermission('zldj_add')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			ZldjService.saveZldj(zldj,sucessCB,errorCB);
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
				$state.go('main.list.zldj.zldjList');
			}
			
		}
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateZldj = function(zldj,isNeedNew) {
		
		if(angularPermission.hasPermission('zldj_edit')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			ZldjService.updateZldj(zldj,sucessCB,errorCB);
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
				$state.go('main.list.zldj.zldjList');
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
		$state.go('main.list.zldj.zldjList');
	}
	
	$scope.refreshGrid = function() {
		var controller = $rootScope.getController('zldjListGrid' , 'ddatagrid');
		if(controller) {
			controller.refreshCurrent();
		}
	}
}]);
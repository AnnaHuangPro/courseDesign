angular.module('externalInterfaceModule', [])
.controller('externalInterfaceFormController',['$rootScope','$scope','ExternalInterfaceService','$state','angularPermission','$stateParams','dialogs',
function($rootScope,$scope,ExternalInterfaceService,$state,angularPermission,$stateParams,dialogs){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	
	$scope.create = function(){
		$scope.externalInterface = {};
		//设置默认值
	}
	
	$scope.init = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.findExternalInterface();
		}else if($stateParams.operate=='add'){
			$scope.create();
		}else{
			dialogs.error("错误","操作类型 "+$scope.operate+" 在当前请求中无效");
		}
	}
	
	$scope.findExternalInterface = function()
	{
		$rootScope.app.asynchroMask.mask("加载中。。。。。");
		ExternalInterfaceService.findExternalInterfaceById($scope.id,sucessCB,errorCB);

		function sucessCB(data)
		{
			$rootScope.app.asynchroMask.unmask();
			$scope.externalInterface = data;
		};

		function errorCB(error)
		{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.saveExternalInterface = function(isNeedNew)
	{
		if($scope.operate=='add')
		{
			$scope.addExternalInterface($scope.externalInterface,isNeedNew);
		}
		else if($scope.operate=='edit')
		{
			$scope.updateExternalInterface($scope.externalInterface,isNeedNew);
		}
	}
	
	
	$scope.addExternalInterface = function(externalInterface,isNeedNew)
	{   
		
		if(angularPermission.hasPermission('externalInterface_add')){
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			ExternalInterfaceService.saveExternalInterface(externalInterface,sucessCB,errorCB);
		}else{
			dialogs.error("错误","操作: 新增  未被授权，请联系管理人员");
		}
		function sucessCB()
		{
			$rootScope.app.asynchroMask.unmask();
			if(isNeedNew){
				$scope.operate='add';
				$scope.create();
			}
			else{
				refreshGrid();
				$scope.back();
			}
			
		}
		function errorCB(error)
		{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateExternalInterface = function(externalInterface,isNeedNew)
	{
		
		if(angularPermission.hasPermission('externalInterface_edit')){
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			ExternalInterfaceService.updateExternalInterface(externalInterface,sucessCB,errorCB);
		}else{
			dialogs.error("错误","操作: 编辑  未被授权，请联系管理人员");
		}
		function sucessCB()
		{
			$rootScope.app.asynchroMask.unmask();			
			if(isNeedNew){
				$scope.operate='add';
				$scope.create();
			}
			else//处理一些默认值
			{
				refreshGrid();
				$scope.back();
			}
			
		}
		function errorCB(error)
		{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
//	$scope.cancel = function(){
//		$scope.refreshGrid();
//		$rootScope.closeOperateTab();
//		$state.go('main.list.externalInterface.externalInterfaceList');
//	}
//	
//	$scope.refreshGrid = function(){
//		var controller = $rootScope.getController('externalInterfaceListGrid' , 'ddatagrid');
//		if(controller){
//			controller.refreshCurrent();
//		}
//	}
	function refreshGrid(){
		$scope.refreshGrid("externalInterfaceListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"externalInterfaceList","main.list.externalInterface.externalInterfaceList")
	}
}]);
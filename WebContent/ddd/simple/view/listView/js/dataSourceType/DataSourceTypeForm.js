angular.module('dataSourceTypeModule', [])
.controller('dataSourceTypeFormController',['$rootScope','$scope','DataSourceTypeService','$state','angularPermission','$stateParams','dialogs',
function($rootScope,$scope,DataSourceTypeService,$state,angularPermission,$stateParams,dialogs) {
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	
	$scope.create = function() {
		$scope.dataSourceType = {};
		//设置默认值
	}
	
	$scope.init = function() {
		if($stateParams.operate=='edit') {
			$scope.findDataSourceType();
		}
		else if($stateParams.operate=='add') {
			$scope.create(); 
		}
		else {
			dialogs.error("错误","操作类型 "+$scope.operate+" 在当前请求中无效",{size:'sm'});
		}
	}
	
	$scope.findDataSourceType = function() {
		$rootScope.app.asynchroMask.mask("加载中。。。。。");
		DataSourceTypeService.findDataSourceTypeById($scope.id,sucessCB,errorCB);

		function sucessCB(data)	{
			$rootScope.app.asynchroMask.unmask();
			$scope.dataSourceType = data;
		};

		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.saveDataSourceType = function(isNeedNew) {
		if($scope.operate=='add') {
			$scope.addDataSourceType($scope.dataSourceType,isNeedNew);
		}
		else if($scope.operate=='edit')	{
			$scope.updateDataSourceType($scope.dataSourceType,isNeedNew);
		}
	}
	
	
	$scope.addDataSourceType = function(dataSourceType,isNeedNew) {   
		
		if(angularPermission.hasPermission('dataSourceType_add')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			DataSourceTypeService.saveDataSourceType(dataSourceType,sucessCB,errorCB);
		}
		else {
			dialogs.error("错误","操作: 新增  未被授权，请联系管理人员",{size:'sm'});
		}
		function sucessCB()	{
			$rootScope.app.asynchroMask.unmask();
			if(isNeedNew){
				$scope.operate='add';
				$scope.create();
			}
			else {
				dialogs.notify("提示","保存成功",{size:'sm'});
				refreshGrid();
				$rootScope.closeOperateTab();
				$state.go('main.list.dataSourceType.dataSourceTypeList');
			}
			
		}
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateDataSourceType = function(dataSourceType,isNeedNew) {
		
		if(angularPermission.hasPermission('dataSourceType_edit')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			DataSourceTypeService.updateDataSourceType(dataSourceType,sucessCB,errorCB);
		}
		else {
			dialogs.error("错误","操作: 编辑  未被授权，请联系管理人员",{size:'sm'});
		}
		function sucessCB()	{
			$rootScope.app.asynchroMask.unmask();			
			if(isNeedNew) {
				$scope.operate='add';
				$scope.create();
			}
			//处理一些默认值	
			else {
				dialogs.notify("提示","更新成功",{size:'sm'});
				refreshGrid();
				$rootScope.closeOperateTab();
				$state.go('main.list.dataSourceType.dataSourceTypeList');
			}			
		}
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.cancel = function() {
		refreshGrid();
		$rootScope.closeOperateTab();
		$state.go('main.list.dataSourceType.dataSourceTypeList');
	}
	
	function refreshGrid(){
		$scope.refreshGrid("dataSourceTypeListGrid");
	}
}]);
angular.module('userModule', [])
.controller('userFormController',['$rootScope','$scope','UserService','$state','angularPermission','$stateParams','dialogs',
function($rootScope,$scope,UserService,$state,angularPermission,$stateParams,dialogs) {
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	
	$scope.create = function() {
		$scope.user = {};
		//设置默认值
	}
	
	$scope.init = function() {
		if($stateParams.operate=='edit') {
			$scope.findUser();
		}
		else if($stateParams.operate=='add') {
			$scope.create(); 
		}
		else {
			dialogs.error("错误","操作类型 "+$scope.operate+" 在当前请求中无效");
		}
	}
	
	$scope.findUser = function() {
		$rootScope.app.asynchroMask.mask("加载中。。。。。");
		UserService.findUserById($scope.id,sucessCB,errorCB);

		function sucessCB(data)	{
			$rootScope.app.asynchroMask.unmask();
			$scope.user = data;
		};

		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.saveUser = function(isNeedNew) {
		if($scope.operate=='add') {
			$scope.addUser($scope.user,isNeedNew);
		}
		else if($scope.operate=='edit')	{
			$scope.updateUser($scope.user,isNeedNew);
		}
	}
	
	
	$scope.addUser = function(user,isNeedNew) {   
		
		if(angularPermission.hasPermission('user_add')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			UserService.saveUser(user,sucessCB,errorCB);
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
				$state.go('main.list.user.userList');
			}
			
		}
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateUser = function(user,isNeedNew) {
		
		if(angularPermission.hasPermission('user_edit')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			UserService.updateUser(user,sucessCB,errorCB);
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
				$state.go('main.list.user.userList');
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
		$state.go('main.list.user.userList');
	}
	
	$scope.refreshGrid = function() {
		var controller = $rootScope.getController('userListGrid' , 'ddatagrid');
		if(controller) {
			controller.refreshCurrent();
		}
	}
}]);
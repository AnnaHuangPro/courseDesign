angular.module('taskModule', [])
.controller('taskFormController',['$rootScope','$scope','TaskService','$state','angularPermission','$stateParams','dialogs',
function($rootScope,$scope,TaskService,$state,angularPermission,$stateParams,dialogs) {
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	
	$scope.create = function() {
		$scope.task = {};
		//设置默认值
	}
	
	$scope.init = function() {
		if($stateParams.operate=='edit') {
			$scope.findTask();
		}
		else if($stateParams.operate=='add') {
			$scope.create(); 
		}
		else {
			dialogs.error("错误","操作类型 "+$scope.operate+" 在当前请求中无效");
		}
	}
	
	$scope.findTask = function() {
		$rootScope.app.asynchroMask.mask("加载中。。。。。");
		TaskService.findTaskById($scope.id,sucessCB,errorCB);

		function sucessCB(data)	{
			$rootScope.app.asynchroMask.unmask();
			$scope.task = data;
		};

		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	};
	
	$scope.saveTask = function(isNeedNew) {
		if($scope.operate=='add') {
			$scope.addTask($scope.task,isNeedNew);
		}
		else if($scope.operate=='edit')	{
			$scope.updateTask($scope.task,isNeedNew);
		}
	}
	
	
	$scope.addTask = function(task,isNeedNew) {   
		
		if(angularPermission.hasPermission('task_add')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			task.teaId = $rootScope.teaId;
			task.courseId = $rootScope.courseId;
			TaskService.saveTask(task,sucessCB,errorCB);
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
				$state.go('main.list.task.taskList');
			}
			
		}
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateTask = function(task,isNeedNew) {
		
		if(angularPermission.hasPermission('task_edit')) {
			$rootScope.app.asynchroMask.mask("加载中。。。。。");
			TaskService.updateTask(task,sucessCB,errorCB);
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
				$state.go('main.list.task.taskList');
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
		$state.go('main.list.task.taskList');
	}
	
	$scope.refreshGrid = function() {
		var controller = $rootScope.getController('taskListGrid' , 'ddatagrid');
		if(controller) {
			controller.refreshCurrent();
		}
	}
}]);
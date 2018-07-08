angular.module('taskModule', [])
.controller('taskListController',['dialogs','$rootScope','$scope','$state','$stateParams','angularPermission','TaskService',
function(dialogs,$rootScope,$scope,$state,$stateParams,angularPermission,TaskService) {
	
	$scope.addTask = function(task) {
		$state.go('main.list.task.taskAddForm',{operate:'add'});
	}
	$scope.deleteTask = function(task) {		
		function successCB(data) {
			$rootScope.app.asynchroMask.unmask();
			if(data > 0) {
				$rootScope.getController('taskListGrid' , 'ddatagrid').refreshCurrent();
			}
			else {	
				alert('删除的数据已经不存在（可能已经被其他用户删除）');
			}
		}
		
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}	
		
		var dialog = dialogs.confirm("确认框","删除之后不能恢复，确定要删除吗？",{size:'sm'});
		if($scope.hasPermission('task_delete')) {
			dialog.result.then(function() {
				$rootScope.app.asynchroMask.mask("加载中。。。。。");
				TaskService.deleteTask(task.EId,successCB,errorCB);
			},function() {
				 
			});
		}
		else {
			dialogs.error("错误","操作: 删除  未被授权，请联系管理人员");
		}
	}	
	
	$scope.updateTask = function(task) {
		$state.go('main.list.task.taskEditForm',{operate:'edit',id:task.EId});
	}
	$scope.displayTask = function(task) {
		$state.go('main.list.task.taskDisplay',{id:task.EId});
	}	
	
	$scope.refreshGrid = function()	{
		if(angular.isUndefined($scope.taskListGrid)) return;
		$scope.taskListGrid.refreshAll();
	}
	
	var permissions ={};
	$scope.hasPermission = function (permission) {
		if(angular.isDefined(permissions[permission])) {
			return true;
		}
		else {
			return false;
		}	
	}
	
	function addPermission(permission) {
		if(angularPermission.hasPermission(permission))	{
			permissions[permission] = true;
		}
	}	
	
	function init()	{ 
		//以下代码中 visiableFunction 是行操作按钮的显示回调函数，row是显示的行，row.entity 可以取到显示的数据,
		$scope.operationColumns=[];
		
		var editColumn={};
		editColumn.click= $scope.updateTask;
		editColumn.visiableFunction = function(row){ return $scope.hasPermission('task_edit'); };
		editColumn.label='编辑';
		editColumn.icon = 'glyphicon glyphicon-edit';
		$scope.operationColumns.push(editColumn);
		
		var displayColumn={};
		displayColumn.click= $scope.displayTask;
		displayColumn.visiableFunction = function(row){ return $scope.hasPermission('task_display'); };
		displayColumn.label='查看';
		displayColumn.icon = 'glyphicon glyphicon-eye-open';
		$scope.operationColumns.push(displayColumn);
		
		var deleteColumn={};
		deleteColumn.click= $scope.deleteTask;
		deleteColumn.visiableFunction = function(row){ return $scope.hasPermission('task_delete'); };
		deleteColumn.label='删除';
		deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
		$scope.operationColumns.push(deleteColumn);		
		
		addPermission('task_add');
		addPermission('task_edit');
		addPermission('task_display');
		addPermission('task_delete');	
	}
	
	init();
}]);	
angular.module('taskManageModule', [])
.controller('taskManageListController',['$rootScope','$scope','$state','$stateParams','angularPermission','TaskManageService','dialogs',
function($rootScope,$scope,$state,$stateParams,angularPermission,TaskManageService,dialogs){
	
	$scope.addTaskManage = function(taskManage)
	{
		$state.go('main.list.taskManage.taskManageAddForm',{operate:'add'});
	}
	$scope.deleteTaskManage = function(taskManage)
	{
		var dialog = dialogs.confirm("确认框","删除之后不能恢复，确定要删除吗？",{size:'sm'});
		dialog.result.then(function(){
			function successCB(data)
			{
				if(data>0){
					refreshGrid();
				}
				else{
					dialogs.error("错误","删除的数据已经不存在（可能已经被其他用户删除）");
				}
			};
			function errorCB(error)
			{
				$rootScope.openErrorDialog(error);
			};
			TaskManageService.deleteTaskManage({taskManageId:taskManage.EId},successCB,errorCB);
		},function(){
			 //确认框取消什么都不做
		});
	
	}
	function refreshGrid(){
		$scope.refreshGrid("taskManageListGrid");
	}
	$scope.deleteSuccessFn = function(data)
	{
		if(data[0]>0)
				$rootScope.getController('taskManageListGrid' , 'ddatagrid').refreshCurrent();
		else
				alert('删除失败');
	}
	
	$scope.updateTaskManage = function(taskManage)
	{
		$state.go('main.list.taskManage.taskManageEditForm',{operate:'edit',id:taskManage.EId});
	}
	$scope.displayTaskManage = function(taskManage)
	{
		$state.go('main.list.taskManage.taskManageDisplay',{id:taskManage.EId});
	}
	
	$scope.operationBarButtons=[];
	
	var addBarButton={};
	addBarButton.click= $scope.addTaskManage;
	addBarButton.label='新增';
	addBarButton.icon = 'glyphicon glyphicon-plus-sign';
	addBarButton.permission = 'taskManage_add';
	$scope.operationBarButtons.push(addBarButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateTaskManage;
	editColumn.label='编辑';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'taskManage_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayTaskManage;
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	displayColumn.permission = 'taskManage_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteTaskManage;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
	deleteColumn.permission = 'taskManage_delete';
	$scope.operationColumns.push(deleteColumn);
}]);	
angular.module('scheduleTaskModule', [])
.controller('scheduleTaskListController',['$rootScope','$scope','$state','$stateParams','angularPermission','ScheduleTaskService','dialogs',
function($rootScope,$scope,$state,$stateParams,angularPermission,ScheduleTaskService,dialogs){
	
	$scope.addScheduleTask = function(scheduleTask)
	{
		$state.go('main.list.scheduleTask.scheduleTaskAddForm',{operate:'add'});
	}
	
	$scope.deleteScheduleTask = function(scheduleTask)
	{
		var dialog = dialogs.confirm("确认框","删除之后不能恢复，确定要删除吗？",{size:'sm'});
		dialog.result.then(function(){
			function successCB(data)
			{
				if(data>0){
					$scope.refreshGrid();
				}
				else{
					dialogs.error("错误","删除的数据已经不存在（可能已经被其他用户删除）");
				}
			};
			function errorCB(error)
			{
				$rootScope.openErrorDialog(error);
			};
			ScheduleTaskService.deleteScheduleTask({scheduleTaskId:scheduleTask.EId},successCB,errorCB);
		},function(){
			 //确认框取消什么都不做
		});
	}		
	$scope.refreshGrid = function() {
		var controller = $rootScope.getController('scheduleTaskListGrid', 'ddatagrid');
		if (controller) {
			controller.refreshCurrent();
		}
	}	
	$scope.updateScheduleTask = function(scheduleTask)
	{
		$state.go('main.list.scheduleTask.scheduleTaskEditForm',{operate:'edit',id:scheduleTask.EId});
	}
	$scope.displayScheduleTask = function(scheduleTask)
	{
		$state.go('main.list.scheduleTask.scheduleTaskDisplay',{id:scheduleTask.EId});
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
	
	$scope.operationBarButtons=[];
	
	var addBarButton={};
	addBarButton.click= $scope.addScheduleTask;
	addBarButton.label='新增';
	addBarButton.icon = 'glyphicon glyphicon-plus-sign';
	addBarButton.permission = 'scheduleTask_add';
	$scope.operationBarButtons.push(addBarButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateScheduleTask;
	editColumn.label='编辑';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'scheduleTask_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayScheduleTask;
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	displayColumn.permission = 'scheduleTask_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteScheduleTask;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
	deleteColumn.permission = 'scheduleTask_delete';
	$scope.operationColumns.push(deleteColumn);
	
	addPermission('scheduleTask_add');
	addPermission('scheduleTask_edit');
	addPermission('scheduleTask_display');
	addPermission('scheduleTask_delete');	
}]);	
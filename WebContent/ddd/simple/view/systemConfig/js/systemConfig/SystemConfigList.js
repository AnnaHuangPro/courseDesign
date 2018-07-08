angular.module('systemConfigModule', [])
.controller('systemConfigListController',['$rootScope','$scope','$state','$stateParams','angularPermission','SystemConfigService','dialogs',
function($rootScope,$scope,$state,$stateParams,angularPermission,SystemConfigService,dialogs){
	
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
	
	$scope.addSystemConfig = function(systemConfig)
	{
		$state.go('main.list.systemConfig.systemConfigAddForm',{operate:'add'}); 
	}
	$scope.deleteSystemConfig = function(systemConfig)
	{
		SystemConfigService.deleteSystemConfig({systemConfigId:systemConfig.EId},sucesscb,function(data){dialogs.error('删除失败');});
		
		function sucesscb(data){
			if(data>0){
				dialogs.notify('结果','删除成功!',{size:'sm'});
				refreshGrid();
			}
			else
				dialogs.error('结果','该记录已删除!',{size:'sm'});

		}
	}
	
	function refreshGrid(){
		$scope.refreshGrid("systemConfigListGrid");
	}
	
	$scope.updateSystemConfig = function(systemConfig)
	{
		$state.go('main.list.systemConfig.systemConfigEditForm',{operate:'edit',id:systemConfig.EId});
	}
	$scope.displaySystemConfig = function(systemConfig)
	{
		$state.go('main.list.systemConfig.systemConfigDisplay',{id:systemConfig.EId});
	}
	
	$scope.operationBarButtons=[];
	
	var addBarButton={};
	addBarButton.click= $scope.addSystemConfig;
	addBarButton.label='新增';
	addBarButton.icon = 'glyphicon glyphicon-plus-sign';
	addBarButton.permission = 'systemConfig_add';
	$scope.operationBarButtons.push(addBarButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateSystemConfig;
	editColumn.label='编辑';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'systemConfig_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displaySystemConfig;
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	displayColumn.permission = 'systemConfig_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteSystemConfig;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove';
	deleteColumn.permission = 'systemConfig_delete';
	$scope.operationColumns.push(deleteColumn);
	
	addPermission('systemConfig_delete');
	addPermission('systemConfig_add');
	addPermission('systemConfig_edit');
	addPermission('systemConfig_display');
}]);	
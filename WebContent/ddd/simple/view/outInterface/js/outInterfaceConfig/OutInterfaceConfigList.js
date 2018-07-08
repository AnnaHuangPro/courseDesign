angular.module('outInterfaceConfigModule', [])
.controller('outInterfaceConfigListController',['$rootScope','$scope','$state','$stateParams','angularPermission','OutInterfaceConfigService','dialogs',
function($rootScope,$scope,$state,$stateParams,angularPermission,OutInterfaceConfigService,dialogs){
	
	$scope.addOutInterfaceConfig = function(outInterfaceConfig)
	{
		$state.go('main.list.outInterfaceConfig.outInterfaceConfigAddForm',{operate:'add'});
	}
	$scope.deleteOutInterfaceConfig = function(outInterfaceConfig)
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
			OutInterfaceConfigService.deleteOutInterfaceConfig({outInterfaceConfigId:outInterfaceConfig.EId},successCB,errorCB);
		},function(){
			 //确认框取消什么都不做
		});
	
	}
	function refreshGrid(){
		$scope.refreshGrid("outInterfaceConfigListGrid");
	}
	$scope.deleteSuccessFn = function(data)
	{
		if(data[0]>0)
				$rootScope.getController('outInterfaceConfigListGrid' , 'ddatagrid').refreshCurrent();
		else
				alert('删除失败');
	}
	
	$scope.updateOutInterfaceConfig = function(outInterfaceConfig)
	{
		$state.go('main.list.outInterfaceConfig.outInterfaceConfigEditForm',{operate:'edit',id:outInterfaceConfig.EId});
	}
	$scope.displayOutInterfaceConfig = function(outInterfaceConfig)
	{
		$state.go('main.list.outInterfaceConfig.outInterfaceConfigDisplay',{id:outInterfaceConfig.EId});
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
	addBarButton.click= $scope.addOutInterfaceConfig;
	addBarButton.label='新增';
	addBarButton.icon = 'glyphicon glyphicon-plus-sign';
	addBarButton.permission = 'outInterfaceConfig_add';
	$scope.operationBarButtons.push(addBarButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateOutInterfaceConfig;
	editColumn.label='编辑';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'outInterfaceConfig_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayOutInterfaceConfig;
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	displayColumn.permission = 'outInterfaceConfig_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteOutInterfaceConfig;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
	deleteColumn.permission = 'outInterfaceConfig_delete';
	$scope.operationColumns.push(deleteColumn);
	
	addPermission('outInterfaceConfig_add');
	addPermission('outInterfaceConfig_edit');
	addPermission('outInterfaceConfig_display');
	addPermission('outInterfaceConfig_delete');	
}]);	
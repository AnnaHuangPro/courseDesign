angular.module('exporterConfigModule', [])
.controller('exporterConfigListController',['$rootScope','$scope','$state','$stateParams','angularPermission','ExporterConfigService','dialogs',
function($rootScope,$scope,$state,$stateParams,angularPermission,ExporterConfigService,dialogs){
	
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
	
	$scope.addExporterConfig = function(exporterConfig)
	{
		$state.go('main.list.exporterConfig.exporterConfigAddForm',{operate:'add'});
	}
	//数据导入
	$scope.dataImport = function(exporterConfig)
	{
		//$state.go('main.list.exporterConfig.exporterConfigAddForm',{operate:'add'});
	}
	$scope.deleteExporterConfig = function(exporterConfig) {
		var dialog = dialogs.confirm("确认框","删除之后不能恢复，确定要删除吗？\n提示：不能删除有视图的数据源！",{size:'sm'});
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
			ExporterConfigService.deleteExporterConfig({exporterConfigId:exporterConfig.EId},successCB,errorCB);
		},function(){
			 //确认框取消什么都不做
		});
	}
	function refreshGrid(){
		$scope.refreshGrid("exporterConfigListGrid");
	}
	
	$scope.updateExporterConfig = function(exporterConfig)
	{
		$state.go('main.list.exporterConfig.exporterConfigEditForm',{operate:'edit',id:exporterConfig.EId});
	}
	$scope.displayExporterConfig = function(exporterConfig)
	{
		$state.go('main.list.exporterConfig.exporterConfigDisplay',{id:exporterConfig.EId});
	}
	
	$scope.dataExport = function(exporterConfig)
	{
		$state.go('main.list.exporterConfig.exporterConfigDisplay',{id:exporterConfig.EId});
	}
	
	$scope.operationBarButtons=[];
	
	var addBarButton={};
	addBarButton.click= $scope.addExporterConfig;
	addBarButton.label='新增';
	addBarButton.icon = 'glyphicon glyphicon-plus-sign';
	addBarButton.permission = 'exporterConfig_add';
	$scope.operationBarButtons.push(addBarButton);
	
	var importButton={};
	importButton.click= $scope.dataImport;
	importButton.label='导入';
	importButton.icon = 'glyphicon glyphicon-plus-sign';
	importButton.permission = 'exporterConfig_import';
	$scope.operationBarButtons.push(importButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateExporterConfig;
	editColumn.label='编辑';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'exporterConfig_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayExporterConfig;
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	displayColumn.permission = 'exporterConfig_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteExporterConfig;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
	deleteColumn.permission = 'exporterConfig_delete';
	$scope.operationColumns.push(deleteColumn);
	
	var exportColumn={};
	exportColumn.click= $scope.dataExport;
	exportColumn.label='导出';
	exportColumn.icon = 'glyphicon glyphicon-remove-circle';
	exportColumn.permission = 'exporterConfig_export';
	$scope.operationColumns.push(exportColumn);
	
	addPermission('exporterConfig_add');
	addPermission('exporterConfig_edit');
	addPermission('exporterConfig_display');
	addPermission('exporterConfig_import');
	addPermission('exporterConfig_delete');
	addPermission('exporterConfig_export');
}]);	
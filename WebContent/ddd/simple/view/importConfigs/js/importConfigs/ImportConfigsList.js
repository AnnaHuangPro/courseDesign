angular.module('importConfigsModule', [])
.controller('importConfigsListController',['$rootScope','$scope','$state','$stateParams','angularPermission','ImportConfigsService','ngDialog','dialogs',
function($rootScope,$scope,$state,$stateParams,angularPermission,ImportConfigsService,ngDialog,dialogs){
	
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
	
	$scope.addImportConfigs = function(importConfigs)
	{
		$state.go('main.list.importConfigs.importConfigsAddForm',{operate:'add'});
	}
	
	$scope.deleteImportConfigs = function(importConfigs)
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
			ImportConfigsService.deleteImportConfigs({importConfigsId:importConfigs.EId},successCB,errorCB);
		},function(){
			 //确认框取消什么都不做
		});
	
	}
	function refreshGrid(){
		$scope.refreshGrid("importConfigsListGrid");
	}
	$scope.deleteSuccessFn = function(error)
	{
		if(data[0]>0)
				$rootScope.getController('importConfigsListGrid' , 'ddatagrid').refreshCurrent();
		else
				$rootScope.openErrorDialog(error);
	}
	

	$scope.updateImportConfigs = function(importConfigs)
	{
		$state.go('main.list.importConfigs.importConfigsEditForm',{operate:'edit',id:importConfigs.EId});
	}
	$scope.displayImportConfigs = function(importConfigs)
	{
		$state.go('main.list.importConfigs.importConfigsDisplay',{id:importConfigs.EId});
	}
	
	//---------------------------------------------------------------------------------------------------
	$scope.createConfig=function(){
		var template="simple/view/importConfigs/html/importConfigs/CreateImportConfig.html";
		
		$scope.openDialog(template,$scope);
	}
	
	$scope.createConfigSure=function(packageName){
		ImportConfigsService.createConfig(packageName,sucesscb,errorcb);
		
		function sucesscb(data){
			alert("生成成功");
			ngDialog.closeAll();
		}
		function errorcb(){
			alert("生成失败");
			ngDialog.closeAll();
		}
	}
	//---------------------------------------------------------------------------------------------------
	$scope.createTemplate=function(){
		var template="simple/view/importConfigs/html/importConfigs/CreateTemplate.html";
		$scope.openDialog(template,$scope);
	}
	
	$scope.createTemplateSure=function(packageName){
		ImportConfigsService.createTemplate(packageName,sucesscb,errorcb);
		
		function sucesscb(data){
			alert("生成成功");
			ngDialog.closeAll();
		}
		function errorcb(){
			alert("生成失败");
			ngDialog.closeAll();
		}
	}
	
	$scope.operationBarButtons=[];
	
	var addBarButton={};
	addBarButton.click= $scope.addImportConfigs;
	addBarButton.label='新增';
	addBarButton.icon = 'glyphicon glyphicon-plus-sign';
	addBarButton.permission = 'importConfigs_add';
	$scope.operationBarButtons.push(addBarButton);
	
/*	var createConfigButton={};
	createConfigButton.click= $scope.createConfig;
	createConfigButton.label='自动生成配置';
	createConfigButton.icon = 'glyphicon glyphicon-plus-sign';
	createConfigButton.permission = 'importConfigs_add';
	$scope.operationBarButtons.push(createConfigButton);*/
	
/*	var createTemplateButton={};
	createTemplateButton.click= $scope.createTemplate;
	createTemplateButton.label='生成导入模板';
	createTemplateButton.icon = 'glyphicon glyphicon-plus-sign';
	createTemplateButton.permission = 'importConfigs_add';
	$scope.operationBarButtons.push(createTemplateButton);*/
	
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateImportConfigs;
	editColumn.label='编辑';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'importConfigs_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayImportConfigs;
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	displayColumn.permission = 'importConfigs_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteImportConfigs;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
	deleteColumn.permission = 'importConfigs_delete';
	$scope.operationColumns.push(deleteColumn);
	
	addPermission('importConfigs_add');
	addPermission('importConfigs_edit');
	addPermission('importConfigs_display');
	addPermission('importConfigs_delete');
}]);	
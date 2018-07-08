angular.module('departmentModule', [])
.controller('departmentListController',['$rootScope','$scope','$state','$stateParams','angularPermission','DepartmentService','ImportService','dialogs',
function($rootScope,$scope,$state,$stateParams,angularPermission,DepartmentService,ImportService,dialogs){
	$scope.importConfigs = {limit:1,
			importConfigKey : "department",
			eId:null
	}
	
	//导入
	$scope.importMR = function(){
		var template="simple/view/importConfigs/html/importConfigs/DialogImportConfigsForm.html";
		ImportService.openDialog(template,$scope);
	}
	//弹出层确定操作
	$scope.addImportConfigs = function(importConfigs)
	{   
		ImportService.importDataFile(importConfigs,'accidentReportListGrid');
	}
	
	$scope.addDepartment = function(department)
	{
		$state.go('main.list.department.departmentAddForm',{operate:'add'}); 
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
	$scope.deleteDepartment = function(department)
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
			DepartmentService.deleteDepartment({departmentId:department.EId},successCB,errorCB);
		},function(){
			 //确认框取消什么都不做
		});
	}		
	$scope.refreshGrid = function() {
		var controller = $rootScope.getController('departmentListGrid', 'ddatagrid');
		if (controller) {
			controller.refreshCurrent();
		}
	}
	$scope.updateDepartment = function(department)
	{
		$state.go('main.list.department.departmentEditForm',{operate:'edit',id:department.EId});
	}
	$scope.displayDepartment = function(department)
	{
		$state.go('main.list.department.departmentDisplay',{id:department.EId});
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
		editColumn.click= $scope.updateDepartment;
		editColumn.visiableFunction = function(row){ return $scope.hasPermission('department_edit'); };
		editColumn.label='编辑';
		editColumn.icon = 'glyphicon glyphicon-edit';
		$scope.operationColumns.push(editColumn);
		
		var displayColumn={};
		displayColumn.click= $scope.displayDepartment;
		displayColumn.visiableFunction = function(row){ return $scope.hasPermission('department_display'); };
		displayColumn.label='查看';
		displayColumn.icon = 'glyphicon glyphicon-eye-open';
		$scope.operationColumns.push(displayColumn);
		
		var deleteColumn={};
		deleteColumn.click= $scope.deleteDepartment;
		deleteColumn.visiableFunction = function(row){ return $scope.hasPermission('department_delete'); };
		deleteColumn.label='删除';
		deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
		$scope.operationColumns.push(deleteColumn);		
		
		addPermission('department_add');
		addPermission('department_edit');
		addPermission('department_display');
		addPermission('department_delete');	
	}
	
	init();
}]);	
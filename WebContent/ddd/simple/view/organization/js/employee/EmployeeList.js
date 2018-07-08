angular.module('employeeModule', [])
.controller('employeeListController',['$rootScope','$scope','$state','$stateParams','angularPermission','EmployeeService','dialogs',
function($rootScope,$scope,$state,$stateParams,angularPermission,EmployeeService,dialogs){
	
	$scope.addEmployee = function(employee)
	{
		$state.go('main.list.employee.employeeAddForm',{operate:'add'}); 
	}
	$scope.deleteEmployee = function(employee)
	{
		var dialog = dialogs.confirm("确认框","删除之后不能恢复，确定要删除吗？",{size:'sm'});
		dialog.result.then(function(){
			EmployeeService.deleteEmployee({employeeId:employee.EId},sucesscb,function(error){ $rootScope.openErrorDialog(error); });
			function sucesscb(data)
			{
				if(data>0)
					$rootScope.getController('employeeListGrid' , 'ddatagrid').refreshCurrent(); 
				else
					alert('删除失败');
			}
		},function(){
			 
		});
		
		
		
	
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
	$scope.updateEmployee = function(employee)
	{
		$state.go('main.list.employee.employeeEditForm',{operate:'edit',id:employee.EId});
	}
	$scope.displayEmployee = function(employee)
	{
		$state.go('main.list.employee.employeeDisplay',{id:employee.EId});
	}
	
	
	$scope.refreshGrid = function()
	{
		if(angular.isUndefined($scope.employeeListGrid)) return;
		$scope.employeeListGrid.refreshAll();
	}
	
	var permissions ={};
	$scope.hasPermission = function (permission)
	{
		if(angular.isDefined(permissions[permission]))
		{
			return true;
		}
		else
		{
			return false;
		}	
	}
	function addPermission(permission)
	{
		if(angularPermission.hasPermission(permission))
		{
			permissions[permission] = true;
		}
	}
	function init()
	{ 
		$scope.operationColumns=[];
		
		//以下代码中 visiableFunction 是行操作按钮的显示回调函数，row是显示的行，row.entity 可以取到显示的数据,
		//请注意row可能是分组显示中的一个节点,而没有row.entity
		var editColumn={};
		editColumn.click= $scope.updateEmployee;
		editColumn.visiableFunction = function(row){ return $scope.hasPermission('employee_edit'); };
		editColumn.label='编辑';
		editColumn.icon = 'glyphicon glyphicon-edit';
		$scope.operationColumns.push(editColumn);
		
		var displayColumn={};
		displayColumn.click= $scope.displayEmployee;
		displayColumn.visiableFunction = function(row){ return $scope.hasPermission('employee_display'); };
		displayColumn.label='查看';
		displayColumn.icon = 'glyphicon glyphicon-eye-open';
		$scope.operationColumns.push(displayColumn);
		
		var deleteColumn={};
		deleteColumn.click= $scope.deleteEmployee;
		deleteColumn.visiableFunction = function(row){
				return $scope.hasPermission('employee_delete');
			};
		deleteColumn.label='删除';
		deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
		$scope.operationColumns.push(deleteColumn);
		
		//如果有权限则增加到本controller中
		addPermission('employee_add');
		addPermission('employee_edit');
		addPermission('employee_display');
		addPermission('employee_delete');
	
	}
	init();
}]);	
angular.module('permissionModule', [])
.controller('permissionListController',['dialogs','$rootScope','$scope','$state','$stateParams','angularPermission','PermissionService',
function(dialogs,$rootScope,$scope,$state,$stateParams,angularPermission,PermissionService) {
	
	$scope.addPermission = function(permission) {
		$state.go('main.list.permission.permissionAddForm',{operate:'add'});
	}
	$scope.deletePermission = function(permission) {		
		function successCB(data) {
			$rootScope.app.asynchroMask.unmask();
			if(data > 0) {
				$rootScope.getController('permissionListGrid' , 'ddatagrid').refreshCurrent();
			}
			else {	
				alert('删除的数据已经不存在（可能已经被其他用户删除）');
			}
		}
		
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}	
		
		var dialog = dialogs.confirm("删除之后不能恢复，确定要删除吗？");
		if($scope.hasPermission('permission_delete')) {
			dialog.result.then(function() {
				$rootScope.app.asynchroMask.mask("加载中。。。。。");
				PermissionService.deletePermission(permission.EId,successCB,errorCB);
			},function() {
				 
			});
		}
		else {
			dialogs.error("错误","操作: 删除  未被授权，请联系管理人员");
		}
	}	
	
	$scope.updatePermission = function(permission) {
		$state.go('main.list.permission.permissionEditForm',{operate:'edit',id:permission.EId});
	}
	$scope.displayPermission = function(permission) {
		$state.go('main.list.permission.permissionDisplay',{id:permission.EId});
	}	
	
	$scope.refreshGrid = function()	{
//		if(angular.isUndefined($scope.permissionListGrid)) return;
//		$scope.employeeListGrid.refreshAll();
		var controller = $rootScope.getController("permissionListGrid" , "ddatagrid");
		if(controller){
			controller.refreshCurrent();
		}
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
		editColumn.click= $scope.updatePermission;
		editColumn.visiableFunction = function(row){ return $scope.hasPermission('permission_edit'); };
		editColumn.label='编辑';
		editColumn.icon = 'glyphicon glyphicon-edit';
		$scope.operationColumns.push(editColumn);
		
		var displayColumn={};
		displayColumn.click= $scope.displayPermission;
		displayColumn.visiableFunction = function(row){ return $scope.hasPermission('permission_view'); };
		displayColumn.label='查看';
		displayColumn.icon = 'glyphicon glyphicon-eye-open';
		$scope.operationColumns.push(displayColumn);
		
		var deleteColumn={};
		deleteColumn.click= $scope.deletePermission;
		deleteColumn.visiableFunction = function(row){ return $scope.hasPermission('permission_delete'); };
		deleteColumn.label='删除';
		deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
		$scope.operationColumns.push(deleteColumn);		
		
		addPermission('permission_add');
		addPermission('permission_edit');
		addPermission('permission_view');
		addPermission('permission_delete');	
	}
	init();
}]);	
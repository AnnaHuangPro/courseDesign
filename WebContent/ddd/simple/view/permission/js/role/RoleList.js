var roleModule = angular.module('roleModule',[]);
roleModule.controller('roleListController',['$rootScope','$scope','RoleService','$state','angularPermission','dialogs',
                                            function($rootScope,$scope,RoleService,$state,angularPermission,dialogs){
	$scope.addRole = function(role)
	{
		$state.go('main.list.role.roleAddForm',{operate:'add'});
	}
	$scope.updateRole = function(role)
	{
		$state.go('main.list.role.roleEditForm',{operate:'edit',id:role.EId});
	}	
	$scope.deleteRole = function(role) {
//		RoleService.deleteRole(role.EId,
//				function(data){ alert("删除成功");$rootScope.getController('roleListGrid' , 'ddatagrid').refreshCurrent(); },
//				function(data){ alert("删除失败");$rootScope.getController('roleListGrid' , 'ddatagrid').refreshCurrent(); });
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
			RoleService.deleteRole(role.EId,successCB,errorCB);
		},function(){
			 //确认框取消什么都不做
		});
	
	}
	$scope.refreshGrid = function() {
		var controller = $rootScope.getController(
				"roleListGrid", "ddatagrid");
		if (controller) {
			controller.refreshCurrent();
		} else {
			//
		}
	}
	$scope.displayRole = function(role)
	{
		$state.go('main.list.role.roleDisplay',{id:role.EId});
	}
	$scope.assignPermissions = function(role)
	{
		$state.go('main.list.role.assignPermissions',{id:role.EId,name:role.name});
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
		
	$scope.operationColumns=[];
	var editColumn={};
	editColumn.click= $scope.updateRole;
	editColumn.visiableFunction = function(row){ return $scope.hasPermission('role_edit'); };
	editColumn.label='编辑';
	editColumn.icon = 'glyphicon glyphicon-edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayRole;
	displayColumn.visiableFunction = function(row){ return $scope.hasPermission('role_view'); };
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteRole;
	deleteColumn.visiableFunction = function(row){ return $scope.hasPermission('role_delete'); };
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
	$scope.operationColumns.push(deleteColumn);
	
	var assginPermissionColumn={};
	assginPermissionColumn.click= $scope.assignPermissions;
	assginPermissionColumn.visiableFunction = function(row){ return $scope.hasPermission('role_assginPermission'); };
	assginPermissionColumn.label='分配权限点';
	assginPermissionColumn.icon = 'glyphicon glyphicon-fire';
	$scope.operationColumns.push(assginPermissionColumn);
	
	
	addPermission('role_add');
	addPermission('role_edit');
	addPermission('role_assginPermission');
	addPermission('role_view');
	addPermission('role_delete')
}
	
	init();
}]);

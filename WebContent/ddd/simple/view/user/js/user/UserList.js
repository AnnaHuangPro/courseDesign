angular.module('userModule', [])
.controller('userListController',['dialogs','$rootScope','$scope','$state','$stateParams','angularPermission','UserService',
function(dialogs,$rootScope,$scope,$state,$stateParams,angularPermission,UserService) {
	
	$scope.addUser = function(user) {
		$state.go('main.list.user.userAddForm',{operate:'add'});
	}
	$scope.deleteUser = function(user) {		
		function successCB(data) {
			$rootScope.app.asynchroMask.unmask();
			if(data > 0) {
				$rootScope.getController('userListGrid' , 'ddatagrid').refreshCurrent();
			}
			else {	
				alert('删除的数据已经不存在（可能已经被其他用户删除）');
			}
		}
		
		function errorCB(error)	{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}	
		
		var dialog = dialogs.confirm("确认框","删除之后不能恢复，确定要删除吗？",{size:'sm'});
		if($scope.hasPermission('user_delete')) {
			dialog.result.then(function() {
				$rootScope.app.asynchroMask.mask("加载中。。。。。");
				UserService.deleteUser(user.EId,successCB,errorCB);
			},function() {
				 
			});
		}
		else {
			dialogs.error("错误","操作: 删除  未被授权，请联系管理人员");
		}
	}	
	
	$scope.updateUser = function(user) {
		$state.go('main.list.user.userEditForm',{operate:'edit',id:user.EId});
	}
	$scope.displayUser = function(user) {
		$state.go('main.list.user.userDisplay',{id:user.EId});
	}	
	
	$scope.refreshGrid = function()	{
		if(angular.isUndefined($scope.userListGrid)) return;
		$scope.userListGrid.refreshAll();
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
		editColumn.click= $scope.updateUser;
		editColumn.visiableFunction = function(row){ return $scope.hasPermission('user_edit'); };
		editColumn.label='编辑';
		editColumn.icon = 'glyphicon glyphicon-edit';
		$scope.operationColumns.push(editColumn);
		
		var displayColumn={};
		displayColumn.click= $scope.displayUser;
		displayColumn.visiableFunction = function(row){ return $scope.hasPermission('user_display'); };
		displayColumn.label='查看';
		displayColumn.icon = 'glyphicon glyphicon-eye-open';
		$scope.operationColumns.push(displayColumn);
		
		var deleteColumn={};
		deleteColumn.click= $scope.deleteUser;
		deleteColumn.visiableFunction = function(row){ return $scope.hasPermission('user_delete'); };
		deleteColumn.label='删除';
		deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
		$scope.operationColumns.push(deleteColumn);		
		
		addPermission('user_add');
		addPermission('user_edit');
		addPermission('user_display');
		addPermission('user_delete');	
	}
	
	init();
}]);	
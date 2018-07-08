angular.module('systemConfigTypeModule', [])
.controller('systemConfigTypeListController',['dialogs','$rootScope','$scope','$state','$stateParams','angularPermission','SystemConfigTypeService',
function(dialogs,$rootScope,$scope,$state,$stateParams,angularPermission,SystemConfigTypeService) {
	
	$scope.addSystemConfigType = function(systemConfigType) {
		$state.go('main.list.systemConfigType.systemConfigTypeAddForm',{operate:'add'});
	}
	$scope.deleteSystemConfigType = function(systemConfigType) {		
		function successCB(data) {
			$rootScope.app.asynchroMask.unmask();
			if(data > 0) {
				$rootScope.getController('systemConfigTypeListGrid' , 'ddatagrid').refreshCurrent();
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
		if($scope.hasPermission('systemConfigType_delete')) {
			dialog.result.then(function() {
				$rootScope.app.asynchroMask.mask("加载中。。。。。");
				SystemConfigTypeService.deleteSystemConfigType(systemConfigType.EId,successCB,errorCB);
			},function() {
				 
			});
		}
		else {
			dialogs.error("错误","操作: 删除  未被授权，请联系管理人员");
		}
	}	
	
	$scope.updateSystemConfigType = function(systemConfigType) {
		$state.go('main.list.systemConfigType.systemConfigTypeEditForm',{operate:'edit',id:systemConfigType.EId});
	}
	$scope.displaySystemConfigType = function(systemConfigType) {
		$state.go('main.list.systemConfigType.systemConfigTypeDisplay',{id:systemConfigType.EId});
	}	
	
	$scope.refreshGrid = function()	{
		if(angular.isUndefined($scope.systemConfigTypeListGrid)) return;
		$scope.systemConfigTypeListGrid.refreshAll();
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
		editColumn.click= $scope.updateSystemConfigType;
		editColumn.visiableFunction = function(row){ return $scope.hasPermission('systemConfigType_edit'); };
		editColumn.label='编辑';
		editColumn.icon = 'glyphicon glyphicon-edit';
		$scope.operationColumns.push(editColumn);
		
		var displayColumn={};
		displayColumn.click= $scope.displaySystemConfigType;
		displayColumn.visiableFunction = function(row){ return $scope.hasPermission('systemConfigType_display'); };
		displayColumn.label='查看';
		displayColumn.icon = 'glyphicon glyphicon-eye-open';
		$scope.operationColumns.push(displayColumn);
		
		var deleteColumn={};
		deleteColumn.click= $scope.deleteSystemConfigType;
		deleteColumn.visiableFunction = function(row){ return $scope.hasPermission('systemConfigType_delete'); };
		deleteColumn.label='删除';
		deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
		$scope.operationColumns.push(deleteColumn);		
		
		addPermission('systemConfigType_add');
		addPermission('systemConfigType_edit');
		addPermission('systemConfigType_display');
		addPermission('systemConfigType_delete');	
	}
	
	init();
}]);	
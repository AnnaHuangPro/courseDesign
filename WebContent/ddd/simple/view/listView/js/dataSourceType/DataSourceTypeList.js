angular.module('dataSourceTypeModule', [])
.controller('dataSourceTypeListController',['dialogs','$rootScope','$scope','$state','$stateParams','angularPermission','DataSourceTypeService',
function(dialogs,$rootScope,$scope,$state,$stateParams,angularPermission,DataSourceTypeService) {
	
	$scope.addDataSourceType = function(dataSourceType) {
		$state.go('main.list.dataSourceType.dataSourceTypeAddForm',{operate:'add'});
	}
	$scope.deleteDataSourceType = function(dataSourceType) {		
		function successCB(data) {
			$rootScope.app.asynchroMask.unmask();
			if(data > 0) {
				$rootScope.getController('dataSourceTypeListGrid' , 'ddatagrid').refreshCurrent();
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
		if($scope.hasPermission('dataSourceType_delete')) {
			dialog.result.then(function() {
				$rootScope.app.asynchroMask.mask("加载中。。。。。");
				DataSourceTypeService.deleteDataSourceType({dataSourceTypeId:dataSourceType.EId},successCB,errorCB);
			},function() {
				
			});
		}
		else {
			dialogs.error("错误","操作: 删除  未被授权，请联系管理人员");
		}
	}	
	
	$scope.updateDataSourceType = function(dataSourceType) {
		$state.go('main.list.dataSourceType.dataSourceTypeEditForm',{operate:'edit',id:dataSourceType.EId});
	}
	$scope.displayDataSourceType = function(dataSourceType) {
		$state.go('main.list.dataSourceType.dataSourceTypeDisplay',{id:dataSourceType.EId});
	}	
	
	$scope.refreshGrid = function()	{
		if(angular.isUndefined($scope.dataSourceTypeListGrid)) return;
		$scope.dataSourceTypeListGrid.refreshAll();
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
		editColumn.click= $scope.updateDataSourceType;
		editColumn.visiableFunction = function(row){ return $scope.hasPermission('dataSourceType_edit'); };
		editColumn.label='编辑';
		editColumn.icon = 'glyphicon glyphicon-edit';
		$scope.operationColumns.push(editColumn);
		
		var displayColumn={};
		displayColumn.click= $scope.displayDataSourceType;
		displayColumn.visiableFunction = function(row){ return $scope.hasPermission('dataSourceType_display'); };
		displayColumn.label='查看';
		displayColumn.icon = 'glyphicon glyphicon-eye-open';
		$scope.operationColumns.push(displayColumn);
		
		var deleteColumn={};
		deleteColumn.click= $scope.deleteDataSourceType;
		deleteColumn.visiableFunction = function(row){ return $scope.hasPermission('dataSourceType_delete'); };
		deleteColumn.label='删除';
		deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
		$scope.operationColumns.push(deleteColumn);		
		
		addPermission('dataSourceType_add');
		addPermission('dataSourceType_edit');
		addPermission('dataSourceType_display');
		addPermission('dataSourceType_delete');	
	}
	
	init();
}]);	
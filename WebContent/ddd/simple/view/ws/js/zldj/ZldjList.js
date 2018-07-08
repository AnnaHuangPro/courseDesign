angular.module('zldjModule', [])
.controller('zldjListController',['dialogs','$rootScope','$scope','$state','$stateParams','angularPermission','ZldjService',
function(dialogs,$rootScope,$scope,$state,$stateParams,angularPermission,ZldjService) {
	
	$scope.addZldj = function(zldj) {
		$state.go('main.list.zldj.zldjAddForm',{operate:'add'});
	}
	$scope.deleteZldj = function(zldj) {		
		function successCB(data) {
			$rootScope.app.asynchroMask.unmask();
			if(data > 0) {
				$rootScope.getController('zldjListGrid' , 'ddatagrid').refreshCurrent();
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
		if($scope.hasPermission('zldj_delete')) {
			dialog.result.then(function() {
				$rootScope.app.asynchroMask.mask("加载中。。。。。");
				ZldjService.deleteZldj(zldj.EId,successCB,errorCB);
			},function() {
				 
			});
		}
		else {
			dialogs.error("错误","操作: 删除  未被授权，请联系管理人员");
		}
	}	
	
	$scope.updateZldj = function(zldj) {
		$state.go('main.list.zldj.zldjEditForm',{operate:'edit',id:zldj.EId});
	}
	$scope.displayZldj = function(zldj) {
		$state.go('main.list.zldj.zldjDisplay',{id:zldj.EId});
	}	
	
	$scope.refreshGrid = function()	{
		if(angular.isUndefined($scope.zldjListGrid)) return;
		$scope.zldjListGrid.refreshAll();
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
		editColumn.click= $scope.updateZldj;
		editColumn.visiableFunction = function(row){ return $scope.hasPermission('zldj_edit'); };
		editColumn.label='编辑';
		editColumn.icon = 'glyphicon glyphicon-edit';
		$scope.operationColumns.push(editColumn);
		
		var displayColumn={};
		displayColumn.click= $scope.displayZldj;
		displayColumn.visiableFunction = function(row){ return $scope.hasPermission('zldj_display'); };
		displayColumn.label='查看';
		displayColumn.icon = 'glyphicon glyphicon-eye-open';
		$scope.operationColumns.push(displayColumn);
		
		var deleteColumn={};
		deleteColumn.click= $scope.deleteZldj;
		deleteColumn.visiableFunction = function(row){ return $scope.hasPermission('zldj_delete'); };
		deleteColumn.label='删除';
		deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
		$scope.operationColumns.push(deleteColumn);		
		
		addPermission('zldj_add');
		addPermission('zldj_edit');
		addPermission('zldj_display');
		addPermission('zldj_delete');	
	}
	
	init();
}]);	
angular.module('repairModule', [])
.controller('repairListController',['dialogs','$rootScope','$scope','$state','$stateParams','angularPermission','RepairService',
function(dialogs,$rootScope,$scope,$state,$stateParams,angularPermission,RepairService) {
	
	$scope.addRepair = function(repair) {
		$state.go('main.list.repair.repairAddForm',{operate:'add'});
	}
	$scope.deleteRepair = function(repair) {		
		function successCB(data) {
			$rootScope.app.asynchroMask.unmask();
			if(data > 0) {
				$rootScope.getController('repairListGrid' , 'ddatagrid').refreshCurrent();
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
		if($scope.hasPermission('repair_delete')) {
			dialog.result.then(function() {
				$rootScope.app.asynchroMask.mask("加载中。。。。。");
				RepairService.deleteRepair(repair.EId,successCB,errorCB);
			},function() {
				 
			});
		}
		else {
			dialogs.error("错误","操作: 删除  未被授权，请联系管理人员");
		}
	}	
	
	$scope.updateRepair = function(repair) {
		$state.go('main.list.repair.repairEditForm',{operate:'edit',id:repair.EId});
	}
	$scope.displayRepair = function(repair) {
		$state.go('main.list.repair.repairDisplay',{id:repair.EId});
	}	
	
	$scope.refreshGrid = function()	{
		if(angular.isUndefined($scope.repairListGrid)) return;
		$scope.repairListGrid.refreshAll();
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
		editColumn.click= $scope.updateRepair;
		editColumn.visiableFunction = function(row){ return $scope.hasPermission('repair_edit'); };
		editColumn.label='编辑';
		editColumn.icon = 'glyphicon glyphicon-edit';
		$scope.operationColumns.push(editColumn);
		
		var displayColumn={};
		displayColumn.click= $scope.displayRepair;
		displayColumn.visiableFunction = function(row){ return $scope.hasPermission('repair_display'); };
		displayColumn.label='查看';
		displayColumn.icon = 'glyphicon glyphicon-eye-open';
		$scope.operationColumns.push(displayColumn);
		
		var deleteColumn={};
		deleteColumn.click= $scope.deleteRepair;
		deleteColumn.visiableFunction = function(row){ return $scope.hasPermission('repair_delete'); };
		deleteColumn.label='删除';
		deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
		$scope.operationColumns.push(deleteColumn);		
		
		addPermission('repair_add');
		addPermission('repair_edit');
		addPermission('repair_display');
		addPermission('repair_delete');	
	}
	
	init();
}]);	
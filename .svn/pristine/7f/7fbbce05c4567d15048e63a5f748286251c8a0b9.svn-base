angular.module('externalInterfaceModule', [])
.controller('externalInterfaceListController',['dialogs','$rootScope','$scope','$state','$stateParams','angularPermission','ExternalInterfaceService','dialogs',
function(dialogs,$rootScope,$scope,$state,$stateParams,angularPermission,ExternalInterfaceService,dialogs){
	
	$scope.addExternalInterface = function(externalInterface)
	{
		$state.go('main.list.externalInterface.externalInterfaceAddForm',{operate:'add'});
	}
	$scope.deleteExternalInterface = function(externalInterface)
	{
		
		function successCB(data)
		{
			$rootScope.app.asynchroMask.unmask();
			if(data > 0)
			{
					$rootScope.getController('externalInterfaceListGrid' , 'ddatagrid').refreshCurrent();
			}
			else
			{	
				dialogs.error('删除的数据已经不存在（可能已经被其他用户删除）');
			}
		}
		function errorCB(error)
		{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}	
		var dialog = dialogs.confirm("删除之后不能恢复，确定要删除吗？");
		if($scope.hasPermission('externalInterface_delete')){
			dialog.result.then(function(){
				$rootScope.app.asynchroMask.mask("加载中。。。。。");
				ExternalInterfaceService.deleteExternalInterface(externalInterface.EId,successCB,errorCB);
			},function(){
				 
			});
		}else{
			dialogs.error("错误","操作: 删除  未被授权，请联系管理人员");
		}
	}
	
	
	$scope.updateExternalInterface = function(externalInterface)
	{
		$state.go('main.list.externalInterface.externalInterfaceEditForm',{operate:'edit',id:externalInterface.EId});
	}
	$scope.displayExternalInterface = function(externalInterface)
	{
		$state.go('main.list.externalInterface.externalInterfaceDisplay',{id:externalInterface.EId});
	}
	$scope.executeExternalInterface = function(externalInterface)
	{
		function successCB()
		{
			$rootScope.app.asynchroMask.unmask();
		}
		function errorCB(error)
		{
			$rootScope.app.asynchroMask.unmask();
			$rootScope.openErrorDialog(error);
		}
		
		$rootScope.app.asynchroMask.mask("正在执行，请耐心等待...");
		ExternalInterfaceService.executeExternalInterface(externalInterface,successCB,errorCB);
	}
	
	function refreshGrid(){
		$scope.refreshGrid("externalInterfaceListGrid");
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
		//以下代码中 visiableFunction 是行操作按钮的显示回调函数，row是显示的行，row.entity 可以取到显示的数据,
		$scope.operationColumns=[];
		
		var editColumn={};
		editColumn.click= $scope.updateExternalInterface;
		editColumn.visiableFunction = function(row){ return $scope.hasPermission('externalInterface_edit'); };
		editColumn.label='编辑';
		editColumn.icon = 'glyphicon glyphicon-edit';
		$scope.operationColumns.push(editColumn);
		
		var displayColumn={};
		displayColumn.click= $scope.displayExternalInterface;
		displayColumn.visiableFunction = function(row){ return $scope.hasPermission('externalInterface_display'); };
		displayColumn.label='查看';
		displayColumn.icon = 'glyphicon glyphicon-eye-open';
		$scope.operationColumns.push(displayColumn);
		
		var deleteColumn={};
		deleteColumn.click= $scope.deleteExternalInterface;
		deleteColumn.visiableFunction = function(row){ return $scope.hasPermission('externalInterface_delete'); };
		deleteColumn.label='删除';
		deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
		$scope.operationColumns.push(deleteColumn);
		
		var executeColumn={};
		executeColumn.click= $scope.executeExternalInterface;
		executeColumn.visiableFunction = function(row){ return $scope.hasPermission('externalInterface_execute'); };
		executeColumn.label='执行';
		executeColumn.icon = 'glyphicon glyphicon-remove-circle';
		$scope.operationColumns.push(executeColumn);
		
		
		
		addPermission('externalInterface_add');
		addPermission('externalInterface_edit');
		addPermission('externalInterface_display');
		addPermission('externalInterface_delete');
		addPermission('externalInterface_execute');
	
	}
	init();
}]);	
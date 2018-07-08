angular.module('moduleModule',[])

.controller('moduleListController',['$rootScope','$scope','ModuleService','$state','angularPermission','dialogs',
                                    function($rootScope,$scope,ModuleService,$state,angularPermission,dialogs){
	$scope.addModule = function(module)
	{
		$state.go('main.list.module.moduleAddForm',{operate:'add'});
	};
	$scope.updateModule = function(module)
	{
		$state.go('main.list.module.moduleEditForm',{operate:'edit',id:module.EId});
	};
	$scope.displayModule = function(module)
	{
		$state.go('main.list.module.moduleDisplay',{id:module.EId});
	};	
	$scope.deleteModule = function(module)
	{
		var dialog = dialogs.confirm("确认框","删除之后不能恢复，确定要删除吗？",{size:'sm'});
		dialog.result.then(function(){
			function sucessCB(data)
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
			ModuleService.deleteModule(module.EId,sucessCB,errorCB);
		},function(){
			 //确认框取消什么都不做
		});
	}			
	$scope.refreshGrid = function(){
		var controller = $rootScope.getController('moduleListGrid' , 'ddatagrid');
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
		editColumn.click= $scope.updateModule;
		editColumn.visiableFunction = function(row){ return $scope.hasPermission('module_edit'); };
		editColumn.label='编辑';
		editColumn.icon = 'glyphicon glyphicon-edit';
		$scope.operationColumns.push(editColumn);
		
		var displayColumn={};
		displayColumn.click= $scope.displayModule;
		displayColumn.visiableFunction = function(row){ return $scope.hasPermission('module_display'); };
		displayColumn.label='查看';
		displayColumn.icon = 'glyphicon glyphicon-eye-open';
		$scope.operationColumns.push(displayColumn);
		
		var deleteColumn={};
		deleteColumn.click= $scope.deleteModule;
		deleteColumn.visiableFunction = function(row){ return $scope.hasPermission('module_delete'); };
		deleteColumn.label='删除';
		deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
		$scope.operationColumns.push(deleteColumn);		
		
		addPermission('module_add');
		addPermission('module_edit');
		addPermission('module_display');
		addPermission('module_delete');	
	}
	
	init();
}]);

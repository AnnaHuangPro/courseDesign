angular.module('entityPropertyModule', [])
.controller("entityPropertyListController",['$rootScope','$scope','$state','$stateParams','angularPermission','EntityPropertyService','dialogs',
function($rootScope,$scope,$state,$stateParams,angularPermission,EntityPropertyService,dialogs){
	
	$scope.addEntityProperty = function(entityProperty)
	{
		$state.go("main.list.entityProperty.entityPropertyForm",{operate:'add'}); 
	}
	$scope.deleteEntityProperty = function(entityProperty)
	{
		EntityPropertyService.deleteEntityProperty({entityPropertyId:entityProperty.EId},sucesscb,function(data){ dialogs.error("删除失败"); });
		function sucesscb(data)
		{
			if(data[0]>0)
				$rootScope.getController("entityPropertyListGrid" , "ddatagrid").refreshCurrent(); 
			else
				dialogs.error("删除失败");
		}
	
	}
	function refreshGrid(){
		$scope.refreshGrid("entityPropertyListGrid");
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
	$scope.updateEntityProperty = function(entityProperty)
	{
		$state.go("main.list.entityProperty.entityPropertyForm",{operate:'edit',id:entityProperty.EId});
	}
	$scope.displayEntityProperty = function(entityProperty)
	{
		$state.go("main.list.entityProperty.entityPropertyDisplay",{id:entityProperty.EId});
	}
	
	$scope.operationBarButtons=[];
	
	var addBarButton={};
	addBarButton.click= $scope.addEntityProperty;
	addBarButton.label='新增';
	addBarButton.icon = "glyphicon glyphicon-plus-sign";
	addBarButton.permission = 'entityProperty_add';
	$scope.operationBarButtons.push(addBarButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateEntityProperty;
	editColumn.label='编辑';
	editColumn.icon = "glyphicon glyphicon-edit";
	editColumn.permission = 'entityProperty_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayEntityProperty;
	displayColumn.label='查看';
	displayColumn.icon = "glyphicon glyphicon-eye-open";
	displayColumn.permission = 'entityProperty_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteEntityProperty;
	deleteColumn.label='删除';
	deleteColumn.icon = "glyphicon glyphicon-remove-circle";
	deleteColumn.permission = 'entityProperty_delete';
	$scope.operationColumns.push(deleteColumn);
	
	addPermission('entityProperty_add');
	addPermission('entityProperty_edit');
	addPermission('entityProperty_display');
	addPermission('entityProperty_delete');
}]);	
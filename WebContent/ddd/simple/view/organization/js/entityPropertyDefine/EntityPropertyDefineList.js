angular.module('entityPropertyDefineModule', [])
.controller("entityPropertyDefineListController",['$rootScope','$scope','$state','$stateParams','angularPermission','EntityPropertyDefineService','dialogs',
function($rootScope,$scope,$state,$stateParams,angularPermission,EntityPropertyDefineService,dialogs){
	
	$scope.addEntityPropertyDefine = function(entityPropertyDefine)
	{
		$state.go("main.list.entityPropertyDefine.entityPropertyDefineFormAddRoute",{operate:'add'}); 
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
	$scope.deleteEntityPropertyDefine = function(entityPropertyDefine)
	{
// 		EntityPropertyDefineService.deleteEntityPropertyDefine({entityPropertyDefine:entityPropertyDefine},sucesscb,function(data){ alert("删除失败"); });
// 		function sucesscb(data)
// 		{
// 			if(data[0]>0)
// 				$rootScope.getController("entityPropertyDefineListGrid" , "ddatagrid").refreshCurrent(); 
// 			else
// 				alert("删除失败");
// 		}
		var dialog = dialogs.confirm("确认框","删除之后不能恢复，确定要删除吗？",{size:'sm'});
		dialog.result.then(function(){
			EntityPropertyDefineService.deleteEntityPropertyDefine({entityPropertyDefine:entityPropertyDefine},sucesscb,function(data){	$rootScope.openErrorDialog(data); });
			function sucesscb(data)
			{
				if(data>0)
					$rootScope.getController('entityPropertyDefineListGrid' , 'ddatagrid').refreshCurrent(); 
				else
					$rootScope.openErrorDialog(data); 
			}
		},function(){
			 
		});

	
	}
	
	$scope.updateEntityPropertyDefine = function(entityPropertyDefine)
	{
		$state.go("main.list.entityPropertyDefine.entityPropertyDefineFormEditRoute",{operate:'edit',id:entityPropertyDefine.EId});
	}
	$scope.displayEntityPropertyDefine = function(entityPropertyDefine)
	{
		$state.go("main.list.entityPropertyDefine.entityPropertyDefineDisplayRoute",{id:entityPropertyDefine.EId});
	}
	
	$scope.operationBarButtons=[];
	
	var addBarButton={};
	addBarButton.click= $scope.addEntityPropertyDefine;
	addBarButton.label='新增';
	addBarButton.icon = "glyphicon glyphicon-plus-sign";
	addBarButton.permission = 'entityPropertyDefine_add';
	$scope.operationBarButtons.push(addBarButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateEntityPropertyDefine;
	editColumn.label='编辑';
	editColumn.icon = "glyphicon glyphicon-edit";
	editColumn.permission = 'entityPropertyDefine_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayEntityPropertyDefine;
	displayColumn.label='查看';
	displayColumn.icon = "glyphicon glyphicon-eye-open";
	displayColumn.permission = 'entityPropertyDefine_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteEntityPropertyDefine;
	deleteColumn.label='删除';
	deleteColumn.icon = "glyphicon glyphicon-remove-circle";
	deleteColumn.permission = 'entityPropertyDefine_delete';
	$scope.operationColumns.push(deleteColumn);
	
	addPermission('entityPropertyDefine_add');
	addPermission('entityPropertyDefine_edit');
	addPermission('entityPropertyDefine_display');
	addPermission('entityPropertyDefine_delete');
}]);	
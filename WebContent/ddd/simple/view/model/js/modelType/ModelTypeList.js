angular.module('modelTypeModule', [])
.controller("modelTypeListController",['$rootScope','$scope','$state','$stateParams', 'ModelTypeService','angularPermission','dialogs',
function($rootScope,$scope,$state,$stateParams,ModelTypeService,angularPermission,dialogs){
	$scope.addModelType = function(modelType)
	{
		$state.go("main.list.modelType.modelTypeAddForm",{operate:'add'}); 
	}
	
	$scope.hasPermission = function(operate)
	{
		return angularPermission.hasPermission(operate);
	}
	
	$scope.deleteModelType = function(modelType)
	{
		ModelTypeService.deleteModelType({modelTypeId:modelType.EId},sucesscb,function(data){ alert("删除失败"); });
		function sucesscb(data)
		{
			if(data[0]>0)
				$rootScope.getController("modelTypeListGrid" , "ddatagrid").refreshCurrent(); 
			else
				alert("删除失败");
		}
	
	}
	
	$scope.updateModelType = function(modelType)
	{
		$state.go("main.list.modelType.modelTypeEditForm",{operate:'edit',id:modelType.EId});
	}
	$scope.displayModelType = function(modelType)
	{
		$state.go("main.list.modelType.modelTypeDisplay",{id:modelType.EId});
	}
	
	$scope.operationBarButtons=[];
	
	var addBarButton={};
	addBarButton.click= $scope.addModelType;
	addBarButton.label='新增';
	addBarButton.icon = "glyphicon glyphicon-plus-sign";
	addBarButton.permission = 'modelType_add';
	$scope.operationBarButtons.push(addBarButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateModelType;
	editColumn.label='编辑';
	editColumn.icon = "glyphicon glyphicon-edit";
	editColumn.permission = 'modelType_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayModelType;
	displayColumn.label='查看';
	displayColumn.icon = "glyphicon glyphicon-eye-open";
	displayColumn.permission = 'modelType_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteModelType;
	deleteColumn.label='删除';
	deleteColumn.icon = "glyphicon glyphicon-remove-circle";
	deleteColumn.permission = 'modelType_delete';
	$scope.operationColumns.push(deleteColumn);
}]);	
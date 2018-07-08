angular.module('modelDataTypeModule', [])
.controller('modelDataTypeListController',['$rootScope','$scope','$state','$stateParams', 'ModelDataTypeService','angularPermission','dialogs',
function($rootScope,$scope,$state,$stateParams, ModelDataTypeService,angularPermission,dialogs){
	
	$scope.addModelDataType = function(modelDataType)
	{
		$state.go('main.list.modelDataType.modelDataTypeAddForm',{operate:'add'});
	}
	
	$scope.hasPermission = function(operate)
	{
		return angularPermission.hasPermission(operate);
	}
	
	$scope.deleteModelDataType = function(modelDataType)
	{
		
		if (confirm('确认删除?')) {
			ModelDataTypeService.deleteModelDataType({modelDataTypeId:modelDataType.EId},$scope.deleteSuccessFn,function(data){ alert('删除失败'); });
        }
	}
	$scope.deleteSuccessFn = function(data)
	{
		if(data[0]>0)
				$rootScope.getController('modelDataTypeListGrid' , 'ddatagrid').refreshCurrent();
		else
				alert('删除失败');
	}
	
	$scope.updateModelDataType = function(modelDataType)
	{
		$state.go('main.list.modelDataType.modelDataTypeEditForm',{operate:'edit',id:modelDataType.EId});
	}
	$scope.displayModelDataType = function(modelDataType)
	{
		$state.go('main.list.modelDataType.modelDataTypeDisplay',{id:modelDataType.EId});
	}
	
	$scope.operationBarButtons=[];
	
	var addBarButton={};
	addBarButton.click= $scope.addModelDataType;
	addBarButton.label='新增';
	addBarButton.icon = 'glyphicon glyphicon-plus-sign';
	addBarButton.permission = 'modelDataType_add';
	$scope.operationBarButtons.push(addBarButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateModelDataType;
	editColumn.label='编辑';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'modelDataType_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayModelDataType;
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	displayColumn.permission = 'modelDataType_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteModelDataType;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
	deleteColumn.permission = 'modelDataType_delete';
	$scope.operationColumns.push(deleteColumn);
}]);	
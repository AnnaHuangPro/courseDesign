angular.module('modelFileModule', [])
.controller('modelFileListController',['$rootScope','$scope','$state','$stateParams','angularPermission','ModelFileService',
function($rootScope,$scope,$state,$stateParams,angularPermission,ModelFileService){
	
	$scope.addModelFile = function(modelFile)
	{
		$state.go('main.list.modelFile.modelFileAddForm',{operate:'add'});
	}
	$scope.deleteModelFile = function(modelFile)
	{
		
		if (confirm('确认删除?')) {
			ModelFileService.deleteModelFile({modelFileId:modelFile.EId},$scope.deleteSuccessFn,function(error){ $rootScope.openErrorDialog(error); });
        }
	}
	$scope.deleteSuccessFn = function(data)
	{
		if(data>0)
				$rootScope.getController('modelFileListGrid' , 'ddatagrid').refreshCurrent();
		else
				alert('删除失败');
	}
	
	$scope.updateModelFile = function(modelFile)
	{
		$state.go('main.list.modelFile.modelFileEditForm',{operate:'edit',id:modelFile.EId});
	}
	$scope.displayModelFile = function(modelFile)
	{
		$state.go('main.list.modelFile.modelFileDisplay',{id:modelFile.EId});
	}
	
	$scope.preview = function(modelFile){
		$state.go('main.list.reportFormPreview.previewRoute',{modelFileKey:modelFile.modelKey,withChart:modelFile.withChart});
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
	$scope.operationBarButtons=[];
	
	var addBarButton={};
	addBarButton.click= $scope.addModelFile;
	addBarButton.label='新增';
	addBarButton.icon = 'glyphicon glyphicon-plus-sign';
	addBarButton.permission = 'modelFile_add';
	$scope.operationBarButtons.push(addBarButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateModelFile;
	editColumn.label='编辑';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'modelFile_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayModelFile;
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	displayColumn.permission = 'modelFile_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteModelFile;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
	deleteColumn.permission = 'modelFile_delete';
	$scope.operationColumns.push(deleteColumn);
	
	var reportViewPreviewColumn={};
	reportViewPreviewColumn.click= $scope.preview;
	reportViewPreviewColumn.label='报表预览';
	reportViewPreviewColumn.icon = 'glyphicon glyphicon-remove-circle';
	reportViewPreviewColumn.permission = 'modelFile_preview';
	$scope.operationColumns.push(reportViewPreviewColumn);
	addPermission('modelFile_preview');
	addPermission('modelFile_add');
	addPermission('modelFile_edit');
	addPermission('modelFile_display');
	addPermission('modelFile_delete');	
	
}]);	
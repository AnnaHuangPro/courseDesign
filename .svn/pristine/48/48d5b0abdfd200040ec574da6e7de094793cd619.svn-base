angular.module('attachmentGroupCategoryModule', [])
.controller('attachmentGroupCategoryListController',['$rootScope','$scope','$state','$stateParams','angularPermission','AttachmentGroupCategoryService','dialogs',
function($rootScope,$scope,$state,$stateParams,angularPermission,AttachmentGroupCategoryService,dialogs){
	
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
	
	$scope.addAttachmentGroupCategory = function(attachmentGroupCategory)
	{
		$state.go('main.list.attachmentGroupCategory.attachmentGroupCategoryAddForm',{operate:'add'});
	}
	$scope.deleteAttachmentGroupCategory = function(attachmentGroupCategory)
	{
		var dialog = dialogs.confirm("确认框","删除之后不能恢复，确定要删除吗？",{size:'sm'});
		dialog.result.then(function(){
			function successCB(data)
			{
				if(data>0){
					dialogs.notify("提示","删除成功",{size:'sm'});
					refreshGrid();
				}
				else{
					dialogs.error("错误","删除的数据已经不存在（可能已经被其他用户删除）",{size:'sm'});
				}
			};
			function errorCB(error)
			{
				dialogs.error("提示",error,{size:'sm'});
			};
			AttachmentGroupCategoryService.deleteAttachmentGroupCategory({attachmentGroupCategoryId:attachmentGroupCategory.EId},successCB,errorCB);
		},function(){
			 //确认框取消什么都不做
		});
	
	}
	
	$scope.updateAttachmentGroupCategory = function(attachmentGroupCategory)
	{
		$state.go('main.list.attachmentGroupCategory.attachmentGroupCategoryEditForm',{operate:'edit',id:attachmentGroupCategory.EId});
	}
	$scope.displayAttachmentGroupCategory = function(attachmentGroupCategory)
	{
		$state.go('main.list.attachmentGroupCategory.attachmentGroupCategoryDisplay',{id:attachmentGroupCategory.EId});
	}
	
	function refreshGrid(){
		$scope.refreshGrid("attachmentGroupCategoryListGrid");
	}
	$scope.operationBarButtons=[];
	
	var addBarButton={};
	addBarButton.click= $scope.addAttachmentGroupCategory;
	addBarButton.label='新增';
	addBarButton.icon = 'glyphicon glyphicon-plus-sign';
	addBarButton.permission = 'attachmentGroupCategory_add';
	$scope.operationBarButtons.push(addBarButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateAttachmentGroupCategory;
	editColumn.label='编辑';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'attachmentGroupCategory_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayAttachmentGroupCategory;
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	displayColumn.permission = 'attachmentGroupCategory_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteAttachmentGroupCategory;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
	deleteColumn.permission = 'attachmentGroupCategory_delete';
	$scope.operationColumns.push(deleteColumn);
	
	addPermission('attachmentGroupCategory_add');
	addPermission('attachmentGroupCategory_edit');
	addPermission('attachmentGroupCategory_display');
	addPermission('attachmentGroupCategory_delete');
}]);	
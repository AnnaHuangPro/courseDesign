angular.module('attachmentGroupItemModule', [])
.controller('attachmentGroupItemListController',['$rootScope','$scope','$state','$stateParams','angularPermission','AttachmentGroupItemService','dialogs',
function($rootScope,$scope,$state,$stateParams,angularPermission,AttachmentGroupItemService,dialogs){
	
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
	
	$scope.addAttachmentGroupItem = function(attachmentGroupItem)
	{
		$state.go('main.list.attachmentGroupItem.attachmentGroupItemAddForm',{operate:'add'});
	}
	$scope.deleteAttachmentGroupItem = function(attachmentGroupItem)
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
			AttachmentGroupItemService.deleteAttachmentGroupItem({attachmentGroupItemId:attachmentGroupItem.EId},successCB,errorCB);
		},function(){
			 //确认框取消什么都不做
		});
	
	}
	$scope.deleteSuccessFn = function(data)
	{
		if(data>0)
				$rootScope.getController('attachmentGroupItemListGrid' , 'ddatagrid').refreshCurrent();
		else
			dialogs.notify("提示","已删除",{size:'sm'});
	}
	
	$scope.updateAttachmentGroupItem = function(attachmentGroupItem)
	{
		$state.go('main.list.attachmentGroupItem.attachmentGroupItemEditForm',{operate:'edit',id:attachmentGroupItem.EId});
	}
	$scope.displayAttachmentGroupItem = function(attachmentGroupItem)
	{
		$state.go('main.list.attachmentGroupItem.attachmentGroupItemDisplay',{id:attachmentGroupItem.EId});
	}
	function refreshGrid(){
		$scope.refreshGrid("attachmentGroupItemListGrid");
	}
	$scope.operationBarButtons=[];
	
	var addBarButton={};
	addBarButton.click= $scope.addAttachmentGroupItem;
	addBarButton.label='新增';
	addBarButton.icon = 'glyphicon glyphicon-plus-sign';
	addBarButton.permission = 'attachmentGroupItem_add';
	$scope.operationBarButtons.push(addBarButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateAttachmentGroupItem;
	editColumn.label='编辑';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'attachmentGroupItem_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayAttachmentGroupItem;
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	displayColumn.permission = 'attachmentGroupItem_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteAttachmentGroupItem;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
	deleteColumn.permission = 'attachmentGroupItem_delete';
	$scope.operationColumns.push(deleteColumn);
	
	addPermission('attachmentGroupItem_add');
	addPermission('attachmentGroupItem_edit');
	addPermission('attachmentGroupItem_display');
	addPermission('attachmentGroupItem_delete');
}]);	
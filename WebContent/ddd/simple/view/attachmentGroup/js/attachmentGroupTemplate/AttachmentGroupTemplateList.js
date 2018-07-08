angular.module('attachmentGroupTemplateModule', [])
.controller('attachmentGroupTemplateListController',['$rootScope','$scope','$state','$stateParams','angularPermission','AttachmentGroupTemplateService','dialogs',
function($rootScope,$scope,$state,$stateParams,angularPermission,AttachmentGroupTemplateService,dialogs){
	
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
	
	$scope.addAttachmentGroupTemplate = function(attachmentGroupTemplate)
	{
		$state.go('main.list.attachmentGroupTemplate.attachmentGroupTemplateAddForm',{operate:'add'});
	}
	$scope.deleteAttachmentGroupTemplate = function(attachmentGroupTemplate)
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
			AttachmentGroupTemplateService.deleteAttachmentGroupTemplate({attachmentGroupTemplateId:attachmentGroupTemplate.EId},successCB,errorCB);
		},function(){
			 //确认框取消什么都不做
		});
	
	}
	$scope.deleteSuccessFn = function(data)
	{
		if(data>0)
				$rootScope.getController('attachmentGroupTemplateListGrid' , 'ddatagrid').refreshCurrent();
		else
			dialogs.notify("提示","已删除",{size:'sm'});
	}
	
	$scope.updateAttachmentGroupTemplate = function(attachmentGroupTemplate)
	{
		$state.go('main.list.attachmentGroupTemplate.attachmentGroupTemplateEditForm',{operate:'edit',id:attachmentGroupTemplate.EId});
	}
	$scope.displayAttachmentGroupTemplate = function(attachmentGroupTemplate)
	{
		$state.go('main.list.attachmentGroupTemplate.attachmentGroupTemplateDisplay',{id:attachmentGroupTemplate.EId});
	}
	function refreshGrid(){
		$scope.refreshGrid("attachmentGroupTemplateListGrid");
	}
	$scope.operationBarButtons=[];
	
	var addBarButton={};
	addBarButton.click= $scope.addAttachmentGroupTemplate;
	addBarButton.label='新增';
	addBarButton.icon = 'glyphicon glyphicon-plus-sign';
	addBarButton.permission = 'attachmentGroupTemplate_add';
	$scope.operationBarButtons.push(addBarButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateAttachmentGroupTemplate;
	editColumn.label='编辑';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'attachmentGroupTemplate_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayAttachmentGroupTemplate;
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	displayColumn.permission = 'attachmentGroupTemplate_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteAttachmentGroupTemplate;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
	deleteColumn.permission = 'attachmentGroupTemplate_delete';
	$scope.operationColumns.push(deleteColumn);
	
	addPermission('attachmentGroupTemplate_add');
	addPermission('attachmentGroupTemplate_edit');
	addPermission('attachmentGroupTemplate_display');
	addPermission('attachmentGroupTemplate_delete');
}]);	
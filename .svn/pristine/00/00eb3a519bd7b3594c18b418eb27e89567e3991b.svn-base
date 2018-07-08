angular.module('attachementGroupModule', [])
.controller('attachementGroupListController',['$rootScope','$scope','$state','$stateParams','angularPermission','AttachementGroupService','dialogs',
function($rootScope,$scope,$state,$stateParams,angularPermission,AttachementGroupService,dialogs){
	
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
	
	$scope.addAttachementGroup = function(attachementGroup)
	{
		$state.go('main.list.attachementGroup.attachementGroupAddForm',{operate:'add'});
	}
	
	$scope.deleteAttachementGroup = function(attachementGroup)
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
			AttachementGroupService.deleteAttachementGroup({attachementGroupId:attachementGroup.EId},successCB,errorCB);
		},function(){
			 //确认框取消什么都不做
		});
	}	
	
	$scope.deleteSuccessFn = function(data)
	{
		if(data>0)
				$rootScope.getController('attachementGroupListGrid' , 'ddatagrid').refreshCurrent();
		else
			dialogs.notify("提示","已删除",{size:'sm'});
	}
	
	$scope.updateAttachementGroup = function(attachementGroup)
	{
		$state.go('main.list.attachementGroup.attachementGroupEditForm',{operate:'edit',id:attachementGroup.EId});
	}
	$scope.displayAttachementGroup = function(attachementGroup)
	{
		$state.go('main.list.attachementGroup.attachementGroupDisplay',{id:attachementGroup.EId});
	}
	
	function refreshGrid(){
		$scope.refreshGrid("attachementGroupListGrid");
	}
	
	$scope.operationBarButtons=[];
	
	var addBarButton={};
	addBarButton.click= $scope.addAttachementGroup;
	addBarButton.label='新增';
	addBarButton.icon = 'glyphicon glyphicon-plus-sign';
	addBarButton.permission = 'attachementGroup_add';
	$scope.operationBarButtons.push(addBarButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateAttachementGroup;
	editColumn.label='编辑';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'attachementGroup_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayAttachementGroup;
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	displayColumn.permission = 'attachementGroup_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteAttachementGroup;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
	deleteColumn.permission = 'attachementGroup_delete';
	$scope.operationColumns.push(deleteColumn);
	
	addPermission('attachementGroup_add');
	addPermission('attachementGroup_edit');
	addPermission('attachementGroup_display');
	addPermission('attachementGroup_delete');
}]);	
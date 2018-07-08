angular.module('memberGroupModule', [])
.controller('memberGroupListController',['$rootScope','$scope','$state','$stateParams','angularPermission','MemberGroupService','dialogs',
function($rootScope,$scope,$state,$stateParams,angularPermission,MemberGroupService,dialogs){
	
	$scope.addMemberGroup = function()
	{
		$state.go('main.list.memberGroup.memberGroupAddForm',{operate:'add'});
	}
	$scope.deleteMemberGroup = function(memberGroup)
	{
		var dialog = dialogs.confirm("确认框","删除之后不能恢复，确定要删除吗？",{size:'sm'});
		dialog.result.then(function(){
			function successCB(data)
			{
				if(data>0){
					refreshGrid();
				}
				else{
					dialogs.error("错误","删除的数据已经不存在（可能已经被其他用户删除）");
				}
			};
			function errorCB(error)
			{
				$rootScope.openErrorDialog(error);
			};
			MemberGroupService.deleteMemberGroup({memberGroupId:memberGroup.EId},successCB,errorCB);
		},function(){
			 //确认框取消什么都不做
		});
	
	}
	function refreshGrid(){
		$scope.refreshGrid("memberGroupListGrid");
	}
	$scope.updateMemberGroup = function(memberGroup)
	{
		$state.go('main.list.memberGroup.memberGroupEditForm',{operate:'edit',id:memberGroup.EId});
	}
//	$scope.displayMemberGroup = function(memberGroup)
//	{
//		$state.go('main.list.memberGroup.memberGroupDisplay',{id:memberGroup.EId});
//	}
	$scope.memberMgtGroup = function(memberGroup)
	{
		$state.go('main.list.memberGroup.memberGroupMgtListRoute',{memberGroupId:memberGroup.EId});
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
	addBarButton.click= $scope.addMemberGroup;
	addBarButton.label='添加';
	addBarButton.icon = 'glyphicon glyphicon-plus-sign';
	addBarButton.permission = 'memberGroup_add';
	$scope.operationBarButtons.push(addBarButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateMemberGroup;
	editColumn.label='编辑';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'memberGroup_edit';
	$scope.operationColumns.push(editColumn);
	
//	var displayColumn={};
//	displayColumn.click= $scope.displayMemberGroup;
//	displayColumn.label='查看';
//	displayColumn.icon = 'glyphicon glyphicon-eye-open';
//	displayColumn.permission = 'memberGroup_display';
//	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteMemberGroup;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
	deleteColumn.permission = 'memberGroup_delete';
	$scope.operationColumns.push(deleteColumn);
	
	var memberMgtColumn={};
	memberMgtColumn.click= $scope.memberMgtGroup;
	memberMgtColumn.label='成员管理';
	memberMgtColumn.icon = 'glyphicon glyphicon-user';
	memberMgtColumn.permission = 'memberGroup_memberMgt';
	$scope.operationColumns.push(memberMgtColumn);
	
	addPermission('memberGroup_memberMgt');
}]);	
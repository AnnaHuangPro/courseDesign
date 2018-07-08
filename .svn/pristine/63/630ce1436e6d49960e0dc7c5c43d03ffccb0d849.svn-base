angular.module('memberModule', [])
.controller('memberListController',['$rootScope','$scope','$state','$stateParams','angularPermission','MemberService','dialogs',
function($rootScope,$scope,$state,$stateParams,angularPermission,MemberService,dialogs){
	
	$scope.addMember = function(member)
	{
		$state.go('main.list.member.memberAddForm',{operate:'add'});
	}
	$scope.deleteMember = function(member)
	{
		MemberService.checkMemberIsInGroup({member:member},sucesscb,errorcb);
		function sucesscb(data)
		{
			$scope.judeDelete(data,member);
		}
		function errorcb()
		{
			alert('查找会员组失败!');
		}	
	}
	$scope.judeDelete =function(data,member)
	{
		if(data==null || data.res==null)
			alert("[500]错误！");
		else{
			if(data.res=="isInGroup"){
				if (confirm("该成员已经存在于组："+data.groups+" 您确认删除？")) {
					MemberService.deleteMember({member:member},$scope.deleteSuccessFn,function(data){ alert('删除失败'); });
					}
			}
			else if (confirm("您确认删除？")){
				MemberService.deleteMember({member:member},$scope.deleteSuccessFn,function(data){ alert('删除失败'); });
			}
		}
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
	$scope.deleteSuccessFn = function(data)
	{
		$rootScope.getController('memberListGrid' , 'ddatagrid').refreshCurrent();
	}
	
	$scope.updateMember = function(member)
	{
		$state.go('main.list.member.memberEditForm',{operate:'edit',id:member.EId});
	}
	$scope.displayMember = function(member)
	{
		$state.go('main.list.member.memberDisplay',{id:member.EId});
	}
	
	$scope.operationBarButtons=[];
	
	var addBarButton={};
	addBarButton.click= $scope.addMember;
	addBarButton.label='新增';
	addBarButton.icon = 'glyphicon glyphicon-plus-sign';
	addBarButton.permission = 'member_add';
	$scope.operationBarButtons.push(addBarButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateMember;
	editColumn.label='编辑';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'member_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayMember;
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	displayColumn.permission = 'member_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteMember;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
	deleteColumn.permission = 'member_delete';
	$scope.operationColumns.push(deleteColumn);
	
	addPermission('member_add');
	addPermission('member_edit');
	addPermission('member_display');
	addPermission('member_delete');	
}]);	
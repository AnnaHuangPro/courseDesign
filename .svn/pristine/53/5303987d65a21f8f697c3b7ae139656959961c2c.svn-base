angular.module('memberGroupMgtModule', [])
.controller('memberGroupMgtListController',['$rootScope','$scope','$state','$stateParams','angularPermission','MemberService','MemberGroupService','dialogs',
function($rootScope,$scope,$state,$stateParams,angularPermission,MemberService,MemberGroupService,dialogs){
	var memberGroupId = $stateParams.memberGroupId;
	
	$scope.getGroupMembersById = function(memberGroupId)
	{
		MemberGroupService.getGroupMembersById(memberGroupId,sucesscb,errorcb);
		function sucesscb(groupMembers)
		{
			$rootScope.getController('memberGroupMgtListGrid', 'ddatagrid').setDataGridProviders(groupMembers);
		}
		function errorcb()
		{
			alert("成员加载失败");
		}
	}
	$scope.getGroupMembersById(memberGroupId);
	$scope.addMember = function()
	{	
		$state.go('main.list.memberGroup.memberGroupMgtAddForm',{operate:'add',memberGroupId:memberGroupId});
	}
	$scope.deleteMemberProjection = function(member)
	{
		if (confirm('确认删除?')) {
			MemberGroupService.deleteMemberProjection(member.eId,memberGroupId,$scope.deleteSuccessFn,function(data){ alert('删除失败'); });
        }
	}
	$scope.deleteSuccessFn = function(data)
	{
		alert('删除成功');
		$scope.getGroupMembersById(memberGroupId);
	}
	
	$scope.updateMemberProjection = function(member)
	{
		$state.go('main.list.memberGroup.memberGroupMgtEditForm',{operate:'edit',memberId:member.eId,memberGroupId:memberGroupId});	
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
	addBarButton.click= $scope.addMember;
	addBarButton.label='添加新成员';
	addBarButton.icon = 'glyphicon glyphicon-plus-sign';
	addBarButton.permission = 'memberGroup_memberMgt';
	$scope.operationBarButtons.push(addBarButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateMemberProjection;
	editColumn.label='重新分配';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'memberGroup_memberMgt';
	$scope.operationColumns.push(editColumn);

	var deleteColumn={};
	deleteColumn.click= $scope.deleteMemberProjection;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
	deleteColumn.permission = 'memberGroup_memberMgt';
	$scope.operationColumns.push(deleteColumn);
	
	addPermission('memberGroup_memberMgt');
	
}]);	
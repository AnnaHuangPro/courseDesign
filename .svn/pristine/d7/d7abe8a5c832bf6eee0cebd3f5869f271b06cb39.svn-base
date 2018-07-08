angular.module('memberTypeModule', [])
.controller('memberTypeListController',['$rootScope','$scope','$state','$stateParams','angularPermission','MemberTypeService','dialogs',
function($rootScope,$scope,$state,$stateParams,angularPermission,MemberTypeService,dialogs){
	
	$scope.addMemberType = function(memberType)
	{
		$state.go('main.list.memberType.memberTypeAddForm',{operate:'add'});
	}
	$scope.deleteMemberType = function(memberType)
	{
		if (confirm('确认删除?')) {
			MemberTypeService.deleteMemberType({memberType:memberType},$scope.deleteSuccessFn,function(data){ alert('删除失败'); });
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
		$rootScope.getController('memberTypeListGrid' , 'ddatagrid').refreshCurrent();
	}
	
	$scope.updateMemberType = function(memberType)
	{
		$state.go('main.list.memberType.memberTypeEditForm',{operate:'edit',id:memberType.EId});
	}
	$scope.displayMemberType = function(memberType)
	{
		$state.go('main.list.memberType.memberTypeDisplay',{id:memberType.EId});
	}
	
	$scope.operationBarButtons=[];
	
	var addBarButton={};
	addBarButton.click= $scope.addMemberType;
	addBarButton.label='新增';
	addBarButton.icon = 'glyphicon glyphicon-plus-sign';
	addBarButton.permission = 'memberType_add';
	$scope.operationBarButtons.push(addBarButton);
	
	$scope.operationColumns=[];
	
	var editColumn={};
	editColumn.click= $scope.updateMemberType;
	editColumn.label='编辑';
	editColumn.icon = 'glyphicon glyphicon-edit';
	editColumn.permission = 'memberType_edit';
	$scope.operationColumns.push(editColumn);
	
	var displayColumn={};
	displayColumn.click= $scope.displayMemberType;
	displayColumn.label='查看';
	displayColumn.icon = 'glyphicon glyphicon-eye-open';
	displayColumn.permission = 'memberType_display';
	$scope.operationColumns.push(displayColumn);
	
	var deleteColumn={};
	deleteColumn.click= $scope.deleteMemberType;
	deleteColumn.label='删除';
	deleteColumn.icon = 'glyphicon glyphicon-remove-circle';
	deleteColumn.permission = 'memberType_delete';
	$scope.operationColumns.push(deleteColumn);
	
	addPermission('memberType_add');
	addPermission('memberType_edit');
	addPermission('memberType_display');
	addPermission('memberType_delete');	
}]);	
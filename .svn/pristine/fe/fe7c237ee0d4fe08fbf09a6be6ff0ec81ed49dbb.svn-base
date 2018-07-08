angular.module('memberGroupModule', [])
.controller('memberGroupFormController',['$rootScope','$scope','MemberGroupService','$state','angularPermission','$stateParams',
function($rootScope,$scope,MemberGroupService,$state,angularPermission,$stateParams){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;

	$scope.getInitMemberGroupData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getMemberGroupDetail();
		}
	}
	
	$scope.getMemberGroupDetail = function()
	{
		MemberGroupService.findMemberGroupById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.memberGroup = data;
		};

		function errorcb(data)
		{
			alert('加载失败');
		};
	};
	
	$scope.saveMemberGroup = function(memberGroup)
	{
		if ($scope.memberGroupForm.$valid) {
			if($scope.operate=='add')
			{
				$scope.addMemberGroup(memberGroup,true);
			}
			else if($scope.operate=='edit')
			{
				$scope.updateMemberGroup(memberGroup);
			}
		}
		else {
			$scope.memberGroupForm.submitted = true;
		}
	}
	
	$scope.saveAndAddMemberGroup = function(memberGroup)
	{
		$scope.addMemberGroup(memberGroup,false);
	}	
	$scope.addMemberGroup = function(memberGroup,needColseTab)
	{   
		MemberGroupService.saveMemberGroup({memberGroup:memberGroup},sucesscb,errorcb);

		function sucesscb()
		{
			if(needColseTab){
				refreshGrid();
				$scope.back();	
			}
			else
				$scope.memberGroup=null;
		}
		function errorcb(error)
		{
			alert(error.data.message);
		}
	}
	$scope.updateMemberGroup = function(memberGroup)
	{
		MemberGroupService.updateMemberGroup({memberGroup:memberGroup},sucesscb,errorcb);
	
		function sucesscb()
		{
			refreshGrid();
			$scope.back();	
		}
		function errorcb()
		{
			alert('修改失败!');
		}
	};
	
//	$scope.refreshGrid = function(){
//		var controller = $rootScope.getController('memberGroupListGrid' , 'ddatagrid');
//		if(controller){
//			controller.refreshCurrent();
//		}
//	}
	function refreshGrid(){
		$scope.refreshGrid("memberGroupListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"memberGroupList","main.list.memberGroup.memberGroupList")
	}
}]);
angular.module('memberGroupMgtModule', [])
.controller('memberGroupMgtFormController',['$rootScope','$scope','MemberGroupService','$state','angularPermission','$stateParams',
function($rootScope,$scope,MemberGroupService,$state,angularPermission,$stateParams){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.memberProjection = {};
	
	$scope.member;
	$scope.memberGroup = {EId:$stateParams.memberGroupId};
	$scope.memberTypes = [];
	$scope.diss=true;
	
	$scope.getInitMemberProjectionData = function()
	{
		
		if($stateParams.operate=='edit')
		{
			$scope.member = {EId:$stateParams.memberId};
			
			$scope.getMemberProjectionGroupDetail($scope.member.EId,$scope.memberGroup.EId);
			$scope.diss=false;
		}
	}
	
	$scope.getMemberProjectionGroupDetail = function(memberId,memberGroupId)
	{
		MemberGroupService.getMemberProjectByIds(memberId,memberGroupId,sucesscb,errorcb);

		function sucesscb(data)
		{
			var memberProjections = data;
			angular.forEach(memberProjections,function(memberProjection){
				$scope.memberTypes.push(memberProjection.memberType);
			})
			$scope.member = memberProjections[0].member;
			$rootScope.getController("memberTypes","dreference").changeMultiSelectDisplay($scope.memberTypes);
		};

		function errorcb(data)
		{
			alert('加载失败');
		};
	};
	
	$scope.saveMemberProjection = function()
	{
		if ($scope.memberProjectionForm.$valid) {
			if(angular.isUndefined($scope.member)){
				alert("请选择会员!");
				return;
			}
			if($scope.memberTypes.length == 0){
				alert("请选择类型!");
				return;
			}
			
			if($scope.operate=='add')
			{
				$scope.addMemberProjection(true);
			}
			else if($scope.operate=='edit')
			{
				$scope.updateMemberProjection(false);
			}
		}
		else {
			$scope.memberProjectionForm.submitted = true;
		}
	}
	
	$scope.addMemberProjection = function(needColseTab)
	{   
		MemberGroupService.saveMemberProjection($scope.member,$scope.memberGroup,$scope.memberTypes,sucesscb,errorcb);

		function sucesscb(data)
		{
			if(data.isSuccess){
				alert('添加成功');
				$scope.refreshGrid();
				if(needColseTab){
					$rootScope.closeOperateTab();
					$state.go('main.list.memberGroup.memberGroupMgtListRoute',{memberGroupId:$stateParams.memberGroupId});
				}
			}
			else{
				alert("添加失败")
			}
		}
		function errorcb(error)
		{
			alert(error.cause.message);
		}
	}
	
	$scope.updateMemberProjection = function(needColseTab)
	{
		MemberGroupService.updateMemberProjection($scope.member,$scope.memberGroup,$scope.memberTypes,sucesscb,errorcb);
		function sucesscb(data)
		{
			if(data.isSuccess){
				alert('编辑成功');
				if(needColseTab){
					$rootScope.closeOperateTab();
					$state.go('main.list.memberGroup.memberGroupMgtListRoute',{memberGroupId:$stateParams.memberGroupId});
				}
			}
			else{
				alert("添加失败")
			}
		}
		function errorcb(error)
		{
			alert(error.cause.message);
		}
	};
//	$scope.refreshGrid = function(){
//		var controller = $rootScope.getController('memberGroupMgtListGrid' , 'ddatagrid');
//		if(controller){
//			controller.refreshCurrent();
//		}
//	}
	function refreshGrid(){
		$scope.refreshGrid("memberGroupMgtListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"memberGroupMgtList","main.list.memberGroup.memberGroupMgtListRoute")
	}
	
}]);
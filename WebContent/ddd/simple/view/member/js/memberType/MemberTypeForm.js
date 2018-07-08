angular.module('memberTypeModule', [])
.controller('memberTypeFormController',['$rootScope','$scope','MemberTypeService','$state','angularPermission','$stateParams',
function($rootScope,$scope,MemberTypeService,$state,angularPermission,$stateParams){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;

	$scope.getInitMemberTypeData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getMemberTypeDetail();
		}
	}
	
	$scope.getMemberTypeDetail = function()
	{
		MemberTypeService.findMemberTypeById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.memberType = data;
		};

		function errorcb(data)
		{
			alert('加载失败');
		};
	};
	
	$scope.saveMemberType = function(memberType)
	{
		if ($scope.memberTypeForm.$valid) {
			if($scope.operate=='add')
			{
				$scope.addMemberType(memberType,true);
			}
			else if($scope.operate=='edit')
			{
				$scope.updateMemberType(memberType);
			}
		}
		else {
			$scope.memberTypeForm.submitted = true;
		}
	}
	
	$scope.saveAndAddMemberType = function(memberType)
	{
		$scope.addMemberType(memberType,false);
	}	
	$scope.addMemberType = function(memberType,needColseTab)
	{   
		MemberTypeService.saveMemberType({memberType:memberType},sucesscb,errorcb);

		function sucesscb()
		{
			if(needColseTab){
				$rootScope.closeOperateTab();
				$state.go('main.list.memberType.memberTypeList');
			}
			else
				$scope.memberType=null;
			$scope.refreshGrid();
		}
		function errorcb(error)
		{
			alert(error.cause.message);
		}
	}
	$scope.updateMemberType = function(memberType)
	{
		MemberTypeService.updateMemberType({memberType:memberType},sucesscb,errorcb);
	
		function sucesscb()
		{
			$rootScope.closeOperateTab();
			$state.go('main.list.memberType.memberTypeList');
			$scope.refreshGrid();
		}
		function errorcb(error)
		{
			alert(error.cause.message);
		}
	};
	
//	$scope.refreshGrid = function(){
//		var controller = $rootScope.getController('memberTypeListGrid' , 'ddatagrid');
//		if(controller){
//			controller.refreshCurrent();
//		}
//	}
	function refreshGrid(){
		$scope.refreshGrid("memberTypeListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"memberTypeList","main.list.memberType.memberTypeList")
	}
}]);
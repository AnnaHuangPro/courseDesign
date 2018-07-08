angular.module('memberModule', [])
.controller('memberFormController',['$rootScope','$scope','MemberService',"EntityPropertyDefineService","EntityPropertyService",'$state','angularPermission','$stateParams',
function($rootScope,$scope,MemberService,EntityPropertyDefineService,EntityPropertyService,$state,angularPermission,$stateParams){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	
	$scope.propertiesModel="";
	
	$scope.getInitMemberData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getMemberDetail();
		}
	}
	
	$scope.getMemberDetail = function()
	{
		MemberService.findMemberById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.member = data;
			$rootScope.getController('memberId','dentityproperties').loadPropertiesValue($scope.member.eId); 
		};

		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		};
	};
	
	$scope.saveMember = function(member)
	{
		if ($scope.memberForm.$valid) {
			if($scope.operate=='add')
			{
				$scope.addMember(member,true);
			}
			else if($scope.operate=='edit')
			{
				$scope.updateMember(member);
			}
		}
		else {
			$scope.memberForm.submitted = true;
		}
	}
	
	$scope.saveAndAddMember = function(member)
	{
		$scope.addMember(member,true);
	}	
	$scope.addMember = function(member,needColseTab)
	{   
		MemberService.saveMember({member:member},sucesscb,errorcb);

		function sucesscb(data)
		{
			$rootScope.getController('memberId','dentityproperties').saveEntityProperties(data.eId); 
			if(needColseTab){
				refreshGrid();
				$scope.back();	
			}
			else
				$scope.member=null;
		}
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		}
	}
	$scope.updateMember = function(member)
	{
		MemberService.updateMember({member:member},sucesscb,errorcb);
	
		function sucesscb(data)
		{
			$rootScope.getController('memberId','dentityproperties').updateEntityProperties(data.eId);
			refreshGrid();
			$scope.back();	
		}
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		}
	};
	
//	$scope.refreshGrid = function(){
//		var controller = $rootScope.getController('memberListGrid' , 'ddatagrid');
//		if(controller){
//			controller.refreshCurrent();
//		}
//	}
	function refreshGrid(){
		$scope.refreshGrid("memberListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"memberList","main.list.member.memberList")
	}
}]);
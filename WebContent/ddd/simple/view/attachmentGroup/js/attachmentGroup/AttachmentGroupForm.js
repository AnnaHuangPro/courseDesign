angular.module('attachementGroupModule', [])
.controller('attachementGroupFormController',['$rootScope','$scope','AttachementGroupService','$state','angularPermission','$stateParams','dialogs',
function($rootScope,$scope,AttachementGroupService,$state,angularPermission,$stateParams,dialogs){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;

	$scope.getInitAttachementGroupData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getAttachementGroupDetail();
		}
	}
	
	$scope.getAttachementGroupDetail = function()
	{
		AttachementGroupService.findAttachementGroupById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.attachementGroup = data;
		};

		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		};
	};
	
	$scope.saveAttachementGroup = function(attachementGroup)
	{
		if($scope.operate=='add')
		{
			$scope.addAttachementGroup(attachementGroup,true);
		}
		else if($scope.operate=='edit')
		{
			$scope.updateAttachementGroup(attachementGroup);
		}
	}
	
	$scope.saveAndAddAttachementGroup = function(attachementGroup)
	{
		$scope.addAttachementGroup(attachementGroup,false);
	}	
	$scope.addAttachementGroup = function(attachementGroup,needColseTab)
	{   
		AttachementGroupService.saveAttachementGroup({attachementGroup:attachementGroup},sucesscb,errorcb);

		function sucesscb()
		{
			if(needColseTab){
				dialogs.notify("提示","添加成功",{size:'sm'});
				refreshGrid();
				$scope.back();
			}
			else
				$scope.attachementGroup=null;
		}
		function errorcb(error)
		{
				dialogs.error("提示",error,{size:'sm'});
		}
	}
	$scope.updateAttachementGroup = function(attachementGroup)
	{
		AttachementGroupService.updateAttachementGroup({attachementGroup:attachementGroup},sucesscb,errorcb);
	
		function sucesscb()
		{
			dialogs.notify("提示","更新成功",{size:'sm'});
			refreshGrid();
			$scope.back();
		}
		function errorcb(error)
		{
			dialogs.error("提示",error,{size:'sm'});
		}
	};
	
//	$scope.refreshGrid = function(){
//		var controller = $rootScope.getController('attachementGroupListGrid' , 'ddatagrid');
//		if(controller){
//			controller.refreshCurrent();
//		}
//	}
	function refreshGrid(){
		$scope.refreshGrid("attachementGroupListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"attachementGroupList","main.list.attachementGroup.attachementGroupList")
	}
}]);
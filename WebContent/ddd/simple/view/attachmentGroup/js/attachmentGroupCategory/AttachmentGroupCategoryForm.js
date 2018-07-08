angular.module('attachmentGroupCategoryModule', [])
.controller('attachmentGroupCategoryFormController',['$rootScope','$scope','AttachmentGroupCategoryService','$state','angularPermission','$stateParams',
function($rootScope,$scope,AttachmentGroupCategoryService,$state,angularPermission,$stateParams){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;

	$scope.getInitAttachmentGroupCategoryData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getAttachmentGroupCategoryDetail();
		}
	}
	
	$scope.getAttachmentGroupCategoryDetail = function()
	{
		AttachmentGroupCategoryService.findAttachmentGroupCategoryById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.attachmentGroupCategory = data;
		};

		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		};
	};
	
	$scope.saveAttachmentGroupCategory = function(attachmentGroupCategory)
	{
		if($scope.operate=='add')
		{
			$scope.addAttachmentGroupCategory(attachmentGroupCategory,true);
		}
		else if($scope.operate=='edit')
		{
			$scope.updateAttachmentGroupCategory(attachmentGroupCategory);
		}
	}
	
	$scope.saveAndAddAttachmentGroupCategory = function(attachmentGroupCategory)
	{
		$scope.addAttachmentGroupCategory(attachmentGroupCategory,false);
	}	
	$scope.addAttachmentGroupCategory = function(attachmentGroupCategory,needColseTab)
	{   
		AttachmentGroupCategoryService.saveAttachmentGroupCategory({attachmentGroupCategory:attachmentGroupCategory},sucesscb,errorcb);

		function sucesscb()
		{
			if(needColseTab){
				dialogs.notify("提示","添加成功",{size:'sm'});
				refreshGrid();
				$scope.back();
			}
			else
				$scope.attachmentGroupCategory=null;
		}
		function errorcb(error)
		{
				dialogs.error("提示",error,{size:'sm'});
		}
	}
	$scope.updateAttachmentGroupCategory = function(attachmentGroupCategory)
	{
		AttachmentGroupCategoryService.updateAttachmentGroupCategory({attachmentGroupCategory:attachmentGroupCategory},sucesscb,errorcb);
	
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
//		var controller = $rootScope.getController('attachmentGroupCategoryListGrid' , 'ddatagrid');
//		if(controller){
//			controller.refreshCurrent();
//		}
//	}
	function refreshGrid(){
		$scope.refreshGrid("attachmentGroupCategoryListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"attachmentGroupCategoryList","main.list.attachmentGroupCategory.attachmentGroupCategoryList")
	}
}]);
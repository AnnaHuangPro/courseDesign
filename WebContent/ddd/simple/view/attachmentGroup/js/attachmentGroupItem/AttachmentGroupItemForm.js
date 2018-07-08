angular.module('attachmentGroupItemModule', [])
.controller('attachmentGroupItemFormController',['$rootScope','$scope','AttachmentGroupItemService','$state','angularPermission','$stateParams',
function($rootScope,$scope,AttachmentGroupItemService,$state,angularPermission,$stateParams){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;
	$scope.attachmentGroupItem={};

	$scope.getInitAttachmentGroupItemData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getAttachmentGroupItemDetail();
		}else{
			$scope.attachmentGroupItem.enable=true;
		}
	}
	
	$scope.getAttachmentGroupItemDetail = function()
	{
		AttachmentGroupItemService.findAttachmentGroupItemById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.attachmentGroupItem = data;
		};

		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		};
	};
	
	$scope.saveAttachmentGroupItem = function(attachmentGroupItem)
	{
		if($scope.operate=='add')
		{
			$scope.addAttachmentGroupItem(attachmentGroupItem,true);
		}
		else if($scope.operate=='edit')
		{
			$scope.updateAttachmentGroupItem(attachmentGroupItem);
		}
	}
	
	$scope.saveAndAddAttachmentGroupItem = function(attachmentGroupItem)
	{
		$scope.addAttachmentGroupItem(attachmentGroupItem,false);
	}	
	$scope.addAttachmentGroupItem = function(attachmentGroupItem,needColseTab)
	{   
		AttachmentGroupItemService.saveAttachmentGroupItem({attachmentGroupItem:attachmentGroupItem},sucesscb,errorcb);

		function sucesscb()
		{
			if(needColseTab){
				dialogs.notify("提示","添加成功",{size:'sm'});
				refreshGrid();
				$scope.back();
			}
			else
				$scope.attachmentGroupItem=null;
		}
		function errorcb(error)
		{
			dialogs.error("提示",error,{size:'sm'});
		}
	}
	$scope.updateAttachmentGroupItem = function(attachmentGroupItem)
	{
		AttachmentGroupItemService.updateAttachmentGroupItem({attachmentGroupItem:attachmentGroupItem},sucesscb,errorcb);
	
		function sucesscb()
		{
			dialogs.notify("提示","更新成功",{size:'sm'});
			refreshGrid();
			$scope.back();
		}
		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		}
	};
	
//	$scope.refreshGrid = function(){
//		var controller = $rootScope.getController('attachmentGroupItemListGrid' , 'ddatagrid');
//		if(controller){
//			controller.refreshCurrent();
//		}
//	}
	function refreshGrid(){
		$scope.refreshGrid("attachmentGroupItemListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"attachmentGroupItemList","main.list.attachmentGroupItem.attachmentGroupItemList")
	}
}]);
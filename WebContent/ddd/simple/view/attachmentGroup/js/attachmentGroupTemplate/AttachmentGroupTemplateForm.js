angular.module('attachmentGroupTemplateModule', [])
.controller('attachmentGroupTemplateFormController',['$rootScope','$scope','AttachmentGroupTemplateService','$state','angularPermission','$stateParams',
function($rootScope,$scope,AttachmentGroupTemplateService,$state,angularPermission,$stateParams){
	$scope.showSaveAndAddButton = $stateParams.operate == 'add' ?true:false;
	$scope.operate = $stateParams.operate;
	$scope.id = $stateParams.id;

	$scope.getInitAttachmentGroupTemplateData = function()
	{
		if($stateParams.operate=='edit')
		{
			$scope.getAttachmentGroupTemplateDetail();
		}
	}
	
	$scope.getAttachmentGroupTemplateDetail = function()
	{
		AttachmentGroupTemplateService.findAttachmentGroupTemplateById($scope.id,sucesscb,errorcb);

		function sucesscb(data)
		{
			$scope.attachmentGroupTemplate = data;
		};

		function errorcb(error)
		{
			$rootScope.openErrorDialog(error);
		};
	};
	
	$scope.saveAttachmentGroupTemplate = function(attachmentGroupTemplate)
	{
		if($scope.operate=='add')
		{
			$scope.addAttachmentGroupTemplate(attachmentGroupTemplate,true);
		}
		else if($scope.operate=='edit')
		{
			$scope.updateAttachmentGroupTemplate(attachmentGroupTemplate);
		}
	}
	
	$scope.saveAndAddAttachmentGroupTemplate = function(attachmentGroupTemplate)
	{
		$scope.addAttachmentGroupTemplate(attachmentGroupTemplate,false);
	}	
	$scope.addAttachmentGroupTemplate = function(attachmentGroupTemplate,needColseTab)
	{   
		AttachmentGroupTemplateService.saveAttachmentGroupTemplate({attachmentGroupTemplate:attachmentGroupTemplate},sucesscb,errorcb);

		function sucesscb()
		{
			if(needColseTab){
				dialogs.notify("提示","添加成功",{size:'sm'});
				refreshGrid();
				$scope.back();
			}
			else
				$scope.attachmentGroupTemplate=null;
		}
		function errorcb(error)
		{
			dialogs.error("提示",error,{size:'sm'});
		}
	}
	$scope.updateAttachmentGroupTemplate = function(attachmentGroupTemplate)
	{
		AttachmentGroupTemplateService.updateAttachmentGroupTemplate({attachmentGroupTemplate:attachmentGroupTemplate},sucesscb,errorcb);
	
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
//		var controller = $rootScope.getController('attachmentGroupTemplateListGrid' , 'ddatagrid');
//		if(controller){
//			controller.refreshCurrent();
//		}
//	}
	function refreshGrid(){
		$scope.refreshGrid("attachmentGroupTemplateListGrid");
	}
	$scope.back = function() {
		$scope.turnToTab(true,"attachmentGroupTemplateList","main.list.attachmentGroupTemplate.attachmentGroupTemplateList")
	}
}]);
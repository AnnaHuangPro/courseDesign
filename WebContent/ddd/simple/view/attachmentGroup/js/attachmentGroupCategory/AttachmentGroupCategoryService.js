
define(["app"], function (app) 
{
	app.factory("AttachmentGroupCategoryService", function($resource) 
	{
		var attachmentGroupCategoryService = $resource("/QOSMS/AttachmentGroupCategory/:action", {});
		attachmentGroupCategoryService.saveAttachmentGroupCategory=function(attachmentGroupCategory,sucesscb,errorcb)
		{
			attachmentGroupCategoryService.save({action:"saveAttachmentGroupCategory"},attachmentGroupCategory,sucesscb,errorcb);
		};
		
		attachmentGroupCategoryService.deleteAttachmentGroupCategory=function(attachmentGroupCategoryId,sucesscb,errorcb)
		{
			attachmentGroupCategoryService.save({action:"deleteAttachmentGroupCategory"},attachmentGroupCategoryId,sucesscb,errorcb);
		};
		
		attachmentGroupCategoryService.updateAttachmentGroupCategory=function(attachmentGroupCategory,sucesscb,errorcb)
		{
			attachmentGroupCategoryService.save({action:"updateAttachmentGroupCategory"},attachmentGroupCategory,sucesscb,errorcb);
		};
		 
		attachmentGroupCategoryService.findAttachmentGroupCategoryById=function(attachmentGroupCategoryId,sucesscb,errorcb)
		{
			attachmentGroupCategoryService.get({action:"findAttachmentGroupCategoryById",attachmentGroupCategoryId:attachmentGroupCategoryId},sucesscb,errorcb);
		};
		
		attachmentGroupCategoryService.findAllAttachmentGroupCategory=function(sucesscb,errorcb)
		{
			attachmentGroupCategoryService.query({action:"findAllAttachmentGroupCategory"},sucesscb,errorcb);
		}
		return attachmentGroupCategoryService;
})});

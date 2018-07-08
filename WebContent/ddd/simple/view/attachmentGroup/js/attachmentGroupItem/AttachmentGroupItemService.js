
define(["app"], function (app) 
{
	app.factory("AttachmentGroupItemService", function($resource) 
	{
		var attachmentGroupItemService = $resource("/QOSMS/AttachmentGroupItem/:action", {});
		attachmentGroupItemService.saveAttachmentGroupItem=function(attachmentGroupItem,sucesscb,errorcb)
		{
			attachmentGroupItemService.save({action:"saveAttachmentGroupItem"},attachmentGroupItem,sucesscb,errorcb);
		};
		
		attachmentGroupItemService.deleteAttachmentGroupItem=function(attachmentGroupItemId,sucesscb,errorcb)
		{
			attachmentGroupItemService.save({action:"deleteAttachmentGroupItem"},attachmentGroupItemId,sucesscb,errorcb);
		};
		
		attachmentGroupItemService.updateAttachmentGroupItem=function(attachmentGroupItem,sucesscb,errorcb)
		{
			attachmentGroupItemService.save({action:"updateAttachmentGroupItem"},attachmentGroupItem,sucesscb,errorcb);
		};
		 
		attachmentGroupItemService.findAttachmentGroupItemById=function(attachmentGroupItemId,sucesscb,errorcb)
		{
			attachmentGroupItemService.get({action:"findAttachmentGroupItemById",attachmentGroupItemId:attachmentGroupItemId},sucesscb,errorcb);
		};
		
		attachmentGroupItemService.findAllAttachmentGroupItem=function(sucesscb,errorcb)
		{
			attachmentGroupItemService.query({action:"findAllAttachmentGroupItem"},sucesscb,errorcb);
		}
		
		attachmentGroupItemService.findAttachmentGroupItemByTemplate=function(templateId,sucesscb,errorcb)
		{
			attachmentGroupItemService.query({action:"findAttachmentGroupItemByTemplate",templateId:templateId},sucesscb,errorcb);
		}
		return attachmentGroupItemService;
})});

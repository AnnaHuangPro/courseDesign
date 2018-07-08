
define(["app"], function (app) 
{
	app.factory("AttachmentGroupTemplateService", function($resource) 
	{
		var attachmentGroupTemplateService = $resource("/QOSMS/AttachmentGroupTemplate/:action", {});
		attachmentGroupTemplateService.saveAttachmentGroupTemplate=function(attachmentGroupTemplate,sucesscb,errorcb)
		{
			attachmentGroupTemplateService.save({action:"saveAttachmentGroupTemplate"},attachmentGroupTemplate,sucesscb,errorcb);
		};
		
		attachmentGroupTemplateService.deleteAttachmentGroupTemplate=function(attachmentGroupTemplateId,sucesscb,errorcb)
		{
			attachmentGroupTemplateService.save({action:"deleteAttachmentGroupTemplate"},attachmentGroupTemplateId,sucesscb,errorcb);
		};
		
		attachmentGroupTemplateService.updateAttachmentGroupTemplate=function(attachmentGroupTemplate,sucesscb,errorcb)
		{
			attachmentGroupTemplateService.save({action:"updateAttachmentGroupTemplate"},attachmentGroupTemplate,sucesscb,errorcb);
		};
		 
		attachmentGroupTemplateService.findAttachmentGroupTemplateById=function(attachmentGroupTemplateId,sucesscb,errorcb)
		{
			attachmentGroupTemplateService.get({action:"findAttachmentGroupTemplateById",attachmentGroupTemplateId:attachmentGroupTemplateId},sucesscb,errorcb);
		};
		
		attachmentGroupTemplateService.findAllAttachmentGroupTemplate=function(sucesscb,errorcb)
		{
			attachmentGroupTemplateService.query({action:"findAllAttachmentGroupTemplate"},sucesscb,errorcb);
		}
		return attachmentGroupTemplateService;
})});


define(["app"], function (app) 
{
	app.factory("AttachmentGroupService", function($resource) 
	{
		var attachmentGroupService = $resource("/QOSMS/AttachmentGroup/:action", {});
		attachmentGroupService.saveAttachmentGroup=function(attachmentGroup,sucesscb,errorcb)
		{
			attachmentGroupService.save({action:"saveAttachmentGroup"},attachmentGroup,sucesscb,errorcb);
		};
		
		attachmentGroupService.deleteAttachmentGroup=function(attachmentGroupId,sucesscb,errorcb)
		{
			attachmentGroupService.save({action:"deleteAttachmentGroup"},attachmentGroupId,sucesscb,errorcb);
		};
		
		attachmentGroupService.updateAttachmentGroup=function(attachmentGroup,sucesscb,errorcb)
		{
			attachmentGroupService.save({action:"updateAttachmentGroup"},attachmentGroup,sucesscb,errorcb);
		};
		 
		attachmentGroupService.findAttachmentGroupById=function(attachmentGroupId,sucesscb,errorcb)
		{
			attachmentGroupService.get({action:"findAttachmentGroupById",attachmentGroupId:attachmentGroupId},sucesscb,errorcb);
		};
		
		attachmentGroupService.findAllAttachmentGroup=function(sucesscb,errorcb)
		{
			attachmentGroupService.query({action:"findAllAttachmentGroup"},sucesscb,errorcb);
		}
		attachmentGroupService.findAttachmentGroups=function(associateFormId,associateFormName,sucesscb,errorcb)
		{
			attachmentGroupService.query({action:"findAttachmentGroups",associateFormId:associateFormId,associateFormName:associateFormName},sucesscb,errorcb);
		}
		return attachmentGroupService;
})});

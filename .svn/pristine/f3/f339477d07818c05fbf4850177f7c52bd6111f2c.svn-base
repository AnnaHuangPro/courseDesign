angular.module("attachmentModule",[])

.factory('AttachmentService',['$resource',function($resource) 
{
	var attachmentService = $resource('../Attachment/:action', {});

	attachmentService.deleteAttachment = function(attachmentId,sucesscb,errorcb)
	{
		attachmentService.save({action:"deleteAttachment",attachmentId:attachmentId},{},sucesscb,errorcb);
	};
	
	attachmentService.findAttachmentById = function(attachmentId,successcb,errorcb)
	{
		attachmentService.get({action:"findAttachmentById",attachmentId:attachmentId},successcb,errorcb);
	}
	
	attachmentService.findAttachmentByForm = function(associateFormId,associateFormName,sucesscb,errorcb) 
	{
		attachmentService.query({action:"findAttachmentByForm",associateFormId:associateFormId,associateFormName:associateFormName},sucesscb,errorcb);
	}
	
	attachmentService.deleteAttachmentByForm = function(associateFormId,associateFormName,sucesscb,errorcb) 
	{
		attachmentService.save({action:"deleteAttachmentByForm"},{associateFormId:associateFormId,associateFormName:associateFormName},sucesscb,errorcb);
	}
	
	return attachmentService;
}]);

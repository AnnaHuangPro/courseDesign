package ddd.simple.service.attachmentGroup;

import ddd.base.persistence.EntitySet;
import ddd.simple.entity.attachment.Attachment;
import ddd.simple.entity.attachmentGroup.AttachmentGroup;
import ddd.simple.service.base.BaseServiceInterface;

public interface AttachmentGroupService extends BaseServiceInterface
{
	public AttachmentGroup saveAttachmentGroup(AttachmentGroup attachmentGroup) ;
	
	public int deleteAttachmentGroup(Long attachmentGroupId) ;
	
	public AttachmentGroup updateAttachmentGroup(AttachmentGroup attachmentGroup) ;
	
	public AttachmentGroup findAttachmentGroupById(Long attachmentGroupId);
	
	public EntitySet<AttachmentGroup> findAllAttachmentGroup() ;
	
	public EntitySet<Attachment> findAttachments(Long templateId,String associateFormId);
 
	public void createAttachmentGroup(Long templateId,Long associateFormId,String associateFormName);
	
	public EntitySet<AttachmentGroup> findAttachmentGroups(Long associateFormId, String associateFormName);
}
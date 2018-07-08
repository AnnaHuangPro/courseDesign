package ddd.simple.dao.attachment;

import java.util.List;

import ddd.base.persistence.EntitySet;
import ddd.simple.entity.attachment.Attachment;

public interface AttachmentDao {

	public Attachment saveAttachment(Attachment attachment) throws Exception;
	
	public void deleteAttachment(Long attachmentId) throws Exception;
	
	public Attachment findAttachmentById(Long attachmentId) throws Exception;
	
	public EntitySet<Attachment> findAttachmentByForm(String associateFormId,String associateFormName) throws Exception;
	
	public void deleteAttachmentByForm(String associateFormId,
			String associateFormName) throws Exception;	
	
	public String updateAttachmentForFace(String entityId,String entityName,List<Long> attachmentsId) throws Exception;
}

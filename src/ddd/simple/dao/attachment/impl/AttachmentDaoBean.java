package ddd.simple.dao.attachment.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.attachment.AttachmentDao;
import ddd.simple.dao.base.BaseDao;
import ddd.simple.entity.attachment.Attachment;

@Service
public class AttachmentDaoBean extends BaseDao implements AttachmentDao{
	
	public Attachment saveAttachment(Attachment attachment) throws Exception {
		return this.save(attachment);
	}

	public void deleteAttachment(Long attachmentId) throws Exception {
		this.deleteById(attachmentId,Attachment.class);
	}

	public Attachment findAttachmentById(Long attachmentId) throws Exception
	{
		return this.query(attachmentId, Attachment.class);
	}
	
	public EntitySet<Attachment> findAttachmentByForm(String associateFormId,String associateFormName) throws Exception {
		String sql = "associateFormId='"+associateFormId+"' and associateFormName='"+associateFormName+"' order by uploadTime DESC";
		return this.query(sql, Attachment.class);
	}
	public void deleteAttachmentByForm(String associateFormId,
			String associateFormName) throws Exception
	{
		String where = "associateFormId="+associateFormId+" and associateFormName='"+associateFormName+"'";
		this.deleteByWhere(where, Attachment.class);
	}	
	
	@Override
	public String updateAttachmentForFace(String entityId,String entityName,List<Long> attachmentsId) throws Exception {
		String clearnAttachmentEntityId = "update attachment set ASSOCIATEFORMID = '-1' where ASSOCIATEFORMID = '"+
				entityId+"' and ASSOCIATEFORMNAME = '"+entityName+"'";
		this.update(clearnAttachmentEntityId, null);
		String eids = "0";
		for(int i =0;i<attachmentsId.size();i++){
			eids += ","+attachmentsId.get(i);
		}
		String setAttachmentEntityId ="update attachment set ASSOCIATEFORMID = '"+entityId+"' where eid in ("+eids+")";
		this.update(setAttachmentEntityId, null);
		return "";
	}
}

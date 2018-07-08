package ddd.simple.service.attachmentGroup.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.dao.attachment.AttachmentDao;
import ddd.simple.dao.attachmentGroup.AttachmentGroupDao;
import ddd.simple.entity.attachment.Attachment;
import ddd.simple.entity.attachmentGroup.AttachmentGroup;
import ddd.simple.entity.attachmentGroup.AttachmentGroupItem;
import ddd.simple.service.attachmentGroup.AttachmentGroupItemService;
import ddd.simple.service.attachmentGroup.AttachmentGroupService;
import ddd.simple.service.base.BaseService;

@Service
public class AttachmentGroupServiceBean extends BaseService implements AttachmentGroupService
{

	@Resource(name="attachmentGroupDaoBean")
	private AttachmentGroupDao attachmentGroupDao;
	
	@Resource(name="attachmentGroupItemServiceBean")
	private AttachmentGroupItemService attachmentGroupItemService;
	
	@Resource(name="attachmentDaoBean")
	private AttachmentDao attachmentDao;
	
	@Override
	public AttachmentGroup saveAttachmentGroup(AttachmentGroup attachmentGroup) 
	{
		try {
			return this.attachmentGroupDao.saveAttachmentGroup(attachmentGroup);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveAttachmentGroup", e.getMessage(), e);
		}
	}

	@Override
	public int deleteAttachmentGroup(Long attachmentGroupId) {
		try {
			return this.attachmentGroupDao.deleteAttachmentGroup(attachmentGroupId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteAttachmentGroup", e.getMessage(), e);
		}
		
	}

	@Override
	public AttachmentGroup updateAttachmentGroup(AttachmentGroup attachmentGroup) {
		try {
			return this.attachmentGroupDao.updateAttachmentGroup(attachmentGroup);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateAttachmentGroup", e.getMessage(), e);
		}
	}

	@Override
	public AttachmentGroup findAttachmentGroupById(Long attachmentGroupId) {
		try {
			return this.attachmentGroupDao.findAttachmentGroupById(attachmentGroupId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAttachmentGroupById", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<AttachmentGroup> findAllAttachmentGroup() {
		try{
			return this.attachmentGroupDao.findAllAttachmentGroup();
		}catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllAttachmentGroup", e.getMessage(), e);
		}
	}

	private void updateAttachmentGroup(){
		
	}
	
	/**
	 * 新增
	 * @param templatId
	 * @param associateFormId
	 * @param associateFormName
	 * @throws Exception
	 */
	private void addAttachmentGroup(Long templatId,Long associateFormId,String associateFormName) throws Exception{
		EntitySet<AttachmentGroupItem> attachmentGroupItems=this.attachmentGroupItemService.findAttachmentGroupItemByTemplate(templatId);
		
		for(AttachmentGroupItem attachmentGroupItem:attachmentGroupItems){
			
			AttachmentGroup attachmentGroup=this.attachmentGroupDao.findAttachmentGroup(associateFormId, associateFormName, attachmentGroupItem.getEId());
			
			if(attachmentGroup == null){
				attachmentGroup=new AttachmentGroup();
			}
			
			attachmentGroup.setName(attachmentGroupItem.getName());
			attachmentGroup.setAttachmentGroupItemId(attachmentGroupItem.getEId());
			attachmentGroup.setAssociateFormId(associateFormId);
			attachmentGroup.setAssociateFormName(associateFormName);
			attachmentGroup.setMinFiles(attachmentGroupItem.getMinFiles());
			attachmentGroup.setMaxFiles(attachmentGroupItem.getMaxFiles());
			attachmentGroup.setGroupCode(attachmentGroupItem.getGroupItemCode());
			attachmentGroup.setTitleLevel(attachmentGroupItem.getTitleLevel());
			attachmentGroup.setEnable(attachmentGroupItem.getEnable());
			attachmentGroup.setRemark(attachmentGroupItem.getRemark());
			
			
			if(attachmentGroup.getEId() != null){
				this.attachmentGroupDao.updateAttachmentGroup(attachmentGroup);
			}else{
				this.attachmentGroupDao.saveAttachmentGroup(attachmentGroup);
			}
		}
	}
	
	@Override
	public void createAttachmentGroup(Long templateId,Long associateFormId,String associateFormName) {
		try {
			if(templateId == 0l){
				this.attachmentGroupDao.deleteAttachmentGroup(associateFormId, associateFormName);
			}else{
				addAttachmentGroup(templateId, associateFormId, associateFormName);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("createAttachmentGroup", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<AttachmentGroup> findAttachmentGroups(Long associateFormId, String associateFormName) {
		try {
			return this.attachmentGroupDao.findAttachmentGroups(associateFormId, associateFormName);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAttachmentGroupByTemplateId", e.getMessage(), e);
		}
	}

	@Override
	public EntitySet<Attachment> findAttachments(Long templateId, String associateFormId) {
		try {
			EntitySet<Attachment> result=new EntitySet<Attachment>();
			
			EntitySet<AttachmentGroupItem> attachmentGroupItems=this.attachmentGroupItemService.findAttachmentGroupItemByTemplate(templateId);
			for (AttachmentGroupItem attachmentGroupItem : attachmentGroupItems) {
				String associateFormName_new=attachmentGroupItem.getName()+"_"+attachmentGroupItem.getGroupItemCode();
				EntitySet<Attachment> attachments=this.attachmentDao.findAttachmentByForm(associateFormId, associateFormName_new);
				result.addAll(attachments);
			}
			
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAttachments", e.getMessage(), e);
		}
	}

}

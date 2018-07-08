package ddd.simple.service.message.impl;

import java.util.HashSet;
import java.util.Iterator;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import ddd.base.exception.DDDException;
import ddd.base.persistence.EntitySet;
import ddd.simple.dao.message.MessageDao;
import ddd.simple.entity.message.Message;
import ddd.simple.service.message.MessageService;
import ddd.simple.service.base.BaseService;

@Service
public class MessageServiceBean extends BaseService implements MessageService {
	@Resource(name="messageDaoBean")
	private MessageDao messageDao;
	
	@Override
	public Message saveMessage(Message message) {
		try {
			message.setState("未读");
			return this.messageDao.saveMessage(message);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("saveMessage", e.getMessage(), e);
		}
	}

	@Override
	public int deleteMessage(Long messageId) {
		try {
			return this.messageDao.deleteMessage(messageId);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("deleteMessage", e.getMessage(), e);
		}
		
	}

	@Override
	public Message updateMessage(Message message) {
		try {
			return this.messageDao.updateMessage(message);
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("updateMessage", e.getMessage(), e);
		}
	}

	@Override
	public Message findMessageById(Long messageId) {
		try {
			Message message  = this.messageDao.findMessageById(messageId);
			EntitySet<Message> result = new EntitySet<Message>();
			result.add(message);
			changeState(result);
			return result.iterator().next();
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findMessageById", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<Message> findAllMessage() {
		try {
			return this.messageDao.findAllMessage();
		} catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllMessage", e.getMessage(), e);
		}
	}
	
	@Override
	public EntitySet<Message> findAllMessageByType(String type)
	{
		try{
			//在缓存表中查找所有的缓存条目
			EntitySet<Message> result = this.messageDao.findAllMessageByType(type);
			
			changeState(result);
			
			return result;
		}catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllMessageByType", e.getMessage(), e);
		}
	}
	
	
	
	public EntitySet<Message> findAllMessageByEmployee(Long employeeId){
		try{
			//在缓存表中查找所有的缓存条目
			EntitySet<Message> result = this.messageDao.findAllMessageByEmployee(employeeId);
			
			changeState(result);
			
			return result;
		}catch (Exception e) {
			e.printStackTrace();
			throw new DDDException("findAllMessageByEmployee", e.getMessage(), e);
		}
	}
	
	public void changeState(EntitySet<Message> result){
		//将这些条目的状态全部变为已读
		try
		{
		if(result!=null && result.size() != 0){
			String where = "eid in (";
			Iterator<Message> ite = result.iterator();
			while(ite.hasNext()){
				Message temp = ite.next();
				where += temp.getEId() + ",";
			}
			where = where.substring(0,where.length()-1);
			where += ")";
			
				this.messageDao.updateMessageByWhere(where);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
			throw new DDDException("changeState", e.getMessage(), e);
		}

		
		
	}

}

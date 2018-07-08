package ddd.simple.dao.message;

import ddd.base.persistence.EntitySet;
import ddd.simple.dao.base.BaseDaoInterface;
import ddd.simple.entity.message.Message;

public interface MessageDao extends BaseDaoInterface {
	public Message saveMessage(Message message) throws Exception;
	
	public int deleteMessage(Long messageId) throws Exception;
	
	public Message updateMessage(Message message) throws Exception;
	
	public Message findMessageById(Long messageId) throws Exception;
	
	public EntitySet<Message> findAllMessage() throws Exception;
	
	public EntitySet<Message> findAllMessageByType(String type) throws Exception;
	
	public EntitySet<Message> findAllMessageByEmployee(Long employeeId) throws Exception;
	
	public Message updateMessageByWhere(String where) throws Exception;
}

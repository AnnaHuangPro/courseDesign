package ddd.simple.service.message;

import ddd.base.persistence.EntitySet;
import ddd.simple.service.base.BaseServiceInterface;
import ddd.simple.entity.message.Message;

public interface MessageService extends BaseServiceInterface {
	public Message saveMessage(Message message) ;
	
	public int deleteMessage(Long messageId) ;
	
	public Message updateMessage(Message message) ;
	
	public Message findMessageById(Long messageId) ;
	
	public EntitySet<Message> findAllMessage() ;
	
	public EntitySet<Message> findAllMessageByType(String type) ;
	
	public EntitySet<Message> findAllMessageByEmployee(Long employeeId) ;
	
	public void changeState(EntitySet<Message> result);
	
 
}